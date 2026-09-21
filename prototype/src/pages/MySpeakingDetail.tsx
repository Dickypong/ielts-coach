import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ConfirmDialog from '../components/ConfirmDialog'
import SpeakingResultPanels from '../components/SpeakingResultPanels'
import { getSpeakingAudio } from '../lib/speaking-audio-db'
import { useSpeakingHistoryStore, type TranscribeSource } from '../store/speakingHistory'

const TRANSCRIBE_SOURCE_LABEL: Record<TranscribeSource, string> = {
  minimax: 'MiniMax ASR',
  mac: 'macOS SFSpeech',
  whisper: 'OpenAI Whisper',
  browser: '浏览器听写',
}

export default function MySpeakingDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const item = useSpeakingHistoryStore((s) => s.items.find((i) => i.id === id))
  const remove = useSpeakingHistoryStore((s) => s.remove)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    let revoked: string | null = null
    let cancelled = false
    if (!id) return
    ;(async () => {
      try {
        const audio = await getSpeakingAudio(id)
        if (cancelled || !audio) return
        const url = URL.createObjectURL(audio.blob)
        revoked = url
        setAudioUrl(url)
      } catch {
        if (!cancelled) setAudioUrl(null)
      }
    })()
    return () => {
      cancelled = true
      if (revoked) URL.revokeObjectURL(revoked)
    }
  }, [id])

  if (!item) {
    return (
      <div className="empty">
        <p>找不到这条记录</p>
        <Link to="/my-speaking" className="btn btn-ghost" style={{ marginTop: 12 }}>
          返回我的口语
        </Link>
      </div>
    )
  }

  const ev = item.evaluation
  const answer = item.answerText || ev?.transcript || ''
  const pending = Boolean(item.pendingScore)

  return (
    <>
      <div style={{ marginBottom: 8 }}>
        <Link to="/my-speaking" className="btn btn-ghost" style={{ padding: 4 }}>
          ← 返回我的口语
        </Link>
      </div>

      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
          <span className="tag tag-accent">Part {item.part}</span>
          {pending ? (
            <span className="tag tag-warning">待评分</span>
          ) : (
            <span className="tag tag-warning">{item.overall} / 9.0</span>
          )}
          <span className="tag">{item.provider}</span>
          {item.bankId === 'predicted-2026-q4' ? (
            <span className="tag tag-purple">题库：2026 9-12 保留题</span>
          ) : (
            <span className="tag">题库：默认题库</span>
          )}
          {item.isDemo && <span className="tag">演示分</span>}
          {item.transcribeSource ? (
            <span className="tag">转写：{TRANSCRIBE_SOURCE_LABEL[item.transcribeSource]}</span>
          ) : null}
          {item.hasAudio || audioUrl ? <span className="tag">有录音</span> : null}
          <span className="tag">{new Date(item.createdAt).toLocaleString()}</span>
        </div>
        <h1 className="page-title">{item.topicPrompt}</h1>
        <p className="page-subtitle">
          {item.duration}s · {pending ? '录音已保存，可重新评分' : '已本地保存'}
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {pending ? (
          <Link
            to={`/speaking/practice?topicId=${item.topicId}&draftId=${item.id}`}
            className="btn btn-primary"
          >
            继续评分（无需重录）
          </Link>
        ) : (
          <Link to={`/speaking/practice?topicId=${item.topicId}`} className="btn btn-primary">
            同题再练
          </Link>
        )}
        <button type="button" className="btn btn-ghost" onClick={() => setConfirmOpen(true)}>
          删除
        </button>
      </div>

      {pending && item.lastError ? (
        <div
          className="card"
          style={{
            marginBottom: 16,
            background: 'rgba(255, 59, 48, 0.06)',
            borderColor: 'transparent',
          }}
        >
          <div className="card-title">上次评分未成功</div>
          <p style={{ fontSize: 13, margin: 0, color: 'var(--text-secondary)' }}>{item.lastError}</p>
          <p style={{ fontSize: 12, margin: '8px 0 0', color: 'var(--text-tertiary)' }}>
            录音和文字都还在，点「继续评分」即可重试，不用重新说一遍。
          </p>
        </div>
      ) : null}

      {audioUrl ? (
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-title">你的录音</div>
          <audio controls src={audioUrl} style={{ width: '100%' }} />
        </div>
      ) : null}

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">你的回答</div>
        {answer ? (
          <div className="essay-content" style={{ whiteSpace: 'pre-wrap' }}>
            {answer}
          </div>
        ) : (
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            {pending
              ? '还没有转写文字。继续评分页可手打英文后再评。'
              : '这条旧记录没有保存原文。'}
          </p>
        )}
      </div>

      {!pending && ev ? (
        <SpeakingResultPanels result={ev} overallLabel="当时评分" />
      ) : pending ? (
        <div className="card">
          <div className="card-title">下一步</div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 0 }}>
            这条练习还没打出分数。录音已保留，点击上方「继续评分」回到练习页一键重试即可。
          </p>
        </div>
      ) : null}

      <ConfirmDialog
        open={confirmOpen}
        title="删除这条口语记录？"
        message="删除后无法恢复这条练习与录音。"
        confirmLabel="删除"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          remove(item.id)
          setConfirmOpen(false)
          navigate('/my-speaking')
        }}
      />
    </>
  )
}
