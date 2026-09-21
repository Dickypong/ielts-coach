# Cursor Task · Phase 4 · Tauri 打包 macOS 原生应用

> 🎯 目标：把 Web 原型打包成 macOS 原生 .app + DMG 安装包。

## 上下文

承接 Phase 3。前端 + AI 评估都跑通了。本阶段用 Tauri 打包成 macOS 应用。

参考文档：
- `docs/02-tech-architecture.md` — Tauri 工程结构

## 任务清单

### Task 4.1 · 初始化 Tauri 工程

在项目根目录创建 Tauri 项目：

```bash
cd /Users/pengweixiong/.openclaw/workspace/projects/ielts-coach
npm create tauri-app@latest -- --template react-ts --manager npm .
```

或者手动配置：
1. 创建 `src-tauri/` 目录
2. 配置 `src-tauri/Cargo.toml`
3. 配置 `src-tauri/tauri.conf.json`
4. 设置 `package.json` 添加 tauri scripts

### Task 4.2 · 整合前端代码

把 `prototype/src/` 的所有文件移到根目录 `src/`：

```bash
mv prototype/src/* src/
mv prototype/index.html .
mv prototype/vite.config.ts .
mv prototype/tsconfig.json .
mv prototype/package.json package.json
# 合并 package.json 依赖
```

或保留 prototype/ 目录但配置 Tauri 指向它（更简单）。

### Task 4.3 · Rust 后端基础

`src-tauri/src/main.rs`：

```rust
use tauri::Manager;

#[tauri::command]
fn get_app_version() -> String {
    env!("CARGO_PKG_VERSION").to_string()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_app_version])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### Task 4.4 · SQLite 集成

添加 `rusqlite` 或 `sqlx` 依赖。

`src-tauri/src/db.rs`：
- 实现 `init_db()`：建表
- 实现 `insert_essay()`、`query_topics()` 等

Tauri Command：
```rust
#[tauri::command]
async fn get_topics(state: State<AppState>) -> Result<Vec<WritingTopic>, String> {
    state.db.query_topics().map_err(|e| e.to_string())
}
```

### Task 4.5 · AI API 调用移到 Rust

把前端 `lib/ai-provider.ts` 的 HTTP 调用移到 Rust（更安全，API Key 不暴露给前端）：

`src-tauri/src/ai/mod.rs`：
- `MinimaxClient` 调用 MiniMax API
- 返回 AIEvaluation JSON

### Task 4.6 · macOS 体验优化

`tauri.conf.json`：

```json
{
  "tauri": {
    "macOSPrivateApi": true,
    "windows": [{
      "title": "IELTS Coach",
      "width": 1200,
      "height": 800,
      "titleBarStyle": "Visible",
      "hiddenTitle": false
    }]
  }
}
```

- 标题栏红绿灯
- 系统字体（PingFang SC）
- 应用图标（用 `tauri icon` 生成）
- 暗色模式自适应

### Task 4.7 · 数据打包

把所有真实数据（SQLite 文件）打包到应用：

`tauri.conf.json`：
```json
{
  "bundle": {
    "resources": ["data/ielts_coach.db"]
  }
}
```

### Task 4.8 · 构建 DMG

```bash
npm run tauri build
# 输出：src-tauri/target/release/bundle/dmg/IELTS Coach_0.1.0_aarch64.dmg
```

验证：
- 双击 DMG 安装
- 启动应用
- 离线浏览题库 / 范文
- AI 评估需要联网

### Task 4.9 · 代码签名（可选）

如果需要分发给家人使用：
- 申请 Apple Developer 账号（个人 $99/年）
- 创建 Developer ID 证书
- 在 `tauri.conf.json` 配置签名

如果只是本人使用，可以跳过签名。

## 验收标准

- [ ] `npm run tauri dev` 能启动桌面应用
- [ ] `npm run tauri build` 生成 DMG
- [ ] DMG 安装后双击 .app 可启动
- [ ] 启动时间 < 3 秒
- [ ] 离线状态下能浏览所有题库和范文
- [ ] 真实数据（≥ 60 篇范文）正确显示
- [ ] AI 评估调用真实 API
- [ ] 标题栏红绿灯 / 系统字体 / 应用图标都正确

## 注意事项

- macOS 沙箱权限需要在 `tauri.conf.json` 配置
- Tauri 的 CSP 需要允许 API 调用
- 数据文件路径要用 `app_data_dir()` 获取，不能 hardcode
- 第一次构建会下载 Rust 依赖，时间较长

## 完成后

回复我：
1. DMG 文件路径
2. 应用截图
3. 启动时间数据
4. 任何打包过程的问题