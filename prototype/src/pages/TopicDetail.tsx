import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { essays } from '../data/essays'
import { useAllWritingTopics } from '../store/customTopics'

export default function TopicDetail() {
  const { id } = useParams<{ id: string }>()
  const [selectedEssayId, setSelectedEssayId] = useState<string | null>(null)
  const writingTopics = useAllWritingTopics()

  const topic = writingTopics.find((t) => t.id === id)
  const topicEssays = useMemo(() => essays.filter((e) => e.topicId === id), [id])

  if (!topic) {
    return (
      <div className="empty">
        <div className="emoji">🤔</div>
        <p>题目不存在</p>
        <Link to="/writing" className="btn btn-ghost" style={{ marginTop: 12 }}>
          返回题库
        </Link>
      </div>
    )
  }

  const selected = selectedEssayId ? topicEssays.find((e) => e.id === selectedEssayId) : null
  const defaultEssay = topicEssays[0]
  const activeEssay = selected || defaultEssay

  return (
    <>
      <div style={{ marginBottom: 8 }}>
        <Link to="/writing" className="btn btn-ghost" style={{ padding: 4 }}>
          ← 返回题库
        </Link>
      </div>

      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span className={`tag ${topic.task === 2 ? 'tag-accent' : 'tag-success'}`}>
            Task {topic.task}
          </span>
          <span className="tag tag-purple">{topic.type}</span>
          {topic.tags.map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
          <span className="tag" style={{ background: 'transparent' }}>
            📅 {topic.examDate}
          </span>
        </div>
        <h1 className="page-title">{topic.prompt}</h1>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <Link to={`/writing/new?topicId=${topic.id}`} className="btn btn-primary btn-lg">
          🤖 让 AI 评估我的作文
        </Link>
      </div>

      {/* 范文 Tabs */}
      <div className="tabs" style={{ marginBottom: 16 }}>
        {topicEssays.map((e) => (
          <button
            key={e.id}
            className={`tab ${activeEssay?.id === e.id ? 'active' : ''}`}
            onClick={() => setSelectedEssayId(e.id)}
          >
            📄 {e.author} · {e.score} 分
          </button>
        ))}
      </div>

      {!activeEssay && (
        <div className="card">
          <div className="empty">
            <div className="emoji">📭</div>
            <p>本题暂无范文</p>
            <p style={{ fontSize: 12, marginTop: 8, color: 'var(--text-tertiary)' }}>
              可以直接去写一篇，用 AI 评估你的作文。
            </p>
            <Link to={`/writing/new?topicId=${topic.id}`} className="btn btn-primary" style={{ marginTop: 12 }}>
              去评估我的作文
            </Link>
          </div>
        </div>
      )}

      {activeEssay && (
        <div className="two-col" style={{ alignItems: 'start' }}>
          {/* 左：范文内容 */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{activeEssay.author}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>
                  {activeEssay.score} <span style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>/ 9.0</span>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', textAlign: 'right' }}>
                <div>📝 {activeEssay.wordCount} 词</div>
                <div>⏱ 用时 {activeEssay.timeSpent} 分钟</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
              来源：{activeEssay.sourceName || '未知'} ·{' '}
              <a href={activeEssay.source} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>
                {activeEssay.source.replace(/^https?:\/\//, '').slice(0, 48)}
                {activeEssay.source.length > 60 ? '…' : ''}
              </a>
              {activeEssay.isAIGenerated && (
                <span className="tag" style={{ marginLeft: 8 }}>过渡期 AI 仿写 · 将替换为真实范文</span>
              )}
            </div>
            <div className="divider"></div>
            <div className="essay-content">{activeEssay.content}</div>
          </div>

          {/* 右：解析面板 */}
          <div>
            {/* 评分维度 */}
            <div className="score-panel" style={{ marginBottom: 16 }}>
              <div className="card-title">📊 评分维度</div>
              {[
                { label: 'Task Response', value: activeEssay.analysis.bandCriteria.taskResponse },
                { label: 'Coherence & Cohesion', value: activeEssay.analysis.bandCriteria.coherence },
                { label: 'Lexical Resource', value: activeEssay.analysis.bandCriteria.lexical },
                { label: 'Grammatical Range', value: activeEssay.analysis.bandCriteria.grammar },
              ].map((row) => (
                <div className="score-row" key={row.label}>
                  <div className="score-row-label">{row.label}</div>
                  <div className="score-row-bar">
                    <div className="score-row-fill" style={{ width: `${(row.value / 9) * 100}%` }}></div>
                  </div>
                  <div className="score-row-value">{row.value}</div>
                </div>
              ))}
            </div>

            {/* 为什么高分 */}
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="card-title">✨ 为什么得高分</div>
              <div className="feedback-list">
                {activeEssay.analysis.whyHighScore.map((tip, i) => (
                  <div key={i} className="feedback-item good">
                    <div className="badge-icon">💡</div>
                    <div className="body">{tip}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 结构分析 */}
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="card-title">🏗 结构分析</div>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                {activeEssay.analysis.structure}
              </p>
            </div>

            {/* 词汇亮点 */}
            <div className="card">
              <div className="card-title">💎 高分词汇</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {activeEssay.analysis.vocabHighlights.map((v, i) => (
                  <span
                    key={i}
                    className="tag tag-accent"
                    title={v.meaning}
                    style={{ cursor: 'help', fontSize: 13 }}
                  >
                    {v.word} · {v.meaning}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}