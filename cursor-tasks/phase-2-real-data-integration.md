# Cursor Task · Phase 2 · 真实数据整合

> 🎯 目标：把采集的真实数据接入到 React 原型，去掉所有 AI 仿写样本，替换为真实范文。

## 上下文

承接 Phase 1。Phase 1 已采集 ≥ 60 篇真实范文 + AI 分析。本阶段把这些数据接入到前端 UI。

参考文档：
- `docs/01-product-requirements.md` — UI 字段要求
- `docs/02-tech-architecture.md` — SQLite schema
- `docs/03-data-strategy.md` — 数据格式

## 当前状态

`prototype/src/data/` 下：
- `writingTopics.ts`：36 道剑桥 IELTS 10-18 真题（**保留**）
- `essays`：当前是 AI 仿写，**必须删除**
- `speakingTopics.ts`：6 个口语题（保留）
- `greatSpeaking.ts`：当前是 AI 仿写，**必须删除**

## 任务清单

### Task 2.1 · 数据转换脚本

**目标**：把 Phase 1 采集的 JSON 数据转为前端可直接 import 的 TypeScript 模块。

创建 `scripts/transform_to_ts.py`：
- 读 `data/raw/ielts_liz_essays.json` + `ielts_simon_essays.json`
- 合并去重
- 输出 `prototype/src/data/essays.ts`，字段格式与当前一致：

```typescript
interface Essay {
  id: string
  topicId: string
  score: number                    // ≥ 8.0
  author: string                   // 例：'IELTS Liz Sample Answer'
  source: string                   // URL
  sourceName: string               // 例：'IELTS Liz'
  wordCount: number
  timeSpent: number
  content: string
  analysis: {
    structure: string
    logic: string
    vocabHighlights: { word: string; meaning: string }[]
    bandCriteria: {
      taskResponse: number
      coherence: number
      lexical: number
      grammar: number
    }
    whyHighScore: string[]
  }
}
```

### Task 2.2 · 删除 AI 仿写内容

- 删除 `prototype/src/data/greatSpeaking.ts` 内容（保留接口和空数组占位）
- `prototype/src/data/essays.ts` 完全替换为真实数据
- 在 `Essay` 类型上加 `sourceName` 字段

### Task 2.3 · UI 标注来源

**重要**：每篇范文的展示页面必须标注来源。

修改 `prototype/src/pages/TopicDetail.tsx`：
- 范文头部加一行："来源：IELTS Liz · ieltsliz.com/xxx"
- 链接到原文 URL（target="_blank"）

### Task 2.4 · 真题关联范文

**目标**：每道雅思真题在 UI 上能显示对应的范文数量。

修改 `prototype/src/data/writingTopics.ts`，确保每个 topic 的 `essayCount` 与 `essays.ts` 实际数量一致。

写一个验证脚本 `scripts/verify_topics.py`，遍历所有 essays，统计每个 topicId 的数量，与 writingTopics 对比。

### Task 2.5 · 口语优秀录音（Phase 1 没做完的话）

如果 Phase 1 没做口语录音，本任务跳过。

否则：
- 转换 `data/raw/great_speaking.json` 为 `prototype/src/data/greatSpeaking.ts`
- UI 标注来源（YouTube URL + 频道名）
- 音频文件放在 `prototype/public/audio/`（TBD）

## 验收标准

- [ ] `prototype/src/data/essays.ts` 全部为真实数据，无 AI 仿写
- [ ] 每篇范文有 `source` 和 `sourceName` 字段
- [ ] 题目详情页显示范文来源
- [ ] 雅思 10-18 全部 36 道 Task 2 都有 ≥ 2 篇范文
- [ ] 在 `http://localhost:5180/#/writing/c14-t4-t2` 能看到范文来源链接
- [ ] 没有任何 AI 生成的"sample answer"残留

## 完成后

回复我：
1. 替换前后对比（之前多少 AI 仿写，现在多少真实数据）
2. UI 截图（TopicDetail 页面，标注来源可见）
3. 是否有数据质量问题