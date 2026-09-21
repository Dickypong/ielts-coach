/** 口语题 ↔ 优秀录音：按 Part + 关键词在转写/标题里找最相关示范（非一一对应真题） */

import type { SpeakingTopic } from '../data/speakingTopics'
import { greatSpeakings, type GreatSpeaking } from '../data/greatSpeaking'

const TAG_EN: Record<string, string[]> = {
  家乡: ['hometown', 'home town', 'city', 'village', 'where are you from'],
  城市: ['city', 'town', 'urban', 'live in'],
  工作: ['work', 'job', 'career', 'office', 'colleague'],
  学习: ['study', 'student', 'university', 'school', 'major'],
  爱好: ['hobby', 'hobbies', 'interest', 'free time', 'spare time'],
  住房: ['house', 'apartment', 'flat', 'home', 'room'],
  天气: ['weather', 'season', 'rain', 'sunny', 'climate'],
  饮食: ['food', 'eat', 'cooking', 'meal', 'restaurant', 'drink', 'tea', 'coffee'],
  阅读: ['book', 'read', 'reading', 'novel', 'library'],
  运动: ['sport', 'exercise', 'gym', 'football', 'running', 'swim'],
  旅行: ['travel', 'trip', 'holiday', 'vacation', 'tourist'],
  朋友: ['friend', 'friends', 'friendship'],
  人物: ['person', 'people', 'famous', 'celebrity', 'admire'],
  地点: ['place', 'building', 'park', 'museum', 'visit'],
  环境: ['environment', 'pollution', 'nature', 'tree', 'mountain'],
  媒体: ['media', 'news', 'tv', 'television', 'internet', 'social media'],
  娱乐: ['entertainment', 'film', 'movie', 'music', 'concert'],
  科技: ['technology', 'computer', 'phone', 'internet', 'ai', 'digital'],
  文化: ['culture', 'tradition', 'festival', 'art', 'museum'],
  教育: ['education', 'school', 'teacher', 'learning', 'university'],
  社会: ['society', 'social', 'community', 'government'],
  经历: ['experience', 'remember', 'memorable', 'childhood'],
  交通: ['transport', 'traffic', 'car', 'bus', 'train', 'commute'],
  音乐: ['music', 'song', 'concert', 'instrument'],
  购物: ['shop', 'shopping', 'buy', 'store', 'mall'],
  健康: ['health', 'healthy', 'doctor', 'hospital', 'fitness'],
  家庭: ['family', 'parents', 'children', 'relative'],
  动物: ['animal', 'pet', 'dog', 'cat'],
  照片: ['photo', 'photograph', 'picture', 'camera'],
  衣服: ['clothes', 'clothing', 'fashion', 'wear', 'dress'],
}

const STOP = new Set([
  'about', 'your', 'what', 'when', 'where', 'which', 'would', 'could', 'should',
  'have', 'has', 'does', 'did', 'the', 'and', 'for', 'with', 'that', 'this',
  'from', 'into', 'are', 'was', 'were', 'you', 'me', 'my', 'our', 'their',
  'most', 'much', 'many', 'some', 'any', 'how', 'why', 'who', 'let', 'lets',
  "let's", 'talk', 'describe', 'tell', 'please', 'like', 'think', 'want', 'need',
  'make', 'often', 'usually', 'kinds', 'around', 'use', 'play',
])

function tokenizeEnglish(text: string): string[] {
  return (text.toLowerCase().match(/[a-z][a-z'-]{2,}/g) || []).filter((w) => !STOP.has(w))
}

function topicKeywords(topic: SpeakingTopic): string[] {
  const keys = new Set<string>()
  for (const w of tokenizeEnglish(topic.prompt)) keys.add(w)
  for (const q of topic.subQuestions || []) {
    for (const w of tokenizeEnglish(q)) keys.add(w)
  }
  for (const tag of topic.tags) {
    for (const phrase of TAG_EN[tag] || []) {
      keys.add(phrase.toLowerCase())
      for (const w of tokenizeEnglish(phrase)) keys.add(w)
    }
  }
  // id 里的英文片段：sp-p1-hometown → hometown
  for (const part of topic.id.split('-')) {
    if (part.length > 3 && !['sp', 'p1', 'p2', 'p3', 'imp'].includes(part)) keys.add(part)
  }
  return [...keys]
}

function demoHaystack(g: GreatSpeaking): string {
  // 转写取前段即可，足够关键词匹配
  const tr = (g.transcript || '').slice(0, 3500)
  return `${g.topic} ${g.prompt} ${g.matchNote || ''} ${tr}`.toLowerCase()
}

export type DemoMatch = {
  demo: GreatSpeaking
  score: number
  /** high = 题干/标签命中转写；medium = 有少量命中；low = 仅同 Part */
  tier: 'high' | 'medium' | 'low'
  hits: string[]
}

export function matchDemoForTopic(topic: SpeakingTopic): DemoMatch | null {
  const keys = topicKeywords(topic)
  const candidates = greatSpeakings.filter((g) => {
    if (!g.audioPath) return false
    const covers = g.coversParts?.length ? g.coversParts : [g.part]
    return covers.includes(topic.part)
  })
  if (!candidates.length) return null

  let best: DemoMatch | null = null
  for (const g of candidates) {
    const hay = demoHaystack(g)
    const hits: string[] = []
    let score = 0
    for (const k of keys) {
      if (k.length < 4 && !hay.includes(` ${k} `) && !hay.includes(k)) continue
      if (hay.includes(k)) {
        hits.push(k)
        // 短语/长词加权
        score += k.includes(' ') ? 6 : Math.min(4, Math.floor(k.length / 2))
      }
    }
    // 专属该 Part 的示范略加分
    const covers = g.coversParts?.length ? g.coversParts : [g.part]
    if (covers.length === 1 && covers[0] === topic.part) score += 2
    if (g.part === topic.part) score += 1
    score += g.score * 0.05

    const tier: DemoMatch['tier'] = hits.length >= 3 ? 'high' : hits.length >= 1 ? 'medium' : 'low'
    if (!best || score > best.score) {
      best = { demo: g, score, tier, hits: hits.slice(0, 8) }
    }
  }
  return best
}

export function tierLabel(tier: DemoMatch['tier']): string {
  if (tier === 'high') return '较相关示范'
  if (tier === 'medium') return '部分相关示范'
  return '同 Part 示范'
}
