# IELTS Coach · 雅思备考助手

> 个人学习用 macOS 应用 · 题库 + 高分范文 + 优秀口语录音 + AI 评估

## 项目目标

为家庭用户（当前目标用户：陈泽华 / 踹妈）打造的雅思备考桌面应用。
**核心三件事**：
1. 浏览近 10 年雅思真题
2. 学习高分范文 / 优秀口语录音（真实数据，非 AI 生成）
3. AI 评估用户自己写的作文 / 录的口语

## 📦 目录结构

```
ielts-coach/
├── README.md                       ← 本文件，项目总览
├── docs/                           ← 需求文档（Cursor 直接读）
│   ├── 01-product-requirements.md ← PRD：产品需求
│   ├── 02-tech-architecture.md     ← 技术架构与选型
│   ├── 03-data-strategy.md         ← 数据来源策略（真实数据优先）
│   ├── 04-ai-evaluation.md         ← AI 评分规格
│   └── 05-roadmap.md               ← 路线图与里程碑
├── prototype/                      ← 现有高保真 Web 原型（React + Vite）
│   ├── package.json
│   ├── src/
│   │   ├── pages/                  ← 7 个页面
│   │   ├── components/             ← Layout 等
│   │   ├── data/                   ← mock 数据（后续替换为真实数据）
│   │   └── lib/                    ← AI 评估 mock
│   └── ...
└── cursor-tasks/                   ← Cursor 任务清单（每步一个文件）
    ├── phase-1-data-collection.md
    ├── phase-2-real-data-integration.md
    ├── phase-3-ai-evaluation.md
    └── phase-4-tauri-packaging.md
```

## 🚀 快速开始

### 给 Cursor 的工作流

1. 把 `docs/01-product-requirements.md` 喂给 Cursor 作为初始 prompt
2. Cursor 根据 `docs/02-tech-architecture.md` 选择技术栈
3. 按 `cursor-tasks/` 里的 phase 顺序执行
4. 参考 `prototype/` 目录里的现有代码作为 UI 实现参考

### 本地启动原型

```bash
cd prototype
npm install
npm run dev   # http://localhost:5180
```

### 模型

- **AI 评估模型**：默认 `minimax/MiniMax-M3`（灵活可替换为 Claude / GPT-4o 等）
- **语音转写**：Whisper / OpenAI Audio API
- 详见 `docs/04-ai-evaluation.md`

## 🎯 MVP 范围

**核心三件事**（必须做完）：
- 写作题库浏览（剑桥 IELTS 10-18 + 雅思哥公开题库）
- 写作范文学习（真实公开范文，标注来源）
- AI 作文评估（用户提交 → AI 评分 + 改进建议）

**次要功能**（首版可选）：
- 口语优秀录音库（YouTube/B站公开资源）
- AI 口语评估（录音 + 转写 + 评分）
- 错题本（暂不做）
- 学习日历（暂不做，macOS 系统日历已够用）

## 📊 当前状态

- ✅ 需求分析 / 需求文档 / Web 原型
- ✅ Phase 1 数据采集：IELTS Liz + IELTS-Blog（≥60 篇真实范文入库）
- ✅ AI Provider + 设置页 + 评估历史
- ✅ Tauri 2 工程初始化，已产出 macOS `.app` + `.dmg`
- ⏳ Simon 站点 SSL 不稳定，暂用 IELTS-Blog 补齐
- ⏳ AI 范文分析（analyze_essay.py）可按需跑
- ⏳ SQLite / Rust 命令层继续深化

## 🛠 开发命令

```bash
# 前端
cd prototype && npm install && npm run dev   # http://localhost:5180

# 桌面端
cd prototype && npm run tauri:dev            # 开发模式
cd prototype && npm run tauri:build          # 产出 .app / .dmg

# 数据采集
source .venv/bin/activate
pip install -r scripts/requirements.txt
python scripts/scrape_ielts_liz.py --limit 25
python scripts/scrape_ielts_blog.py --limit 40 --band 8
python scripts/scrape_ielts_blog.py --limit 20 --band 9
python scripts/init_db.py && python scripts/seed_topics.py
python scripts/import_essays.py && python scripts/transform_to_ts.py
```

### 打包产物

- App：`prototype/src-tauri/target/release/bundle/macos/IELTS Coach.app`
- DMG：`prototype/src-tauri/target/release/bundle/dmg/IELTS Coach_0.1.0_aarch64.dmg`

## 🤝 给 Cursor 的关键提示

- **不要生成范文或口语样本**——这些必须用爬虫从公开渠道抓
- **个人学习用**，版权问题宽松，但仍需标注来源
- **macOS 原生体验优先**——最终用 Tauri 打包
- **MVP 优先**——做扎实一件事胜过做半吊子五件事

## 📞 维护者

- 踹爸：需求提出 & 测试
- 踹宝（本项目 agent）：需求文档 & 原型 & 爬虫脚本