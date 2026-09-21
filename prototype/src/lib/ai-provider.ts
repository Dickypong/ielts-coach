import type { WritingTopic } from '../data/writingTopics'
import type { SpeakingTopic } from '../data/speakingTopics'
import type { AIEvaluation, SpeakingEvaluation } from './ai'
import { evaluateEssay as mockEvaluateEssay, evaluateSpeaking as mockEvaluateSpeaking } from './ai'
import type { AIConfig } from './ai-config'

export interface AIProvider {
  name: string
  evaluateEssay(content: string, topic: WritingTopic): Promise<AIEvaluation>
  evaluateSpeaking(transcript: string, topic: SpeakingTopic, duration?: number): Promise<SpeakingEvaluation>
}

const ESSAY_SYSTEM = `You are an experienced IELTS Writing examiner with 15+ years of marking experience.
You assess essays using the official IELTS band descriptors (Task Response,
Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy).

You always:
- Score in 0.5 increments (5.0, 5.5, 6.0, ... 9.0)
- Explain HOW each band score was decided, with evidence from the student's text
- Provide actionable, specific feedback in Chinese for feedback fields when helpful, but keep improvedEssay.content in English
- Rewrite the student's essay into a Band 8.0–9.0 model answer that keeps their core position/ideas but upgrades structure, vocabulary, grammar, and examples
- Output valid JSON matching the AIEvaluation schema exactly`

const SPEAKING_SYSTEM = `You are an IELTS Speaking examiner and coach for language learning.
You assess spoken answers using official IELTS Speaking band descriptors:
Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, Pronunciation.

Scoring calibration (important — avoid harsh underscoring):
- You receive a speech-to-text transcript (may contain ASR noise) and duration, NOT raw audio.
- Do NOT heavily penalize ASR artifacts (odd spellings, missing punctuation, homophones, casing).
- Pronunciation: without audio, keep it close to the other three bands (usually within ±0.5). Do not invent severe pronunciation penalties.
- A coherent Part 1 answer that addresses the question with some grammar/vocab slips typically lands around 6.0–7.0, not 4.5–5.5.
- Only use bands ≤5.5 when the answer barely addresses the question, is extremely short, or is largely incomprehensible even after allowing for ASR noise.
- overall should be the average of the four criteria, rounded to the nearest 0.5.
- Give benefit of the doubt when content clearly answers the question.

Coaching output:
- Keep feedback professional and constructive.
- Feedback and mistake reasons preferably in Chinese; English answers in English.
- Provide TWO English model answers: improvedAnswer (rewrite keeping the candidate's ideas) AND modelAnswer (stronger official-style answer for THIS question, Band ~7.5–8.5).
- Provide scoringPoints: 3–6 short Chinese tips on what examiners look for on THIS question.
- Output valid JSON only. Do not include disallowed or unsafe content.`

/** MiniMax 内容安全误伤时的温和重试提示（尽量全英文，降低敏感拦截） */
const SPEAKING_SYSTEM_SAFE = `You are an IELTS Speaking tutor for educational assessment only.
Score fairly using official IELTS speaking criteria. Do not undershoot: coherent answers with minor slips are usually 6.0–7.0.
Without audio, keep pronunciation close to other bands.
Provide improvedAnswer (based on learner ideas), modelAnswer (strong answer for the question), and scoringPoints (short tips).
Be constructive and professional. Output valid JSON only.`

