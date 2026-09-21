import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { SpeakingTopic } from '../data/speakingTopics'
import TopicImportModal from '../components/TopicImportModal'
import { matchDemoForTopic, tierLabel, type DemoMatch } from '../lib/match-speaking-demo'
import {
  isImportedSpeaking,
  useAllSpeakingTopics,
  useCustomTopicsStore,
} from '../store/customTopics'

const parts = [
  { value: 0 as const, label: '全部' },
  { value: 1 as const, label: 'Part 1' },
  { value: 2 as const, label: 'Part 2' },
  { value: 3 as const, label: 'Part 3' },
]

function formatTime(sec: number) {
  const s = Math.max(0, Math.floor(sec || 0))
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`
}

export default function SpeakingTopics() {
  const speakingTopics = useAllSpeakingTopics()
  const customCount = useCustomTopicsStore((s) => s.speaking.length)
  const removeSpeaking = useCustomTopicsStore((s) => s.removeSpeaking)
  const [partFilter, setPartFilter] = useState<0 | 1 | 2 | 3>(0)
  /** 当前播放绑定到具体题目 + 示范，不再整 Part 共用一条 */
  const [playingTopicId, setPlayingTopicId] = useState<string | null>(null)
  const [activeMatch, setActiveMatch] = useState<DemoMatch | null>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [importOpen, setImportOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const matchByTopicId = useMemo(() => {
    const map = new Map<string, DemoMatch>()
    for (const t of speakingTopics) {
      const m = matchDemoForTopic(t)
      if (m) map.set(t.id, m)
    }
    return map
  }, [speakingTopics])

  const filtered = useMemo(
    () => speakingTopics.filter((t) => partFilter === 0 || t.part === partFilter),
    [partFilter, speakingTopics],
  )

  useEffect(() => {
    return () => {
      const a = audioRef.current
      if (a) {
        a.pause()
        a.removeAttribute('src')
        a.load()
      }
    }
  }, [])

  const stopPlayer = () => {
    const a = audioRef.current
    if (a) {
      a.pause()
      a.currentTime = 0
    }
    setPlaying(false)
    setCurrentTime(0)
    setPlayingTopicId(null)
    setActiveMatch(null)
  }

  const toggleTopicDemo = async (topic: SpeakingTopic) => {
    const match = matchByTopicId.get(topic.id)
    const audio = audioRef.current
    if (!match?.demo.audioPath || !audio) return

    // 同一题同一示范：播放中 → 暂停；暂停 → 继续
    if (playingTopicId === topic.id && audio.getAttribute('src')) {
      if (!audio.paused) {
        audio.pause()
        setPlaying(false)
        return
      }
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
      return
    }

    audio.pause()
    audio.currentTime = 0
    setPlaying(false)
    setCurrentTime(0)
    setPlayingTopicId(topic.id)
    setActiveMatch(match)
    setDuration(match.demo.duration || 0)
    audio.src = match.demo.audioPath
    audio.load()
    try {
      await audio.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }

  const uniqueDemoCount = useMemo(() => {
    return new Set([...matchByTopicId.values()].map((m) => m.demo.id)).size
  }, [matchByTopicId])

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">口语题库</h1>
        <p className="page-subtitle">
          共 {speakingTopics.length} 题
          {customCount ? `（含导入 ${customCount}）` : ''} · 示范按题目关键词匹配（约 {uniqueDemoCount}{' '}
          条不同录音，非逐题原声）
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <button type="button" className="btn btn-secondary" onClick={() => setImportOpen(true)}>
          📋 粘贴导入
        </button>
        <Link to="/speaking/practice" className="btn btn-primary">
          🎤 去录音练习
        </Link>
      </div>

      {toast && (
        <div className="tip" style={{ marginBottom: 12 }}>
          {toast}
        </div>
      )}

      <div className="filter-bar" role="tablist" aria-label="按 Part 筛选">
        {parts.map((p) => (
          <button
            key={p.value}
            type="button"
            role="tab"
            aria-selected={partFilter === p.value}
            className={`chip ${partFilter === p.value ? 'active' : ''}`}
            onClick={() => setPartFilter(p.value)}
          >
            {p.label}
            {p.value === 0
              ? ` (${speakingTopics.length})`
              : ` (${speakingTopics.filter((t) => t.part === p.value).length})`}
          </button>
        ))}
      </div>

      <div className="tip" style={{ marginBottom: 16 }}>
        「听示范」会按本题话题去优秀录音库里找<strong>最相关</strong>的一条（不是同一道真题原声）。相关度低时会标注「同
        Part」。
      </div>

      {filtered.length === 0 ? (
        <div className="card">
          <div className="empty">
            <p>这个 Part 暂时没有题目</p>
            <button type="button" className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => setPartFilter(0)}>
              查看全部
            </button>
          </div>
        </div>
      ) : (
        <div className="card-grid" style={{ paddingBottom: activeMatch ? 110 : 0 }}>
          {filtered.map((t) => {
            const match = matchByTopicId.get(t.id)
            const canPlay = Boolean(match?.demo.audioPath)
            const isThisTrack = playingTopicId === t.id
            const isPlayingThis = isThisTrack && playing

            return (
              <div key={t.id} className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                  <span
                    className={`tag ${
                      t.part === 1 ? 'tag-success' : t.part === 2 ? 'tag-accent' : 'tag-purple'
                    }`}
                  >
                    Part {t.part}
                  </span>
                  <span className="tag">{t.examPeriod}</span>
                  {isImportedSpeaking(t) && <span className="tag tag-warning">导入</span>}
                  {canPlay && match && (
                    <span className={`tag ${isPlayingThis ? 'tag-accent' : match.tier === 'high' ? 'tag-success' : 'tag-warning'}`}>
                      {isPlayingThis ? '▶ 播放中' : tierLabel(match.tier)}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>{t.prompt}</div>

                {t.subQuestions && (
                  <ul
                    style={{
                      paddingLeft: 18,
                      fontSize: 12,
                      color: 'var(--text-secondary)',
                      lineHeight: 1.8,
                      marginBottom: 12,
                    }}
                  >
                    {t.subQuestions.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                )}

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                  {t.tags.filter((tag) => tag !== '导入').map((tag) => (
                    <span key={tag} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>

                {match && (
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 10, lineHeight: 1.4 }}>
                    匹配：{match.demo.topic.slice(0, 48)}
                    {match.demo.topic.length > 48 ? '…' : ''}
                    {match.hits.length ? ` · 关键词 ${match.hits.slice(0, 3).join(', ')}` : ''}
                  </div>
                )}

                <div style={{ display: 'flex', gap: 8 }}>
                  <Link
                    to={`/speaking/practice?topicId=${t.id}`}
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                    onClick={stopPlayer}
                  >
                    🎤 录音练习
                  </Link>
                  {canPlay ? (
                    <button
                      type="button"
                      className={`btn ${isPlayingThis ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ minWidth: 96 }}
                      title={match ? `${tierLabel(match.tier)}：${match.demo.topic}` : ''}
                      onClick={() => void toggleTopicDemo(t)}
                    >
                      {isPlayingThis ? '⏸ 暂停' : isThisTrack ? '▶ 继续' : '🎧 听示范'}
                    </button>
                  ) : (
                    <Link to="/great-speaking" className="btn btn-secondary" onClick={stopPlayer}>
                      优秀库
                    </Link>
                  )}
                  {isImportedSpeaking(t) && (
                    <button
                      type="button"
                      className="btn btn-ghost"
                      title="删除导入题"
                      onClick={() => {
                        removeSpeaking(t.id)
                        setToast('已删除该导入题')
                      }}
                    >
                      删除
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={(e) => {
          const d = e.currentTarget.duration
          if (Number.isFinite(d) && d > 0) setDuration(d)
        }}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onEnded={() => {
          setPlaying(false)
          setCurrentTime(0)
        }}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />

      {activeMatch && playingTopicId && (
        <div className="mini-player" role="region" aria-label="示范音频播放器">
          <div className="mini-player-main">
            <div className="mini-player-meta">
              <div className="mini-player-kicker">
                {tierLabel(activeMatch.tier)} · 针对当前题匹配（非原题录音）
              </div>
              <div className="mini-player-title">{activeMatch.demo.topic}</div>
              <div className="mini-player-sub">
                {activeMatch.demo.sourceName} · {formatTime(currentTime)} /{' '}
                {formatTime(duration || activeMatch.demo.duration)}
                {activeMatch.hits.length ? ` · 命中 ${activeMatch.hits.slice(0, 4).join(', ')}` : ''}
              </div>
            </div>
            <div className="mini-player-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  const topic = speakingTopics.find((x) => x.id === playingTopicId)
                  if (topic) void toggleTopicDemo(topic)
                }}
              >
                {playing ? '暂停' : '继续'}
              </button>
              <button type="button" className="btn btn-ghost" onClick={stopPlayer}>
                关闭
              </button>
              <Link
                to={`/great-speaking?id=${encodeURIComponent(activeMatch.demo.id)}`}
                className="btn btn-ghost"
                onClick={stopPlayer}
                style={{ color: 'var(--accent)' }}
              >
                看点评
              </Link>
            </div>
          </div>
          <input
            type="range"
            className="mini-player-seek"
            min={0}
            max={Math.max(1, duration || activeMatch.demo.duration)}
            step={0.1}
            value={Math.min(currentTime, duration || activeMatch.demo.duration || 0)}
            onChange={(e) => {
              const a = audioRef.current
              if (!a) return
              const v = Number(e.target.value)
              a.currentTime = v
              setCurrentTime(v)
            }}
            aria-label="拖动进度"
          />
        </div>
      )}

      <TopicImportModal
        open={importOpen}
        mode="speaking"
        onClose={() => setImportOpen(false)}
        onImported={(n) => setToast(n ? `已导入 ${n} 道口语题（重复题已跳过）` : '没有新题目（可能与已有重复）')}
      />
    </>
  )
}
