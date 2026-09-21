/** 从粘贴文本解析写作 / 口语题目（宽松格式，便于从备考资料复制） */

import type { WritingTopic } from '../data/writingTopics'
import type { SpeakingTopic } from '../data/speakingTopics'

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function splitBlocks(raw: string): string[] {
  const text = raw.replace(/\r\n/g, '\n').trim()
  if (!text) return []
  // --- / === / 空行分段
  return text
    .split(/\n\s*(?:-{3,}|={3,}|\*{3,})\s*\n|\n{2,}/)
    .map((b) => b.trim())
    .filter((b) => b.length >= 8)
}

function guessWritingType(prompt: string): string {
  const p = prompt.toLowerCase()
  if (/to what extent|agree or disagree|do you agree/.test(p)) return '观点类'
  if (/discuss both/.test(p)) return '讨论类'
  if (/advantages|disadvantages|positive|negative|pros and cons/.test(p)) return '利弊类'
  if (/what are the (main )?causes|what are the reasons|how can|solutions?/.test(p)) return '问题+解决方案'
  if (/the (chart|graph|table|diagram|map|process)|summarise the information/.test(p)) return '图表类'
  return '自定义'
}

function detectWritingTask(block: string, prompt: string): 1 | 2 {
  const head = block.slice(0, 80).toLowerCase()
  if (/task\s*1\b|图表|academic task 1|gt task 1/.test(head)) return 1
  if (/task\s*2\b/.test(head)) return 2
  if (/the (chart|graph|table|diagram|map)|summarise the information|write a letter/.test(prompt.toLowerCase())) {
    return 1
  }
  return 2
}

function stripWritingMeta(line: string): string {
  return line
    .replace(/^(task\s*[12]\s*[:：\-|｜]?\s*)/i, '')
    .replace(/^(写作|作文|题目)\s*[:：]\s*/i, '')
    .trim()
}

/** 解析写作题目粘贴文本 → WritingTopic[] */
export function parseWritingImport(raw: string): { topics: WritingTopic[]; warnings: string[] } {
  const warnings: string[] = []
  const blocks = splitBlocks(raw)
  if (!blocks.length) {
    return { topics: [], warnings: ['没有识别到题目。请粘贴完整英文题干，多题可用空行或 --- 分隔。'] }
  }

  const topics: WritingTopic[] = []
  for (const block of blocks) {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean)
    let taskHint: 1 | 2 | null = null
    let typeHint = ''
    const bodyLines: string[] = []

    for (const line of lines) {
      const mTask = line.match(/^task\s*([12])\b/i)
      if (mTask && line.length < 40) {
        taskHint = Number(mTask[1]) as 1 | 2
        const rest = stripWritingMeta(line)
        if (rest.length > 12) bodyLines.push(rest)
        continue
      }
      const mType = line.match(/^(题型|类型)\s*[:：]\s*(.+)$/i)
      if (mType) {
        typeHint = mType[2].trim()
        continue
      }
      // Task 2 | 观点类
      const pipe = line.match(/^task\s*([12])\s*[|｜]\s*(.+)$/i)
      if (pipe) {
        taskHint = Number(pipe[1]) as 1 | 2
        typeHint = pipe[2].trim()
        continue
      }
      bodyLines.push(stripWritingMeta(line))
    }

    const prompt = bodyLines.join(' ').replace(/\s+/g, ' ').trim()
    if (prompt.length < 20) {
      warnings.push(`已跳过过短片段：${prompt.slice(0, 24) || '(空)'}…`)
      continue
    }
    const task = taskHint ?? detectWritingTask(block, prompt)
    const type = typeHint || guessWritingType(prompt)
    topics.push({
      id: uid('imp-w'),
      book: 0,
      test: 0,
      examDate: '导入',
      task,
      prompt,
      type,
      tags: ['导入'],
      difficulty: 'medium',
      essayCount: 0,
    })
  }

  if (!topics.length && !warnings.length) {
    warnings.push('未能解析出有效题目')
  }
  return { topics, warnings }
}

function detectSpeakingPart(block: string): 1 | 2 | 3 {
  const head = block.slice(0, 120).toLowerCase()
  if (/part\s*3\b|口语\s*3/.test(head)) return 3
  if (/part\s*2\b|口语\s*2|cue\s*card|describe a |you should say/.test(head)) return 2
  if (/part\s*1\b|口语\s*1/.test(head)) return 1
  if (/describe a |talk about a |you should say/.test(block.toLowerCase())) return 2
  return 1
}

function isSubQuestionLine(line: string): boolean {
  return /^([•\-\*]|\d+[\.\)、]|you should say[:：]?)/i.test(line.trim())
}

function cleanSub(line: string): string {
  return line
    .replace(/^([•\-\*]|\d+[\.\)、])\s*/, '')
    .replace(/^you should say[:：]?\s*/i, '')
    .trim()
}

/** 解析口语题目粘贴文本 → SpeakingTopic[] */
export function parseSpeakingImport(raw: string): { topics: SpeakingTopic[]; warnings: string[] } {
  const warnings: string[] = []
  const blocks = splitBlocks(raw)
  if (!blocks.length) {
    return { topics: [], warnings: ['没有识别到题目。请粘贴 Part 题干；追问可用 - 或 1. 开头；多题用空行或 --- 分隔。'] }
  }

  const topics: SpeakingTopic[] = []
  for (const block of blocks) {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean)
    let part: 1 | 2 | 3 | null = null
    const promptLines: string[] = []
    const subs: string[] = []
    let inSubs = false

    for (const line of lines) {
      const mPart = line.match(/^part\s*([123])\b/i) || line.match(/^口语\s*([123])\b/)
      if (mPart && line.length < 24) {
        part = Number(mPart[1]) as 1 | 2 | 3
        continue
      }
      if (/^you should say/i.test(line) || /^追问|补充问题/.test(line)) {
        inSubs = true
        const rest = cleanSub(line)
        if (rest) subs.push(rest)
        continue
      }
      if (isSubQuestionLine(line) || inSubs) {
        inSubs = true
        const s = cleanSub(line)
        if (s) subs.push(s)
        continue
      }
      promptLines.push(line.replace(/^(题目|问题)\s*[:：]\s*/i, ''))
    }

    const prompt = promptLines.join(' ').replace(/\s+/g, ' ').trim()
    if (prompt.length < 8) {
      warnings.push(`已跳过过短片段：${prompt.slice(0, 24) || '(空)'}…`)
      continue
    }
    const resolvedPart = part ?? detectSpeakingPart(block)
    topics.push({
      id: uid('imp-s'),
      examPeriod: '导入',
      part: resolvedPart,
      prompt,
      subQuestions: subs.length ? subs : undefined,
      tags: ['导入'],
      hasAudio: false,
      difficulty: 'medium',
    })
  }

  if (!topics.length && !warnings.length) {
    warnings.push('未能解析出有效题目')
  }
  return { topics, warnings }
}

export const WRITING_IMPORT_EXAMPLE = `Task 2
Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?

---

Task 1
The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011.
Summarise the information by selecting and reporting the main features, and make comparisons where relevant.`

export const SPEAKING_IMPORT_EXAMPLE = `Part 1
Let's talk about your hometown. Where is your hometown?
- What do you like most about your hometown?
- Has your hometown changed much since you were a child?

---

Part 2
Describe a book that you enjoyed reading.
You should say:
- what the book was
- when you read it
- what it was about
and explain why you enjoyed it.`