function buildEssayUserPrompt(content: string, topic: WritingTopic): string {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length
  return `# Task
Task ${topic.task} — ${topic.prompt}

# Word count requirement
Task 2: minimum 250 words
Task 1: minimum 150 words

# Student's essay
${content}

# Word count
${wordCount}

# Your task
1) Score the essay with official IELTS descriptors.
2) For EACH criterion, explain why that score (not higher/lower), cite evidence from the essay, and say what is missing for the next 0.5 band.
3) Explain how overall score is derived from the four criteria.
4) Rewrite an improved English essay targeting Band 8.0 or above, based on THIS student's ideas (do not invent an unrelated essay). Keep the same overall opinion if possible.
5) List whatChanged compared with the original.

Output JSON only:

{
  "overall": <0.5-step number 5.0-9.0>,
  "overallRationale": "<Chinese: how overall was calculated from the four bands>",
  "bandCriteria": {
    "taskResponse": <0.5-step>,
    "coherence": <0.5-step>,
    "lexical": <0.5-step>,
    "grammar": <0.5-step>
  },
  "scoringDetails": {
    "taskResponse": {
      "score": <same as bandCriteria.taskResponse>,
      "why": "<Chinese: why this score vs official descriptor>",
      "evidence": ["<quote or paraphrase from student essay>", "..."],
      "gapToNext": "<Chinese: what to do to gain +0.5>"
    },
    "coherence": { "score": <n>, "why": "...", "evidence": ["..."], "gapToNext": "..." },
    "lexical": { "score": <n>, "why": "...", "evidence": ["..."], "gapToNext": "..." },
    "grammar": { "score": <n>, "why": "...", "evidence": ["..."], "gapToNext": "..." }
  },
  "feedback": {
    "summary": "<Chinese one-sentence overall assessment>",
    "good": ["<Chinese>"],
    "improve": ["<Chinese>"],
    "error": ["<Chinese or English error quotes>"],
    "vocabUpgrade": [
      {"original": "<from essay>", "better": "<IELTS-appropriate alternative>"}
    ],
    "structureTips": ["<Chinese>"]
  },
  "improvedEssay": {
    "targetBand": <8.0 or 8.5 or 9.0>,
    "wordCount": <integer>,
    "content": "<FULL improved English essay, 250+ words for Task 2>",
    "whatChanged": ["<Chinese: key upgrade 1>", "<Chinese: key upgrade 2>", "..."]
  }
}

Output the JSON now.`
}

function buildSpeakingUserPrompt(transcript: string, topic: SpeakingTopic, duration: number): string {
  return `# IELTS Speaking Part ${topic.part}
Question: ${topic.prompt}
${topic.subQuestions?.length ? `Follow-ups:\n- ${topic.subQuestions.join('\n- ')}` : ''}

# Candidate transcript (speech-to-text; may include ASR noise)
${transcript}

# Speaking duration (seconds)
${duration}

# Your task
1) Score the four criteria fairly (see calibration — avoid harsh underscoring).
2) List at most 4 concrete language improvements.
3) improvedAnswer: rewrite in English keeping THEIR ideas (Part1: 4–6 sentences; Part2: keep concise).
4) modelAnswer: a strong official-style English answer for THIS question (Band ~7.5–8.5), keep concise.
5) scoringPoints: exactly 3–5 short Chinese tips.
6) Keep JSON compact. Do not truncate mid-array — finish all brackets.

Output JSON only:
{
  "overall": <0.5-step 4.0-9.0>,
  "bandCriteria": {
    "fluency": <0.5-step>,
    "lexical": <0.5-step>,
    "grammar": <0.5-step>,
    "pronunciation": <0.5-step>
  },
  "transcript": "<echo cleaned transcript; keep fillers if present>",
  "mistakes": [
    {
      "original": "<exact weak phrase from transcript>",
      "better": "<stronger natural English>",
      "reason": "<Chinese: why this is weaker>",
      "type": "grammar|vocab|fluency|pronunciation|content"
    }
  ],
  "improvedAnswer": "<English rewrite based on candidate ideas>",
  "modelAnswer": "<English high-band answer for this question>",
  "scoringPoints": ["<Chinese tip 1>", "<Chinese tip 2>", "<Chinese tip 3>"],
  "feedback": {
    "fluency": "<Chinese>",
    "pronunciation": "<Chinese; approximate>",
    "grammar": "<Chinese>",
    "content": "<Chinese>"
  },
  "duration": ${duration}
}`
}

