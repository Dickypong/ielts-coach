# 02 · 技术架构

## 1. 技术栈选型

### 1.1 最终选型（macOS 原生应用）

| 层 | 选型 | 理由 |
|---|---|---|
| **应用框架** | Tauri 2.x | 包小（< 10MB）、启动快、Rust 后端可调用系统 API、AI 集成简单 |
| **前端** | React 18 + TypeScript | 生态成熟、AI 集成快、与 prototype 复用 |
| **构建工具** | Vite 5.x | 快、HMR、开发体验好 |
| **UI 样式** | 原生 CSS（无框架） | macOS 原生视觉、毛玻璃需要原生 CSS 控制 |
| **状态管理** | Zustand | 轻量、TS 友好、够用 |
| **路由** | React Router 6 | 成熟、HashRouter 用于 Tauri |
| **数据库** | SQLite (sql.js 或 rusqlite) | 本地、单用户、性能够用 |
| **AI 模型** | `minimax/MiniMax-M3` (默认) | 灵活可换 Claude/GPT-4o |
| **语音转写** | OpenAI Whisper API / 本地 whisper.cpp | Whisper API 准确度高 |
| **HTTP 客户端** | fetch / axios | 简单场景用 fetch 即可 |

### 1.2 不选型说明

- ❌ **Electron**：包大（> 100MB）、启动慢、原生感弱
- ❌ **SwiftUI（纯原生）**：AI 集成需要自己搭桥，开发量大
- ❌ **Next.js**：服务端渲染对此项目无价值
- ❌ **Tailwind**：本项目视觉高度定制，原生 CSS 更可控
- ❌ **Ant Design / Material UI**：与 macOS 风格冲突

## 2. 系统架构

### 2.1 总体架构图

```
┌─────────────────────────────────────────────────┐
│             Tauri Desktop App (macOS)            │
├─────────────────────────────────────────────────┤
│  React Frontend (WebView)                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │  Pages   │ │Components│ │  State (Zustand) │  │
│  └──────────┘ └──────────┘ └──────────────────┘  │
│           ↓ IPC (Tauri Commands)                 │
├─────────────────────────────────────────────────┤
│  Rust Backend (Tauri Core)                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │  SQLite  │ │  Files   │ │  HTTP Client     │  │
│  │  (数据)  │ │  (资源)  │ │  (AI API 调用)  │  │
│  └──────────┘ └──────────┘ └──────────────────┘  │
└─────────────────────────────────────────────────┘
                    ↓
        ┌──────────────────────────┐
        │   AI Provider API        │
        │   (minimax/MiniMax-M3)   │
        └──────────────────────────┘
```

### 2.2 数据流

```
用户操作 → React 组件 → Zustand store → Tauri IPC → Rust 后端 → AI API
                                                      ↓
                                              SQLite (本地持久化)
```

## 3. 数据库设计

### 3.1 SQLite Schema

```sql
-- 写作真题表
CREATE TABLE writing_topics (
  id TEXT PRIMARY KEY,
  book INTEGER NOT NULL,           -- 剑桥 10-18
  test INTEGER NOT NULL,
  exam_date TEXT,
  task INTEGER NOT NULL,           -- 1 or 2
  prompt TEXT NOT NULL,
  type TEXT NOT NULL,
  tags TEXT,                       -- JSON array
  difficulty TEXT,
  created_at INTEGER DEFAULT (unixepoch())
);

-- 范文表
CREATE TABLE essays (
  id TEXT PRIMARY KEY,
  topic_id TEXT NOT NULL,
  score REAL NOT NULL,             -- ≥ 8.0
  author TEXT,
  source TEXT NOT NULL,            -- 来源URL
  word_count INTEGER,
  time_spent INTEGER,
  content TEXT NOT NULL,
  analysis_json TEXT NOT NULL,     -- 结构、逻辑、词汇、评分等 JSON
  fetched_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (topic_id) REFERENCES writing_topics(id)
);

-- 口语优秀录音表
CREATE TABLE great_speaking (
  id TEXT PRIMARY KEY,
  part INTEGER NOT NULL,           -- 1, 2, 3
  topic TEXT NOT NULL,
  prompt TEXT,
  source TEXT NOT NULL,            -- YouTube URL 等
  source_title TEXT,
  score REAL NOT NULL,             -- ≥ 8.0
  duration INTEGER,                -- 秒
  audio_path TEXT,                 -- 本地音频文件路径
  transcript TEXT NOT NULL,
  analysis_json TEXT NOT NULL,
  fetched_at INTEGER DEFAULT (unixepoch())
);

-- 用户提交作文表
CREATE TABLE user_essays (
  id TEXT PRIMARY KEY,
  topic_id TEXT,
  content TEXT NOT NULL,
  word_count INTEGER,
  evaluation_json TEXT,            -- AI 评分结果
  created_at INTEGER DEFAULT (unixepoch())
);

-- 用户录音表
CREATE TABLE user_recordings (
  id TEXT PRIMARY KEY,
  topic_id TEXT,
  audio_path TEXT NOT NULL,
  duration INTEGER,
  transcript TEXT,
  evaluation_json TEXT,
  created_at INTEGER DEFAULT (unixepoch())
);

-- 索引
CREATE INDEX idx_essays_topic ON essays(topic_id);
CREATE INDEX idx_user_essays_date ON user_essays(created_at DESC);
```

