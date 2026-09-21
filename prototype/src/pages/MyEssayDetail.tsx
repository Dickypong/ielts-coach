import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import ConfirmDialog from '../components/ConfirmDialog'
import { useHistoryStore } from '../store/history'
import EvaluationPanel from '../components/EvaluationPanel'

export default function MyEssayDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const item = useHistoryStore((s) => s.items.find((i) => i.id === id))
  const remove = useHistoryStore((s) => s.remove)
  const [confirmOpen, setConfirmOpen] = useState(false)

  if (!item) {
    return (
      <div className="empty">
        <p>找不到这篇记录</p>
        <Link to="/my-essays" className="btn btn-ghost" style={{ marginTop: 12 }}>
          返回我的作文
        </Link>
      </div>
    )
  }

  return (
    <>
      <div style={{ marginBottom: 8 }}>
        <Link to="/my-essays" className="btn btn-ghost" style={{ padding: 4 }}>
          ← 返回我的作文
        </Link>
      </div>

      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span className="tag tag-accent">Task {item.task || 2}</span>
          <span className="tag tag-warning">{item.overall} / 9.0</span>
          <span className="tag">{item.provider}</span>
          <span className="tag">{new Date(item.createdAt).toLocaleString()}</span>
        </div>
        <h1 className="page-title">{item.topicPrompt}</h1>
        <p className="page-subtitle">{item.wordCount} 词 · 已本地保存</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Link to={`/writing/new?topicId=${item.topicId}`} className="btn btn-primary">
          同题再写一篇
        </Link>
        <button type="button" className="btn btn-ghost" onClick={() => setConfirmOpen(true)}>
          删除
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="card">
          <div className="card-title">你当时写的作文</div>
          {item.content ? (
            <div className="essay-content" style={{ whiteSpace: 'pre-wrap' }}>
              {item.content}
            </div>
          ) : (
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
              这条是旧版记录，当时未保存正文。之后新提交的都会完整保存。
            </p>
          )}
        </div>

        <EvaluationPanel result={item.evaluation} />
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="删除这篇作文？"
        message="删除后无法恢复这条练习记录。"
        confirmLabel="删除"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          remove(item.id)
          setConfirmOpen(false)
          navigate('/my-essays')
        }}
      />
    </>
  )
}
