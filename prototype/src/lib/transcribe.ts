/** OpenAI Whisper 转写：上传录音 Blob，返回英文文本 */

function extensionForMime(mimeType: string): string {
  const base = mimeType.split(';')[0]?.trim().toLowerCase() || ''
  if (base.includes('mp4') || base.includes('m4a') || base.includes('aac')) return 'mp4'
  if (base.includes('webm')) return 'webm'
  if (base.includes('ogg') || base.includes('opus')) return 'ogg'
  if (base.includes('mpeg') || base.includes('mp3')) return 'mp3'
  if (base.includes('wav')) return 'wav'
  return 'webm'
}

/** 开发态走 Vite 同源代理，避免浏览器 CORS 拦截 Whisper */
function whisperEndpoint(): string {
  if (typeof window !== 'undefined') {
    const { hostname, port } = window.location
    if (hostname === 'localhost' || hostname === '127.0.0.1' || port === '5180') {
      return '/__openai/v1/audio/transcriptions'
    }
  }
  return 'https://api.openai.com/v1/audio/transcriptions'
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

function extractOpenAiErrorMessage(bodyText: string): string {
  try {
    const data = JSON.parse(bodyText) as { error?: { message?: string } }
    return (data.error?.message || '').trim()
  } catch {
    return ''
  }
}

function mapTranscribeError(err: unknown, status?: number, bodyText?: string): Error {
  if (err instanceof DOMException && err.name === 'AbortError') {
    return new Error('转写超时，请缩短录音后重试')
  }
  if (status === 401) {
    return new Error('Whisper API Key 无效或未授权，请到设置页检查')
  }
  if (status === 429) {
    return new Error('Whisper 请求过于频繁，请稍后再试')
  }
  if (status === 413) {
    return new Error('录音文件过大，请缩短录音后重试')
  }
  if (typeof status === 'number' && status >= 400) {
    const apiMsg = extractOpenAiErrorMessage(bodyText || '')
    const snippet = apiMsg || (bodyText || '').slice(0, 160).trim()
    return new Error(snippet ? `转写失败（${status}）：${snippet}` : `转写失败（HTTP ${status}）`)
  }
  if (err instanceof TypeError || /Failed to fetch|NetworkError/i.test(String(err))) {
    return new Error('转写请求被拦截或网络失败。请确认已配置 Whisper Key，并刷新页面后重试')
  }
  return err instanceof Error ? err : new Error(String(err) || '转写失败')
}

export async function transcribeWithWhisper(
  blob: Blob,
  apiKey: string,
  mimeType?: string,
): Promise<string> {
  const key = apiKey.trim()
  if (!key) {
    throw new Error('未配置 Whisper API Key，请先到设置页填写')
  }
  if (!blob || blob.size <= 0) {
    throw new Error('录音为空，无法转写')
  }

  const type = mimeType || blob.type || 'audio/webm'
  const ext = extensionForMime(type)
  const file = new File([blob], `speaking.${ext}`, { type })

  const form = new FormData()
  form.append('file', file)
  form.append('model', 'whisper-1')
  form.append('language', 'en')
  form.append('response_format', 'json')

  let response: Response
  try {
    response = await fetchWithTimeout(
      whisperEndpoint(),
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}` },
        body: form,
      },
      90000,
    )
  } catch (e) {
    throw mapTranscribeError(e)
  }

  const bodyText = await response.text().catch(() => '')
  if (!response.ok) {
    throw mapTranscribeError(null, response.status, bodyText)
  }

  let data: { text?: string }
  try {
    data = JSON.parse(bodyText) as { text?: string }
  } catch {
    throw new Error('转写返回格式异常')
  }

  const text = (data.text || '').replace(/\s+/g, ' ').trim()
  if (!text) {
    throw new Error('未识别到英文内容，请重录或听回放后手动输入')
  }
  return text
}