### 3.2 数据迁移

- 初始数据从 `prototype/src/data/*.ts` 导入
- 真实数据从爬虫脚本导入（见 `docs/03-data-strategy.md`）
- 使用 Tauri Migration 命令管理 schema 升级

## 4. API 设计（Tauri Commands）

### 4.1 命令清单

```rust
// 写作模块
#[tauri::command]
async fn get_topics(filter: TopicFilter) -> Result<Vec<WritingTopic>>

#[tauri::command]
async fn get_topic(id: String) -> Result<WritingTopic>

#[tauri::command]
async fn get_essays(topic_id: String) -> Result<Vec<Essay>>

#[tauri::command]
async fn evaluate_essay(content: String, topic_id: String) -> Result<AIEvaluation>

// 口语模块
#[tauri::command]
async fn get_speaking_topics() -> Result<Vec<SpeakingTopic>>

#[tauri::command]
async fn get_great_speaking(part: Option<i32>) -> Result<Vec<GreatSpeaking>>

#[tauri::command]
async fn evaluate_speaking(audio_path: String, topic_id: String) -> Result<SpeakingEvaluation>

// 用户数据
#[tauri::command]
async fn save_user_essay(essay: UserEssay) -> Result<String>

#[tauri::command]
async fn get_user_history() -> Result<Vec<UserEssay>>

// AI 配置
#[tauri::command]
async fn set_ai_provider(config: AIConfig) -> Result<()>

#[tauri::command]
async fn get_ai_provider() -> Result<AIConfig>
```

### 4.2 前端调用示例

```typescript
import { invoke } from '@tauri-apps/api/tauri'

const topics = await invoke<WritingTopic[]>('get_topics', { 
  filter: { task: 2, type: '讨论类' } 
})

const result = await invoke<AIEvaluation>('evaluate_essay', {
  content: essayText,
  topicId: 'c14-t4-t2'
})
```

## 5. AI 集成层

### 5.1 AI Provider 抽象

```typescript
// src/lib/ai-provider.ts
interface AIProvider {
  name: string
  evaluateEssay(essay: string, topic: WritingTopic): Promise<AIEvaluation>
  evaluateSpeaking(transcript: string, topic: SpeakingTopic): Promise<SpeakingEvaluation>
}

class MinimaxProvider implements AIProvider {
  name = 'minimax/MiniMax-M3'
  // 调用 MiniMax API
}

class ClaudeProvider implements AIProvider {
  name = 'claude-sonnet-4.5'
  // 调用 Anthropic API
}

// 工厂模式：根据配置返回对应 Provider
```

### 5.2 AI 配置管理

```typescript
// Settings 页面可配置
interface AIConfig {
  provider: 'minimax' | 'claude' | 'openai'
  apiKey: string  // 本地存储，macOS Keychain 加密
  model: string
  temperature: number
}
```

详见 `docs/04-ai-evaluation.md`。

## 6. 项目结构

```
ielts-coach/
├── src-tauri/                  # Rust 后端
│   ├── Cargo.toml
│   ├── src/
│   │   ├── main.rs             # Tauri 入口
│   │   ├── commands/           # IPC 命令
│   │   ├── db/                 # SQLite 操作
│   │   └── ai/                 # AI 客户端
│   └── tauri.conf.json
├── src/                        # React 前端
│   ├── pages/                  # 7 个页面
│   ├── components/             # Layout 等
│   ├── lib/                    # 工具
│   │   ├── ai-provider.ts      # AI Provider 抽象
│   │   ├── tauri.ts            # IPC 封装
│   │   └── db.ts               # 本地缓存
│   ├── data/                   # 初始 mock 数据
│   ├── store/                  # Zustand stores
│   ├── styles.css              # 全局样式
│   ├── App.tsx
│   └── main.tsx
├── scripts/                    # 数据采集脚本
│   ├── scrape_ielts_liz.py
│   ├── scrape_ielts_simon.py
│   ├── scrape_ielts_bro.py
│   ├── scrape_youtube.py
│   └── import_to_db.py
├── docs/                       # 本目录
└── package.json
```

## 7. 部署与发布

### 7.1 开发环境

```bash
# 前端
npm run dev   # http://localhost:5173

# Tauri（启动桌面应用）
npm run tauri dev
```

### 7.2 生产构建

```bash
npm run tauri build
# 输出：src-tauri/target/release/bundle/macos/IELTS Coach.app
# + DMG 安装包
```

### 7.3 发布渠道

- **个人使用**：本地 .app 文件，双击启动
- **可选**：申请 Apple Developer 账号，签名后分发给家人

## 8. 安全考虑

- API Key 存储：macOS Keychain（通过 `tauri-plugin-stronghold` 或 Keychain Access API）
- 用户内容：不离开本机，AI API 只传必要文本
- 爬虫：控制请求频率，遵守 robots.txt