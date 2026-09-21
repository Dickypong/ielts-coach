# Cursor Task · Phase 1 · 真实数据采集

> 🎯 目标：抓取真实公开雅思资料，覆盖剑桥 IELTS 10-18 全部 36 道 Task 2 真题，每题配 ≥ 2 篇 8 分以上真实范文。

## 上下文

这是一个**个人学习用**的 macOS 雅思备考应用。**禁止 AI 生成任何范文或口语录音内容**——所有数据必须来自公开渠道，明确标注来源。

完整项目结构：`/Users/pengweixiong/.openclaw/workspace/projects/ielts-coach/`

参考文档：
- `docs/01-product-requirements.md` — PRD
- `docs/02-tech-architecture.md` — 技术栈
- `docs/03-data-strategy.md` — 数据来源策略（**重要，请仔细读**）
- `docs/05-roadmap.md` — Phase 1 任务清单

已有原型：`prototype/`（React + Vite，可作为 UI 参考）

## 任务清单

### Task 1.1 · 写爬虫脚本抓 IELTS Liz 范文

**目标**：抓取 ieltsliz.com 的 IELTS Writing Task 2 范文，至少 20 篇 8 分以上。

**步骤**：
1. 创建 `scripts/scrape_ielts_liz.py`
2. 使用 `requests` + `BeautifulSoup4`
3. 抓取范文列表页：`https://ieltsliz.com/ielts-writing-task-2/`
4. 解析每篇范文的：题目、范文内容、分数（如果有）、作者
5. 输出到 `data/raw/ielts_liz_essays.json`

**JSON 格式**：
```json
[
  {
    "source_name": "IELTS Liz",
    "source_url": "https://ieltsliz.com/...",
    "topic_prompt": "题目原文",
    "topic_type": "观点类/讨论类/...",
    "essay_content": "...",
    "score": 8.5,
    "author": "...",
    "word_count": 287,
    "fetched_at": 1234567890
  }
]
```

**要求**：
- 频率限制：每个请求间隔 ≥ 3 秒
- User-Agent 设为正常浏览器
- 错误处理：单篇失败不影响整体
- 只保留 score ≥ 8.0 的范文

### Task 1.2 · 抓 IELTS-Simon 范文

**目标**：抓取 ielts-simon.com（前雅思考官）的范文，至少 15 篇。

Simon 的网站结构清晰，主页有按主题分类的范文列表：
- URL：`https://ielts-simon.com/`
- 分类：IELTS Writing Task 2 / IELTS Writing Task 1
- 每篇范文都有 Simon 自己的评分建议

### Task 1.3 · 补充雅思哥真题

**目标**：补充 ieltsbro.com 上的近期真题回忆（剑桥 19+ 和 2024-2026 回忆版）。

输出格式与现有 `prototype/src/data/writingTopics.ts` 保持一致：
```typescript
{
  id: 'cn-t1-t2',     // 编号：c + 序号 + t + test + t + task
  book: 19,            // 剑桥 19 或 'recap' (回忆版)
  test: 1,
  examDate: '2024年12月',
  task: 2,
  prompt: '...',
  type: '观点类',
  tags: ['...'],
  difficulty: 'medium',
  essayCount: 0         // 暂无范文
}
```

### Task 1.4 · AI 分析每篇范文

**目标**：对每篇抓取的范文，调用 AI 生成 `analysis` 字段（结构、逻辑、词汇、为什么高分）。

**Prompt 模板**：见 `docs/04-ai-evaluation.md` 第 5 节"范文分析 Prompt"。

**模型**：使用 `minimax/MiniMax-M3`（API 调用方式参考 `docs/04-ai-evaluation.md`）。

**输出**：
```json
{
  "structure": "四段式结构：引言→支持→反对→观点...",
  "logic": "...",
  "vocabHighlights": [{"word": "...", "meaning": "..."}],
  "bandCriteria": {"taskResponse": 8.5, "coherence": 8.0, ...},
  "whyHighScore": ["理由1", "理由2", ...]
}
```

写入到 `data/raw/essays_analyzed.json`。

### Task 1.5 · 导入到 SQLite

**目标**：把 `data/raw/` 下的数据导入 SQLite 数据库。

**步骤**：
1. 创建 `scripts/init_db.py`：建表（schema 见 `docs/02-tech-architecture.md` 第 3 节）
2. 创建 `scripts/import_essays.py`：把 essays_analyzed.json 导入 `essays` 表
3. 关联 `essays.topic_id` 到 `writing_topics.id`（如果题目不在已有列表里，先导入题目）
4. 验证：每道 IELTS 10-18 真题至少有 2 篇范文

## 验收标准

- [ ] `data/raw/ielts_liz_essays.json` 包含 ≥ 20 篇 8 分+ 范文
- [ ] `data/raw/ielts_simon_essays.json` 包含 ≥ 15 篇范文
- [ ] `data/raw/essays_analyzed.json` 包含 AI 分析
- [ ] SQLite `essays` 表中 ≥ 60 篇记录
- [ ] 每个 IELTS 10-18 真题至少有 2 篇配套范文
- [ ] 所有范文都标注 `source_url` 和 `source_name`

## 注意事项

- **不要**爬取任何登录墙后的内容
- **不要**伪造分数 / 作者 / 来源
- **必须**尊重 robots.txt
- 频率限制 + User-Agent 伪装是基础
- 遇到反爬立即停止，不要硬刚

## 完成后

回复我：
1. 抓取到的范文数量统计
2. 数据质量抽样（每篇来源 1 段预览）
3. 任何遇到的问题 + 解决方案