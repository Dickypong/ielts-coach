/**
 * 口语题库切换（默认题库 vs 预测题库）。
 * - 用户的题库偏好存到 localStorage，避免每次刷新都重置
 * - 上层用 useSpeakingBankTopics() 拿到当前生效的题列表
 */

import { useEffect, useState } from 'react'
import { speakingTopics as defaultBank } from '../data/speakingTopics'
import { predictedSpeakingTopics, PREDICTED_BANK_INFO } from '../data/speakingPredictedTopics'
import type { SpeakingTopic } from '../data/speakingTopics'
import { useCustomTopicsStore } from './customTopics'

export type SpeakingBankId = 'default' | 'predicted-2026-q4'

export type SpeakingBankInfo = {
  id: SpeakingBankId
  name: string
  source: string
  total: number
  counts: { part1: number; part2: number; part3: number }
}

export const SPEAKING_BANKS: SpeakingBankInfo[] = [
  {
    id: 'default',
    name: '默认题库',
    source: '内置经典题',
    total: defaultBank.length,
    counts: {
      part1: defaultBank.filter((t) => t.part === 1).length,
      part2: defaultBank.filter((t) => t.part === 2).length,
      part3: defaultBank.filter((t) => t.part === 3).length,
    },
  },
  {
    id: 'predicted-2026-q4',
    name: PREDICTED_BANK_INFO.name,
    source: PREDICTED_BANK_INFO.source,
    total: predictedSpeakingTopics.length,
    counts: {
      part1: predictedSpeakingTopics.filter((t) => t.part === 1).length,
      part2: predictedSpeakingTopics.filter((t) => t.part === 2).length,
      part3: predictedSpeakingTopics.filter((t) => t.part === 3).length,
    },
  },
]

const STORAGE_KEY = 'ielts-coach-speaking-bank'

function getAllForBank(bank: SpeakingBankId): SpeakingTopic[] {
  const custom = useCustomTopicsStore.getState().speaking
  if (bank === 'predicted-2026-q4') {
    return [...predictedSpeakingTopics, ...custom]
  }
  return [...custom, ...defaultBank]
}

/** 顶层 hook：返回当前生效的题库 id 和题目列表 */
export function useSpeakingBank() {
  const [bankId, setBankId] = useState<SpeakingBankId>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw === 'predicted-2026-q4' || raw === 'default') return raw
    } catch {
      /* ignore */
    }
    return 'predicted-2026-q4'
  })

  // 跟随用户导入的 custom topics 更新
  const customLength = useCustomTopicsStore((s) => s.speaking.length)
  // 触发重渲染：custom 变化时重算
  void customLength

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, bankId)
    } catch {
      /* ignore */
    }
  }, [bankId])

  const topics = getAllForBank(bankId)
  const info = SPEAKING_BANKS.find((b) => b.id === bankId)!
  return {
    bankId,
    setBankId,
    topics,
    info,
  }
}