function buildSpeakingUserPromptSafe(transcript: string, topic: SpeakingTopic, duration: number): string {
  return `IELTS Speaking Part ${topic.part}
Question: ${topic.prompt}
Transcript: ${transcript}
DurationSeconds: ${duration}

Score fairly (coherent answers with minor slips ~6.0–7.0). Keep pronunciation near other bands.
Return JSON only with keys:
overall, bandCriteria {fluency,lexical,grammar,pronunciation},
transcript, mistakes [{original,better,reason,type}],
improvedAnswer (English, based on learner),
modelAnswer (English, strong answer for the question),
scoringPoints (array of short Chinese tips),
feedback {fluency,pronunciation,grammar,content} (English ok),
duration.`
}

function mapMinimaxFailure(body: {
  base_resp?: { status_code?: number; status_msg?: string }
  output_sensitive?: boolean
  input_sensitive?: boolean
  choices?: { message?: { content?: string } }[]
}): Error | null {
  const code = body.base_resp?.status_code ?? 0
  const msg = (body.base_resp?.status_msg || '').trim()
  const lower = msg.toLowerCase()
  const content = body.choices?.[0]?.message?.content?.trim() || ''

  if (body.output_sensitive || code === 1027 || /output_?sensitive/i.test(lower)) {
    return new Error('MINIMAX_OUTPUT_SENSITIVE')
  }
  if (body.input_sensitive || /input_?sensitive/i.test(lower)) {
    return new Error('MINIMAX_INPUT_SENSITIVE')
  }
  if (code && code !== 0) {
    return new Error(msg || `MiniMax 返回失败 (${code})`)
  }
  if (!content) {
    // 敏感拦截有时只清空 content，status 仍为 0
    return new Error('MINIMAX_OUTPUT_SENSITIVE')
  }
  return null
}

function friendlyMinimaxError(err: unknown): Error {
  const msg = err instanceof Error ? err.message : String(err)
  if (msg === 'MINIMAX_OUTPUT_SENSITIVE') {
    return new Error('MiniMax 内容安全误拦截了评分结果。请点「开始评分」再试一次；若仍失败，可稍改转写文字后重试。')
  }
  if (msg === 'MINIMAX_INPUT_SENSITIVE') {
    return new Error('转写内容触发了 MiniMax 输入安全策略。请微调文字后重新评分。')
  }
  return err instanceof Error ? err : new Error(msg)
}

function stripJsonFence(text: string): string {
  let trimmed = text.trim()
  const fence = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i)
  if (fence) trimmed = fence[1].trim()
  // 有时模型在 JSON 前后夹杂说明文字
  const start = trimmed.indexOf('{')
  if (start > 0) trimmed = trimmed.slice(start)
  return trimmed.trim()
}

/** 修复 MiniMax 常见截断 JSON（未闭合的数组/对象/字符串） */
function repairTruncatedJson(raw: string): string {
  let s = stripJsonFence(raw)
  // 去掉结尾残破的尾随逗号后再闭合
  s = s.replace(/,\s*$/, '')

  let inString = false
  let escape = false
  const stack: string[] = []

  for (let i = 0; i < s.length; i++) {
    const ch = s[i]
    if (inString) {
      if (escape) {
        escape = false
        continue
      }
      if (ch === '\\') {
        escape = true
        continue
      }
      if (ch === '"') inString = false
      continue
    }
    if (ch === '"') {
      inString = true
      continue
    }
    if (ch === '{') stack.push('}')
    else if (ch === '[') stack.push(']')
    else if (ch === '}' || ch === ']') {
      if (stack.length && stack[stack.length - 1] === ch) stack.pop()
    }
  }

  if (inString) s += '"'
  // 去掉字符串闭合后可能残留的尾随逗号
  s = s.replace(/,\s*$/, '')
  while (stack.length) s += stack.pop()
  return s
}

