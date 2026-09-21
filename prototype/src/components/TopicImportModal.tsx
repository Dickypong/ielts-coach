import { useEffect, useMemo, useState } from 'react'
import {
  parseSpeakingImport,
  parseWritingImport,
  SPEAKING_IMPORT_EXAMPLE,
  WRITING_IMPORT_EXAMPLE,
} from '../lib/parse-topic-import'
import { useCustomTopicsStore } from '../store/customTopics'
import type { WritingTopic } from '../data/writingTopics'
import type { SpeakingTopic } from '../data/speakingTopics'

type Mode = 'writing' | 'speaking'

type Props = {
  open: boolean
  mode: Mode
  onClose: () => void
  onImported?: (count: number) => void
}

export default function TopicImportModal({ open, mode, onClose, onImported }: Props) {
  const [text, setText] = useState('')
  const [showExample, setShowExample] = useState(false)
  const addWriting = useCustomTopicsStore((s) => s.addWriting)
  const addSpeaking = useCustomTopicsStore((s) => s.addSpeaking)

  useEffect(() => {
    if (!open) {
      setText('')
      setShowExample(false)
    }
  }, [open])

  const parsed = useMemo(() => {
    if (!text.trim()) return { topics: [] as WritingTopic[] | SpeakingTopic[], warnings: [] as string[] }
    return mode === 'writing' ? parseWritingImport(text) : parseSpeakingImport(text)
  }, [text, mode])

  if (!open) return null

  const title = mode === 'writing' ? '导入写作题目' : '导入口语题目'
  const example = mode === 'writing' ? WRITING_IMPORT_EXAMPLE : SPEAKING_IMPORT_EXAMPLE

  const confirm = () => {
    const count =
      mode === 'writing'
        ? addWriting(parsed.topics as WritingTopic[])
        : addSpeaking(parsed.topics as SpeakingTopic[])
    onImported?.(count)
    onClose()
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="topic-import-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <h2 id="topic-import-title" className="card-title" style={{ marginBottom: 4 }}>
              {title}
            </h2>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>
              从备考资料 / 网页复制题目，粘贴到下方。多题用空行或 <code>---</code> 分隔。
            </p>
          </div>
          <button type="button" className="btn btn-ghost" onClick={onClose} aria-label="关闭">
            ✕
          </button>
        </div>

        <div className="tip" style={{ marginTop: 12, fontSize: 12 }}>
          {mode === 'writing' ? (
            <>
              可选首行写 <strong>Task 1</strong> / <strong>Task 2</strong>；也可只贴英文题干（会自动判断）。
            </>
          ) : (
            <>
              可选首行写 <strong>Part 1/2/3</strong>；追问用 <strong>-</strong> 或数字开头；Part 2 可用
              You should say。
            </>
          )}
        </div>

        <textarea
          className="input"
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="在此粘贴题目…"
          style={{ width: '100%', marginTop: 12, resize: 'vertical', fontFamily: 'inherit' }}
          autoFocus
        />

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
          <button type="button" className="btn btn-ghost" onClick={() => setShowExample((v) => !v)}>
            {showExample ? '收起示例' : '查看格式示例'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setText(example)}>
            填入示例
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setText('')}>
            清空
          </button>
        </div>

        {showExample && (
          <pre
            style={{
              marginTop: 8,
              padding: 12,
              background: 'rgba(0,0,0,0.04)',
              borderRadius: 8,
              fontSize: 11,
              whiteSpace: 'pre-wrap',
              lineHeight: 1.5,
            }}
          >
            {example}
          </pre>
        )}

        {text.trim() && (
          <div style={{ marginTop: 14 }}>
            <div className="card-title" style={{ fontSize: 13 }}>
              预览 · 识别到 {parsed.topics.length} 题
              {parsed.warnings.length ? ` · ${parsed.warnings.length} 条提示` : ''}
            </div>
            {parsed.warnings.map((w, i) => (
              <div key={i} style={{ fontSize: 12, color: 'var(--danger)', marginTop: 4 }}>
                {w}
              </div>
            ))}
            <div style={{ maxHeight: 180, overflow: 'auto', marginTop: 8 }}>
              {parsed.topics.map((t, i) => (
                <div
                  key={i}
                  style={{
                    padding: '8px 10px',
                    borderRadius: 8,
                    background: 'rgba(0,122,255,0.04)',
                    marginBottom: 6,
                    fontSize: 12,
                    lineHeight: 1.5,
                  }}
                >
                  {'task' in t ? (
                    <span className="tag tag-accent" style={{ marginRight: 6 }}>
                      Task {(t as WritingTopic).task}
                    </span>
                  ) : (
                    <span className="tag tag-success" style={{ marginRight: 6 }}>
                      Part {(t as SpeakingTopic).part}
                    </span>
                  )}
                  <span>{t.prompt.slice(0, 140)}{t.prompt.length > 140 ? '…' : ''}</span>
                  {'subQuestions' in t && (t as SpeakingTopic).subQuestions?.length ? (
                    <div style={{ color: 'var(--text-tertiary)', marginTop: 4 }}>
                      追问 {(t as SpeakingTopic).subQuestions!.length} 条
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            取消
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!parsed.topics.length}
            onClick={confirm}
          >
            导入 {parsed.topics.length || ''} 题
          </button>
        </div>
      </div>
    </div>
  )
}
