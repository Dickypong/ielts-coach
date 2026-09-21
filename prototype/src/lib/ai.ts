// AI 作文评估结果
export type ScoringReason = {
  score: number
  why: string // 为什么给这个分（对照官方描述）
  evidence: string[] // 引用原文证据
  gapToNext: string // 差 0.5/1 分还缺什么
}

export type AIEvaluation = {
  overall: number
  overallRationale: string // 总分怎么算出来的（四项如何合成）
  bandCriteria: {
    taskResponse: number
    coherence: number
    lexical: number
    grammar: number
  }
  scoringDetails: {
    taskResponse: ScoringReason
    coherence: ScoringReason
    lexical: ScoringReason
    grammar: ScoringReason
  }
  feedback: {
    summary: string
    good: string[]
    improve: string[]
    error: string[]
    vocabUpgrade: { original: string; better: string }[]
    structureTips: string[]
  }
  /** 基于用户原文改写的 8 分及以上示范文 */
  improvedEssay: {
    targetBand: number
    wordCount: number
    content: string
    whatChanged: string[] // 相对原文改了什么
  }
}

// 根据用户输入作文返回模拟评分
export async function evaluateEssay(text: string): Promise<AIEvaluation> {
  // 模拟 API 延迟
  await new Promise((resolve) => setTimeout(resolve, 2200))

  // 简单的"启发式"评分：基于字数、关键词、句式多样性
  const wordCount = text.trim().split(/\s+/).length
  const hasExample = /for example|for instance|such as/i.test(text)
  const hasLinking = /however|moreover|furthermore|therefore|in addition/i.test(text)
  const hasConclusion = /in conclusion|to conclude|in summary/i.test(text)
  const hasComplexSentence = /, (which|who|that|where|when)/.test(text)

  let base = 6.0
  if (wordCount > 250) base += 0.5
  if (hasExample) base += 0.4
  if (hasLinking) base += 0.3
  if (hasConclusion) base += 0.2
  if (hasComplexSentence) base += 0.3

  // 加点随机让结果看起来真实
  base += (Math.random() - 0.5) * 0.4
  const overall = Math.min(8.5, Math.max(5.0, Math.round(base * 2) / 2))

  return {
    overall,
    overallRationale: `总分 ${overall} 由四项平均后按 0.5 分档取整得出。当前四项大致落在 ${overall} 附近：回应题目、衔接、词汇、语法各有短板，尚未达到稳定 8 分所需的充分展开与句式控制。`,
    bandCriteria: {
      taskResponse: Math.min(9, Math.round((overall + 0.2) * 2) / 2),
      coherence: Math.min(9, Math.round((overall + (hasLinking ? 0.4 : -0.2)) * 2) / 2),
      lexical: Math.min(9, Math.round((overall + (hasExample ? 0.3 : 0)) * 2) / 2),
      grammar: Math.min(9, Math.round((overall + (hasComplexSentence ? 0.4 : -0.1)) * 2) / 2),
    },
    scoringDetails: {
      taskResponse: {
        score: Math.min(9, Math.round((overall + 0.2) * 2) / 2),
        why: '回应了题目主要部分，但立场展开或例证深度仍不足以进入更高分数段。',
        evidence: ['开头有立场', hasExample ? '含有例证句' : '例证偏少或笼统'],
        gapToNext: '每个主体段补充 1 个具体、可感知的例子（人物/地点/数据），并明确回扣题目。',
      },
      coherence: {
        score: Math.min(9, Math.round((overall + (hasLinking ? 0.4 : -0.2)) * 2) / 2),
        why: hasLinking
          ? '有基本衔接手段，段落推进可读，但衔接仍偏模板化。'
          : '段落存在，但衔接词不足，整体推进不够顺畅。',
        evidence: [hasLinking ? '出现 however/moreover 等衔接词' : '缺少明显逻辑连接词', '有开头-主体-结尾轮廓'],
        gapToNext: '减少机械套用 firstly/secondly，改用指代与同义推进，让段间关系更自然。',
      },
      lexical: {
        score: Math.min(9, Math.round((overall + (hasExample ? 0.3 : 0)) * 2) / 2),
        why: '词汇能完成表达，但精确度与同义替换不足，易重复基础词。',
        evidence: ['存在可升级的基础词汇（important/good/people think 等）'],
        gapToNext: '用话题相关学术搭配替换高频基础词，并避免同一词在一段内反复出现。',
      },
      grammar: {
        score: Math.min(9, Math.round((overall + (hasComplexSentence ? 0.4 : -0.1)) * 2) / 2),
        why: hasComplexSentence
          ? '有一定复杂句，但句式变化与准确性仍有提升空间。'
          : '以简单句为主，复杂结构偏少。',
        evidence: [hasComplexSentence ? '出现定语从句等复杂结构' : '复杂句不足', `当前约 ${wordCount} 词`],
        gapToNext: '每段至少加入 1–2 个准确无误的复杂句（让步/条件/非限定从句）。',
      },
    },
    feedback: {
      summary:
        overall >= 7
          ? '这篇作文结构清晰，论证较为充分，词汇和语法有一定丰富度。但仍有改进空间：可以进一步加强例证的具体性，并尝试使用更高级的句式结构。'
          : '作文基本回应了题目，但论证不够深入，词汇和句式相对单一。建议增加具体例证，并使用更多过渡词和复杂句式。',
      good: [
        '段落结构清晰，开头-主体-结尾完整',
        hasExample ? '使用了具体例证支撑观点 ✓' : '观点表达较为明确',
        hasLinking ? '恰当使用过渡词，段落衔接自然 ✓' : '段落切分合理',
      ].filter(Boolean),
      improve: [
        wordCount < 250 ? `字数略少（${wordCount}词），建议写 250-300 词` : '部分论证可以更深入',
        '可以增加更多同义替换，避免重复使用相同表达',
        '主体段的例证可以更具象化，比如加入具体国家/数据',
      ],
      error: wordCount < 200 ? ['篇幅不足，可能影响任务完成度评分'] : [],
      vocabUpgrade: [
        { original: 'important', better: 'crucial / vital / essential' },
        { original: 'people think', better: 'it is widely acknowledged / many advocate' },
        { original: 'good / bad', better: 'beneficial / detrimental' },
        { original: 'more and more', better: 'an increasing number of / a growing proportion of' },
      ],
      structureTips: [
        '开头段：背景引入 + 立场表态（3-4 句）',
        '主体段 1：核心论点 + 1-2 个具体例证',
        '主体段 2：让步或反方观点 + 反驳',
        '结尾段：重申立场 + 总结展望（1-2 句即可）',
      ],
    },
    improvedEssay: {
      targetBand: 8.0,
      wordCount: 0,
      content:
        '(Mock 模式) 请切换到 MiniMax / Claude / OpenAI 以生成基于你原文改写的 8 分范文。本地 Mock 仅演示评分结构。',
      whatChanged: [
        '真实模型会在保留你核心观点的前提下升级词汇与句式',
        '补强例证与段间衔接，使论证达到 Band 8 标准',
      ],
    },
  }
}