function parseJsonResponse(text: string): unknown {
  const trimmed = stripJsonFence(text)
  const attempts = [trimmed, repairTruncatedJson(trimmed)]

  // 再试：截到最后一个完整对象片段（贪婪匹配可能含残缺，修复后再 parse）
  const objMatch = trimmed.match(/\{[\s\S]*/)
  if (objMatch) attempts.push(repairTruncatedJson(objMatch[0]))

  let lastErr: unknown = null
  for (const candidate of attempts) {
    try {
      return JSON.parse(candidate)
    } catch (e) {
      lastErr = e
    }
  }

  const detail = lastErr instanceof Error ? lastErr.message : '未知错误'
  throw new Error(`AI 返回的 JSON 无法解析（${detail}）。请再点一次「开始评分」。`)
}

function isJsonParseError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err)
  return /json|parse|expected\s*['`]?[\]\}]/i.test(msg)
}

function defaultReason(score: number, label: string): import('./ai').ScoringReason {
  return {
    score,
    why: `按官方描述，该项约在 ${score} 分档；模型未返回更细理由时的兜底说明（${label}）。`,
    evidence: [],
    gapToNext: '对照范文与反馈清单，针对该项补强具体例证与表达精度。',
  }
}

function normalizeEvaluation(raw: unknown): AIEvaluation {
  const data = raw as AIEvaluation
  if (!data?.bandCriteria || !data?.feedback || typeof data.overall !== 'number') {
    throw new Error('评分结果字段不完整')
  }
  const bc = data.bandCriteria
  const sd = data.scoringDetails || ({} as AIEvaluation['scoringDetails'])
  const improved = data.improvedEssay

  return {
    overall: data.overall,
    overallRationale:
      data.overallRationale ||
      `总分 ${data.overall}：综合 Task Response ${bc.taskResponse}、连贯 ${bc.coherence}、词汇 ${bc.lexical}、语法 ${bc.grammar} 后按 0.5 分档给出。`,
    bandCriteria: {
      taskResponse: bc.taskResponse,
      coherence: bc.coherence,
      lexical: bc.lexical,
      grammar: bc.grammar,
    },
    scoringDetails: {
      taskResponse: sd.taskResponse || defaultReason(bc.taskResponse, 'Task Response'),
      coherence: sd.coherence || defaultReason(bc.coherence, 'Coherence'),
      lexical: sd.lexical || defaultReason(bc.lexical, 'Lexical'),
      grammar: sd.grammar || defaultReason(bc.grammar, 'Grammar'),
    },
    feedback: {
      summary: data.feedback.summary || '',
      good: data.feedback.good || [],
      improve: data.feedback.improve || [],
      error: data.feedback.error || [],
      vocabUpgrade: data.feedback.vocabUpgrade || [],
      structureTips: data.feedback.structureTips || [],
    },
    improvedEssay: {
      targetBand: improved?.targetBand ?? 8.0,
      wordCount:
        improved?.wordCount ||
        (improved?.content ? improved.content.trim().split(/\s+/).filter(Boolean).length : 0),
      content: improved?.content || '',
      whatChanged: improved?.whatChanged || [],
    },
  }
}

function roundHalf(n: number): number {
  if (!Number.isFinite(n)) return 5.5
  return Math.round(n * 2) / 2
}

function clampBand(n: number): number {
  return Math.min(9, Math.max(4, roundHalf(n)))
}

