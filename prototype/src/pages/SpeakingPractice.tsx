import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import type { SpeakingEvaluation } from '../lib/ai'
import type { SpeakingTopic } from '../data/speakingTopics'
import { getAiReadyState, resolveWhisperApiKey } from '../lib/ai-ready'
import { evaluateSpeakingWithProvider } from '../lib/ai-provider'
import { isTauriApp, transcribeWithMacSpeech } from '../lib/native-transcribe'
import {
  transcribeWithMinimaxAsr,
  resolveMinimaxApiKey,
} from '../lib/minimax-asr'
import {
  speechRecognitionSupported,
  startDictation,
  startSpeakSession,
  type DictationHandle,
  type SpeakSessionHandle,
} from '../lib/speak-session'
import { transcribeWithWhisper } from '../lib/transcribe'
import { getSpeakingAudio, saveSpeakingAudio } from '../lib/speaking-audio-db'
import {
  makePendingEvaluation,
  useSpeakingHistoryStore,
  type TranscribeSource,
} from '../store/speakingHistory'
import { SPEAKING_BANKS, useSpeakingBank } from '../store/speakingBanks'
import SpeakingResultPanels from '../components/SpeakingResultPanels'

function formatSec(s: number) {
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, '0')}`
}

function wordCount(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}

type Phase = 'idle' | 'recording' | 'transcribing' | 'review' | 'dictating' | 'analyzing' | 'done'

type TranscribeAttempt =
  | { provider: 'minimax'; ok: true; text: string; durationSec?: number; traceId?: string }
  | { provider: 'minimax'; ok: false; code: string; message: string }
  | { provider: 'mac'; ok: true; text: string }
  | { provider: 'mac'; ok: false; message: string }
  | { provider: 'whisper'; ok: true; text: string }
  | { provider: 'whisper'; ok: false; message: string }
  | { provider: 'browser'; ok: true; text: string }
  | { provider: 'browser'; ok: false; message: string }

export default function SpeakingPractice() {
  const [params] = useSearchParams()
  const presetTopicId = params.get('topicId')
  const bank = useSpeakingBank()
  const speakingTopics = bank.topics
  const [topicId, setTopicId] = useState(presetTopicId || '')
  const [recording, setRecording] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')
  const [result, setResult] = useState<SpeakingEvaluation | null>(null)
  const [savedId, setSavedId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hint, setHint] = useState<string | null>(null)
  const [draftText, setDraftText] = useState('')
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [durationSec, setDurationSec] = useState(0)
  const [byteSize, setByteSize] = useState(0)
  const [level, setLevel] = useState(0)
  const [heardVoice, setHeardVoice] = useState(false)
  const [sttSupported] = useState(() => speechRecognitionSupported())
  const [autoScoreDictate, setAutoScoreDictate] = useState(false)
  const [transcribeSource, setTranscribeSource] = useState<TranscribeSource | null>(null)
  const [activeTab, setActiveTab] = useState<'prompt' | 'example' | 'part3'>('prompt')

  const sessionRef = useRef<SpeakSessionHandle | null>(null)
  const dictationRef = useRef<DictationHandle | null>(null)
  const heardVoiceRef = useRef(false)
  const audioBlobRef = useRef<Blob | null>(null)
  const mimeTypeRef = useRef('')
  const draftIdRef = useRef<string | null>(null)
  const addHistory = useSpeakingHistoryStore((s) => s.add)
  const updateHistory = useSpeakingHistoryStore((s) => s.update)
  const markHasAudio = useSpeakingHistoryStore((s) => s.markHasAudio)
  const getHistoryById = useSpeakingHistoryStore((s) => s.getById)

  // 题库异步/导入后补默认选中；URL topicId 变化时同步
  useEffect(() => {
    const bankParam = params.get('bank')
    if (
      bankParam &&
      (bankParam === 'default' || bankParam === 'predicted-2026-q4') &&
      bankParam !== bank.bankId
    ) {
      bank.setBankId(bankParam)
    }
    const fromUrl = params.get('topicId')
    if (fromUrl && speakingTopics.some((t) => t.id === fromUrl)) {
      setTopicId(fromUrl)
      return
    }
    if (!topicId && speakingTopics[0]?.id) setTopicId(speakingTopics[0].id)
    if (topicId && !speakingTopics.some((t) => t.id === topicId) && speakingTopics[0]?.id) {
      setTopicId(speakingTopics[0].id)
    }
  }, [speakingTopics, topicId, params, bank.bankId, bank.setBankId])

  // 从「我的口语」待评分记录继续：恢复文字 + 录音
  useEffect(() => {
    const draftId = params.get('draftId')
    if (!draftId) return
    const item = getHistoryById(draftId)
    if (!item) return
    draftIdRef.current = item.id
    setSavedId(item.id)
    setTopicId(item.topicId)
    setDraftText(item.answerText || item.evaluation?.transcript || '')
    setDurationSec(item.duration || 0)
    if (item.transcribeSource) setTranscribeSource(item.transcribeSource)
    setPhase(item.pendingScore ? 'review' : 'done')
    if (!item.pendingScore && item.evaluation) {
      setResult(item.evaluation)
    }
    if (item.pendingScore) {
      setHint('已恢复上次录音与转写。可直接点「重新评分」，无需重录。')
    }
    void (async () => {
      try {
        const audio = await getSpeakingAudio(item.id)
        if (!audio) return
        audioBlobRef.current = audio.blob
        mimeTypeRef.current = audio.mimeType
        setByteSize(audio.blob.size)
        const url = URL.createObjectURL(audio.blob)
        setAudioUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev)
          return url
        })
      } catch {
        /* ignore */
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const topic = speakingTopics.find((t) => t.id === topicId)

  // 切题库或换题时，重置 tab
  useEffect(() => {
    setActiveTab('prompt')
  }, [bank.bankId, topicId])

  useEffect(() => {
    return () => {
      try {
        sessionRef.current?.release()
      } catch {
        /* ignore */
      }
      try {
        dictationRef.current?.abort()
      } catch {
        /* ignore */
      }
      sessionRef.current = null
      dictationRef.current = null
      audioBlobRef.current = null
      if (audioUrl) URL.revokeObjectURL(audioUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const clearAudio = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
      setAudioUrl(null)
    }
    audioBlobRef.current = null
    mimeTypeRef.current = ''
  }

  /** 停录后立刻把录音（和已有转写）写入「我的口语」待评分草稿，评分失败也不丢 */
  const ensurePendingDraft = async (opts: {
    answerText: string
    duration: number
    source?: TranscribeSource | null
    lastError?: string
  }) => {
    if (!topic) return null
    const ready = getAiReadyState()
    const answerText = opts.answerText.trim()
    const existingId = draftIdRef.current
    const payload = {
      topicId: topic.id,
      topicPrompt: topic.prompt,
      part: topic.part,
      overall: 0,
      duration: opts.duration,
      answerText,
      evaluation: makePendingEvaluation(answerText, opts.duration),
      provider: ready.config.provider,
      isDemo: ready.isDemo,
      pendingScore: true,
      lastError: opts.lastError,
      hasAudio: false,
      transcribeSource: opts.source ?? transcribeSource ?? null,
      bankId: bank.bankId,
      bankLabel: bank.info.name,
    }

    let id = existingId
    if (id && getHistoryById(id)) {
      updateHistory(id, payload)
    } else {
      id = addHistory(payload)
      draftIdRef.current = id
    }

    const blob = audioBlobRef.current
    if (blob && blob.size > 200) {
      try {
        await saveSpeakingAudio(id, blob, mimeTypeRef.current || blob.type)
        markHasAudio(id, true)
      } catch {
        /* ignore */
      }
    }
    setSavedId(id)
    return id
  }

  const busy =
    phase === 'transcribing' || phase === 'analyzing' || phase === 'dictating' || recording

  const runAnalyze = async (text: string, dur: number) => {
    if (!topic) return
    setPhase('analyzing')
    setHint('正在 AI 打分…')
    setError(null)
    // 评分前先落盘：即使失败，录音和转写也还在
    await ensurePendingDraft({ answerText: text, duration: dur })
    try {
      const ready = getAiReadyState()
      if (!ready.canScore) {
        throw new Error(ready.blockReason || '请先配置 API Key')
      }
      const res = await evaluateSpeakingWithProvider(text, topic, dur, ready.config)
      setResult(res)
      const id = draftIdRef.current
      const scoredPayload = {
        topicId: topic.id,
        topicPrompt: topic.prompt,
        part: topic.part,
        overall: res.overall,
        duration: res.duration || dur,
        answerText: text.trim(),
        evaluation: { ...res, transcript: text.trim() || res.transcript },
        provider: ready.config.provider,
        isDemo: ready.isDemo,
        pendingScore: false,
        lastError: undefined,
        hasAudio: Boolean(audioBlobRef.current && audioBlobRef.current.size > 200),
        transcribeSource,
        bankId: bank.bankId,
        bankLabel: bank.info.name,
      }
      if (id && getHistoryById(id)) {
        updateHistory(id, scoredPayload)
      } else {
        const newId = addHistory(scoredPayload)
        draftIdRef.current = newId
        setSavedId(newId)
        if (audioBlobRef.current && audioBlobRef.current.size > 200) {
          try {
            await saveSpeakingAudio(
              newId,
              audioBlobRef.current,
              mimeTypeRef.current || audioBlobRef.current.type,
            )
            markHasAudio(newId, true)
          } catch {
            /* ignore */
          }
        }
      }
      const finalId = draftIdRef.current
      if (finalId) setSavedId(finalId)
      setPhase('done')
      setHint(
        ready.isDemo
          ? '已保存为演示分（不计入总览均分）'
          : '评分与录音已保存到「我的口语」',
      )
    } catch (e) {
      const msg = e instanceof Error ? e.message : '分析失败'
      const id = await ensurePendingDraft({
        answerText: text,
        duration: dur,
        source: transcribeSource,
        lastError: msg,
      })
      setPhase('review')
      setError(msg)
      setHint(
        id
          ? '录音和转写已保存到「我的口语」。无需重录，点「重新评分」即可；离开后再回来也能继续评。'
          : '转写仍在下方，可点「重新评分」重试。',
      )
    }
  }

  /** 把转写成功标记到草稿，方便「我的口语」详情显示来源 */
  const markSource = (source: TranscribeSource) => {
    setTranscribeSource(source)
    const id = draftIdRef.current
    if (id && getHistoryById(id)) {
      updateHistory(id, { transcribeSource: source })
    }
  }

  const runTranscribeThenScore = async (blob: Blob, mimeType: string, dur: number) => {
    const ready = getAiReadyState()
    const cfg = ready.config
    const userPref = cfg.transcribeProvider
    const hasMinimaxKey = Boolean(resolveMinimaxApiKey())
    const inTauri = isTauriApp()
    const hasWhisper = Boolean(resolveWhisperApiKey(cfg))

    /** 是否允许尝试某 provider；auto 时按下面顺序启用 */
    const allow = (p: TranscribeAttempt['provider']) => {
      if (userPref === 'auto') {
        if (p === 'minimax') return hasMinimaxKey
        if (p === 'mac') return inTauri
        if (p === 'whisper') return hasWhisper
        if (p === 'browser') return sttSupported
        return false
      }
      return userPref === p
    }

    setPhase('transcribing')
    setError(null)

    // 1) MiniMax ASR（默认主路径）
    if (allow('minimax')) {
      setHint('正在用 MiniMax ASR 转写录音…')
      const r = await transcribeWithMinimaxAsr(blob, {
        language: cfg.asrLanguage || '',
      })
      if (r.ok) {
        setDraftText(r.text)
        markSource('minimax')
        await ensurePendingDraft({
          answerText: r.text,
          duration: dur,
          source: 'minimax',
        })
        await runAnalyze(r.text, dur)
        return
      }
      // 走不到这里时，会落到下一步兜底；先记失败原因
      if (r.code === 'NO_KEY') {
        // 没配 key 直接告诉用户，并继续往下找兜底
        setError(r.message)
      } else if (r.code === 'SENSITIVE' || r.code === 'RATE_LIMIT' || r.code === 'UPSTREAM') {
        // 不直接弹错，改走兜底，避免阻塞用户
        console.warn('[MiniMax ASR failed]', r.code, r.message)
      } else {
        setError(r.message)
      }
    }

    // 2) macOS 原生 SFSpeech（仅桌面 App）
    if (allow('mac') && inTauri) {
      setHint('MiniMax 转写未走通，改用 macOS 系统转写…')
      try {
        const text = await transcribeWithMacSpeech(blob, mimeType)
        setDraftText(text)
        markSource('mac')
        await ensurePendingDraft({
          answerText: text,
          duration: dur,
          source: 'mac',
        })
        await runAnalyze(text, dur)
        return
      } catch (e) {
        setError(e instanceof Error ? e.message : '系统转写失败')
      }
    }

    // 3) OpenAI Whisper（可选）
    if (allow('whisper') && hasWhisper) {
      const whisperKey = resolveWhisperApiKey(cfg)
      setHint('正在用 Whisper 转写录音…')
      try {
        const text = await transcribeWithWhisper(blob, whisperKey, mimeType)
        setDraftText(text)
        markSource('whisper')
        await ensurePendingDraft({
          answerText: text,
          duration: dur,
          source: 'whisper',
        })
        await runAnalyze(text, dur)
        return
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Whisper 转写失败')
      }
    }

    // 4) 浏览器听写仅作最后兜底（桌面 WKWebView 常因 network 失败）
    if (allow('browser') && sttSupported) {
      setPhase('review')
      setError('自动转写都未走通。请点「系统听写」再说一遍英文，或听回放后手动输入。')
      setHint('也可手打英文后再用 MiniMax 评分。')
      return
    }

    // 兜底：保存当前草稿，提示用户手打
    await ensurePendingDraft({
      answerText: draftText,
      duration: dur,
      source: transcribeSource,
      lastError: error || '自动转写均未走通',
    })
    setPhase('review')
    setError(error || '自动转写失败。请听回放后手打英文，再点「重新评分」。')
    setHint('录音已保存，无需重录。')
  }

  const startDictate = async (autoScore = false) => {
    if (!sttSupported) {
      setError('当前环境不支持系统听写，请直接在框里输入英文。')
      return
    }
    setAutoScoreDictate(autoScore)
    setError(null)
    setHint(
      autoScore
        ? '浏览器听写不稳定。说完点「完成听写并评分」；更推荐用 MiniMax ASR 自动转写。'
        : '系统听写：再说一遍英文，说完点「完成听写」。',
    )
    setPhase('dictating')
    try {
      dictationRef.current = await startDictation((finals, interim) => {
        const t = [finals, interim].filter(Boolean).join(' ').trim()
        if (t) setDraftText(t)
      })
    } catch (e) {
      setAutoScoreDictate(false)
      setPhase('review')
      setError(e instanceof Error ? e.message : '无法开始听写')
    }
  }

  const startRecording = async () => {
    setError(null)
    setHint(null)
    setResult(null)
    setSavedId(null)
    setElapsed(0)
    setDraftText('')
    setLevel(0)
    setHeardVoice(false)
    heardVoiceRef.current = false
    setAutoScoreDictate(false)
    setByteSize(0)
    clearAudio()
    setDurationSec(0)
    setTranscribeSource(null)
    draftIdRef.current = null
    setSavedId(null)
    setResult(null)

    if (sessionRef.current) {
      try {
        sessionRef.current.release()
      } catch {
        /* ignore */
      }
      sessionRef.current = null
    }

    try {
      sessionRef.current = await startSpeakSession(
        (sec) => setElapsed(sec),
        (p) => {
          setLevel(p.level)
          if (p.hasVoice) {
            heardVoiceRef.current = true
            setHeardVoice(true)
          }
        },
      )
      setRecording(true)
      setPhase('recording')
      const ready = getAiReadyState()
      const line =
        ready.config.transcribeProvider === 'mac' && !isTauriApp()
          ? '当前偏好 macOS 转写，但环境不是桌面 App，将自动用 MiniMax ASR。'
          : ready.config.transcribeProvider === 'minimax' && !resolveMinimaxApiKey()
            ? '未配置 MiniMax Key，将回退到 macOS / Whisper。'
            : ready.config.transcribeProvider === 'minimax'
              ? '停录后将用 MiniMax ASR 在线转写，再用 MiniMax M3 打分。'
              : ready.config.transcribeProvider === 'whisper'
                ? '停录后用 Whisper 转写，再用 MiniMax 打分。'
                : isTauriApp()
                  ? '停录后将按 MiniMax ASR → macOS → Whisper 顺序兜底，无需重录。'
                  : '停录后将用 MiniMax ASR 在线转写，再用 MiniMax M3 打分。'
      setHint(line)
    } catch (e) {
      setError(e instanceof Error ? e.message : '无法开始录音')
      setRecording(false)
      setPhase('idle')
    }
  }

  const stopRecording = async () => {
    setRecording(false)
    setHint('正在保存录音…')
    try {
      if (!sessionRef.current) throw new Error('没有进行中的录音')
      const out = await sessionRef.current.stop()
      sessionRef.current = null
      const dur = out.durationSec || Math.max(1, elapsed)
      setDurationSec(dur)
      setByteSize(out.byteSize)
      audioBlobRef.current = out.blob
      mimeTypeRef.current = out.mimeType || out.blob?.type || ''
      if (out.audioUrl) {
        if (audioUrl) URL.revokeObjectURL(audioUrl)
        setAudioUrl(out.audioUrl)
      }

      if (out.byteSize <= 800 || !out.blob) {
        setPhase('review')
        setHint(out.note)
        setError('录音文件几乎为空。请确认系统已授权麦克风，重录时看着音量条说话。')
        return
      }

      if (!heardVoiceRef.current) {
        setHint('音量波动较弱，仍继续…')
      }

      // 先把录音存进「我的口语」待评分，避免打分失败后白录
      await ensurePendingDraft({
        answerText: draftText,
        duration: dur,
        source: transcribeSource,
      })

      const ready = getAiReadyState()
      if (ready.isDemo) {
        const demo =
          'This is a mock speaking answer for demo scoring. I briefly talked about the topic and shared a few examples.'
        setDraftText(demo)
        setHint('Mock 模式：跳过转写，直接演示评分')
        await runAnalyze(demo, dur)
        return
      }

      await runTranscribeThenScore(out.blob, out.mimeType || out.blob.type, dur)
    } catch (e) {
      try {
        sessionRef.current?.release()
      } catch {
        /* ignore */
      }
      sessionRef.current = null
      setPhase('idle')
      setError(e instanceof Error ? e.message : '停止录音失败')
    }
  }

  const stopDictate = async () => {
    setHint('正在结束听写…')
    const shouldAutoScore = autoScoreDictate
    setAutoScoreDictate(false)
    try {
      const text = (await dictationRef.current?.stop()) || ''
      dictationRef.current = null
      const merged = text.trim() || draftText.trim()
      if (text.trim()) setDraftText((prev) => (prev.trim() ? prev : text))
      if (wordCount(merged) < 3) {
        setPhase('review')
        setError('听写没有识别到足够英文。请再说一遍，或听回放后手动输入。')
        setHint('评分仍用 MiniMax；需要英文文字才能打分。')
        return
      }
      setError(null)
      markSource('browser')
      if (shouldAutoScore) {
        setDraftText(merged)
        await runAnalyze(merged, durationSec || Math.max(8, elapsed))
        return
      }
      setPhase('review')
      setHint('可继续改文字，然后点「开始评分」。')
    } catch (e) {
      dictationRef.current = null
      setPhase('review')
      setError(e instanceof Error ? e.message : '听写失败，请手动输入')
    }
  }

  const submitDraft = async () => {
    const text = draftText.trim()
    const dur = durationSec || Math.max(8, elapsed)
    const ready = getAiReadyState()

    if (wordCount(text) < 3) {
      if (audioBlobRef.current) {
        await runTranscribeThenScore(
          audioBlobRef.current,
          mimeTypeRef.current || audioBlobRef.current.type,
          dur,
        )
        return
      }
      setError('还没有英文转写。请听回放后打字，或用桌面 App 重新录音。')
      return
    }

    if (!ready.canScore) {
      setError(ready.blockReason)
      return
    }
    await runAnalyze(text, dur)
  }

  const levelPct = Math.round(Math.min(100, level * 100))
  const aiReady = getAiReadyState()
  const canRetryTranscribe = Boolean(audioBlobRef.current) && wordCount(draftText) < 3
  const hasPendingSave = Boolean(savedId || draftIdRef.current)
  const primaryReviewLabel = canRetryTranscribe
    ? '重新转写并评分'
    : hasPendingSave
      ? '重新评分'
      : aiReady.isDemo
        ? '演示评分'
        : '开始评分'

  const phaseTitle =
    phase === 'transcribing'
      ? '转写中…'
      : phase === 'analyzing'
        ? 'AI 打分中…'
        : phase === 'dictating'
          ? '系统听写中 · 再说一遍英文'
          : recording
            ? `录音中 ${formatSec(elapsed)} · 点击停止`
            : phase === 'review'
              ? '可听写或改文字后评分'
              : phase === 'done'
                ? '评分完成'
                : '点击开始录音'

  const sourceLabel = (() => {
    if (!transcribeSource) return null
    switch (transcribeSource) {
      case 'minimax':
        return 'MiniMax ASR · asr-1.0'
      case 'mac':
        return 'macOS SFSpeech'
      case 'whisper':
        return 'OpenAI Whisper'
      case 'browser':
        return '浏览器听写'
      default:
        return null
    }
  })()

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">口语录音练习</h1>
        <p className="page-subtitle">
          {aiReady.statusLine} · 录音后自动转写并 AI 打分 ·{' '}
          <Link to="/my-speaking" style={{ color: 'var(--accent)' }}>
            我的口语
          </Link>
          {' · '}
          <Link to="/settings" style={{ color: 'var(--accent)' }}>
            设置
          </Link>
        </p>
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginTop: 10,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>题库：</span>
          {SPEAKING_BANKS.map((b) => {
            const active = b.id === bank.bankId
            return (
              <button
                key={b.id}
                type="button"
                className={`btn ${active ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '4px 12px', fontSize: 12 }}
                onClick={() => {
                  bank.setBankId(b.id)
                  setTopicId('')
                  setActiveTab('prompt')
                  setResult(null)
                  setDraftText('')
                  setError(null)
                  setHint(null)
                }}
                title={`共 ${b.total} 题 · P1 ${b.counts.part1} / P2 ${b.counts.part2} / P3 ${b.counts.part3}`}
              >
                {b.name}
                <span style={{ marginLeft: 6, opacity: 0.7 }}>({b.total})</span>
              </button>
            )
          })}
          {bank.info.source && bank.bankId !== 'default' ? (
            <span className="tag tag-accent" style={{ fontSize: 12 }}>
              {bank.info.source}
            </span>
          ) : null}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: 20 }}>
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <label className="field-label">题目</label>
            <select
              className="input"
              value={topicId}
              disabled={busy}
              onChange={(e) => setTopicId(e.target.value)}
            >
              {speakingTopics.map((t) => (
                <option key={t.id} value={t.id}>
                  [Part {t.part}] {t.prompt.slice(0, 60)}...
                </option>
              ))}
            </select>

            {topic && (() => {
              const showExample = Boolean(topic.exampleAnswer || topic.exampleAnswerZh)
              const showPart3 = Boolean(topic.part3Questions?.length)
              const tabs: { id: 'prompt' | 'example' | 'part3'; label: string; visible: boolean }[] = (
                [
                  { id: 'prompt', label: '题目', visible: true },
                  { id: 'example', label: '范例回答', visible: showExample },
                  { id: 'part3', label: 'Part 3 讨论题', visible: showPart3 },
                ] as { id: 'prompt' | 'example' | 'part3'; label: string; visible: boolean }[]
              ).filter((t) => t.visible)
              const safeTab = tabs.find((t) => t.id === activeTab) ? activeTab : 'prompt'
              return (
                <div
                  style={{
                    marginTop: 16,
                    padding: 16,
                    background: 'rgba(0, 122, 255, 0.05)',
                    borderRadius: 10,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <span
                      className={`tag ${
                        topic.part === 1
                          ? 'tag-success'
                          : topic.part === 2
                            ? 'tag-accent'
                            : 'tag-purple'
                      }`}
                    >
                      Part {topic.part}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      建议{' '}
                      {topic.part === 1 ? '15–30 秒' : topic.part === 2 ? '1–2 分钟' : '30–60 秒'}
                    </span>
                    {topic.source ? (
                      <span className="tag" style={{ fontSize: 11, marginLeft: 4 }}>
                        {topic.source}
                      </span>
                    ) : null}
                  </div>

                  {tabs.length > 1 ? (
                    <div
                      style={{
                        display: 'flex',
                        gap: 6,
                        marginBottom: 10,
                        borderBottom: '1px solid rgba(0,0,0,0.06)',
                        paddingBottom: 6,
                      }}
                    >
                      {tabs.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setActiveTab(t.id)}
                          className={`btn ${
                            safeTab === t.id ? 'btn-primary' : 'btn-ghost'
                          }`}
                          style={{ padding: '4px 10px', fontSize: 12 }}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  ) : null}

                  {safeTab === 'prompt' && (
                    <>
                      <div
                        style={{
                          fontSize: 14,
                          lineHeight: 1.6,
                          fontWeight: 500,
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {topic.fullPrompt || topic.prompt}
                      </div>
                      {topic.subQuestions && topic.subQuestions.length > 0 && (
                        <ul
                          style={{
                            paddingLeft: 18,
                            fontSize: 12,
                            color: 'var(--text-secondary)',
                            lineHeight: 1.8,
                            marginTop: 8,
                          }}
                        >
                          {topic.subQuestions.map((q, i) => (
                            <li key={i}>{q}</li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}

                  {safeTab === 'example' && (
                    <div style={{ display: 'grid', gap: 10 }}>
                      {topic.exampleAnswer ? (
                        <details
                          open
                          style={{
                            fontSize: 13,
                            lineHeight: 1.7,
                            whiteSpace: 'pre-wrap',
                            background: 'rgba(255,255,255,0.6)',
                            padding: '10px 12px',
                            borderRadius: 8,
                          }}
                        >
                          <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--accent)' }}>
                            英文范例回答（点击展开）
                          </summary>
                          <div style={{ marginTop: 8 }}>{topic.exampleAnswer}</div>
                        </details>
                      ) : null}
                      {topic.exampleAnswerZh ? (
                        <details
                          style={{
                            fontSize: 13,
                            lineHeight: 1.7,
                            whiteSpace: 'pre-wrap',
                            background: 'rgba(255,255,255,0.6)',
                            padding: '10px 12px',
                            borderRadius: 8,
                          }}
                        >
                          <summary style={{ cursor: 'pointer', fontWeight: 600 }}>
                            中文翻译（点击展开）
                          </summary>
                          <div style={{ marginTop: 8 }}>{topic.exampleAnswerZh}</div>
                        </details>
                      ) : null}
                    </div>
                  )}

                  {safeTab === 'part3' && topic.part3Questions && (
                    <div style={{ display: 'grid', gap: 10 }}>
                      {topic.part3Questions.map((p3, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: 'rgba(255,255,255,0.6)',
                            padding: '10px 12px',
                            borderRadius: 8,
                          }}
                        >
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: 'var(--accent)',
                              marginBottom: 6,
                            }}
                          >
                            Q{idx + 1}. {p3.question}
                          </div>
                          {p3.answer ? (
                            <details style={{ fontSize: 12, lineHeight: 1.6 }}>
                              <summary style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                参考回答（英）
                              </summary>
                              <div style={{ marginTop: 6, whiteSpace: 'pre-wrap' }}>{p3.answer}</div>
                            </details>
                          ) : null}
                          {p3.answerZh ? (
                            <details style={{ fontSize: 12, lineHeight: 1.6, marginTop: 4 }}>
                              <summary style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                参考回答（中）
                              </summary>
                              <div style={{ marginTop: 6, whiteSpace: 'pre-wrap' }}>{p3.answerZh}</div>
                            </details>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })()}
          </div>

          <div className="card" style={{ textAlign: 'center', padding: 36 }}>
            <div
              className={`mic-circle ${recording ? 'recording' : ''}`}
              style={{
                margin: '0 auto 16px',
                cursor:
                  phase === 'analyzing' || phase === 'transcribing' || phase === 'dictating'
                    ? 'not-allowed'
                    : 'pointer',
                opacity: phase === 'analyzing' || phase === 'transcribing' ? 0.6 : 1,
              }}
              onClick={() => {
                if (
                  phase === 'analyzing' ||
                  phase === 'transcribing' ||
                  phase === 'dictating' ||
                  phase === 'review'
                )
                  return
                if (recording) void stopRecording()
                else void startRecording()
              }}
            >
              {recording
                ? '⏹'
                : phase === 'transcribing' || phase === 'analyzing'
                  ? '…'
                  : phase === 'dictating'
                    ? '✍️'
                    : '🎤'}
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{phaseTitle}</div>

            {recording && (
              <div style={{ maxWidth: 280, margin: '12px auto 0', textAlign: 'left' }}>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  音量 {heardVoice ? '· 已检测到说话' : '· 请出声，条要跳动'}
                </div>
                <div
                  style={{
                    height: 10,
                    borderRadius: 999,
                    background: 'rgba(0,0,0,0.08)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${levelPct}%`,
                      height: '100%',
                      background: heardVoice ? 'var(--success, #34c759)' : 'var(--accent)',
                      transition: 'width 0.05s linear',
                    }}
                  />
                </div>
              </div>
            )}

            {(error || hint) && (
              <div
                style={{
                  marginTop: 14,
                  textAlign: 'left',
                  padding: '10px 12px',
                  borderRadius: 8,
                  background: error ? 'rgba(255, 59, 48, 0.08)' : 'rgba(0, 122, 255, 0.06)',
                  color: error ? 'var(--danger)' : 'var(--text-secondary)',
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                {error || hint}
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: 12 }}>
              {phase === 'dictating' ? (
                <button className="btn btn-primary btn-lg" onClick={() => void stopDictate()}>
                  {autoScoreDictate ? '完成听写并评分' : '完成听写'}
                </button>
              ) : phase === 'review' ? (
                <>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => void submitDraft()}
                    disabled={!aiReady.canScore && wordCount(draftText) < 3}
                    title={aiReady.blockReason || undefined}
                  >
                    {primaryReviewLabel}
                  </button>
                  {sttSupported && (
                    <button className="btn btn-secondary btn-lg" onClick={() => void startDictate(false)}>
                      系统听写
                    </button>
                  )}
                  <button
                    className="btn btn-secondary btn-lg"
                    onClick={() => {
                      setPhase('idle')
                      setError(null)
                      setHint(null)
                      clearAudio()
                      setDraftText('')
                      setByteSize(0)
                      setTranscribeSource(null)
                      draftIdRef.current = null
                      setSavedId(null)
                      setResult(null)
                    }}
                  >
                    重新录
                  </button>
                </>
              ) : phase === 'transcribing' || phase === 'analyzing' ? (
                <button className="btn btn-primary btn-lg" disabled>
                  {phase === 'transcribing' ? '转写中…' : '打分中…'}
                </button>
              ) : !recording ? (
                <button className="btn btn-primary btn-lg" onClick={() => void startRecording()}>
                  {phase === 'done' ? '再录一条' : '开始录音'}
                </button>
              ) : (
                <button className="btn btn-primary btn-lg" onClick={() => void stopRecording()}>
                  停止并打分
                </button>
              )}
              <Link to="/my-speaking" className="btn btn-secondary btn-lg">
                我的口语
              </Link>
            </div>

            {savedId && (
              <div className="tip" style={{ marginTop: 16, textAlign: 'left' }}>
                {phase === 'done' ? '✓ 评分已保存 · ' : '✓ 录音已保存（可稍后重试评分）· '}
                <Link to={`/my-speaking/${savedId}`} style={{ color: 'var(--accent)' }}>
                  打开这条记录
                </Link>
              </div>
            )}
          </div>

          {phase === 'review' ||
          phase === 'dictating' ||
          phase === 'transcribing' ||
          phase === 'analyzing' ||
          phase === 'done' ? (
            <div className="card" style={{ marginTop: 12 }}>
              <div
                className="card-title"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span>你的回答（英文，可改）</span>
                {sourceLabel ? (
                  <span
                    className="tag"
                    style={{ fontSize: 11, color: 'var(--text-tertiary)' }}
                    title="本次录音由哪个转写引擎处理"
                  >
                    {sourceLabel}
                  </span>
                ) : null}
              </div>
              {audioUrl ? (
                <audio controls src={audioUrl} style={{ width: '100%', marginBottom: 12 }} />
              ) : (
                <div className="tip" style={{ marginBottom: 12, color: 'var(--danger)' }}>
                  没有可播放的录音文件（{byteSize} 字节）。请重录并确认音量条跳动。
                </div>
              )}
              <textarea
                className="textarea"
                rows={6}
                value={draftText}
                disabled={phase === 'dictating' || phase === 'transcribing' || phase === 'analyzing'}
                onChange={(e) => setDraftText(e.target.value)}
                placeholder={
                  phase === 'transcribing'
                    ? '正在转写录音…'
                    : phase === 'dictating'
                      ? '系统听写文字会出现在这里…'
                      : '听写/转写结果会出现在这里。也可听回放后直接打字，再点评分（MiniMax）。'
                }
                style={{ width: '100%', minHeight: 140, resize: 'vertical' }}
              />
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 8 }}>
                时长约 {formatSec(durationSec || elapsed)} · 词数 {wordCount(draftText)}
                {byteSize > 0 ? ` · 录音 ${Math.round(byteSize / 1024)} KB` : ''}
                {phase === 'review' && !draftText.trim()
                  ? ' · 录音已自动保存；补全文字后可评分'
                  : ''}
              </div>
            </div>
          ) : null}

          <div className="card" style={{ marginTop: 16 }}>
            <Link to="/great-speaking" className="btn btn-ghost" style={{ width: '100%' }}>
              去听优秀口语示范 →
            </Link>
          </div>
        </div>

        {result && (
          <div>
            <SpeakingResultPanels result={result} />
          </div>
        )}
      </div>
    </>
  )
}