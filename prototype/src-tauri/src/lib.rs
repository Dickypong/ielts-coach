// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use base64::Engine;
use serde_json::Value;
use std::fs;
use std::io::Write;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::thread;
use std::time::{Duration, Instant};

#[tauri::command]
fn get_app_version() -> String {
    env!("CARGO_PKG_VERSION").to_string()
}

#[tauri::command]
fn get_app_name() -> String {
    "IELTS Coach".into()
}

/// 从 ~/.openclaw/openclaw.json 读取 MiniMax API Key（仅本机，不上传）
#[tauri::command]
fn import_minimax_key_from_openclaw() -> Result<String, String> {
    let home = dirs_home().ok_or_else(|| "找不到用户主目录".to_string())?;
    let path = home.join(".openclaw").join("openclaw.json");
    let raw = fs::read_to_string(&path)
        .map_err(|_| format!("读不到配置文件：{}", path.display()))?;
    let data: Value =
        serde_json::from_str(&raw).map_err(|e| format!("openclaw.json 解析失败：{e}"))?;

    let key = data
        .pointer("/mcp/servers/MiniMax/env/MINIMAX_API_KEY")
        .or_else(|| data.pointer("/mcp/servers/minimax/env/MINIMAX_API_KEY"))
        .and_then(|v| v.as_str())
        .map(str::trim)
        .filter(|s| !s.is_empty())
        .ok_or_else(|| "openclaw.json 中未找到 MiniMax MINIMAX_API_KEY".to_string())?;

    Ok(key.to_string())
}

/// macOS 原生转写：通过独立 helper .app 调用 SFSpeech。
/// 绝不能在主进程直接调 Speech——tauri:dev 二进制缺隐私说明会被系统直接杀掉（闪退）。
#[tauri::command]
fn transcribe_audio(audio_base64: String, mime_type: String) -> Result<String, String> {
    #[cfg(not(target_os = "macos"))]
    {
        let _ = (audio_base64, mime_type);
        return Err("系统转写仅支持 macOS 桌面 App".into());
    }

    #[cfg(target_os = "macos")]
    {
        if audio_base64.trim().is_empty() {
            return Err("录音为空，无法转写".into());
        }
        let bytes = base64::engine::general_purpose::STANDARD
            .decode(audio_base64.trim())
            .map_err(|e| format!("音频解码失败：{e}"))?;
        if bytes.len() < 64 {
            return Err("录音过短或为空，无法转写".into());
        }

        let ext = extension_for_mime(&mime_type);
        let stamp = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .map(|d| d.as_millis())
            .unwrap_or(0);
        let tmp_audio = std::env::temp_dir().join(format!(
            "ielts-coach-asr-{}-{}.{}",
            std::process::id(),
            stamp,
            ext
        ));
        let tmp_out = std::env::temp_dir().join(format!(
            "ielts-coach-asr-{}-{}.txt",
            std::process::id(),
            stamp
        ));
        {
            let mut f = fs::File::create(&tmp_audio).map_err(|e| format!("无法写临时音频：{e}"))?;
            f.write_all(&bytes)
                .map_err(|e| format!("写入临时音频失败：{e}"))?;
        }
        let _ = fs::remove_file(&tmp_out);

        let result = transcribe_via_helper_app(&tmp_audio, &tmp_out);
        let _ = fs::remove_file(&tmp_audio);
        let _ = fs::remove_file(&tmp_out);
        result
    }
}

