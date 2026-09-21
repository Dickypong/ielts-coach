/** MiniMax 同步语音合成（T2A v2）——带内存 + IndexedDB 缓存，避免重复烧 token */

import { loadAIConfig } from './ai-config'

const TTS_URL = 'https://api.minimaxi.com/v1/t2a_v2'
/** 英文女声：清晰、适合口语示范跟读 */
const DEFAULT_VOICE = 'English_Graceful_Lady'
const DEFAULT_MODEL = 'speech-02-hd'
/** 单次请求建议控制长度，过长则分段合成后拼接 */
const MAX_CHARS = 1800

const DB_NAME = 'ielts-coach-tts-cache'
const STORE = 'clips'
const DB_VERSION = 1

export type TtsResult = {
  blob: Blob
  mimeType: string
  url: string
  /** 是否命中缓存（未重新调用 MiniMax） */
  fromCache: boolean
}

type DbRecord = {
  id: string
  mimeType: string
  blob: Blob
  createdAt: number
}

const memoryCache = new Map<string, TtsResult>()
/** 同一文案并发点击时共用一次合成请求 */
const inflight = new Map<string, Promise<TtsResult>>()

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onerror = () => reject(req.error || new Error('无法打开 TTS 缓存库'))
    req.onsuccess = () => resolve(req.result)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' })
      }
    }
  })
}

function idbReq<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error || new Error('IndexedDB 失败'))
  })
}

async function hashKey(raw: string): Promise<string> {
  const data = new TextEncoder().encode(raw)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 40)
}

function cacheKeyFor(text: string): string {
  return `${DEFAULT_MODEL}|${DEFAULT_VOICE}|${text}`
}

async function readDisk(id: string): Promise<DbRecord | null> {
  try {
    const db = await openDb()
    try {
      const tx = db.transaction(STORE, 'readonly')
      const row = await idbReq(tx.objectStore(STORE).get(id) as IDBRequest<DbRecord | undefined>)
      return row?.blob ? row : null
    } finally {
      db.close()
    }
  } catch {
    return null
  }
}

async function writeDisk(id: string, blob: Blob, mimeType: string): Promise<void> {
  try {
    const db = await openDb()
    try {
      const tx = db.transaction(STORE, 'readwrite')
      const record: DbRecord = { id, mimeType, blob, createdAt: Date.now() }
      await idbReq(tx.objectStore(STORE).put(record))
    } finally {
      db.close()
    }
  } catch {
    /* 磁盘缓存失败不影响播放 */
  }
}

function hexToUint8Array(hex: string): Uint8Array {
  const clean = hex.replace(/\s+/g, '')
  if (clean.length % 2 !== 0) throw new Error('MiniMax 语音数据格式异常')
  const out = new Uint8Array(clean.length / 2)
  for (let i = 0; i < clean.length; i += 2) {
    out[i / 2] = parseInt(clean.slice(i, i + 2), 16)
  }
  return out
}

function splitText(text: string, maxLen: number): string[] {
  const trimmed = text.replace(/\s+/g, ' ').trim()
  if (!trimmed) return []
  if (trimmed.length <= maxLen) return [trimmed]

  const parts: string[] = []
  let rest = trimmed
  while (rest.length > maxLen) {
    let cut = rest.lastIndexOf('. ', maxLen)
    if (cut < maxLen * 0.4) cut = rest.lastIndexOf('? ', maxLen)
    if (cut < maxLen * 0.4) cut = rest.lastIndexOf('! ', maxLen)
    if (cut < maxLen * 0.4) cut = rest.lastIndexOf(' ', maxLen)
    if (cut < maxLen * 0.4) cut = maxLen
    else cut += 1
    parts.push(rest.slice(0, cut).trim())
    rest = rest.slice(cut).trim()
  }
  if (rest) parts.push(rest)
  return parts
}

