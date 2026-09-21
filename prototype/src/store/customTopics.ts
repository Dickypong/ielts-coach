import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WritingTopic } from '../data/writingTopics'
import { writingTopics as builtInWriting } from '../data/writingTopics'
import type { SpeakingTopic } from '../data/speakingTopics'
import { speakingTopics as builtInSpeaking } from '../data/speakingTopics'

type CustomTopicsState = {
  writing: WritingTopic[]
  speaking: SpeakingTopic[]
  addWriting: (topics: WritingTopic[]) => number
  addSpeaking: (topics: SpeakingTopic[]) => number
  removeWriting: (id: string) => void
  removeSpeaking: (id: string) => void
  clearWriting: () => void
  clearSpeaking: () => void
}

export const useCustomTopicsStore = create<CustomTopicsState>()(
  persist(
    (set, get) => ({
      writing: [],
      speaking: [],
      addWriting: (topics) => {
        if (!topics.length) return 0
        const existing = new Set([
          ...builtInWriting.map((t) => t.prompt.trim().toLowerCase()),
          ...get().writing.map((t) => t.prompt.trim().toLowerCase()),
        ])
        const fresh = topics.filter((t) => !existing.has(t.prompt.trim().toLowerCase()))
        set((s) => ({ writing: [...fresh, ...s.writing].slice(0, 200) }))
        return fresh.length
      },
      addSpeaking: (topics) => {
        if (!topics.length) return 0
        const existing = new Set([
          ...builtInSpeaking.map((t) => t.prompt.trim().toLowerCase()),
          ...get().speaking.map((t) => t.prompt.trim().toLowerCase()),
        ])
        const fresh = topics.filter((t) => !existing.has(t.prompt.trim().toLowerCase()))
        set((s) => ({ speaking: [...fresh, ...s.speaking].slice(0, 200) }))
        return fresh.length
      },
      removeWriting: (id) => set((s) => ({ writing: s.writing.filter((t) => t.id !== id) })),
      removeSpeaking: (id) => set((s) => ({ speaking: s.speaking.filter((t) => t.id !== id) })),
      clearWriting: () => set({ writing: [] }),
      clearSpeaking: () => set({ speaking: [] }),
    }),
    { name: 'ielts-coach-custom-topics' },
  ),
)

/** 内置 + 导入，导入题排在前面 */
export function useAllWritingTopics(): WritingTopic[] {
  const custom = useCustomTopicsStore((s) => s.writing)
  return [...custom, ...builtInWriting]
}

export function useAllSpeakingTopics(): SpeakingTopic[] {
  const custom = useCustomTopicsStore((s) => s.speaking)
  return [...custom, ...builtInSpeaking]
}

export function isImportedWriting(t: WritingTopic) {
  return t.id.startsWith('imp-w-') || t.examDate === '导入' || t.tags?.includes('导入')
}

export function isImportedSpeaking(t: SpeakingTopic) {
  return t.id.startsWith('imp-s-') || t.examPeriod === '导入' || t.tags?.includes('导入')
}
