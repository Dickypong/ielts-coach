import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import type { AIEvaluation } from '../lib/ai'
import { evaluateEssayWithProvider } from '../lib/ai-provider'
import { getAiReadyState } from '../lib/ai-ready'
import { useHistoryStore } from '../store/history'
import { useAllWritingTopics } from '../store/customTopics'
import EvaluationPanel from '../components/EvaluationPanel'

export default function EssaySubmit() {
  const [params] = useSearchParams()
  const presetTopicId = params.get('topicId')
  const writingTopics = useAllWritingTopics()

  const [topicId, setTopicId] = useState(presetTopicId || '')
  const [essay, setEssay] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AIEvaluation | null>(null)
  const [savedId, setSavedId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const addHistory = useHistoryStore((s) => s.add)
  const aiReady = getAiReadyState()

  useEffect(() => {
    const fromUrl = params.get('topicId')
    if (fromUrl && writingTopics.some((t) => t.id === fromUrl)) {
      setTopicId(fromUrl)
      return
    }
    if (!topicId && writingTopics[0]?.id) setTopicId(writingTopics[0].id)
    if (topicId && !writingTopics.some((t) => t.id === topicId) && writingTopics[0]?.id) {
      setTopicId(writingTopics[0].id)
    }
  }, [writingTopics, topicId, params])

  const topic = writingTopics.find((t) => t.id === topicId)
  const wordCount = useMemo(
    () => (essay.trim() ? essay.trim().split(/\s+/).length : 0),
    [essay],
  )
  const minWords = topic?.task === 1 ? 150 : 250
  const guideMax = topic?.task === 1 ? 200 : 300

  const handleEvaluate = async () => {
    if (!essay.trim() || !topic) return
    const ready = getAiReadyState()
    if (!ready.canScore) {
      setError(ready.blockReason)
      return
    }
    setLoading(true)
    setResult(null)
    setSavedId(null)
    setError(null)
    try {
      const { result: evalResult } = await evaluateEssayWithProvider(essay, topic, ready.config)
      setResult(evalResult)
      const id = addHistory({
        topicId: topic.id,
        topicPrompt: topic.prompt,
        task: topic.task,
        content: essay,
        wordCount,
        overall: evalResult.overall,
        evaluation: evalResult,
        provider: ready.config.provider,
        isDemo: ready.isDemo,
      })
      setSavedId(id)
    } catch (e) {
      setError(e instanceof Error ? e.message : '网络错误，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">AI 作文评估</h1>
        <p className="page-subtitle">
          {aiReady.statusLine} ·{' '}
          <Link to="/settings" style={{ color: 'var(--accent)' }}>
            设置
          </Link>
          {' · '}
          <Link to="/my-essays" style={{ color: 'var(--accent)' }}>
            我的作文
          </Link>
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: 20 }}>
        <div className="card">
          <div style={{ marginBottom: 16 }}>
            <label className="field-label">题目</label>
            <select
              className="input"
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
            >
              {writingTopics.map((t) => (
                <option key={t.id} value={t.id}>
                  [{t.examDate}] Task {t.task} - {t.prompt.slice(0, 40)}...
                </option>
              ))}
            </select>
          </div>

          {topic && (
            <div className="tip" style={{ marginBottom: 16, fontSize: 13 }}>
              <strong>{topic.task === 2 ? 'Task 2:' : 'Task 1:'}</strong> {topic.prompt}
            </div>
          )}

          <div style={{ marginBottom: 12 }}>
            <label className="field-label">你的作文 ({wordCount} 词)</label>
            <textarea
              className="textarea"
              placeholder="在这里输入或粘贴你的作文..."
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              style={{ minHeight: 320 }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 11,
                color: 'var(--text-tertiary)',
                marginTop: 6,
              }}
            >
              <span>
                建议 {topic?.task === 1 ? '150–200' : '250–300'} 词（Task {topic?.task || 2}）
              </span>
              <span
                style={{
                  color: wordCount > 0 && wordCount < minWords ? 'var(--warning)' : 'var(--text-tertiary)',
                }}
              >
                {wordCount} / {guideMax}
              </span>
            </div>
          </div>

          {error && (
            <div className="tip" style={{ marginBottom: 12, color: 'var(--danger)' }}>
              {error}
            </div>
          )}
          {savedId && (
            <div className="tip" style={{ marginBottom: 12 }}>
              ✓ 已保存到本机
              {aiReady.isDemo ? '（演示分，不计入均分）' : ''} ·{' '}
              <Link to={`/my-essays/${savedId}`} style={{ color: 'var(--accent)' }}>
                打开这条记录
              </Link>
            </div>
          )}

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="btn btn-primary btn-lg"
              disabled={!essay.trim() || loading || !aiReady.canScore}
              title={aiReady.blockReason || undefined}
              onClick={handleEvaluate}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  AI 正在评分...
                </>
              ) : aiReady.isDemo ? (
                <>演示评分</>
              ) : (
                <>开始评分</>
              )}
            </button>
            <Link to="/my-essays" className="btn btn-secondary btn-lg">
              我的作文
            </Link>
          </div>
        </div>

        {result && <EvaluationPanel result={result} />}
      </div>
    </>
  )
}
