import { useEffect, useRef, useState } from 'react'
import {
  peekDemoSpeechCache,
  resolveMinimaxApiKey,
  synthesizeDemoSpeech,
} from '../lib/minimax-tts'

type Props = {
  text: string
  label?: string
}

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function DemoSpeakButton({ text, label = '朗读示范' }: Props) {
  const [loading, setLoading] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [cached, setCached] = useState(false)
  const [autoPlayOnce, setAutoPlayOnce] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // 进入页面时若本地已有缓存，直接挂上播放器（不请求 API、不自动播）
  useEffect(() => {
    let cancelled = false
    const cleaned = text.replace(/\s+/g, ' ').trim()
    if (!cleaned) return
    void peekDemoSpeechCache(cleaned).then((hit) => {
      if (cancelled || !hit) return
      setAudioUrl(hit.url)
      setCached(true)
    })
    return () => {
      cancelled = true
    }
  }, [text])

  useEffect(() => {
    const el = audioRef.current
    if (!el || !audioUrl) return

    const onTime = () => setCurrent(el.currentTime || 0)
    const onMeta = () => setDuration(Number.isFinite(el.duration) ? el.duration : 0)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnded = () => {
      setPlaying(false)
      setCurrent(0)
    }
    const onErr = () => {
      setPlaying(false)
      setError('音频播放失败')
    }

    el.addEventListener('timeupdate', onTime)
    el.addEventListener('loadedmetadata', onMeta)
    el.addEventListener('durationchange', onMeta)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    el.addEventListener('ended', onEnded)
    el.addEventListener('error', onErr)

    if (autoPlayOnce) {
      setAutoPlayOnce(false)
      void el.play().catch(() => {
        setPlaying(false)
        setError('无法自动播放，请点播放')
      })
    }

    return () => {
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('loadedmetadata', onMeta)
      el.removeEventListener('durationchange', onMeta)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
      el.removeEventListener('ended', onEnded)
      el.removeEventListener('error', onErr)
    }
  }, [audioUrl, autoPlayOnce])

  const stop = () => {
    const el = audioRef.current
    if (el) {
      el.pause()
      el.currentTime = 0
    }
    setPlaying(false)
    setCurrent(0)
  }

  const togglePlay = async () => {
    const el = audioRef.current
    if (!el || !audioUrl) return
    if (el.paused) {
      try {
        await el.play()
      } catch {
        setError('无法播放，请重试')
      }
    } else {
      el.pause()
    }
  }

  const onSeek = (value: number) => {
    const el = audioRef.current
    if (!el || !Number.isFinite(value)) return
    el.currentTime = value
    setCurrent(value)
  }

  const onClick = async () => {
    setError(null)
    if (playing) {
      stop()
      return
    }

    // 已有音频：只播放，绝不重新合成
    if (audioUrl) {
      const el = audioRef.current
      if (el) {
        try {
          await el.play()
        } catch {
          setError('无法播放，请重试')
        }
      } else {
        setAutoPlayOnce(true)
      }
      return
    }

    if (!text.trim()) {
      setError('没有可朗读的文字')
      return
    }

    // 磁盘/内存可能已有，仍先走统一入口（命中则不耗 token）
    // 仅在未缓存时才需要 Key
    try {
      setLoading(true)
      setCurrent(0)
      setDuration(0)
      const peek = await peekDemoSpeechCache(text)
      if (peek) {
        setAudioUrl(peek.url)
        setCached(true)
        setAutoPlayOnce(true)
        return
      }
      if (!resolveMinimaxApiKey()) {
        throw new Error('请先到「设置」填写 MiniMax API Key')
      }
      const result = await synthesizeDemoSpeech(text)
      setCached(result.fromCache)
      setAudioUrl(result.url)
      setAutoPlayOnce(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : '朗读失败')
      setPlaying(false)
    } finally {
      setLoading(false)
    }
  }

  const progressMax = duration > 0 ? duration : 0
  const progressPct = progressMax > 0 ? Math.min(100, (current / progressMax) * 100) : 0
  const buttonLabel = loading
    ? '合成中…'
    : playing
      ? '停止朗读'
      : audioUrl
        ? '播放'
        : label

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          type="button"
          className="btn btn-secondary"
          disabled={loading || !text.trim()}
          onClick={() => void onClick()}
          style={{ fontSize: 13 }}
        >
          {buttonLabel}
        </button>
        <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
          MiniMax 女声 · 英文
          {cached || audioUrl ? ' · 已缓存，重复播放不扣费' : ' · 首次合成后会缓存'}
        </span>
      </div>

      {audioUrl ? (
        <div
          style={{
            marginTop: 10,
            padding: '10px 12px',
            borderRadius: 10,
            background: 'var(--bg-secondary, #f2f2f7)',
            border: '1px solid var(--border, #e5e5ea)',
          }}
        >
          <audio ref={audioRef} src={audioUrl} preload="metadata" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => void togglePlay()}
              style={{
                width: 36,
                height: 36,
                padding: 0,
                borderRadius: 18,
                flexShrink: 0,
                fontSize: 14,
              }}
              aria-label={playing ? '暂停' : '播放'}
            >
              {playing ? '❚❚' : '▶'}
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  position: 'relative',
                  height: 8,
                  borderRadius: 4,
                  background: 'rgba(0,0,0,0.12)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: `${progressPct}%`,
                    background: 'var(--accent, #007aff)',
                    borderRadius: 4,
                    transition: playing ? 'none' : 'width 0.1s linear',
                  }}
                />
                <input
                  type="range"
                  min={0}
                  max={progressMax || 1}
                  step={0.05}
                  value={Math.min(current, progressMax || 0)}
                  disabled={!progressMax}
                  onChange={(e) => onSeek(Number(e.target.value))}
                  aria-label="播放进度"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    margin: 0,
                    opacity: 0,
                    cursor: progressMax ? 'pointer' : 'default',
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 6,
                  fontSize: 11,
                  color: 'var(--text-tertiary)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                <span>{formatTime(current)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {error ? (
        <p style={{ fontSize: 12, color: 'var(--danger)', margin: '8px 0 0' }}>{error}</p>
      ) : null}
    </div>
  )
}
