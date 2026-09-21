import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AIEvaluation } from '../lib/ai'

export type HistoryItem = {
  id: string
  topicId: string
  topicPrompt: string
  task: 1 | 2
  content: string
  wordCount: number
  overall: number
  evaluation: AIEvaluation
  createdAt: number
  provider: string
  /** Mock 演示，不计入均分 */
  isDemo?: boolean
}

type HistoryState = {
  items: HistoryItem[]
  add: (item: Omit<HistoryItem, 'id' | 'createdAt'>) => string
  remove: (id: string) => void
  clear: () => void
  getById: (id: string) => HistoryItem | undefined
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => {
        const id = `hist-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
        set((state) => ({
          items: [
            {
              ...item,
              id,
              createdAt: Date.now(),
            },
            ...state.items,
          ].slice(0, 100),
        }))
        return id
      },
      remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
      getById: (id) => get().items.find((i) => i.id === id),
    }),
    { name: 'ielts-coach-history' },
  ),
)