// Mock 口语评分
export type SpeakingMistake = {
  original: string
  better: string
  reason: string
  type: 'grammar' | 'vocab' | 'fluency' | 'pronunciation' | 'content'
}

export type SpeakingEvaluation = {
  overall: number
  bandCriteria: {
    fluency: number
    lexical: number
    grammar: number
    pronunciation: number
  }
  /** 内部转写，默认不对用户强调展示 */
  transcript: string
  /** 指出哪里说得不对 + 怎么改 */
  mistakes: SpeakingMistake[]
  /** 基于考生原意改写的示范（英文） */
  improvedAnswer?: string
  /** 该题官方风格高分示范（可与考生内容无关，展示更好答法） */
  modelAnswer?: string
  /** 这道题的关键拿分点（中文短句） */
  scoringPoints?: string[]
  feedback: {
    fluency: string
    pronunciation: string
    grammar: string
    content: string
  }
  duration: number
}

export async function evaluateSpeaking(
  transcript = '',
  duration = 90,
): Promise<SpeakingEvaluation> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  const text =
    transcript.trim() ||
    'So, um, the book that has influenced me a lot is, er, "To Kill a Mockingbird" by Harper Lee...'
  const fillers = (text.match(/\b(um|uh|er|you know|like)\b/gi) || []).length

  return {
    overall: 6.5,
    bandCriteria: {
      fluency: fillers > 4 ? 6.0 : 6.5,
      lexical: 7.0,
      grammar: 6.5,
      pronunciation: 7.0,
    },
    transcript: text,
    mistakes: [
      {
        original: 'um / er / you know',
        better: '减少填充词，改用短暂停顿或连接词 (well / actually)',
        reason: '填充词过多会拉低流利度',
        type: 'fluency',
      },
    ],
    improvedAnswer:
      'Well, one book that has really shaped how I see the world is To Kill a Mockingbird. What stayed with me most is the idea of empathy — trying to understand people before judging them. I still think about that when I face disagreements in daily life.',
    modelAnswer:
      'A book that has influenced me deeply is To Kill a Mockingbird by Harper Lee. I first read it in secondary school, and it completely changed the way I think about fairness and courage. The story is set in a small town, but the themes feel universal — especially the importance of standing up for what is right even when it is unpopular. What impressed me most was the character of Atticus Finch, who remains calm and principled under pressure. Since then, I have tried to be more open-minded and less quick to judge others. Overall, it taught me that quiet integrity can be more powerful than loud opinions.',
    scoringPoints: [
      '直接点题：书名 + 作者或来源',
      '说明“影响了我什么”（观点/习惯/价值观）',
      '用 1 个具体情节或人物作例证',
      '收尾联系到现在的自己或日常',
    ],
    feedback: {
      fluency: `（Mock）检测到约 ${fillers} 处填充词；正式模式会由 MiniMax 指出具体问题。`,
      pronunciation: '（Mock）请切换 MiniMax。',
      grammar: '（Mock）请切换 MiniMax。',
      content: '（Mock）请切换 MiniMax。',
    },
    duration,
  }
}
