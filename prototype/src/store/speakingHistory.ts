import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SpeakingEvaluation } from '../lib/ai'
import { clearSpeakingAudio, deleteSpeakingAudio } from '../lib/speaking-audio-db'

export type TranscribeSource = 'minimax' | 'mac' | 'whisper' | 'browser'

/** 题库来源 id：默认题库 / 9-12 保留题；老数据不写，落到 'default' */
export type SpeakingBankKey = 'default' | 'predicted-2026-q4' | string

export type SpeakingHistoryItem = {
  id: string
  topicId: string
  topicPrompt: string
  part: 1 | 2 | 3
  overall: number
  duration: number
  /** 用户当时提交评分的英文回答（听写/手输） */
  answerText: string
  /** 已评分时有完整结果；待评分草稿可为空 */
  evaluation: SpeakingEvaluation | null
  provider: string
  /** Mock 演示，不计入均分 */
  isDemo?: boolean
  /** 是否已把录音写入 IndexedDB（详情页可回放） */
  hasAudio?: boolean
  /** 评分尚未成功：录音/转写已保存，可重试打分 */
  pendingScore?: boolean
  /** 最近一次评分失败原因（便于详情页提示） */
  lastError?: string
  /** 转写来源：这次录音是由哪个引擎转的 */
  transcribeSource?: TranscribeSource | null
  /** 题目来自哪个题库（默认/9-12 保留题） */
  bankId?: SpeakingBankKey
  /** 题库的展示名（保存时刻的快照，避免以后题库改了展示名不一致） */
  bankLabel?: string
  createdAt: number
}

export function makePendingEvaluation(
  transcript: string,
  duration: number,
): SpeakingEvaluation {
  return {
    overall: 0,
    bandCriteria: { fluency: 0, lexical: 0, grammar: 0, pronunciation: 0 },
    transcript,
    mistakes: [],
    improvedAnswer: '',
    modelAnswer: '',
    scoringPoints: [],
    feedback: {
      fluency: '',
      pronunciation: '',
      grammar: '',
      content: '',
    },
    duration,
  }
}

type SpeakingHistoryState = {
  items: SpeakingHistoryItem[]
  add: (item: Omit<SpeakingHistoryItem, 'id' | 'createdAt'>) => string
  update: (id: string, patch: Partial<SpeakingHistoryItem>) => void
  remove: (id: string) => void
  clear: () => void
  getById: (id: string) => SpeakingHistoryItem | undefined
  markHasAudio: (id: string, hasAudio: boolean) => void
}

export const useSpeakingHistoryStore = create<SpeakingHistoryState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => {
        const id = `sph-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
        set((state) => ({
          items: [
            {
              ...item,
              answerText: item.answerText || item.evaluation?.transcript || '',
              transcribeSource: item.transcribeSource ?? null,
              bankId: item.bankId ?? 'default',
              bankLabel: item.bankLabel ?? '默认题库',
              id,
              createdAt: Date.now(),
            },
            ...state.items,
          ].slice(0, 100),
        }))
        return id
      },
      update: (id, patch) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, ...patch } : i)),
        })),
      remove: (id) => {
        void deleteSpeakingAudio(id)
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }))
      },
      clear: () => {
        void clearSpeakingAudio()
        set({ items: [] })
      },
      getById: (id) => get().items.find((i) => i.id === id),
      markHasAudio: (id, hasAudio) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, hasAudio } : i)),
        })),
    }),
    { name: 'ielts-coach-speaking-history' },
  ),
)