function normalizeSpeakingEvaluation(
  raw: unknown,
  fallbackTranscript: string,
  duration: number,
): SpeakingEvaluation {
  const data = raw as SpeakingEvaluation & {
    mistakes?: SpeakingEvaluation['mistakes']
    improvedAnswer?: string
    modelAnswer?: string
    scoringPoints?: string[]
  }
  if (!data?.bandCriteria || !data?.feedback || typeof data.overall !== 'number') {
    throw new Error('口语评分结果字段不完整')
  }
  const mistakes = Array.isArray(data.mistakes)
    ? data.mistakes
        .filter((m) => m && (m.original || m.better || m.reason))
        .map((m) => ({
          original: m.original || '',
          better: m.better || '',
          reason: m.reason || '',
          type: (m.type || 'grammar') as SpeakingEvaluation['mistakes'][number]['type'],
        }))
    : []

  const fluency = clampBand(data.bandCriteria.fluency)
  const lexical = clampBand(data.bandCriteria.lexical)
  const grammar = clampBand(data.bandCriteria.grammar)
  let pronunciation = clampBand(data.bandCriteria.pronunciation)
  // 无音频时：发音分不要明显低于其他三项均值
  const otherAvg = (fluency + lexical + grammar) / 3
  if (pronunciation < otherAvg - 0.5) {
    pronunciation = clampBand(otherAvg - 0.5)
  }

  const mean = (fluency + lexical + grammar + pronunciation) / 4
  let overall = clampBand(data.overall)
  // 若模型总分明显低于四项均值，按均值上调（纠正常见偏低）
  if (overall < mean - 0.25) {
    overall = clampBand(mean)
  }

  const scoringPoints = Array.isArray(data.scoringPoints)
    ? data.scoringPoints.map((p) => String(p || '').trim()).filter(Boolean).slice(0, 8)
    : []

  return {
    overall,
    bandCriteria: { fluency, lexical, grammar, pronunciation },
    transcript: data.transcript || fallbackTranscript,
    mistakes,
    improvedAnswer: data.improvedAnswer || '',
    modelAnswer: data.modelAnswer || '',
    scoringPoints,
    feedback: {
      fluency: data.feedback.fluency || '',
      pronunciation: data.feedback.pronunciation || '',
      grammar: data.feedback.grammar || '',
      content: data.feedback.content || '',
    },
    duration: typeof data.duration === 'number' ? data.duration : duration,
  }
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs = 10000): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

class MinimaxProvider implements AIProvider {
  name = 'minimax/MiniMax-M3'
  constructor(private config: AIConfig) {}

  async evaluateEssay(content: string, topic: WritingTopic): Promise<AIEvaluation> {
    if (!this.config.apiKey) throw new Error('未配置 MiniMax API Key，请先到设置页填写')

    const response = await fetchWithTimeout(
      'https://api.minimaxi.com/v1/text/chatcompletion_v2',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.model || 'MiniMax-M3',
          messages: [
            { role: 'system', content: ESSAY_SYSTEM },
            { role: 'user', content: buildEssayUserPrompt(content, topic) },
          ],
          temperature: this.config.temperature ?? 0.3,
          max_tokens: 8000,
          response_format: { type: 'json_object' },
        }),
      },
      120000,
    )

    if (!response.ok) {
      const errText = await response.text().catch(() => '')
      throw new Error(
        `MiniMax API 错误 (${response.status})${errText ? `: ${errText.slice(0, 180)}` : ''}，请检查 Key 或网络后重试`,
      )
    }

    const body = (await response.json()) as {
      choices?: { message?: { content?: string } }[]
      base_resp?: { status_code?: number; status_msg?: string }
    }

    if (body.base_resp?.status_code && body.base_resp.status_code !== 0) {
      throw new Error(body.base_resp.status_msg || 'MiniMax 返回失败')
    }

    const text = body.choices?.[0]?.message?.content
    if (!text) throw new Error('MiniMax 未返回内容')
    const normalized = normalizeEvaluation(parseJsonResponse(text))
    if (!normalized.improvedEssay.content || normalized.improvedEssay.content.includes('Mock 模式')) {
      throw new Error('MiniMax 未返回改进范文，请重试一次评分')
    }
    return normalized
  }

  async evaluateSpeaking(transcript: string, topic: SpeakingTopic, duration = 0): Promise<SpeakingEvaluation> {
    if (!this.config.apiKey) throw new Error('未配置 MiniMax API Key，请先到设置页填写')
    if (!transcript.trim()) throw new Error('没有转写文本，无法评分')

    const callOnce = async (safe: boolean) => {
      const response = await fetchWithTimeout(
        'https://api.minimaxi.com/v1/text/chatcompletion_v2',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: this.config.model || 'MiniMax-M3',
            messages: [
              { role: 'system', content: safe ? SPEAKING_SYSTEM_SAFE : SPEAKING_SYSTEM },
              {
                role: 'user',
                content: safe
                  ? buildSpeakingUserPromptSafe(transcript, topic, duration)
                  : buildSpeakingUserPrompt(transcript, topic, duration),
              },
            ],
            temperature: safe ? 0.2 : this.config.temperature ?? 0.3,
            max_tokens: safe ? 3200 : 4500,
            response_format: { type: 'json_object' },
          }),
        },
        90000,
      )

      if (!response.ok) {
        throw new Error(`MiniMax 口语评分失败 (${response.status})`)
      }
      const body = (await response.json()) as {
        choices?: { message?: { content?: string } }[]
        base_resp?: { status_code?: number; status_msg?: string }
        output_sensitive?: boolean
        input_sensitive?: boolean
      }
      const fail = mapMinimaxFailure(body)
      if (fail) throw fail
      const text = body.choices?.[0]?.message?.content || ''
      return normalizeSpeakingEvaluation(parseJsonResponse(text), transcript, duration)
    }

    try {
      return await callOnce(false)
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      const shouldRetrySafe =
        msg === 'MINIMAX_OUTPUT_SENSITIVE' ||
        msg === 'MINIMAX_INPUT_SENSITIVE' ||
        isJsonParseError(e)
      if (shouldRetrySafe) {
        try {
          return await callOnce(true)
        } catch (e2) {
          throw friendlyMinimaxError(e2)
        }
      }
      throw friendlyMinimaxError(e)
    }
  }
}

