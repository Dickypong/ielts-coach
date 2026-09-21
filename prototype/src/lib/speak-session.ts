/**
 * 口语练习会话：
 * - 录音阶段：只用 MediaRecorder（绝不与 SpeechRecognition 抢麦，否则会录成空音）
 * - 听写阶段：停录并释放麦克风后，再单独开 SpeechRecognition 填文字
 */

import { delay, startMicRecording, type MicLevel, type RecorderHandle } from './speech-recorder'

export type SpeakPartial = {
  level: number
  hasVoice: boolean
}

export type SpeakSessionHandle = {
  stop: () => Promise<{
    transcript: string
    durationSec: number
    audioUrl: string | null
    blob: Blob | null
    mimeType: string
    byteSize: number
    note: string
  }>
  release: () => void
}

type RecResult = { isFinal: boolean; 0: { transcript: string } }
type RecEvent = { resultIndex: number; results: ArrayLike<RecResult> }

type SpeechRecLike = {
  lang: string
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
  onresult: ((ev: RecEvent) => void) | null
  onerror: ((ev?: { error?: string }) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
  abort?: () => void
}

export function speechRecognitionSupported(): boolean {
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecLike
    webkitSpeechRecognition?: new () => SpeechRecLike
  }
  return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition)
}

function getSpeechCtor(): (new () => SpeechRecLike) | null {
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecLike
    webkitSpeechRecognition?: new () => SpeechRecLike
  }
  return w.SpeechRecognition || w.webkitSpeechRecognition || null
}

/** 仅录音 + 音量，不做实时识别 */
export async function startSpeakSession(
  onTick?: (elapsedSec: number) => void,
  onPartial?: (p: SpeakPartial) => void,
): Promise<SpeakSessionHandle> {
  const recorder = await startMicRecording((lv: MicLevel) => {
    onPartial?.({ level: lv.level, hasVoice: lv.hasVoice })
  })

  let released = false
  const startedAt = Date.now()
  let timer: number | null = window.setInterval(() => {
    onTick?.(Math.max(0, Math.round((Date.now() - startedAt) / 1000)))
  }, 400)

  const release = () => {
    if (released) return
    released = true
    if (timer) {
      window.clearInterval(timer)
      timer = null
    }
    recorder.release()
  }

  return {
    release,
    stop: async () => {
      if (timer) {
        window.clearInterval(timer)
        timer = null
      }
      const { blob, durationSec, byteSize, mimeType } = await recorder.stop()
      released = true
      const usable = byteSize > 800
      let audioUrl: string | null = null
      if (usable) {
        audioUrl = URL.createObjectURL(blob)
      }
      const note = usable
        ? '录音已保存，正在自动转写并评分…'
        : '几乎没录到声音。请对着麦克风说话，看音量条是否跳动，然后重录。'
      return {
        transcript: '',
        durationSec,
        audioUrl,
        blob: usable ? blob : null,
        mimeType: mimeType || blob.type || '',
        byteSize,
        note,
      }
    },
  }
}

export type DictationHandle = {
  stop: () => Promise<string>
  abort: () => void
}

/**
 * 听写：必须在录音释放麦克风之后调用。
 * 桌面 WKWebView 可能仍无结果（依赖系统/网络识别服务）。
 */
export async function startDictation(
  onPartial: (text: string, interim: string) => void,
): Promise<DictationHandle> {
  const Ctor = getSpeechCtor()
  if (!Ctor) {
    throw new Error('当前环境不支持语音听写。请直接在输入框里打英文。')
  }

  // 确保上一轮麦克风已释放
  await delay(400)

  const rec = new Ctor()
  rec.lang = 'en-US'
  rec.continuous = true
  rec.interimResults = true
  rec.maxAlternatives = 1

  let finals = ''
  let interim = ''
  let stopped = false
  let fatal: string | null = null

  rec.onresult = (event) => {
    let inter = ''
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const piece = event.results[i][0]?.transcript || ''
      if (event.results[i].isFinal) {
        finals = `${finals} ${piece}`.replace(/\s+/g, ' ').trim()
      } else {
        inter += piece
      }
    }
    interim = inter.trim()
    onPartial(finals, interim)
  }

  rec.onerror = (ev) => {
    const code = ev?.error || ''
    if (code === 'aborted' || code === 'no-speech') return
    if (code === 'not-allowed' || code === 'service-not-allowed') {
      fatal = '听写权限不可用，请手动输入英文'
    } else if (code === 'network') {
      fatal = '听写需要网络（桌面端常见限制），请手动输入英文'
    } else if (code === 'audio-capture') {
      fatal = '听写无法占用麦克风，请手动输入英文'
    } else {
      fatal = `听写失败（${code || 'unknown'}），请手动输入英文`
    }
  }

  rec.onend = () => {
    if (stopped) return
    try {
      rec.start()
    } catch {
      /* ignore */
    }
  }

  try {
    rec.start()
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : '无法开始听写')
  }

  return {
    abort: () => {
      stopped = true
      try {
        rec.abort?.()
      } catch {
        try {
          rec.stop()
        } catch {
          /* ignore */
        }
      }
    },
    stop: () =>
      new Promise((resolve, reject) => {
        stopped = true
        const finish = () => {
          const text = [finals, interim].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim()
          if (fatal && !text) reject(new Error(fatal))
          else resolve(text)
        }
        rec.onend = () => finish()
        try {
          rec.stop()
        } catch {
          finish()
          return
        }
        window.setTimeout(finish, 900)
      }),
  }
}

export { delay }
export type { RecorderHandle }
