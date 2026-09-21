# 04 · AI 评估规格

## 1. 评估能力

### 1.1 写作评估

**输入**：用户提交的作文（英文文本）+ 题目 prompt  
**输出**：四项评分 + 详细反馈

```typescript
interface AIEvaluation {
  overall: number                          // 综合分（4 项平均，0.5 进制）
  bandCriteria: {
    taskResponse: number                   // 任务回应度
    coherence: number                      // 连贯衔接
    lexical: number                        // 词汇丰富度
    grammar: number                        // 语法
  }
  feedback: {
    summary: string                        // 一句话总评
    good: string[]                         // 优点清单
    improve: string[]                      // 改进清单
    error: string[]                        // 错误清单
    vocabUpgrade: { original: string; better: string }[]   // 词汇升级建议
    structureTips: string[]                // 结构建议
  }
}
```

### 1.2 口语评估

**输入**：用户录音（音频文件）+ 转写文本 + 题目  
**输出**：四项评分 + 维度反馈 + 改进建议

```typescript
interface SpeakingEvaluation {
  overall: number
  bandCriteria: {
    fluency: number
    lexical: number
    grammar: number
    pronunciation: number
  }
  transcript: string                       // 转写文本（已校正）
  feedback: {
    fluency: string
    pronunciation: string
    grammar: string
    content: string
  }
  duration: number                         // 录音时长（秒）
}
```

## 2. AI 模型配置

### 2.1 默认模型

```yaml
provider: minimax
model: minimax/MiniMax-M3
temperature: 0.3
max_tokens: 2000
```

### 2.2 备选模型（可配置切换）

```yaml
# Anthropic Claude
provider: claude
model: claude-sonnet-4.5
temperature: 0.3

# OpenAI GPT-4o
provider: openai
model: gpt-4o
temperature: 0.3
```

**推荐场景**：
- 写作评估：MiniMax-M3（够用，速度快）
- 口语评估：Claude Sonnet 4.5（更细腻，语感好）
- 高精度需求：GPT-4o

### 2.3 API Key 管理

```typescript
// macOS Keychain 存储
import { safeStorage } from '@tauri-apps/plugin-stronghold'

const apiKey = await safeStorage.get('ai-api-key')
await safeStorage.set('ai-api-key', 'sk-xxx...')
```

## 3. 写作评估 Prompt

### 3.1 System Prompt

```markdown
You are an experienced IELTS Writing examiner with 15+ years of marking experience. 
You assess essays using the official IELTS band descriptors (Task Response, 
Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy).

You always:
- Score in 0.5 increments (5.0, 5.5, 6.0, ... 9.0)
- Provide actionable, specific feedback
- Reference the original text when pointing out issues
- Suggest concrete vocabulary/grammar upgrades
- Output in valid JSON matching the AIEvaluation schema
```

### 3.2 User Prompt 模板

```markdown
# Task
{topic.task === 2 ? 'Task 2' : 'Task 1'} — {topic.prompt}

# Word count requirement
Task 2: minimum 250 words
Task 1: minimum 150 words

# Student's essay
{userContent}

# Word count
{wordCount}

# Your task
Evaluate the essay using the official IELTS band descriptors. Output in JSON format:

{
  "overall": <0.5-step number 5.0-9.0>,
  "bandCriteria": {
    "taskResponse": <0.5-step number>,
    "coherence": <0.5-step number>,
    "lexical": <0.5-step number>,
    "grammar": <0.5-step number>
  },
  "feedback": {
    "summary": "<one-sentence overall assessment>",
    "good": ["<strength 1>", "<strength 2>", ...],
    "improve": ["<improvement 1>", "<improvement 2>", ...],
    "error": ["<error 1>", ...],
    "vocabUpgrade": [
      {"original": "<common word/phrasing>", "better": "<IELTS-appropriate alternative>"},
      ...
    ],
    "structureTips": ["<tip 1>", "<tip 2>", ...]
  }
}

# IELTS Band Descriptors (summary)

Task Response:
- 9: Fully addresses all parts, presents fully developed position with relevant extended and well-supported ideas
- 8: Sufficiently addresses all parts, presents a well-developed response with relevant, extended and supported ideas
- 7: Addresses all parts, presents a clear position throughout, presents, extends and supports main ideas
- 6: Addresses all parts, presents a relevant position, presents relevant main ideas
- 5: Addresses the task only partially, presents some main ideas but limited development

Coherence & Cohesion:
- 9: Uses cohesion in such a way that it attracts no attention, skillfully manages paragraphing
- 8: Sequences information and ideas logically, manages all aspects of cohesion well
- 7: Logically organizes information, clear progression, uses a range of cohesive devices appropriately
- 6: Arranges information coherently, clear overall progression, uses cohesive devices effectively
- 5: Presents information with some organisation but lacks overall progression

Lexical Resource:
- 9: Uses a wide range of vocabulary with very natural and sophisticated control
- 8: Uses a wide range of vocabulary fluently and flexibly
- 7: Uses a sufficient range of vocabulary with flexibility and precision
- 6: Uses an adequate range of vocabulary for the task, attempts to use less common vocabulary
- 5: Uses a limited range of vocabulary

Grammatical Range & Accuracy:
- 9: Uses a wide range of structures with full flexibility and accuracy
- 8: Uses a wide range of structures, majority of sentences are error-free
- 7: Uses a variety of complex structures, produces frequent error-free sentences
- 6: Uses a mix of simple and complex sentence forms, makes some errors
- 5: Uses only a limited range of structures

Output the JSON now.
```

