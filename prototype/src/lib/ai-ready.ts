import { loadAIConfig, type AIConfig } from './ai-config'
import { isTauriApp } from './native-transcribe'
import { speechRecognitionSupported } from './speak-session'

export type AiReadyState = {
  config: AIConfig
  canScore: boolean
  /** 可走口语完整流程（原生转写 / Whisper / 系统听写兜底） */
  canOneTapSpeaking: boolean
  /** macOS App 内可用原生 SFSpeech 转写录音文件 */
  canNativeTranscribe: boolean
  canWhisperTranscribe: boolean
  canBrowserTranscribe: boolean
  isDemo: boolean
  needsKey: boolean
  statusLine: string
  blockReason: string | null
  oneTapBlockReason: string | null
}

export function resolveWhisperApiKey(config: AIConfig = loadAIConfig()): string {
  const dedicated = config.whisperApiKey.trim()
  if (dedicated) return dedicated
  if (config.provider === 'openai') return config.apiKey.trim()
  return ''
}

export function getAiReadyState(config = loadAIConfig()): AiReadyState {
  const isDemo = config.provider === 'mock'
  const needsKey = !isDemo && !config.apiKey.trim()
  const canScore = isDemo || !needsKey
  const canNativeTranscribe = isTauriApp()
  const canWhisperTranscribe = Boolean(resolveWhisperApiKey(config))
  const canBrowserTranscribe = speechRecognitionSupported()
  const canOneTapSpeaking =
    canScore && (isDemo || canNativeTranscribe || canWhisperTranscribe || canBrowserTranscribe)

  let statusLine = ''
  if (isDemo) {
    statusLine = '当前是 Mock 演示分 · 不计入总览均分'
  } else if (needsKey) {
    statusLine = `${config.provider} · 尚未配置评分 Key`
  } else if (canNativeTranscribe) {
    statusLine = `${config.provider} · macOS 原生转写 · 无需 OpenAI`
  } else if (canWhisperTranscribe) {
    statusLine = `${config.provider} · Whisper 转写`
  } else if (canBrowserTranscribe) {
    statusLine = `${config.provider} · 浏览器听写（桌面常失败，请用 App）`
  } else {
    statusLine = `${config.provider} · 需手打英文转写`
  }

  return {
    config,
    canScore,
    canOneTapSpeaking,
    canNativeTranscribe,
    canWhisperTranscribe,
    canBrowserTranscribe,
    isDemo,
    needsKey,
    statusLine,
    blockReason: needsKey
      ? `请先到「设置」为 ${config.provider} 配置 API Key（可点「从 OpenClaw 导入」）。`
      : null,
    oneTapBlockReason: needsKey
      ? `请先到「设置」为 ${config.provider} 配置 API Key。`
      : !canOneTapSpeaking
        ? '请用 macOS 桌面 App 打开（npm run tauri:dev），即可停录后自动转写打分。'
        : null,
  }
}

export function isScoredForStats(item: {
  provider: string
  isDemo?: boolean
  pendingScore?: boolean
  overall?: number
}): boolean {
  if (item.pendingScore) return false
  if (item.provider === 'mock' || item.isDemo) return false
  if (typeof item.overall === 'number' && item.overall <= 0) return false
  return true
}