class ClaudeProvider implements AIProvider {
  name = 'claude'
  constructor(private config: AIConfig) {}

  async evaluateEssay(content: string, topic: WritingTopic): Promise<AIEvaluation> {
    if (!this.config.apiKey) throw new Error('未配置 Claude API Key')

    const response = await fetchWithTimeout(
      'https://api.anthropic.com/v1/messages',
      {
        method: 'POST',
        headers: {
          'x-api-key': this.config.apiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.model || 'claude-sonnet-4-5',
          max_tokens: 4500,
          temperature: this.config.temperature ?? 0.3,
          system: ESSAY_SYSTEM,
          messages: [{ role: 'user', content: buildEssayUserPrompt(content, topic) }],
        }),
      },
      60000,
    )

    if (!response.ok) throw new Error(`Claude API 错误 (${response.status})`)
    const body = (await response.json()) as { content?: { type: string; text?: string }[] }
    const text = body.content?.find((c) => c.type === 'text')?.text
    if (!text) throw new Error('Claude 未返回内容')
    return normalizeEvaluation(parseJsonResponse(text))
  }

  async evaluateSpeaking(transcript: string, topic: SpeakingTopic, duration = 0): Promise<SpeakingEvaluation> {
    if (!this.config.apiKey) throw new Error('未配置 Claude API Key')
    if (!transcript.trim()) throw new Error('没有转写文本，无法评分')

    const response = await fetchWithTimeout(
      'https://api.anthropic.com/v1/messages',
      {
        method: 'POST',
        headers: {
          'x-api-key': this.config.apiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.model || 'claude-sonnet-4-5',
          max_tokens: 2500,
          temperature: this.config.temperature ?? 0.3,
          system: SPEAKING_SYSTEM,
          messages: [{ role: 'user', content: buildSpeakingUserPrompt(transcript, topic, duration) }],
        }),
      },
      90000,
    )
    if (!response.ok) throw new Error(`Claude 口语评分失败 (${response.status})`)
    const body = (await response.json()) as { content?: { type: string; text?: string }[] }
    const text = body.content?.find((c) => c.type === 'text')?.text
    if (!text) throw new Error('Claude 未返回口语评分')
    return normalizeSpeakingEvaluation(parseJsonResponse(text), transcript, duration)
  }
}

class OpenAIProvider implements AIProvider {
  name = 'openai'
  constructor(private config: AIConfig) {}

