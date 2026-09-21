import { useState } from 'react'
import { Link } from 'react-router-dom'
import ConfirmDialog from '../components/ConfirmDialog'
import { isScoredForStats } from '../lib/ai-ready'
import { useSpeakingHistoryStore, type TranscribeSource } from '../store/speakingHistory'

const TRANSCRIBE_SOURCE_TAG: Record<TranscribeSource, string> = {
  minimax: 'MiniMax',
  mac: 'SFSpeech',
  whisper: 'Whisper',
  browser: '听写',
}

const PREDICTED_BANK_ID = 'predicted-2026-q4'

type Tab = 'all' | 'default' | 'predicted'

type Pending =
  | { kind: 'clear' }
  | { kind: 'remove'; id: string }
  | null

export default function MySpeaking() {
  const items = useSpeakingHistoryStore((s) => s.items)
  const remove = useSpeakingHistoryStore((s) => s.remove)
  const clear = useSpeakingHistoryStore((s) => s.clear)
  const [pending, setPending] = useState<Pending>(null)
  const [tab, setTab] = useState<Tab>('all')

  // 顶层固定出现一次，包含所有项；其他 tab 只是筛选
  const practicedTopics = new Set(items.map((i) => i.topicId)).size
  const scoredAll = items.filter(isScoredForStats)
  const pendingCountAll = items.filter((i) => i.pendingScore).length
  const avgAll =
    scoredAll.length > 0
      ? Math.round((scoredAll.reduce((s, i) => s + i.overall, 0) / scoredAll.length) * 10) / 10
      : null

  const defaultItems = items.filter((i) => (i.bankId ?? 'default') === 'default')
  const predictedItems = items.filter((i) => i.bankId === PREDICTED_BANK_ID)
  const pendingCountPredicted = predictedItems.filter((i) => i.pendingScore).length

  const visibleItems =
    tab === 'default'
      ? defaultItems
      : tab === 'predicted'
        ? predictedItems
        : items

  const scored = visibleItems.filter(isScoredForStats)
  const pendingCount = visibleItems.filter((i) => i.pendingScore).length
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

  const tabs: { id: Tab; label: string; count: number; pending: number }[] = [
    { id: 'all', label: '全部', count: items.length, pending: pendingCountAll },
    { id: 'default', label: '默认题库', count: defaultItems.length, pending: 0 },
    {
      id: 'predicted',
      label: '2026 9-12 保留题',
      count: predictedItems.length,
      pending: pendingCountPredicted,
    },
  ]

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">我的口语</h1>
        <p className="page-subtitle">
          本地保存评分、纠错与录音回放 · 已练 {practicedTopics} 题 · 共 {items.length} 次
          {pendingCountAll > 0 ? ` · ${pendingCountAll} 条待评分` : ''}
          {avgAll != null ? ` · 总均分 ${avgAll}` : ''}
          {avgAll != null && scoredAll.length < items.length - pendingCountAll
            ? '（不含演示分）'
            : ''}
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <Link to="/speaking/practice" className="btn btn-primary">
          再练一次
        </Link>
        {items.length > 0 && (
          <button type="button" className="btn btn-ghost" onClick={() => setPending({ kind: 'clear' })}>
            清空记录
          </button>
        )}
      </div>

      {items.length > 0 ? (
        <div
          style={{
            display: 'flex',
            gap: 6,
            marginBottom: 16,
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            paddingBottom: 0,
          }}
        >
          {tabs.map((t) => {
            const active = tab === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`btn ${active ? 'btn-primary' : 'btn-ghost'}`}
                style={{
                  padding: '6px 14px',
                  fontSize: 13,
                  borderRadius: '8px 8px 0 0',
                  borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
                  marginBottom: -1,
                }}
              >
                {t.label}
                <span style={{ marginLeft: 6, opacity: 0.7 }}>({t.count})</span>
                {t.pending > 0 ? (
                  <span
                    style={{
                      marginLeft: 6,
                      color: 'var(--danger)',
                      fontSize: 11,
                    }}
                  >
                    待审 {t.pending}
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>
      ) : null}

      {tab !== 'all' ? (
        <div
          className="tip"
          style={{ marginBottom: 12, fontSize: 12, color: 'var(--text-tertiary)' }}
        >
          当前显示：{tab === 'default' ? '默认题库' : '2026 9-12 保留题'}
          {pendingCount > 0 ? ` · ${pendingCount} 条待评分` : ''}
          {avg != null ? ` · 本类均分 ${avg}` : ''}
        </div>
      ) : null}

      {items.length === 0 ? (
        <div className="card">
          <div className="empty">
            <p>还没有口语练习记录</p>
            <Link to="/speaking/practice" className="btn btn-primary" style={{ marginTop: 12 }}>
              去录音练习
            </Link>
          </div>
        </div>
      ) : visibleItems.length === 0 ? (
        <div className="card">
          <div className="empty">
            <p>
              {tab === 'predicted'
                ? '还没有 2026 9-12 保留题 的练习记录'
                : tab === 'default'
                  ? '还没有默认题库的练习记录'
                  : '还没有练习记录'}
            </p>
            <Link
              to={`/speaking/practice${
                tab === 'predicted' ? '?bank=predicted-2026-q4' : ''
              }`}
              className="btn btn-primary"
              style={{ marginTop: 12 }}
            >
              去练{tab === 'predicted' ? '保留题' : '口语'}
            </Link>
          </div>
        </div>
      ) : (
        <div>
          {visibleItems.map((item) => (
            <div key={item.id} className="list-item" style={{ alignItems: 'center' }}>
              <Link
                to={`/my-speaking/${item.id}`}
                className="list-item-main"
                style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span className="tag tag-accent">Part {item.part}</span>
                  {item.pendingScore ? (
                    <span className="tag tag-warning">待评分</span>
                  ) : (
                    <span className="tag tag-warning">{item.overall} 分</span>
                  )}
                  <span className="tag">{item.provider}</span>
                  {item.bankId === PREDICTED_BANK_ID ? (
                    <span className="tag tag-purple">2026 保留题</span>
                  ) : (
                    <span className="tag">默认题库</span>
                  )}
                  {item.isDemo ? <span className="tag">演示</span> : null}
                  {item.transcribeSource ? (
                    <span className="tag">{TRANSCRIBE_SOURCE_TAG[item.transcribeSource]}</span>
                  ) : null}
                  {item.hasAudio ? <span className="tag">有录音</span> : null}
                </div>
                <div className="list-item-title">{item.topicPrompt}</div>
                <div className="list-item-meta">
                  <span>{item.duration}s</span>
                  <span>{new Date(item.createdAt).toLocaleString()}</span>
                  <span>
                    {item.pendingScore
                      ? '点开可重新评分'
                      : item.evaluation?.mistakes?.length
                        ? `${item.evaluation.mistakes.length} 处纠错`
                        : '已评分'}
                  </span>
                </div>
              </Link>
              {item.pendingScore ? (
                <Link
                  to={`/speaking/practice?topicId=${item.topicId}&draftId=${item.id}`}
                  className="btn btn-primary"
                  style={{ flexShrink: 0 }}
                >
                  继续评分
                </Link>
              ) : null}
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
        title={pending?.kind === 'clear' ? '清空全部口语记录？' : '删除这条口语记录？'}
        message={
          pending?.kind === 'clear'
            ? '将删除本机全部口语练习（含录音），此操作不可恢复。'
            : '删除后无法恢复这条练习与录音。'
        }
        confirmLabel={pending?.kind === 'clear' ? '清空' : '删除'}
        onCancel={() => setPending(null)}
        onConfirm={runPending}
      />
    </>
  )
}
