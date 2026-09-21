import { useEffect, useState } from 'react'
import {
  DEFAULT_AI_CONFIG,
  PROVIDER_MODELS,
  TRANSCRIBE_PROVIDER_LABEL,
  loadAIConfig,
  saveAIConfig,
  type AIConfig,
  type AIProviderName,
  type AsrLanguageCode,
  type TranscribeProvider,
} from '../lib/ai-config'
import { getAIProvider } from '../lib/ai-provider'
import { importMinimaxKeyFromOpenClaw } from '../lib/import-key'
import { transcribeWithMinimaxAsr } from '../lib/minimax-asr'
import type { WritingTopic } from '../data/writingTopics'

const LANGUAGE_OPTIONS: { value: AsrLanguageCode; label: string }[] = [
  { value: '', label: '自动（中英混识别）' },
  { value: 'en', label: '英语（默认，IELTS 推荐）' },
  { value: 'zh', label: '中文' },
  { value: 'yue', label: '粤语' },
  { value: 'ja', label: '日语' },
  { value: 'ko', label: '韩语' },
  { value: 'fr', label: '法语' },
  { value: 'de', label: '德语' },
  { value: 'es', label: '西班牙语' },
]

const PING_TOPIC: WritingTopic = {
  id: 'ping',
  examDate: 'test',
  book: 14,
  test: 1,
  task: 2,
  prompt: 'Some people think that public transport should be free. To what extent do you agree?',
  type: 'opinion',
  tags: [],
  difficulty: 'medium',
  essayCount: 0,
}