  async evaluateEssay(content: string, topic: WritingTopic): Promise<AIEvaluation> {
    if (!this.config.apiKey) throw new Error('未配置 OpenAI API Key')

    const response = await fetchWithTimeout(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.model || 'gpt-4o',
          temperature: this.config.temperature ?? 0.3,
          max_tokens: 4500,
          response_format: { type: 'json_object' },
          messages: [
            { role: 'system', content: ESSAY_SYSTEM },
            { role: 'user', content: buildEssayUserPrompt(content, topic) },
          ],
        }),
      },
      60000,
    )

    if (!response.ok) throw new Error(`OpenAI API 错误 (${response.status})`)
    const body = (await response.json()) as { choices?: { message?: { content?: string } }[] }
    const text = body.choices?.[0]?.message?.content
    if (!text) throw new Error('OpenAI 未返回内容')
    return normalizeEvaluation(parseJsonResponse(text))
  }

  async evaluateSpeaking(transcript: string, topic: SpeakingTopic, duration = 0): Promise<SpeakingEvaluation> {
    if (!this.config.apiKey) throw new Error('未配置 OpenAI API Key')
    if (!transcript.trim()) throw new Error('没有转写文本，无法评分')

    const response = await fetchWithTimeout(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.model || 'gpt-4o',
          temperature: this.config.temperature ?? 0.3,
          max_tokens: 2500,
          response_format: { type: 'json_object' },
          messages: [
            { role: 'system', content: SPEAKING_SYSTEM },
            { role: 'user', content: buildSpeakingUserPrompt(transcript, topic, duration) },
          ],
        }),
      },
      90000,
    )
    if (!response.ok) throw new Error(`OpenAI 口语评分失败 (${response.status})`)
    const body = (await response.json()) as { choices?: { message?: { content?: string } }[] }
    const text = body.choices?.[0]?.message?.content
    if (!text) throw new Error('OpenAI 未返回口语评分')
    return normalizeSpeakingEvaluation(parseJsonResponse(text), transcript, duration)
  }
}

class MockProvider implements AIProvider {
  name = 'mock'
  async evaluateEssay(content: string, _topic: WritingTopic): Promise<AIEvaluation> {
    return mockEvaluateEssay(content)
  }
  async evaluateSpeaking(transcript: string, _topic: SpeakingTopic, duration = 0): Promise<SpeakingEvaluation> {
    return mockEvaluateSpeaking(transcript, duration)
  }
}

export function getAIProvider(config: AIConfig): AIProvider {
  switch (config.provider) {
    case 'minimax':
      return new MinimaxProvider(config)
    case 'claude':
      return new ClaudeProvider(config)
    case 'openai':
      return new OpenAIProvider(config)
    case 'mock':
    default:
      return new MockProvider()
  }
}

/**
 * 正式 Provider 失败时不再静默回退 Mock（否则会出现「明明接了 MiniMax 却只有 Mock 范文」）。
 * 需要本地演示时，请在设置里主动选 Mock。
 */
export async function evaluateEssayWithProvider(
  content: string,
  topic: WritingTopic,
  config: AIConfig,
): Promise<{ result: AIEvaluation; usedFallback: boolean; error?: string }> {
  const provider = getAIProvider(config)
  if (config.provider !== 'mock' && !config.apiKey.trim()) {
    throw new Error(
      `当前 Provider 是 ${config.provider}，但未填写 API Key。请到「设置」粘贴 Key 并点保存（或点「从 OpenClaw 导入」）。`,
    )
  }
  const result = await provider.evaluateEssay(content, topic)
  return { result, usedFallback: false }
}

export async function evaluateSpeakingWithProvider(
  transcript: string,
  topic: SpeakingTopic,
  duration: number,
  config: AIConfig,
): Promise<SpeakingEvaluation> {
  const provider = getAIProvider(config)
  if (config.provider !== 'mock' && !config.apiKey.trim()) {
    throw new Error(
      `当前 Provider 是 ${config.provider}，但未填写 API Key。请到「设置」导入/填写 Key 后再分析口语。`,
    )
  }
  return provider.evaluateSpeaking(transcript, topic, duration)
}
