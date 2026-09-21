import type { AIEvaluation } from '../lib/ai'

/** 评分结果展示（评估页 / 历史回看共用） */
export default function EvaluationPanel({ result }: { result: AIEvaluation }) {
  return (
    <div>
      <div className="score-panel" style={{ marginBottom: 16 }}>
        <div className="score-summary">
          <div className="score-circle" style={{ ['--score' as string]: result.overall }}>
            <div className="score-circle-inner">
              <div className="score-value">{result.overall}</div>
              <div className="score-suffix">/ 9.0</div>
            </div>
          </div>
          <div className="score-summary-text">
            <div className="overall">综合评分</div>
            <div className="feedback">{result.feedback.summary}</div>
          </div>
        </div>

        <div className="divider"></div>

        {result.overallRationale && (
          <div style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: 12 }}>
            <strong style={{ color: 'var(--text-primary)' }}>总分怎么来的：</strong>
            {result.overallRationale}
          </div>
        )}

        {[
          { label: 'Task Response（任务回应）', value: result.bandCriteria.taskResponse },
          { label: 'Coherence & Cohesion（连贯衔接）', value: result.bandCriteria.coherence },
          { label: 'Lexical Resource（词汇丰富度）', value: result.bandCriteria.lexical },
          { label: 'Grammar（语法）', value: result.bandCriteria.grammar },
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

      {result.scoringDetails && (
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-title">打分细节（为什么是这个分）</div>
          {(
            [
              ['Task Response', result.scoringDetails.taskResponse],
              ['Coherence & Cohesion', result.scoringDetails.coherence],
              ['Lexical Resource', result.scoringDetails.lexical],
              ['Grammar', result.scoringDetails.grammar],
            ] as const
          ).map(([label, detail]) =>
            detail ? (
              <div key={label} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <strong style={{ fontSize: 13 }}>{label}</strong>
                  <span className="tag tag-accent">{detail.score}</span>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-secondary)', margin: '0 0 6px' }}>
                  {detail.why}
                </p>
                {detail.evidence?.length > 0 && (
                  <ul style={{ margin: '0 0 6px', paddingLeft: 18, fontSize: 12, color: 'var(--text-tertiary)' }}>
                    {detail.evidence.map((e, i) => (
                      <li key={i}>原文依据：{e}</li>
                    ))}
                  </ul>
                )}
                <div className="tip" style={{ fontSize: 12, marginTop: 4 }}>
                  再高 0.5 分需要：{detail.gapToNext}
                </div>
              </div>
            ) : null,
          )}
        </div>
      )}

      <div className="card">
        <div className="card-title">详细反馈</div>
        <div className="feedback-list">
          {result.feedback.good.map((g, i) => (
            <div key={i} className="feedback-item good">
              <div className="badge-icon">✓</div>
              <div className="body">{g}</div>
            </div>
          ))}
          {result.feedback.improve.map((g, i) => (
            <div key={`i${i}`} className="feedback-item improve">
              <div className="badge-icon">↗</div>
              <div className="body">{g}</div>
            </div>
          ))}
          {result.feedback.error.map((g, i) => (
            <div key={`e${i}`} className="feedback-item error">
              <div className="badge-icon">⚠</div>
              <div className="body">{g}</div>
            </div>
          ))}
        </div>
      </div>

      {result.feedback.vocabUpgrade?.length > 0 && (
        <div className="card" style={{ marginTop: 16 }}>
          <div className="card-title">词汇升级建议</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {result.feedback.vocabUpgrade.map((v, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13 }}>
                <span className="tag" style={{ background: 'rgba(255, 59, 48, 0.1)', color: 'var(--danger)' }}>
                  {v.original}
                </span>
                <span>→</span>
                <span className="tag tag-success" style={{ flex: 1 }}>
                  {v.better}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.feedback.structureTips?.length > 0 && (
        <div className="card" style={{ marginTop: 16 }}>
          <div className="card-title">结构建议</div>
          <ol style={{ paddingLeft: 20, fontSize: 13, lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            {result.feedback.structureTips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ol>
        </div>
      )}

      {result.improvedEssay?.content && (
        <div className="card" style={{ marginTop: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              marginBottom: 8,
            }}
          >
            <div className="card-title" style={{ marginBottom: 0 }}>
              基于你原文的改进范文
            </div>
            <span className="tag tag-success">目标 {result.improvedEssay.targetBand} 分</span>
          </div>
          {result.improvedEssay.content.includes('Mock 模式') ? (
            <div className="tip" style={{ color: 'var(--danger)' }}>
              {result.improvedEssay.content}
              <div style={{ marginTop: 8 }}>
                请到「设置」选择 MiniMax，点「从 OpenClaw 导入」或粘贴 Key，再点「保存」，然后重新评分。
              </div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 10 }}>
                保留核心观点，升级论证 / 词汇 / 句式 · 约 {result.improvedEssay.wordCount || '—'} 词
              </div>
              {result.improvedEssay.whatChanged?.length > 0 && (
                <div className="feedback-list" style={{ marginBottom: 12 }}>
                  {result.improvedEssay.whatChanged.map((c, i) => (
                    <div key={i} className="feedback-item improve">
                      <div className="badge-icon">✎</div>
                      <div className="body">{c}</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="essay-content" style={{ whiteSpace: 'pre-wrap' }}>
                {result.improvedEssay.content}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
