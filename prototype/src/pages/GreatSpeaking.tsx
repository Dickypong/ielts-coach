import { useState, useMemo, useRef, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { greatSpeakings, type GreatSpeaking } from '../data/greatSpeaking'

function formatTime(sec: number) {
  const s = Math.max(0, Math.floor(sec || 0))
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`
}

export default function GreatSpeakingPage() {
  const [params] = useSearchParams()
  const queryId = params.get('id')
  const [partFilter, setPartFilter] = useState<0 | 1 | 2 | 3>(0)
  const [activeId, setActiveId] = useState<string | null>(queryId || greatSpeakings[0]?.id || null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [activeTab, setActiveTab] = useState<'transcript' | 'analysis'>('analysis')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const barRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (queryId && greatSpeakings.some((g) => g.id === queryId)) {
      setActiveId(queryId)
      const g = greatSpeakings.find((x) => x.id === queryId)
      if (g) {
        const covers = g.coversParts?.length ? g.coversParts : [g.part]
        if (covers.length === 1) setPartFilter(covers[0])
        else setPartFilter(0)
      }
    }
  }, [queryId])

  const filtered = useMemo(
    () =>
      greatSpeakings.filter((s) => {
        if (partFilter === 0) return true
        const covers = s.coversParts?.length ? s.coversParts : [s.part]
        return covers.includes(partFilter)
      }),
    [partFilter],
  )

  const active: GreatSpeaking | undefined = useMemo(
    () => greatSpeakings.find((s) => s.id === activeId) ?? filtered[0],
    [activeId, filtered],
  )

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
    setPlaying(false)
    setCurrentTime(0)
    setDuration(active?.duration || 0)
  }, [active?.id, active?.duration])

  const seekTo = (sec: number) => {
    const audio = audioRef.current
    if (!audio) return
    const max = duration || active?.duration || 0
    const next = Math.max(0, Math.min(max || 1e9, sec))
    audio.currentTime = next
    setCurrentTime(next)
  }

  const seekBy = (delta: number) => seekTo(currentTime + delta)

  const onBarPointer = (clientX: number) => {
    const bar = barRef.current
    const audio = audioRef.current
    if (!bar || !audio) return
    const rect = bar.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    const max = duration || active?.duration || audio.duration || 0
    if (max > 0) seekTo(ratio * max)
  }

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio || !active?.audioPath) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
    }
  }

  const total = duration || active?.duration || 0
  const progressPct = total > 0 ? Math.min(100, (currentTime / total) * 100) : 0

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">优秀口语录音库</h1>
        <p className="page-subtitle">
          共 {greatSpeakings.length} 段真实公开示范 · 考官视角点评「为什么能拿高分」· 可拖动进度条
        </p>
      </div>

      <div className="tip" style={{ marginBottom: 16 }}>
        这些是 YouTube 公开高分示范（多为整场 Part1–3），点评说明<strong>高分答法</strong>，不是「口语题库」逐题标准答案。
        练题请去 <Link to="/speaking" style={{ color: 'var(--accent)' }}>口语题库</Link>。
      </div>

      {greatSpeakings.length === 0 && (
        <div className="card">
          <div className="empty">
            <p>暂无真实录音。请运行 scripts/scrape_youtube_speaking.py</p>
          </div>
        </div>
      )}

      <div className="filter-bar" role="tablist" aria-label="按 Part 筛选">
        {[
          { v: 0 as const, l: '全部' },
          { v: 1 as const, l: 'Part 1' },
          { v: 2 as const, l: 'Part 2' },
          { v: 3 as const, l: 'Part 3' },
        ].map((p) => (
          <button
            key={p.v}
            type="button"
            role="tab"
            aria-selected={partFilter === p.v}
            className={`chip ${partFilter === p.v ? 'active' : ''}`}
            onClick={() => setPartFilter(p.v)}
          >
            {p.l}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 16 }}>
        <div>
          {filtered.map((s) => (
            <div
              key={s.id}
              className="list-item"
              style={{
                flexDirection: 'column',
                alignItems: 'stretch',
                borderColor: active?.id === s.id ? 'var(--accent)' : undefined,
                background: active?.id === s.id ? 'rgba(0, 122, 255, 0.04)' : undefined,
              }}
              onClick={() => {
                setActiveId(s.id)
                setActiveTab('analysis')
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span
                  className={`tag ${s.part === 1 ? 'tag-success' : s.part === 2 ? 'tag-accent' : 'tag-purple'}`}
                >
                  {(s.coversParts?.length || 0) > 1 ? '整场' : `Part ${s.part}`}
                </span>
                <span className="tag tag-warning">{s.score} 分</span>
                <span className="tag" style={{ marginLeft: 'auto', fontSize: 11 }}>
                  {formatTime(s.duration)}
                </span>
              </div>
              <div className="list-item-title" style={{ marginBottom: 4 }}>
                {s.topic}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{s.sourceName}</div>
            </div>
          ))}
        </div>

        {active && (
          <div>
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span
                      className={`tag ${active.part === 1 ? 'tag-success' : active.part === 2 ? 'tag-accent' : 'tag-purple'}`}
                    >
                      主标 Part {active.part}
                    </span>
                    {(active.coversParts || [active.part]).map((p) => (
                      <span key={p} className="tag">
                        含 P{p}
                      </span>
                    ))}
                    <span className="tag tag-warning">{active.score} 分</span>
                    <span className="tag">{formatTime(active.duration)}</span>
                    {!active.isAIGenerated && <span className="tag tag-success">真实公开示范</span>}
                  </div>
                  <div className="card-title" style={{ marginBottom: 4 }}>
                    {active.topic}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{active.prompt}</div>
                  {active.matchNote && (
                    <div className="tip" style={{ marginTop: 8, fontSize: 12 }}>
                      {active.matchNote}
                    </div>
                  )}
                  <div style={{ fontSize: 12, marginTop: 8 }}>
                    来源：{active.sourceName} ·{' '}
                    <a href={active.source} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>
                      打开原视频
                    </a>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{active.candidate.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>
                    {active.candidate.background}
                  </div>
                </div>
              </div>

              <audio
                ref={audioRef}
                controls
                src={active.audioPath || undefined}
                preload="metadata"
                style={{ width: '100%', marginTop: 12 }}
                onLoadedMetadata={(e) => {
                  const d = e.currentTarget.duration
                  if (Number.isFinite(d) && d > 0) setDuration(d)
                }}
                onDurationChange={(e) => {
                  const d = e.currentTarget.duration
                  if (Number.isFinite(d) && d > 0) setDuration(d)
                }}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onEnded={() => setPlaying(false)}
                onPause={() => setPlaying(false)}
                onPlay={() => setPlaying(true)}
              />

              <div
                style={{
                  marginTop: 16,
                  padding: 16,
                  background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.05), rgba(175, 82, 222, 0.05))',
                  borderRadius: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <button
                    className="btn btn-secondary"
                    style={{ padding: '6px 10px' }}
                    disabled={!active.audioPath}
                    onClick={() => seekBy(-10)}
                  >
                    −10s
                  </button>
                  <button
                    onClick={togglePlay}
                    disabled={!active.audioPath}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: !active.audioPath ? 'var(--text-tertiary)' : playing ? 'var(--danger)' : 'var(--accent)',
                      color: 'white',
                      fontSize: 18,
                      display: 'grid',
                      placeItems: 'center',
                      cursor: active.audioPath ? 'pointer' : 'not-allowed',
                      border: 'none',
                    }}
                  >
                    {playing ? '⏸' : '▶'}
                  </button>
                  <button
                    className="btn btn-secondary"
                    style={{ padding: '6px 10px' }}
                    disabled={!active.audioPath}
                    onClick={() => seekBy(10)}
                  >
                    +10s
                  </button>
                  <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-tertiary)' }}>
                    {formatTime(currentTime)} / {formatTime(total)}
                  </div>
                </div>

                <div
                  ref={barRef}
                  className="progress-bar progress-bar--seekable"
                  role="slider"
                  aria-valuemin={0}
                  aria-valuemax={total || 0}
                  aria-valuenow={currentTime}
                  tabIndex={0}
                  onClick={(e) => onBarPointer(e.clientX)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') seekBy(5)
                    if (e.key === 'ArrowLeft') seekBy(-5)
                  }}
                >
                  <div className="progress-fill" style={{ width: `${progressPct}%`, transition: 'none' }} />
                </div>

                <input
                  type="range"
                  min={0}
                  max={Math.max(1, total)}
                  step={0.1}
                  value={Math.min(currentTime, total || 0)}
                  disabled={!active.audioPath || total <= 0}
                  onChange={(e) => seekTo(Number(e.target.value))}
                  style={{ width: '100%', marginTop: 10 }}
                  aria-label="拖动快进"
                />
              </div>
            </div>

            <div className="tabs">
              <button
                type="button"
                className={`tab ${activeTab === 'analysis' ? 'active' : ''}`}
                onClick={() => setActiveTab('analysis')}
              >
                考官点评
              </button>
              <button
                type="button"
                className={`tab ${activeTab === 'transcript' ? 'active' : ''}`}
                onClick={() => setActiveTab('transcript')}
              >
                完整转写
              </button>
            </div>

            {activeTab === 'analysis' ? (
              <div>
                <div className="tip" style={{ marginBottom: 12 }}>
                  从考官视角解释「为什么能拿高分」：引用转写原句作证据。
                  {active.analysis.analysisSource === 'minimax-examiner'
                    ? ' 点评由 AI 考官模型基于公开转写生成，非官方 IELTS 成绩。'
                    : ' 若尚未生成分项点评，请运行 analyze_great_speaking.py。'}
                </div>

                <div className="score-panel" style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    考官总评 · 为何约 Band {active.analysis.claimedBand ?? active.score}
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.7 }}>{active.analysis.overallComment}</div>
                  <div className="divider"></div>
                  {(
                    [
                      ['Fluency & Coherence', active.analysis.bandCriteria.fluency],
                      ['Lexical Resource', active.analysis.bandCriteria.lexical],
                      ['Grammar', active.analysis.bandCriteria.grammar],
                      ['Pronunciation', active.analysis.bandCriteria.pronunciation],
                    ] as [string, number][]
                  ).map(([label, value]) => (
                    <div className="score-row" key={label}>
                      <div className="score-row-label">{label}</div>
                      <div className="score-row-bar">
                        <div className="score-row-fill" style={{ width: `${(value / 9) * 100}%` }} />
                      </div>
                      <div className="score-row-value">{value}</div>
                    </div>
                  ))}
                </div>

                {active.analysis.whyHighScore && active.analysis.whyHighScore.length > 0 && (
                  <div className="card" style={{ marginBottom: 12 }}>
                    <div className="card-title">为什么是高分（考官视角）</div>
                    <div className="feedback-list">
                      {active.analysis.whyHighScore.map((t, i) => (
                        <div key={i} className="feedback-item good">
                          <div className="badge-icon">{i + 1}</div>
                          <div className="body">{t}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {active.analysis.scoringDetails &&
                  (
                    [
                      ['流利与连贯', active.analysis.scoringDetails.fluency],
                      ['词汇资源', active.analysis.scoringDetails.lexical],
                      ['语法广度与准确', active.analysis.scoringDetails.grammar],
                      ['发音（转写推断）', active.analysis.scoringDetails.pronunciation],
                    ] as const
                  ).map(([title, detail]) => (
                    <div className="card" key={title} style={{ marginBottom: 12 }}>
                      <div
                        className="card-title"
                        style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}
                      >
                        <span>{title}</span>
                        <span className="tag tag-warning">{detail.score}</span>
                      </div>
                      <div style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>{detail.why}</div>
                      {detail.evidence?.length > 0 && (
                        <div className="feedback-list">
                          {detail.evidence.map((e, i) => (
                            <div key={i} className="feedback-item good">
                              <div className="badge-icon">❝</div>
                              <div className="body" style={{ fontStyle: 'italic' }}>
                                {e}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                {(active.analysis.listenExcerpts?.length || active.analysis.sentences?.length) ? (
                  <div className="card" style={{ marginBottom: 12 }}>
                    <div className="card-title">高分证据句（来自转写）</div>
                    <div className="feedback-list">
                      {(active.analysis.listenExcerpts?.length
                        ? active.analysis.listenExcerpts
                        : active.analysis.sentences.map((s) => s.text)
                      ).map((t, i) => (
                        <div key={i} className="feedback-item good">
                          <div className="badge-icon">{i + 1}</div>
                          <div className="body" style={{ fontStyle: 'italic' }}>
                            “{t}”
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {(active.analysis.examinerTips ?? active.analysis.practiceTips ?? active.analysis.improvements)
                  ?.length ? (
                  <div className="card" style={{ marginBottom: 12 }}>
                    <div className="card-title">可迁移到你自己的回答</div>
                    <div className="feedback-list">
                      {(
                        active.analysis.examinerTips ??
                        active.analysis.practiceTips ??
                        active.analysis.improvements
                      ).map((t, i) => (
                        <div key={i} className="feedback-item good">
                          <div className="badge-icon">•</div>
                          <div className="body">{t}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="card">
                <div className="card-title">转写文本</div>
                <div className="essay-content" style={{ whiteSpace: 'pre-wrap' }}>
                  {active.transcript}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
