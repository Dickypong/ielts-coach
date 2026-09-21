/** 浏览器麦克风录音（MediaRecorder）——不与 SpeechRecognition 同时开麦 */

export type MicLevel = {
  /** 0–1，用于音量条 */
  level: number
  /** 是否检测到有效人声（粗判） */
  hasVoice: boolean
}

export type RecorderHandle = {
  stop: () => Promise<{ blob: Blob; durationSec: number; mimeType: string; byteSize: number }>
  release: () => void
}

function isWebKit(): boolean {
  const ua = navigator.userAgent
  return /AppleWebKit/i.test(ua) && !/Chrome|Chromium|Edg\//i.test(ua)
}

function pickMimeType(): string {
  // Safari / Tauri WKWebView：优先 mp4，webm 常录成空文件
  const candidates = isWebKit()
    ? ['audio/mp4', 'audio/aac', 'audio/mpeg', 'audio/webm']
    : ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus']
  for (const t of candidates) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(t)) return t
  }
  return ''
}

function stopTracks(stream: MediaStream | null) {
  if (!stream) return
  for (const track of stream.getTracks()) {
    try {
      track.stop()
    } catch {
      /* ignore */
    }
  }
}

function mapMicError(err: unknown): Error {
  const name = err instanceof DOMException ? err.name : ''
  const msg = err instanceof Error ? err.message : String(err)
  if (name === 'NotFoundError' || /Requested device not found/i.test(msg)) {
    return new Error('找不到麦克风。请确认已授权，并关闭其他占用麦克风的应用后重试。')
  }
  if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
    return new Error('麦克风权限被拒绝，请在系统设置里允许本应用使用麦克风。')
  }
  if (name === 'NotReadableError' || /could not start/i.test(msg)) {
    return new Error('麦克风被占用。请稍等一秒再点录音，或关掉其他正在录音的页面。')
  }
  return err instanceof Error ? err : new Error(msg || '无法打开麦克风')
}

export async function startMicRecording(
  onLevel?: (lv: MicLevel) => void,
): Promise<RecorderHandle> {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error('当前环境不支持麦克风录音（请用 Chrome / Safari，或桌面 App）')
  }
  if (typeof MediaRecorder === 'undefined') {
    throw new Error('当前环境不支持 MediaRecorder')
  }

  let stream: MediaStream
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    })
  } catch (e) {
    // 部分环境不接受约束对象
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch (e2) {
      throw mapMicError(e2)
    }
  }

  const mimeType = pickMimeType()
  let recorder: MediaRecorder
  try {
    recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream)
  } catch {
    try {
      recorder = new MediaRecorder(stream)
    } catch (e) {
      stopTracks(stream)
      throw mapMicError(e)
    }
  }

  const chunks: BlobPart[] = []
  const startedAt = Date.now()
  let released = false
  let raf = 0
  let audioCtx: AudioContext | null = null

  // 音量监测：证明麦克风真的进声了
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    audioCtx = new AC()
    const source = audioCtx.createMediaStreamSource(stream)
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 512
    analyser.smoothingTimeConstant = 0.8
    source.connect(analyser)
    const buf = new Uint8Array(analyser.fftSize)

    const tick = () => {
      if (released) return
      analyser.getByteTimeDomainData(buf)
      let sum = 0
      for (let i = 0; i < buf.length; i++) {
        const v = (buf[i] - 128) / 128
        sum += v * v
      }
      const rms = Math.sqrt(sum / buf.length)
      const level = Math.min(1, rms * 4)
      onLevel?.({ level, hasVoice: level > 0.04 })
      raf = requestAnimationFrame(tick)
    }
    void audioCtx.resume().then(() => {
      raf = requestAnimationFrame(tick)
    })
  } catch {
    /* 无音量条也不影响录音 */
  }

  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) chunks.push(e.data)
  }

  try {
    // WebKit：带 timeslice 有时一直空；先无参 start，停时 requestData
    if (isWebKit()) recorder.start()
    else recorder.start(200)
  } catch (e) {
    if (raf) cancelAnimationFrame(raf)
    try {
      void audioCtx?.close()
    } catch {
      /* ignore */
    }
    stopTracks(stream)
    throw mapMicError(e)
  }

  const release = () => {
    if (released) return
    released = true
    if (raf) cancelAnimationFrame(raf)
    try {
      void audioCtx?.close()
    } catch {
      /* ignore */
    }
    audioCtx = null
    try {
      if (recorder.state !== 'inactive') recorder.stop()
    } catch {
      /* ignore */
    }
    stopTracks(stream)
  }

  return {
    release,
    stop: () =>
      new Promise((resolve, reject) => {
        if (released) {
          reject(new Error('录音已结束'))
          return
        }
        const finish = () => {
          if (raf) cancelAnimationFrame(raf)
          try {
            void audioCtx?.close()
          } catch {
            /* ignore */
          }
          audioCtx = null
          const type = recorder.mimeType || mimeType || (isWebKit() ? 'audio/mp4' : 'audio/webm')
          const blob = new Blob(chunks, { type })
          const durationSec = Math.max(1, Math.round((Date.now() - startedAt) / 1000))
          // 真正释放轨道
          released = true
          stopTracks(stream)
          resolve({ blob, durationSec, mimeType: type, byteSize: blob.size })
        }
        recorder.onerror = () => {
          release()
          reject(new Error('录音失败'))
        }
        recorder.onstop = () => finish()
        try {
          if (recorder.state === 'recording') {
            try {
              recorder.requestData()
            } catch {
              /* ignore */
            }
            recorder.stop()
          } else {
            finish()
          }
        } catch {
          finish()
        }
      }),
  }
}

export function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}