### 3.3 Few-shot 示例（嵌入 system prompt）

```json
{
  "example_input": "Some people think that the best way to reduce crime is to give longer prison sentences. Discuss both views and give your opinion.\n\n[Essay text...]",
  "example_output": {
    "overall": 7.0,
    "bandCriteria": {
      "taskResponse": 7.0,
      "coherence": 6.5,
      "lexical": 7.0,
      "grammar": 7.0
    },
    "feedback": {
      "summary": "The essay addresses both views and presents a clear position, but development could be stronger with more specific examples.",
      "good": [
        "Clear four-paragraph structure following the standard IELTS format",
        "Uses conditional clauses ('If they face longer sentences') accurately",
        "Presents a balanced discussion of both perspectives"
      ],
      "improve": [
        "Add at least one specific real-world case (e.g., Norway's prison system) to strengthen arguments",
        "Replace 'important' with 'crucial' or 'vital' for higher lexical score",
        "Strengthen the conclusion by restating your position more decisively"
      ],
      "error": [],
      "vocabUpgrade": [
        {"original": "important", "better": "crucial / vital / essential"},
        {"original": "more and more", "better": "an increasing number of / a growing proportion of"},
        {"original": "good", "better": "beneficial / advantageous"}
      ],
      "structureTips": [
        "Use the 'On the one hand / On the other hand' framework for discussion essays",
        "Each body paragraph should contain: topic sentence + explanation + example + link back"
      ]
    }
  }
}
```

## 4. 口语评估 Prompt

### 4.1 System Prompt

```markdown
You are an experienced IELTS Speaking examiner with 15+ years of marking experience.
You assess speaking responses using the official IELTS band descriptors:
Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy,
Pronunciation.

You always:
- Score in 0.5 increments
- Mark filler words (um, uh, you know, like) in the transcript
- Provide dimension-specific feedback (fluency, pronunciation, grammar, content)
- Identify grammar errors and natural phrasing upgrades
- Output in valid JSON matching the SpeakingEvaluation schema
```

### 4.2 User Prompt

```markdown
# Part
Part {topic.part}

# Question
{topic.prompt}

# Transcript (from Whisper)
{transcript}

# Duration
{duration} seconds

# Your task
Evaluate this speaking response. Mark filler words by wrapping them in <mark> tags.
Output in JSON:

{
  "overall": <0.5-step>,
  "bandCriteria": {
    "fluency": <0.5-step>,
    "lexical": <0.5-step>,
    "grammar": <0.5-step>,
    "pronunciation": <0.5-step>
  },
  "transcript": "<original text with <mark>filler words</mark> highlighted>",
  "feedback": {
    "fluency": "<specific feedback on pace, pauses, fillers, self-correction>",
    "pronunciation": "<specific feedback on sounds, stress, intonation>",
    "grammar": "<specific feedback on structure variety and accuracy>",
    "content": "<specific feedback on relevance, depth, organization>"
  },
  "duration": {duration}
}
```

## 5. 范文分析 Prompt（用于爬取的真实范文）

> 注意：此 prompt 只用于**分析**已有范文，**不生成**任何范文内容。

### 5.1 System Prompt

```markdown
You are an IELTS Writing expert. Your task is to ANALYZE (not write) given 
high-scoring essays. You identify WHY they scored well.

You always:
- Reference specific sentences from the original essay
- Provide structural, logical, and linguistic analysis
- Highlight vocabulary and grammar features
- Output in valid JSON matching the EssayAnalysis schema
```

### 5.2 User Prompt

```markdown
# Topic
{topic.prompt}

# High-scoring essay (score: {score})
{essayContent}

# Your task
Analyze why this essay scored {score}. Output in JSON:

{
  "structure": "<paragraph-by-paragraph structural analysis>",
  "logic": "<argumentation logic analysis: how claims are supported>",
  "vocabHighlights": [
    {"word": "<high-score word/phrase>", "meaning": "<Chinese translation>"},
    ...
  ],
  "bandCriteria": {
    "taskResponse": <0.5-step>,
    "coherence": <0.5-step>,
    "lexical": <0.5-step>,
    "grammar": <0.5-step>
  },
  "whyHighScore": [
    "<reason 1>",
    "<reason 2>",
    ...
  ]
}
```

## 6. 评估质量保证

### 6.1 一致性测试
- 准备 10 篇已知分数的真实考生作文
- 用 prompt 评估，看与官方分数的偏差
- 偏差 > 1.0 分的 prompt 需要调整

### 6.2 反馈有效性
- 反馈必须可执行（"add a specific example" 而不是 "improve examples"）
- 词汇升级必须给出原词 + 替换词
- 结构建议必须具体到段

### 6.3 错误处理
- API 超时：重试 3 次，提示用户
- JSON 解析失败：要求模型重试 + 严格 prompt
- 不合理分数：检查 prompt 是否完整，重新生成

## 7. 成本估算

| 操作 | Token 估算 | 费用（MiniMax-M3） |
|---|---|---|
| 写作评估 1 次 | ~2000 输入 + 1500 输出 | ~$0.01 |
| 口语评估 1 次 | ~1500 输入 + 1500 输出 | ~$0.008 |
| 范文分析 1 篇 | ~1000 输入 + 800 输出 | ~$0.006 |
| 100 次评估/月 | - | ~$1.5 |

**月运营成本极低**，个人使用完全无压力。