/**
 * MiniMax 语音识别（ASR）—— /v1/speech_to_text
 * 9 月 12 日上线，按 2.50 元 / 小时 计费。
 * 这里负责：multipart 上传音频、错误码映射、错误信息中文化。
 *
 * 设计：
 * - 优先用 `api.minimax.cn`（官方文档站点的 server URL）。
 * - 走和 TTS/评分 同一份 API Key（用户配置在 settings）。
 * - 失败时把 401/402/413/422/429/500 等给出明确提示，方便上层区分走回退。
 */

import { loadAIConfig } from './ai-config'

/** 文档上 server URL 为 https://api.minimax.cn */
export const MINIMAX_ASR_URL = 'https://api.minimax.cn/v1/speech_to_text'
/** 唯一可用模型：asr-1.0 */
export const MINIMAX_ASR_MODEL = 'asr-1.0'

/** 文档支持的语言标签（BCP-47）。不传则自动走中英混识别 */
export const SUPPORTED_LANGUAGES = [
  'zh',
  'yue',
  'en',
  'ja',
  'ko',
  'th',
  'vi',
  'id',
  'ms',
  'fil',
  'ar',
  'tr',
  'fr',
  'de',
  'es',
  'it',
  'pt',
  'pl',
  'ru',
  'uk',
] as const

export type AsrLanguage = (typeof SUPPORTED_LANGUAGES)[number] | ''

export type AsrOptions = {
  /** BCP-47 语言标签；空字符串则由后端自动识别（中英混） */
  language?: AsrLanguage
  /** 客户端额外 prompt（兼容服务端未来字段） */
  prompt?: string
  /** 直接传入已有 API Key，未传则从 settings 读 */
  apiKey?: string
  /** 用于 UI 提示的来源标识，便于显示在「我的口语」 */
  source?: 'minimax' | 'mac' | 'whisper' | 'browser'
}

export type AsrSuccess = {
  ok: true
  text: string
  durationSec: number
  traceId?: string
  language?: string
  provider: 'minimax'
}

export type AsrFailure = {
  ok: false
  code:
    | 'NO_KEY'
    | 'NO_AUDIO'
    | 'TOO_LARGE'
    | 'TOO_LONG'
    | 'SENSITIVE'
    | 'RATE_LIMIT'
    | 'INSUFFICIENT_BALANCE'
    | 'AUTH'
    | 'BAD_REQUEST'
    | 'NETWORK'
    | 'EMPTY_TEXT'
    | 'UPSTREAM'
  message: string
  provider: 'minimax'
  httpStatus?: number
}

export type AsrResult = AsrSuccess | AsrFailure

export function resolveMinimaxApiKey(): string {
  const cfg = loadAIConfig()
  return cfg.apiKey?.trim() || ''
}

const MIME_FALLBACK = 'audio/mp4'

function pickFilename(blob: Blob, mimeType?: string): string {
  const mt = (mimeType || blob.type || '').toLowerCase()
  if (mt.includes('mp3')) return `recording-${Date.now()}.mp3`
  if (mt.includes('wav')) return `recording-${Date.now()}.wav`
  if (mt.includes('flac')) return `recording-${Date.now()}.flac`
  if (mt.includes('ogg') || mt.includes('opus')) return `recording-${Date.now()}.ogg`
  if (mt.includes('aac')) return `recording-${Date.now()}.aac`
  if (mt.includes('aiff') || mt.includes('aif')) return `recording-${Date.now()}.aiff`
  if (mt.includes('mp4') || mt.includes('m4a')) return `recording-${Date.now()}.m4a`
  return `recording-${Date.now()}.bin`
}

/** 估算时长（秒）：MediaRecorder 一般不带时长，回退用文件大小粗估 */
function estimateDuration(blob: Blob): number {
  // 16 kHz mono 16-bit PCM ≈ 32 KB/s；mp3/opus 大致同量级；
  // 这里只用作「我的口语」展示与计费预估，精度无需很高。
  const sec = blob.size / 32000
  return Math.max(0.1, Number(sec.toFixed(2)))
}

