fn main() {
    #[cfg(target_os = "macos")]
    {
        println!("cargo:rerun-if-changed=src/speech_mac.m");
        println!("cargo:rerun-if-changed=bin/macos_transcribe.swift");
        println!("cargo:rerun-if-changed=Info.plist");
        // 保留 ObjC 静态库以兼容旧路径，但运行时改走独立 .app，避免主进程被 TCC 杀掉
        cc::Build::new()
            .file("src/speech_mac.m")
            .flag("-fobjc-arc")
            .compile("ielts_speech_mac");
        println!("cargo:rustc-link-lib=framework=Speech");
        println!("cargo:rustc-link-lib=framework=Foundation");

        build_transcribe_helper_app();
    }

    tauri_build::build()
}

#[cfg(target_os = "macos")]
fn build_transcribe_helper_app() {
    use std::env;
    use std::fs;
    use std::path::PathBuf;
    use std::process::Command;

    let manifest = PathBuf::from(env::var("CARGO_MANIFEST_DIR").unwrap());
    let out_dir = PathBuf::from(env::var("OUT_DIR").unwrap());
    let app = out_dir.join("macos_transcribe.app");
    let macos = app.join("Contents/MacOS");
    let bin = macos.join("macos_transcribe");
    let plist = app.join("Contents/Info.plist");
    let src = manifest.join("bin/macos_transcribe.swift");

    fs::create_dir_all(&macos).expect("create helper app MacOS dir");
    fs::write(
        &plist,
        r#"<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleExecutable</key>
  <string>macos_transcribe</string>
  <key>CFBundleIdentifier</key>
  <string>com.ieltscoach.macos-transcribe</string>
  <key>CFBundleName</key>
  <string>macos_transcribe</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>CFBundleVersion</key>
  <string>0.1.0</string>
  <key>LSMinimumSystemVersion</key>
  <string>11.0</string>
  <key>NSSpeechRecognitionUsageDescription</key>
  <string>Transcribe IELTS speaking recordings to English text for AI scoring.</string>
  <key>NSMicrophoneUsageDescription</key>
  <string>Used for IELTS speaking practice recording.</string>
</dict>
</plist>
"#,
    )
    .expect("write helper Info.plist");

    let status = Command::new("swiftc")
        .args([
            "-O",
            "-framework",
            "Speech",
            "-framework",
            "Foundation",
            "-framework",
            "AppKit",
            "-o",
        ])
        .arg(&bin)
        .arg(&src)
        .status()
        .expect("spawn swiftc");
    if !status.success() {
        panic!("swiftc failed building macos_transcribe helper");
    }

    let _ = Command::new("codesign")
        .args(["-s", "-", "--force", "--deep"])
        .arg(&app)
        .status();

    // 同步到 src-tauri/binaries，便于运行时查找
    let dest_root = manifest.join("binaries/macos_transcribe.app");
    let _ = fs::remove_dir_all(&dest_root);
    copy_dir_all(&app, &dest_root).expect("copy helper app to binaries/");

    println!("cargo:rustc-env=MACOS_TRANSCRIBE_APP={}", dest_root.display());
    println!("cargo:rerun-if-changed={}", src.display());
}

#[cfg(target_os = "macos")]
fn copy_dir_all(src: &std::path::Path, dst: &std::path::Path) -> std::io::Result<()> {
    use std::fs;
    fs::create_dir_all(dst)?;
    for entry in fs::read_dir(src)? {
        let entry = entry?;
        let ty = entry.file_type()?;
        let to = dst.join(entry.file_name());
        if ty.is_dir() {
            copy_dir_all(&entry.path(), &to)?;
        } else {
            fs::copy(entry.path(), to)?;
        }
    }
    Ok(())
}