async function synthesizeChunk(text: string, apiKey: string): Promise<Uint8Array> {
  const response = await fetch(TTS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      text,
      stream: false,
      language_boost: 'English',
      output_format: 'hex',
      voice_setting: {
        voice_id: DEFAULT_VOICE,
        speed: 0.95,
        vol: 1,
        pitch: 0,
      },
      audio_setting: {
        sample_rate: 32000,
        bitrate: 128000,
        format: 'mp3',
        channel: 1,
      },
    }),
  })

  if (!response.ok) {
    const errText = await response.text().catch(() => '')
    throw new Error(
      `MiniMax 语音合成失败 (${response.status})${errText ? `: ${errText.slice(0, 160)}` : ''}`,
    )
  }

  const body = (await response.json()) as {
    data?: { audio?: string; status?: number }
    base_resp?: { status_code?: number; status_msg?: string }
  }

  const code = body.base_resp?.status_code ?? 0
  if (code !== 0) {
    throw new Error(body.base_resp?.status_msg || `MiniMax TTS 失败 (${code})`)
  }

  const hex = body.data?.audio || ''
  if (!hex) throw new Error('MiniMax 未返回语音数据')
  return hexToUint8Array(hex)
}

export function resolveMinimaxApiKey(): string {
  const cfg = loadAIConfig()
  return cfg.apiKey?.trim() || ''
}

function toResult(blob: Blob, mimeType: string, fromCache: boolean): TtsResult {
  return {
    blob,
    mimeType,
    url: URL.createObjectURL(blob),
    fromCache,
  }
}

/**
 * 合成示范语音。同一 model+voice+文本只会真正请求 MiniMax 一次：
 * 1) 内存命中  2) IndexedDB 命中  3) 否则合成并双写缓存
 * 已缓存的回放不需要 API Key。
 */
export async function synthesizeDemoSpeech(text: string, apiKey?: string): Promise<TtsResult> {
  const cleaned = text.replace(/\s+/g, ' ').trim()
  if (!cleaned) throw new Error('没有可朗读的文字')

  const logicalKey = cacheKeyFor(cleaned)
  const mem = memoryCache.get(logicalKey)
  if (mem) return { ...mem, fromCache: true }

  const pending = inflight.get(logicalKey)
  if (pending) return pending

  const job = (async (): Promise<TtsResult> => {
    const diskId = await hashKey(logicalKey)
    const disk = await readDisk(diskId)
    if (disk?.blob) {
      const result = toResult(disk.blob, disk.mimeType || disk.blob.type || 'audio/mpeg', true)
      memoryCache.set(logicalKey, result)
      return result
    }

    const key = (apiKey || resolveMinimaxApiKey()).trim()
    if (!key) throw new Error('请先到设置页填写 MiniMax API Key，才能朗读示范')

    const chunks = splitText(cleaned, MAX_CHARS)
    const buffers: Uint8Array[] = []
    for (const chunk of chunks) {
      buffers.push(await synthesizeChunk(chunk, key))
    }

    const total = buffers.reduce((n, b) => n + b.length, 0)
    const merged = new Uint8Array(total)
    let offset = 0
    for (const b of buffers) {
      merged.set(b, offset)
      offset += b.length
    }

    const mimeType = 'audio/mpeg'
    const blob = new Blob([merged], { type: mimeType })
    await writeDisk(diskId, blob, mimeType)
    const result = toResult(blob, mimeType, false)
    memoryCache.set(logicalKey, result)
    return result
  })()

  inflight.set(logicalKey, job)
  try {
    return await job
  } finally {
    inflight.delete(logicalKey)
  }
}

/** 仅查缓存（不发起合成），用于 UI 预热 */
export async function peekDemoSpeechCache(text: string): Promise<TtsResult | null> {
  const cleaned = text.replace(/\s+/g, ' ').trim()
  if (!cleaned) return null
  const logicalKey = cacheKeyFor(cleaned)
  const mem = memoryCache.get(logicalKey)
  if (mem) return { ...mem, fromCache: true }
  try {
    const diskId = await hashKey(logicalKey)
    const disk = await readDisk(diskId)
    if (!disk?.blob) return null
    const result = toResult(disk.blob, disk.mimeType || 'audio/mpeg', true)
    memoryCache.set(logicalKey, result)
    return result
  } catch {
    return null
  }
}

export function revokeTtsCache(): void {
  for (const item of memoryCache.values()) {
    URL.revokeObjectURL(item.url)
  }
  memoryCache.clear()
  inflight.clear()
}
