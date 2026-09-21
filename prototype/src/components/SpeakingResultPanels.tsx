import type { SpeakingEvaluation } from '../lib/ai'
import DemoSpeakButton from './DemoSpeakButton'

const TYPE_LABEL: Record<string, string> = {
  grammar: '语法',
  vocab: '词汇',
  fluency: '流利度',
  pronunciation: '发音',
  content: '内容',
}

type Props = {
  result: SpeakingEvaluation
  /** 详情页可传入「当时评分」等 */
  overallLabel?: string
  audioUrl?: string | null
}

export default function SpeakingResultPanels({
  result,
  overallLabel = '综合评分',
  audioUrl,
}: Props) {
  return (
    <>
      {audioUrl ? (
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-title">你的录音</div>
          <audio controls src={audioUrl} style={{ width: '100%' }} />
        </div>
      ) : null}

      <div className="score-panel" style={{ marginBottom: 16 }}>
        <div className="score-summary">
          <div className="score-circle" style={{ ['--score' as string]: result.overall }}>
            <div className="score-circle-inner">
              <div className="score-value">{result.overall}</div>
              <div className="score-suffix">/ 9.0</div>
            </div>
          </div>
          <div className="score-summary-text">
            <div className="overall">
              {overallLabel}
              {result.duration ? ` · ${result.duration}s` : ''}
            </div>
            <div className="feedback">发音*为文本推断，非正式听音分</div>
          </div>
        </div>
        <div className="divider"></div>
        {[
          { label: 'Fluency', value: result.bandCriteria.fluency },
          { label: 'Lexical', value: result.bandCriteria.lexical },
          { label: 'Grammar', value: result.bandCriteria.grammar },
          { label: 'Pronunciation*', value: result.bandCriteria.pronunciation },
        ].map((row) => (
          <div className="score-row" key={row.label}>
            <div className="score-row-label">{row.label}</div>
            <div className="score-row-bar">
              <div className="score-row-fill" style={{ width: `${(row.value / 9) * 100}%` }}></div>
            </div>
            <div className="score-row-value">{row.value}</div>
          </div>
        ))}
        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 8 }}>
          * Pronunciation 根据转写文字粗估，不是考官听录音打的分。
        </div>
      </div>

      {result.scoringPoints && result.scoringPoints.length > 0 ? (
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-title">相关拿分点</div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.7 }}>
            {result.scoringPoints.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">哪里说得不对</div>
        {result.mistakes?.length ? (
          <div className="feedback-list">
            {result.mistakes.map((m, i) => (
              <div key={i} className="feedback-item error">
                <div className="badge-icon">!</div>
                <div className="body">
                  <div style={{ marginBottom: 6 }}>
                    <span className="tag tag-warning">{TYPE_LABEL[m.type] || m.type}</span>
                  </div>
                  <div style={{ fontSize: 13, marginBottom: 4 }}>
                    <span style={{ color: 'var(--danger)' }}>你说：</span> {m.original}
                  </div>
                  <div style={{ fontSize: 13, marginBottom: 4 }}>
                    <span style={{ color: 'var(--success, #34c759)' }}>更好：</span> {m.better}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{m.reason}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            暂无逐句纠错，可参考下方维度反馈。
          </p>
        )}
      </div>

      {result.improvedAnswer ? (
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-title">示范一：基于你的回答</div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 0 }}>
            保留你的观点与内容，把表达改得更自然、更像考场高分答法。
          </p>
          <div className="essay-content" style={{ whiteSpace: 'pre-wrap' }}>
            {result.improvedAnswer}
          </div>
          <DemoSpeakButton text={result.improvedAnswer} label="朗读示范一" />
        </div>
      ) : null}

      {result.modelAnswer ? (
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-title">示范二：官方风格高分答</div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 0 }}>
            这道题更理想的答法（约 7.5–8.5），可与你的版本对照学习结构与词汇。
          </p>
          <div className="essay-content" style={{ whiteSpace: 'pre-wrap' }}>
            {result.modelAnswer}
          </div>
          <DemoSpeakButton text={result.modelAnswer} label="朗读示范二" />
        </div>
      ) : null}

      <div className="card">
        <div className="card-title">维度反馈</div>
        <div className="feedback-list">
          {(
            [
              ['流利度', result.feedback.fluency],
              ['发音（文本推断）', result.feedback.pronunciation],
              ['语法', result.feedback.grammar],
              ['内容', result.feedback.content],
            ] as const
          ).map(([label, body]) => (
            <div key={label} className="feedback-item improve">
              <div className="badge-icon">·</div>
              <div className="body">
                <strong>{label}</strong>
                {body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
