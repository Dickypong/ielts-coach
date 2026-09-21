export type AIProviderName = 'minimax' | 'claude' | 'openai' | 'mock'

export type TranscribeProvider = 'minimax' | 'mac' | 'whisper' | 'browser' | 'auto'

/** BCP-47 标签（MiniMax ASR 支持）。空串 = 让 ASR 自动识别（中英混） */
export type AsrLanguageCode =
  | ''
  | 'zh'
  | 'yue'
  | 'en'
  | 'ja'
  | 'ko'
  | 'th'
  | 'vi'
  | 'id'
  | 'ms'
  | 'fil'
  | 'ar'
  | 'tr'
  | 'fr'
  | 'de'
  | 'es'
  | 'it'
  | 'pt'
  | 'pl'
  | 'ru'
  | 'uk'

export type AIConfig = {
  provider: AIProviderName
  apiKey: string
  /** OpenAI Whisper 转写专用 Key（与评分 Provider 分离） */
  whisperApiKey: string
  model: string
  temperature: number
  /** 录音后的转写引擎；默认 auto：优先 MiniMax ASR → 本机 SFSpeech → Whisper → 浏览器 */
  transcribeProvider: TranscribeProvider
  /** 传给 MiniMax ASR 的 language header；空串 = 不传（自动识别） */
  asrLanguage: AsrLanguageCode
}

const STORAGE_KEY = 'ielts-coach-ai-config'

export const DEFAULT_AI_CONFIG: AIConfig = {
  provider: 'minimax',
  apiKey: '',
  whisperApiKey: '',
  model: 'MiniMax-M3',
  temperature: 0.3,
  transcribeProvider: 'auto',
  asrLanguage: 'en',
}

export const PROVIDER_MODELS: Record<AIProviderName, string> = {
  minimax: 'MiniMax-M3',
  claude: 'claude-sonnet-4-5',
  openai: 'gpt-4o',
  mock: 'mock-heuristic',
}

export const TRANSCRIBE_PROVIDER_LABEL: Record<TranscribeProvider, string> = {
  minimax: 'MiniMax ASR（在线，推荐）',
  mac: 'macOS SFSpeech（仅桌面 App）',
  whisper: 'OpenAI Whisper',
  browser: '浏览器听写',
  auto: '自动（MiniMax → 本机 → Whisper → 浏览器）',
}

export function loadAIConfig(): AIConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_AI_CONFIG }
    const parsed = JSON.parse(raw) as Partial<AIConfig>
    return {
      ...DEFAULT_AI_CONFIG,
      ...parsed,
      transcribeProvider: (parsed.transcribeProvider ??
        DEFAULT_AI_CONFIG.transcribeProvider) as TranscribeProvider,
      asrLanguage: (parsed.asrLanguage ?? DEFAULT_AI_CONFIG.asrLanguage) as AsrLanguageCode,
    }
  } catch {
    return { ...DEFAULT_AI_CONFIG }
  }
}

export function saveAIConfig(config: AIConfig): void {
  const toStore = { ...config }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore))
}