export default function Settings() {
  const [config, setConfig] = useState<AIConfig>(DEFAULT_AI_CONFIG)
  const [saved, setSaved] = useState(false)
  const [testing, setTesting] = useState(false)
  const [importing, setImporting] = useState(false)
  const [testMsg, setTestMsg] = useState<string | null>(null)
  const [asrTesting, setAsrTesting] = useState(false)
  const [asrTestMsg, setAsrTestMsg] = useState<string | null>(null)

  useEffect(() => {
    setConfig(loadAIConfig())
  }, [])

  const update = <K extends keyof AIConfig>(key: K, value: AIConfig[K]) => {
    setConfig((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'provider') {
        next.model = PROVIDER_MODELS[value as AIProviderName]
      }
      return next
    })
    setSaved(false)
    setTestMsg(null)
    setAsrTestMsg(null)
  }

  const handleSave = () => {
    saveAIConfig(config)
    setSaved(true)
  }

  const handleImportOpenClaw = async () => {
    setImporting(true)
    setTestMsg(null)
    try {
      const result = await importMinimaxKeyFromOpenClaw()
      if (!result.ok) {
        setTestMsg(result.error)
        return
      }
      const next: AIConfig = {
        ...config,
        provider: 'minimax',
        model: PROVIDER_MODELS.minimax,
        apiKey: result.apiKey,
      }
      setConfig(next)
      saveAIConfig(next)
      setSaved(true)
      setTestMsg(`✓ 已从 ${result.source} 导入 Key，并切换到 MiniMax`)
      setAsrTestMsg(null)
    } finally {
      setImporting(false)
    }
  }

  const handleAsrSelfTest = async () => {
    setAsrTesting(true)
    setAsrTestMsg(null)
    try {
      saveAIConfig(config)
      if (!config.apiKey.trim()) {
        setAsrTestMsg('请先填写或导入 MiniMax API Key（ASR 共用同一 Key）')
        return
      }
      // 4 秒静音 wav：16 kHz / 16 bit / mono
      const sampleRate = 16000
      const totalSamples = sampleRate * 1
      const wavBytes = new Uint8Array(44 + totalSamples * 2)
      const dv = new DataView(wavBytes.buffer)
      const writeStr = (off: number, s: string) => {
        for (let i = 0; i < s.length; i++) dv.setUint8(off + i, s.charCodeAt(i))
      }
      writeStr(0, 'RIFF')
      dv.setUint32(4, 36 + totalSamples * 2, true)
      writeStr(8, 'WAVE')
      writeStr(12, 'fmt ')
      dv.setUint32(16, 16, true)
      dv.setUint16(20, 1, true)
      dv.setUint16(22, 1, true)
      dv.setUint32(24, sampleRate, true)
      dv.setUint32(28, sampleRate * 2, true)
      dv.setUint16(32, 2, true)
      dv.setUint16(34, 16, true)
      writeStr(36, 'data')
      dv.setUint32(40, totalSamples * 2, true)
      const blob = new Blob([wavBytes], { type: 'audio/wav' })
      const r = await transcribeWithMinimaxAsr(blob, {
        language: config.asrLanguage || '',
      })
      if (r.ok) {
        setAsrTestMsg(
          `✓ MiniMax ASR 连通成功（trace_id=${r.traceId || '-'}, duration=${r.durationSec}s）。接口返回："${r.text || '(空识别文本)'}"`,
        )
      } else {
        setAsrTestMsg(`× ASR 失败：${r.message}`)
      }
    } catch (e) {
      setAsrTestMsg(`× ASR 自检异常：${e instanceof Error ? e.message : '未知错误'}`)
    } finally {
      setAsrTesting(false)
    }
  }

  const handleTest = async () => {
    setTesting(true)
    setTestMsg(null)
    try {
      saveAIConfig(config)
      if (config.provider === 'mock') {
        setTestMsg('当前是 Mock：不会调用外网，也不会生成真改进范文。正式练习请选 MiniMax 并填 Key。')
        return
      }
      if (!config.apiKey.trim()) {
        setTestMsg('请先填写 API Key，或点「从 OpenClaw 导入」')
        return
      }
      const provider = getAIProvider(config)
      // 轻量连通：只要求模型返回极短 JSON，避免每次测试都完整评分烧额度
      if (config.provider === 'minimax') {
        const response = await fetch('https://api.minimaxi.com/v1/text/chatcompletion_v2', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: config.model || 'MiniMax-M3',
            messages: [{ role: 'user', content: 'Reply JSON only: {"ok":true}' }],
            max_tokens: 40,
            temperature: 0,
          }),
        })
        if (!response.ok) throw new Error(`MiniMax HTTP ${response.status}`)
        const body = (await response.json()) as {
          base_resp?: { status_code?: number; status_msg?: string }
          choices?: { message?: { content?: string } }[]
        }
        if (body.base_resp?.status_code && body.base_resp.status_code !== 0) {
          throw new Error(body.base_resp.status_msg || 'MiniMax 返回失败')
        }
        if (!body.choices?.[0]?.message?.content) throw new Error('MiniMax 未返回内容')
        setTestMsg(`✓ ${provider.name} 连通成功。请回到「AI 作文评估」重新评分，即可生成改进范文。`)
        return
      }
      const short =
        'Many people prefer public transport. I agree because it reduces pollution and traffic. Governments should invest more in buses and trains.'
      await provider.evaluateEssay(short, PING_TOPIC)
      setTestMsg(`✓ ${provider.name} 连通成功，可以生成评分和改进范文。`)
    } catch (e) {
      setTestMsg(e instanceof Error ? e.message : '测试失败')
    } finally {
      setTesting(false)
    }
  }

  const fieldHintStyle: React.CSSProperties = {
    fontSize: 12,
    color: 'var(--text-tertiary)',
    marginTop: 6,
    lineHeight: 1.55,
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">设置</h1>
        <p className="page-subtitle">
          AI 模型与 API Key（存本机）。改进范文只有正式模型才会生成；Mock 只演示评分结构。
        </p>
      </div>

      <div className="card" style={{ maxWidth: 640 }}>
        <div className="card-title">AI 评估 Provider</div>

        <div style={{ marginBottom: 16 }}>
          <label className="field-label">Provider</label>
          <select
            className="input"
            value={config.provider}
            onChange={(e) => update('provider', e.target.value as AIProviderName)}
          >
            <option value="minimax">MiniMax（推荐）</option>
            <option value="claude">Claude</option>
            <option value="openai">OpenAI</option>
            <option value="mock">Mock（本地演示，无真范文）</option>
          </select>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label className="field-label">Model</label>
          <input
            className="input"
            value={config.model}
            onChange={(e) => update('model', e.target.value)}
            placeholder="MiniMax-M3"
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label className="field-label">评分 API Key</label>
          <input
            className="input"
            type="password"
            autoComplete="off"
            value={config.apiKey}
            onChange={(e) => update('apiKey', e.target.value)}
            placeholder={config.provider === 'mock' ? 'Mock 模式可不填' : 'sk-...'}
          />
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 6 }}>
            {config.apiKey
              ? `已填写 · ${config.apiKey.slice(0, 6)}…（共 ${config.apiKey.length} 位）`
              : '未填写：即使选了 MiniMax，也会无法生成改进范文'}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label className="field-label">口语转写 Whisper API Key（可选）</label>
          <input
            className="input"
            type="password"
            autoComplete="off"
            value={config.whisperApiKey}
            onChange={(e) => update('whisperApiKey', e.target.value)}
            placeholder="可不填 · 仅在要用 OpenAI Whisper 时填写"
          />
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 6 }}>
            {config.whisperApiKey
              ? `已填写 · ${config.whisperApiKey.slice(0, 6)}…（共 ${config.whisperApiKey.length} 位）`
              : '推荐用桌面 App（npm run tauri:dev）：macOS 原生转写录音 + MiniMax 打分，无需 OpenAI / 无需再说一遍。Whisper 仅作可选备用'}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label className="field-label">口语录音转写引擎</label>
          <select
            className="input"
            value={config.transcribeProvider}
            onChange={(e) =>
              update('transcribeProvider', e.target.value as TranscribeProvider)
            }
          >
            {(Object.keys(TRANSCRIBE_PROVIDER_LABEL) as TranscribeProvider[]).map((k) => (
              <option key={k} value={k}>
                {TRANSCRIBE_PROVIDER_LABEL[k]}
              </option>
            ))}
          </select>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 6 }}>
            默认「自动」：先 MiniMax ASR（在线，2.50 元/小时）→ macOS SFSpeech（桌面 App 兜底）→ Whisper → 浏览器听写。
            评分仍用 MiniMax M3。
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label className="field-label">MiniMax ASR 语言</label>
          <select
            className="input"
            value={config.asrLanguage}
            onChange={(e) => update('asrLanguage', e.target.value as AsrLanguageCode)}
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt.value || 'auto'} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 6 }}>
            IELTS 口语保持「英语」即可。中英混练习选「自动」。
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label className="field-label">Temperature（随机性）：{config.temperature}</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={config.temperature}
            onChange={(e) => update('temperature', Number(e.target.value))}
            style={{ width: '100%' }}
          />
          <p style={fieldHintStyle}>
            控制 AI 回复的「发散程度」。
            0 = 稳定、保守、每次回答几乎一致，适合评分这类需要严谨、客观输出的场景（推荐）；
            1 = 更有创意、更随机，适合写范文、改写润色，但容易跑题或编造内容。
            拖到 0.2-0.4 之间通常兼顾稳定性和表达自然度。
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <button className="btn btn-primary" onClick={handleSave}>
            保存
          </button>
          <button className="btn btn-secondary" onClick={handleImportOpenClaw} disabled={importing}>
            {importing ? '导入中…' : '从 OpenClaw 导入'}
          </button>
          <button className="btn btn-secondary" onClick={handleTest} disabled={testing}>
            {testing ? '测试中…' : '评分连通测试'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleAsrSelfTest}
            disabled={asrTesting}
          >
            {asrTesting ? 'ASR 自检中…' : 'ASR 连通测试'}
          </button>
        </div>

        {saved && (
          <div className="tip" style={{ marginTop: 12 }}>
            ✓ 已保存到本机
          </div>
        )}
        {testMsg && (
          <div className="tip" style={{ marginTop: 12 }}>
            {testMsg}
          </div>
        )}
        {asrTestMsg && (
          <div className="tip" style={{ marginTop: 8 }}>
            {asrTestMsg}
          </div>
        )}
      </div>
    </>
  )
}
