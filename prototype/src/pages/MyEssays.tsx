import { useState } from 'react'
import { Link } from 'react-router-dom'
import ConfirmDialog from '../components/ConfirmDialog'
import { isScoredForStats } from '../lib/ai-ready'
import { useHistoryStore } from '../store/history'

type Pending =
  | { kind: 'clear' }
  | { kind: 'remove'; id: string }
  | null

export default function MyEssays() {
  const items = useHistoryStore((s) => s.items)
  const remove = useHistoryStore((s) => s.remove)
  const clear = useHistoryStore((s) => s.clear)
  const [pending, setPending] = useState<Pending>(null)

  const practicedTopics = new Set(items.map((i) => i.topicId)).size
  const scored = items.filter(isScoredForStats)
  const avg =
    scored.length > 0
      ? Math.round((scored.reduce((s, i) => s + i.overall, 0) / scored.length) * 10) / 10
      : null

  const runPending = () => {
    if (!pending) return
    if (pending.kind === 'clear') clear()
    else remove(pending.id)
    setPending(null)
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">我的作文</h1>
        <p className="page-subtitle">
          本地保存你的原文与 AI 点评，可随时回看 · 已练 {practicedTopics} 题 · 共 {items.length} 篇
          {avg != null ? ` · 均分 ${avg}` : ''}
          {avg != null && scored.length < items.length ? '（不含演示分）' : ''}
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Link to="/writing/new" className="btn btn-primary">
          再写一篇
        </Link>
        {items.length > 0 && (
          <button type="button" className="btn btn-ghost" onClick={() => setPending({ kind: 'clear' })}>
            清空记录
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="card">
          <div className="empty">
            <p>还没有保存的作文</p>
            <p style={{ fontSize: 12, marginTop: 8, color: 'var(--text-tertiary)' }}>
              在「AI 作文评估」提交后会自动保存到本机
            </p>
            <Link to="/writing/new" className="btn btn-primary" style={{ marginTop: 12 }}>
              去评估作文
            </Link>
          </div>
        </div>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.id} className="list-item" style={{ alignItems: 'center' }}>
              <Link
                to={`/my-essays/${item.id}`}
                className="list-item-main"
                style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span className="tag tag-accent">Task {item.task || 2}</span>
                  <span className="tag tag-warning">{item.overall} 分</span>
                  <span className="tag">{item.provider}</span>
                  {item.isDemo ? <span className="tag">演示</span> : null}
                </div>
                <div className="list-item-title">{item.topicPrompt}</div>
                <div className="list-item-meta">
                  <span>{item.wordCount} 词</span>
                  <span>{new Date(item.createdAt).toLocaleString()}</span>
                  <span>
                    {item.content
                      ? `${item.content.slice(0, 48).replace(/\s+/g, ' ')}…`
                      : '（旧记录无正文）'}
                  </span>
                </div>
              </Link>
              <button
                type="button"
                className="btn btn-ghost"
                style={{ flexShrink: 0 }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setPending({ kind: 'remove', id: item.id })
                }}
              >
                删除
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(pending)}
        title={pending?.kind === 'clear' ? '清空全部作文？' : '删除这篇作文？'}
        message={
          pending?.kind === 'clear'
            ? '将删除本机保存的全部作文记录，此操作不可恢复。'
            : '删除后无法恢复这条练习记录。'
        }
        confirmLabel={pending?.kind === 'clear' ? '清空' : '删除'}
        onCancel={() => setPending(null)}
        onConfirm={runPending}
      />
    </>
  )
}