export async function transcribeWithMinimaxAsr(
  blob: Blob,
  opts: AsrOptions = {},
): Promise<AsrResult> {
  if (!blob || blob.size < 64) {
    return {
      ok: false,
      code: 'NO_AUDIO',
      message: '录音为空，无法转写',
      provider: 'minimax',
    }
  }
  // 50 MB 上限，文档硬限制
  if (blob.size > 50 * 1024 * 1024) {
    return {
      ok: false,
      code: 'TOO_LARGE',
      message: `录音文件超过 50 MB 上限（当前 ${(blob.size / 1024 / 1024).toFixed(1)} MB）`,
      provider: 'minimax',
    }
  }

  const apiKey = (opts.apiKey || resolveMinimaxApiKey()).trim()
  if (!apiKey) {
    return {
      ok: false,
      code: 'NO_KEY',
      message: '请先到「设置」填写 MiniMax API Key（评分 Key 即可，ASR 共用）',
      provider: 'minimax',
    }
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
  }
  if (opts.language) {
    headers['language'] = opts.language
  }

  const form = new FormData()
  form.append('model', MINIMAX_ASR_MODEL)
  form.append('file', blob, pickFilename(blob, opts.prompt ? undefined : undefined))
  // 默认一次性 json 返回；上层若需要时间戳可以再扩展
  form.append('response_format', 'verbose_json')

  let response: Response
  try {
    response = await fetch(MINIMAX_ASR_URL, {
      method: 'POST',
      headers,
      body: form,
    })
  } catch (e) {
    return {
      ok: false,
      code: 'NETWORK',
      message: `MiniMax ASR 网络失败：${e instanceof Error ? e.message : '未知错误'}`,
      provider: 'minimax',
    }
  }

  if (!response.ok) {
    // 错误响应是 OpenAI 风格 JSON
    let body: unknown = null
    try {
      body = await response.json()
    } catch {
      try {
        body = await response.text()
      } catch {
        /* ignore */
      }
    }
    const detail = extractOaiError(body)
    const mapped = mapHttpError(response.status, detail)
    return mapped
  }

  let json: {
    text?: string
    duration?: number
    trace_id?: string
  }
  try {
    json = (await response.json()) as typeof json
  } catch (e) {
    return {
      ok: false,
      code: 'UPSTREAM',
      message: `MiniMax ASR 返回无法解析：${e instanceof Error ? e.message : '未知错误'}`,
      provider: 'minimax',
      httpStatus: response.status,
    }
  }

  const text = (json.text || '').replace(/\s+/g, ' ').trim()
  if (!text) {
    return {
      ok: false,
      code: 'EMPTY_TEXT',
      message: 'MiniMax ASR 没有识别到文字，请重录并说清楚一点',
      provider: 'minimax',
      httpStatus: response.status,
    }
  }

  return {
    ok: true,
    text,
    durationSec: typeof json.duration === 'number' ? json.duration : estimateDuration(blob),
    traceId: json.trace_id,
    language: opts.language || undefined,
    provider: 'minimax',
  }
}

type OaiErrorBody = {
  type?: string
  error?: { type?: string; message?: string; http_code?: string }
  message?: string
}

function extractOaiError(body: unknown): string {
  if (!body) return ''
  if (typeof body === 'string') return body.slice(0, 240)
  const b = body as OaiErrorBody
  return (b.error?.message || b.message || '').slice(0, 240)
}

function mapHttpError(httpStatus: number, detail: string): AsrFailure {
  const fallback: AsrFailure = {
    ok: false,
    code: 'UPSTREAM',
    message: `MiniMax ASR 失败 (HTTP ${httpStatus})${detail ? `：${detail}` : ''}`,
    provider: 'minimax',
    httpStatus,
  }

  switch (httpStatus) {
    case 400:
      // 文档提到 400 也用于「时长超过 500 秒」
      if (/duration|500s|exceeds/i.test(detail)) {
        return {
          ...fallback,
          code: 'TOO_LONG',
          message: '单段录音超过 500 秒上限，请分段练习',
        }
      }
      return {
        ...fallback,
        code: 'BAD_REQUEST',
        message: `MiniMax ASR 参数错误：${detail || '请检查音频格式'}`,
      }
    case 401:
      return {
        ...fallback,
        code: 'AUTH',
        message: 'MiniMax API Key 无效或未授权（HTTP 401）',
      }
    case 402:
      return {
        ...fallback,
        code: 'INSUFFICIENT_BALANCE',
        message: 'MiniMax 账户余额不足，请充值后再用 ASR',
      }
    case 413:
      return {
        ...fallback,
        code: 'TOO_LARGE',
        message: '音频超过 50 MB 上限',
      }
    case 422:
      return {
        ...fallback,
        code: 'SENSITIVE',
        message: '音频内容被 MiniMax 内容安全拦截，可改用本地 SFSpeech 转写',
      }
    case 429:
      return {
        ...fallback,
        code: 'RATE_LIMIT',
        message: 'MiniMax ASR 触发限流，请稍后重试',
      }
    default:
      return fallback
  }
}

/** 上层快捷：拿到 AsrResult 后取纯文本（成功）或抛错（失败） */
export async function transcribeWithMinimaxAsrText(
  blob: Blob,
  opts: AsrOptions = {},
): Promise<string> {
  const r = await transcribeWithMinimaxAsr(blob, opts)
  if (!r.ok) throw new Error(r.message)
  return r.text
}