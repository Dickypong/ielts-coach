# Cursor Task · Phase 3 · AI 评估闭环

> 🎯 目标：接入真实 AI 评估 API，用户提交作文后能拿到真实评分。

## 上下文

承接 Phase 2。前端已接入真实数据。本阶段把 mock 的 AI 评估（`prototype/src/lib/ai.ts`）替换为真实 API 调用。

参考文档：
- `docs/02-tech-architecture.md` — AI Provider 抽象层
- `docs/04-ai-evaluation.md` — 评分规格和 Prompt（**必读**）

## 当前状态

`prototype/src/lib/ai.ts` 是 mock：
```typescript
export async function evaluateEssay(text: string): Promise<AIEvaluation> {
  // 假逻辑
}
```

## 任务清单

### Task 3.1 · AI Provider 抽象

创建 `prototype/src/lib/ai-provider.ts`：

```typescript
interface AIProvider {
  name: string
  evaluateEssay(content: string, topic: WritingTopic): Promise<AIEvaluation>
  evaluateSpeaking(transcript: string, topic: SpeakingTopic): Promise<SpeakingEvaluation>
}

export function getAIProvider(config: AIConfig): AIProvider {
  switch (config.provider) {
    case 'minimax': return new MinimaxProvider(config)
    case 'claude': return new ClaudeProvider(config)
    case 'openai': return new OpenAIProvider(config)
  }
}
```

### Task 3.2 · Minimax Provider（默认）

实现 `MinimaxProvider`，调用 `minimax/MiniMax-M3`。

**API 调用**：
```typescript
const response = await fetch('https://api.minimaxi.com/v1/text/chatcompletion_v2', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'MiniMax-M3',
    messages: [...],
    temperature: 0.3,
    response_format: { type: 'json_object' }
  })
})
```

**Prompt 模板**：完全照搬 `docs/04-ai-evaluation.md` 第 3.2 节。

### Task 3.3 · API Key 配置页

创建 `prototype/src/pages/Settings.tsx`（替换占位页）：
- Provider 选择（minimax / claude / openai）
- Model 输入
- API Key 输入（密码框）
- 测试连接按钮
- 保存到 localStorage（**MVP 阶段**，Tauri 阶段用 Keychain）

### Task 3.4 · 端到端测试

修改 `prototype/src/pages/EssaySubmit.tsx`：
- 调用真实 `getAIProvider(config).evaluateEssay(...)`
- 显示加载状态（"AI 正在评分..."）
- 错误处理（API 失败、超时）

测试用题目：剑桥 14 Test 4（`c14-t4-t2`）。

### Task 3.5 · 评分一致性测试

创建 `scripts/test_eval_consistency.py`：
- 准备 5 篇已知分数的样本作文（从抓取的范文里挑）
- 调用 AI 评估，对比与范文分数的偏差
- 偏差 > 1.0 分的需要调整 prompt

输出报告：
```
Sample 1: official 8.5, AI 8.5, diff 0.0 ✓
Sample 2: official 9.0, AI 8.5, diff 0.5 ✓
Sample 3: official 7.0, AI 7.5, diff 0.5 ✓
...
```

### Task 3.6 · 历史记录（M3 可选）

可选任务，本地保存用户历史评分。

- 创建 `prototype/src/store/history.ts`（Zustand）
- 持久化到 localStorage
- 在 Dashboard 显示最近 5 次评估

## 验收标准

- [ ] `MinimaxProvider` 能调用真实 MiniMax-M3 API
- [ ] 提交作文后 ≤ 5 秒拿到评分
- [ ] 评分 JSON 格式正确，能渲染到 UI
- [ ] API Key 安全存储（至少不在控制台输出）
- [ ] 错误有友好提示（"网络错误，请重试"）
- [ ] 评分一致性测试：平均偏差 < 0.5 分

## 注意事项

- API Key 不要 hardcode
- 不要在 console.log 打印用户作文全文
- 评分失败要 fallback 到 mock
- 响应时间超过 10 秒要提示用户

## 完成后

回复我：
1. 真实 API 调用的截图（评分结果显示）
2. 一致性测试报告
3. 任何 prompt 调整