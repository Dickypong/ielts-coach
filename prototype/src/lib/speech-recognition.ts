/** Web Speech API 后台转写（不对用户展示） */

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

export type LiveTranscriptHandle = {
  stop: () => string
}

export function speechRecognitionSupported(): boolean {
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecLike
    webkitSpeechRecognition?: new () => SpeechRecLike
  }
  return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition)
}

export function startLiveTranscription(
  onUpdate: (finalText: string, interim: string) => void,
): LiveTranscriptHandle {
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecLike
    webkitSpeechRecognition?: new () => SpeechRecLike
  }
  const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition
  if (!Ctor) {
    throw new Error('当前环境不支持语音识别')
  }

  const rec = new Ctor()
  rec.lang = 'en-US'
  rec.continuous = true
  rec.interimResults = true
  rec.maxAlternatives = 1

  let finals = ''
  let interimLast = ''
  let stopped = false

  rec.onresult = (event) => {
    let interim = ''
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const piece = event.results[i][0]?.transcript || ''
      if (event.results[i].isFinal) {
        finals = `${finals} ${piece}`.replace(/\s+/g, ' ').trim()
      } else {
        interim += piece
      }
    }
    interimLast = interim.trim()
    onUpdate(finals, interimLast)
  }

  rec.onerror = () => {
    // 识别错误不打断录音；由上层决定是否提示
  }

  rec.onend = () => {
    // 仅在未主动停止时续听；停止后绝不再 start，避免占住麦克风
    if (stopped) return
    try {
      rec.start()
    } catch {
      /* ignore */
    }
  }

  rec.start()

  return {
    stop: () => {
      stopped = true
      rec.onend = null
      rec.onresult = null
      rec.onerror = null
      try {
        if (typeof rec.abort === 'function') rec.abort()
        else rec.stop()
      } catch {
        try {
          rec.stop()
        } catch {
          /* ignore */
        }
      }
      return [finals, interimLast].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim()
    },
  }
}
