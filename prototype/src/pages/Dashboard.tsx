import { Link } from 'react-router-dom'
import { useHistoryStore } from '../store/history'
import { useSpeakingHistoryStore } from '../store/speakingHistory'
import { essays } from '../data/essays'
import { greatSpeakings } from '../data/greatSpeaking'
import { useAllWritingTopics, useAllSpeakingTopics } from '../store/customTopics'
import { isScoredForStats } from '../lib/ai-ready'

export default function Dashboard() {
  const today = new Date()
  const hour = today.getHours()
  const greeting = hour < 12 ? '早上好' : hour < 18 ? '下午好' : '晚上好'
  const allHistory = useHistoryStore((s) => s.items)
  const speakingHistory = useSpeakingHistoryStore((s) => s.items)
  const writingTopics = useAllWritingTopics()
  const speakingTopics = useAllSpeakingTopics()
  const scoredEssays = allHistory.filter(isScoredForStats)
  const scoredSpeaking = speakingHistory.filter(isScoredForStats)
  const recentEssays = allHistory.slice(0, 3)
  const recentSpeaking = speakingHistory.slice(0, 3)
  const practicedTopics = new Set(scoredEssays.map((h) => h.topicId)).size
  const avgScore =
    scoredEssays.length > 0
      ? Math.round((scoredEssays.reduce((s, h) => s + h.overall, 0) / scoredEssays.length) * 10) / 10
      : null
  const speakingAvg =
    scoredSpeaking.length > 0
      ? Math.round((scoredSpeaking.reduce((s, h) => s + h.overall, 0) / scoredSpeaking.length) * 10) / 10
      : null

  return (
    <>
      <div className="page-header">
        <h1 className="greeting">{greeting}，Tiffany</h1>
        <p className="greeting-sub">
          写作题库 {writingTopics.length} · 口语题库 {speakingTopics.length} · 范文 {essays.length} 篇
          {avgScore != null ? ` · 写作均分 ${avgScore}` : ''}
          {speakingAvg != null ? ` · 口语均分 ${speakingAvg}` : ''}
        </p>
      </div>

      <div className="stat-grid">
        <Link
          to={allHistory.length > 0 ? '/my-essays' : '/writing/new'}
          className="stat-card stat-card--link"
        >
          <div className="stat-label">已写作文</div>
          <div className="stat-value">{allHistory.length}</div>
          <div className="stat-trend">{avgScore != null ? `均分 ${avgScore} · 查看记录 →` : '去评一篇 →'}</div>
        </Link>
        <Link
          to={speakingHistory.length > 0 ? '/my-speaking' : '/speaking/practice'}
          className="stat-card stat-card--link"
        >
          <div className="stat-label">口语练习</div>
          <div className="stat-value">{speakingHistory.length}</div>
          <div className="stat-trend">
            {speakingAvg != null ? `均分 ${speakingAvg} · 查看记录 →` : '去练一次 →'}
          </div>
        </Link>
        <Link to="/writing" className="stat-card stat-card--link">
          <div className="stat-label">写作已练题目</div>
          <div className="stat-value">{practicedTopics}</div>
          <div className="stat-trend">去写作题库 →</div>
        </Link>
        <Link to="/great-speaking" className="stat-card stat-card--link">
          <div className="stat-label">示范录音</div>
          <div className="stat-value">{greatSpeakings.length}</div>
          <div className="stat-trend">听优秀口语 →</div>
        </Link>
      </div>

      <div className="card-grid" style={{ marginBottom: 16 }}>
        <Link to="/writing/new" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🤖</div>
          <div className="card-title" style={{ marginBottom: 4 }}>
            AI 作文评估
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>打分 + 改进范文</p>
        </Link>
        <Link to="/my-essays" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>📂</div>
          <div className="card-title" style={{ marginBottom: 4 }}>
            我的作文
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{allHistory.length} 篇记录</p>
        </Link>
        <Link to="/speaking/practice" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🎤</div>
          <div className="card-title" style={{ marginBottom: 4 }}>
            口语录音
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>录音评分纠错</p>
        </Link>
        <Link to="/my-speaking" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🗣️</div>
          <div className="card-title" style={{ marginBottom: 4 }}>
            我的口语
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{speakingHistory.length} 次记录</p>
        </Link>
      </div>

      <div className="two-col">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div className="card-title" style={{ marginBottom: 0 }}>
              最近作文
            </div>
            <Link to="/my-essays" style={{ fontSize: 12, color: 'var(--accent)' }}>
              全部 →
            </Link>
          </div>
          {recentEssays.length === 0 ? (
            <div className="empty" style={{ padding: 24 }}>
              <p>还没有作文记录</p>
              <Link to="/writing/new" className="btn btn-primary" style={{ marginTop: 12 }}>
                去评一篇
              </Link>
            </div>
          ) : (
            <div className="feedback-list">
              {recentEssays.map((h) => (
                <Link
                  key={h.id}
                  to={`/my-essays/${h.id}`}
                  className="feedback-item good"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="badge-icon">{h.overall}</div>
                  <div className="body">
                    <strong>
                      {h.topicPrompt.slice(0, 72)}
                      {h.topicPrompt.length > 72 ? '…' : ''}
                    </strong>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>
                      {new Date(h.createdAt).toLocaleString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div className="card-title" style={{ marginBottom: 0 }}>
              最近口语
            </div>
            <Link to="/my-speaking" style={{ fontSize: 12, color: 'var(--accent)' }}>
              全部 →
            </Link>
          </div>
          {recentSpeaking.length === 0 ? (
            <div className="empty" style={{ padding: 24 }}>
              <p>还没有口语记录</p>
              <Link to="/speaking/practice" className="btn btn-primary" style={{ marginTop: 12 }}>
                去录音
              </Link>
            </div>
          ) : (
            <div className="feedback-list">
              {recentSpeaking.map((h) => (
                <Link
                  key={h.id}
                  to={`/my-speaking/${h.id}`}
                  className="feedback-item good"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="badge-icon">{h.pendingScore ? '待' : h.overall}</div>
                  <div className="body">
                    <strong>
                      {h.topicPrompt.slice(0, 72)}
                      {h.topicPrompt.length > 72 ? '…' : ''}
                    </strong>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>
                      Part {h.part}
                      {h.pendingScore ? ' · 待评分' : ''} · {new Date(h.createdAt).toLocaleString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