#[cfg(target_os = "macos")]
fn transcribe_via_helper_app(audio: &Path, out_txt: &Path) -> Result<String, String> {
    let app = resolve_helper_app()?;
    // 用 open -W -n 启动独立 Bundle，TCC 才会读到 helper 自己的 UsageDescription
    let status = Command::new("open")
        .args([
            "-W",
            "-n",
            "-a",
        ])
        .arg(&app)
        .arg("--args")
        .arg("--in")
        .arg(audio)
        .arg("--out")
        .arg(out_txt)
        .status()
        .map_err(|e| format!("无法启动系统转写助手：{e}"))?;

    if !status.success() {
        // open 失败时尝试直接跑 MacOS 可执行文件（仍带 .app 路径，便于定位 Bundle）
        let exe = app.join("Contents/MacOS/macos_transcribe");
        let output = Command::new(&exe)
            .args(["--in", &audio.to_string_lossy(), "--out", &out_txt.to_string_lossy()])
            .output()
            .map_err(|e| format!("无法运行系统转写助手：{e}"))?;
        if !output.status.success() {
            let err = String::from_utf8_lossy(&output.stderr).trim().to_string();
            return Err(map_speech_error(if err.is_empty() {
                "系统转写助手启动失败"
            } else {
                &err
            }));
        }
    }

    // open -W 有时在权限弹窗场景下返回偏早，轮询结果文件
    let deadline = Instant::now() + Duration::from_secs(95);
    while Instant::now() < deadline {
        if out_txt.exists() {
            let raw = fs::read_to_string(out_txt)
                .map_err(|e| format!("读取转写结果失败：{e}"))?
                .trim()
                .to_string();
            if raw.starts_with("ERROR:") {
                return Err(map_speech_error(raw.trim_start_matches("ERROR:").trim()));
            }
            let text = raw
                .replace('\n', " ")
                .split_whitespace()
                .collect::<Vec<_>>()
                .join(" ");
            if text.is_empty() {
                return Err("未识别到英文内容，请再说清楚一点后重试".into());
            }
            return Ok(text);
        }
        thread::sleep(Duration::from_millis(200));
    }
    Err("系统转写超时。若首次使用，请在弹窗中允许「语音识别」，然后重试。".into())
}

#[cfg(target_os = "macos")]
fn resolve_helper_app() -> Result<PathBuf, String> {
    // 打包后：IELTS Coach.app/Contents/Resources/.../macos_transcribe.app
    if let Ok(exe) = std::env::current_exe() {
        if let Some(macos_dir) = exe.parent() {
            if let Some(contents) = macos_dir.parent() {
                let resources = contents.join("Resources");
                for rel in [
                    "macos_transcribe.app",
                    "binaries/macos_transcribe.app",
                    "_up_/macos_transcribe.app",
                    "_up_/binaries/macos_transcribe.app",
                ] {
                    let candidate = resources.join(rel);
                    if candidate.exists() {
                        return Ok(candidate);
                    }
                }
            }
            let sibling = macos_dir.join("macos_transcribe.app");
            if sibling.exists() {
                return Ok(sibling);
            }
        }
    }

    // 开发态：build.rs 写入的绝对路径 / src-tauri/binaries
    if let Some(p) = option_env!("MACOS_TRANSCRIBE_APP") {
        let path = PathBuf::from(p);
        if path.exists() {
            return Ok(path);
        }
    }
    let manifest = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("binaries/macos_transcribe.app");
    if manifest.exists() {
        return Ok(manifest);
    }
    Err("找不到系统转写助手 macos_transcribe.app，请重新编译桌面 App".into())
}

#[cfg(target_os = "macos")]
fn extension_for_mime(mime: &str) -> &'static str {
    let m = mime.to_ascii_lowercase();
    if m.contains("mp4") || m.contains("m4a") || m.contains("aac") {
        "m4a"
    } else if m.contains("webm") {
        "webm"
    } else if m.contains("wav") {
        "wav"
    } else if m.contains("mpeg") || m.contains("mp3") {
        "mp3"
    } else if m.contains("caf") || m.contains("aiff") || m.contains("aif") {
        "caf"
    } else {
        "m4a"
    }
}

#[cfg(target_os = "macos")]
fn map_speech_error(err: &str) -> String {
    let lower = err.to_ascii_lowercase();
    if lower.contains("not authorized") || lower.contains("denied") || err.contains("未授权") {
        "未授权语音识别。请到「系统设置 → 隐私与安全性 → 语音识别」允许 macos_transcribe，然后重试。"
            .into()
    } else if lower.contains("network") {
        "系统转写暂时不可用。请检查网络，或到系统设置确认已启用听写 / 语音识别。".into()
    } else if err.is_empty() {
        "系统转写失败".into()
    } else {
        format!("系统转写失败：{err}")
    }
}

/// 供 CLI 自测：走同一套 helper app，避免主进程 TCC 闪退
#[cfg(target_os = "macos")]
pub fn transcribe_file_cli(path: &str) -> Result<String, String> {
    let out = std::env::temp_dir().join(format!("ielts-coach-cli-{}.txt", std::process::id()));
    let _ = fs::remove_file(&out);
    let result = transcribe_via_helper_app(Path::new(path), &out);
    let _ = fs::remove_file(&out);
    result
}

fn dirs_home() -> Option<PathBuf> {
    std::env::var_os("HOME")
        .or_else(|| std::env::var_os("USERPROFILE"))
        .map(PathBuf::from)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_app_version,
            get_app_name,
            import_minimax_key_from_openclaw,
            transcribe_audio
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
