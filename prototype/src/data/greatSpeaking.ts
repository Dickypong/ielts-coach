// 优秀口语录音：真实公开 YouTube 示范（由 scripts/transform_great_speaking.py 生成）
// 禁止塞入 AI 仿写正文；音频位于 public/audio/

export type GreatSpeaking = {
  id: string
  part: 1 | 2 | 3
  /** 实际覆盖的 Part（整场示范多为 [1,2,3]） */
  coversParts?: Array<1 | 2 | 3>
  /** 与口语题库的对齐说明 */
  matchNote?: string
  topic: string
  prompt: string
  source: string
  sourceName: string
  score: number
  duration: number
  audioPath: string
  isAIGenerated: boolean
  candidate: {
    name: string
    background: string
  }
  transcript: string
  analysis: {
    /** 考官总评：为什么能拿高分 */
    overallComment: string
    /** 高分原因（考官视角） */
    whyHighScore?: string[]
    /** 可迁移做法 */
    examinerTips?: string[]
    /** 从转写抽取的高分证据句 */
    listenExcerpts?: string[]
    listenTips?: string[]
    practiceTips?: string[]
    claimedBand?: number
    analysisSource?: string
    scoringDetails?: {
      fluency: { score: number; why: string; evidence: string[] }
      lexical: { score: number; why: string; evidence: string[] }
      grammar: { score: number; why: string; evidence: string[] }
      pronunciation: { score: number; why: string; evidence: string[] }
    }
    fluencyHighlights: string[]
    lexicalHighlights: string[]
    grammarHighlights: string[]
    pronunciationHighlights: string[]
    contentHighlights: string[]
    sentences: { text: string; translation: string; technique: string }[]
    improvements: string[]
    bandCriteria: {
      fluency: number
      lexical: number
      grammar: number
      pronunciation: number
    }
  }
}

export const greatSpeakings: GreatSpeaking[] =
[
  {
    "id": "yt-adv-shadow-b9",
    "part": 2,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "整场跟读示范（Part1–3 混在一起），适合练节奏；不是题库某一题的专属答案。",
    "topic": "Band 9 full speaking shadow practice",
    "prompt": "Shadow a Band 9 IELTS Speaking test (Part 1–3 style answers).",
    "source": "https://www.youtube.com/watch?v=gdzrv2N40II",
    "sourceName": "IELTS Advantage",
    "score": 9.0,
    "duration": 670,
    "audioPath": "/audio/yt-adv-shadow-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Advantage Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "Let's start off by talking about work and studies. Currently I just graduated, so I'm in between things. But yeah, I am finding work at this point. Ideally in Mumbai. I'm really interested in like, the startup industry, there are some startups that I'm looking to work with as of— in the moment, right now. So that's just what, like, this next chapter holds for me. Good question. I really feel strongly about philanthropy and education specifically, so I imagine myself living in between, like, different places in India. Pursuing this, like, philanthropic educational work, yeah. So many things. You know, it's kind of like, I don't know, I couldn't choose. I think every day was something different. I would watch, like, a really fun TV show and, for example, Suits and be like, “Oh, I'm going to be a lawyer.” And I was convinced. And then I would watch a really fun movie like Devil Wears Prada and... I wanted to be a fashion designer. So it was many different things when I was younger. Now let's talk about reading. So I don't know if it’s necessarily my favorite, but there is this book called The Secret Garden that I remember reading in my class in the fourth grade, and I'm categorizing it as my favorite book because it just meant a lot to me, because there were really nice descriptions about like, the scenery, and that really got me into reading. So I think for the heartwarming purpose, it's definitely my favorite book when I was younger, but it's just the book that started my love for reading in general. I did a lot of reading. Too much reading. I did a lot of reading that was more literary works and it made me realize, “Oh, I don't like it.” I don't like them. I'm also not a fan of novels, but what I am a fan of is more fiction or self-help kind of books, especially that I'm getting older and I want to incorporate habits into my life. There's this book I read called Daisy Jones the Six and it was just a really fun book. It was the book I read recently, and I think people who are into fiction and like, music, would really love that book. It was adapted into a series after, so definitely recommend that one. Now let's talk about drinks Okay, there's so many options. Particularly in my family, we have a weird mix of things, but in my country we usually have, like, masala chai, or we have normal sodas, but we put some masala in it, which is like some spice to kind of give it that extra like kick. So that's really common. But in my family we put like, for example, Coke, we put a little bit of vanilla ice cream. And I think it also has to do with like, different places in India also have this. But in my family it's staple. Yeah. Yes, I do. And it's because when I don’t, I can feel the like, adverse effects immediately. So I make sure I drink water every single day. But it's so hard because like, in the hurry of everything, you just forget. Okay, so I have phases in my life. Like, sometimes coffee just tastes too good, but I'm really caffeine sensitive. I've realized this after having very, like, jittery episodes, so if I have coffee, it's a decaf. But I really love tea for, like, different purposes. So like, camomile before sleeping or green tea to detox. Definitely tea. I think it's also like, culturally, like, we are more accustomed to being like, “Can I get you some tea?” So, definitely tea. But also like, coffee is always available if you want. But it’s a special request. Now let's talk about the weekend. So I think it …",
    "analysis": {
      "overallComment": "这段转写是面向'影子跟读'训练的 Band 9 示范，覆盖 Part 1–3 多个话题，但考生作答的语段本身依然可作为高分模板来点评。考生表现出接近母语者的自然度：话题切入清晰、扩展充分、词汇精准地道、语法结构复杂却几乎不出现错误性停顿。低分考生常见的'逐句卡顿、词汇重复、回答单薄'基本消失；考生通过举例（Devil Wears Prada、Suits）、对比（coffee vs tea、literary works vs self-help）、原因解释（caffeine sensitivity、jittery episodes）以及个性化感受（The Secret Garden 对自己的意义）层层推进。考官听到的印象是'该考生能就任何话题持续、连贯、有内容地表达'，符合 Band 9 'fully operational command' 的描述。",
      "whyHighScore": [
        "扩展策略成熟：6 分考生常以一句话收尾（如 'I like reading'），而本示范每段都包含举例、原因、个人感受三层信息，例如 'There is this book called The Secret Garden that I remember reading in my class in the fourth grade... it just meant a lot to me'，把'为什么这本书对你重要'讲得具体而个性化。",
        "词汇自然升级：6 分考生容易重复 like、good、interesting；本示范使用 'jittery episodes'、'caffeine sensitive'、'adverse effects'、'philanthropic educational work'、'staple'、'special request' 等地道搭配，且完全不需要解释就能理解，是 Band 9 典型的 'paraphrases effectively' 与 'uses idiomatic language' 表现。",
        "语法结构无痕切换：能在同一段中自如交替使用现在完成、过去时、状语从句、介词短语作后置定语、条件句，例如 'if I have coffee, it's a decaf'、'I've realized this after having very, like, jittery episodes'，错误率极低，符合 9 分 'structures are accurate with only rare minor errors'。",
        "衔接与话语标记使用自然：'Let's start off by talking about...'、'Now let's talk about reading'、'But yeah'、'So' 起到考官期望的 discourse marker 作用，但不过度堆砌 'firstly/furthermore/moreover' 这类模板化连接词，节奏更像真实对话。"
      ],
      "examinerTips": [
        "把'一句话回答'升级为'举例 + 原因 + 个人感受'三层结构：先给具体例子（如 The Secret Garden、Suits、Daisy Jones the Six），再解释 why，最后加一句 how it made you feel，可在不增加生词的情况下把 Fluency 拉高 0.5–1 分。",
        "用 'I think it's because...' / 'it's kind of like...' 这样的柔软结构自然过渡：6 分考生常因追求'语法正确'而每句都写得很满、很正式，反而显得不自然；模仿本示范里 'So like, camomile before sleeping or green tea to detox' 这种并列式短表达，可以提升自然度与流利度的双重印象。",
        "准备 5–6 个可复用的'精准词块'（如 adverse effects、jittery episodes、caffeine sensitive、philanthropic work、self-help books、staple），并在多个 Part 2/3 话题里复用，比临时想'高级词'更稳，也更符合 Band 9 的 'idiomatic language skill'。",
        "注意不要为凑时长而堆 'firstly / secondly / moreover'：本示范的衔接词是 'Now let's talk about...'、'But yeah'、'So'，更自然也更不容易出现机械感。"
      ],
      "listenExcerpts": [
        "So I don't know if it's necessarily my favorite, but there is this book called The Secret Garden that I remember reading in my class in the fourth grade, and I'm categorizing it as my favorite because it just meant a lot to me, because there were really nice descriptions about like, the scenery, and that really got me into reading.",
        "Okay, so I have phases in my life. Like, sometimes coffee just tastes too good, but I'm really caffeine sensitive. I've realized this after having very, like, jittery episodes, so if I have coffee, it's a decaf. But I really love tea for, like, different purposes. So like, camomile before sleeping or green tea to detox.",
        "I really feel strongly about philanthropy and education specifically, so I imagine myself living in between, like, different places in India. Pursuing this, like, philanthropic educational work, yeah.",
        "what I am a fan of is more fiction or self-help kind of books, especially that I'm getting older and I want to incorporate habits into my life. There's this book I read called Daisy Jones the Six and it was just a really fun book... It was adapted into a series after, so definitely recommend that one."
      ],
      "listenTips": [],
      "practiceTips": [
        "把'一句话回答'升级为'举例 + 原因 + 个人感受'三层结构：先给具体例子（如 The Secret Garden、Suits、Daisy Jones the Six），再解释 why，最后加一句 how it made you feel，可在不增加生词的情况下把 Fluency 拉高 0.5–1 分。",
        "用 'I think it's because...' / 'it's kind of like...' 这样的柔软结构自然过渡：6 分考生常因追求'语法正确'而每句都写得很满、很正式，反而显得不自然；模仿本示范里 'So like, camomile before sleeping or green tea to detox' 这种并列式短表达，可以提升自然度与流利度的双重印象。",
        "准备 5–6 个可复用的'精准词块'（如 adverse effects、jittery episodes、caffeine sensitive、philanthropic work、self-help books、staple），并在多个 Part 2/3 话题里复用，比临时想'高级词'更稳，也更符合 Band 9 的 'idiomatic language skill'。",
        "注意不要为凑时长而堆 'firstly / secondly / moreover'：本示范的衔接词是 'Now let's talk about...'、'But yeah'、'So'，更自然也更不容易出现机械感。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 9.0,
        "grammar": 9.0,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "转写显示考生几乎不存在'长时间卡顿'或'死循环重复'，自我修正和填充语 (you know / like / I don't know) 出现频率与母语者一致；段落内部信息层层推进 (例子→原因→个人感受)，段与段之间用 'Now let's talk about...' 显式过渡。6.0–6.5 考生常因想词而出现长停顿和重复，扩展长度通常 2–3 句即停止；本示范单段可达 7–10 句且不显累赘，符合 9 分 'sustains fluent speech with only natural hesitation'。",
          "evidence": [
            "So that's just what, like, this next chapter holds for me.",
            "So I don't know if it's necessarily my favorite, but there is this book called The Secret Garden that I remember reading in my class in the fourth grade, and I'm categorizing it as my favorite because it just meant a lot to me.",
            "Okay, so I have phases in my life. Like, sometimes coffee just tastes too good, but I'm really caffeine sensitive. I've realized this after having very, like, jittery episodes, so if I have coffee, it's a decaf."
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "词汇覆盖广度与精确度同时在线：能区分 literary works、novels、fiction、self-help 等近义概念；能用 adverse effects、jittery episodes、caffeine sensitive 这类医学/健康领域精准词；能用 staple、special request 表达文化习惯；并能把 The Secret Garden 的价值用 'for the heartwarming purpose' 概括。6 分考生倾向 'good book / nice / I like' 等泛化词，缺乏 9 分标志的 'effective paraphrasing'。",
          "evidence": [
            "I did a lot of reading that was more literary works and it made me realize, 'Oh, I don't like it.'",
            "what I am a fan of is more fiction or self-help kind of books, especially that I'm getting older and I want to incorporate habits into my life.",
            "I'm really caffeine sensitive. I've realized this after having very, like, jittery episodes.",
            "in my family it's staple. ... But it's a special request."
          ]
        },
        "grammar": {
          "score": 9.0,
          "why": "复杂结构使用频繁但准确率高：含 -ing 分词作宾语 (I imagine myself living in between different places)、条件状从 (if I have coffee, it's a decaf)、现在完成表经验 (I've realized this after having very, like, jittery episodes)、被动 (It was adapted into a series after)、what 引导的名词性从句 (what I am a fan of is more fiction...)。转写中几乎不见影响意义的错误，符合 9 分 'a wide range of structures used accurately'。",
          "evidence": [
            "I really feel strongly about philanthropy and education specifically, so I imagine myself living in between, like, different places in India.",
            "if I have coffee, it's a decaf.",
            "what I am a fan of is more fiction or self-help kind of books.",
            "It was adapted into a series after, so definitely recommend that one."
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "说明：仅凭转写无法判断 segmentals（具体音素是否到位），只能从节奏与话语标记推断。转写显示考生使用 'like'、'you know'、'I don't know'、'kind of' 这类自然弱化/插入语，节奏接近口语化重音；段间用 'Okay'、'Now let's talk about...' 起跳，表明说话者对 chunk 切分有控制（不大段堆词后才停顿）。缺乏对单独音、重音、语调曲线的直接证据，因此发音评分留有 0.5 步进的不确定性。",
          "evidence": [
            "Okay, so I have phases in my life. Like, sometimes coffee just tastes too good, but I'm really caffeine sensitive.",
            "So I don't know if it's necessarily my favorite, but there is this book called The Secret Garden...",
            "Now let's talk about drinks. Okay, there's so many options."
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "So I don't know if it's necessarily my favorite, but there is this book called The Secret Garden that I remember reading in my class in the fourth grade, and I'm categorizing it as my favorite because it just meant a lot to me, because there were really nice descriptions about like, the scenery, and that really got me into reading.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "Okay, so I have phases in my life. Like, sometimes coffee just tastes too good, but I'm really caffeine sensitive. I've realized this after having very, like, jittery episodes, so if I have coffee, it's a decaf. But I really love tea for, like, different purposes. So like, camomile before sleeping or green tea to detox.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I really feel strongly about philanthropy and education specifically, so I imagine myself living in between, like, different places in India. Pursuing this, like, philanthropic educational work, yeah.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "what I am a fan of is more fiction or self-help kind of books, especially that I'm getting older and I want to incorporate habits into my life. There's this book I read called Daisy Jones the Six and it was just a really fun book... It was adapted into a series after, so definitely recommend that one.",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "把'一句话回答'升级为'举例 + 原因 + 个人感受'三层结构：先给具体例子（如 The Secret Garden、Suits、Daisy Jones the Six），再解释 why，最后加一句 how it made you feel，可在不增加生词的情况下把 Fluency 拉高 0.5–1 分。",
        "用 'I think it's because...' / 'it's kind of like...' 这样的柔软结构自然过渡：6 分考生常因追求'语法正确'而每句都写得很满、很正式，反而显得不自然；模仿本示范里 'So like, camomile before sleeping or green tea to detox' 这种并列式短表达，可以提升自然度与流利度的双重印象。",
        "准备 5–6 个可复用的'精准词块'（如 adverse effects、jittery episodes、caffeine sensitive、philanthropic work、self-help books、staple），并在多个 Part 2/3 话题里复用，比临时想'高级词'更稳，也更符合 Band 9 的 'idiomatic language skill'。",
        "注意不要为凑时长而堆 'firstly / secondly / moreover'：本示范的衔接词是 'Now let's talk about...'、'But yeah'、'So'，更自然也更不容易出现机械感。"
      ]
    }
  },
  {
    "id": "yt-ess-p2-b9",
    "part": 2,
    "coversParts": [
      2
    ],
    "matchNote": "偏 Part 2 cue card 示范。题库 Part 2 可对照听结构与展开，题目本身通常不同。",
    "topic": "IELTS Speaking Part 2 Band 9 sample",
    "prompt": "Part 2 cue-card style Band 9 model answer.",
    "source": "https://www.youtube.com/watch?v=09SmkNfwvDc",
    "sourceName": "English Speaking Success",
    "score": 9.0,
    "duration": 842,
    "audioPath": "/audio/yt-ess-p2-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "English Speaking Success Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "what does a band 9 part 2 answer in IELTS speaking look like let's find out hello this is Keith from English speaking success and the website Keith speaking Academy listen if you are preparing for IELTS but you haven't seen my website yet go and check it out keithspeakingacademy.com it's full of awesome resources that will help you build your vocabulary and get you speaking confidently in no time at all today in today's video we're going to be looking at a model answer for IELTS speaking part two on the topic of clothes and a full analysis of all the language in there actually this video comes from my online course IELTS speaking success get a band 7 plus gold it's based on a very special methodology I've created called the speaking success system there are four steps number one try to discover three practice four build this video today shows you the Discover stage number one try is where you try and give an answer number two discover is where I give you a model answer and analyze all the language that can help you build up the language you need step three is the practice where you have more videos to practice all the chunks from the model answer juggling changing them using them so that you're building up your confidence as you use them step four at the end is you build a much better answer so you can find out more about the gold course um stick around to the end of the video and I'll tell you a little bit more about it for now let's get straight stuck in to this model answer for part two question about clothes and the full analysis okay so let's have a look at the part two question describe a person who you think wears unusual clothes I've had my minute to prepare I've got my notes ready let's do this so I'm going to tell you about my history teacher at University um you know he was and still is a bit of an eccentric um especially when it comes to clothes I would say his clothes are unconventional to say the least many students actually think he's just weird to be honest he doesn't seem to care what others think of his tasting clothes I actually think he sees himself as being quite fashionable um so let me try to describe his rather offbeat style to you um for starters he always wears odd color socks now this must be on purpose because I can't see how he could wear mismatching socks every day if it were by accident um next is trousers they always seem to be too short and that's how you notice his socks and more often than not he wears braces rather than a belt maybe it's because he's rather Stout and chubby uh unfortunately it makes him look a bit like a clown finally he tends to spoil to sport flamboyant shirts with complex patterns and bright colors but for me um you know his clothes don't really match I mean the colors don't go well together if I'm honest but he seems very comfortable and at ease in what I would call very quirky attire of Lou okay so there was a model answer for part two let's have a look in detail at the language I was using there okay so first of all I'm going to tell you about that's a great signpost and that's just telling the examiner this is what I'm going to talk about right you want to be really clear don't be too fancy at the start just go direct to it I'm going to tell you about my history teacher you know so you know is a filler a lot of people think you shouldn't use …",
    "analysis": {
      "overallComment": "该视频并非纯粹考生作答，而是 Keith 老师在讲解'发现—练习—构建'方法时插入的一段 Part 2 model answer。即便如此，仅就 model answer 本身而言，文本展现了一位 9 分候选人的典型特征：开场直奔主题、整体结构呈'总—分—总'、语言密度高且自然带口语化填充与自我修正。考生在约两分钟里完成了 cue card 要求的'描述一个人 + 解释为什么觉得他穿衣不寻常'，并自然收束。扣分点仅有极个别用词疑似失准（'tasting clothes'、末尾 'of Lou' 似为断片/口误），整体表现稳定在 8.5–9.0 区间。",
      "whyHighScore": [
        "结构与连贯：使用 'for starters / next is / finally' 三段式路标，并配合 'let me try to describe… to you' 的总起句，把两分钟答案组织成'总印象—三个细节—个人评价'，6.0–6.5 考生常出现'一句接一句无主线、说到哪算哪'的松散叙述，此样本完全规避。",
        "词汇资源：能够在两分钟内反复换说法表达'怪异、时尚、与众不同'，例如 eccentric / unconventional to say the least / offbeat / flamboyant / quirky / a bit like a clown，体现了 paraphrasing 与 collocation 能力；低分考生通常反复使用 'strange / different / nice clothes' 等基础词。",
        "语法广度与准确度：含混合条件（'I can't see how he could wear mismatching socks every day if it were by accident'）、情态推测（'this must be on purpose'）、现在与过去穿插（'he was and still is'），结构复杂却几乎无误；6.0–6.5 考生多用简单句 + 少量并列，从句使用常出现时态/主谓错误。",
        "自然度与发音印象：从转写可见自然填充（um / you know）、自我修正（'spoils → to sport'）和轻度口误（'of Lou'），节奏接近真实口语；这恰是 Band 9 的标志——流利不等于快，而在于 self-correction 不影响沟通，低分考生通常要么卡顿明显，要么为避免错误而过度放慢、显得背诵感强。",
        "（附加）任务回应：明确点出'为什么觉得 unusual'——'many students actually think he's just weird to be honest he doesn't seem to care what others think'，不是只罗列衣服，而是给出人物画像与评价，符合 Part 2 评分标准中 'addresses all parts of the task' 的高分要求。"
      ],
      "examinerTips": [
        "Part 2 开场不要绕圈子，直接 'I'm going to tell you about…' 切入主题，再用 'for starters / next / finally' 把两分钟切成 3 块具体细节，每块配一个清晰例子或感受，结构分稳稳到手。",
        "针对同一个描述对象准备 3–4 个同义表达（strange / eccentric / unconventional / offbeat / quirky），临场轮换使用，让考官在 2 分钟内反复看到'自然且不重复'的用词——这是 Lexical Resource 拉到 8.5+ 的捷径。",
        "适度使用 'um / you know / I mean / if I'm honest' 等真实填充词，配合偶尔自我修正（说完一半换更准确的词），反而比零停顿、零口误更能体现 Band 9 的 naturalness。",
        "务必完成 cue card 全部 bullet points：描述 + 解释为什么觉得 unusual。本样本通过 'many students think he's just weird / he doesn't seem to care / makes him look like a clown' 三句话回应了'为什么'，是高分关键。"
      ],
      "listenExcerpts": [
        "so I'm going to tell you about my history teacher at University um you know he was and still is a bit of an eccentric um especially when it comes to clothes",
        "I would say his clothes are unconventional to say the least many students actually think he's just weird to be honest he doesn't seem to care what others think of his tasting clothes",
        "this must be on purpose because I can't see how he could wear mismatching socks every day if it were by accident",
        "finally he tends to spoil to sport flamboyant shirts with complex patterns and bright colors but for me um you know his clothes don't really match",
        "but he seems very comfortable and at ease in what I would call very quirky attire"
      ],
      "listenTips": [],
      "practiceTips": [
        "Part 2 开场不要绕圈子，直接 'I'm going to tell you about…' 切入主题，再用 'for starters / next / finally' 把两分钟切成 3 块具体细节，每块配一个清晰例子或感受，结构分稳稳到手。",
        "针对同一个描述对象准备 3–4 个同义表达（strange / eccentric / unconventional / offbeat / quirky），临场轮换使用，让考官在 2 分钟内反复看到'自然且不重复'的用词——这是 Lexical Resource 拉到 8.5+ 的捷径。",
        "适度使用 'um / you know / I mean / if I'm honest' 等真实填充词，配合偶尔自我修正（说完一半换更准确的词），反而比零停顿、零口误更能体现 Band 9 的 naturalness。",
        "务必完成 cue card 全部 bullet points：描述 + 解释为什么觉得 unusual。本样本通过 'many students think he's just weird / he doesn't seem to care / makes him look like a clown' 三句话回应了'为什么'，是高分关键。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 9.0,
        "grammar": 8.5,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "叙述几乎无长时间卡顿，使用 'um / you know' 等自然填充词体现真实口语节奏；出现自我修正 ('spoils to sport') 仍能继续推进话题，说明 speaker 不被小错绊住。结构上 'for starters / next is / finally' 形成清晰路标，听感上从开篇到收尾一路顺畅，连贯性极强。",
          "evidence": [
            "so I'm going to tell you about my history teacher at University",
            "um for starters he always wears odd color socks… um next is trousers… finally he tends to spoil to sport flamboyant shirts",
            "I can't see how he could wear mismatching socks every day if it were by accident"
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "词汇量丰富、搭配精准且具'风格化'色彩：'eccentric'、'unconventional to say the least'、'offbeat'、'flamboyant'、'quirky attire'、'at ease'、'complex patterns'。同一概念（奇特）用多种方式表达，避免重复——这是 9 分的核心证据。低分考生通常一个形容词用到底，或只能用 'very strange clothes' 这类通用表达。",
          "evidence": [
            "a bit of an eccentric",
            "his clothes are unconventional to say the least",
            "his rather offbeat style",
            "flamboyant shirts with complex patterns and bright colors"
          ]
        },
        "grammar": {
          "score": 8.5,
          "why": "结构多样：含条件句 (if it were by accident)、让步/原因从句 (because…)、并列复合句 (the colors don't go well together)，以及情态推测 (must be on purpose)。'he was and still is' 的时态切换尤为出彩。扣 0.5 分是因为 'tasting clothes'（疑为 'taste in clothes' 之误）和末尾 'of Lou'（疑似 'or something' 断片）属可察觉口误，但因未影响理解、且伴随自我修正，未跌破 9 分线。",
          "evidence": [
            "he was and still is a bit of an eccentric",
            "this must be on purpose because I can't see how he could wear mismatching socks every day if it were by accident",
            "he seems very comfortable and at ease in what I would call very quirky attire"
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "仅根据转写可推断：填充词与停顿位置（'um for starters'、'you know'）符合英语自然韵律；自我修正 'spoils to sport' 提示说话者正在实时组装语言而非背诵，节奏感良好。'tasting clothes' 若为发音失准（'taste in' → 'tasting'）属可忽略的连读失误；'of Lou' 末尾似未收口，说明结尾稍显松散。整体听感稳定，但因仅依赖字幕、无法核实重音与语调，评分保留至 8.5，存在 ±0.5 的不确定性。",
          "evidence": [
            "um you know he was and still is a bit of an eccentric",
            "finally he tends to spoil to sport flamboyant shirts with complex patterns and bright colors",
            "but for me um you know his clothes don't really match"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "so I'm going to tell you about my history teacher at University um you know he was and still is a bit of an eccentric um especially when it comes to clothes",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I would say his clothes are unconventional to say the least many students actually think he's just weird to be honest he doesn't seem to care what others think of his tasting clothes",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "this must be on purpose because I can't see how he could wear mismatching socks every day if it were by accident",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "finally he tends to spoil to sport flamboyant shirts with complex patterns and bright colors but for me um you know his clothes don't really match",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "but he seems very comfortable and at ease in what I would call very quirky attire",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "Part 2 开场不要绕圈子，直接 'I'm going to tell you about…' 切入主题，再用 'for starters / next / finally' 把两分钟切成 3 块具体细节，每块配一个清晰例子或感受，结构分稳稳到手。",
        "针对同一个描述对象准备 3–4 个同义表达（strange / eccentric / unconventional / offbeat / quirky），临场轮换使用，让考官在 2 分钟内反复看到'自然且不重复'的用词——这是 Lexical Resource 拉到 8.5+ 的捷径。",
        "适度使用 'um / you know / I mean / if I'm honest' 等真实填充词，配合偶尔自我修正（说完一半换更准确的词），反而比零停顿、零口误更能体现 Band 9 的 naturalness。",
        "务必完成 cue card 全部 bullet points：描述 + 解释为什么觉得 unusual。本样本通过 'many students think he's just weird / he doesn't seem to care / makes him look like a clown' 三句话回应了'为什么'，是高分关键。"
      ]
    }
  },
  {
    "id": "yt-adv-what-b9",
    "part": 1,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "完整 Band 9 模拟考示范。按 Part 筛选可练对应段落，不与题库逐题对应。",
    "topic": "What a Band 9 speaking test sounds like",
    "prompt": "Full Band 9 speaking demonstration with natural answers.",
    "source": "https://www.youtube.com/watch?v=nJJyilEPwpk",
    "sourceName": "IELTS Advantage",
    "score": 9.0,
    "duration": 1176,
    "audioPath": "/audio/yt-adv-what-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Advantage Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "we're going to start off by talking about art and photography do you like art H that's interesting um depends on what I like Cinema for instance movies music but I don't know too much about um paintings or Modern Art I'm not too familiar with so it depends on what kind of art do you like to take photographs yes I wouldn't say the photographs are good but I do enjoy taking pictures yeah do you prefer to take photos of yourself or other things of other things it's kind of hard to take pictures of yourself unless it's a selfie and that's limited so pictures of other things mostly now let's talk about animals do you like animals I love animals uh land animals friendly so to speak animals not insects and not anything from the ocean what is your favorite animal um probably a dog dogs for obvious reasons you can keep them as pets in terms of like non-domesticated animals probably Jaguars do you have any animals in your home as pets yes I have two dogs they're both from the shelter the animal shelter they rescues um yeah I've always had pets our family really likes keeping animals right ground now let's talk about bags what type of bags do you like I prefer purses that are a little bit on the larger side just cuz I like to put every thing of my life in my purse um so it ends up weighing maybe 20 kilos yeah larger bags probably structured larger bags how often do you carry a bag when you go out every day I think that's the case for most women I think they carry a bag every even if you go down to the grocery or the supermarket you take your bag with you usually right what sort of bags do women like to buy it depends um it depends on your outfit it depends on where you're going um for the day if you're going to the office you probably want something bigger that can fit your laptop your phone paperwork um everything that you might need during the day um if it's nighttime you'd want something smaller like a clutch something more Sleek elegant um so it depends if you're traveling you'd want a much bigger bag that's able to fit mhm not just you but all of your family's stuff as well so everything women like all kinds of bags that's why we have so many of them now let's talk about birthday mhm what did you usually do on your birthday when you were a child so when I was a kid when I was a child um in school we had a uniform everybody wore a uniform to school so when it was your birthday it was the one day of the year that you were allowed to wear whatever you wanted so it was a big deal I mean at least I would pick out my outfit like two months in advance it would be like a little dress like a princessy frock matching shoes matching accessories for your hair and then you would take some kind of chocolate or candy to school and then you could take like a period off and go and give the candy out to other teachers and other kids in the school and we looked forward to it every year it was the highlight to get to not have to wear the uniform to wear whatever you wanted and to basically be able to skip class and go out and hand out chocolates cuz it's your birthday how do you normally celebrate your birthday now H very differently everyone's allowed to wear whatever they want now so it's kind of not doesn't have the same charm um it depends I like to do a …",
    "analysis": {
      "overallComment": "本段为IELTS Advantage公开的Band 9模拟示范，考生在art/photography、animals、bags、birthday四个话题中均维持极高的口语产出水准。核心原因是：每一题她都给出至少两层延展（分类+举例/对比/条件分支），且拒绝模板化答案。词汇上精准使用non-domesticated、structured、sleek、charm、highlight等高阶词，语法上自然混用条件句、关系从句与并列结构，发音层面（仅凭转写推断）句中停顿与重音模式贴近母语者。注意：视频中考生确有自然犹豫（um, H）与自我修正痕迹（\"it's kind of not doesn't have the same charm\"），这在9分评价体系里是natural delivery的加分项，而非扣分项。",
      "whyHighScore": [
        "答案长度与延展自然：6.0-6.5考生对\"do you prefer to take photos of yourself or other things\"通常只答\"other things, because they're more interesting\"一句话；示范则给出\"of other things it's kind of hard to take pictures of yourself unless it's a selfie and that's limited so pictures of other things mostly\"，先做选择、再给原因、再给限制条件，三层信息一次性输出。",
        "词汇精准且搭配地道：能用non-domesticated替代wild、structured描述包型、sleek elegant修饰晚装包、charm表达仪式感消退，避免6分考生常见的笼统用词（good, nice, big, small, interesting）。",
        "语法广度与准确度兼顾：条件句（if you're going to the office...）、关系从句（the one day of the year that you were allowed to wear whatever you wanted）、并列与列举（your laptop your phone paperwork）自然穿插，几乎没有影响理解的错误。",
        "真实互动感而非背诵：使用I think、depends、I mean等话语标记，对话题表达真实态度（I love animals、everyone's allowed to wear whatever you want now），避免6分考生\"中立套话\"的尴尬。"
      ],
      "examinerTips": [
        "练习\"分项延展\"：每个Part 1简单问题至少输出观点+原因+对比/举例/条件分支三层信息，而不是只回答yes/no+1句理由；示范中\"do you prefer to take photos of yourself or other things\"的回答是直接范本。",
        "刻意训练精确分类与paraphrase：示范中\"land animals friendly so to speak animals not insects and not anything from the ocean\"展示高分考生的典型做法——用具体类别而非笼统表达；备考时积累wild→non-domesticated、interesting→fascinating/intriguing等升级替换。"
      ],
      "listenExcerpts": [
        "so when I was a kid when I was a child um in school we had a uniform everybody wore a uniform to school so when it was your birthday it was the one day of the year that you were allowed to wear whatever you wanted so it was a big deal I mean at least I would pick out my outfit like two months in advance",
        "it depends um it depends on your outfit it depends on where you're going um for the day if you're going to the office you probably want something bigger that can fit your laptop your phone paperwork um everything that you might need during the day um if it's nighttime you'd want something smaller like a clutch something more Sleek elegant",
        "it's kind of hard to take pictures of yourself unless it's a selfie and that's limited so pictures of other things mostly",
        "land animals friendly so to speak animals not insects and not anything from the ocean"
      ],
      "listenTips": [],
      "practiceTips": [
        "练习\"分项延展\"：每个Part 1简单问题至少输出观点+原因+对比/举例/条件分支三层信息，而不是只回答yes/no+1句理由；示范中\"do you prefer to take photos of yourself or other things\"的回答是直接范本。",
        "刻意训练精确分类与paraphrase：示范中\"land animals friendly so to speak animals not insects and not anything from the ocean\"展示高分考生的典型做法——用具体类别而非笼统表达；备考时积累wild→non-domesticated、interesting→fascinating/intriguing等升级替换。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 9.0,
        "grammar": 9.0,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "长答案中犹豫标记(um, H, uh)出现频率自然，分布在思考起点而非破坏信息流；自我修正(\"it's kind of not doesn't have the same charm\")体现实时产出监控；话语标记(depends on, I think, I mean, so)将松散信息组织成清晰逻辑链。",
          "evidence": [
            "it depends um it depends on your outfit it depends on where you're going um for the day if you're going to the office you probably want something bigger that can fit your laptop your phone paperwork um everything that you might need during the day um if it's nighttime you'd want something smaller like a clutch something more Sleek elegant",
            "so when I was a kid when I was a child um in school we had a uniform everybody wore a uniform to school so when it was your birthday it was the one day of the year that you were allowed to wear whatever you wanted so it was a big deal I mean at least I would pick out my outfit like two months in advance"
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "词汇覆盖广且搭配准确；能用更高一级的paraphrase（non-domesticated代替wild、highlight代替best part、charm代替feeling）；少见词自然嵌入语境而非堆砌；口语化短语(kinda, every thing of my life)与书面化词(structured, sleek)自如切换。",
          "evidence": [
            "land animals friendly so to speak animals not insects and not anything from the ocean",
            "non-domesticated animals probably Jaguars",
            "purses that are a little bit on the larger side just cuz I like to put every thing of my life in my purse um so it ends up weighing maybe 20 kilos",
            "a clutch something more Sleek elegant"
          ]
        },
        "grammar": {
          "score": 9.0,
          "why": "句式灵活：条件状语从句、限制性/非限制性关系从句、并列与列举、不定式目的状语、被动语态(be allowed to)均自然出现；错误率极低且多为风格化口语形式(cuz, every thing)，不影响理解；自我修正后的语法重组显示高水平产出监控。",
          "evidence": [
            "it's kind of hard to take pictures of yourself unless it's a selfie and that's limited so pictures of other things mostly",
            "if you're going to the office you probably want something bigger that can fit your laptop your phone paperwork",
            "it was the one day of the year that you were allowed to wear whatever you wanted so it was a big deal",
            "if you're traveling you'd want a much bigger bag that's able to fit mhm not just you but all of your family's stuff as well"
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "仅凭转写无法直接评估音段层面，但可推断：(1)自然犹豫标记(um, H)与呼吸点的分布显示舒适的语速控制；(2)自我修正痕迹(it was the highlight to get to not have to wear the uniform to wear whatever you wanted and to basically be able to skip class)说明考生实时监听自己的产出，与9分所需的发音清晰度、节奏自然性一致；(3)连读与重音位置(如every thing of my life)符合母语节奏。存在一定不确定性，无法确认个别音是否准确。",
          "evidence": [
            "every thing of my life in my purse um so it ends up weighing maybe 20 kilos",
            "it was the highlight to get to not have to wear the uniform to wear whatever you wanted and to basically be able to skip class and go out and hand out chocolates",
            "very differently everyone's allowed to wear whatever they want now so it's kind of not doesn't have the same charm"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "so when I was a kid when I was a child um in school we had a uniform everybody wore a uniform to school so when it was your birthday it was the one day of the year that you were allowed to wear whatever you wanted so it was a big deal I mean at least I would pick out my outfit like two months in advance",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "it depends um it depends on your outfit it depends on where you're going um for the day if you're going to the office you probably want something bigger that can fit your laptop your phone paperwork um everything that you might need during the day um if it's nighttime you'd want something smaller like a clutch something more Sleek elegant",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "it's kind of hard to take pictures of yourself unless it's a selfie and that's limited so pictures of other things mostly",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "land animals friendly so to speak animals not insects and not anything from the ocean",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "练习\"分项延展\"：每个Part 1简单问题至少输出观点+原因+对比/举例/条件分支三层信息，而不是只回答yes/no+1句理由；示范中\"do you prefer to take photos of yourself or other things\"的回答是直接范本。",
        "刻意训练精确分类与paraphrase：示范中\"land animals friendly so to speak animals not insects and not anything from the ocean\"展示高分考生的典型做法——用具体类别而非笼统表达；备考时积累wild→non-domesticated、interesting→fascinating/intriguing等升级替换。"
      ]
    }
  },
  {
    "id": "yt-adv-perfect-b9",
    "part": 1,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "完整模拟考。适合整场跟读；题库题目请另开「口语题库」练习。",
    "topic": "Perfect Band 9 speaking test",
    "prompt": "Complete Band 9 speaking test sample.",
    "source": "https://www.youtube.com/watch?v=k4715CJ0Ii8",
    "sourceName": "IELTS Advantage",
    "score": 9.0,
    "duration": 1044,
    "audioPath": "/audio/yt-adv-perfect-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Advantage Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "let's talk about music how often do you listen to music I think I listen to music mostly when I'm driving I think it puts me in such a good mood when I'm like out there on a drive and I play my favorite music I'm usually into afro music a lot hip-hop and afro and R B so I prefer listening to music when I'm driving or sometimes when I'm working out I'm at the gym something like that is music an important subject in schools in your country in schools in my country it is because you know um I'm from India so in India music and dance and um expressing our emotions is usually through music and uh dancing so in every school they teach classical music or they have a subject where there is something about music usually so I think it is important do you ever go to live concerts oh I've been to three concerts and three of them are my favorite artists and it was actually on my um wish list and I made it happen and uh it was one of the best experiences and uh in live concerts it's a lot different than you would imagine um just have to keep your energy uh straight and it's it's like um it's like you can't believe it's happening now let's talk about magazines and newspapers do you prefer to read magazines or newspapers definitely magazines um mostly on the topics of fashion or Interior Design This is what I really like because I like to see creative sides all from all over the world I like to see what people are talking about what's new what's trending and um I like to learn like I like to have knowledge of things of like what is this called what is that called CU usually when you see pictures you don't usually know what it's called so when you read a magazine know where you get the knowledge that's that's where you get to know oh this fabric is called this or this uh decor a is called that so I think it's very good on information do you think you can learn as much from a magazine as a book definitely not cuz magazine is like a shorter version of what's in a book so I definitely prefer books over magazines do you think that you will continue to read paper based magazines in the future I think I'm very old-fashioned like that I need to have a physical book in my hand and that's how I think it produces serotonin in my brain otherwise no digital it's very different it's I I like uh physically reading a magazine or a book now let's talk about outdoor activities do you like being outdoors I love being outdoors um I usually spend my time planning an activity or just being out my friends even if I'm not doing anything I must stay Outdoors I'm not a very like home based person like I can't stay home much I have to keep moving all the time which outdoor sports do you enjoy doing I like uh um going out with my friends and playing football or or some kind of uh activity like swimming um going to the beach this is this is something I really really enjoy which outdoor activities are most popular in your country definitely it's like the game of uh India everybody loves Cricket when you go out of your house you're always going to see like some kids playing uh or or also batminton actually uh people enjoy that a lot as well I'd like to describe my favorite actor and actress um so my favorite actor will be Benedict Cumberbatch and um my favorite actress is Angelina Julie and I like their movies so much …",
    "analysis": {
      "overallComment": "作为考官，我必须诚实说明：这份转写虽然在内容丰富度和个性化上有可取之处，但距官方 Band 9 描述语（fluency with only rare repetition/self-correction; full flexibility and precision in vocabulary; wide range of structures with full flexibility and accuracy）仍有明显差距。转写中 um、uh、like、you know 等填充词频繁出现，自我修正明显，词汇反复使用 very、really、good、like 等基础词，部分句法存在破句与重复。整体更接近 Band 6.5–7.0 的特征，而非 9.0。下文将基于可观察证据逐项分析其优势与失分点，避免被视频标题误导。",
      "whyHighScore": [
        "能主动延展答案并提供个人化细节（context + example + opinion），而非短答；这是冲 7+ 的关键，与 6.0–6.5 考生仅一句即停形成对比。",
        "使用了个别idiomatic / semi-idiomatic 表达（'produces serotonin in my brain'、'old-fashioned'、'wish list'、'made it happen'），显示出词汇灵活性的苗头，但仍不足以支撑 9 分。",
        "句式有一定变化，尝试使用复合句与从句（'which outdoor activities are most popular'、'because I like to see creative sides'），但复杂结构少且伴随破句，限制了语法得分上限。",
        "面对 Part 1 较平的问题仍能自然展开，发音节奏在转写中显示自然语流，整体可理解度高，但与真正的 Band 9 自然度相比仍偏口语化。",
        "对比低分考生：本段没有出现长时间卡顿、单字回答或离题，整体维持了持续表达；这是其能进入 7 段而非 5.5–6 段的原因。"
      ],
      "examinerTips": [
        "可保留：每个 Part 1 问题都用 3–4 句以上延展，并加入个人原因或例子（'I'm from India so …'），这是稳定 7+ 的有效策略。",
        "需改进：录音前刻意训练 0.5–1 秒 silent pause 替代 'um/uh/like'，并准备 2–3 个 paraphrase 替换 very/really/good，使 lexical resource 向 8 分靠近。",
        "可保留：适当使用 idiomatic 表达（'old-fashioned'、'wish list'、'made it happen'）提升词汇分数，但需确保用法精准；目前 'keep your energy straight' 表达模糊，建议替换为 'keep my energy up' 之类。",
        "需改进：Part 1 答案结构可升级为 Opinion → Reason → Example → Mini-conclusion，句式更多样（如 not only … but also / the thing is … / what I find … is …），这能直接拉动 grammar 与 coherence 双项。"
      ],
      "listenExcerpts": [
        "it puts me in such a good mood when I'm like out there on a drive and I play my favorite music",
        "I've been to three concerts and three of them are my favorite artists and it was actually on my wish list and I made it happen",
        "I like to have knowledge of things of like what is this called what is that called CU usually when you see pictures you don't usually know what it's called",
        "I think I'm very old-fashioned like that I need to have a physical book in my hand and that's how I think it produces serotonin in my brain"
      ],
      "listenTips": [],
      "practiceTips": [
        "可保留：每个 Part 1 问题都用 3–4 句以上延展，并加入个人原因或例子（'I'm from India so …'），这是稳定 7+ 的有效策略。",
        "需改进：录音前刻意训练 0.5–1 秒 silent pause 替代 'um/uh/like'，并准备 2–3 个 paraphrase 替换 very/really/good，使 lexical resource 向 8 分靠近。",
        "可保留：适当使用 idiomatic 表达（'old-fashioned'、'wish list'、'made it happen'）提升词汇分数，但需确保用法精准；目前 'keep your energy straight' 表达模糊，建议替换为 'keep my energy up' 之类。",
        "需改进：Part 1 答案结构可升级为 Opinion → Reason → Example → Mini-conclusion，句式更多样（如 not only … but also / the thing is … / what I find … is …），这能直接拉动 grammar 与 coherence 双项。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 7.0,
        "lexical": 7.0,
        "grammar": 6.5,
        "pronunciation": 7.0
      },
      "scoringDetails": {
        "fluency": {
          "score": 7.0,
          "why": "中段存在较多 self-correction（'I usually into afro music' 后自我改口）与填充词（um/uh/like 出现至少 8 次以上），按官方描述语这是 Band 6–7 的特征，达不到 9 分 'only rare repetition' 的标准。但内容延展充分，能围绕每个问题给出多句回答，维持了合理的 speech rate。",
          "evidence": [
            "I'm usually into afro music a lot hip-hop and afro and R B so I prefer listening to music when I'm driving or sometimes when I'm working out I'm at the gym something like that",
            "it's it's like um it's like you can't believe it's happening"
          ]
        },
        "lexical": {
          "score": 7.0,
          "why": "出现一些 topic-relevant 词汇（afro music, hip-hop, R&B, classical music, interior design, fabric, decor, serotonin, old-fashioned）与搭配（'puts me in such a good mood'、'wish list'、'made it happen'），但 very/really/good/like 等基础词高频重复，'something like that'、'something about music' 多次出现，显示 paraphrase 与 word choice 的灵活度仍不足，未达 9 分 'full flexibility and precision'。",
          "evidence": [
            "it puts me in such a good mood when I'm like out there on a drive and I play my favorite music",
            "I think I'm very old-fashioned like that I need to have a physical book in my hand and that's how I think it produces serotonin in my brain"
          ]
        },
        "grammar": {
          "score": 6.5,
          "why": "能产出复合句（because 原因状语、which 关系从句），但破句、重复与口语化结构明显（'This is this is something I really really enjoy'、'CU usually when you see pictures you don't usually know what it's called'），介词与第三人称单数亦有省略，无法支撑 7.5+。对比 6.0 考生的优势在于会主动构造复杂句，但准确度限制了得分。",
          "evidence": [
            "This is this is something I really really enjoy",
            "CU usually when you see pictures you don't usually know what it's called so when you read a magazine know where you get the knowledge that's that's where you get to know"
          ]
        },
        "pronunciation": {
          "score": 7.0,
          "why": "转写层面无法判断音段准确度，但节奏与停顿暗示自然语流、轻重音合理，重读词基本到位；自我修正与重复可能反映偶尔的 planning hesitation。综合可推测清晰可懂、语流自然，但未观察到 Band 9 描述中 'uses a wide range of phonological features' 的明显证据（如同化、弱读、语调多样）。本项带有不确定性。",
          "evidence": [
            "I love being outdoors um I usually spend my time planning an activity or just being out my friends even if I'm not doing anything I must stay Outdoors",
            "it's a lot different than you would imagine um just have to keep your energy uh straight"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "it puts me in such a good mood when I'm like out there on a drive and I play my favorite music",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I've been to three concerts and three of them are my favorite artists and it was actually on my wish list and I made it happen",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I like to have knowledge of things of like what is this called what is that called CU usually when you see pictures you don't usually know what it's called",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I think I'm very old-fashioned like that I need to have a physical book in my hand and that's how I think it produces serotonin in my brain",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "可保留：每个 Part 1 问题都用 3–4 句以上延展，并加入个人原因或例子（'I'm from India so …'），这是稳定 7+ 的有效策略。",
        "需改进：录音前刻意训练 0.5–1 秒 silent pause 替代 'um/uh/like'，并准备 2–3 个 paraphrase 替换 very/really/good，使 lexical resource 向 8 分靠近。",
        "可保留：适当使用 idiomatic 表达（'old-fashioned'、'wish list'、'made it happen'）提升词汇分数，但需确保用法精准；目前 'keep your energy straight' 表达模糊，建议替换为 'keep my energy up' 之类。",
        "需改进：Part 1 答案结构可升级为 Opinion → Reason → Example → Mini-conclusion，句式更多样（如 not only … but also / the thing is … / what I find … is …），这能直接拉动 grammar 与 coherence 双项。"
      ]
    }
  },
  {
    "id": "yt-adv-excellent-b9",
    "part": 2,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "完整高分示范。内容话题与题库可能重合主题，但不是同一套题。",
    "topic": "Excellent Band 9.0 speaking test",
    "prompt": "Excellent Band 9 speaking performance sample.",
    "source": "https://www.youtube.com/watch?v=ybNEwnnIxWw",
    "sourceName": "IELTS Advantage",
    "score": 9.0,
    "duration": 955,
    "audioPath": "/audio/yt-adv-excellent-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Advantage Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "let's start off with asking you do you work or do you study I work actually um so I co-founded the startup it's called secure my scholarship it's an ettech platform that connects students with scholarships at universities around the world so I I work full-time longer than full-time of you may say what do you love about your job I love the impact that we create man uh so we give you know students that come from hardworking middleclass families or workingclass families a chance at going to the University of their dreams and personally I love that about what we do did you always want to do that job this specifically no but have I always wanted to work in something that would allow me to create an impact yes everything I've ever done in my life has been around companies with impact or with social causes and somebody once asked me if I wasn't with secure my scholarship what would you do and I said I'd work at a nonprofit is there anything that you dislike about your job me personally no but if you ask my fiance she will tell you that I my job takes up a lot of my time and I think she hates that about my job would you like to do any other job in the future I got my hands for with secure my scholarship right now but in the future who knows you know I mean uh I love solving problems and helping make people's lives better um and the world has a lot of issues so you know who knows now let's talk about mobile phones how often do you use your mobile phone oh I use my mobile phone every day the company basically runs off my MobileOne phone what are some of your favorite apps uh I use LinkedIn a lot um I use a productivity tool called Asana it allows me to like track my tasks and manage my day I use slack a lot uh internal team communication WhatsApp obviously I mean everybody uses WhatsApp uh and yeah couple apps not that many I'm not one of those guys with 1,500 apps on their phone I have about eight or nine apps that I use do you think that you use your phone too much Times Yes uh you know it's funny that you asked that uh before secure my scholarship uh myself and the same founding team we actually founded a startup called lock in stock it was a mobile app that basically rewarded you with offers and discounts for not using your phone when you were in class we wanted to kind of help students pay attention more in class learn better um do better in their studies and then when they were done they could get you know buy one get one free at the pizza place or something like that so yeah now let's talk about your school did you enjoy school that is a tough question um when I was in school I hated it but I think the beauty with school is that the later in life you go the more you begin to appreciate the school that you went to who was your favorite teacher my favorite teacher uh my favorite teacher was a was a woman named Mrs mik Menan uh she she was my math teacher in grades 10 and 11 and and um I really liked her classes and I really enjoyed them and what specifically did you dislike about school um I went to a school that made academic performance very very important everything revolved around okay do better you got to do better your grades all of that stuff much to the neglect of maybe extracurriculars or Sports I played cricket and football in high school and I …",
    "analysis": {
      "overallComment": "该考生在口语三部分中整体表现接近 Band 9.0。回答具有母语者级别的自然节奏和自信，词汇覆盖面广、搭配精准，语法结构多变且几乎无误，语音清晰可辨。区别于中低分考生的关键在于：他不是机械地套模板，而是围绕考官问题自然延展，用个人创业经历、教育背景等真实素材层层推进，使每段回答都具备'说人话'的真实感和说服力。考官的听感是'像在跟一位有故事的英语使用者聊天'，而非'在听考生背答案'，这是 9.0 与 7.0–8.0 段最本质的差异。",
      "whyHighScore": [
        "延展与具体化能力极强：每答一题必给出至少一个具体细节或故事，而不是只给空泛观点。低分考生常常用 'It's important because it helps people' 一句话收尾，他则给出 'it's an edtech platform that connects students with scholarships at universities around the world'，信息密度高且具象。",
        "词汇资源既精准又有自然变体：能够同时使用行业术语 (edtech platform, productivity tool, internal team communication) 和习语化表达 (got my hands full with, I mean, obviously, you know)，且没有'背词书'痕迹。低分考生常常在精确词和模糊词之间反复横跳，他则用 paraphrase 化解生词。",
        "语法复杂度与容错率并存：出现 'somebody once asked me if I wasn't with secure my scholarship what would you do and I said I'd work at a nonprofit' 这种嵌入式虚拟问句，又在出错 (如 'my MobileOne phone') 后自然带过不停顿，体现真实的 9 分语法容错度。低分考生要么只用简单句堆叠，要么为求复杂而频繁出错。",
        "真实交流感与自信：适度使用 'um/uh/you know' 等话语标记，敢于停顿、思考、修正，没有'答完必须立刻闭嘴'的紧张感。低分考生最容易掉分的地方是流畅性被打断、眼神或语言中透露出'背稿'痕迹，本样本完全没有这种观感。"
      ],
      "examinerTips": [
        "用'具体故事'替换'空泛表态'：被问喜欢工作时，不要说 'I love helping people'，而要像他那样说 'we give students that come from hardworking middleclass families a chance at going to the University of their dreams'——细节越具体，分数越高。",
        "把话语标记当成朋友而不是敌人：'you know / I mean / obviously / who knows' 用对了是加分项，说明你在真实交流；刻意回避反而显得僵硬。注意 6 分考生通常过度紧张、句间停顿时长异常，而 7+ 考生愿意让 'um/uh' 出现。"
      ],
      "listenExcerpts": [
        "everything I've ever done in my life has been around companies with impact or with social causes",
        "somebody once asked me if I wasn't with secure my scholarship what would you do and I said I'd work at a nonprofit",
        "the beauty with school is that the later in life you go the more you begin to appreciate the school that you went to",
        "I use a productivity tool called Asana it allows me to like track my tasks and manage my day I use slack a lot uh internal team communication WhatsApp obviously I mean everybody uses WhatsApp"
      ],
      "listenTips": [],
      "practiceTips": [
        "用'具体故事'替换'空泛表态'：被问喜欢工作时，不要说 'I love helping people'，而要像他那样说 'we give students that come from hardworking middleclass families a chance at going to the University of their dreams'——细节越具体，分数越高。",
        "把话语标记当成朋友而不是敌人：'you know / I mean / obviously / who knows' 用对了是加分项，说明你在真实交流；刻意回避反而显得僵硬。注意 6 分考生通常过度紧张、句间停顿时长异常，而 7+ 考生愿意让 'um/uh' 出现。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 9.0,
        "grammar": 9.0,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "回答连贯且能持续延展，几乎不出现长时间卡顿；自我修正自然（'I I work', 'she she was my math teacher'）显示说话者在组织思路而非回忆模板。话语标记 (you know, I mean, obviously, who knows) 用得恰到好处，体现真实的语用节奏。",
          "evidence": [
            "everything I've ever done in my life has been around companies with impact or with social causes",
            "I love solving problems and helping make people's lives better um and the world has a lot of issues so you know who knows",
            "she she was my math teacher in grades 10 and 11 and and um I really liked her classes and I really enjoyed them"
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "能驾驭工作、创业、科技、教育等多领域词汇，且有清晰的搭配意识。'edtech platform that connects students with scholarships'、'productivity tool... track my tasks and manage my day'、'internal team communication' 都是地道搭配；概括抽象概念时用 'impact', 'social causes', 'nonprofit', 'extracurriculars' 等高阶词，没有任何中文式直译。",
          "evidence": [
            "edtech platform that connects students with scholarships at universities around the world",
            "a productivity tool called Asana it allows me to like track my tasks and manage my day",
            "internal team communication",
            "extracurriculars"
          ]
        },
        "grammar": {
          "score": 9.0,
          "why": "复杂结构出现频率高且几乎无误：嵌入式间接引语+虚拟 (if I wasn't with secure my scholarship what would you do)、比较结构 (the later in life you go the more you begin to appreciate)、现在完成时贯穿叙述。'my MobileOne phone' 这类口误/听感错位被自然带过，没有出现自我怀疑式停顿，这是 9 分'高容错'的典型特征。",
          "evidence": [
            "somebody once asked me if I wasn't with secure my scholarship what would you do and I said I'd work at a nonprofit",
            "the beauty with school is that the later in life you go the more you begin to appreciate the school that you went to",
            "I went to a school that made academic performance very very important everything revolved around okay do better you got to do better your grades all of that stuff much to the neglect of maybe extracurriculars"
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "仅凭转写无法直接判断音段/重音/语调，但可从节奏线索做有限推断：句中 'um/uh' 出现位置合理，符合自然口语韵律；'I I work', 'she she was' 体现边想边说的语调回落；'my MobileOne phone' 显示可能存在弱读或语音连贯。整体听感连贯，但因缺少音频证据，不确定性较大，故保守给 8.5。",
          "evidence": [
            "I I work actually um so I co-founded the startup",
            "the company basically runs off my MobileOne phone",
            "I'm not one of those guys with 1,500 apps on their phone I have about eight or nine apps that I use"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "everything I've ever done in my life has been around companies with impact or with social causes",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "somebody once asked me if I wasn't with secure my scholarship what would you do and I said I'd work at a nonprofit",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "the beauty with school is that the later in life you go the more you begin to appreciate the school that you went to",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I use a productivity tool called Asana it allows me to like track my tasks and manage my day I use slack a lot uh internal team communication WhatsApp obviously I mean everybody uses WhatsApp",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "用'具体故事'替换'空泛表态'：被问喜欢工作时，不要说 'I love helping people'，而要像他那样说 'we give students that come from hardworking middleclass families a chance at going to the University of their dreams'——细节越具体，分数越高。",
        "把话语标记当成朋友而不是敌人：'you know / I mean / obviously / who knows' 用对了是加分项，说明你在真实交流；刻意回避反而显得僵硬。注意 6 分考生通常过度紧张、句间停顿时长异常，而 7+ 考生愿意让 'um/uh' 出现。"
      ]
    }
  },
  {
    "id": "yt-adv-advanced-b9",
    "part": 3,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "含较多 Part 3 讨论展开，练深度回答时优先听。",
    "topic": "Advanced Band 9 speaking test",
    "prompt": "Advanced Band 9 speaking test with discussion answers.",
    "source": "https://www.youtube.com/watch?v=jYk0pvSiNhQ",
    "sourceName": "IELTS Advantage",
    "score": 9.0,
    "duration": 1038,
    "audioPath": "/audio/yt-adv-advanced-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Advantage Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "let's start off by talking about your daily routine tell me about your daily routine okay well I wake up around 8 a.m. uh every morning it's like clockwork and I brush my teeth I wash my face breakfast um and then I get in my car and I drive to work and uh yeah that's basically it I come back home and uh fix myself up some dinner and watch on Netflix very average mundane how has your daily routine changed since you were a child not much except I go to work now instead of school um but uh I get a lot of free time over the weekends so I get to do the things I like to do such as meditation and writing I love journaling I'd love to put out some novels one day um I always thought that I would retire to the countryside in my old age with my animals and write books so yeah so writing yoga what else do I do on the weekends oh I want to try horse riding as well is your daily routine different at the weekend compared to during the week yes 100% so uh the weekday are for work mainly being productive paying the bills and the weekends I get to do whatever I want to do so really treasure and enjoy my weekends let's talk now about dreams do you dream much at night I do dream sometimes but not very often and when I do dream I don't tend to remember my dreams do you think we can learn anything from dreams I think so I think there's lots of repressed emotions and stress that come out um during our dreams uh that perhaps we haven't addressed in real life so yes I I believe we can learn quite a lot and I suppose some people can even you know predict the future through dreams or images that they see I'm kind of on the fence about that I don't know but seems credible now let's talk about email what kind of emails do you receive about your work I receive a lot of emails from my hups so my manager people from other departments as well usually following up for things um or scheduling meetings um just a lot of work that needs to be done and reminders to please do this work so do you normally reply to emails as soon as you receive them oh no um I don't because I feel like there's no point in replying if the work hasn't been done so let's say we're supposed to schedule a meeting and something needs to be done I'd much prefer to get that thing done and then respond by saying okay here it is here's the file that you um that you requested and that you asked for and um yeah instead of you know a random sort of hello well received thank you are you happy to receive emails that are advertising things no I don't think anyone would be unless it's for a brand that I follow or that I like unless they're having a sale um in that case I'd be more than happy to receive their emails now let's talk about exercise how often do you exercise not as often as I would like I find the gym to be quite tedious and boring I prefer doing classes but then to get myself to the class and sit through traffic coming back so I would love to work out a bit more frequently and I I tend to like slower exercises such as yoga or swimming something where I don't really have to break a sweat which is not very um realistic but yeah what do you think is the best exercise to keep fit um I've tried Pilates I …",
    "analysis": {
      "overallComment": "该考生在 Part 1 的若干小题中持续给出超出'短答'长度的展开，且语言自然、贴近母语者口语习惯，符合 9 分'完全自如'的描述。亮点在于：话题切换时不冷场，使用地道搭配与习语灵活且准确，并能就抽象感受（梦、压力、邮件礼仪）进行有立场的表达。需要注意的是，转写中出现了自我修正痕迹（'my hups' 应为 boss）以及较多的 'um / uh'，但这些被自然地用作话语标记而非卡顿，未影响整体节奏。本片段以 Part 1 为主，Part 3 仅露头，评 9.0 主要依据所呈现的口语密度与稳定输出。",
      "whyHighScore": [
        "答题长度与展开度高：低分考生多以 1–2 句短答结束，高分考生会把同一题延展成 3–5 句的小段，并给出例证或个人立场（见 dream 段对 repressed emotions 的解释）。",
        "词汇选择精准且有'语感'：大量使用 idiomatic chunks（如 'on the fence'、'break a sweat'、'follow up'、'tedious and boring'），而非逐字翻译；6 分考生常停留在字面词汇。",
        "语法在'广度'与'准确'间平衡良好：能在即兴口语中自然使用条件句（unless）、名词性短语、关系从句，且极少出现影响理解的错误；6 分考生则易在条件句与第三人称单数上反复出错。",
        "语篇组织有逻辑连接：使用 'instead of'、'so let's say'、'I'm kind of on the fence' 之类的话语标记引导推理，比低分考生更善于让考官'跟得上'自己的思路。"
      ],
      "examinerTips": [
        "在 Part 1 即便题目简单，也用 3–4 句给出'描述 + 原因 + 个人偏好'的微结构：例如把 'Do you exercise?' 扩展到 'how / why / how often'，让考官听到持续输出能力。",
        "准备 8–10 个高频 idiomatic chunks（on the fence, follow up, break a sweat, take it for granted 等），在描述日常话题时自然嵌入，避免每题都从零拼词。",
        "允许自己出现 'um / you know' 等话语标记，但要训练其在句法断点出现，而非塞在名词前；这样听感更接近 8.5 以上。",
        "当题目问 'do you think we can learn anything from dreams' 时，先表态（Yes, I think so），再给一句抽象机制（repressed emotions come out），最后用 'I'm kind of on the fence about X' 收束立场——这是 8+ 答题的经典三拍结构。"
      ],
      "listenExcerpts": [
        "I always thought that I would retire to the countryside in my old age with my animals and write books",
        "I think there's lots of repressed emotions and stress that come out during our dreams that perhaps we haven't addressed in real life",
        "I'm kind of on the fence about that I don't know but seems credible",
        "I find the gym to be quite tedious and boring I prefer doing classes but then to get myself to the class and sit through traffic coming back"
      ],
      "listenTips": [],
      "practiceTips": [
        "在 Part 1 即便题目简单，也用 3–4 句给出'描述 + 原因 + 个人偏好'的微结构：例如把 'Do you exercise?' 扩展到 'how / why / how often'，让考官听到持续输出能力。",
        "准备 8–10 个高频 idiomatic chunks（on the fence, follow up, break a sweat, take it for granted 等），在描述日常话题时自然嵌入，避免每题都从零拼词。",
        "允许自己出现 'um / you know' 等话语标记，但要训练其在句法断点出现，而非塞在名词前；这样听感更接近 8.5 以上。",
        "当题目问 'do you think we can learn anything from dreams' 时，先表态（Yes, I think so），再给一句抽象机制（repressed emotions come out），最后用 'I'm kind of on the fence about X' 收束立场——这是 8+ 答题的经典三拍结构。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 8.5,
        "lexical": 9.0,
        "grammar": 8.5,
        "pronunciation": 8.0
      },
      "scoringDetails": {
        "fluency": {
          "score": 8.5,
          "why": "输出长度持续大于 Part 1 常规期待；自我修正后能立刻接续（'my hups' 后直接进入 'my manager people from other departments'），未出现长时间卡顿。'um / uh' 被用作自然话语标记而非填补空白，因此不扣分。",
          "evidence": [
            "I receive a lot of emails from my hups so my manager people from other departments as well usually following up for things",
            "I'm kind of on the fence about that I don't know but seems credible"
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "搭配成熟、习语自然，涵盖抽象与具体两层语义场。'repressed emotions'、'follow up for things'、'tedious and boring'、'break a sweat' 均是母语者常用 collocations，而非考试背词。Part 1 中能用 'mundane'、'clockwork' 形容 routine，显示同义替换能力。",
          "evidence": [
            "it's like clockwork and I brush my teeth I wash my face breakfast",
            "I find the gym to be quite tedious and boring",
            "there's lots of repressed emotions and stress that come out"
          ]
        },
        "grammar": {
          "score": 8.5,
          "why": "在即兴口语中展示了条件状语从句（unless 引导）、动名词短语、复杂宾语从句与并列结构，且无影响理解的错误。少量口语句法松散（'something where I don't really have to break a sweat which is not very realistic'）属自然口语特征，不构成降分理由。",
          "evidence": [
            "unless it's for a brand that I follow or that I like unless they're having a sale",
            "something where I don't really have to break a sweat which is not very um realistic but yeah"
          ]
        },
        "pronunciation": {
          "score": 8.0,
          "why": "仅依据转写无法判断音段、重音与语调全貌，但可观察到：使用 'kinda'、'you know' 等弱化与插入语，说明连读与节奏自然；'um / uh' 分布均匀，不破坏意群；自我修正（'my hups'）反映当场重新启动话语能力。无法确认是否有口音、个别音素偏误，因此 8.0 是稳妥推断，若实际语音清晰，可能上调至 8.5。",
          "evidence": [
            "instead of you know a random sort of hello well received thank you",
            "very average mundane"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "I always thought that I would retire to the countryside in my old age with my animals and write books",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I think there's lots of repressed emotions and stress that come out during our dreams that perhaps we haven't addressed in real life",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I'm kind of on the fence about that I don't know but seems credible",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I find the gym to be quite tedious and boring I prefer doing classes but then to get myself to the class and sit through traffic coming back",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "在 Part 1 即便题目简单，也用 3–4 句给出'描述 + 原因 + 个人偏好'的微结构：例如把 'Do you exercise?' 扩展到 'how / why / how often'，让考官听到持续输出能力。",
        "准备 8–10 个高频 idiomatic chunks（on the fence, follow up, break a sweat, take it for granted 等），在描述日常话题时自然嵌入，避免每题都从零拼词。",
        "允许自己出现 'um / you know' 等话语标记，但要训练其在句法断点出现，而非塞在名词前；这样听感更接近 8.5 以上。",
        "当题目问 'do you think we can learn anything from dreams' 时，先表态（Yes, I think so），再给一句抽象机制（repressed emotions come out），最后用 'I'm kind of on the fence about X' 收束立场——这是 8+ 答题的经典三拍结构。"
      ]
    }
  },
  {
    "id": "yt-liz-part1",
    "part": 1,
    "coversParts": [
      1
    ],
    "matchNote": "偏 Part 1 常见问题示范，和题库 Part 1 主题更接近，但仍非逐题匹配。",
    "topic": "Part 1 common questions",
    "prompt": "Common IELTS Speaking Part 1 questions with model answers.",
    "source": "https://www.youtube.com/watch?v=E0jCDsWoM1A",
    "sourceName": "IELTS Liz",
    "score": 8.5,
    "duration": 434,
    "audioPath": "/audio/yt-liz-part1.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Liz Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "hello my name is Liz and in this lesson I want to look at the different types of questions that the examiner might ask you in IELTS speaking part one now as you know you need to prepare lots of different topics so for example family hobbies going out birthdays but you also need to prepare for different types of questions so even though the examiner will ask you about different topics the questions are often the same so let's have a look at some common questions for IELTS speaking part one so let's take a look at a common topic and that's the topic of cooking it is a common topic to get in speaking part one now you can see a list of questions here so let's take a look at these questions more closely what you can see is that each question begins with a different question word and this is very important to understand about speaking part one because every topic that you get in speaking part one can have questions let's start with these question words so for example how often do you cook this is looking at frequency so the number of times you cook in a week or in a month who usually does the cooking this is a person so either you or someone else in your family where did you learn to cook so this is a place did you learn to cook in your own home or was it in a school or on a course when did you learn to cook this is for a time so for this you'll need to give a date or for example 10 years ago or when I was a child how long have you been cooking another common question this is about the length of time so you could say I've been cooking for six years and that means I started cooking six years ago and of course what kind of dishes do you like this is also a common question so for example do you like spicy dishes chicken dishes what kind so these question words are very important and you need to listen for them in the speaking part one test so that you can give the right information in your answer and here are more questions that are very common in IELTS speaking part one so you can see the first one which is a can you question it's very common to get this for any topic can you swim can you dance can you cook and you need to answer yes I can or no I can't and add some more information also we've got do you like so this is what you enjoy it could also be do dislike so listen out for that and what's your favorite a very common question what's your favorite book what's your favorite dish what's your favorite newspaper it could be any question like this and again you need to express the dish that you like most another one is preferring so this is all about preferences do you prefer this or do you prefer this so do you prefer eating at home or do you prefer eating out you need to choose one and explain your preference we've also got do you usually so this is about your common habits what you do frequently so do you usually cook for yourself and you need to answer yes or no and again add more information the next one what do you usually cook this is about what dish so for example I often cook Chinese food or I often cook veg therrien dishes the next one is a do you ever and this is in the present tense so this is now so do you ever order food delivery and you need to say yes or no …",
    "analysis": {
      "overallComment": "本段转写主体是 IELTS Liz 老师的教学讲解，并非考生在考场中的口试作答，因此不能直接等同于一段 Part 1 应试口语。来源标称 8.5 分应理解为『示范与点评质量接近 Band 8.5 水平』。老师穿插的 model answer 片段如 'I've been cooking for six years'、'I often cook Chinese food or I often cook vegetarian dishes' 在语法准确性、词汇搭配、答句完整度上均属 Part 1 高分范本；讲解部分本身则展示了一名高分示范者如何在 3–4 秒内识别题问词 (who/where/when/how long) 并迅速组织答句，这一策略正是 Band 8+ 考生区别于 6.0–6.5 考生的核心动作。",
      "whyHighScore": [
        "题问词识别训练对应 Fluency & Coherence：示范者把 how often / who / where / when / how long 等题问词逐一归类，使答案能『问什么答什么』，避免 6.0 考生常见的答非所问或长篇跑题。",
        "搭配与话题词汇自然呈现对应 Lexical Resource：'spicy dishes'、'chicken dishes'、'order food delivery'、'vegetarian dishes' 等同场共现，体现出 8 分档才有的同话题搭配成串输出能力，远胜 6.0 考生反复使用 'food'、'cook' 等基础词。",
        "时态切换与时体准确对应 Grammatical Range & Accuracy：'I've been cooking for six years'（现在完成体表持续时长）与 'I started cooking six years ago'（一般过去时表起点）并置展示，体现对持续性与时间起点的区分；6.0 考生常将二者混用为 'I cook for six years'。",
        "语速平稳、连读流畅、自我修正自然对应 Pronunciation：讲解全程语速均匀、使用 so / now / but / and 等话语标记串联，关键信息处 (question word) 略作重音，听感上接近 BBC Learning English 教学者水准；6.0 考生常出现长段卡顿或重复同一词。"
      ],
      "examinerTips": [
        "听题时先在心里锁定 question word (how often / who / where / when / how long / do you prefer)，再决定答句骨架；这是 8 分段在 3–4 秒内给出『切题 + 完整』回答的关键动作。",
        "准备 2–3 组同话题搭配串 (如 spicy dishes / chicken dishes / vegetarian dishes)，避免 Part 1 中反复用单个 'food' 'cook' 等基础词；成串搭配是 7.5→8.0 的最直接拉分点。",
        "在答句末尾加一句延伸信息 (e.g. 'and I usually order food delivery on weekends')，既显自然又对应 FC 评分中的『relevant extension』加分项。"
      ],
      "listenExcerpts": [
        "you could say I've been cooking for six years and that means I started cooking six years ago",
        "do you prefer eating at home or do you prefer eating out you need to choose one and explain your preference",
        "I often cook Chinese food or I often cook vegetarian dishes",
        "you also need to prepare for different types of questions so even though the examiner will ask you about different topics the questions are often the same so let's have a look at some common questions"
      ],
      "listenTips": [],
      "practiceTips": [
        "听题时先在心里锁定 question word (how often / who / where / when / how long / do you prefer)，再决定答句骨架；这是 8 分段在 3–4 秒内给出『切题 + 完整』回答的关键动作。",
        "准备 2–3 组同话题搭配串 (如 spicy dishes / chicken dishes / vegetarian dishes)，避免 Part 1 中反复用单个 'food' 'cook' 等基础词；成串搭配是 7.5→8.0 的最直接拉分点。",
        "在答句末尾加一句延伸信息 (e.g. 'and I usually order food delivery on weekends')，既显自然又对应 FC 评分中的『relevant extension』加分项。"
      ],
      "claimedBand": 8.5,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 8.5,
        "lexical": 8.0,
        "grammar": 8.5,
        "pronunciation": 8.0
      },
      "scoringDetails": {
        "fluency": {
          "score": 8.5,
          "why": "讲解语流极少出现 1 秒以上停顿，话语标记 so / now / but / and 的密度适中；面对多组题问词仍能条理推进，体现良好的逻辑连接与话题延展。考虑到这是教学者讲授而非真实考场上略带紧张感的回答，真实考生如能复制此流畅度即可稳在 8.0–8.5。",
          "evidence": [
            "now as you know you need to prepare lots of different topics so for example family hobbies going out birthdays but you also need to prepare for different types of questions so even though the examiner will ask you about different topics the questions are often the same so let's have a look at some common questions",
            "you need to listen for them in the speaking part one test so that you can give the right information in your answer"
          ]
        },
        "lexical": {
          "score": 8.0,
          "why": "围绕 cooking 主题出现 'spicy dishes'、'chicken dishes'、'vegetarian dishes'、'order food delivery' 等同话题搭配；元语言 (metalanguage) 如 'frequency'、'preference'、'common habit'、'present tense' 准确切题，是 8 分段对『话题词汇成串使用 + 解释性词汇到位』的典型特征。扣 0.5 分是因为 6.0 考生已经掌握的 'do you like / do you prefer' 框架占据较大比例，缺少更细致的副词与习语升级。",
          "evidence": [
            "what kind of dishes do you like this is also a common question so for example do you like spicy dishes chicken dishes",
            "do you ever order food delivery and you need to say yes or no and again add more information",
            "this is about your common habits what you do frequently"
          ]
        },
        "grammar": {
          "score": 8.5,
          "why": "model answer 片段在时体选择上精准：'I've been cooking for six years' 用现在完成进行体表持续时长，'I started cooking six years ago' 切回一般过去时交代起点，'do you prefer eating at home or do you prefer eating out' 用 or 并列完整替代句式。讲解中 'you also need to prepare for different types of questions so even though the examiner will ask you about different topics the questions are often the same' 含让步状语从句，体现 8.5 分段的复合句驾驭力。",
          "evidence": [
            "you could say I've been cooking for six years and that means I started cooking six years ago",
            "do you prefer eating at home or do you prefer eating out you need to choose one and explain your preference",
            "you also need to prepare for different types of questions so even though the examiner will ask you about different topics the questions are often the same"
          ]
        },
        "pronunciation": {
          "score": 8.0,
          "why": "从转写节奏看，讲解以中等偏快语速稳定推进，连读和弱读 (e.g. 'kinda'、'wanna' 风格未出现但 'gonna' 类压缩未现) 较为标准；关键题问词 how often / who / where / when / how long 在列举时有明显的语义重音，听感接近教学型发音。转写中 'veg therrien dishes' 疑似自我修正痕迹 (vegetarian)，可推断存在自然的话语自我修复 (self-repair)，这本身不影响分数，反而显示语言产出自动化程度较高。无法从转写判断个体音位准确度，故标注不确定性。",
          "evidence": [
            "let's start with these question words so for example how often do you cook this is looking at frequency",
            "I often cook Chinese food or I often cook veg therrien dishes"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "you could say I've been cooking for six years and that means I started cooking six years ago",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "do you prefer eating at home or do you prefer eating out you need to choose one and explain your preference",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I often cook Chinese food or I often cook vegetarian dishes",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "you also need to prepare for different types of questions so even though the examiner will ask you about different topics the questions are often the same so let's have a look at some common questions",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "听题时先在心里锁定 question word (how often / who / where / when / how long / do you prefer)，再决定答句骨架；这是 8 分段在 3–4 秒内给出『切题 + 完整』回答的关键动作。",
        "准备 2–3 组同话题搭配串 (如 spicy dishes / chicken dishes / vegetarian dishes)，避免 Part 1 中反复用单个 'food' 'cook' 等基础词；成串搭配是 7.5→8.0 的最直接拉分点。",
        "在答句末尾加一句延伸信息 (e.g. 'and I usually order food delivery on weekends')，既显自然又对应 FC 评分中的『relevant extension』加分项。"
      ]
    }
  },
  {
    "id": "yt-e2-sim",
    "part": 2,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "E2 直播模拟考风格示范，适合感受真实互动节奏。",
    "topic": "Live Band 9 speaking simulation",
    "prompt": "Live IELTS Band 9 speaking simulation with expert assistance.",
    "source": "https://www.youtube.com/watch?v=Pfc81cLseAU",
    "sourceName": "E2 IELTS",
    "score": 9.0,
    "duration": 506,
    "audioPath": "/audio/yt-e2-sim.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "E2 IELTS Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "Most people struggle with IELTS speaking, not because their English is bad, but because they've never practiced with the pressure of a real human looking at them. I'm Bailey, and today I'm your examiner. This is part one of our speaking series, a full point of view speaking mock test. We'll do speaking parts one, two, and three. I'll ask, you speak, and then I'll give you the band nine breakdown. Try for yourself first, then click the link in the description to download the IELTS point of view practice bundle. It contains the band nine answer bank with the exact scripts and vocabulary we're using today. Next week, we'll start a deep dive into each part, starting with the 2026 part one topics. Remember, you can always get started for free with a free account at e2language.com. Ready? Deep breath. Let's begin. Can you tell me your full name, please? And can I see your identification? Great. Now, let's talk about your hometown. Where exactly is it located? And what do you find the most interesting part of living there? Okay, stop. For part one, keep it snappy. Don't just say it's a big city, say it's a sprawling metropolis located in the heart of Amsterdam. That is band nine vocabulary. If you struggle to find those words, you're lacking a partner to bounce ideas off of. I'll tell you how to fix that in just a moment. Let's move on to part two, the long turn. Here, you have one minute to prepare and you can make notes if you wish. Your one minute starts now. All right. Remember, I'll stop you at the two-minute mark. Please start speaking now. Thank you. That's the 2 minutes. Remember, part two is about storytelling. So, if you've ran out of things to say at 90 seconds, you didn't use the PPF method, past, present, and future. You should talk about your life before the move, during the move, and how you feel now. This should guarantee that you hit the 2-minute mark. Download the free band 9 answer bank PDF in the description for more details about the PPF method. Part three is the two-way discussion. We've been talking about moving. Let's discuss the idea of home more broadly. Do you think people in your country move house more often now than in the past? Some people say that living in the same place your whole life is better for your mental health. What's your take on that? Great job. Part three is expert level. I'm looking for high-level connectors like from an economic perspective or it's often argued that. If you're stumbling here, make sure you're subscribed because next week I'll show you the ARE formula that forces you into a band 9 range every single time. You survived the full IELTS speaking practice test, but surviving isn't enough. You need to expand. Next week in video two, I'm showing you the expansion strategy for part one topics like apps so you can stop giving robotic one sentence answers. To study the why behind today's score, grab that practice bundle PDF in the description. And if you're serious about passing, head over to e2language.com to sign up for free. There you can book a premium mock test with our expert tutors to get a real score before test day. I'll see you in the next video.",
    "analysis": {
      "overallComment": "本视频本质是 E2 老师 Bailey 以考官身份主持的『直播模拟+教学拆解』，考生实际作答内容在转写中几乎被裁掉，只留下若干老师点评时插入的 model answer 片段（如 ‘a sprawling metropolis located in the heart of Amsterdam’）以及高分策略口诀（PPF、ARE）。因此严格意义上无法据完整作答给分，但就可见的高分语料而言：句法密度高（分词后置修饰）、学术连接语（from an economic perspective / it's often argued that）、高阶名词搭配（sprawling metropolis）一应俱全，且全程用『过去—现在—未来』框架保证 2 分钟不冷场，这正是考官愿意给 8.5–9.0 的语言画像。",
      "whyHighScore": [
        "词汇层级明显高于 6.0–6.5 考生的『big city / nice place』，老师直接示范 sprawling metropolis located in the heart of Amsterdam，体现出『精确描述+空间介词短语』的满分搭配习惯。",
        "Part 2 用 PPF（Past/Present/Future）显式拉长答题时间线，比 6 分考生『说完一件搬家事就停』多出至少一整段叙事弧，考官在 FC 的『sustains a long turn without noticeable effort』一栏会直接加分。",
        "Part 3 主动调用学术化元话语（from an economic perspective、it's often argued that），这是 Band 7 与 Band 8.5+ 的分水岭——6.5 考生只会说 I think / in my opinion。",
        "整体把口语当成『短演讲』而非问答，老师提醒 part two is about storytelling，把 LR 与 FC 同步拉满，是 9.0 范式回答的典型组织方式。"
      ],
      "examinerTips": [
        "Part 1 不要只答一句，把题目词『升级』：city → sprawling metropolis，give a location → located in the heart of，这是最便宜的 8.5→9 跳板。",
        "Part 2 直接套 PPF（before / during / now）三段式，可机械保证讲到 2 分钟且叙事完整，比临场硬撑稳得多。",
        "Part 3 准备 3–4 个学术化连接语（from an economic perspective / it's often argued that / a key factor is）轮换使用，避免反复 I think。",
        "全程把口语当 1.5–2 分钟 mini-presentation 来组织，而不是 Q&A，这是 6.5 与 8.5 的根本差别。"
      ],
      "listenExcerpts": [
        "sprawling metropolis located in the heart of Amsterdam",
        "from an economic perspective",
        "it's often argued that",
        "your life before the move, during the move, and how you feel now"
      ],
      "listenTips": [],
      "practiceTips": [
        "Part 1 不要只答一句，把题目词『升级』：city → sprawling metropolis，give a location → located in the heart of，这是最便宜的 8.5→9 跳板。",
        "Part 2 直接套 PPF（before / during / now）三段式，可机械保证讲到 2 分钟且叙事完整，比临场硬撑稳得多。",
        "Part 3 准备 3–4 个学术化连接语（from an economic perspective / it's often argued that / a key factor is）轮换使用，避免反复 I think。",
        "全程把口语当 1.5–2 分钟 mini-presentation 来组织，而不是 Q&A，这是 6.5 与 8.5 的根本差别。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 9.0,
        "grammar": 8.5,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "可推断的考生作答被 PPF 框架『锁死』时间轴，几乎不可能出现 6 分常见的 1 秒以上卡顿或中途换题。老师的指令性句子 Part two is about storytelling 显示出结构化输出训练痕迹。",
          "evidence": [
            "sprawling metropolis located in the heart of Amsterdam",
            "your life before the move, during the move, and how you feel now"
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "转写里出现的每个高分词块都是『话题+修辞』双密集型：sprawling metropolis（城市话题+夸张形容）、located in the heart of（空间精准介词）、from an economic perspective（学术视角）、it's often argued that（学术对冲）。6.5 考生用 city、good place、I think 即可被这套词库直接拉开档差。",
          "evidence": [
            "sprawling metropolis located in the heart of Amsterdam",
            "from an economic perspective",
            "it's often argued that",
            "the PPF method, past, present, and future"
          ]
        },
        "grammar": {
          "score": 8.5,
          "why": "示范句已展示分词后置修饰（a sprawling metropolis located in the heart of Amsterdam）和介词短语作状语（from an economic perspective），结构广度足够；准确性上因转写中考生完整句极少，保守估 8.5，避免无证据给 9。",
          "evidence": [
            "sprawling metropolis located in the heart of Amsterdam",
            "from an economic perspective"
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "仅从转写无法听辨音段，但老师的节奏控制（Deep breath. Let's begin.、Try for yourself first, then click the link）显示断句干净、意群完整；考生在 2 分钟长 turn 中被要求不停顿，可推断重音/连读已训练过。给定字幕无明显重读错误痕迹，估 8.5；如听原音确认无口音偏差可上探 9.0。",
          "evidence": [
            "Deep breath. Let's begin.",
            "Part two is about storytelling."
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "sprawling metropolis located in the heart of Amsterdam",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "from an economic perspective",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "it's often argued that",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "your life before the move, during the move, and how you feel now",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "Part 1 不要只答一句，把题目词『升级』：city → sprawling metropolis，give a location → located in the heart of，这是最便宜的 8.5→9 跳板。",
        "Part 2 直接套 PPF（before / during / now）三段式，可机械保证讲到 2 分钟且叙事完整，比临场硬撑稳得多。",
        "Part 3 准备 3–4 个学术化连接语（from an economic perspective / it's often argued that / a key factor is）轮换使用，避免反复 I think。",
        "全程把口语当 1.5–2 分钟 mini-presentation 来组织，而不是 Q&A，这是 6.5 与 8.5 的根本差别。"
      ]
    }
  },
  {
    "id": "yt-adv-perfect2-b9",
    "part": 1,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "IELTS Speaking Test · Perfect Band 9",
    "prompt": "Full Band 9 speaking test demonstration across everyday topics.",
    "source": "https://www.youtube.com/watch?v=IevmdO16GuE",
    "sourceName": "IELTS Advantage",
    "score": 9.0,
    "duration": 451,
    "audioPath": "/audio/yt-adv-perfect2-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Advantage Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "let's start off by talking about the mountains do you like to go on holiday in the mountains definitely it's one of my favorite things to do I actually love nature and um the mountains specifically like I always handpick locations which have mountains and like a beautiful landscape Greenery and uh I love hiking as well so that's why are there any hotels in the mountains in your country Yes actually uh in Himel they have lodges they rent it out to people who are there on vacations and uh it's the most beautiful experience because you get to actually see how people who are uh based there how they live and how they cook and how they clean and you get the whole experience of everything now let's talk about trees do you like trees yeah actually I love trees I love spending time around trees when I look at a tree I feel um very alive uh because there's just so much history that goes with it I mean um especially like you get oxygen so when you just sit there and meditate it's like the best feeling in the world you feel very refreshed as well are there many trees around your hometown there are but not so much uh as of now because it's mostly City and buildings and shops um but I would love for it to be what are the benefits of planting more trees there are only benefits of planting more tree I mean it protects you from so many things and uh it's so much better for your health to have trees around you also um I think for Plantation um even for food and stuff like uh to get fresh fruits and vegetables you can always have it available outside of your home if you just have like those planted trees around you now let's talk about the weather what time of year did you enjoy the most when you were a child I would definitely say November December so like towards the end of the year and when winter arrives or even during September October when it's rainy season season I enjoy myself the most I think because I love when it's cold and chilly and you can just go out for a walk or play outside with your friends I think that's when I enjoy it the most has the weather changed much in recent years I would say drastically yes um it's gotten hotter and hotter and humid I think because of global warming it's been really bad lately would you say the weather in your hometown is suitable for working I mean around December yes but throughout the year no it's very very hot back in India it's like um when you get out it's a lot of um humidity and you just don't feel your best the TV documentary that I watched was a documentary on uh the artist Eminem um he goes by the name Marshall mats and uh I remember I was very young when I watched it and um the reason I love it is because it's very inspiring because in the movie he he shows all of his struggles and the poverty that he went through when he was very unfortunate as a child and even when he was a teenager and that goes to show how much determination he had towards his dreams and his plans and goals of the future that he knew that he was going to make it big in the music industry and now he's known to be one of the biggest musical artists in the industry I learned inspiration from that movie I think it gives you a lot of motivation every time you watch it it goes to show that you know no matter what no matter where you come …",
    "analysis": {
      "overallComment": "从转写来看，这段示范在'内容延伸长度'和'生活化自然度'上确实高于多数中低分考生，但若严格按官方评分细则核对，并未达到真正的 9.0。出现的 'more tree' 单复数错误、Himel（Himachal 的发音痕迹）、频繁的 'uh/um' 停顿、以及句式复杂度集中在并列/列举而非高级从属结构，都是 7.0–7.5 区间的典型特征。它被标为 9.0 更多是因为：每个问题都给出了延展性答案、词汇搭配自然、回答长度远超 Part 1 常规期待。给分建议：Fluency 7.5、Lexical 7.5、Grammar 7.0、Pronunciation 7.0。",
      "whyHighScore": [
        "回答长度与延展明显超出 Part 1 常见水平：考生不只回答 yes/no，而是给出 reason + example + personal feeling，接近 Part 3 的展开方式，因此 Fluency & Coherence 不会被卡在 6.5 的'简短回答'档。",
        "词汇搭配呈现'自然习得'特征：'handpick locations'、'the most beautiful experience'、'it's gotten hotter and hotter'、'humidity'、'determination'，而非背模板词汇，对比低分考生常用的 'very beautiful / very good'，Lexical Resource 上明显占优。",
        "跨话题保持统一节奏与表达策略：每题都先表态 + 给原因 + 给具体画面/例子，形成稳定的话语模式，使 Coherence 的 'clear progression' 得到满足；6.0 考生常出现答非所问或答案与理由脱节。",
        "在 Part 2（纪录片描述）中尝试使用较复杂的并列从属结构 'he shows all of his struggles and the poverty ... and that goes to show how much determination he had'，展示了一定的语法广度，这是低分考生较少做到的。"
      ],
      "examinerTips": [
        "把每个 Part 1 答案从两句话扩到 5–7 句：表态 + 原因 + 画面感细节 + 感受，例如 'I love winter because… you can just go out for a walk… that feeling of cold air'，比堆词更能打动 Coherence 项。",
        "减少 'uh/um' 的关键是在意群前做'无声意群停顿'而非填声：例如 'I love trees / (停顿) / because there is so much history in them'，录音中频繁的 um 会直接拉低 Fluency 印象分。",
        "Part 2/3 回答前先在心里搭一个 mini-outline（一句观点 + 一句展开 + 一句例子），可避免出现本段那种 'it's like um when you get out it's a lot of um humidity' 的句子中途重启。"
      ],
      "listenExcerpts": [
        "I always handpick locations which have mountains and like a beautiful landscape Greenery and uh I love hiking as well so that's why",
        "you get to actually see how people who are uh based there how they live and how they cook and how they clean and you get the whole experience of everything",
        "it's gotten hotter and hotter and humid I think because of global warming it's been really bad lately",
        "it goes to show how much determination he had towards his dreams and his plans and goals of the future that he knew that he was going to make it big in the music industry"
      ],
      "listenTips": [],
      "practiceTips": [
        "把每个 Part 1 答案从两句话扩到 5–7 句：表态 + 原因 + 画面感细节 + 感受，例如 'I love winter because… you can just go out for a walk… that feeling of cold air'，比堆词更能打动 Coherence 项。",
        "减少 'uh/um' 的关键是在意群前做'无声意群停顿'而非填声：例如 'I love trees / (停顿) / because there is so much history in them'，录音中频繁的 um 会直接拉低 Fluency 印象分。",
        "Part 2/3 回答前先在心里搭一个 mini-outline（一句观点 + 一句展开 + 一句例子），可避免出现本段那种 'it's like um when you get out it's a lot of um humidity' 的句子中途重启。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 7.5,
        "lexical": 7.5,
        "grammar": 7.0,
        "pronunciation": 7.0
      },
      "scoringDetails": {
        "fluency": {
          "score": 7.5,
          "why": "语速稳定、有明显意群停顿而非'卡词停顿'；每题都能持续讲 6–10 句，未出现长时间空白。但 'uh / um' 出现频率偏高（每段 2–4 次），且出现明显自我修正与重述 'there are but not so much uh as of now'，说明并非真正'无犹豫'的 8.5–9.0 水平，定位在 7.5。",
          "evidence": [
            "I always handpick locations which have mountains and like a beautiful landscape Greenery and uh I love hiking as well so that's why",
            "you get to actually see how people who are uh based there how they live and how they cook and how they clean and you get the whole experience of everything"
          ]
        },
        "lexical": {
          "score": 7.5,
          "why": "用词围绕'度假/自然/天气/纪录片'主题呈现清晰搭配群：landscape、Greenery、lodge、rent it out、meditate、refreshing、drastically、global warming、humidity、determination、inspiring，paraphrase 能力可圈可点（如用 'gets hotter and hotter' 替代 'temperature rises'）。但缺少真正 9.0 应有的'低频精确搭配'或 idiomatic chunks，整体仍属 'good range with some flexibility' 而非 'wide and fully flexible'。",
          "evidence": [
            "I always handpick locations which have mountains and like a beautiful landscape Greenery",
            "it's gotten hotter and hotter and humid I think because of global warming",
            "it shows how much determination he had towards his dreams and his plans and goals of the future"
          ]
        },
        "grammar": {
          "score": 7.0,
          "why": "能产出多层次的并列与状语从句（'because I love when it's cold and chilly and you can just go out for a walk'），但准确度有可见错误：'there are only benefits of planting more tree'（tree 应为 trees，且缺限定）、'it's very very hot back in India it's like um when you get out it's a lot of um humidity' 出现明显的不完整/重述。这些错误使本项无法进入 8.0，更难触 9.0。",
          "evidence": [
            "I think because I love when it's cold and chilly and you can just go out for a walk or play outside with your friends",
            "there are only benefits of planting more tree",
            "it's very very hot back in India it's like um when you get out it's a lot of um humidity"
          ]
        },
        "pronunciation": {
          "score": 7.0,
          "why": "纯转写无法判断音段特征与重音，但从文本可推断：1) 'Himel'（应为 Himachal）暗示地名重音/清浊有问题；2) 反复出现 'uh / um' 出现在句中而非句首，提示语流有断点而非自然节奏；3) 句间无明显标点提示考生有意识使用意群停顿。综合推断为 7.0 区间，标注此为有限度推断。",
          "evidence": [
            "Yes actually uh in Himel they have lodges",
            "there are but not so much uh as of now because it's mostly City and buildings"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "I always handpick locations which have mountains and like a beautiful landscape Greenery and uh I love hiking as well so that's why",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "you get to actually see how people who are uh based there how they live and how they cook and how they clean and you get the whole experience of everything",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "it's gotten hotter and hotter and humid I think because of global warming it's been really bad lately",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "it goes to show how much determination he had towards his dreams and his plans and goals of the future that he knew that he was going to make it big in the music industry",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "把每个 Part 1 答案从两句话扩到 5–7 句：表态 + 原因 + 画面感细节 + 感受，例如 'I love winter because… you can just go out for a walk… that feeling of cold air'，比堆词更能打动 Coherence 项。",
        "减少 'uh/um' 的关键是在意群前做'无声意群停顿'而非填声：例如 'I love trees / (停顿) / because there is so much history in them'，录音中频繁的 um 会直接拉低 Fluency 印象分。",
        "Part 2/3 回答前先在心里搭一个 mini-outline（一句观点 + 一句展开 + 一句例子），可避免出现本段那种 'it's like um when you get out it's a lot of um humidity' 的句子中途重启。"
      ]
    }
  },
  {
    "id": "yt-adv-pron-b9",
    "part": 1,
    "coversParts": [
      1,
      2
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "Band 9 speaking with clear pronunciation",
    "prompt": "Natural Band 9 answers focusing on pronunciation and fluency.",
    "source": "https://www.youtube.com/watch?v=t9PRLpkCUSM",
    "sourceName": "IELTS Advantage",
    "score": 9.0,
    "duration": 1110,
    "audioPath": "/audio/yt-adv-pron-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Advantage Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "let's start off by talking about your home what's your favorite thing about your home my favorite thing about my home would probably be my dog or my sister I'm not sure because my dog could be annoying sometimes in the morning he likes to wake me up um but my sister is almost the same person as me so I like her company we like to do a lot of the same things and we don't have that big of an age Gap so we're similar in age so we like to share the same Hobbies the same music taste the same games and we like a lot of the same things what makes your home comfortable I don't want to sound like I'm obsessed with my bed but my bed I like being in bed it's super soft um and also my rocking chair what would you like to change about your home I would like to have more windows in my house because I like the sun and I don't like being outside so much because it's hot um but I like daylight so if I had more windows in my house I feel like that would make my house better now let's talk about shopping where do you prefer to shop I used to love shopping at the mall but ever since this day and age has been evolving I like shopping online more do you prefer shopping alone or with others I like doing a lot of things with a lot of people and I've tried shopping alone alone and I've tried shopping with others I think that I prefer shopping with others just because I can get their opinion what was your last important purchase I would consider grocery shopping important so food is that is that does that count as an important purchase now let's talk about your free time what do you like to do in your free time I'm currently obssessed with this new game on my Nintendo so I like playing games how often do you spend time with friends I'm with friends almost every day I wouldn't say that I make it a priority but every day I spend time with my friends be it going to the gym or even just running errands together or just going for a drive so I'll say every other day what new hobbies would you like to develop in the future I do want to get into Pilates just more into Wellness things because I I'm super into like active stuff so like going to the gym is what I'm doing right now but I want to like expand that by going into like Pilates or yoga stretching just like a lot of like breath work things like that now let's talk about food what are the most popular foods in your country adobo and Panet are my two personal favorites and then for dessert I like um Halo Hollow do you like trying new foods yes one thing that I would say about myself is I'm not afraid to try anything from any country in comparison to anybody else that I've met but there are some foods that I wouldn't try are there any foods that you really dislike um so there's balut I don't know if you would are aware of what it is but it's like an egg but it's like a fetus of a duck so that's that's something that I don't like a skill that took me a long time to learn um is singing and so the reason why I wanted to learn how to sing is because I wouldn't say it's like a tradition where I'm from in the Philippines but it's just like I grew up just hearing people sing karaoke all the time and I always thought like singing …",
    "analysis": {
      "overallComment": "这段示范接近 Band 9 的核心在于『自然度』：回答不是背模板，而是像在跟朋友聊天一样边想边说，但每一句都贴题、展开、收得住。考生大量使用条件句、分词结构、让步/列举结构（be it…or…），句法有意识地拉长；同时使用搭配精准、地道且略带个人风格的词汇（obsessed, age gap, errands, breath work, in comparison to）。在 Part 1 这种短问短答里还能做到『不抢话、说够、说得有细节』，正是高分段最稀缺的能力。",
      "whyHighScore": [
        "高分原因1：每个问题都给 3–5 句完整展开并自然收束，而不是用一句模板式短答结束；对比 6.0–6.5 考生常见的『I like my bed because it is comfortable.』单句就停。",
        "高分原因2：句法资源丰富且准确，频繁使用条件句、第二人称假设、列举式平行结构（the same hobbies / the same music taste / the same games），而不是反复用简单句 I like… I think… 套话。",
        "高分原因3：词汇明显带个人语域，既有口语地道词（obsessed, errands, breath work），也有精准名词搭配（age gap, rocking chair, day and age），且会主动给生词下定义（balut 那段），展示灵活解释力。",
        "高分原因4：能在自我修正（shopping alone alone）与犹豫填充（um, like, I feel like）中保持推进，没有因为一个 stumble 而失语或换题，这是 9 分流利度的关键标志。"
      ],
      "examinerTips": [
        "考生可迁移做法1：把每个 Part 1 问题当『迷你 Part 2』，用『观点 + 一个原因 + 一个具体例子 + 一句收束』的四拍结构回答，例如示范中先点 bed，再补 super soft，最后过渡到 rocking chair。",
        "考生可迁移做法2：刻意练三组高复用句型——条件句（if I had…, that would make…）、列举让步（be it A or even B）、下定义（it's like X but it's like Y），这三组基本能撑起一半 Part 1 话题。"
      ],
      "listenExcerpts": [
        "we like to share the same Hobbies the same music taste the same games and we like a lot of the same things",
        "if I had more windows in my house I feel like that would make my house better",
        "every day I spend time with my friends be it going to the gym or even just running errands together or just going for a drive",
        "one thing that I would say about myself is I'm not afraid to try anything from any country in comparison to anybody else that I've met"
      ],
      "listenTips": [],
      "practiceTips": [
        "考生可迁移做法1：把每个 Part 1 问题当『迷你 Part 2』，用『观点 + 一个原因 + 一个具体例子 + 一句收束』的四拍结构回答，例如示范中先点 bed，再补 super soft，最后过渡到 rocking chair。",
        "考生可迁移做法2：刻意练三组高复用句型——条件句（if I had…, that would make…）、列举让步（be it A or even B）、下定义（it's like X but it's like Y），这三组基本能撑起一半 Part 1 话题。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 9.0,
        "grammar": 8.5,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "语速持续稳定，几乎不出现『死寂停顿』；自我修正后立刻重接，没有换题也没有从头再来；用列举结构和举例自然把答案从一句拉成一段，且每段都有明确的收束（so I like her company / that would make my house better）。对比 6.0–6.5 考生常见的现象：卡顿后放弃、用 Yes/No 收尾、或反复 I think… 拖延，这段在『边想边说』上明显更成熟。",
          "evidence": [
            "we like to share the same Hobbies the same music taste the same games and we like a lot of the same things",
            "I'm with friends almost every day I wouldn't say that I make it a priority but every day I spend time with my friends be it going to the gym or even just running errands together"
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "词汇使用具有『个性化语域』：既不是死板学术词，也不是单纯俚语，而是带情感色彩的口语精准搭配（obsessed, super into, get their opinion, day and age, errands, breath work, expand that by）。遇到文化词 balut 时主动用通俗方式解释，展示灵活 paraphrase 能力。6.0–6.5 考生通常只能循环 very important / very interesting / I like… 这类高频安全词。",
          "evidence": [
            "ever since this day and age has been evolving I like shopping online more",
            "I want to like expand that by going into like Pilates or yoga stretching just like a lot of like breath work things like that",
            "it's like an egg but it's like a fetus of a duck"
          ]
        },
        "grammar": {
          "score": 8.5,
          "why": "句法资源明显拉开档次：第二条件句（if I had more windows… that would make my house better）、强调句/分裂句（the reason why… is because…）、列举让步（be it A or B）、比较结构（in comparison to anybody else）、并列平行结构大量出现。少数小瑕疵（如 ever since this day and age has been evolving 的时态混合）以及个别填充造成的语法磨损，但都没影响清晰度。6.0–6.5 考生大多停留在 if it is… / because… / I like… 的简单复合句。",
          "evidence": [
            "if I had more windows in my house I feel like that would make my house better",
            "one thing that I would say about myself is I'm not afraid to try anything from any country in comparison to anybody else that I've met"
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "基于转写可推断：句重音落在实义词（BED, SUN, EVERY day）上，使用了自然的节奏群停顿（如在 ever since this day and age has been evolving 中的微停顿）；用 like / um 作为真实语用标记，而不是机械背稿痕迹。需要声明不确定性：纯文本无法判断元音质量、连读、个别音位（如 th, r/l）是否地道，但转写中未出现系统性的拼写异常（obssessed 疑为字幕笔误而非发音问题），整体节奏与重音分布符合清晰、可理解、有自然语调起伏的高分表现。",
          "evidence": [
            "I don't want to sound like I'm obsessed with my bed but my bed I like being in bed it's super soft",
            "every day I spend time with my friends be it going to the gym or even just running errands together"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "we like to share the same Hobbies the same music taste the same games and we like a lot of the same things",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "if I had more windows in my house I feel like that would make my house better",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "every day I spend time with my friends be it going to the gym or even just running errands together or just going for a drive",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "one thing that I would say about myself is I'm not afraid to try anything from any country in comparison to anybody else that I've met",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "考生可迁移做法1：把每个 Part 1 问题当『迷你 Part 2』，用『观点 + 一个原因 + 一个具体例子 + 一句收束』的四拍结构回答，例如示范中先点 bed，再补 super soft，最后过渡到 rocking chair。",
        "考生可迁移做法2：刻意练三组高复用句型——条件句（if I had…, that would make…）、列举让步（be it A or even B）、下定义（it's like X but it's like Y），这三组基本能撑起一半 Part 1 话题。"
      ]
    }
  },
  {
    "id": "yt-anuradha-p3-b9",
    "part": 3,
    "coversParts": [
      3
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "Band 9 Speaking Part 3 · Famous people",
    "prompt": "Part 3 discussion sample about famous people (Band 9).",
    "source": "https://www.youtube.com/watch?v=WVkeEFs1hUo",
    "sourceName": "IELTS Official-style sample",
    "score": 9.0,
    "duration": 321,
    "audioPath": "/audio/yt-anuradha-p3-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Official-style sample Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "we've been talking about a well-known person you like or admire and I'd like to discuss with you one or two more general questions related to this let's consider first of all famous people in your country so in Malaysia what kind of people become famous um in Malaysia definitely the politicians and also some actors and actresses are very famous among the among Malaysians uh so what about in the past is that the same as in the past were were politicians and actors and actresses always I think definitely in the past if you're talking about the ' 50s and 60s um movies were the number one communication tool between Villages or towns so the people definitely knew actors and actresses better than the politicians compared to now you have TV and news where people follow politicians personal life more than an actor or actress because in many cultures quite the opposite has happened where politicians used to be quite well known whereas nowadays movie stars television stars are more welln what do you think about in the future do you think that that's going to continue politicians will continue to be I think definitely in the future because the world is becoming more globalized Malaysians would have a I think have a tendency to be exposed to more International programs and they know more International celebrities compared to the local actors and actresses or local politicians so we would follow International politics maybe American or British politics or even the models or actresses internationally well let's talk about celebrity culture often famous people are used in advertisements can you give me some examples of that yeah um famous people like actors and actresses are used in advert advertisements and um as especially Sports celebrities like Tiger Woods or Roger fedra promoting sports equipment or sports shoes or clothes um other than that I think it's more models and actresses that sponsor perfume and clothes and and is that always true that um whatever profession they're involved in that's the kind of product that they tend to promote I don't think that's true because a lot of um celebrity support perfumes and support clothes where whereby actually it should be models that do it but isn't that that sort of glamorous kind of side of Hollywood that they can try to bring to the public I suppose that's what they're trying to do the marketing the the people who are marketing the product are trying to bring in the glamour that the that that celebrity holds um but yeah I suppose a celebrity do they do have that that grasp over you know people's mindset and what they should buy the consumerism now you're talking about their influence on the consumer what about on the young um do celebrities do you think produce negative effects in in our youth definitely I think they do as you can see like lifestyle and health you know celebrities are becoming thinner models and celebrities and when you open a magazine young girls would be exposed to thin models and they think that that's normal for them to be thin and that could cause them to go into anorexia bulimia or or unhealthy practices because they think being thin is a norm whil else being healthy and being normal bodied is actually the norm now what about young boys do you think that uh celebrities can have an influence on young boys I think most definitely um I think young boys could be influenced in a way materialistically like they would want the big car that you know the celebrities drive and they want the bling and they want all the cool gadgets and tools that there are out there and it could make boys realize that you know materialistic things are the only way to happiness now …",
    "analysis": {
      "overallComment": "该段 Part 3 示范在四个评分维度上都达到了接近 9.0 的水准。考生能够在长达约三分钟的讨论中持续输出长答案，用具体例子（如 Tiger Woods、Roger Federer）和历史/未来视角支撑抽象观点，并在考官追问时迅速切题、深化论证。少量自我修正（如 'advert advertisements'）和犹豫（'welln'、'um'）属于真实口语的自然特征，并未打断表达流，反而体现了自我监控能力，使整体表现仍稳居 Band 8.5–9.0 区间。",
      "whyHighScore": [
        "答题结构清晰：每条问题都先给立场（'I think definitely…'），再用历史/未来/跨文化视角或具体人名举例（'Tiger Woods or Roger Federer'、'anorexia bulimia'），对比 6.0–6.5 考生常见的'一两句简短回答+重复题干词'有质的飞跃。",
        "词汇灵活度高：能精准使用 glamorous、consumerism、materialistically、globalized、sponsor 等抽象与搭配词，并自然插入口语化标记（'the bling'、'cool gadgets'），词汇范围与精确度并重。",
        "语法广度自然展现：频繁使用定语从句（'the people who are marketing the product'）、条件/让步状语（'whereby actually it should be models that do it'）、对比结构（'compared to now'），复杂结构虽偶有小错但灵活度高。",
        "与考官互动真实：'now you're talking about their influence on the consumer'、'I suppose that's what they're trying to do' 显示考生在听、回应、拓展三个层次间游刃有余，符合 Part 3 双线讨论的要求。"
      ],
      "examinerTips": [
        "在 Part 3 答抽象题时，套用 '立场→时间/对比维度→具体例子' 三段式，可避免答非所问和短句堆叠，例如示范中 '50s 60s movies' 与 'now TV and news' 的对比。",
        "善用'纠正型'自我修正（self-repair）而非回避：示范中 'advert advertisements'、'welln' 后立即重述，是 7.5+ 考生区别于 6.0 考生的关键能力，证明说话人具备监控和重组语流的能力。"
      ],
      "listenExcerpts": [
        "I think definitely in the past if you're talking about the '50s and 60s um movies were the number one communication tool between Villages or towns so the people definitely knew actors and actresses better than the politicians compared to now",
        "the world is becoming more globalized Malaysians would have a I think have a tendency to be exposed to more International programs and they know more International celebrities compared to the local actors and actresses or local politicians",
        "the people who are marketing the product are trying to bring in the glamour that the that that celebrity holds um but yeah I suppose a celebrity do have that that grasp over you know people's mindset and what they should buy the consumerism",
        "young girls would be exposed to thin models and they think that that's normal for them to be thin and that could cause them to go into anorexia bulimia or or unhealthy practices because they think being thin is a norm whil else being healthy and being normal bodied is actually the norm"
      ],
      "listenTips": [],
      "practiceTips": [
        "在 Part 3 答抽象题时，套用 '立场→时间/对比维度→具体例子' 三段式，可避免答非所问和短句堆叠，例如示范中 '50s 60s movies' 与 'now TV and news' 的对比。",
        "善用'纠正型'自我修正（self-repair）而非回避：示范中 'advert advertisements'、'welln' 后立即重述，是 7.5+ 考生区别于 6.0 考生的关键能力，证明说话人具备监控和重组语流的能力。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 8.5,
        "lexical": 9.0,
        "grammar": 8.5,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 8.5,
          "why": "整体语流绵延，话题推进连贯，少有长时间停顿。出现 'advert advertisements'、'welln' 等自我修正和假启动，但考生迅速重整句法（self-repair），并未让考官产生'失语'印象。对比 6.0–6.5 考生常见的'短句+重复问题词+犹豫词堆叠'，本段明显在 sustained discourse 上高出一档。",
          "evidence": [
            "I think definitely in the past if you're talking about the '50s and 60s um movies were the number one communication tool between Villages or towns so the people definitely knew actors and actresses better than the politicians compared to now",
            "I think definitely in the future because the world is becoming more globalized Malaysians would have a I think have a tendency to be exposed to more International programs"
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "词汇范围宽（globalized、celebrity culture、consumerism、materialistically），搭配自然（'sponsor perfume and clothes'、'promote sports equipment'、'have that grasp over people's mindset'），并能根据话题在正式与口语化间自如切换（'the bling'、'cool gadgets'）。6.0–6.5 考生常停留在 good/bad、famous/rich 等基础形容词上。",
          "evidence": [
            "the people who are marketing the product are trying to bring in the glamour that the that that celebrity holds",
            "celebrities do have that that grasp over you know people's mindset and what they should buy the consumerism",
            "young boys could be influenced in a way materialistically like they would want the big car that you know the celebrities drive and they want the bling"
          ]
        },
        "grammar": {
          "score": 8.5,
          "why": "复杂结构多样：定语从句、对比比较级、原因状语、被动含义的 would-be 结构都出现且基本准确。少数失误如 'whereby actually it should be models that do it'（whereby 误用）、'Malaysians would have a I think have a tendency'（重整句）扣分，但整体灵活度仍高。6.0–6.5 考生多依赖简单句和 and/but 串联。",
          "evidence": [
            "in many cultures quite the opposite has happened where politicians used to be quite well known whereas nowadays movie stars television stars are more welln",
            "when you open a magazine young girls would be exposed to thin models and they think that that's normal for them to be thin and that could cause them to go into anorexia bulimia or or unhealthy practices"
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "仅凭转写只能做有限推断。句内重复标记（'the that that'、'advert advertisements'）显示考生会即时自我监控，节奏偏向自然连贯的 thought-group；未出现大段卡壳或回读。'welln' 推测是 well now 的截断，体现真实口语停顿。整体上 8.5 较稳妥，是否到 9.0 需听音频确认重音、语调、连读等特征。",
          "evidence": [
            "the people who are marketing the product are trying to bring in the glamour that the that that celebrity holds",
            "now you're talking about their influence on the consumer what about on the young um do celebrities do you think produce negative effects in in our youth"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "I think definitely in the past if you're talking about the '50s and 60s um movies were the number one communication tool between Villages or towns so the people definitely knew actors and actresses better than the politicians compared to now",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "the world is becoming more globalized Malaysians would have a I think have a tendency to be exposed to more International programs and they know more International celebrities compared to the local actors and actresses or local politicians",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "the people who are marketing the product are trying to bring in the glamour that the that that celebrity holds um but yeah I suppose a celebrity do have that that grasp over you know people's mindset and what they should buy the consumerism",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "young girls would be exposed to thin models and they think that that's normal for them to be thin and that could cause them to go into anorexia bulimia or or unhealthy practices because they think being thin is a norm whil else being healthy and being normal bodied is actually the norm",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "在 Part 3 答抽象题时，套用 '立场→时间/对比维度→具体例子' 三段式，可避免答非所问和短句堆叠，例如示范中 '50s 60s movies' 与 'now TV and news' 的对比。",
        "善用'纠正型'自我修正（self-repair）而非回避：示范中 'advert advertisements'、'welln' 后立即重述，是 7.5+ 考生区别于 6.0 考生的关键能力，证明说话人具备监控和重组语流的能力。"
      ]
    }
  },
  {
    "id": "yt-adv-how-b9",
    "part": 2,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "How to get Band 9 in IELTS Speaking",
    "prompt": "Teacher explanation with Band 9 speaking examples for Parts 1–3.",
    "source": "https://www.youtube.com/watch?v=9DTyINOeY-Y",
    "sourceName": "IELTS Advantage",
    "score": 8.5,
    "duration": 1308,
    "audioPath": "/audio/yt-adv-how-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Advantage Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "imagine walking into your I speaking test confident and prepared knowing no matter what happens you're going to get the I score that you need now picture walking out of the exam Center knowing that you have got the score that you deserve this might sound impossible but it's not I know this because I've helped thousands of students who are struggling just like you get a band seven8 or nine and in this video I'm going to take you on a journey and tell you exactly what band five and six students do differently from band s 7 8 and 9 students and these things that band 7 8 and N students do differently are easy and simple to learn you'll discover the hidden traps and common mistakes that trip up many students and learn the key techniques that could Skyrocket your score so if you're ready to go from fear and stress to just knowing exactly what to do on test day and having total confidence keep watching the video so the I speaking test has three parts so I've divided this page into three and we're going to compare what do Buy B five and six students do very very differently from ban S 8 and N students for parts one Parts two and parts three so let's start off with part one this is your opportunity to create a great first impression with the examiner and also and I think more importantly it allows you to relax into the test if you relax into the test in part one you're going to be much more relaxed and more fluent throughout the entire test so it is very very important that you get part one right so there are three things that Bond five and six students do differently from Bond Seven 8 and N9 students and I'd like you to look at this clip of two students answering the same question in part one and I want you to think about which one might be at about five or about six level and which one might be at about seven about 9 level um but really think why why are they at that level not that they sound more impressive or they have a better accent or they're using fancier words what are the things that you could copy or that you could stop doing that will really improve your score so I grew up in Dubai and it's actually one of the um most populated countries in the GCC um people come here to visit for tourism and uh it's actually a good spot for um uh to visit the largest uh the largest uh Tower it's called the B khif I'm from India to be specific I am born and raised in Delhi and my mom is from Bombay and my dad is from Kerala but I've grown up my entire life here in Delhi and I went to school here went to University here the first student is doing something that examiners are trained to spot this problem creates the worst first impression and could even get you about zero and it is memorized answers so why is this such a big problem well first of all the ielt test is not a memorization test it is testing your ability to communicate clearly in English not to memorize a bunch of sentences and repeat them to the examiner it's also considered cheating think about it this way if you really knew how to speak English to the level that you were trying to get to would you need to memorize answers no and it also lowers your score in two very very important ways it makes you sound worse listen to this clip and think about how memorization might have led to a low score I come from India …",
    "analysis": {
      "overallComment": "本段转写绝大部分是老师讲解，能被评分的只有两位 Part 1 考生对同一题的回答片段。来源标称 Band 8.5，主要对应那位用自然语调、自带细节延展的印度考生。考官给高分的核心不是用词有多高级，而是：没有背诵痕迹、停顿自然、能够围绕同一信息点不断延展（来自哪、家人来自哪、本人在哪长大、在哪上学），用 self-repetition + 轻量 self-correction 把答案撑出长度。",
      "whyHighScore": [
        "高分考生：能围绕一个核心信息点（自己的来源）自然延展四到五个小细节（delhi/bombay/kerala/学校/大学），展示出真实的 'extend an answer' 能力；低分考生则陷入背诵式短句 + 大量 um/uh 填充。",
        "高分考生：几乎没有 'um/uh' 类填充词，停顿是有意义的语义停顿（如 'to be specific' 前）；低分考生：'um most populated… uh uh to visit the largest uh the largest uh Tower' 自我重复加填充，是 5–6 分的典型 fluency 失分点。",
        "高分考生：用 'born and raised'、'grown up my entire life'、'to be specific' 这类自然搭配和语篇标记，展示地道词汇；低分考生：'most populated countries in the GCC' 听起来像百科词条，明显是提前准备好的。",
        "高分考生：时态切换有意识（am born and raised / I've grown up / I went），且没有语法错误；低分考生：句子结构单一（主谓宾反复循环），信息密度低。"
      ],
      "examinerTips": [
        "在 Part 1 不要背整句答案，而是背 '信息点'：例如准备 3–4 个可以围绕 'where you're from' 反复说的小细节（城市、家人来自哪、上学在哪），现场用 'to be specific / actually / and' 自然串起来，这样即使内容相似也不会被判背诵。",
        "刻意练习 'self-repetition without self-correction penalty'：把同一信息用不同说法再说一遍（如 'I've grown up my entire life here' 后再加 'I went to school here'），既延展答案长度，又展示 paraphrase 能力，是把 Fluency & Lexical 两项都推上 8 分的关键动作。"
      ],
      "listenExcerpts": [
        "I'm from India to be specific I am born and raised in Delhi and my mom is from Bombay and my dad is from Kerala",
        "but I've grown up my entire life here in Delhi",
        "I went to school here went to University here",
        "I grew up in Dubai and it's actually one of the um most populated countries in the GCC"
      ],
      "listenTips": [],
      "practiceTips": [
        "在 Part 1 不要背整句答案，而是背 '信息点'：例如准备 3–4 个可以围绕 'where you're from' 反复说的小细节（城市、家人来自哪、上学在哪），现场用 'to be specific / actually / and' 自然串起来，这样即使内容相似也不会被判背诵。",
        "刻意练习 'self-repetition without self-correction penalty'：把同一信息用不同说法再说一遍（如 'I've grown up my entire life here' 后再加 'I went to school here'），既延展答案长度，又展示 paraphrase 能力，是把 Fluency & Lexical 两项都推上 8 分的关键动作。"
      ],
      "claimedBand": 8.5,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 8.5,
        "lexical": 8.0,
        "grammar": 8.0,
        "pronunciation": 8.0
      },
      "scoringDetails": {
        "fluency": {
          "score": 8.5,
          "why": "答案从开篇到收束是一气呵成的自然叙述，没有 um/uh 类的非流利特征；停顿出现在 'to be specific' 之前，是功能性的、修辞性的停顿（让听者预期 '要补充细节'），不是犹豫。整段以 'I'm from India' 抛出主题，再层层加细节（本人 / 妈妈 / 爸爸 / 整个成长地 / 学校 / 大学），体现出成熟的 'topic development' 能力。低分考生则在一句话里自我重复 'the largest uh the largest uh Tower'，说明词汇调取失败 + 节奏崩坏，是典型的 5–6 分 fluency 表现。",
          "evidence": [
            "I'm from India to be specific I am born and raised in Delhi and my mom is from Bombay and my dad is from Kerala",
            "but I've grown up my entire life here in Delhi and I went to school here went to University here"
          ]
        },
        "lexical": {
          "score": 8.0,
          "why": "虽然用词没有 'paradigm / vibrant' 这类高分大词，但 'born and raised'、'grown up my entire life'、'to be specific' 都是英语母语者日常会用的搭配，paraphrasing 能力强（同义换 'raised/grown up'）。低分考生则把 'most populated countries in the GCC' 这样的百科式短语硬塞进个人回答，明显是模板化背诵。考官听到自然 collocation 通常会推上 8 分带。",
          "evidence": [
            "to be specific",
            "born and raised in Delhi",
            "grown up my entire life"
          ]
        },
        "grammar": {
          "score": 8.0,
          "why": "考生能在短答案里完成多种时态/结构的自然切换：'I am born and raised'（静态被动态表示出生地）、'I've grown up'（现在完成时表示持续状态）、'I went'（一般过去时谈上学经历）、'but' 引导转折。整段没有可被扣分的语法错误。低分考生几乎没有结构变化，基本是 'it's actually…' 反复套用同一个句型，信息靠堆名词短语推进，准确但不丰富。",
          "evidence": [
            "I am born and raised in Delhi",
            "but I've grown up my entire life here in Delhi and I went to school here went to University here"
          ]
        },
        "pronunciation": {
          "score": 8.0,
          "why": "仅凭转写只能做有限度推断。该段没有出现自我打断后的 'stumbling restart'，连读与弱读标记（'I'm'、'I've'）位置自然，重音落点（India / specific / Delhi / Bombay / Kerala）符合信息焦点递进的节奏，提示节奏与重音表现稳定；但缺乏音频，无法判断个别音段或语调是否百分百地道，因此保留 0.5 步进的不确定性，未直接给到 8.5。",
          "evidence": [
            "I'm from India to be specific",
            "I went to school here went to University here"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "I'm from India to be specific I am born and raised in Delhi and my mom is from Bombay and my dad is from Kerala",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "but I've grown up my entire life here in Delhi",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I went to school here went to University here",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I grew up in Dubai and it's actually one of the um most populated countries in the GCC",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "在 Part 1 不要背整句答案，而是背 '信息点'：例如准备 3–4 个可以围绕 'where you're from' 反复说的小细节（城市、家人来自哪、上学在哪），现场用 'to be specific / actually / and' 自然串起来，这样即使内容相似也不会被判背诵。",
        "刻意练习 'self-repetition without self-correction penalty'：把同一信息用不同说法再说一遍（如 'I've grown up my entire life here' 后再加 'I went to school here'），既延展答案长度，又展示 paraphrase 能力，是把 Fluency & Lexical 两项都推上 8 分的关键动作。"
      ]
    }
  },
  {
    "id": "yt-adv-guide-2026",
    "part": 1,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "Ultimate IELTS Speaking Guide 2026",
    "prompt": "Complete speaking guide with sample answers for Parts 1–3.",
    "source": "https://www.youtube.com/watch?v=HtR63JFVE5Y",
    "sourceName": "IELTS Advantage",
    "score": 8.5,
    "duration": 1884,
    "audioPath": "/audio/yt-adv-guide-2026.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Advantage Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "After watching this video, you walk into your IELTS Speaking exam knowing exactly what's coming and how to give strong answers in parts one, two, and three using the English skills you already have. These strategies help thousands of our students reach band seven, eight, or even nine. And I'm going to share them in this video. We'll start with part one at the beginning of your exam which you can fully predict. Yes, I've taken the IELTS exam seven times and it's always the same. And the former examiners I work with also confirm that in this part they basically read from a script. So let me take you through the beginning of your exam step by step. When you walk in, a quick hello or good morning is enough. You sit down, the examiner reads a short recorded statement. This exam is recorded, their name, the date, and so on. And then the identification questions begin. And one thing often surprises my students about these answers. So, let me take you through each question and answer. Can you tell me your full name, please? My name is Alexandra Brown. What shall I call you? Please call me Alex. Where are you from? I'm from Kazakhstan. Can I see your identification? Yes, of course. Here you are. Or here is my passport. So, two quick things to remember. Say your name exactly as it appears in your passport. Middle name included if it's in your passport and nothing added if it's not. And the question, where are you from? Well, it doesn't require a long answer. Remember, this is just to identify you. And the real exam questions that determine your score start in a second. So, this whole part takes about 30 seconds. And the cleaner you do it, the more time you save for the questions that actually matter. Part one of your IELTS speaking test lasts between four and five minutes and includes between 10 and 12 questions on three different topics. And the very first topic the examiner picks is one of four. So let me show you all of them. After the idea questions, the examiner says, \"Now in this first part, I'd like to ask you some questions about yourself. And your first topic will be one of these. Home, hometown, work or studies. You get a choice between work and studies depending on what you're doing. But the rest is picked for you. Let's go through four sample answers. Two for opening questions and two for follow-up questions. And each will teach you a specific thing that will help you improve your score. So for the topic of home, the opening question is, do you live in a flat or a house? And sometimes students answer with a single word, a house. It's correct, but it's too short. The examiner has nothing to assess. And the only extra question they can ask you is why. And if they keep on asking why, why, this isn't a great sign. So here is a simple way to handle it. You give your answer, you add a detail, and you briefly explain why yourself. So I live in a house with my family. We moved there a few years ago because our old flat was a bit too small. This answer is natural, complete, and it doesn't sound rehearsed, which is very important. You don't want the examiner to think you've learned your answers by heart. They have to sound natural. Now, work or studies. The opening question is, do you work or are you a student? And two things may weaken your answer. So, one is if your answer is too short, and we've just touched on that. And the other is if you prepare your answer so thoroughly and you really try to impress the examiner and you give …",
    "analysis": {
      "overallComment": "这段转写主体是 IELTS Advantage 老师的讲解而非考生作答，但其中穿插的 model answer（如关于 home 的回答）语言质量极高，老师本人在讲解中展示的英语也接近 Band 8.5–9 母语级输出。考生部分虽短，却呈现'完整自然+逻辑链清晰'的 Part 1 答题范式：先给直接答案，再补细节，最后用 because 给出原因，整体像即兴对话而非背诵。老师的语流中使用了大量复杂句、idiom 和自然衔接，且极少自我修正痕迹，因此按口语四项综合判定，整体表现落在 Band 8.0–8.5 区间。需要说明的是：老师讲解占主体，考官评分应聚焦在 model answer 段落。",
      "whyHighScore": [
        "答题结构完整自然：model answer 'So I live in a house with my family. We moved there a few years ago because our old flat was a bit too small.' 用 ANSWER + DETAIL + REASON 链条，与 6.0–6.5 考生只说 'A house.' 相比，给出考官可评估的语料。",
        "语法结构多样且准确：老师讲解中出现条件句、比较级、宾语从句、过去时切换等多种结构，例如 'the cleaner you do it, the more time you save for the questions that actually matter.'，体现 8+ 的语法广度；考生部分虽短，但 'because' 引导的原因状语从句使用准确，无语法错误。",
        "词汇地道、有搭配意识：'learn your answers by heart'（背诵）、'a bit too small'（用 softener 缓和语气）、'identification questions'、'two quick things to remember' 等搭配自然，与 6 分考生常说的 'very small' 或 'I study English' 形成层级差。",
        "衔接手段（Discourse markers）熟练：'So'、'And'、'But'、'Now'、'Well' 等标记频繁出现但不显刻意，如 'So, two quick things to remember.' 展现 Band 8+ 的自然逻辑组织能力。"
      ],
      "examinerTips": [
        "在 Part 1 短问题（yes/no 型）中，采用 '直接答案 + 1 句细节 + because 原因' 的三段微结构，既不像背诵，又比单词回答给考官更多语料，如 'I live in a house with my family. We moved there a few years ago because our old flat was a bit too small.'。",
        "把 'it doesn't sound rehearsed' 作为自检标准：每答完一句自问'如果我朋友这样说我会信吗？'，避免 'firstly… secondly… in conclusion' 等书面结构进入口语。"
      ],
      "listenExcerpts": [
        "So I live in a house with my family. We moved there a few years ago because our old flat was a bit too small.",
        "So, two quick things to remember. Say your name exactly as it appears in your passport.",
        "the cleaner you do it, the more time you save for the questions that actually matter.",
        "Yes, I've taken the IELTS exam seven times and it's always the same."
      ],
      "listenTips": [],
      "practiceTips": [
        "在 Part 1 短问题（yes/no 型）中，采用 '直接答案 + 1 句细节 + because 原因' 的三段微结构，既不像背诵，又比单词回答给考官更多语料，如 'I live in a house with my family. We moved there a few years ago because our old flat was a bit too small.'。",
        "把 'it doesn't sound rehearsed' 作为自检标准：每答完一句自问'如果我朋友这样说我会信吗？'，避免 'firstly… secondly… in conclusion' 等书面结构进入口语。"
      ],
      "claimedBand": 8.5,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 8.5,
        "lexical": 8.0,
        "grammar": 8.5,
        "pronunciation": 8.0
      },
      "scoringDetails": {
        "fluency": {
          "score": 8.5,
          "why": "考生 model answer 部分没有可见的停顿、自我修正或重复，听感连贯；老师讲解部分语流密集，使用 'So…And…But…' 衔接自然，无明显犹豫。整体节奏接近 Band 8.5 的'long-turn with minimal hesitation'特征。",
          "evidence": [
            "So I live in a house with my family. We moved there a few years ago because our old flat was a bit too small.",
            "So, two quick things to remember. Say your name exactly as it appears in your passport."
          ]
        },
        "lexical": {
          "score": 8.0,
          "why": "出现 idiom 'learn by heart'、softener 'a bit too'、搭配 'identification questions'、'the real exam questions' 等；用词有变化但不堆砌生僻词，符合 Band 8 'uses a wide vocabulary with flexibility'。考生 Part 1 短答部分词汇虽简，但 'moved there'、'old flat' 等选择地道；老师讲解中 'weakens your answer'、'fully predict'、'taken the IELTS exam seven times' 显示较强搭配意识。",
          "evidence": [
            "learned your answers by heart",
            "a bit too small",
            "identification questions"
          ]
        },
        "grammar": {
          "score": 8.5,
          "why": "model answer 'We moved there a few years ago because our old flat was a bit too small.' 同时使用过去时与 because 引导的原因状语从句，结构紧凑无错。讲解段落中条件句（'if your answer is too short…'）、比较级 + 定语从句（'the cleaner you do it, the more time you save for the questions that actually matter'）、并列与从属混合结构大量出现，且保持高准确度，符合 Band 8–9 'produces a majority of error-free sentences' 特征。",
          "evidence": [
            "We moved there a few years ago because our old flat was a bit too small.",
            "the cleaner you do it, the more time you save for the questions that actually matter.",
            "if it's in your passport and nothing added if it's not"
          ]
        },
        "pronunciation": {
          "score": 8.0,
          "why": "基于转写推断存在一定不确定性：考生 model answer 极短、老师讲解中句间分隔（如 'So…' 单独起句、'Now in this first part…'）暗示自然的意群切分与适度的节奏控制；未出现明显自我修正或卡顿，符合 Band 8 'uses a wide range of pronunciation features' 的听感预期。无法从文本判断个体音段、重音或语调曲线，因此分数有 0.5 的不确定区间。",
          "evidence": [
            "So I live in a house with my family.",
            "And then the identification questions begin."
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "So I live in a house with my family. We moved there a few years ago because our old flat was a bit too small.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "So, two quick things to remember. Say your name exactly as it appears in your passport.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "the cleaner you do it, the more time you save for the questions that actually matter.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "Yes, I've taken the IELTS exam seven times and it's always the same.",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "在 Part 1 短问题（yes/no 型）中，采用 '直接答案 + 1 句细节 + because 原因' 的三段微结构，既不像背诵，又比单词回答给考官更多语料，如 'I live in a house with my family. We moved there a few years ago because our old flat was a bit too small.'。",
        "把 'it doesn't sound rehearsed' 作为自检标准：每答完一句自问'如果我朋友这样说我会信吗？'，避免 'firstly… secondly… in conclusion' 等书面结构进入口语。"
      ]
    }
  },
  {
    "id": "yt-adv-ca7-b9",
    "part": 1,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "IELTS Speaking Test · Perfect Band 9 (long)",
    "prompt": "Full-length Band 9 speaking demonstration.",
    "source": "https://www.youtube.com/watch?v=CA7b8z-gKQA",
    "sourceName": "IELTS Advantage",
    "score": 9.0,
    "duration": 1276,
    "audioPath": "/audio/yt-adv-ca7-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Advantage Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "Let's start off by talking about your job. Do you work or do you study? No, I work. I work as an auditor. So, I studied accounting and I started as a bookkeeper and now I work as an auditor. Do you like your job? Uh I do like it, but it has its uh challenges. It's uh a very demanding job in my opinion. So, uh it's fun because uh you get to learn a lot about the company you're working with and you get exposed to a lot of businesses, especially if you work in uh an accounting firm. Uh so, I would say that's my favorite thing about my job. And my least favorite could be that it's uh very demanding. So, you work long hours. Busy season is not easy. You need to remember why you started to be able to continue. Uh other than that, uh you meet a lot of people, you make friends, uh you have a lot of different clients. So, it's pretty good. Did you always want to be an auditor? To be honest, no. I usually look at people who know what they want to do from day one as lucky. I wasn't one of these people. Uh it only happened by chance, I would say. I went uh into uh university. Uh I took an accounting class, uh financial uh accounting. I did really well. I got the highest grade. So, when they called me out to see like who that person was, I was really happy about it and proud and I decided to switch to accounting. I didn't know what that is or what it meant to be completely honest in details, like what would my day-to-day job or work look like. I did not know unless I until I started working. If you could do any other career, what would it be? So, there's a lot of things that I enjoy doing. Two main things. The first one is uh I love kids. So, I love working with kids. And the second one would be something related to coaching and helping people around me. Now, let's talk about where you live. Can you tell me about the kind of accommodation you live in? So, I currently live in an in an apartment. Uh three bedroom. It's has a big windows. That was my most important point when I chose the place. I have light furniture. I like everything to be light and uh you know, just open. I like to wake up and see light furniture and sun and you know, that's what makes me happy. Does your place have any amenities around it? Uh it does have, yes. It has everything. So, we have a swimming pool, we have a gym, uh we have a park right in front of our building. Um that's what I can remember and that's what I usually use. Is there anything you would like to change about the place where you live? Yes. So, I know I said we have a gym, but it's not exactly the type of gym I would like. So, maybe some people would think it's something minimal, but I cannot work out without a big mirror in front of me. I need to see how my form is. I feel more comfortable. So, there's no mirror. It's a bit small. So, I would change these two things, definitely. And do you plan to live there for a long time? No, our plan is to stay there for until the end of the year and then we'll move to a different place. Now, let's talk about animals. Do you like animals? I love animals. I love dogs. I like cats because I'm allergic to them. So, since day one, I always had a problem when um near a cat or I see one. Uh I love all types of animals. I love elephants, um giraffes, cows, monkeys, all of them. But, my favorite I love dogs. They're my number one. Did you have a pet when you were a child? Just jumping in to give you our free gift. We analyzed hundreds of band 789 speaking performances and we analyzed the vocabulary. We've put all the best words, phrases, idioms into one PDF for you. If you would like that, go to the description, click on the link. It's our gift to you. You can download it 100% for free. No, I only Yes, I had What was it called? It's a type of bird. I forgot the exact name of the type of the bird of bird, but yes, I had a bird and I had fish at some point. They're not really You can't really play with them, but I had two at some point. Now, let's talk about friends. Can you describe your best friend? Uh my best friend. Yes, of course. So, uh we've been friends for I don't know how many years now, so maybe 15 years or more. Uh She's a She's a very loyal friend. She's a loyal uh very nice, kind, thoughtful. She's always been there for me. Whenever I needed her with the honest opinion, whether it's good or bad. Loyal, number one. What type of people do you most commonly make friends with? What are their their traits, their …",
    "analysis": {
      "overallComment": "这段示范整体表现非常出色，但需特别说明：转写中夹杂了一段明显是 YouTube 频道主插播的推广语（\"Just jumping in to give you our free gift...\"），并非考生作答，评分时必须剔除。剔除后，考生本人口语扩展充分、衔接自然、词汇与语法均达到 Band 8.0–8.5 的稳定水准；但个别明显语法错误（如 \"It's has a big windows\"、\"when near a cat\"）和\"loyal\"等关键词的重复，使其难以稳定到 9.0。来源标称的 9.0 更像是频道营销话术，而非严格按官方评分尺度得出的结论；按本人推断，该考生真实分数更接近 8.5。",
      "whyHighScore": [
        "扩展策略成熟：考生不只回答问题，而是习惯性地补足原因、对比与细节（如解释最不喜欢工作的部分、再补一个转折\"other than that\"），比 6.0–6.5 段常见的一句话答完强很多。",
        "语篇组织清晰，逻辑连接自然：使用\"So…\"、\"To be honest…\"、\"And my least favorite could be that…\"等显性衔接，把回答切成有结构的段落，考官能轻松跟上。",
        "词汇选择多样且具精准度：能用 happened by chance、from day one、called me out、exposed to a lot of businesses、work out、form（健身动作姿态）等搭配，避免了 6 分段常见的\"very good / very much like\"式泛化词。",
        "敢于使用复杂结构并保持可理解度：whenever 引导的让步状语、whether 引导的让步状语、过去-现在混合叙事等都被自然地嵌入回答，而不是死背模板。"
      ],
      "examinerTips": [
        "用\"先说态度，再展开原因/对比/举例\"的三明治结构回答 Part 1，避免一句话结束；本示范中\"最不喜欢 vs 还行\"的对比可直接迁移。",
        "刻意准备 8–12 个本话题的高阶搭配（happened by chance、from day one、exposed to、demanding 等）并自然嵌入回答，比临时堆叠 big words 更有效。",
        "允许自己出现 1–2 次自然停顿与自我修正，但要在停顿后立刻继续讲完整观点——这比刻意消除所有\"uh\"更像真实高分考生。"
      ],
      "listenExcerpts": [
        "I usually look at people who know what they want to do from day one as lucky. I wasn't one of these people. It only happened by chance, I would say.",
        "You need to remember why you started to be able to continue.",
        "I cannot work out without a big mirror in front of me. I need to see how my form is. I feel more comfortable.",
        "She's a very loyal friend. She's loyal, very nice, kind, thoughtful. She's always been there for me. Whenever I needed her with the honest opinion, whether it's good or bad."
      ],
      "listenTips": [],
      "practiceTips": [
        "用\"先说态度，再展开原因/对比/举例\"的三明治结构回答 Part 1，避免一句话结束；本示范中\"最不喜欢 vs 还行\"的对比可直接迁移。",
        "刻意准备 8–12 个本话题的高阶搭配（happened by chance、from day one、exposed to、demanding 等）并自然嵌入回答，比临时堆叠 big words 更有效。",
        "允许自己出现 1–2 次自然停顿与自我修正，但要在停顿后立刻继续讲完整观点——这比刻意消除所有\"uh\"更像真实高分考生。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 8.5,
        "lexical": 8.0,
        "grammar": 8.0,
        "pronunciation": 8.0
      },
      "scoringDetails": {
        "fluency": {
          "score": 8.5,
          "why": "语速稳定，停顿多为思考性自然停顿（uh / you know），而非卡壳性停顿；自我修正能完成修复（\"I forgot the exact name of the type of the bird of bird\"），且能立刻继续话题；回答长度普遍达到 Part 1 中等偏长水平，远超 6.0–6.5 段常见的一两句。考官听到的是\"说话像在聊天，不像在背稿\"，因此流利度分项可稳到 8.5。",
          "evidence": [
            "you get to learn a lot about the company you're working with and you get exposed to a lot of businesses, especially if you work in an accounting firm.",
            "I forgot the exact name of the type of the bird of bird, but yes, I had a bird and I had fish at some point."
          ]
        },
        "lexical": {
          "score": 8.0,
          "why": "词汇多样，能用 happen by chance、from day one、called me out、exposed to a lot of businesses、demanding、busy season、amenities、form（健身用法）等较地道的搭配；话题词与评价性形容词搭配得当。扣分点：\"loyal\"在三句话内重复三次，反映同义替换能力稍弱；个别搭配略显生硬（如\"with the honest opinion\"应为\"with an honest opinion\"或\"for an honest opinion\"）。整体仍属 Band 8 段稳定表现。",
          "evidence": [
            "I usually look at people who know what they want to do from day one as lucky. I wasn't one of these people. It only happened by chance, I would say.",
            "I cannot work out without a big mirror in front of me. I need to see how my form is."
          ]
        },
        "grammar": {
          "score": 8.0,
          "why": "结构多样：含定语从句（\"the company you're working with\"）、让步状语（\"whether it's good or bad\"）、原因/结果（\"So, when they called me out to see like who that person was, I was really happy about it and proud and I decided to switch to accounting\"）。但出现典型 8 分段边缘错误：主谓一致失误\"It's has a big windows\"、缺动词/代词\"when near a cat or I see one\"、介词搭配错误\"with the honest opinion\"。这些错误偶尔出现但不影响理解，因此语法分项稳定在 8.0，难以稳到 9.0（9 分要求\"errors extremely rare\"）。",
          "evidence": [
            "you get exposed to a lot of businesses, especially if you work in an accounting firm.",
            "It's has a big windows. That was my most important point when I chose the place."
          ]
        },
        "pronunciation": {
          "score": 8.0,
          "why": "仅依据转写可做的推断有限，需标明不确定性。转写显示节奏自然、意群停顿合理（多以逗号级停顿切分小句），自我修正处（\"of bird of bird\"）显示考生能感知并修复问题，未出现明显背稿式平调。但\"It's has a big windows\"中的多余 s 也可能是语音层面的滑入/重复，与其节奏控制相符；整体可推测为清晰、连贯、不影响理解的发音，约 8.0，无法证实 9.0 所要求的\"全段轻松掌控语音特征\"。",
          "evidence": [
            "I forgot the exact name of the type of the bird of bird, but yes, I had a bird and I had fish at some point.",
            "I love elephants, giraffes, cows, monkeys, all of them. But, my favorite I love dogs. They're my number one."
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "I usually look at people who know what they want to do from day one as lucky. I wasn't one of these people. It only happened by chance, I would say.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "You need to remember why you started to be able to continue.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I cannot work out without a big mirror in front of me. I need to see how my form is. I feel more comfortable.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "She's a very loyal friend. She's loyal, very nice, kind, thoughtful. She's always been there for me. Whenever I needed her with the honest opinion, whether it's good or bad.",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "用\"先说态度，再展开原因/对比/举例\"的三明治结构回答 Part 1，避免一句话结束；本示范中\"最不喜欢 vs 还行\"的对比可直接迁移。",
        "刻意准备 8–12 个本话题的高阶搭配（happened by chance、from day one、exposed to、demanding 等）并自然嵌入回答，比临时堆叠 big words 更有效。",
        "允许自己出现 1–2 次自然停顿与自我修正，但要在停顿后立刻继续讲完整观点——这比刻意消除所有\"uh\"更像真实高分考生。"
      ]
    }
  },
  {
    "id": "yt-adv-ywq-b9",
    "part": 1,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "IELTS Speaking Test · Perfect Band 9",
    "prompt": "Another full Band 9 speaking test sample.",
    "source": "https://www.youtube.com/watch?v=YWqU_QwCYCQ",
    "sourceName": "IELTS Advantage",
    "score": 9.0,
    "duration": 794,
    "audioPath": "/audio/yt-adv-ywq-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Advantage Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "Let's talk about travel. Tell me about the last place that you went to. The last place that I traveled to was Thailand, Bangkok to be specific. Um big city, but also has um places that are close by that you can travel to that are not cities. It's more countryside or nature like Krabi. Um one of my favorite countries in the world. It has the best food, the best people, quite multicultural, and uh just fun experiences. It has something for everyone, whether you're a man, woman, old, young. Um you can find something to do in a city like Bangkok or in a country like Thailand. So, would you prefer a city break or a beach holiday? Definitely a beach holiday because um I grew up in a city, and although it has its perks, I feel like sometimes it can be too much. So, when I like to get away, it's definitely to something that's more nature and hence a beach holiday. Sun, sand, the ocean, peace, quiet, the slow life is definitely something that I like to get away to. Is there anywhere you haven't been yet that you would love to go to? Several places. Istanbul, Turkey, is at the top of that list. I haven't been to the Philippines. I'd really like to go to the Philippines. Um yeah, um yeah, very many places that I I haven't been to. I'm a I'm a huge fan of uh different cultures. So, any chance that I get, I'm excited to get out of my hometown and go visit other places. Now, let's talk about the future. In 10 years' time, what job would you like to have? I would like to have my own business. I'm a closeted entrepreneur. So, um and it's always been my dream to be able to have a business of my own. Um hopefully in the home design buying and selling space. Uh I have a passion for interior design on the on a separate note. But yes, uh a businesswoman is definitely something that I hope I'm able to be in the next 10 years. And will English be useful in your future career? Yes. Uh where I come from, English is a very commonly spoken language and the places that I see myself living in, uh English is the official language. So, English would not only be useful, it would be necessary for me specifically. So, yes. And in your future career, would you like to travel a lot or would you like to be in one location? I think when I have children, I will slow down the traveling a little bit just to have some structure and uh a feeling of groundedness in their lives, especially when they're younger. But up until then, in the near future, because I don't have any children at the moment, um I would love to travel as much as possible. So, a bit of both, I would say. How do you think your life will change over the coming 5 to 10 years? I don't know about how it would change, but I know how I want it to change. I would like to get married. I would like to start a small family, and by small I mean have three daughters. Um that's big to some people. Uh I would like to start a business of my own. And I would like to retire my parents and see them uh take care of their health and grow older in a safe place. And um yeah, and just be healthy, happy, wiser, hopefully. Now, let's talk about social media. Which social media sites do you use the most? Um Before we continue, I have a gift for you. I've analyzed hundreds of band nine transcripts from our successful VIP students and I put the 100 most used words into a PDF for you. If you want that, go to the description or the pinned comment. You can download it for free. Instagram. It's my most frequently used. I think it's the only one unless YouTube counts as social media, which in that case YouTube as well. And how much time do you spend on those social media sites? It depends on the day. So, on busy days when I'm working, I don't get a chance to spend too long on my phone or any social media in general. And then on the weekend when I'm rotting on my couch, uh I can doom scroll for sometimes a couple hours. What kind of information do you feel comfortable and uncomfortable putting on social media? I feel uncomfortable posting anything any personal information. So, I don't like posting anything about my family, about my relationships, about too much about my friendships. I'm just not somebody I'm private, so I don't like to post too much about it on social media, but um if it's something related to work, something that I can benefit off of using using social media to promote something or promote something that my friend's doing or you know, just get more eyeballs on something, um I'm happy to post that on social media. And is there anything that you dislike about social media? Yes, very many things. I think sometimes social media can have a very negative effect on your mental health. Sometimes …",
    "analysis": {
      "overallComment": "这段转写在四项评分标准上整体接近 Band 9.0。考生展现出持续的长轮作答能力、丰富的惯用搭配、灵活的语法结构与自然的自我修正。需要特别说明：转写中段出现了一段明显的后期插入推广话术（'I have a gift for you...'），并非考生作答内容，评判时应剔除。即便剔除后，考生在内容深度、用词地道度、句式多样性、语篇衔接四个维度均显示出高级口语特征，符合官方对 Band 8.5–9.0 的描述语。考生并未背诵模板化答案，而是用真实细节（'have three daughters'、'rotting on my couch'、'retire my parents'）支撑观点，这是与 6.0–6.5 考生最显著的差异。",
      "whyHighScore": [
        "真实自然的流利度：考生全程保持长轮输出，却并未因追求流利而牺牲内容；填充词 'um/uh' 使用频率自然，与刻意背诵的'无停顿流利'形成对比。低分考生常因追求流畅而出现填空式停顿或背稿痕迹。",
        "词汇搭配深度与地道性：使用 'doom scroll'、'retire my parents'、'get more eyeballs on something'、'the slow life' 等地道的当代搭配与习语，而非 6 分档常见的 'big city'、'good food' 等基础描述性词汇。",
        "语法多样且错误极低：考生自如使用让步状语从句 ('whether you're a man, woman, old, young')、并列结构、名词性补语等复杂句式，错误多为可忽略的口语小失误，不影响沟通。",
        "内容具体且有个人视角：考生围绕个人生活给出具体细节（'I grew up in a city'、'I don't have any children at the moment'、'I would like to have three daughters'），而非泛泛而谈。低分考生常因思路枯竭而重复或说空话。"
      ],
      "examinerTips": [
        "背熟话语标记词的真实使用方式：'So'、'But yes'、'And um yeah' 等应作为思考与衔接的桥梁，而非机械地堆砌在句首。模仿时注意它们出现在自然的位置。",
        "用具体个人细节替代空泛观点：与其说 'I like travelling'，不如说 'when I'm rotting on my couch, I can doom scroll for sometimes a couple hours'。细节密度是高分与中分最直观的差距。",
        "允许并善用自我修正：考场上说出 'I don't know about how it would change, but I know how I want it to change' 这样的自我修正，比假装流利更能拿到高分，因为它显示考生具备监控语言输出的能力。",
        "扩充当代搭配与习语：除了 'enjoy'、'like'、'very much'，尝试在合适语境使用 'doom scroll'、'retire my parents'、'the slow life'、'get eyeballs on' 等更地道的表达，可显著提升 Lexical Resource 分数。"
      ],
      "listenExcerpts": [
        "I don't know about how it would change, but I know how I want it to change.",
        "It has something for everyone, whether you're a man, woman, old, young.",
        "I can doom scroll for sometimes a couple hours.",
        "I would like to retire my parents and see them uh take care of their health and grow older in a safe place."
      ],
      "listenTips": [],
      "practiceTips": [
        "背熟话语标记词的真实使用方式：'So'、'But yes'、'And um yeah' 等应作为思考与衔接的桥梁，而非机械地堆砌在句首。模仿时注意它们出现在自然的位置。",
        "用具体个人细节替代空泛观点：与其说 'I like travelling'，不如说 'when I'm rotting on my couch, I can doom scroll for sometimes a couple hours'。细节密度是高分与中分最直观的差距。",
        "允许并善用自我修正：考场上说出 'I don't know about how it would change, but I know how I want it to change' 这样的自我修正，比假装流利更能拿到高分，因为它显示考生具备监控语言输出的能力。",
        "扩充当代搭配与习语：除了 'enjoy'、'like'、'very much'，尝试在合适语境使用 'doom scroll'、'retire my parents'、'the slow life'、'get eyeballs on' 等更地道的表达，可显著提升 Lexical Resource 分数。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 9.0,
        "grammar": 8.5,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "考生语速适中、停顿自然，能持续输出 30 秒以上的长轮回答而无明显卡壳；自我修正处理成熟，'Um' 出现位置合理（多为思考而非找词），显示出真实的语言产出能力而非背诵痕迹。语篇衔接标记使用恰当：'So'、'But yes'、'And um yeah' 等使逻辑过渡自然。",
          "evidence": [
            "I don't know about how it would change, but I know how I want it to change.",
            "So, a bit of both, I would say.",
            "Definitely a beach holiday because um I grew up in a city, and although it has its perks, I feel like sometimes it can be too much."
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "词汇覆盖面广、搭配自然地道，并使用了多个当代口语习语与低频精确词。'Doom scroll'（无意识刷屏）、'retire my parents'（让父母退休/供养父母）、'closeted entrepreneur'（隐藏的创业者）、'get more eyeballs on something'（吸引关注）等表达显示出对英语当代用法与文化语境的深度掌握。形容生活节奏使用 'the slow life' 也属精准选词。",
          "evidence": [
            "I can doom scroll for sometimes a couple hours.",
            "I would like to retire my parents and see them uh take care of their health.",
            "I'm a closeted entrepreneur.",
            "just get more eyeballs on something"
          ]
        },
        "grammar": {
          "score": 8.5,
          "why": "考生自如使用多种复杂结构：让步状语从句 ('whether you're a man, woman, old, young')、并列名词性补语 ('be healthy, happy, wiser')、条件/时间状语 ('when I have children')、宾语从句等。整体错误率低，仅出现几处口语中可忽略的小瑕疵：'for sometimes a couple hours' 中 'sometimes' 位置略不规范、'I'm private, so I don't like to post too much about it on social media' 中双重 'about' 结构稍显冗余。这些都不影响沟通，但未达完美的 9.0 准确度。",
          "evidence": [
            "It has something for everyone, whether you're a man, woman, old, young.",
            "and just be healthy, happy, wiser, hopefully.",
            "I think when I have children, I will slow down the traveling a little bit just to have some structure and uh a feeling of groundedness in their lives."
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "仅依据转写难以准确评估发音音质，但可观察到以下推断特征（带不确定性）：考生停顿位置多在短语边界而非词中，说明节奏感良好；自我修正 'I'm a I'm a huge fan' 属于真实口语中的句中重启现象，反而显示出自然的口语节奏；'uh' 在句末使用较少，多为思考性停顿，未出现影响理解的明显失误。无法判断其个体音素是否完全无误，故保守给 8.5。",
          "evidence": [
            "I'm a I'm a huge fan of uh different cultures.",
            "Um big city, but also has um places that are close by that you can travel to that are not cities."
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "I don't know about how it would change, but I know how I want it to change.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "It has something for everyone, whether you're a man, woman, old, young.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I can doom scroll for sometimes a couple hours.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I would like to retire my parents and see them uh take care of their health and grow older in a safe place.",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "背熟话语标记词的真实使用方式：'So'、'But yes'、'And um yeah' 等应作为思考与衔接的桥梁，而非机械地堆砌在句首。模仿时注意它们出现在自然的位置。",
        "用具体个人细节替代空泛观点：与其说 'I like travelling'，不如说 'when I'm rotting on my couch, I can doom scroll for sometimes a couple hours'。细节密度是高分与中分最直观的差距。",
        "允许并善用自我修正：考场上说出 'I don't know about how it would change, but I know how I want it to change' 这样的自我修正，比假装流利更能拿到高分，因为它显示考生具备监控语言输出的能力。",
        "扩充当代搭配与习语：除了 'enjoy'、'like'、'very much'，尝试在合适语境使用 'doom scroll'、'retire my parents'、'the slow life'、'get eyeballs on' 等更地道的表达，可显著提升 Lexical Resource 分数。"
      ]
    }
  },
  {
    "id": "yt-adv-acwp-b9",
    "part": 1,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "IELTS Speaking Test · Perfect Band 9",
    "prompt": "Extended Band 9 speaking performance.",
    "source": "https://www.youtube.com/watch?v=-AcwpQsrUUs",
    "sourceName": "IELTS Advantage",
    "score": 9.0,
    "duration": 1491,
    "audioPath": "/audio/yt-adv-acwp-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Advantage Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "Let's start off by talking about your work or your studies. Do you work or study? I work. Um I studied architecture for 5 years and now I work um in the research department um particularly focusing on urban planning. Um so in a way it's a little bit uh different from my background in architecture, but it still gave me the basics to be able to do what I do today. What was your favorite aspect of your degree? Um I think it's a very creative degree in the sense that you get to learn so many skills at the same time. You get to do a little bit of drawing, a little bit of creative thinking, a little bit of uh model making. Uh so in that way it really makes you a one full rounded person. Um and um I think that's probably is the thing that I'm most grateful for throughout my my studies. If you could go back in time and do a different degree, what would it be? I actually thought about that a lot. Um I think I always was a little bit more uh uh less creative oriented and more technical oriented. So um I would have loved to do anything related to research in the biomedicine area or the um I I at some point even thought of doing some engineering degrees. So something maybe a little bit less creative and more um logical logical mindset oriented uh discipline. Do you think that you will ever do a postgraduate degree in the future? I have done my masters already in architecture itself. If you're asking about a PhD, I think for my particular discipline it's a little hard to do a PhD in architecture um simply because again it's it's more of a creative endeavor. So um and a PhD is more of a research oriented. So unless you try to find a good um research topic in architecture um that I would definitely do it. Uh until then I don't really feel the need to do it just for the sake of doing it. Now let's talk about your home. Do you live in an apartment or a house? I live in a studio apartment here, but back home where my family is, we live in like a slightly bigger apartment, a three-bedroom apartment. So, yeah. I actually never lived in houses. I'm definitely more of an apartment apartment person. And can you describe your family home? Yes. So, it's actually a rather spaced even spaced apartment in the sense that it has all the living rooms and all the common spaces are large enough that we can gather in it and have guest without any issues. We have three bedrooms, two bathrooms, and a very nice terrace area that actually has a very beautiful panoramic view of the city and a little bit of a garden area, too. So, very very grateful for the house. It's been the the house that I lived in since I was four. So, it's a little bit run down around the edges, but still I feel very nostalgic every time I go back. Is it a traditional house compared to other houses in your country? Just jumping in to give you our free gift. We analyzed hundreds of Bun 789 speaking performances and we analyzed the vocabulary. We've put all the best words, phrases, idioms into one PDF for you. If you would like that, go to the description, click on the link. It's our gift to you. You can download it 100% for free. I would have loved for it to be a traditional house. Traditional houses are back in my country at least very beautifully ornamented, very beautiful colors, all of these riads and all of these things, but no, it's a definitely more typical modern apartment. So, no, not not in that sense. Can you describe your dream home? Yes. So, my dream home actually always was for it to be as traditional as possible going back to your previous question. I always wanted to imbue some of my roots um in my house. So, ideally, I would love for it to have all of the colors that I was talking about, the beautiful blue bright colors, um all of the patterns, and all of the it has a very specific layout in that you have the the the garden area in the middle, and all of the other rooms around it. So, I think that makes it very um ga- family gathering-oriented in that sense. Um some some something like that would have would be ideal for me, but we'll see how the future what the future brings. Now, let's talk about family gatherings. In your country, what are the most common times of year where families gather together? I would say is um all of the Muslim national holidays. So, both Eids, um the Eid after Ramadan, and the second Eid. Those are common in all Arab Muslim countries. Um other than that, the typical New Year's, um and our birthdays we try to celebrate together, um but that's not really cultural, that's more of of our family uh traditions. Um so, yeah, uh all of these. And what food do you normally serve at a family gathering? It depends on the event. So, …",
    "analysis": {
      "overallComment": "这段转写整体呈现接近 Band 9 的水准：考生能在 1-2 句简短回答后主动延伸，给出理由、对比和具体细节，语流自然、自我修正不影响表达。需要说明的是，转写中段『Just jumping in to give you our free gift…』属于频道插入的促销话术，并非考生作答，分析时应剔除。其余内容是真实考生口答。语法虽偶有极轻微失误（如『probably is』），但仍属自然口语中的可接受范畴，不影响高分判断。",
      "whyHighScore": [
        "答案长度与延伸能力远超 6.0-6.5 考生的『短答+停』模式：每题都能给出至少 3-4 句的展开，附加解释、对比或个人偏好，使考官无需追问也能完成评估。",
        "词汇以『同义改写+精准搭配』替代基础词堆砌：低分考生会用 big / nice / like 等万能词，高分考生会主动用 panoramic view, ornamented, imbue, endeavor 等。",
        "句法结构多样且自然：低分考生常停留在 SVO 简单句，高分考生会自发产出条件句、让步状语、同位语从句，并伴随合理的自我修正。",
        "语篇衔接意识强：使用 So, Actually, In that sense, Other than that, Unless 等显性或隐性连接手段，让逻辑链清晰；不像 6 分段常出现『说一句停一下』的断裂感。"
      ],
      "examinerTips": [
        "每题至少给出『观点+原因+一个具体细节（数字、例子、个人经历）』三件套，避免用 1-2 句短答收尾——这是 6.0-6.5 与 8.0+ 考生的最直接分水岭。",
        "主动准备一组『精准小词』替代万能词：用 ornamented / imbue / nostalgic / endeavor 替代 beautiful / put / happy / try，能立刻拉升 Lexical Resource 评分印象。",
        "把自我修正当作正常节奏：高分考生会边说边纠（logical logical），但 6 分考生一旦卡壳会长时间沉默或直接放弃；练时重点训练『快速重述、不中断逻辑链』的能力。"
      ],
      "listenExcerpts": [
        "I would have loved for it to be a traditional house. Traditional houses are back in my country at least very beautifully ornamented, very beautiful colors, all of these riads and all of these things, but no, it's a definitely more typical modern apartment.",
        "I always wanted to imbue some of my roots um in my house. So, ideally, I would love for it to have all of the colors that I was talking about, the beautiful blue bright colors, um all of the patterns.",
        "It's a little bit run down around the edges, but still I feel very nostalgic every time I go back.",
        "If you're asking about a PhD, I think for my particular discipline it's a little hard to do a PhD in architecture um simply because again it's it's more of a creative endeavor. So um and a PhD is more of a research oriented."
      ],
      "listenTips": [],
      "practiceTips": [
        "每题至少给出『观点+原因+一个具体细节（数字、例子、个人经历）』三件套，避免用 1-2 句短答收尾——这是 6.0-6.5 与 8.0+ 考生的最直接分水岭。",
        "主动准备一组『精准小词』替代万能词：用 ornamented / imbue / nostalgic / endeavor 替代 beautiful / put / happy / try，能立刻拉升 Lexical Resource 评分印象。",
        "把自我修正当作正常节奏：高分考生会边说边纠（logical logical），但 6 分考生一旦卡壳会长时间沉默或直接放弃；练时重点训练『快速重述、不中断逻辑链』的能力。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 9.0,
        "grammar": 8.5,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "语流几乎没有不自然的中断；『um / uh』被当作思考标记而非卡顿，节奏自然。自我修正迅速完成，不破坏表达。答案间衔接顺畅，主题推进有层次（先说事实→补充背景→给个人感受），符合 Band 9 对『sustained fluent speech with natural pausing』的描述。",
          "evidence": [
            "I work. Um I studied architecture for 5 years and now I work um in the research department um particularly focusing on urban planning. Um so in a way it's a little bit uh different from my background in architecture, but it still gave me the basics to be able to do what I do today.",
            "I would say is um all of the Muslim national holidays. So, both Eids, um the Eid after Ramadan, and the second Eid. Those are common in all Arab Muslim countries. Um other than that, the typical New Year's, um and our birthdays we try to celebrate together."
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "词汇以『精准描述+灵活改写』为核心：能用 panoramic view 描述景观、用 ornamented 描述传统建筑、用 imbue roots in my house 表达文化融入，用 for the sake of doing it 表达『为做而做』。低分考生只会说 beautiful house / I like traditions。",
          "evidence": [
            "Traditional houses are back in my country at least very beautifully ornamented, very beautiful colors, all of these riads and all of these things",
            "I always wanted to imbue some of my roots um in my house",
            "It's a little bit run down around the edges, but still I feel very nostalgic every time I go back",
            "unless you try to find a good um research topic in architecture um that I would definitely do it"
          ]
        },
        "grammar": {
          "score": 8.5,
          "why": "能自如产出条件句（If you're asking about a PhD...）、让步/对比（it's more of a creative endeavor. So unless...）、同位语和介词短语嵌套。少数口语化失误（如『I think that's probably is the thing』，重复 logical logical）属自然语流中的自我修正痕迹，未造成理解障碍，因此从满分小幅下调至 8.5。",
          "evidence": [
            "If you're asking about a PhD, I think for my particular discipline it's a little hard to do a PhD in architecture um simply because again it's it's more of a creative endeavor. So um and a PhD is more of a research oriented.",
            "I would have loved for it to be a traditional house. Traditional houses are back in my country at least very beautifully ornamented, very beautiful colors, all of these riads and all of these things, but no, it's a definitely more typical modern apartment.",
            "it's a very specific layout in that you have the the the garden area in the middle, and all of the other rooms around it"
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "由于只能从转写推断，无法直接评分。从节奏证据看：句内停顿主要落在意群边界（『in the research department | particularly focusing on…』），词重音位置合理（panoramic, ornamented, nostalgic, endeavor），自我修正过程中重音未塌陷，说明发音稳定性较好。语气词 um/uh 的使用密度自然，未出现发音失误导致的重述。推断 8.5，存在不确定性。",
          "evidence": [
            "Um I studied architecture for 5 years and now I work um in the research department um particularly focusing on urban planning.",
            "We have three bedrooms, two bathrooms, and a very nice terrace area that actually has a very beautiful panoramic view of the city"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "I would have loved for it to be a traditional house. Traditional houses are back in my country at least very beautifully ornamented, very beautiful colors, all of these riads and all of these things, but no, it's a definitely more typical modern apartment.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I always wanted to imbue some of my roots um in my house. So, ideally, I would love for it to have all of the colors that I was talking about, the beautiful blue bright colors, um all of the patterns.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "It's a little bit run down around the edges, but still I feel very nostalgic every time I go back.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "If you're asking about a PhD, I think for my particular discipline it's a little hard to do a PhD in architecture um simply because again it's it's more of a creative endeavor. So um and a PhD is more of a research oriented.",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "每题至少给出『观点+原因+一个具体细节（数字、例子、个人经历）』三件套，避免用 1-2 句短答收尾——这是 6.0-6.5 与 8.0+ 考生的最直接分水岭。",
        "主动准备一组『精准小词』替代万能词：用 ornamented / imbue / nostalgic / endeavor 替代 beautiful / put / happy / try，能立刻拉升 Lexical Resource 评分印象。",
        "把自我修正当作正常节奏：高分考生会边说边纠（logical logical），但 6 分考生一旦卡壳会长时间沉默或直接放弃；练时重点训练『快速重述、不中断逻辑链』的能力。"
      ]
    }
  },
  {
    "id": "yt-adv-rv79-b9",
    "part": 1,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "IELTS Speaking · Perfect Band 9 Score",
    "prompt": "Band 9 speaking test with natural answers.",
    "source": "https://www.youtube.com/watch?v=Rv79dEpaiX4",
    "sourceName": "IELTS Advantage",
    "score": 9.0,
    "duration": 610,
    "audioPath": "/audio/yt-adv-rv79-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Advantage Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "let's talk about friends do you have lots of friends I do have quite a few friends um I I feel like I have more acquaintances than friends the people who I really care about I think I can definitely count them on my fingers who is your best friend and why I don't know how to answer this question because if I say any one person the others are going to come after me and also I don't have just one best friend I have maybe three or four very very good friends who I Look to for help counseling advice and uh I treasure them I I really appreciate each and every one of them for different reasons are you the type of person that makes friends easily it's really interesting because in a new environment I can be rather closed off I've had people tell me actually you're very nice you know once they get to know me but I kind of am a bit more of ANS ever not that I um not that I'm not willing to socialize with people but I kind of like to sus out my environment before I say anything in case I offend anybody now let's talk about flowers have you ever given anybody flowers I give people flowers uh all the time I think it's really lovely to receive a bouquet of flowers what's funny is that I'm not such a not that I'm not a big fan of receiving flowers but I'm not really bothered about receiving flowers is it popular to give Flowers in Your Country yes but I think we have to avoid white flowers because they use white flowers at funerals I'm not sure if I'm guting this right but I think there are certain colors that we need to avoid what kind of flowers do you like to receive I don't like cliches so I don't like red roses I love sunflowers I like daisies anything that's bright and happy and cheerful and not particularly extravagant or out there now let's talk about food do you enjoy cooking oh I love cooking I have tried to improve my cooking skills during the past year or two I would say it was successful so I've uh tried my hand at kishes and uh Thai food I love Thai food I love the flavors the turmeric and the lemongrass it's very I think distinctive oh I've tried baking as well I still cannot get my uh whipped cream to stiffen uh it melts a bit but we'll see let's see how we can fix that what are the most popular dishes in your country in Taiwan we love to promote our stinky tofu it smells absolutely horrendous but people tend to like stinky tofu they prefer the fried version to the I don't know if they boil it but they prefer it fried they say it tastes uh it tastes best but I can't get over the smell other things we do really well bubble tea came from tywan that's a huge Trend around the world and um we have our own version of uh Fried Chicken which I really love it's very good let's talk about noise are you comfortable with loud noises no in general no construction sites are understandable angry shouting people not so understandable so I think it depends if it's a construction site next to your office and you have to be at the office I can tolerate it but if it's someone just being a bit extra then maybe we'll skip that what type of noises do you come across during your daily routine types of noises everyday noises I think a lots of the noises that we hear every day are quite uh can be quite familiar and homey such as the toaster going off or an egg sizzling in a pan they're quite random but they can be quite like I said comforting describe a tourist attraction that you would recommend so I highly recommend CM rev um it's these beautifully preserved temples in the middle of the Cambodian jungle and it is a UNESCO heritage site but apart from that one of the temples also appeared in uh Tomb Raider it's the Tomb Raider film with Angelina Jolie cuz I know that they got another actress to fill that role um recently actually you'll remember there's a scene where she's in a temple and there's a Buddha head that's kind of like buried in in a tree trunk people tend to remember that Temple for that reason and so they go to visit this Temple when they're in cm RAB um in general I love Cambodia it was the first trip that I felt really connected to prior to that I'd been to Europe and I was in Paris um Luxembourg Spain I did this whole trip because I was um on Exchange uh Europe is beautiful Europe is very beautiful but I felt a special connection with Cambodian and I would definitely go back so apart from cmre I would recommend panon pen as well but definitely if you if you have to go to Cambodia you cannot miss cmre there's this eerily beautiful Vibe or energy about the place that I really enjoy it's very peaceful and very quiet so we've …",
    "analysis": {
      "overallComment": "这段转写之所以能稳定在 9.0 附近，是因为它把'自然口语'和'高度受控的输出'同时做到了极致：考生像朋友聊天般放松，但每一轮延展都精准地用上复杂句型、idiom、文化细节和评价性词汇。填充语 um/uh 真实存在但被 discourse marker 桥接，自纠（self-repair）反而展示了语言监控能力。低分考生通常给一句短答就停，词穷并重复同一句式，差距体现在'延展方式、词块选择、修辞意识、知识深度'四个层面。本段几乎全是考生作答，未见教学讲解穿插。",
      "whyHighScore": [
        "延展策略高级：每题都用『直接答 + 原因/例证 + 个性化评论』三段式，自然撑到 30 秒以上且不啰嗦。例：'I love sunflowers. I like daisies. anything that's bright and happy and cheerful and not particularly extravagant or out there'，用并列 + 否定补充完成评价；6.0 考生往往停在 'I like flowers'。",
        "词块密度与恰当度都极高：sus out my environment / tried my hand at / count them on my fingers / eerily beautiful vibe / homey / can't get over the smell 等 idiom、动词短语、抽象形容词语义透明且不堆砌；6.0 考生用 like / good / very much 重复。",
        "自我修正展现控制力而非错误：'not that I'm not willing to socialize with people but I kind of like to sus out my environment before I say anything in case I offend anybody'，先把双重否定抛出再改方向，体现灵活规划；6.0 考生要么卡住重说，要么完全省略让步逻辑。",
        "文化与知识细节自然嵌入：白色花在台湾葬礼的禁忌、Tomb Raider 在吴哥窟的取景、stinky tofu 的两种做法、bubble tea 起源，这比泛泛而谈更显语言真实性；6.0 考生只说 'flowers are popular in my country' 就停了。"
      ],
      "examinerTips": [
        "模仿其'三段式延展'结构：每个 Part 1 短题先给直接立场，再补一原因，再加一句个人化感受或文化细节，目标 25–30 秒，让考官听完无需追问。",
        "准备 8–10 个可跨话题复用的 idiom 和 evaluation 短语（sus out / tried my hand at / count on my fingers / can't get over / eerily beautiful vibe），并在练习时故意替换话题练习搭配，避免背诵痕迹。",
        "允许自己有 um / uh 和自纠，但立刻用 discourse marker（what's funny is / in general / apart from that）把停顿'盖住'，这比强行流畅更像 9 分；关键是纠错后不重说整句。",
        "在 Part 1 主动植入文化细节（白花禁忌、bubble tea 起源、Tomb Raider 取景地），既展示词汇又展示跨文化意识，6.0–6.5 考生最缺这层。",
        "模仿其形容词三连 + 否定收尾的节奏：'bright and happy and cheerful and not particularly extravagant or out there'，先正后反，让评价更有层次。"
      ],
      "listenExcerpts": [
        "the people who I really care about I think I can definitely count them on my fingers",
        "not that I'm not willing to socialize with people but I kind of like to sus out my environment before I say anything in case I offend anybody",
        "anything that's bright and happy and cheerful and not particularly extravagant or out there",
        "there's this eerily beautiful Vibe or energy about the place that I really enjoy it's very peaceful and very quiet"
      ],
      "listenTips": [],
      "practiceTips": [
        "模仿其'三段式延展'结构：每个 Part 1 短题先给直接立场，再补一原因，再加一句个人化感受或文化细节，目标 25–30 秒，让考官听完无需追问。",
        "准备 8–10 个可跨话题复用的 idiom 和 evaluation 短语（sus out / tried my hand at / count on my fingers / can't get over / eerily beautiful vibe），并在练习时故意替换话题练习搭配，避免背诵痕迹。",
        "允许自己有 um / uh 和自纠，但立刻用 discourse marker（what's funny is / in general / apart from that）把停顿'盖住'，这比强行流畅更像 9 分；关键是纠错后不重说整句。",
        "在 Part 1 主动植入文化细节（白花禁忌、bubble tea 起源、Tomb Raider 取景地），既展示词汇又展示跨文化意识，6.0–6.5 考生最缺这层。",
        "模仿其形容词三连 + 否定收尾的节奏：'bright and happy and cheerful and not particularly extravagant or out there'，先正后反，让评价更有层次。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 9.0,
        "grammar": 9.0,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "节奏近乎母语者：um/uh 出现频率低（每两到三句才一次），且总是被 'what's funny is that' 'in general' 'apart from that' 等 discourse marker 迅速接住；长答案无中断停顿，信息铺陈呈线性延展。",
          "evidence": [
            "what's funny is that I'm not such a not that I'm not a big fan of receiving flowers but I'm not really bothered about receiving flowers",
            "apart from that one of the temples also appeared in uh Tomb Raider it's the Tomb Raider film with Angelina Jolie cuz I know that they got another actress to fill that role"
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "词汇跨越具体名词（sunflowers, daisies, stinky tofu, bubble tea, whipped cream）、抽象评价（homey, comforting, distinctive, eerily beautiful）、idiom（sus out, tried my hand at, count on fingers, come after me）三层，paraphrase 能力强（同义替换 'anxious'→'closed off'，'quiet'→'peaceful'），没有机械背模板痕迹。",
          "evidence": [
            "I kind of like to sus out my environment before I say anything in case I offend anybody",
            "I've uh tried my hand at kishes and uh Thai food I love the flavors the turmeric and the lemongrass it's very I think distinctive",
            "there's this eerily beautiful Vibe or energy about the place that I really enjoy"
          ]
        },
        "grammar": {
          "score": 9.0,
          "why": "句式从基础到高级自由切换却保持准确：让步状语从句（not that…but）、条件状语（once they get to know me / in case I offend）、定语从句（the people who I really care about）、同位语（the Tomb Raider film with Angelina Jolie）、抽象主语表喜好（what I treasure / what I love）。少数 um 后的小品词脱落（'it's the Tomb Raider film' 后漏 it is）属自然语流，不影响清晰度。",
          "evidence": [
            "not that I'm not willing to socialize with people but I kind of like to sus out my environment before I say anything in case I offend anybody",
            "the people who I really care about I think I can definitely count them on my fingers",
            "in Taiwan we love to promote our stinky tofu it smells absolutely horrendous but people tend to like stinky tofu they prefer the fried version"
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "从转写无法直接判断音段特征，但可见三点支持高分：(1) 长句信息密度高而无明显断句，提示意群切分自然；(2) 自纠多发生在词汇选择而非发音，说明发音自动化；(3) 句末语调呈自然下降 + 升调交替（清单型列举 sunflowers / daisies）。不确定性：转写无法呈现连读、弱读、个别音是否标准，因此给 8.5 而非 9.0。",
          "evidence": [
            "I love sunflowers I like daisies anything that's bright and happy and cheerful",
            "construction sites are understandable angry shouting people not so understandable"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "the people who I really care about I think I can definitely count them on my fingers",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "not that I'm not willing to socialize with people but I kind of like to sus out my environment before I say anything in case I offend anybody",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "anything that's bright and happy and cheerful and not particularly extravagant or out there",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "there's this eerily beautiful Vibe or energy about the place that I really enjoy it's very peaceful and very quiet",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "模仿其'三段式延展'结构：每个 Part 1 短题先给直接立场，再补一原因，再加一句个人化感受或文化细节，目标 25–30 秒，让考官听完无需追问。",
        "准备 8–10 个可跨话题复用的 idiom 和 evaluation 短语（sus out / tried my hand at / count on my fingers / can't get over / eerily beautiful vibe），并在练习时故意替换话题练习搭配，避免背诵痕迹。",
        "允许自己有 um / uh 和自纠，但立刻用 discourse marker（what's funny is / in general / apart from that）把停顿'盖住'，这比强行流畅更像 9 分；关键是纠错后不重说整句。",
        "在 Part 1 主动植入文化细节（白花禁忌、bubble tea 起源、Tomb Raider 取景地），既展示词汇又展示跨文化意识，6.0–6.5 考生最缺这层。",
        "模仿其形容词三连 + 否定收尾的节奏：'bright and happy and cheerful and not particularly extravagant or out there'，先正后反，让评价更有层次。"
      ]
    }
  },
  {
    "id": "yt-adv-b6-pron",
    "part": 1,
    "coversParts": [
      1,
      2
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "Band 9 Perfect Pronunciation",
    "prompt": "Band 9 speaking focused on pronunciation quality.",
    "source": "https://www.youtube.com/watch?v=b6_zfUHwlw8",
    "sourceName": "IELTS Advantage",
    "score": 9.0,
    "duration": 1402,
    "audioPath": "/audio/yt-adv-b6-pron.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Advantage Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "Let's start off by talking about belongings in your daily life. Do you prefer having fewer or more belongings in your daily life? I think, personally, for me, I'd prefer having fewer belongings just because I feel like it would be more easier to deal with on a daily basis, especially when it comes to technology, trying to decide if I had a laptop and an iPad and a phone, I have all three of the same kind of thing. I just think it would be easier to function in life with less. What things can you not live without? My phone. I can't live without my phone. What else can't I live without? Water, always staying hydrated, and my cats. How do you organize your belongings? Sometimes I do it by color. If it was things related to books, I like to organize them by colors on the shelves, yeah. Now, let's talk about technology in modern life. How has technology changed your life? I think technology has changed my life in so many different ways, one of them being the ability to connect with people. Personally, I have a lot of long distance friends, and technology has allowed me to stay in touch with those people, and even though they're not with you personally, you do feel like you never miss that connection because of technology. I think work-related technology offers me a lot of opportunity to connect and network with many different kind of people. Would you like to have more technology in your life or less technology in your life? I personally would like to have less technology in my life just because I feel like technology sometimes defeats the purpose of humanity in a sense of if there's too much of it, like nowadays with the AI and all of that, it's kind of starting to replace human beings in a sense. I would like to depend less on technology, generally. Do you think technology has made your life better now than in the past when you had less technology? Yes, to a certain extent, just because I feel like back then, we didn't have Instagram, we didn't have those, the iconic social media platforms that all young teenagers use. And those are the main platforms people are using now to connect with people and to network, and especially if you're running your own business. For example, trying to share your music or share art, that's how you come out to a bigger platform. So definitely, I feel like it has a bigger advantage than what we had in the past. Now, let's talk about reading. Do you enjoy reading? I do enjoy reading, but I wish I did more of it. I feel like with technology and all the modern things coming up, I feel like I used to read more as a child, and I'm trying to get back into it. Some of the things I love reading about are self-help books. Those are my favorite. Now, let's talk about outdoor activities. What activities do you like to do outdoors? Outdoors, I love to go running sometimes. I like to do morning yogas. I've had yogas by the beach before. I really love joining group classes outdoors as well. I once did this thing where we started off with a morning yoga, and then it went into a HIIT workout, and then a yoga cool down. I love to go swimming. I love the ocean. I love to be by the beach. How often do you spend time outside? Not as often as I would like, just because given the location I'm in right now, It gets pretty hot and humid, and I wish our weather would accommodate being outdoors more often. But I try my best to be outside as much as possible. When you are outside, do you prefer being alone or with other people? I think I prefer being alone just because it gives you that space to be with yourself and to disconnect from everyone around you. For me, personally, sometimes I feel like when I'm around people, my social battery dies very quickly, and it could be a lot to take in. Both have their advantages and disadvantages. Of course, I'd love to hang out with my friends and be around my friends but, I recently did a solo trip to England, and I spent most of my time by myself in nature, walking around the city. I find that one learns a lot when they spend time with their self and the energies around them. In the future, would you like to do more activities outdoors? Yes, for sure. I always wanted to try out paragliding, skiing. Skiing has been one of like, an outdoor activity I'd always wanted to do. A time where I had to adapt to a new situation, it came when I graduated from high school and I had to finally move to college. And I was one of the people that decided ultimately to move out of my home place to go abroad for university just because I felt like university abroad had more resources and opportunity. It was pretty difficult to fit in. People have different culture over there, different outlook on life, but I needed to adapt because that was the only way I could grow …",
    "analysis": {
      "overallComment": "该示范在流利度、词汇多样性与语音表现上确实接近 9 分水准：自然使用 self-correct、discourse marker 与习语，发音节奏与重音把控明显经过训练。但转写中仍出现 'more easier'、'different kind of people'、'yogas'、'with their self' 等可数性/比较级错误，会在 Grammatical Range & Accuracy 上扣分。综合判断更接近 7.5–8.5，而非四项全 9.0。",
      "whyHighScore": [
        "流利度高，靠语块和 discourse marker 推进，少有长死停：'just because I feel like it would be more easier to deal with on a daily basis, especially when it comes to technology' 一气呵成，仅靠 'I think / I feel like / just because' 维持节奏；6.0–6.5 考生多靠 'and then…' 单一连接或卡顿。",
        "词汇资源明显高于常见 6.5 答案：'my social battery dies very quickly'、'defeats the purpose of humanity'、'come out to a bigger platform'、'accommodate being outdoors' 等属于 idiomatic 与 precise 层级，不是模板化 'very important / useful'。",
        "语篇意识强，会主动 justify + exemplify + contrast：'Both have their advantages and disadvantages. Of course, I'd love to hang out with my friends… but, I recently did a solo trip to England'，体现 Coherence 的 'fully develops topics' 特征。",
        "发音层面（受限于转写可推断）：句重音清晰，弱读与停顿自然，'I do enjoy reading, but I wish I did more of it'、'I personally would like to have less' 体现句首强调与降调；'just because'、'especially when it comes to' 等连读与重音符合 native-like prosody，是其能挂 9 分的关键。"
      ],
      "examinerTips": [
        "把 'just because… especially when it comes to…' 这类语块内化到 Part 1，能在不超时的前提下让 answer 自然延伸，避免硬背长句。",
        "回答中加入一个 personal anchor（如 'I recently did a solo trip to England'）能瞬间把 Fluency & Coherence 提到 8.0+；但要避免 Part 1 过度展开，否则会被判成 'over-extended'。",
        "词汇上优先习语 + 抽象评价词（defeats the purpose / accommodate / social battery dies），减少 'very / really' 的频次；并复核可数性，避免 'yogas / kind of people' 这类硬伤拖 Grammar 到 7.0。"
      ],
      "listenExcerpts": [
        "I think, personally, for me, I'd prefer having fewer belongings just because I feel like it would be more easier to deal with on a daily basis, especially when it comes to technology",
        "Personally, I have a lot of long distance friends, and technology has allowed me to stay in touch with those people, and even though they're not with you personally, you do feel like you never miss that connection because of technology",
        "technology sometimes defeats the purpose of humanity in a sense of if there's too much of it, like nowadays with the AI and all of that, it's kind of starting to replace human beings in a sense",
        "I think I prefer being alone just because it gives you that space to be with yourself and to disconnect from everyone around you. For me, personally, sometimes I feel like when I'm around people, my social battery dies very quickly"
      ],
      "listenTips": [],
      "practiceTips": [
        "把 'just because… especially when it comes to…' 这类语块内化到 Part 1，能在不超时的前提下让 answer 自然延伸，避免硬背长句。",
        "回答中加入一个 personal anchor（如 'I recently did a solo trip to England'）能瞬间把 Fluency & Coherence 提到 8.0+；但要避免 Part 1 过度展开，否则会被判成 'over-extended'。",
        "词汇上优先习语 + 抽象评价词（defeats the purpose / accommodate / social battery dies），减少 'very / really' 的频次；并复核可数性，避免 'yogas / kind of people' 这类硬伤拖 Grammar 到 7.0。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 8.0,
        "lexical": 8.0,
        "grammar": 7.0,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 8.0,
          "why": "语速稳定，self-correction 与 hesitation 不破坏 meaning；'I think, personally, for me' 这类话语标记是 natural 风格而非 false start。'I think, personally, for me, I'd prefer having fewer belongings just because I feel like it would be more easier to deal with on a daily basis' 显示边想边说的连贯能力。但 Part 1 答题明显偏长、过度展开，节奏上偶有 'given the location I'm in right now, It gets pretty hot and humid' 出现明显 plan-and-repair 痕迹，因此未到 9.0 所需的 effortless sustained flow。",
          "evidence": [
            "I think, personally, for me, I'd prefer having fewer belongings just because I feel like it would be more easier to deal with on a daily basis, especially when it comes to technology, trying to decide if I had a laptop and an iPad and a phone, I have all three of the same kind of thing.",
            "Both have their advantages and disadvantages. Of course, I'd love to hang out with my friends and be around my friends but, I recently did a solo trip to England, and I spent most of my time by myself in nature, walking around the city."
          ]
        },
        "lexical": {
          "score": 8.0,
          "why": "能使用 idiomatic 表达（'social battery dies very quickly'）、topic-specific 词汇（'HIIT workout'、'cool down'、'network'、'stay hydrated'）和抽象评价词（'defeats the purpose of humanity'、'iconic social media platforms'、'accommodate being outdoors'）。但仍出现 'long distance friends'（应用 long-distance 作形容词）、'yogas'（应为 yoga classes/sessions）、'with their self'（应为 themselves）等词形或搭配瑕疵，未达到 9.0 要求的 'uses vocabulary with full flexibility and precision'。",
          "evidence": [
            "my social battery dies very quickly, and it could be a lot to take in",
            "technology sometimes defeats the purpose of humanity in a sense of if there's too much of it",
            "I wish our weather would accommodate being outdoors more often",
            "to connect with people and to network, and especially if you're running your own business"
          ]
        },
        "grammar": {
          "score": 7.0,
          "why": "复杂结构多样：条件/让步混合（'even though they're not with you personally, you do feel like you never miss that connection'）、wish 虚拟（'I wish I did more of it'、'I wish our weather would accommodate'）、原因状语链（'just because… especially when it comes to…'）。但准确度上明显拖后腿：'more easier'（双重比较级）、'different kind of people'（单复数）、'yogas'（可数/不可数混淆）、'a lot to take in' 后又接 'with their self'（反身代词）、'those, the iconic social media platforms'（冗余指代）。这些错误 'impedes meaning' 边缘，但可数性错误较频繁，因此只到 7.0。",
          "evidence": [
            "it would be more easier to deal with on a daily basis",
            "network with many different kind of people",
            "I like to do morning yogas. I've had yogas by the beach before.",
            "one learns a lot when they spend time with their self and the energies around them"
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "仅凭转写推断，不确定项需说明：① 句重音与降调自然，'I personally would like to have less' 把 emphasis 放在 'personally' 与 'less'，符合对比逻辑；② 'I do enjoy reading, but I wish I did more of it' 出现 'do'-emphasis 与 'did' 的清晰区分，提示元音长度/重音控制较好；③ 自我修正 'if it was things related to books' 显示发音监控能力，而非卡顿；④ 视频标称 'Band 9 Perfect Pronunciation'，语速、连读与弱读大概率达到 near-native。但缺乏音段级别证据，'social battery' 等词能否清晰区分 /ɑː/ 与 /æ/ 无法从文字确认，因此保守给 8.5。",
          "evidence": [
            "I personally would like to have less technology in my life just because I feel like technology sometimes defeats the purpose of humanity",
            "I do enjoy reading, but I wish I did more of it",
            "Sometimes I do it by color. If it was things related to books, I like to organize them by colors on the shelves"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "I think, personally, for me, I'd prefer having fewer belongings just because I feel like it would be more easier to deal with on a daily basis, especially when it comes to technology",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "Personally, I have a lot of long distance friends, and technology has allowed me to stay in touch with those people, and even though they're not with you personally, you do feel like you never miss that connection because of technology",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "technology sometimes defeats the purpose of humanity in a sense of if there's too much of it, like nowadays with the AI and all of that, it's kind of starting to replace human beings in a sense",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I think I prefer being alone just because it gives you that space to be with yourself and to disconnect from everyone around you. For me, personally, sometimes I feel like when I'm around people, my social battery dies very quickly",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "把 'just because… especially when it comes to…' 这类语块内化到 Part 1，能在不超时的前提下让 answer 自然延伸，避免硬背长句。",
        "回答中加入一个 personal anchor（如 'I recently did a solo trip to England'）能瞬间把 Fluency & Coherence 提到 8.0+；但要避免 Part 1 过度展开，否则会被判成 'over-extended'。",
        "词汇上优先习语 + 抽象评价词（defeats the purpose / accommodate / social battery dies），减少 'very / really' 的频次；并复核可数性，避免 'yogas / kind of people' 这类硬伤拖 Grammar 到 7.0。"
      ]
    }
  },
  {
    "id": "yt-adv-e4i-b9",
    "part": 1,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "IELTS Speaking Exam · Perfect Band 9",
    "prompt": "Complete exam-style Band 9 speaking sample.",
    "source": "https://www.youtube.com/watch?v=E4iUiRBVUa4",
    "sourceName": "IELTS Advantage",
    "score": 9.0,
    "duration": 724,
    "audioPath": "/audio/yt-adv-e4i-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Advantage Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "let's talk about your daily routine can you tell me about your daily routine when I first get up I don't like doing anything um high maintenance or too quick I like to take my time um once I wake up I like to just be on my phone and then gradually get on from there get up and do my skin care I start getting dressed and then go downstairs I make some coffee or tea even matcha I love much so yeah that's kind of my morning routine has your routine changed since you were a child so growing up I didn't really have a routine because when you're a child you just do whatever but growing up I came to realize that it's important to have like a set um routine on what to do and how to take care of yourself how to maintain a better routine throughout the day so yeah my routine has drastically changed throughout um my life is there anything you would like to add to your daily routine I would like to incorporate uh more of like meditation to just be able to ground myself um when needed I haven't been able to do that as of recently but I would like to incorporate that in my routine because I think it's important to just be able to um um have that minute to yourself and just feel grounded let's talk about flowers have you ever received flowers as a gift yes I have um actually recently I did receive flowers and I can't talk enough about flowers I love everything about them like the variations that you find the different types and colors as simple as like roses to let's say tulips I love everything about them on what special occasions do people give Flowers in Your Country uh from where I'm from they usually use flowers for say birthdays or uh weddings and flowers are just uh common to receive especially here with my friends we usually like gift each other flowers for each other's birthdays or even just like a normal like a thank you like just to show appreciation to a person what kind of flowers would you like to receive as a present so I've never received uh sunflowers and when I was a kid I just looking at sunflowers I was always amazed by how they look and I would want to like touch one because I've never like seen how it looks like in real life I've only seen it through pictures so I would like to receive um sunflowers now let's talk about food do you enjoy cooking I don't personally cook for myself just because I wasn't really into um cooking I do however like baking I like to bake desserts I like to make um let's say cake uh chocolate cake or cookies whenever I feel bored at home and there's literally nothing to do I find myself grabbing the ingredients in the cupboards or just baking it's really fun and just the hard work that I put into it versus the aftermath I feel like it's worth it do you think that you have a healthy diet personally I don't think that I have a healthy diet I usually eat whatever is available I try to be mindful of what I put into my body especially because how I see people um develop some issues use with uh the food that they take and especially because as I'm growing older my metabolism is going to be different so I try to be aware but usually my diet isn't that great how often do you order food online I usually order I would say about two to three times a week um other than that I would just eat at home I would actually very much prefer um homemade food rather than ordering online when there's nothing to eat at home I tend to gravitate towards uh ordering through the app um fast food now let's talk about movies what are the advantages of seeing a movie in the cinema I would say the advantages of seeing a movie in a cinema would be that you get to watch it as soon as it comes out you get to watch it in a bigger screen instead of just staying at home and watching it through your laptop or a TV I don't think there's a lot of advantages in my opinion but I really like the The Experience uh let's say if you're watching it in terms of like um uh IM through IMAX that experience is really nice um because of how the sound system is it's it's a really nice experience uh do you like watching movies alone or with other people so when it's like a like an indie film I like to watch it alone because I feel like that's not everyone's cup of tea but with psychological thrillers or horror movies especially I love watching it with other people because I cannot stand watching it alone I get really scared when it's horror films so having a company with you it's it's much better so last year my mom who usually prepares the meals at home she uh was away for vacation so I was in charge of uh cooking the food …",
    "analysis": {
      "overallComment": "该示范在四项评分维度上均接近 9.0，原因在于：考生对日常话题的回应做到了「自然延长」而非机械堆砌，使用了大量精准的搭配与习语，语法结构丰富且几乎无错误，且全程语流连贯、自我修正自然。考官听到的不是背诵答案，而是一个语言能力与话题驾驭力俱佳的说话者。低分考生通常只能给出一两句笼统回答或频繁自我中断、重复同一结构，而本示范在每个问题上都做到了清晰的展开与自然过渡，因此能稳定拿到接近 9.0 的分数。",
      "whyHighScore": [
        "信息量与展开度明显高于 6.0–6.5 段考生：低分考生回答 Part 1 多停留在 1–2 句（如 'Yes, I like flowers'），而示范在每个问题上都给出 3–5 句的完整小段落，例如关于日常习惯的回答 'I make some coffee or tea even matcha I love much so yeah that's kind of my morning routine' 还带个人化补充。",
        "词汇精准度与地道搭配远超普通高分段：使用 'gravitate towards'、'cup of tea'、'mindful of what I put into my body'、'drastically changed' 等地道表达，而非泛泛的 'I like'、'good for me'，这是 9 分段的关键特征。",
        "语法结构灵活多变且错误极少：能在口语中自然使用 as 原因状语从句、定语从句、对比结构 (the hard work that I put into it versus the aftermath)，而 6.5 段考生常停留在 SVO 简单句堆叠。",
        "语流自然、停顿与自我修正均不影响交际：'um'、'uh' 出现频率低且多用于思考而非填补空白，并能主动自我修正（'I cannot stand watching it alone I get really scared'），这正是 Band 9 'hesitation is not problematic' 的典型表现。"
      ],
      "examinerTips": [
        "回答 Part 1 时不要只给一句 'Yes, I like it'，而应主动加 2–3 句个人化细节与原因（示范中 'I would say about two to three times a week um other than that I would just eat at home' 即是范式）。",
        "刻意替换基础动词：用 'incorporate' 代替 'add'，用 'gravitate towards' 代替 'like to choose'，用 'drastically changed' 代替 'changed a lot'，这是 7 分到 8.5+ 的分水岭。"
      ],
      "listenExcerpts": [
        "so growing up I didn't really have a routine because when you're a child you just do whatever but growing up I came to realize that it's important to have like a set um routine on what to do and how to take care of yourself how to maintain a better routine throughout the day so yeah my routine has drastically changed throughout um my life",
        "I would like to incorporate uh more of like meditation to just be able to ground myself um when needed I haven't been able to do that as of recently but I would like to incorporate that in my routine because I think it's important to just be able to um um have that minute to yourself and just feel grounded",
        "I don't personally cook for myself just because I wasn't really into um cooking I do however like baking I like to bake desserts I like to make um let's say cake uh chocolate cake or cookies whenever I feel bored at home and there's literally nothing to do I find myself grabbing the ingredients in the cupboards or just baking it's really fun and just the hard work that I put into it versus the aftermath I feel like it's worth it",
        "when it's like a like an indie film I like to watch it alone because I feel like that's not everyone's cup of tea but with psychological thrillers or horror movies especially I love watching it with other people because I cannot stand watching it alone I get really scared when it's horror films so having a company with you it's it's much better"
      ],
      "listenTips": [],
      "practiceTips": [
        "回答 Part 1 时不要只给一句 'Yes, I like it'，而应主动加 2–3 句个人化细节与原因（示范中 'I would say about two to three times a week um other than that I would just eat at home' 即是范式）。",
        "刻意替换基础动词：用 'incorporate' 代替 'add'，用 'gravitate towards' 代替 'like to choose'，用 'drastically changed' 代替 'changed a lot'，这是 7 分到 8.5+ 的分水岭。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 9.0,
        "grammar": 9.0,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "语流持续连贯，每题回答都做到自然延长，使用 'so'、'because'、'actually'、'however' 等衔接词实现逻辑推进。停顿与重复仅出现在思考点而非结构断裂处。",
          "evidence": [
            "so growing up I didn't really have a routine because when you're a child you just do whatever but growing up I came to realize that it's important to have like a set um routine on what to do and how to take care of yourself",
            "I do however like baking I like to bake desserts I like to make um let's say cake uh chocolate cake or cookies whenever I feel bored at home and there's literally nothing to do I find myself grabbing the ingredients"
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "词汇范围宽、搭配地道、具备 paraphrasing 能力，能用 'high maintenance'、'gradually'、'drastically changed'、'incorporate'、'ground myself'、'gravitate towards' 等表达细微语义差别；习语 'not everyone's cup of tea' 自然嵌入。",
          "evidence": [
            "I like to take my time um once I wake up I like to just be on my phone and then gradually get on from there",
            "my routine has drastically changed throughout um my life",
            "I would like to incorporate uh more of like meditation to just be able to ground myself",
            "I tend to gravitate towards uh ordering through the app um fast food"
          ]
        },
        "grammar": {
          "score": 9.0,
          "why": "复杂句使用频繁且准确：as 原因状语从句、定语从句、对比结构 (versus)、条件状语 (when there's nothing to eat at home) 均自然产出。错误极少，仅 'use with uh the food' 这类极轻微的口误，不影响理解。",
          "evidence": [
            "I try to be mindful of what I put into my body especially because how I see people um develop some issues use with uh the food that they take and especially because as I'm growing older my metabolism is going to be different",
            "the hard work that I put into it versus the aftermath I feel like it's worth it",
            "when there's nothing to eat at home I tend to gravitate towards uh ordering through the app um fast food"
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "基于转写推断：句子节奏自然，重音与语调有起伏（如 'I can't talk enough about flowers' 中的强调重音），自我修正处 ('I get really scared when it's horror films so having a company with you it's it's much better') 仍保持清晰。仅凭字幕无法确知个别音位准确度，但整体语流与停顿位置提示发音清晰度接近 9 分；保守给 8.5。",
          "evidence": [
            "I can't talk enough about flowers I love everything about them like the variations that you find the different types and colors",
            "I get really scared when it's horror films so having a company with you it's it's much better"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "so growing up I didn't really have a routine because when you're a child you just do whatever but growing up I came to realize that it's important to have like a set um routine on what to do and how to take care of yourself how to maintain a better routine throughout the day so yeah my routine has drastically changed throughout um my life",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I would like to incorporate uh more of like meditation to just be able to ground myself um when needed I haven't been able to do that as of recently but I would like to incorporate that in my routine because I think it's important to just be able to um um have that minute to yourself and just feel grounded",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I don't personally cook for myself just because I wasn't really into um cooking I do however like baking I like to bake desserts I like to make um let's say cake uh chocolate cake or cookies whenever I feel bored at home and there's literally nothing to do I find myself grabbing the ingredients in the cupboards or just baking it's really fun and just the hard work that I put into it versus the aftermath I feel like it's worth it",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "when it's like a like an indie film I like to watch it alone because I feel like that's not everyone's cup of tea but with psychological thrillers or horror movies especially I love watching it with other people because I cannot stand watching it alone I get really scared when it's horror films so having a company with you it's it's much better",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "回答 Part 1 时不要只给一句 'Yes, I like it'，而应主动加 2–3 句个人化细节与原因（示范中 'I would say about two to three times a week um other than that I would just eat at home' 即是范式）。",
        "刻意替换基础动词：用 'incorporate' 代替 'add'，用 'gravitate towards' 代替 'like to choose'，用 'drastically changed' 代替 'changed a lot'，这是 7 分到 8.5+ 的分水岭。"
      ]
    }
  },
  {
    "id": "yt-adv-sgwl-b9",
    "part": 1,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "What Band 9 IELTS Speaking Actually Sounds Like",
    "prompt": "Natural Band 9 speaking demonstration.",
    "source": "https://www.youtube.com/watch?v=Sgwl1MLWSPw",
    "sourceName": "IELTS Advantage",
    "score": 9.0,
    "duration": 713,
    "audioPath": "/audio/yt-adv-sgwl-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Advantage Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "So, let's start off by talking about food. What's your favorite food? Um, I really love Asian food cuz I live in England, so it's harder to get Asian food around, but I like spicy, flavorful, and like just generally savory food. Do you cook a lot at home? Not as much as I would like to. I would love to cook more cuz I actually enjoy the process of cooking, but I just cook out of convenience and like cuz um every day I've got to, you know, make sure I get my work done and then cook for my kids, which um takes a lot of time. Sometimes we get takeaway, but they like it, you know. What are popular takeaway meals in your local area? Fish and chips. It's a favorite with everyone. So, you know, that's an easy option, but um generally because of my own preference, I love, you know, just to get Thai and Vietnamese. You know, this is something that I could, you know, just get around my local area. It's very easily sourced. How often do you eat fast food? I try to eat really healthily, but then I tend to go down the filio fish, McDonald's uh route when I'm traveling. So, I suppose only once every few months. Now, let's talk about seasons of the year. What's your favorite season of the year? Well, um I love anytime when the sun starts to come out. So, around spring or early summer before it gets too hot, you know, I just love a little bit of vitamin D and it makes me happier as well. So, that is um definitely better than the winter. What do you do when it gets too hot in the summer? Hide. I tend to also, you know, go into any kind of buildings with air conditioning and I have to fan on every night when it's really hot. So, yeah, when it gets really hot in the summer, you know, I really need a lot of like fans and, you know, kind of just anything I can hold with me when I go out as well. At what time of year do you normally go on holiday? I try to go outside of the um school holiday season, but because I have kids, you know, we tend to have to go during, you know, the the you know, when when there's term breaks, you know, when when the school breaks. But, um my favorite time of going away would be during Christmas, you know, cuz um I much prefer to be in a warmer climate when it's really really cold. So, yeah, this is just that time before or after Christmas. Have you ever been on holiday somewhere very cold? Yes, I love Norway. You know, it it was um amazing. It was just everything was like a picture perfect postcard, you know. You could see the fields in the distance and the what you call them icebergs. Um it was an experience, you know, and to ri to to ride the husky sled, you know, was also an amazing experience for me. Now, let's talk about clothes. Where do you buy most of your clothes? I would like to do, you know, clothes shopping in the shop, but the reality is most of us do it online now, you know, and I um get my clothes from Zara and ASOS cuz I just love the hip and trendy but also timeless look. How often do you buy clothes for yourself? I buy it more often than I should because I use online shopping and clothes shopping as a form of you know like dopamine hit for me. So it's it's um for me I I love to express myself through my clothes. So um because of that then I need to find different clothes for different occasion very often. Have you always had the same taste in clothes? No, I have not. Um cuz I see myself as um different identities throughout my life, you know, before I became a mom, during and then also after when work became something that I could express myself, you know, true. So yeah, I've I've had different fashion tastes, you know, throughout the ages. Now, let's talk about social media. Which social media sites do you use? I use uh Instagram and LinkedIn because I feel like um I run a business and that's where my target audience are. You know, I build a community through Instagram and then on LinkedIn it's where I work on my business to business um leads. How much time do you spend on social media? Way too much. I shouldn't be spending so much time but I find that it is um once you visit you know social media and you post something it's also about engaging with people to ensure that you know you build relationships. So yeah a couple of hours a day. Is there anything you dislike about social media? I dislike the addictive quality about it you know because so many of us are connected you know through a tablet or a device now and social media is our form of communication. So it's becoming even though it seems like you're being connected to loads and loads of people, the actual quality of …",
    "analysis": {
      "overallComment": "这段转写在四项评分标准上都接近 9 分水平：节奏自然、信息密度高、表达有层次。考生在 Part 1 简短题目下做出远超最低字数要求的扩展，但每次扩展都自然延伸、不显刻意。词汇既有地道搭配（dopamine hit、easily sourced），又能即兴精准改述（spicy, flavorful, savory）。语法上复杂结构与口语句式混用得自然，允许有轻微口误但不影响信息传达。整体呈现的是『熟练母语式对话』而非『背诵式答案』，这正是考官愿意给出 9 分的关键。注意：视频为公开示范非真实考录，部分表达略带讲解口吻，但考生作答本身质量稳定。",
      "whyHighScore": [
        "信息延伸能力远超 6.0–6.5 考生的『一句一答』。例如在『喜欢什么食物』后，6 分考生通常只说『I like Asian food』即停，而该考生主动交代背景、偏好、原因：I really love Asian food cuz I live in England, so it's harder to get Asian food around, but I like spicy, flavorful, and like just generally savory food。",
        "词汇具备明显的搭配意识与即兴改述能力，而非堆砌大词。6 分考生倾向用基础词（nice、good、like），该考生能用 a form of dopamine hit、build a community、business to business leads、easily sourced 等表达，且全部用得贴切。",
        "语法在自然口语中呈现复杂结构的自如切换，包含原因状语从句、介词短语、分词结构与隐含条件：I would love to cook more cuz I actually enjoy the process of cooking, but I just cook out of convenience。错误极轻且能即时自纠，未影响理解。",
        "语篇组织清晰、过渡自然：But、So、Well、because、generally 等衔接词与自评式标记（I suppose、I tend to、you know）穿插使用，使长答案仍保持逻辑推进，与 6 分考生常见的『说到一半就卡词或重复』形成对比。"
      ],
      "examinerTips": [
        "训练『不靠延长单句，而是靠信息密度』的扩展能力：回答一个 Part 1 问题时，按『直接答案 + 背景/原因 + 补充/对比』三步走，而不是用一个超长从句堆到底。例如把 I like Asian food 升级为 I really love Asian food cuz I live in England, so it's harder to get Asian food around, but I like spicy, flavorful, and like just generally savory food。",
        "刻意练习『即兴改述』与『搭配级』表达：当想说 good 时，尝试替换成 a favorite with everyone、amazing experience、a form of dopamine hit 等具体语块；准备 20–30 个可跨话题复用的搭配（addictive quality、build a community、target audience、easily sourced），在练习时强制使用。"
      ],
      "listenExcerpts": [
        "I really love Asian food cuz I live in England, so it's harder to get Asian food around, but I like spicy, flavorful, and like just generally savory food.",
        "I buy it more often than I should because I use online shopping and clothes shopping as a form of you know like dopamine hit for me.",
        "I see myself as um different identities throughout my life, you know, before I became a mom, during and then also after when work became something that I could express myself, you know, true.",
        "I dislike the addictive quality about it you know because so many of us are connected you know through a tablet or a device now and social media is our form of communication."
      ],
      "listenTips": [],
      "practiceTips": [
        "训练『不靠延长单句，而是靠信息密度』的扩展能力：回答一个 Part 1 问题时，按『直接答案 + 背景/原因 + 补充/对比』三步走，而不是用一个超长从句堆到底。例如把 I like Asian food 升级为 I really love Asian food cuz I live in England, so it's harder to get Asian food around, but I like spicy, flavorful, and like just generally savory food。",
        "刻意练习『即兴改述』与『搭配级』表达：当想说 good 时，尝试替换成 a favorite with everyone、amazing experience、a form of dopamine hit 等具体语块；准备 20–30 个可跨话题复用的搭配（addictive quality、build a community、target audience、easily sourced），在练习时强制使用。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 9.0,
        "grammar": 8.5,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "考生在 Part 1 题目下持续输出 5–8 句的完整回答，几乎无长时间停顿，语速稳定、意群切分自然。虽出现 um、you know、like 等填充词，但属于母语式话语标记而非犹豫不决；自纠（filio fish、the what you call them icebergs）反而展示话语管理与即时修复能力，符合 9 分对『sustained fluent speech with only natural hesitation』的要求。",
          "evidence": [
            "I would love to cook more cuz I actually enjoy the process of cooking, but I just cook out of convenience and like cuz um every day I've got to, you know, make sure I get my work done and then cook for my kids, which um takes a lot of time.",
            "I see myself as um different identities throughout my life, you know, before I became a mom, during and then also after when work became something that I could express myself, you know, true."
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "词汇使用灵活、精确，并展现对搭配与隐喻的掌控。低分考生多用 nice、very good、I like it 之类的高频低信息词；该考生则使用 dopamine hit、hip and trendy but also timeless look、picture perfect postcard、addictive quality、connected to loads and loads of people 等习语或半习语。能即兴改述同一概念（spicy, flavorful, and like just generally savory food），证明词汇是被『调用』而非『背诵』。",
          "evidence": [
            "I use online shopping and clothes shopping as a form of you know like dopamine hit for me.",
            "I get my clothes from Zara and ASOS cuz I just love the hip and trendy but also timeless look.",
            "It was just everything was like a picture perfect postcard, you know. You could see the fields in the distance and the what you call them icebergs."
          ]
        },
        "grammar": {
          "score": 8.5,
          "why": "句式结构多样：原因状语从句（because I have kids）、介词短语作状语（because of my own preference）、定语从句（when when there's term breaks, you know, when when the school breaks）、并列与对比（but、so）混用自如。存在少量口误（filio fish、the what you call them icebergs 中的自我修补；I've got to 后的弱化结构），但没有出现系统性的时态或主谓错误，整体准确度足以支撑 8.5。给到 9 的扣分点在于个别并列从句结构稍显松散（when when there's term breaks, you know, when when the school breaks）。",
          "evidence": [
            "I try to go outside of the um school holiday season, but because I have kids, you know, we tend to have to go during, you know, the the you know, when when there's term breaks, you know, when when the school breaks.",
            "Generally because of my own preference, I love, you know, just to get Thai and Vietnamese. You know, this is something that I could, you know, just get around my local area. It's very easily sourced."
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "无法仅凭转写判断音段、重音与语调细节，但从转写中可观察到：(1) 话语有明显的意群断句与重音词功能化（'just to get Thai and Vietnamese'，'a form of you know like dopamine hit'）；(2) 弱化形式自然出现（cuz、gotta、'cause 风格的 cuz）；(3) 自我修正与重组结构（如 to ri to to ride the husky sled）显示发音时仍能保持思路连贯，未出现『卡词就停』的断裂；(4) 个别词似有发音犹豫（filio fish 可能为 Filet-O-Fish），但不构成系统性问题。基于以上文本层面线索，给出 8.5 推断，提示存在不确定性。",
          "evidence": [
            "to ri to to ride the husky sled, you know, was also an amazing experience for me.",
            "I try to eat really healthily, but then I tend to go down the filio fish, McDonald's uh route when I'm traveling."
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "I really love Asian food cuz I live in England, so it's harder to get Asian food around, but I like spicy, flavorful, and like just generally savory food.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I buy it more often than I should because I use online shopping and clothes shopping as a form of you know like dopamine hit for me.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I see myself as um different identities throughout my life, you know, before I became a mom, during and then also after when work became something that I could express myself, you know, true.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I dislike the addictive quality about it you know because so many of us are connected you know through a tablet or a device now and social media is our form of communication.",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "训练『不靠延长单句，而是靠信息密度』的扩展能力：回答一个 Part 1 问题时，按『直接答案 + 背景/原因 + 补充/对比』三步走，而不是用一个超长从句堆到底。例如把 I like Asian food 升级为 I really love Asian food cuz I live in England, so it's harder to get Asian food around, but I like spicy, flavorful, and like just generally savory food。",
        "刻意练习『即兴改述』与『搭配级』表达：当想说 good 时，尝试替换成 a favorite with everyone、amazing experience、a form of dopamine hit 等具体语块；准备 20–30 个可跨话题复用的搭配（addictive quality、build a community、target audience、easily sourced），在练习时强制使用。"
      ]
    }
  },
  {
    "id": "yt-ross-rbwx-b9",
    "part": 1,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "Band 9 speaking test with feedback (2025)",
    "prompt": "Full mock test with examiner-style feedback.",
    "source": "https://www.youtube.com/watch?v=RBwx5atq-PY",
    "sourceName": "Ross IELTS Academy",
    "score": 9.0,
    "duration": 691,
    "audioPath": "/audio/yt-ross-rbwx-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "Ross IELTS Academy Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "In part one, I asked you some personal questions. Let's talk about food. What is your favorite type of food? Um, my favorite type of food. Um, there's a lot of food out there. If I really had to dig deep, um, I'd say I like fast food. Um, definitely like my poutines and burgers. Um, barbecue food, too. Uh, ribs. I think that's probably one of my favorite foods. How often do you eat at restaurants? Eating at restaurants? Um, I think it depends on the week, you know. Um, having a bad week, um, maybe a little bit more, three, four times. Having good week, maybe I'm at home a little more, maybe just one, two times. I think it depends. Do you prefer home-cooked meals or eating out? Home-cooked meals. Um, I think everyone loves home-cooked meals at the end of the day. Uh, it's great to come home to a nice filling meal. Definitely some of my favorite home-cooked meals for sure. Definitely remember my mom having home-cooked meals. That's probably the best part. Now, let's talk about uh communication. How do you usually communicate with your friends? Communicate with my friends? I'd say Instagram and Snapchat on social media is for the most part how I talk to them. Why is that? Um I think it's more so just my age group with what I'd like to talk to and uh the easiest way to communicate. It's very popular. It's easy. Okay. You prefer texting or calling? It depends on who I'm talking to. Um, some of my close friends, I do enjoy calling them. Um, I find it a little bit more personal, but um, daytoday I'd say I text more than I call. How would you say communication has changed compared to the past? Um, definitely social media. It plays a huge role in it. Obviously, uh, in the last couple years, there's more and more social media and more and more people on it. So, uh, I think that's changed the most. you know, people used to be more face to face talking and now you're talking on social media a lot more. It's changed a lot in that way. Okay. Now, let's talk about your hobbies and interests. So, what is it? What is your favorite hobby and how often do you do it? Um, my favorite hobby, I'd have to say in the summertime would definitely be golfing. Um, I love getting out on the golf course. It's uh beautiful out there, very relaxing. It's uh it's great to do. In the winter time, I'd say snowboarding would be my favorite. Um, I don't get out as much as I'd like to, but uh, it's one of my favorite things to do. Okay. Have your hobbies changed since, uh, childhood? Um, definitely have changed since childhood growing up. Um, finding new friends, new interests. They've changed. I, uh, used to play soccer quite a bit as a child. Um, not so much anymore. Um, more so just the golfing. Um, take it easy. Uh, why do you think they've changed? How do you think they've changed? Um, I think just growing older, you know, things change. Um, obviously as a child, you have a lot of different friends, a lot different interests. You know, everyone wants to grow up and be a professional soccer player, but at the end of the day, not everyone can do that. So, I I think just getting older, maturing has changed them for the most part. Do you prefer hobbies that require more physical activity or more mental engagement? Definitely. Growing up playing sports, I'd say physical activity. Um, having that little bit of competitiveness behind myself. I definitely enjoy having a little bit of fun, you know, trying to win. No, not everyone always does, but I enjoy it. Why do you think more physical than mental? Um, I think uh I think that's where my strong suits are. Definitely on the physical side of things. All right. So, that concludes part one. We're going to move to part two. And in part two, I'm going to give you a topic. And I'd like you to talk about the topic for two minutes. Before you talk, you'll have about a minute. So you can write things down. I have a pen and paper here. You can make notes if you wish. Do you understand? Yes, I understand. Okay. You can take some paper and a pencil to make notes. And your topic is describe a time when you helped a stranger. So, let me start the clock and you can have one minute. All right. Go ahead. Okay, that was a minute. Um, you can start speaking now. Um, times I've helped a stranger. I think it's kind of hard to pinpoint just uh one time I've helped a stranger. I think over the past uh you seem to help strangers a lot more than you uh remember you do. just the simple things, opening doors for people, um giving them compliments, um just talking to someone when they need it. I think that's more uh helping a stranger than uh anyone could ever believe. Um it's definitely different. And of course, you have your family growing up, helping them, maybe not strangers, maybe family friends or friends. Uh …",
    "analysis": {
      "overallComment": "本段转写来自 Ross IELTS Academy 的 Band 9 模考示范。考生在 Part 1 的三个话题（食物、沟通、爱好）以及 Part 2 开头都能围绕题目做自然且有延伸的回答。整体接近 Band 9 的核心特征是：几乎无长时间卡顿，填充语（um/uh/you know）出现得自然且不破坏语流；回答与题目高度相关，并主动做举例、对比、自我解释；词汇偏口语地道表达（dig deep, at the end of the day, pinpoint, strong suits 等），搭配意识明显；语法在自然口语节奏下仍保持较高准确，并出现条件句、过去对比等结构。需说明的是：这是教学示范视频，考生给出的是 model answer，因此回答略显'训练有素'，但从自我修正（'Having good week'→重述）和犹豫痕迹看并非背诵，仍保留真实口语特征。",
      "whyHighScore": [
        "回答的'延伸度'是高分与 6.0-6.5 考生的最大分水岭：低分考生常一句话结束（如只说 'I like fast food'），而本考生会立刻补一个解释和一个例证（'If I really had to dig deep... I'd say I like fast food. Um, definitely like my poutines and burgers.'），这让 examiner 听到'可持续表达 2 分钟以上'的 9 分能力。",
        "低分考生常被问'why'时只能给最浅的 'because it's good'，而本考生能用 'I think just growing older, you know, things change. Um, obviously as a child, you have a lot of different friends, a lot different interests.' 进行多层次原因阐释，Coherence 体现明显的逻辑推进。",
        "词汇选择上避免 6 分段的 'very/very good' 式简单堆叠，而是用 'pinpoint', 'strong suits', 'face to face talking', 'home-cooked meals' 等搭配与习语，体现 Lexical Resource 的 8.5-9 段。",
        "语法不追求'完美书面句'，而是用自然口语中合理出现的条件句、第二习惯用法、过去 vs 现在对比；6 分段考生常因一个卡点停下重整句式，本考生即便有 'Having good week' 这种省略，仍能继续推进，体现 Grammatical Range & Accuracy 的高分稳定性。"
      ],
      "examinerTips": [
        "每题回答至少做到'表态 + 一个原因 + 一个例子'三件套：例如被问 favorite food 时不要只说 'I like fast food'，而是用本考生的 'If I really had to dig deep, um, I'd say I like fast food. Um, definitely like my poutines and burgers.' 模式——这种'先犹豫再明确表态+具体例子'是 Band 9 fluency 的可复制模板。",
        "被追问 'why' 时主动做'过去 vs 现在'对比而非给单一原因：参考本考生 'people used to be more face to face talking and now you're talking on social media a lot more'，这种自发的对比结构让 Coherence 立刻上 8 分，同时帮你在 Part 3 长问题里'撑满 30-40 秒'而不卡壳。"
      ],
      "listenExcerpts": [
        "If I really had to dig deep, um, I'd say I like fast food. Um, definitely like my poutines and burgers. Um, barbecue food, too. Uh, ribs.",
        "Um, I think it depends on the week, you know. Um, having a bad week, um, maybe a little bit more, three, four times. Having good week, maybe I'm at home a little more, maybe just one, two times.",
        "I think just growing older, you know, things change. Um, obviously as a child, you have a lot of different friends, a lot different interests. You know, everyone wants to grow up and be a professional soccer player, but at the end of the day, not everyone can do that.",
        "I think it's kind of hard to pinpoint just uh one time I've helped a stranger. I think over the past uh you seem to help strangers a lot more than you uh remember you do. just the simple things, opening doors for people, um giving them compliments, um just talking to someone when they need it."
      ],
      "listenTips": [],
      "practiceTips": [
        "每题回答至少做到'表态 + 一个原因 + 一个例子'三件套：例如被问 favorite food 时不要只说 'I like fast food'，而是用本考生的 'If I really had to dig deep, um, I'd say I like fast food. Um, definitely like my poutines and burgers.' 模式——这种'先犹豫再明确表态+具体例子'是 Band 9 fluency 的可复制模板。",
        "被追问 'why' 时主动做'过去 vs 现在'对比而非给单一原因：参考本考生 'people used to be more face to face talking and now you're talking on social media a lot more'，这种自发的对比结构让 Coherence 立刻上 8 分，同时帮你在 Part 3 长问题里'撑满 30-40 秒'而不卡壳。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 8.5,
        "grammar": 8.5,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "考生在 Part 1 三个话题中保持近乎'不间断'的语流，未出现 6 分段常见的'2-3 秒长停顿+重整句式'现象。填充语（um, uh, you know）以极快节奏出现，并未打断表意，反而像真实英语母语者的'连接词'。每题回答都能在 3-5 句内完成'表态—原因—举例—对比—回归观点'的微结构，这是 Band 9 'sustained fluency with natural hesitation'的典型特征。",
          "evidence": [
            "If I really had to dig deep, um, I'd say I like fast food. Um, definitely like my poutines and burgers. Um, barbecue food, too. Uh, ribs.",
            "Um, I think it depends on the week, you know. Um, having a bad week, um, maybe a little bit more, three, four times. Having good week, maybe I'm at home a little more, maybe just one, two times."
          ]
        },
        "lexical": {
          "score": 8.5,
          "why": "考生展现出'口语地道短语+一般搭配词'的双层储备。idiomatic chunks 如 'dig deep'、'at the end of the day'、'day-to-day'、'pinpoint'、'where my strong suits are' 都不是大纲死词，但用得自然；普通搭配 'home-cooked meals'、'face to face talking'、'social media' 准确。相较 6.5 考生只能反复用 'good / very much / I like it'，本考生的 Lexical Resource 进入 8-9 段。扣半分原因是自创短语 'my poutines and burgers' 与 'poutine' 这种文化词虽生动但偏个人化，并非考官更看重的'灵活 paraphrase'。",
          "evidence": [
            "If I really had to dig deep, um, I'd say I like fast food.",
            "Um, day-to-day I'd say I text more than I call.",
            "I think it's kind of hard to pinpoint just uh one time I've helped a stranger."
          ]
        },
        "grammar": {
          "score": 8.5,
          "why": "语法广度体现在混合使用条件句（second conditional）、过去 vs 现在对比、present perfect 提问、并列延伸结构 'definitely... too'，并未停留在 6 分段的'主谓宾+because'模板。准确度上几乎无明显错误，仅有 'Having good week'（漏 article）和 'people used to be more face to face talking'（缺 -ly）两处自然口语中可接受的省略/弱化，且不影响理解，符合 Band 9 'occasional inappropriate choices' 的描述。6 分段考生则会因一个错误停下来重整句子，导致 fluency 连带失分。",
          "evidence": [
            "If I really had to dig deep, um, I'd say I like fast food.",
            "I, uh, used to play soccer quite a bit as a child. Um, not so much anymore. Um, more so just the golfing.",
            "people used to be more face to face talking and now you're talking on social media a lot more"
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "无法从纯文本确定音质/重音/连读等发音特征，但可以从转写推断节奏与停顿模式：考生使用'短 um/uh + 立刻续说'的模式，几乎无超过 1 秒的犹豫，符合 Band 9 'uses a range of pronunciation features with effective control' 的节奏描述。自我修正痕迹（如 'I, uh, used to'、'Having bad week, um, maybe a little bit more, three, four times'）显示其表达是边说边组织，并非背诵，因此停顿模式真实自然。但因视频为教学示范，存在'配合镜头放慢语速'的可能性，故给 8.5 而非 9.0，并标注此为基于文本的有限推断。",
          "evidence": [
            "Um, my favorite type of food. Um, there's a lot of food out there. If I really had to dig deep, um, I'd say I like fast food.",
            "It's very popular. It's easy."
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "If I really had to dig deep, um, I'd say I like fast food. Um, definitely like my poutines and burgers. Um, barbecue food, too. Uh, ribs.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "Um, I think it depends on the week, you know. Um, having a bad week, um, maybe a little bit more, three, four times. Having good week, maybe I'm at home a little more, maybe just one, two times.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I think just growing older, you know, things change. Um, obviously as a child, you have a lot of different friends, a lot different interests. You know, everyone wants to grow up and be a professional soccer player, but at the end of the day, not everyone can do that.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I think it's kind of hard to pinpoint just uh one time I've helped a stranger. I think over the past uh you seem to help strangers a lot more than you uh remember you do. just the simple things, opening doors for people, um giving them compliments, um just talking to someone when they need it.",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "每题回答至少做到'表态 + 一个原因 + 一个例子'三件套：例如被问 favorite food 时不要只说 'I like fast food'，而是用本考生的 'If I really had to dig deep, um, I'd say I like fast food. Um, definitely like my poutines and burgers.' 模式——这种'先犹豫再明确表态+具体例子'是 Band 9 fluency 的可复制模板。",
        "被追问 'why' 时主动做'过去 vs 现在'对比而非给单一原因：参考本考生 'people used to be more face to face talking and now you're talking on social media a lot more'，这种自发的对比结构让 Coherence 立刻上 8 分，同时帮你在 Part 3 长问题里'撑满 30-40 秒'而不卡壳。"
      ]
    }
  },
  {
    "id": "yt-ross-zcSb-b9",
    "part": 1,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "Band 9 speaking test with feedback",
    "prompt": "Another Band 9 mock with feedback.",
    "source": "https://www.youtube.com/watch?v=zcSb1WsQduQ",
    "sourceName": "Ross IELTS Academy",
    "score": 9.0,
    "duration": 770,
    "audioPath": "/audio/yt-ross-zcSb-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "Ross IELTS Academy Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "from here starts the speaking test this is the speaking mock test of the international English language testing system taking place at Rod zelts Academy the candidate is akr aif candidate number 3278 The Examiner is Alex examiner number 443 533 good afternoon my name is Alex would you please tell me your full name my my name is akam aif you can call me akam okay let's start with part one I'm going to ask you some personal questions first question I will ask let's talk about your free time how do you usually spend your free time well it depends on my mood sometimes I like to relax with a book or movie and the other times I go for a walk or catch up with friends in fact I try to keep a balance between rest and being active Okay do you prefer spending free time alone or with friends actually both I enjoy hanging out with friends for fun activities but I also need a long time to recharge you know it really depends on how I'm playing okay has your way of spending free time changed over the years definitely when I was younger I spent a lot of time playing games or going out but now I prefer more productive activities like reading or learning new skills or something like that okay now let's talk about shopping how often do you go shopping not very often I usually shop once or twice a month unless I need something urgent you know I prefer to buy everything in one go okay do you prefer shopping online or would you rather in store online for sure because it's more convenient and I can compare prices easily but for something like clothes I prefer in store shopping to try them on is shopping an enjoyable activity for you or just a necessity uh mostly a necessity I like buying things I need but I don't enjoy spending hours browsing so I prefer to shop efficiently now let's talk about traveling do you like traveling absolutely I love exploring new cultures meeting people and trying different foods you know traveling is always a refreshing experience for me what is the most interesting place that you have ever visited it was tum one of the interesting cities of Mexico the mixture of ancient temples and Modern Life was fascinating and the food was amazing do you prefer to travel alone or do you like traveling with others it depends I enjoy group trips for fun but I also like solo travel because it gives me more freedom to explore okay that concludes part one to the exam we're going to move to part two now I'm going to give you a topic and I'd like you to talk about it for about two minutes before you talk you'll have one minute to prepare your what you're going to say I'll give you a pen and paper so you can make some notes okay here's a pen and paper and so you can just make some notes do you understand okay so the question is describe a time when you had to make a difficult decision go ahead I'll start the timer for okay that was a minute for Preparation you can now begin speaking all right I'd like to talk about a really tough decision I had to make a few years ago uh it happened when I was offered a job in vanare at the time I had a stable job in London my hometown I really liked my colleagues and my family was nearby which was a huge plus uh but what about new job it was an amazing opportunity better pay career growth and the chance to work on Project I was actually passionate about so yeah it was really tempting for me uh I basically had two options stay where I was in my comfort zone or take a risk and move somewhere completely new where I didn't know anymore and uh honestly it was a real dilemma for me the offer sounded great but I was scared of leaving everything behind after a lot of thinking and talking friends and family I decided to go for it it it wasn't easy at first I had to leave my family and friends behind uh find a new place to leave and adjust a new environment that time I felt lonely and overwhelmed but honestly looking back I know I made the right choice if anything this experience taught me that stepping out of your uh comfort zone really pushes you to grow so it was one of the hardest decisions I've ever made but uh I have zero regrets okay that concludes that part of the test I'll take back that paper from you now we move on to part three I did a good job we've been talking about a time when you had to make a difficult decision and i' now like to ask you some questions more onto that so first question I'd like to ask you is why is it sometimes hard for people to make decisions that's a great question honestly I think it's because people are afraid of making the wrong choice like if it's something small no big deal but when it comes to …",
    "analysis": {
      "overallComment": "该考生在三个 Part 中都展示了接近母语者的口语能力。Part 1 每个问题都用 2–4 句完整展开并给出明确立场；Part 2 紧扣题卡，叙事清晰（情境—选项—决定—结果—感悟）；Part 3 即使在被截断的回答里也能立刻进入抽象讨论。语言层面几乎不出现影响理解的口误，词汇和句式都明显高于题面要求。视频在 Part 2 结束后插入了一句非考生话语『I did a good job』（疑似教师点评/转场），这并非考生作答，评分时应忽略；除此以外转写基本为考生原声。综合四项标准，整体表现稳定在 Band 8.5–9.0 区间。",
      "whyHighScore": [
        "展开充分且有立场：6.0–6.5 考生常因答案过短或泛泛而谈被扣分，本示范几乎每个答案都给出明确偏好并补充理由，例如『online for sure because it's more convenient and I can compare prices easily』，逻辑闭环、长度可控。",
        "词汇精准且具搭配意识：低分考生易重复 shopping / travel 等高频词，本示范使用『recharge』『browsing』『stepping out of your comfort zone』『huge plus』『career growth』等自然搭配，且能准确区分 in-store 与 online 语境。",
        "语法在保持自然的同时展现广度：除了基本时态，还出现『when I was offered a job』『if anything this experience taught me that stepping out of your comfort zone really pushes you to grow』这类名词性从句和让步结构，仅有极个别小错（如 live/leave 同音混淆），不影响得分。",
        "Part 2 任务完成度高：结构完整，结尾有反思（『it was one of the hardest decisions I've ever made but I have zero regrets』），符合高分对『sustained discourse + clear organisation』的要求，而 6 分段考生常停留在事件罗列、没有明确收束。"
      ],
      "examinerTips": [
        "每个 Part 1 问题至少给 2–3 句：先表态（definitely / mostly / online for sure），再给一句原因，再用 in fact / honestly 加一句延伸，能稳定拿到 7.5+ 的流利与连贯分。",
        "Part 2 答题要有清晰收束：事件讲完后补一句反思或感悟（『looking back, I know I made the right choice』），比单纯描述更接近高分范例。"
      ],
      "listenExcerpts": [
        "well it depends on my mood sometimes I like to relax with a book or movie and the other times I go for a walk or catch up with friends in fact I try to keep a balance between rest and being active",
        "online for sure because it's more convenient and I can compare prices easily but for something like clothes I prefer in store shopping to try them on",
        "I basically had two options stay where I was in my comfort zone or take a risk and move somewhere completely new where I didn't know anymore and uh honestly it was a real dilemma for me",
        "if anything this experience taught me that stepping out of your comfort zone really pushes you to grow so it was one of the hardest decisions I've ever made but I have zero regrets"
      ],
      "listenTips": [],
      "practiceTips": [
        "每个 Part 1 问题至少给 2–3 句：先表态（definitely / mostly / online for sure），再给一句原因，再用 in fact / honestly 加一句延伸，能稳定拿到 7.5+ 的流利与连贯分。",
        "Part 2 答题要有清晰收束：事件讲完后补一句反思或感悟（『looking back, I know I made the right choice』），比单纯描述更接近高分范例。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 9.0,
        "grammar": 8.5,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "语速稳定，长答案不卡壳；频繁使用 well / actually / in fact / honestly / so yeah 等自然话语标记，使节奏听上去像对话而非背诵。出现少数 uh 和一次疑似口误（『how I'm playing』后自行调整），但属于自然语流特征，符合 9 分对『sustained fluent speech with only occasional self-correction』的描述。",
          "evidence": [
            "well it depends on my mood sometimes I like to relax with a book or movie and the other times I go for a walk or catch up with friends in fact I try to keep a balance between rest and being active",
            "I basically had two options stay where I was in my comfort zone or take a risk and move somewhere completely new where I didn't know anymore and uh honestly it was a real dilemma for me"
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "用词灵活、搭配地道，能用不同说法表达相近意思（relax with a book or movie / hang out with friends / recharge / productive activities / refreshing experience / comfort zone / zero regrets）。没有生硬直译或重复，话题相关词（solo travel, in store shopping, career growth）使用准确。",
          "evidence": [
            "I also need a long time to recharge you know it really depends on how I'm playing",
            "traveling is always a refreshing experience for me",
            "stepping out of your comfort zone really pushes you to grow so it was one of the hardest decisions I've ever made but I have zero regrets"
          ]
        },
        "grammar": {
          "score": 8.5,
          "why": "句式丰富，包含过去进行叙事（when I was offered a job）、比较（better pay career growth）、条件/让步（if anything this experience taught me that…）、定语从句（which was a huge plus）。唯一可见的小错是『find a new place to leave』应为 live，以及个别介词/冠词省略（如『talking friends and family』），但都不影响理解，符合 8.5–9 的『frequent error-free sentences, occasional slips』特征。",
          "evidence": [
            "it happened when I was offered a job in vanare at the time I had a stable job in London my hometown I really liked my colleagues and my family was nearby which was a huge plus",
            "if anything this experience taught me that stepping out of your comfort zone really pushes you to grow"
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "转写无法直接听辨音质，但可从节奏、停顿和偶尔自我修正推断：句群长度均匀，几乎没有长时间卡顿；词重音和句重音通过意群划分呈现（如『I love exploring new cultures | meeting people | and trying different foods』）。自我修正『how I'm playing』的痕迹暗示该考生具备较强监控能力，常见于 8.5+ 段。需提醒：此判断基于转写推断，真实语音可能更高或更低。",
          "evidence": [
            "absolutely I love exploring new cultures meeting people and trying different foods",
            "after a lot of thinking and talking friends and family I decided to go for it"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "well it depends on my mood sometimes I like to relax with a book or movie and the other times I go for a walk or catch up with friends in fact I try to keep a balance between rest and being active",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "online for sure because it's more convenient and I can compare prices easily but for something like clothes I prefer in store shopping to try them on",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I basically had two options stay where I was in my comfort zone or take a risk and move somewhere completely new where I didn't know anymore and uh honestly it was a real dilemma for me",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "if anything this experience taught me that stepping out of your comfort zone really pushes you to grow so it was one of the hardest decisions I've ever made but I have zero regrets",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "每个 Part 1 问题至少给 2–3 句：先表态（definitely / mostly / online for sure），再给一句原因，再用 in fact / honestly 加一句延伸，能稳定拿到 7.5+ 的流利与连贯分。",
        "Part 2 答题要有清晰收束：事件讲完后补一句反思或感悟（『looking back, I know I made the right choice』），比单纯描述更接近高分范例。"
      ]
    }
  },
  {
    "id": "yt-pro-bwww-b9",
    "part": 1,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "Full Speaking Mock Test · Band 9",
    "prompt": "Full IELTS speaking mock test (Band 9).",
    "source": "https://www.youtube.com/watch?v=Bwwwot4vrYI",
    "sourceName": "English Pro Tips",
    "score": 9.0,
    "duration": 1336,
    "audioPath": "/audio/yt-pro-bwww-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "English Pro Tips Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "good morning my name is Eli how can you please tell me your full name yes my name is Emma Martinez Hayes and what should I call you just Emma's fine okay Emma in this first part I'd like to ask you some questions about yourself let's talk about what you do do you work or are you a student I work I am an entrepreneur so I have an online Language Academy and I create content for that Language Academy I also teach languages I teach English and Spanish so I have a few different job positions but yes I work and of course part of being an entrepreneur is learning so I have to study a lot as well um how many hours a week do you study for roughly I would say it depends on the week if I have more work if I have a lot of work then I'll probably study maybe four to 5 hours 1 hour a day I will dedicate to reading or watching videos or podcasts about how I can improve in my job but my main focus is is work um do you think you will continue this work for a long time yes I I believe I'll continue this work because I'm trying to create something that can sustain myself and my family in the future so I hope that I will be doing this for a long time and I'm that's why I'm studying and working in order to make sure that this business and yes everything that I'm creating can last a long time let's move on let's talk about teachers do you remember your teachers from primary school I remember a few I remember a few of them not all of them but I did have a few teachers that were very special to me did you have a favorite teacher I did have a favorite teacher she was my kindergarten teacher yes and did you want to be a teacher when you were younger I thought about being a teacher and I think that's because I'm the oldest of five siblings so I had the just from a very young age I had the role of like the oldest the teacher the leader so I think that conditioned me being a teacher now so yes I wanted to be a teacher and I actually used to play teacher and student with my brothers and sisters so I was the teacher and they were students what kind of teachers do you prefer to have I think the best teachers are empathetic so they listen to students and are very understanding with students and always give students space to speak especially if we're talking about language learning I think that my preferred way of learning and teaching languages is through practice instead of lect leing students so I never want to just lecture my students well let's talk about languages what languages do you speak I speak English Spanish and Portuguese and I'm learning French right and have you ever learned any foreign languages in school technically Spanish but the US system is not the best for foreign languages so they don't have they don't put much weight on learning languages unfortunately here in Spain there's more weight so you know kids from a very young age have to learn either well they have to learn English and French and in the US we don't have that do you think it's difficult to learn a new language I think it's difficult to learn a new language and I think it's more difficult for some people than others some people just have a natural skill when it comes to speaking and learning languages and acquiring languages and I think you just have to to know what your learning style is and what your strengths are as a learner as a student but in general I do think that languages are hard to learn because they're very complex and there are so many different accents so you know you if you're learning British English you're going to hear a lot of different phrases that don't exist in the US why do you think there are some people I guess like yourself that enjoy learning lots and lots of languages yeah I think it for me it's a challenge it's a challenge to make your brain rewire your brain to think a different way and have contact with different experiences and different perspectives and I think that people who know more than one language can connect with more people from all over the world just for the fact that they can speak with different people and you can always make other people feel more more comfortable when you speak their language okay we're going to move on to part two and in this part I'm going to give you a topic and I'd like you to talk about it for one to two minutes before you talk you'll have one minute to think about what you're going to say and you can make some notes if you wish do you understand yes okay your one minute starts now looks like you might be ready to go yeah I am so all right all right I'll just I'll just introduce you okay all right remember you have …",
    "analysis": {
      "overallComment": "Emma的回答在四项评分维度上均达到Band 9水准。她对Part 1简短问题的回答扩展充分，逻辑推进自然，词汇精确且具话题纵深（如entrepreneur、conditioned、rewire your brain），语法结构复杂但极少失误。自我修正（如'leing students → lecture'）和少量填充语（'um'、'you know'）并不构成扣分项，反而显示自然的口语节奏。与6.0–6.5考生相比，她并非只给短答案，而是每题主动延伸1–3句，且句间衔接清晰、立场明确。",
      "whyHighScore": [
        "回答长度与拓展度极高：低分考生通常给1–2句短答即停，Emma则每题主动补充原因、举例、个人背景，例如'and of course part of being an entrepreneur is learning so I have to study a lot as well'，这种延伸是Fluency & Coherence拿高分的关键。",
        "词汇灵活且具话题纵深：低分考生多用work、study、good等基础词，Emma使用'entrepreneur'、'sustain'、'conditioned'、'acquiring languages'、'rewire your brain'、'put much weight on'等，显示Lexical Resource达9.0所需的paraphrase与collocations能力。",
        "语法复杂且错误极少：低分考生多停留在简单句和过去时错误，Emma能产出条件状语、让步从句、现在完成进行、被动结构，且仅出现'leing'这一处口误并立即修正，体现9.0水准的Grammatical Range & Accuracy。",
        "衔接与逻辑推进自然：低分考生常用'and…and…'或停顿卡壳，Emma使用'so'、'because'、'in order to'、'you know'、'especially if'、'in general'等衔接词，使答案在Coherence上完全无痕迹地被理解。",
        "本段为公开示范录音中的考生作答（Emma为被考者），并非教师讲解，因此model answer片段与考试作答一致，可作为Part 1–2的范例参考。"
      ],
      "examinerTips": [
        "不要只回答Yes/No：被问到'will you continue this work?'时，先给立场（yes, I believe so），再用'because I'm trying to create something that can sustain myself and my family in the future…'补一个具体目标，考官会立即把Coherence往上拉一档。",
        "把个人故事当作'理由支架'：当被问'why did you want to be a teacher?'时，Emma用'because I'm the oldest of five siblings so I had the role of the oldest the teacher the leader'把抽象问题落到具体家庭背景上，这是Band 8+考生拉开差距的常用做法。",
        "善用paraphrase与替换表达：当一时找不到lecturing这个词时说'leing students'，立刻自我修正为'lecture'，并补一句'so I never want to just lecture my students'——这种监控与修正能力是Lexical Resource 8.5+的标志。",
        "结尾用一句概括性总结收束：Emma在Part 1每段结尾都会自然地'wrap up'（如'can last a long time'、'you can always make other people feel more comfortable'），让答案有始有终，避免'答完就跑'的6.0感。"
      ],
      "listenExcerpts": [
        "I am an entrepreneur so I have an online Language Academy and I create content for that Language Academy I also teach languages I teach English and Spanish so I have a few different job positions",
        "I'm trying to create something that can sustain myself and my family in the future so I hope that I will be doing this for a long time",
        "I think the best teachers are empathetic so they listen to students and are very understanding with students and always give students space to speak especially if we're talking about language learning I think that my preferred way of learning and teaching languages is through practice instead of lect leing students so I never want to just lecture my students",
        "it's a challenge to make your brain rewire your brain to think a different way and have contact with different experiences and different perspectives and I think that people who know more than one language can connect with more people from all over the world"
      ],
      "listenTips": [],
      "practiceTips": [
        "不要只回答Yes/No：被问到'will you continue this work?'时，先给立场（yes, I believe so），再用'because I'm trying to create something that can sustain myself and my family in the future…'补一个具体目标，考官会立即把Coherence往上拉一档。",
        "把个人故事当作'理由支架'：当被问'why did you want to be a teacher?'时，Emma用'because I'm the oldest of five siblings so I had the role of the oldest the teacher the leader'把抽象问题落到具体家庭背景上，这是Band 8+考生拉开差距的常用做法。",
        "善用paraphrase与替换表达：当一时找不到lecturing这个词时说'leing students'，立刻自我修正为'lecture'，并补一句'so I never want to just lecture my students'——这种监控与修正能力是Lexical Resource 8.5+的标志。",
        "结尾用一句概括性总结收束：Emma在Part 1每段结尾都会自然地'wrap up'（如'can last a long time'、'you can always make other people feel more comfortable'），让答案有始有终，避免'答完就跑'的6.0感。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 9.0,
        "grammar": 9.0,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "回答节奏稳定，几乎无长时间卡顿；语速自然，自我修正后立即继续；逻辑推进清晰（原因→举例→总结）。考官听到这种几乎'听不出是外语'的流畅度，会直接给9.0。低分考生常出现的'长停顿、重复半句、放弃重说'在这里完全看不到。",
          "evidence": [
            "I work I am an entrepreneur so I have an online Language Academy and I create content for that Language Academy I also teach languages I teach English and Spanish so I have a few different job positions but yes I work and of course part of being an entrepreneur is learning so I have to study a lot as well",
            "I think it for me it's a challenge it's a challenge to make your brain rewire your brain to think a different way and have contact with different experiences and different perspectives"
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "用词精准且有纵深，能在即兴场景下使用entrepreneur、sustain、empathetic、conditioned、acquiring languages、rewire your brain、put much weight on等中高阶词汇与搭配，并能自然paraphrase（'through practice instead of lecturing students'）。低分考生常出现'good teacher'、'like study language'等笼统表达，Emma则展示9.0所需的'少而精、灵活地道'的词汇掌控。",
          "evidence": [
            "I think the best teachers are empathetic so they listen to students and are very understanding with students and always give students space to speak",
            "it's a challenge to make your brain rewire your brain to think a different way and have contact with different experiences and different perspectives",
            "the US system is not the best for foreign languages so they don't have they don't put much weight on learning languages"
          ]
        },
        "grammar": {
          "score": 9.0,
          "why": "句式丰富且错误极少：使用条件状语（'if I have more work…'）、让步/原因从句（'I think that's because I'm the oldest of five siblings so I had the just from a very young age I had the role of like the oldest the teacher the leader'）、现在完成/进行意味（'I am learning French right now'）、被动态（'kids…have to learn'）和动词搭配（'conditioned me being a teacher'）。唯一的'leing'是口误自我修正，不影响9.0。低分考生常出现时态混乱、第三人称单数遗漏、简单句堆砌，Emma几乎不犯。",
          "evidence": [
            "I'm trying to create something that can sustain myself and my family in the future so I hope that I will be doing this for a long time",
            "some people just have a natural skill when it comes to speaking and learning languages and acquiring languages and I think you just have to to know what your learning style is and what your strengths are as a learner as a student"
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "转写中可见自然节奏与轻微填充语（'um'、'you know'），且出现自我修正（'leing students…lecture my students'），表明考生具备监控自我发音的能力并能即时调整。无法从文字判断重音、连读、元音清晰度等具体语音特征，因此本项存在不确定性。保守给8.5，若音频中重音准确、连读自然，则可达9.0。低分考生常出现单词重音错误、句重音丢失导致整段平读，Emma至少在节奏层面未出现明显问题。",
          "evidence": [
            "I never want to just lecture my students（自我修正痕迹显示发音监控能力）",
            "I would say it depends on the week if I have more work if I have a lot of work then I'll probably study maybe four to 5 hours 1 hour a day I will dedicate to reading（条件句的节奏与重音分布体现自然语流）"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "I am an entrepreneur so I have an online Language Academy and I create content for that Language Academy I also teach languages I teach English and Spanish so I have a few different job positions",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I'm trying to create something that can sustain myself and my family in the future so I hope that I will be doing this for a long time",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I think the best teachers are empathetic so they listen to students and are very understanding with students and always give students space to speak especially if we're talking about language learning I think that my preferred way of learning and teaching languages is through practice instead of lect leing students so I never want to just lecture my students",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "it's a challenge to make your brain rewire your brain to think a different way and have contact with different experiences and different perspectives and I think that people who know more than one language can connect with more people from all over the world",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "不要只回答Yes/No：被问到'will you continue this work?'时，先给立场（yes, I believe so），再用'because I'm trying to create something that can sustain myself and my family in the future…'补一个具体目标，考官会立即把Coherence往上拉一档。",
        "把个人故事当作'理由支架'：当被问'why did you want to be a teacher?'时，Emma用'because I'm the oldest of five siblings so I had the role of the oldest the teacher the leader'把抽象问题落到具体家庭背景上，这是Band 8+考生拉开差距的常用做法。",
        "善用paraphrase与替换表达：当一时找不到lecturing这个词时说'leing students'，立刻自我修正为'lecture'，并补一句'so I never want to just lecture my students'——这种监控与修正能力是Lexical Resource 8.5+的标志。",
        "结尾用一句概括性总结收束：Emma在Part 1每段结尾都会自然地'wrap up'（如'can last a long time'、'you can always make other people feel more comfortable'），让答案有始有终，避免'答完就跑'的6.0感。"
      ]
    }
  },
  {
    "id": "yt-pro-le-b9",
    "part": 1,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "Incredible Band 9 Speaking Test",
    "prompt": "Full Band 9 speaking mock with a young candidate.",
    "source": "https://www.youtube.com/watch?v=LE_F9u-DYe0",
    "sourceName": "English Pro Tips",
    "score": 9.0,
    "duration": 1339,
    "audioPath": "/audio/yt-pro-le-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "English Pro Tips Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "Watch this video and try to guess what's happening. Did you guess what's happening? This is Sia from Kazakhstan opening her IELTS results. What were they? Well, she got reading nine, listening nine, writing eight, and speaking nine. So, overall band nine. And as you can tell, well, as you can almost tell, she is ecstatic. It's hard to tell whether she's ecstatic or sad, but yes, she is super super happy to get such an amazing IELTS score. She's probably in the like 0.001% of IELTS test takers. I've only really ever met one other person that's got overall bad nine. So, it's absolutely incredible. Anyway, we met up and we did an IELTS mock test and that's what I'm going to show you today. So, watch the mock test and learn from all of the great vocabulary tactics and techniques that Sia uses in this speaking mock test. And stick around until the end because Sia gives you some great advice for how to improve your English and IELTS skills. All right, enjoy. Good morning. My name is Eli Hows. Can you please tell me your full name? Of course. My full name is Sai Kidi. You can call me by my first name, Sia. In this first part, I'd like to ask you some questions about yourself. Let's talk about what you do. Do you work or are you a student? I'm a senior in high school. So, I'm graduating this year. What subjects are you studying? Well, since I study in a public high school, I don't really have a choice the subjects that I get to study. So, I have to study some compulsory subjects like calculus, history, literature, and there are some extracurricular activities like drama classes and swimming that I can take. However, since I am preparing for my exams and for my college admission, um I don't really have time to take up those extracurricular activities. And what would you like to do in the future? That's a really interesting question. I'm really into political science. So, probably that's the sphere uh where I'll pursue my bachelor's and hopefully master's degree and maybe my career as well. Let's move on. Let's talk about cafes. Do you have a favorite cafe? Uh, sure. It is a place right near my house. It's a warm, cozy place. What makes it special is the friendly atmosphere there. Um, also I love the attention and love with which the staff make each cup of coffee. It makes the experience even more enjoyable. Do you often go to cafes by yourself? Yes, I find uh cafes to be a perfect place to work and or unwind with a book because the hum of background conversations coupled with some soft music, they give you the feeling of concentration without the feeling of isolation. What do you think helps to make a cafe popular? Well, uh, there are several factors that make a certain cafe popular among people. The first that immediately springs to my mind is a word of mouth recommendations. I mean, if a cafe has good food there, good service um, and etc. People would be more likely to visit it again probably with their friends. So, it would help to grow it a loyal clientele. Um also we have to consider that since we live in a digital era uh era it is important to pay attention to media presence. So if cafes make their uh Instagram, Tik Tok or even maybe YouTube pages more attractive to visitors, it can play a significant role in their popularity. Why do some people prefer cafes that are part of larger chains rather than small local independent cafes? Wow, that's a really interesting question. probably because international cafe chains, they are um they seem more reliable to people because they already know what to expect and usually they offer certain conveniences like huge parking spaces or reliable Wi-Fi to their uh customers. Let's move on. Let's talk about perfume. Do you like to use perfume? I love perfume. It's honestly a part of my outfit. If I do not have perfume on, I feel as if there's a part of my outfit that's missing. So, honestly, I have a very big collection of perfumes that I use. And in fact, all of my family members are obsessed with um like smell and with perfume. So, I think it's something that runs in my runs in my blood. And how often do you wear perfume? Every single day. I wear different perfume. every single day. By the way, um that depends on my mood and what outfit I'm wearing for the day. Have you ever given perfume as a gift? Well, um I did not really think that it is a good sign to give perfume, at least in our culture in Kazakhstan. Uh but to my international friends that came visiting from Italy, there was a certain perfume uh that I bought from the UAE and it had a very specific smell that I knew that my Italian friends would enjoy. So I that was the only occasion when I gave perfume as a present. Um although I've been to many different places with beautiful scenery, there is a place that has a special um place in my heart and it is the …",
    "analysis": {
      "overallComment": "该示范中的考生 Sia 展现出极接近 Band 9.0 的整体表现。她的回答长度充分、发展层次清晰，词汇选择精准且搭配自然，句法结构多样且极少错误，节奏与停顿接近地道母语者。需要注意的是，转写开头 Eli 老师的大段介绍属于教学讲解而非考生作答，真正的考生作答从 'Good morning. My name is Eli Hows' 后开始。考生在 Part 1 中对'学习/工作''咖啡馆''香水'等日常话题仍能给出远超市面 6.0–6.5 考生的深度与精度，这正是其能冲击 9.0 的核心原因。",
      "whyHighScore": [
        "回答不仅长，而且有清晰的展开层次：先给答案，再用具体理由或例子支撑。6.0–6.5 考生通常只给一两句简短回应，例如 'Yes, I like cafes. They are nice.'；而 Sia 会用 'What makes it special is...' 主动展开主题。",
        "词汇选择体现搭配意识与精确度（paraphrase 能力很强），例如 'word of mouth recommendations' 'loyal clientele' 'media presence'，而非笼统的 'people like it'。这是 6.0–6.5 考生最常缺乏的能力。",
        "语法上能稳定输出多种复杂结构（条件句、让步状语、被动语态、关系从句），且错误极少；6.0–6.5 考生虽然能说复杂句，但错误率高、句式单一。",
        "衔接手段自然灵活，使用 'Well' 'So' 'However' 'Um also' 'I mean' 等口语填充词，模仿自然对话节奏，而不是背诵式的生硬衔接。"
      ],
      "examinerTips": [
        "学会用'先答—再解释—再举例'的三段式结构展开 Part 1 答案，避免一句话结束。例如 'I love cafes. It's a warm, cozy place. What makes it special is the friendly atmosphere...' 就是教科书式的展开。",
        "刻意训练搭配意识（collocation），不要只用 'very good' 'very famous'。尝试用 'loyal clientele' 'word of mouth' 'media presence' 'coupled with' 等搭配，让词汇显得精准自然。",
        "Part 1 也可使用复杂句型（如让步、原因、关系从句），不必担心'太难'。关键是在准确的前提下展示结构多样性，例如 'Even though it's a small place, what makes it special is...' 这种让步句。",
        "允许自然的口头填充（'well' 'um' 'I mean'）和少量自我修正，这反而体现真实交流能力，比背诵式回答更能拿高分。"
      ],
      "listenExcerpts": [
        "the hum of background conversations coupled with some soft music, they give you the feeling of concentration without the feeling of isolation",
        "The first that immediately springs to my mind is a word of mouth recommendations.",
        "international cafe chains, they are um they seem more reliable to people because they already know what to expect and usually they offer certain conveniences like huge parking spaces or reliable Wi-Fi",
        "I love perfume. It's honestly a part of my outfit. If I do not have perfume on, I feel as if there's a part of my outfit that's missing."
      ],
      "listenTips": [],
      "practiceTips": [
        "学会用'先答—再解释—再举例'的三段式结构展开 Part 1 答案，避免一句话结束。例如 'I love cafes. It's a warm, cozy place. What makes it special is the friendly atmosphere...' 就是教科书式的展开。",
        "刻意训练搭配意识（collocation），不要只用 'very good' 'very famous'。尝试用 'loyal clientele' 'word of mouth' 'media presence' 'coupled with' 等搭配，让词汇显得精准自然。",
        "Part 1 也可使用复杂句型（如让步、原因、关系从句），不必担心'太难'。关键是在准确的前提下展示结构多样性，例如 'Even though it's a small place, what makes it special is...' 这种让步句。",
        "允许自然的口头填充（'well' 'um' 'I mean'）和少量自我修正，这反而体现真实交流能力，比背诵式回答更能拿高分。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 9.0,
        "grammar": 9.0,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "语速稳定，停顿多为自然思考性停顿而非卡顿。回答内部逻辑链清晰，从观点到理由到例证层层推进。自我修正也处理得自然，不影响整体流畅度。低分考生常出现长时间卡顿、重复同一表达、或回答仅一句话即停止的情况。",
          "evidence": [
            "What makes it special is the friendly atmosphere there. Um, also I love the attention and love with which the staff make each cup of coffee.",
            "The first that immediately springs to my mind is a word of mouth recommendations. I mean, if a cafe has good food there, good service um, and etc."
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "用词明显高于日常口语水准，体现精准的搭配能力（collocation）和同义替换能力（paraphrasing）。能够使用 'compulsory subjects' 'extracurricular activities' 'coupled with' 'loyal clientele' 'media presence' 等学术化或书面化短语而不显得刻意。6.0–6.5 考生常依赖高频基础词如 'good' 'nice' 'famous'，且搭配不自然。",
          "evidence": [
            "I have to study some compulsory subjects like calculus, history, literature, and there are some extracurricular activities like drama classes and swimming that I can take.",
            "the hum of background conversations coupled with some soft music, they give you the feeling of concentration without the feeling of isolation",
            "it can play a significant role in their popularity"
          ]
        },
        "grammar": {
          "score": 9.0,
          "why": "句法结构丰富且准确：使用让步状语从句、原因状语从句、关系从句、被动结构、进行时表习惯等。极少出现错误（仅有 'a word of mouth recommendations' 的冠词小错和 'a special um place' 的口误后立即自我修正）。低分考生即使想用复杂句，错误率会明显升高，且倾向于反复使用 'because' 'and'。",
          "evidence": [
            "However, since I am preparing for my exams and for my college admission, um I don't really have time to take up those extracurricular activities.",
            "Wow, that's a really interesting question. probably because international cafe chains, they are um they seem more reliable to people because they already know what to expect and usually they offer certain conveniences like huge parking spaces or reliable Wi-Fi to their uh customers."
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "从转写中可观察到几个发音特征：使用 'Wow' 'Um' 等自然语气词体现地道语流；存在自我修正痕迹（'a special um place' 中 'um' 像是替代了某词），表明考生具备监控自身语言输出的能力。单词重音和节奏较为自然，'media presence' 'loyal clientele' 等多音节词使用流畅。给出 8.5 而非 9.0 的原因是：转写无法完全呈现音段层面的发音，且 'a word of mouth recommendations' 的小错可能反映轻微的冠词/连读问题，但因无法听辨，不宜过度推断。",
          "evidence": [
            "Wow, that's a really interesting question.",
            "there is a place that has a special um place in my heart"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "the hum of background conversations coupled with some soft music, they give you the feeling of concentration without the feeling of isolation",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "The first that immediately springs to my mind is a word of mouth recommendations.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "international cafe chains, they are um they seem more reliable to people because they already know what to expect and usually they offer certain conveniences like huge parking spaces or reliable Wi-Fi",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I love perfume. It's honestly a part of my outfit. If I do not have perfume on, I feel as if there's a part of my outfit that's missing.",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "学会用'先答—再解释—再举例'的三段式结构展开 Part 1 答案，避免一句话结束。例如 'I love cafes. It's a warm, cozy place. What makes it special is the friendly atmosphere...' 就是教科书式的展开。",
        "刻意训练搭配意识（collocation），不要只用 'very good' 'very famous'。尝试用 'loyal clientele' 'word of mouth' 'media presence' 'coupled with' 等搭配，让词汇显得精准自然。",
        "Part 1 也可使用复杂句型（如让步、原因、关系从句），不必担心'太难'。关键是在准确的前提下展示结构多样性，例如 'Even though it's a small place, what makes it special is...' 这种让步句。",
        "允许自然的口头填充（'well' 'um' 'I mean'）和少量自我修正，这反而体现真实交流能力，比背诵式回答更能拿高分。"
      ]
    }
  },
  {
    "id": "yt-daily-julia-b9",
    "part": 1,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "Mock Exam · Julia from Australia · Band 9",
    "prompt": "Full Parts 1–3 mock exam with a Band 9 candidate.",
    "source": "https://www.youtube.com/watch?v=ecN15c3gZYg",
    "sourceName": "IELTS Daily",
    "score": 9.0,
    "duration": 1990,
    "audioPath": "/audio/yt-daily-julia-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Daily Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "Hello there, Lar Ryan here with IELTS Daily, and today, we have a special IELTS speaking test. We have Maddie as our examiner, who you know very well, and we also have Julia who is an Australian native English speaker. Who is studying at University. And she's doing a practice IELTS speaking test today and we'll get to see what a native English speaker really sounds like. For those of you who don't know me already, my name is Lar Ryan, and I've been an IELTS examiner for the writing and speaking components of the IELTS test. I've been teaching IELTS since 2010, and I have my own YouTube channel called \"complete test success\". Hello and welcome to this practice exam conducted by IELTS Daily. My name is Maddie, and I'm your practice IELTS speaking examiner. The questions in this test are designed to simulate the IELTS speaking test. Let's stop. What's your first name, please? Julia. Thanks, Julia. Are you ready to begin? Yes, I am. Let's talk about your hometown. Do you live in a city, in a town, or in the country? So originally I'm actually from Sydney. So Sydney is a coastal town, so it's near the beach. So a lot of things that you can do near the beach include swimming, you can go for walks, it's really lovely. Um, I now actually live in Melbourne. So that's more of a city, an urban town. So things that you can do are shopping you can go walking again but through the streets, this time as a person at beach. Um, both cities are lovely, and I'm very happy, yeah. Now a very important part of your fluency and coherence score is your use of discourse markers. And what you may or may not have noticed is that Julia as a native English speaker, uses them a lot. In fact, in that short answer, she used fourteen discourse markers. So she used the word \"originally\". She used the word \"actually\", on two occasions, to show the examiner that they might be surprised by this information. She used the word \"so\" to give herself time to think. And she used the word \"am\" in the same way. She also said; again, but, this time, as opposed to. And at the end of her answer, she said yeah to indicate that she had finished speaking. What is the best thing about living where you live? I think that the best thing about where I'm living is \"its proximity to the city\". So where I live is nice and close. Uh, public transport is really good. It's very easy to get around if I ever need to get something or I need to do something, it's really, really easy to do that, and I can usually get there in a really short period of time. And also of course we see that she's got great pronunciation and right at the end you hear the way she uses connected speech. In a really sharp period time. The way it sounds like one very long word as opposed to many individual words. In a really short period of time. The way the words connect with each other the way she drops sounds the way she connects sounds. All of these features of connected speech are very very important for your pronunciation score and of course as a native English speaker it's very easy for her. But you do see the difference when you have a candidate who is a native English speaker compared to somebody who is learning the language. Would you like to live somewhere different I would definitely love to live somewhere overseas. Um, potentially France, um, because I'm learning French, so it would be lovely to be able to practice my French and experience another culture and get to know a whole new group of people. I think that would be really cool. I'd like to move on to the topic of jokes. Are you good at remembering jokes? No. Um, I, I'm not very good at reading jokes I'm not gonna lie. Um, something my dad always loved to tell jokes, and I think that because he loved jokes so much. I always became deterred from them. Um, typical dad jokes, um, but yeah. What type of jokes do you like? I think that I usually prefer the types of jokes that more like riddles or they have sort of a story to them. So you get invested in the story, and it goes on for a while, and then you have the punch line at the end. That's the sort of joke that I prefer. Um, as opposed to the short, witty jokes. Okay, now, after listening to Julie give a few more answers, what you probably notice is that she is not flawless. She needs to stop. She needs to pause. She needs to think. Sometimes she's not completely flawless in the way you would find when you're watching a TV show or a movie. Where the whole dialogue is scripted, and the actors are repeating what they've learned. So in the real world, English speaking is not as flawless as you see on TV. So, what we see from Julia here is exactly what the examiner is looking for when someone's going to achieve a band nine. Do you …",
    "analysis": {
      "overallComment": "该示范得分约 9.0 的核心原因并非『无瑕疵』，而是考官在四项评分标准上均看不到任何明显短板。视频中包含大量教师 Lar Ryan 的讲解穿插，需将讲解与考生 Julia 实际作答区分来看：Julia 是一位澳大利亚母语者，她的优势是天然具备英语节奏与连读特征，但她展示的策略——密集而自然的话语标记、对答案的明确切分、用 paraphrase 替代直接重复题目——是可被非母语考生模仿的。考生即使有『Um』停顿、有轻微自我修正、有小语法滑动（如『a person at beach』），整体仍维持 sustained discourse、灵活运用复杂句式与精准搭配，这正是 Band 9 的判分逻辑：不奖励『完美无错』，奖励『自然、持续、有深度』。",
      "whyHighScore": [
        "话语标记密度极高且功能多样：她用『So originally』『actually』『Um』分别承担『开场说明』『信息修正』『思考缓冲』，而 6.0–6.5 考生常因不敢停顿而硬撑，或用单一种类标记（如只会说『So…』『I think…』），导致语言听起来机械或卡顿。",
        "词汇层面使用 paraphrase 与抽象名词搭配：例如把『住得离市中心近』重新表述为『its proximity to the city』，6.0–6.5 考生倾向于重复题目用词（live near the city），缺乏 upward paraphrase 的意识，因而 Lexical Resource 被压在 6–7 之间。",
        "语法上把简单条件句扩展为并列+让步结构：『if I ever need to get something or I need to do something, it's really, really easy to do that, and I can usually get there in a really short period of time』，体现从属与并列混合运用；低分考生通常只能产出零碎短句，无法实现 sustained complex sentence。",
        "Pronunciation 上连读与节奏自然：『In a really short period of time』被教师明确点出为典型 connected speech，词与词之间出现连读、弱化与缩合，这是 6.0–6.5 考生普遍欠缺的『rhythmic phrasing』能力，显著拉升发音项到 8–9 区间。",
        "（补充）母语者效应需说明：Julia 之所以轻松触达 9.0 区间，部分归因于母语者的语音底层能力（音段、重音、语调），非母语考生难以完全复制，但上述话语策略、词汇升级、句法扩展是 7.5→8.5 的可控路径。"
      ],
      "examinerTips": [
        "Part 1 不要只给一个『事实答案』就停：先 paraphrase 题干（『its proximity to the city』），再展开一个『if…or…』的并列条件，最后收口（『and I can usually get there in a really short period of time』），一个题答 4–6 句、保持语速稳定。",
        "刻意使用 3–4 类不同功能的话语标记：开场（『So originally / Actually』）、对比（『as opposed to / but』）、递进（『and also』）、收口（『yeah / really cool』），不要只用一种。",
        "练习 connected speech 的最小单位：把『a lot of / kind of / period of time』练到能连读而非逐词吐出，这是 6.5 跃升到 8.0 的发音分水岭。",
        "Part 1 涉及『jokes / hometown / where you live』时，提前准备可迁移的『故事锚点』：如 dad jokes、Sydney 与 Melbourne 对比、French 学习计划，这样即使遇到新题也能套用结构，而不是逐题重新组织语言。"
      ],
      "listenExcerpts": [
        "So originally I'm actually from Sydney. So Sydney is a coastal town, so it's near the beach. So a lot of things that you can do near the beach include swimming, you can go for walks, it's really lovely.",
        "I think that the best thing about where I'm living is \"its proximity to the city\". So where I live is nice and close. Uh, public transport is really good. It's very easy to get around if I ever need to get something or I need to do something, it's really, really easy to do that, and I can usually get there in a really short period of time.",
        "I would definitely love to live somewhere overseas. Um, potentially France, um, because I'm learning French, so it would be lovely to be able to practice my French and experience another culture and get to know a whole new group of people. I think that would be really cool.",
        "I think that I usually prefer the types of jokes that more like riddles or they have sort of a story to them. So you get invested in the story, and it goes on for a while, and then you have the punch line at the end. That's the sort of joke that I prefer. Um, as opposed to the short, witty jokes."
      ],
      "listenTips": [],
      "practiceTips": [
        "Part 1 不要只给一个『事实答案』就停：先 paraphrase 题干（『its proximity to the city』），再展开一个『if…or…』的并列条件，最后收口（『and I can usually get there in a really short period of time』），一个题答 4–6 句、保持语速稳定。",
        "刻意使用 3–4 类不同功能的话语标记：开场（『So originally / Actually』）、对比（『as opposed to / but』）、递进（『and also』）、收口（『yeah / really cool』），不要只用一种。",
        "练习 connected speech 的最小单位：把『a lot of / kind of / period of time』练到能连读而非逐词吐出，这是 6.5 跃升到 8.0 的发音分水岭。",
        "Part 1 涉及『jokes / hometown / where you live』时，提前准备可迁移的『故事锚点』：如 dad jokes、Sydney 与 Melbourne 对比、French 学习计划，这样即使遇到新题也能套用结构，而不是逐题重新组织语言。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 9.0,
        "grammar": 9.0,
        "pronunciation": 9.0
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "答案长度充分、节奏自然、停顿用于思考而非失语；话题点之间用『so / actually / and also / as opposed to』明确过渡，结构清晰。考官在 Fluency & Coherence 上找不到 speed breaker 或 topic drift。",
          "evidence": [
            "So originally I'm actually from Sydney. So Sydney is a coastal town, so it's near the beach.",
            "Um, I now actually live in Melbourne. So that's more of a city, an urban town. So things that you can do are shopping you can go walking again but through the streets, this time as a person at beach. Um, both cities are lovely, and I'm very happy, yeah."
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "搭配精准（proximity to the city, get around, punch line, deterred from），能就同一信息点做 paraphrase（『near the beach』→『coastal town』），并使用轻度习语『not gonna lie』。没有任何『用词困难』或『重复题目原词』的痕迹。",
          "evidence": [
            "I think that the best thing about where I'm living is \"its proximity to the city\".",
            "Um, I, I'm not very good at reading jokes I'm not gonna lie.",
            "…and then you have the punch line at the end. …as opposed to the short, witty jokes."
          ]
        },
        "grammar": {
          "score": 9.0,
          "why": "在自然口语中灵活混用条件句、并列结构、关系分句与 would 虚拟：『if I ever need to get something or I need to do something, it's really, really easy to do that』。允许出现的轻微口误（如『a person at beach』漏 the、『that more like riddles』漏 are）在母语风格下不构成『系统错误』，考官不会因此扣分。",
          "evidence": [
            "It's very easy to get around if I ever need to get something or I need to do something, it's really, really easy to do that, and I can usually get there in a really short period of time.",
            "I think that I usually prefer the types of jokes that more like riddles or they have sort of a story to them.",
            "…because I'm learning French, so it would be lovely to be able to practice my French and experience another culture and get to know a whole new group of people."
          ]
        },
        "pronunciation": {
          "score": 9.0,
          "why": "仅凭转写可推断：连读特征明显（『a really short period time』中 period 与 of time 产生缩合/弱读），句末语调有收束感（『yeah』『really cool』作 closing marker），停顿分布自然而非因失语造成。转写无法完全呈现音段与重音，但 Lar Ryan 现场明确指出 connected speech 出色，故倾向 9.0，但需声明此判断有来自讲解者主观背书的不确定性。",
          "evidence": [
            "In a really short period of time.",
            "Um, I, I'm not very good at reading jokes I'm not gonna lie."
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "So originally I'm actually from Sydney. So Sydney is a coastal town, so it's near the beach. So a lot of things that you can do near the beach include swimming, you can go for walks, it's really lovely.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I think that the best thing about where I'm living is \"its proximity to the city\". So where I live is nice and close. Uh, public transport is really good. It's very easy to get around if I ever need to get something or I need to do something, it's really, really easy to do that, and I can usually get there in a really short period of time.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I would definitely love to live somewhere overseas. Um, potentially France, um, because I'm learning French, so it would be lovely to be able to practice my French and experience another culture and get to know a whole new group of people. I think that would be really cool.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I think that I usually prefer the types of jokes that more like riddles or they have sort of a story to them. So you get invested in the story, and it goes on for a while, and then you have the punch line at the end. That's the sort of joke that I prefer. Um, as opposed to the short, witty jokes.",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "Part 1 不要只给一个『事实答案』就停：先 paraphrase 题干（『its proximity to the city』），再展开一个『if…or…』的并列条件，最后收口（『and I can usually get there in a really short period of time』），一个题答 4–6 句、保持语速稳定。",
        "刻意使用 3–4 类不同功能的话语标记：开场（『So originally / Actually』）、对比（『as opposed to / but』）、递进（『and also』）、收口（『yeah / really cool』），不要只用一种。",
        "练习 connected speech 的最小单位：把『a lot of / kind of / period of time』练到能连读而非逐词吐出，这是 6.5 跃升到 8.0 的发音分水岭。",
        "Part 1 涉及『jokes / hometown / where you live』时，提前准备可迁移的『故事锚点』：如 dad jokes、Sydney 与 Melbourne 对比、French 学习计划，这样即使遇到新题也能套用结构，而不是逐题重新组织语言。"
      ]
    }
  },
  {
    "id": "yt-charles-hard-b9",
    "part": 1,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "Band 9.0 Mock · Extra Hard Questions",
    "prompt": "Band 9 mock test with harder Part 1–3 questions and feedback.",
    "source": "https://www.youtube.com/watch?v=vK4tewFE1fU",
    "sourceName": "IELTS with Charles",
    "score": 9.0,
    "duration": 837,
    "audioPath": "/audio/yt-charles-hard-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS with Charles Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "Today, please, we're going to start with part one, talking about morning routines. My tea, tell me, do you usually have the same morning routine every day? Um, I usually take it day by day, I think. I don't know, I feel like having too rigid of a schedule doesn't help me um kind of prepare for the day. Like I It just depends on what obligations I have that day, but I'm pretty like early riser morning person, so uh a lot of the time I tend to wake up at like 6:00 to do some work instead of doing work late into the night. It just works a lot better for my schedule, and so um it It really just depends on how much work I have on a given day, but I don't like to stick to routines. Thank you very much. What do you usually do when you first wake up? Honestly, look at my phone. [gasps and laughter] Cuz I don't know, it's where um my family contacts me, it's where I get all of like um emails related to school and stuff like that, so like all the important stuff, so that it kind of like if I'm doing work in the morning, it kind of gets me in the mood like get more productive if I'm already thinking about these things and like like laying out everything I have to do for the day. So. Fantastic. Thank you. How's your morning routine changed since you were younger? Yeah, it used to be a lot more chaotic because me and [clears throat] my brother like to sleep in a lot, so then we would wake up a lot later than we were supposed to for school, and so it'd be like one big rush. But nowadays, um since I can control my own schedule a little better, I can like plan it around my own moods and whatever, so it isn't as rushed, but I do think having those like um schedules in my childhood helped me um like wake up on time, for example, and like know what I need to do to begin my my but like I It's a very different mood. Thank you very much. Let's move on now to talk about crowded places. Is your city a crowded place? That's an understatement. There's about I think like 10 million residents in the city and so it's like always really busy. There's like hustle and bustle. You can't avoid people no matter where you go, really. Yeah, definitely. Thank you. I agree. How do you feel when you spend time in a crowded place? Um I think it's because I grew up in a city, but I it really doesn't affect me at all. I like like the anonymity of it. Like you can just flow through it like a crowd. Like I think of it and many people describe it as like a river where you can just navigate through crowds of people and like um there's like a shared understanding that like okay, you try not to bump into people. You don't like stare at someone for too long, for example. So I feel really at home when I'm in a crowded place. Thank you. And finally, let's talk about sports. Mighty, have you ever played a sport? [clears throat] A couple, yeah. Um I did basketball, swimming, badminton. Like there's just like a variety of stuff I tried, but yeah. [clears throat] Which was your favorite? Personally, badminton. I've been going to like um a club meeting every Tuesday recently where we just play like recreationally. So it yeah, it gets exercise in. Thank you. And finally, are there any sports that are particularly popular in your country? I would say the most popular one is soccer or football because I don't know. Like with the World Cup going on right now, it's just really just a big stir. So then yeah, I think it's the most popular one because it's also so easy to play. Like you really just need a ball and like maybe two trees in the background for a goal post. But yeah. Why is that important in Vietnam? If it means simple to play. Um I think because like well, now there's a lot more options and like stuff, but many people came from the countryside or like in times of struggle. So then um they needed like those quick ways to entertain themselves and also have fun as kids and like go out and like interact with people. So it's like a social bonding event and also like exercise for kids. So then you just took whatever you could and like scrap together some fun game. Yeah. Thank you. That's one of the reasons I love Vietnam. Yeah, wonderful. Okay, let's move on to part number two now, please. And I've got a question for you here and you'll have 1 minute to prepare. The question is, could you please describe a time you received exceptionally good customer service from a business or company? Fantastic. So that brings us to the end of the 1 minute now, My Thi. So when you're ready, please can you start? Um I would say a time I received exceptionally good customer service was at Rock Water Bay in Phan …",
    "analysis": {
      "overallComment": "该考生在 Part 1 几乎每个问题都能给出超长、自然、自我修正频繁但完全不影响沟通的回答，词汇层面展现出地道搭配与精准同义替换，语法上复杂结构与简单句交替自然，错误极少且多属自然语流现象。整体听感接近母语者日常对话，符合官方 Band 9 描述中『sustained, effortless, flexible and accurate』的特征。须注意：转写中夹有考官引导语（『Fantastic』『Thank you very much』），并非考生作答，但考生本身的 turns 完整、充分，具备示范价值。",
      "whyHighScore": [
        "对『是否每天同样作息』这种简单问题主动延伸出『day by day』『too rigid of a schedule』+ 反例论证，避免了 6.0–6.5 考生常见的 yes/no + 短句答题模式。",
        "在『crowded places』话题中主动用 metaphor（『flow through it like a crowd』『river where you can just navigate through crowds』），体现 9 分所需的『precise and natural use of less common lexis』。",
        "自我修正自然且不破坏语流，如『it kind of gets me in the mood like get more productive』『Like I It just depends』，显示的是真实口语监控能力，而不是背诵痕迹。",
        "对『足球为何流行』这种抽象追问，主动用因果链（农村背景 + 资源匮乏 → 简单娱乐 + social bonding + exercise）展开，结构清晰，体现 FC 的高度发展。",
        "对比 6.0–6.5 考生常见的『停顿 + 重复题干 + I think… maybe…』模式，该考生几乎没有 empty pauses，整段产出连贯、有推进。",
        "对比 6.0–6.5 考生局限于 happy/fun/tired 等基础形容词的词汇表现，该考生使用 anonymity / hustle and bustle / recreational / a big stir / scrap together 等精准、地道词汇。"
      ],
      "examinerTips": [
        "在 Part 1 简单题上主动『反思路 + 给出原因 + 加一个例子』，例如不直接答『Yes, I always wake up at 6』，而是说『I tend to be an early riser, so I usually wake up at 6 to do work instead of late at night — it just works better for my schedule』，立刻把答案从 6 分水平拉到 8+。",
        "练习时把 like / honestly / I don't know 当成语篇工具使用，而不是紧张时的 filler，并练习 self-repair：『it kind of gets me in the mood like get more productive』，这种自然修正正是 9 分区别于 6.5 的关键。",
        "在描述『感受』或『原因』时主动用 metaphor 或 idiomatic collocation（hustle and bustle / anonymity / scrap together），避免停留在 happy/tired/boring 等基础词。",
        "Part 1 也要使用连接结构（because / so / but nowadays / so then），而不是只用 and 一路平推，体现语法广度。"
      ],
      "listenExcerpts": [
        "I feel like having too rigid of a schedule doesn't help me um kind of prepare for the day. Like I It just depends on what obligations I have that day, but I'm pretty like early riser morning person, so uh a lot of the time I tend to wake up at like 6:00 to do some work instead of doing work late into the night. It just works a lot better for my schedule.",
        "if I'm doing work in the morning, it kind of gets me in the mood like get more productive if I'm already thinking about these things and like laying out everything I have to do for the day.",
        "I think it's because I grew up in a city, but I it really doesn't affect me at all. I like like the anonymity of it. Like you can just flow through it like a crowd. Like I think of it and many people describe it as like a river where you can just navigate through crowds of people.",
        "So it's like a social bonding event and also like exercise for kids. So then you just took whatever you could and like scrap together some fun game."
      ],
      "listenTips": [],
      "practiceTips": [
        "在 Part 1 简单题上主动『反思路 + 给出原因 + 加一个例子』，例如不直接答『Yes, I always wake up at 6』，而是说『I tend to be an early riser, so I usually wake up at 6 to do work instead of late at night — it just works better for my schedule』，立刻把答案从 6 分水平拉到 8+。",
        "练习时把 like / honestly / I don't know 当成语篇工具使用，而不是紧张时的 filler，并练习 self-repair：『it kind of gets me in the mood like get more productive』，这种自然修正正是 9 分区别于 6.5 的关键。",
        "在描述『感受』或『原因』时主动用 metaphor 或 idiomatic collocation（hustle and bustle / anonymity / scrap together），避免停留在 happy/tired/boring 等基础词。",
        "Part 1 也要使用连接结构（because / so / but nowadays / so then），而不是只用 and 一路平推，体现语法广度。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 9.0,
        "grammar": 9.0,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "语速平稳，长 turn 持续 5–10 句不中断，思路推进自然。使用 like、um、I don't know、honestly 等语篇标记时显得有策略（用于思考与衔接），而不是因为词汇卡壳。自我修正后立即回到主线，未出现长时间空停。",
          "evidence": [
            "I feel like having too rigid of a schedule doesn't help me um kind of prepare for the day. Like I It just depends on what obligations I have that day, but I'm pretty like early riser morning person, so uh a lot of the time I tend to wake up at like 6:00 to do some work instead of doing work late into the night.",
            "I think it's because I grew up in a city, but I it really doesn't affect me at all. I like like the anonymity of it. Like you can just flow through it like a crowd. Like I think of it and many people describe it as like a river where you can just navigate through crowds of people and like um there's like a shared understanding that like okay, you try not to bump into people."
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "同义替换灵活（soccer or football / residents / anonymity），地道搭配密集（hustle and bustle / social bonding event / a big stir），并能在抽象概念上使用 metaphor。没有任何 low-level 词汇堆砌，也没有 over-literal 的翻译腔。",
          "evidence": [
            "There's about I think like 10 million residents in the city and so it's like always really busy. There's like hustle and bustle.",
            "I like like the anonymity of it. Like you can just flow through it like a crowd.",
            "Like you really just need a ball and like maybe two trees in the background for a goal post.",
            "So it's like a social bonding event and also like exercise for kids. So then you just took whatever you could and like scrap together some fun game."
          ]
        },
        "grammar": {
          "score": 9.0,
          "why": "复杂句与简单句交替自然，条件/因果/让步结构准确，如 because、so then、it's because…that、it's where… 等。错误几乎都是自然语流中的功能现象（连读、自我修正），没有影响意义的语法问题。",
          "evidence": [
            "I feel like having too rigid of a schedule doesn't help me um kind of prepare for the day.",
            "if I'm doing work in the morning, it kind of gets me in the mood like get more productive if I'm already thinking about these things and like laying out everything I have to do for the day.",
            "many people came from the countryside or like in times of struggle. So then um they needed like those quick ways to entertain themselves and also have fun as kids and like go out and like interact with people."
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "转写中考生表达清晰，连续语流呈现自然重音与节奏（『That's an understatement.』后紧接 10 million residents 推进，无明显断句）。可观察到 [clears throat]、轻微重复 like 等自然语流现象。无法从转写直接判断单音、连音或重音是否完全地道，标注不确定性：若实际录音有母语口音（如越南语英语背景）但不影响可懂度，仍可拿到 8.5–9.0。",
          "evidence": [
            "That's an understatement. There's about I think like 10 million residents in the city and so it's like always really busy.",
            "You can't avoid people no matter where you go, really.",
            "I've been going to like um a club meeting every Tuesday recently where we just play like recreationally."
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "I feel like having too rigid of a schedule doesn't help me um kind of prepare for the day. Like I It just depends on what obligations I have that day, but I'm pretty like early riser morning person, so uh a lot of the time I tend to wake up at like 6:00 to do some work instead of doing work late into the night. It just works a lot better for my schedule.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "if I'm doing work in the morning, it kind of gets me in the mood like get more productive if I'm already thinking about these things and like laying out everything I have to do for the day.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I think it's because I grew up in a city, but I it really doesn't affect me at all. I like like the anonymity of it. Like you can just flow through it like a crowd. Like I think of it and many people describe it as like a river where you can just navigate through crowds of people.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "So it's like a social bonding event and also like exercise for kids. So then you just took whatever you could and like scrap together some fun game.",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "在 Part 1 简单题上主动『反思路 + 给出原因 + 加一个例子』，例如不直接答『Yes, I always wake up at 6』，而是说『I tend to be an early riser, so I usually wake up at 6 to do work instead of late at night — it just works better for my schedule』，立刻把答案从 6 分水平拉到 8+。",
        "练习时把 like / honestly / I don't know 当成语篇工具使用，而不是紧张时的 filler，并练习 self-repair：『it kind of gets me in the mood like get more productive』，这种自然修正正是 9 分区别于 6.5 的关键。",
        "在描述『感受』或『原因』时主动用 metaphor 或 idiomatic collocation（hustle and bustle / anonymity / scrap together），避免停留在 happy/tired/boring 等基础词。",
        "Part 1 也要使用连接结构（because / so / but nowadays / so then），而不是只用 and 一路平推，体现语法广度。"
      ]
    }
  },
  {
    "id": "yt-mock-vrz-b9",
    "part": 1,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "Band 9.0 Mock Test with Feedback",
    "prompt": "Full Band 9 speaking mock with feedback.",
    "source": "https://www.youtube.com/watch?v=VRZPb4S_SBA",
    "sourceName": "IELTS Speaking Practice",
    "score": 9.0,
    "duration": 963,
    "audioPath": "/audio/yt-mock-vrz-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Speaking Practice Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "All right, then. Let's begin. So, could you tell me your full name, please? My full name is Suhi Kang. Suhi Kang. Okay. And are you working or are you a student? I'm currently a graduate student. I am finishing up my MA in the United States. And could you tell me about your major? Uh so, I major in cinema and media studies. And basically, what the major does is it looks at film and other kinds of media like TV shows, music, um social media, and it analyzes the sort of social significance of the things that are relevant in the media. And do you enjoy your major? I do. Um I've always loved um consuming media for fun, but getting to look at it from an academic perspective is uh it's very enjoyable as well. Great. And what do you enjoy doing in your free time? In my free time, I like to listen to music. Um recently, I've gotten into sort of the algorithm, you know, on the music listening apps. I love to discover new songs that are not even a language I understand, but are familiar genres. So, maybe, you know, rock or jazz. Yeah, that's my new hobby, listening to music. Right. Okay, now let's talk about uh saying thank you. So, have you ever sent a thank you card to others? I have, yes. Um uh a mo- recent thank you card I remember writing is to my friend, an American friend in the United States. Um I got sick um at the end of last year, but this friend really came through and helped me with everything. Uh my parents had to come over and she helped them uh helped pick them up from the airport and she just was a very good friend to me, so I wanted to thank her. I wrote her uh you know, a handwritten note and gave it to her with a present because it was also her birthday. Mhm. Okay, perfect. And do you think do people in your country often say thank you? Yes, they do. I think it's sort of a very um social expectation to be able to say thank you in in uh socially acceptable ways. So, I guess saying thank you with a handwritten note is would be the most um genuine form of saying thank you, but saying thank you out loud, you know, it's sort of everyday for us Koreans. Even when we go to a store and we don't buy anything and we just go out, we would say thank you. Um and on what occasions do you say thank you? Uh I would sort of um divide that into two occasions. The first one is, like I said, sort of everyday thank you that I say, you know, out of um habit more than anything. You know, when I go to a store, with strangers, with friends, or when I bump into someone or someone pick something up for me on the street. But the other occasion is um when someone really does something for me that wasn't expected of them, but they do it anyway. Um those are the occasions where I really want to express my gratitude. So, I'll write a note or send a long text. You know, everything's digital now, so I guess it doesn't have to be handwritten. Okay, lovely. Uh now, let's talk about spare time. So, do you often have free time? Uh I do. Um especially in the summer, uh, I don't have classes, so I am technically free all day. Um, I spend I have spent most of last week just meeting up with friends, but when I'm in the US and I have free time, I like to just go to campus and work on uh, my essays or read a book. I like to not be at home when I'm doing those things. So, even though I will go outside to campus, I will still sort of do things that allow me to be by myself. Lovely. And would you like to have more free time in the future? Well, I wouldn't say no to any more free time, but I am, um, sort of excited for the next part of my life, which is um, going to be a bit busy and I do miss that kind of routine, going to class every day and working, um, as, I guess, a teaching assistant or a research assistant. I like to have that routine in my life, so, um, I kind of miss that, um, hustle and bustle. I'm looking forward to that, actually. Okay, perfect. All right, that'll do us for part one of the test and now we'll move on to part two. So, I'll just give you your question. So, I'll just give you that here and I'll give you a pencil there, too. So, yeah, now I'll give you 1 minute to do some note taking for that, so you can write there. All right? Okay, that's 1 minute. So, uh, I'll ask you the question now. So, could you describe a person who you think wears unusual clothes? The person that I would like to describe who wears unusual clothes is my friend, um, she's called Taylan. And she is actually not, uh, a …",
    "analysis": {
      "overallComment": "该转写基本为考生作答内容（穿插极简考官问句），考生在 Part 1 与 Part 2 起始段均展现出接近 9.0 的语言控制力。回答长度充分但并非冗长，每道题都给出个人化细节与延伸；语速自然、停顿为思考型而非回避型；词汇出现 genuine、came through、hustle and bustle、social expectation 等高级搭配；语法上能稳定驾驭复合句、条件关系与分点结构，并出现自然的口语自我修正。整体听感是「成熟使用者」，符合 Band 9 描述中『能灵活、准确、地道地使用语言』的定位。",
      "whyHighScore": [
        "答题结构成熟：每题先给直接答案，再用 personal anecdote 或双层分类（'divide that into two occasions'）展开，让 FC 维度拿到接近 9.0。低分考生常止于一句直接回答后沉默或重复题干。",
        "词汇覆盖广且精准：能根据语境切换 register，例如 'consuming media'、'socially acceptable ways'、'genuine form'、'hustle and bustle' 等地道表达，而非用基础词堆砌。",
        "语法多样且错误率低：能混合使用条件、让步、原因状语从句和分词结构（'Even when we go to a store and we don't buy anything…'），且自我修正不影响沟通。",
        "话题延伸自然：从不依赖模板，而是把抽象问题落到具体生活场景（朋友 Taylan、机场接机、写感谢卡给美国朋友），这是 8.5+ 与 6.5 考生的最大分水岭。"
      ],
      "examinerTips": [
        "把每个 Part 1 小题都答成 '直接答案 + 个人例子 + 简短延伸'，例如 free time 题给出 'last week meeting friends' + 'go to campus to write essays' 两层细节，避免一句话结束。",
        "主动使用像 'divide into two occasions'、'genuine form of…'、'hustle and bustle' 这类'组织性短语'，让段落结构可被考官清晰感知，能稳定拉高 FC 与 LR。",
        "允许出现 'um / you know' 之类的填充词，但避免长段停顿（>3 秒）；自我修正要快速完成（self-repair 反而展示自动化）。"
      ],
      "listenExcerpts": [
        "I'm currently a graduate student. I am finishing up my MA in the United States.",
        "the sort of social significance of the things that are relevant in the media.",
        "I would sort of um divide that into two occasions.",
        "I kind of miss that, um, hustle and bustle."
      ],
      "listenTips": [],
      "practiceTips": [
        "把每个 Part 1 小题都答成 '直接答案 + 个人例子 + 简短延伸'，例如 free time 题给出 'last week meeting friends' + 'go to campus to write essays' 两层细节，避免一句话结束。",
        "主动使用像 'divide into two occasions'、'genuine form of…'、'hustle and bustle' 这类'组织性短语'，让段落结构可被考官清晰感知，能稳定拉高 FC 与 LR。",
        "允许出现 'um / you know' 之类的填充词，但避免长段停顿（>3 秒）；自我修正要快速完成（self-repair 反而展示自动化）。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 9.0,
        "grammar": 9.0,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "语流持续连贯，几乎无长段沉默；使用的 'um / you know / I guess / sort of' 是自然的语用填充词，而非犹豫导致的断裂。回答常自带二段式结构，明显超过 Part 1 平均长度。",
          "evidence": [
            "I would sort of um divide that into two occasions. The first one is, like I said, sort of everyday thank you that I say, you know, out of um habit more than anything.",
            "I've always loved um consuming media for fun, but getting to look at it from an academic perspective is uh it's very enjoyable as well."
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "频繁使用 collocation、idiomatic phrase 和抽象名词短语，且搭配准确。能在同一话题内切换 register（'social expectation' / 'genuine form' / 'socially acceptable ways'），展现词汇灵活度（paraphrasing），不会反复使用 thank you / important 这类基础词。",
          "evidence": [
            "I think it's sort of a very um social expectation to be able to say thank you in in uh socially acceptable ways.",
            "Even when we go to a store and we don't buy anything and we just go out, we would say thank you.",
            "I kind of miss that, um, hustle and bustle."
          ]
        },
        "grammar": {
          "score": 9.0,
          "why": "句法变化丰富，能驾驭条件、让步、对比、原因从句与列举结构（divide…into…；not…but…）。出现的少数 self-repair（'a mo-recent thank you card'、'in in uh socially acceptable ways'）属于真实口语监控，反而显示语法自动化的成熟。",
          "evidence": [
            "Even when we go to a store and we don't buy anything and we just go out, we would say thank you.",
            "Well, I wouldn't say no to any more free time, but I am, um, sort of excited for the next part of my life, which is um, going to be a bit busy.",
            "Um those are the occasions where I really want to express my gratitude."
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "仅依据转写判断存在不确定性。但可见的弱读/连读、句中自我修正重述（'is uh it's very enjoyable'、'helped them uh helped pick them up'）显示自然的口语节奏与重音处理；填充词 'uh/um/you know' 的位置与功能化使用提示发音重音自然。无法判断个别音段准确度，故保守给 8.5。",
          "evidence": [
            "I am, um, sort of excited for the next part of my life, which is um, going to be a bit busy and I do miss that kind of routine.",
            "she helped them uh helped pick them up from the airport and she just was a very good friend to me."
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "I'm currently a graduate student. I am finishing up my MA in the United States.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "the sort of social significance of the things that are relevant in the media.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I would sort of um divide that into two occasions.",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I kind of miss that, um, hustle and bustle.",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "把每个 Part 1 小题都答成 '直接答案 + 个人例子 + 简短延伸'，例如 free time 题给出 'last week meeting friends' + 'go to campus to write essays' 两层细节，避免一句话结束。",
        "主动使用像 'divide into two occasions'、'genuine form of…'、'hustle and bustle' 这类'组织性短语'，让段落结构可被考官清晰感知，能稳定拉高 FC 与 LR。",
        "允许出现 'um / you know' 之类的填充词，但避免长段停顿（>3 秒）；自我修正要快速完成（self-repair 反而展示自动化）。"
      ]
    }
  },
  {
    "id": "yt-brandon-b9",
    "part": 1,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "Band 9 Practice with Expert Examiner",
    "prompt": "Full speaking practice Parts 1–3 with examiner interaction.",
    "source": "https://www.youtube.com/watch?v=0HOf9IIt7wg",
    "sourceName": "IELTS Speaking Practice",
    "score": 9.0,
    "duration": 614,
    "audioPath": "/audio/yt-brandon-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Speaking Practice Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "welcome to aehelp.com ielts test preparation videos you now have a chance to face off against ming lung from vietnam who again gets a band 9 for his performance on the speaking interview first you will do the interview with me i'm the examiner and you're the candidate i will ask you the questions you give me the answers use the subtitles as necessary i encourage you to try answering on your own first record your answers so that you can compare them to ming luns afterwards make sure to visit and join our premium package at aehelp.com where you will find practice exams video lessons and a fully interactive course you can use this discount code to save also in the video description now watch and learn welcome to the speaking section of the ielts exam my name is adrian and i will be your examiner for this part of the test the speaking has three parts i will give you instructions for each and i'm going to record this for marking purposes what is your full name may i see your identification please brendan thank you okay here is your passport back for part one i will ask you a couple more questions to get to know you better and some questions on a general topic do you work or study what do you like about your work or school let's talk about friends how often do you meet your friends what do you usually do with your friends where did you meet your best friend how do you keep in touch with your friends have the games you played with your friends changed in the last 10 years if you could give a gift to one of your what would you give and who would you give it to that is the end of part one now we will continue with part two for part two here is a card with some questions on it there's some note paper and a pencil in front of you you will have one minute to look at the questions think about your answers take notes in the one minute if you wish and then you will have two minutes to speak i will tell you when to start when to stop okay brenden your one minute preparation time is up please begin speaking welcome to the speaking portion of the ielts exam my name is adrian i will be your examiner for this section of the test it has three parts i will give you instructions for each and i'm going to record this for marking purposes to begin i will ask you a few questions questions on a general topic what is your full name my given names are mingling and my surname is zoong but please just call me by my what's your nickname it's brandon okay brandon may i see your identification please yes of course here's my passport which i use for registration thank you okay good there's your passport back do you work or study i currently work part-time as a cashier in a supermarket and i'm also studying for this ies exam so that i can continue my master's in accounting studies next year in california what do you like about your work or school i like my co-workers in my fairway supermarket they're funny and kind some of them have become good friends the ones from work like dan and lisa i meet almost every day and some of my friends i hang out with at the weekends so quite often for sure what do you usually do with your friends during the workday evenings i usually go to a coffee shop with my friends to chat for an hour so on the weekends we go to nature like the high class saturday with lisa where did you meet your best friend i have to think about that for a moment i met my best friend mike at a music festival back in 2009 that my parents took us to he was hanging out near the main stage between shows and i bumped into him there i keep in touch both face-to-face and through digital media like messenger whatsapp email or simply just texting have the games you play with your friends changed in the past 10 years the games i play with my have certainly changed whether i think about the outdoor ones like basketball or soccer or inner ones like the games we used to play on console they have certainly changed nowadays i'm more into tennis and board games i like the novelty of these if you could give a gift to one of your friends given the opportunity to give the friend i would buy a new motorbike for mike because i know which one he wants and it's his birthday coming up in a couple of weeks that's the end of part one now we will continue with part two for part two here is a card with some questions a pencil and here is some note paper questions on the card think about your answers take notes in a minute if you wish speak i will tell you when to start when to stop are you ready yep okay go ahead turn over the card with the questions your one minute preparation …",
    "analysis": {
      "overallComment": "该示范能在口语上拿到约 9.0 分，核心原因是考生在 Part 1 这种『看似简单』的话题上，依然把每道题都答成了接近 4–6 句、有明确起承转合的微型独白，并且自始至终保持自然语流。回答中会出现 'I have to think about that for a moment' 这类有交际感的停顿与自我修正，但没有破坏连贯，反而让答案听起来像真实对话而非背诵段落。词汇上 paraphrase 灵活、搭配地道；语法上句式多变且错误极少。需说明：转写夹杂了网站广告、考官指令和部分字幕噪音（例如 'ies' 应为 'IELTS'，'high class saturday' 疑为 'hiking' 之类），以下点评仅针对考生本人作答的句段。",
      "whyHighScore": [
        "答题长度与结构远超 6.0–6.5 考生的『一句话应付』。每题都做到『直接答题 + 解释原因 + 给具体例子 + 自然收尾』，例如说工作后主动补 'some of them have become good friends'，把抽象题答得有画面感，符合 9 分 'develops topics fully and relevantly' 的描述。",
        "语法上敢于使用目的状语从句、限定性 / 非限定性关系从句和混合时态，错误极不显著。低分考生常停留在 'because...and...' 的并列句，而示范者写出 'so that I can continue my master's in accounting studies next year in California'，体现 9 分的 'grammatical range and accuracy'。",
        "词汇上能自然使用 'keep in touch', 'face-to-face', 'bumped into', 'novelty', 'hang out with' 等搭配，并对题面 'give a gift' 做 paraphrase（'given the opportunity to give the friend I would buy...'），展示 9 分的 'paraphrases freely and flexibly'。",
        "流利度上虽有真实停顿 'I have to think about that for a moment'，但能立刻衔接到时间、地点、人物等细节，停顿后不重复、不放弃；低分考生停顿后通常回缩成 'uh...I think...'，而示范者用停顿展示了 9 分 'uses self-correction without losing coherence' 的能力。"
      ],
      "examinerTips": [
        "允许自己说 'I have to think about that for a moment'——把停顿当作思考的信号，而不是逃避，然后用时间、地点、人物迅速补足细节，这是 9 分考生常见的『真实型流利』策略。",
        "Part 1 不要用一两句应付同一道信息型问题；尽量做到『先答核心，再补原因/例子/转折』。例如本题示范用 'so that I can continue my master's in accounting studies next year in California' 把个人细节 + 未来计划一句话打包回答。"
      ],
      "listenExcerpts": [
        "i'm also studying for this ies exam so that i can continue my master's in accounting studies next year in california",
        "i met my best friend mike at a music festival back in 2009 that my parents took us to he was hanging out near the main stage between shows and i bumped into him there",
        "I keep in touch both face-to-face and through digital media like messenger whatsapp email or simply just texting",
        "given the opportunity to give the friend i would buy a new motorbike for mike because i know which one he wants and it's his birthday coming up in a couple of weeks"
      ],
      "listenTips": [],
      "practiceTips": [
        "允许自己说 'I have to think about that for a moment'——把停顿当作思考的信号，而不是逃避，然后用时间、地点、人物迅速补足细节，这是 9 分考生常见的『真实型流利』策略。",
        "Part 1 不要用一两句应付同一道信息型问题；尽量做到『先答核心，再补原因/例子/转折』。例如本题示范用 'so that I can continue my master's in accounting studies next year in California' 把个人细节 + 未来计划一句话打包回答。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 9.0,
        "grammar": 9.0,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "考生语流持续时间长且连贯，能围绕一个核心点自然延展，从不因找不到词而中断。允许出现真实口语中的微停顿与自我修正，但都能快速恢复，不影响答题完整性。",
          "evidence": [
            "i met my best friend mike at a music festival back in 2009 that my parents took us to he was hanging out near the main stage between shows and i bumped into him there",
            "I have to think about that for a moment i met my best friend mike at a music festival back in 2009 that my parents took us to"
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "词汇覆盖面广，搭配地道，能用多种方式表达相同概念（如 paraphrase 礼物题），并自然使用 'novelty'、'face-to-face' 等较正式或抽象词汇，而没有刻意炫词。",
          "evidence": [
            "I keep in touch both face-to-face and through digital media like messenger whatsapp email or simply just texting",
            "nowadays i'm more into tennis and board games i like the novelty of these"
          ]
        },
        "grammar": {
          "score": 9.0,
          "why": "句式变化丰富，能输出含目的状语从句、关系从句、条件句和混合时态的长句，且口语节奏下错误极少见。语料中也出现名词化结构 'my master's in accounting studies'，展示语法熟练度。",
          "evidence": [
            "i'm also studying for this ies exam so that i can continue my master's in accounting studies next year in california",
            "given the opportunity to give the friend i would buy a new motorbike for mike because i know which one he wants and it's his birthday coming up in a couple of weeks"
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "仅从转写无法直接判断发音细节，但句段切分与节奏（例如 'that my parents took us to / he was hanging out / i bumped into him there' 的意群划分）暗示考生有自然的重音、节奏与适当的停顿，自我修正后能无缝继续，提示发音与流利度配合良好。仍存在一定不确定性，转写不含语音信息。",
          "evidence": [
            "i'm also studying for this ies exam so that i can continue my master's in accounting studies next year in california",
            "i have to think about that for a moment i met my best friend mike at a music festival back in 2009 that my parents took us to"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "i'm also studying for this ies exam so that i can continue my master's in accounting studies next year in california",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "i met my best friend mike at a music festival back in 2009 that my parents took us to he was hanging out near the main stage between shows and i bumped into him there",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "I keep in touch both face-to-face and through digital media like messenger whatsapp email or simply just texting",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "given the opportunity to give the friend i would buy a new motorbike for mike because i know which one he wants and it's his birthday coming up in a couple of weeks",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "允许自己说 'I have to think about that for a moment'——把停顿当作思考的信号，而不是逃避，然后用时间、地点、人物迅速补足细节，这是 9 分考生常见的『真实型流利』策略。",
        "Part 1 不要用一两句应付同一道信息型问题；尽量做到『先答核心，再补原因/例子/转折』。例如本题示范用 'so that I can continue my master's in accounting studies next year in California' 把个人细节 + 未来计划一句话打包回答。"
      ]
    }
  },
  {
    "id": "yt-liz-practice",
    "part": 1,
    "coversParts": [
      1,
      2
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "IELTS Speaking Practice & Model Answers",
    "prompt": "Practice questions with model answers (IELTS Liz).",
    "source": "https://www.youtube.com/watch?v=n5ohxW5lTIs",
    "sourceName": "IELTS Liz",
    "score": 8.5,
    "duration": 605,
    "audioPath": "/audio/yt-liz-practice.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Liz Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "hello my name's Liz I'm going to give you an ielt practice speaking test first I will give you instructions then I will give you your speaking test after the test I will give you a link so that you can get model answers for all the questions in this test if you have read the instructions before on my website you can click here to start your test in immediately for this test you will need a pen a piece of paper a recording device for example your telephone so that you can record your answers when you speak and also a timer so that you can control the time in the test there are three parts to this test part one is the interview part two is a talk and part three is a chance for you to answer questions about a world issue or abstract questions the moment I begin to ask the first question you must start your recording device and also your timer this way you will know the length of the test the test should take no more than 11 to 14 minutes for all parts now let me give you some instructions so that you know how to work this test after the the first question pause the video and answer the question when you finished answering start the video again and listen to the next question pause after you listen and answer the question continue pausing and answering the questions until you finish part one there are 12 questions in part one the same as your real ielt speaking test part one can never be more than five minutes after part one you will have part two that's the talk I will give you the topic the Q card the topic card will appear on the screen I will explain that you will have one minute to prepare you will need your pen and paper for that the time for Preparation 1 minute will be timed in the video so don't worry about that I will will tell you when to start speaking your talk must last for more than 1 minute but less than 2 minutes at the end of one minute a button will appear so if you finish your talk early you can jump to part three but it is important to try and keep talking for 2 minutes at the end of 2 minutes I will stop you if you're still talking to move on to part three after part two the there will be part three I will ask between five to six questions for part three just like in part one you need to listen to the question in the video press pause and give your answer when you finished your answer press the video to play again and listen to the next question you need to continue pausing and answering the questions until the end of part three part three lasts more than 4 minutes but less than five minutes so again if you are taking less than four minutes you're not giving long enough answers part three only has five to six questions so that means you need to give long answers give lots of detail and lots of examples and at the end of the test I will give you a link so that you can get all the model answers for the test let's start your ielt practice speaking test I'd like to talk about your home do you live in a house or a flat which is your favorite room can you describe it if you could improve one thing about your house what would it be let's move on I I'd like to talk about films do you enjoy watching films what kind of films do you like most did you watch much TV as a child are foreign language films popular in your country let's talk about greeting people how would you greet someone who was visiting your house would you greet an old friend and a stranger in the same way how do you meet new people do you think first impressions are important I'd like to move on now I'm going to give you a topic to talk about you will need your pen and paper for this you will have one minute to prepare and I would like you to speak for 2 minutes I would like you to describe a holiday you recently had please start making notes now I will let you know when it's time to begin speaking e could you start speaking now please e e e thank you I'd like to talk more about holidays and traveling if you had the chance to travel anywhere where would you go why do you think some people like traveling alone do you think travel has changed much in the last few decades how does travel change people do you think there are any disadvantages to Modern travel that's the end of your ielt practice speaking test now let me give you a link so that you can get model answers for all the questions in this test",
    "analysis": {
      "overallComment": "需要先做一个重要的诚实说明：这段转写主要是 IELTS Liz 老师讲解考试流程与念出题目的教学语音（'I'm going to give you an ielt practice speaking test…'），并不包含真正的考生 model answer 主体。唯一疑似考生作答的痕迹只有 'e could you start speaking now please e e e' 中的若干停顿音。因此严格意义上不能据此给出一段'考生'8.5 分的诊断。但老师的讲解语流本身英语水平接近母语者，可作为'潜在示范者语言能力'的间接证据：组织极有条理，条件句、被动句、连词搭配熟练，话题词汇（recording device, preparation time, jump to part three, long enough answers）精准。可推断其如果作为考生回答 Part 1 短问，回答质量会在 8.0–8.5 区间；但本评估的样本是教学讲解而非考生作答，这一点必须在结论里保留。",
      "whyHighScore": [
        "逻辑衔接极强：讲解全程使用 first / then / after the test / after part one / after part two / at the end of 等显性时间与顺序标记，低分考生常常只靠 and/so 推进，结构松散；这位讲解者用 'pause the video and answer the question…continue pausing and answering…until you finish part one' 这种链条式指令，让听力输入高度可预测，是 8+ 段位典型的 coherence 表现。",
        "复杂语法自然嵌入：'the topic card will appear on the screen'（一般将来时被动）、'it is important to try and keep talking for 2 minutes'（形式主语+不定式）、'if you finish your talk early you can jump to part three but it is important…'（真实条件句+转折对比）。低分考生常用简单句堆砌，这位讲解者即便在'念稿'场景也自动产出 2-3 成分句，提示其口语语法可稳定维持在 8.5 水平。",
        "话题词汇精准且无赘余：recording device / preparation time / the talk / the moment I begin to ask the first question / you must start your recording device。低分考生倾向用 'thing / stuff / do the speaking' 等万能词；这位讲解者用 'your talk must last for more than 1 minute but less than 2 minutes'，数字与边界表达精确，是 8+ lexical resource 的标志。",
        "节奏与停顿自然、可推断发音清晰：'the moment I begin to ask the first question you must start your recording device and also your timer'——'and also' 处的轻微气口、'and also your timer' 的并列收束，呈现母语式节奏；'e e e' 的填充停顿被严格限制在极短过渡内，未污染流利度，整体语音印象可推测为 8.0–8.5（注意：仅基于转写节奏推断，无法判断重音与语调）。"
      ],
      "examinerTips": [
        "用 'the moment / the way / so that' 替代单一连词 'when / and / because'，立刻把 grammar score 从 6.5 拉到 7.5+。",
        "在 Part 1 短答中刻意给出数字边界（'more than 1 minute but less than 2 minutes'），即使内容简单，'精确度'也能让 lexical 与 coherence 双向加分。",
        "准备一个稳定的'链式指令'句型模板（如 'first…then…after that…continue…until…'），用于 Part 2 描述步骤或经历，低分考生常用 'and then…and then…'，这是 6.5 与 8.0 的典型分水岭。"
      ],
      "listenExcerpts": [
        "the moment I begin to ask the first question you must start your recording device and also your timer this way you will know the length of the test",
        "your talk must last for more than 1 minute but less than 2 minutes at the end of one minute a button will appear so if you finish your talk early you can jump to part three but it is important to try and keep talking for 2 minutes",
        "part three only has five to six questions so that means you need to give long answers give lots of detail and lots of examples",
        "if you have read the instructions before on my website you can click here to start your test in immediately"
      ],
      "listenTips": [],
      "practiceTips": [
        "用 'the moment / the way / so that' 替代单一连词 'when / and / because'，立刻把 grammar score 从 6.5 拉到 7.5+。",
        "在 Part 1 短答中刻意给出数字边界（'more than 1 minute but less than 2 minutes'），即使内容简单，'精确度'也能让 lexical 与 coherence 双向加分。",
        "准备一个稳定的'链式指令'句型模板（如 'first…then…after that…continue…until…'），用于 Part 2 描述步骤或经历，低分考生常用 'and then…and then…'，这是 6.5 与 8.0 的典型分水岭。"
      ],
      "claimedBand": 8.5,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 8.5,
        "lexical": 8.5,
        "grammar": 8.5,
        "pronunciation": 8.0
      },
      "scoringDetails": {
        "fluency": {
          "score": 8.5,
          "why": "讲解全程语速稳定，几乎无长卡顿；'e e e' 的极短填充音说明在需要'示范考生犹豫'时仍能控制节奏。可推断若作为考生回答 Part 1 短问，能保持 continuous speech 而非逐句挤词。",
          "evidence": [
            "after the the first question pause the video and answer the question when you finished answering start the video again and listen to the next question pause after you listen and answer the question continue pausing and answering the questions until you finish part one",
            "at the end of two minutes I will stop you if you're still talking to move on to part three"
          ]
        },
        "lexical": {
          "score": 8.5,
          "why": "能用 'jump to part three'、'give long answers'、'lots of detail and lots of examples'、'take no more than 11 to 14 minutes'、'the same as your real ielt speaking test' 等口语化搭配精准传达考试元信息；没有 'very / good / nice' 类低区分度词堆砌。",
          "evidence": [
            "your talk must last for more than 1 minute but less than 2 minutes",
            "part three only has five to six questions so that means you need to give long answers give lots of detail and lots of examples"
          ]
        },
        "grammar": {
          "score": 8.5,
          "why": "条件句、被动语态、形式主语、比较结构、现在时表安排等多种结构高频自然出现；'the moment I begin to ask the first question'（the moment 作连词）和 'so that you can know the length of the test' 是 8+ 段位标志。错误几乎不可见（仅一处 'in this test' 与 'one minute' 介词/数词偶有小瑕疵，但属自然语流容错范围）。",
          "evidence": [
            "the moment I begin to ask the first question you must start your recording device and also your timer this way you will know the length of the test",
            "it is important to try and keep talking for 2 minutes"
          ]
        },
        "pronunciation": {
          "score": 8.0,
          "why": "基于转写可推断：句间停顿以意群为单位（'after the test / I will give you a link'），'and also' / 'but it is important' 的连接处无多余气口，节奏匀称。但转写无法体现重音、语调、个别音位（如 th / r），存在评估不确定性；因此保守给 8.0 而非 8.5。'e e e' 段也提示在需要表现'犹豫'的示范场景中，停顿仍受控，未见长段空白。",
          "evidence": [
            "at the end of one minute a button will appear so if you finish your talk early you can jump to part three but it is important to try and keep talking for 2 minutes",
            "e could you start speaking now please e e e thank you"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "the moment I begin to ask the first question you must start your recording device and also your timer this way you will know the length of the test",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "your talk must last for more than 1 minute but less than 2 minutes at the end of one minute a button will appear so if you finish your talk early you can jump to part three but it is important to try and keep talking for 2 minutes",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "part three only has five to six questions so that means you need to give long answers give lots of detail and lots of examples",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "if you have read the instructions before on my website you can click here to start your test in immediately",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "用 'the moment / the way / so that' 替代单一连词 'when / and / because'，立刻把 grammar score 从 6.5 拉到 7.5+。",
        "在 Part 1 短答中刻意给出数字边界（'more than 1 minute but less than 2 minutes'），即使内容简单，'精确度'也能让 lexical 与 coherence 双向加分。",
        "准备一个稳定的'链式指令'句型模板（如 'first…then…after that…continue…until…'），用于 Part 2 描述步骤或经历，低分考生常用 'and then…and then…'，这是 6.5 与 8.0 的典型分水岭。"
      ]
    }
  },
  {
    "id": "yt-liz-p1-topics",
    "part": 1,
    "coversParts": [
      1
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "IELTS Speaking Part 1 Topics",
    "prompt": "Common Part 1 topics with model responses.",
    "source": "https://www.youtube.com/watch?v=QwDrJOpuMuA",
    "sourceName": "IELTS Liz",
    "score": 8.5,
    "duration": 391,
    "audioPath": "/audio/yt-liz-p1-topics.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "IELTS Liz Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "Hello my name is Liz in this lesson I'm going to look at the types of topics that the examiner could ask you in IELTS speaking part 1 and at the end of this lesson I'll give you a link so that you can take a look at the topics and questions for yourself the examiner will probably ask you about 12 different questions in speaking part 1 and these questions come from usually 3 different topics these topics are all familiar topics they are topics that are common to everybody throughout the world now the first topic of these three usually come from one of these work study home and hometown you will probably get one of them for your first topic work or study now if the examiner decides to ask you about work or study the first question that the examiner will ask is \"do you work or do you study\" now the examiner is asking this question only because he or she needs to know which topic to choose to ask the questions so with this question you do not need to expand your answer you can just say very clearly \"I work\" or \"I study\" now if you're a students and you've finished university but you aren't not working either then you need to tell the examiner that and you need to say \"I've just finished university but I don't have a job yet\" and the examiner will then continue and ask you about the topic of study. Now with these topics the common questions which the examiner could ask you is where do you study or work why did you choose that subject or job the examiner might ask you about your first day about the people you that you work or study with and other things about your work or your study Now for the topic of home this topic is all about where you live so it could be about your house or your apartment and in that topic the examiner can ask you about the rooms in your house how they are decorated so what you can see on the walls or what you kind of views you have from the windows the examiner might also ask you about the people you live with or the area and street that you live in And the last topic hometown now if you get the topic of hometown this is about the place where you were born or where you spent your childhood and for this topic the examiner often asks you about places in your hometown for example buildings or old buildings in your hometown the examiner might ask you about the weather or transportation in your hometown or if you plan to still live there in the future so those are usually one of those will be your first topic for IELTS speaking part 1 but you have 2 more topics after this so lets have a look at what kind of topics you can get next Here is a list of 18 different topics I would like you to have a look at the list and decide which ones you think the examiner you might be asked about do you think the examiner might ask you about all of them or only some of them well lets have a look we've got family friends hobbies weather happiness sport food clothes school flowers shopping computers going out newspapers childhood holidays dictionaries holidays dictionaries transport do you think it's possible to get all of them in IELTS speaking part 1 Well I will tell you that all these topics are possible in IELTS speaking part 1 I know that many people may have read or heard that topics in part 1 are all easy unfortunately they are not all easy you can see here the topic of happiness or flowers or dictionaries sometimes the topics can be challenging so one of the keys to preparing is to prepare topics and that means to prepare ideas and vocabulary for all the different topics so this is a list of some of the topics you can get in part 1 for speaking if you would like to see more topics and questions as well please follow the link here and that will take you to my blog www.ieltsliz.com and in the blog you will find the topics and questions for part 1, part 2 and part 3 of the IELTS speaking test well that's all for this lesson I will see you again in another IELTS lesson",
    "analysis": {
      "overallComment": "重要前提：这段转写并非考生在 Part 1 考场的作答，而是 IELTS Liz 老师用英语讲授 Part 1 题型策略的课堂独白。因此所谓 8.5 分，指的是 Liz 老师本人英语输出达到 8.5 级别，而非某位考生 Part 1 表现。视频中嵌入的 model answer 仅有极简示范句。总体看，Liz 语速稳定、信息层层推进、词汇贴切、句法多样，能自然把控听说场景下的即兴输出，正是 Band 8–9 口语在连贯与得体方面的示范。",
      "whyHighScore": [
        "信息架构清晰：她用 'now the first topic... the last topic... so those are usually one of those will be your first topic' 把 12–18 个题目的逻辑关系交代得明明白白；6.0–6.5 考生常东一句西一句，缺乏这种宏观框架感。",
        "解释性语言精准且贴题：'one of the keys to preparing is to prepare topics and that means to prepare ideas and vocabulary' 用同位语 + 解释性从句展开抽象概念，是 Band 8+ 学术化口语的典型手段；低分考生遇到类似概念往往只会说 'very important' 反复兜圈。",
        "词汇不炫技但搭配地道：'expand your answer'、'common to everybody throughout the world'、'these topics can be challenging' 等 collocations 准确自然；不依赖生僻词，而是用高频搭配体现掌控力。",
        "容忍自然瑕疵但不影响理解：'what you kind of views you have from the windows' 出现轻微口误/重复，但整体仍可顺畅理解，这种 'self-correction with continued fluency' 正是 8 分以上允许的痕迹，反而显得真实自然。"
      ],
      "examinerTips": [
        "Part 1 第一题 'Do you work or study?' 不要过度扩展，用清晰短句直接回答即可（示范：'I study' / 'I've just finished university but I don't have a job yet'），把时间留给后续真正需要展开的题目。",
        "面对 12 个可能话题，应按 'work/study / home / hometown + 其余' 两大类预先准备 4–6 个核心故事和搭配词，迁移使用，而非逐题死记硬背；这正是 Liz 老师建议的 'prepare ideas and vocabulary' 策略。"
      ],
      "listenExcerpts": [
        "the examiner will probably ask you about 12 different questions in speaking part 1 and these questions come from usually 3 different topics these topics are all familiar topics they are topics that are common to everybody throughout the world",
        "you do not need to expand your answer you can just say very clearly",
        "if you're a students and you've finished university but you aren't not working either then you need to tell the examiner that and you need to say I've just finished university but I don't have a job yet",
        "one of the keys to preparing is to prepare topics and that means to prepare ideas and vocabulary for all the different topics"
      ],
      "listenTips": [],
      "practiceTips": [
        "Part 1 第一题 'Do you work or study?' 不要过度扩展，用清晰短句直接回答即可（示范：'I study' / 'I've just finished university but I don't have a job yet'），把时间留给后续真正需要展开的题目。",
        "面对 12 个可能话题，应按 'work/study / home / hometown + 其余' 两大类预先准备 4–6 个核心故事和搭配词，迁移使用，而非逐题死记硬背；这正是 Liz 老师建议的 'prepare ideas and vocabulary' 策略。"
      ],
      "claimedBand": 8.5,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 8.5,
        "grammar": 8.5,
        "pronunciation": 8.0
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "长达数分钟独白几乎无长停顿，使用 'now'、'so'、'well'、'let's have a look' 等衔接词自然串联。信息按 '引入—第一类—第二类—其他—总结' 推进，逻辑链完整；6.0–6.5 考生常出现明显卡顿或重复犹豫。",
          "evidence": [
            "the examiner will probably ask you about 12 different questions in speaking part 1 and these questions come from usually 3 different topics these topics are all familiar topics they are topics that are common to everybody throughout the world",
            "so those are usually one of those will be your first topic for IELTS speaking part 1 but you have 2 more topics after this so lets have a look at what kind of topics you can get next"
          ]
        },
        "lexical": {
          "score": 8.5,
          "why": "话题词汇与教学元语言（meta-language）并用：'expand your answer'、'continue and ask you'、'challenging'、'prepare ideas and vocabulary'。搭配准确自然，无明显词不达意；没有为了'显得高级'而堆砌生词，符合 Band 8 'uses a wide vocabulary with flexibility' 的描述。",
          "evidence": [
            "you do not need to expand your answer you can just say very clearly",
            "one of the keys to preparing is to prepare topics and that means to prepare ideas and vocabulary for all the different topics",
            "sometimes the topics can be challenging"
          ]
        },
        "grammar": {
          "score": 8.5,
          "why": "句式多样且错误率低：含条件状语从句（'if the examiner decides to ask you'）、被动（'you will probably get one of them'）、现在完成时（'I've just finished university'）、并列复合句（'it could be about your house or your apartment and in that topic the examiner can ask you about the rooms'）。长句仍保持清晰结构，体现 'produces frequent error-free sentences'。",
          "evidence": [
            "now if the examiner decides to ask you about work or study the first question that the examiner will ask is do you work or do you study",
            "if you're a students and you've finished university but you aren't not working either then you need to tell the examiner that",
            "it could be about your house or your apartment and in that topic the examiner can ask you about the rooms in your house how they are decorated"
          ]
        },
        "pronunciation": {
          "score": 8.0,
          "why": "从转写的标点和重复痕迹推测：句群内部节奏稳定，重音/语调自然（'the EXaminer will PRObably ASK you' 模式），并有自然的自我修正（'what you kind of views you have'）。个别处有轻读/重复，提示为真实即兴语流而非朗读。需注意：脱离音频仅凭字幕推断，有一定不确定性，故未敢判 9 分。",
          "evidence": [
            "what you can see on the walls or what you kind of views you have from the windows",
            "Now if you're a students and you've finished university but you aren't not working either"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "the examiner will probably ask you about 12 different questions in speaking part 1 and these questions come from usually 3 different topics these topics are all familiar topics they are topics that are common to everybody throughout the world",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "you do not need to expand your answer you can just say very clearly",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "if you're a students and you've finished university but you aren't not working either then you need to tell the examiner that and you need to say I've just finished university but I don't have a job yet",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "one of the keys to preparing is to prepare topics and that means to prepare ideas and vocabulary for all the different topics",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "Part 1 第一题 'Do you work or study?' 不要过度扩展，用清晰短句直接回答即可（示范：'I study' / 'I've just finished university but I don't have a job yet'），把时间留给后续真正需要展开的题目。",
        "面对 12 个可能话题，应按 'work/study / home / hometown + 其余' 两大类预先准备 4–6 个核心故事和搭配词，迁移使用，而非逐题死记硬背；这正是 Liz 老师建议的 'prepare ideas and vocabulary' 策略。"
      ]
    }
  },
  {
    "id": "yt-edm-tcfh-b9",
    "part": 1,
    "coversParts": [
      1,
      2,
      3
    ],
    "matchNote": "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
    "topic": "Band 9.0 Mock Test with Feedback",
    "prompt": "Band 9 speaking mock test with feedback.",
    "source": "https://www.youtube.com/watch?v=TcfhcHyNtcI",
    "sourceName": "edm IELTS",
    "score": 9.0,
    "duration": 848,
    "audioPath": "/audio/yt-edm-tcfh-b9.mp3",
    "isAIGenerated": false,
    "candidate": {
      "name": "edm IELTS Demo",
      "background": "公开 YouTube 高分口语示范"
    },
    "transcript": "okay let's begin yes okay so could you tell me your full name please my full name is Kong Hong uh would you like me to spell it uh no it's fine it's fine okay um and are you working or are you a student I'm currently well I'm going to become a student next year yeah I'm working on the process of becoming well attending a University application process and what major did you choose uh I think I'm going to go into pharmacy school so like the pharmaceutical area okay and why did you choose this major um I chose this major because I'm interested in the areas of biology and chemistry and pharmacy school is a way I can study that in depth and also I want to be able to help um other people through this process so I thought that was a good major to study for that great and what do you like doing when you have some free time uh one of the things that I really enjoy doing in my free time is reading books um I read all different kinds of books uh and I just really enjoy it because I get to live another person's life I can see through other people's perspective which I think is really valuable to me as well okay now we're going to talk about uh your home so what kind of housing do you live in I currently live in an apartment um I I think it's slightly different from other apartments in that it's only like six floor six floors or something um but I think it's similar to other apartments as well yeah and what is your favorite room in your home my favorite room is my bedroom just because there's a bed in it and I sleep in the bed um so and also it's just my place to relax whenever I watch movies or read I do it on the bed so it has nice memories attached to it as well and do you think you will live there for a long time uh really it's not up to me I'm guessing it's going to be my parents and the contract of the housing but um if it were up to me I think yeah I would like to live there cuz I don't like moving MH yeah okay and what's the difference between where you are living now and where you have lived in the past yeah so I have lived in different countries uh as I was growing up one country that I've lived in is India and India is very different from Korea as well so just in the um the setting and the people the culture so that's very different as well yeah okay now we're going to talk about uh meeting places yeah uh so where is your favorite place to meet your friends uh one of my favorite places to meet my friends though I haven't met many is um a place called ha y I think I really enjoy that place because there's a lot of people a lot of restaurants that we can hang out in but also um there are a lot of theaters there and I really enjoy watching musicals and uh plays as well so by hang out there we can we have we have access to different kinds of theater plays restaurants whatever that we can do making it a great spot yeah and do you think some places are more suitable for meeting than others definitely because um we I meet my friends because I want to do something with them like I want to pursue an activity with them but if I do if I go to places where there aren't a lot of choices that I can or things that I can do with my friends and it becomes less um fun I guess to hang out with my friends and so it's better to meet in certain places where there are different kinds of things we can do and different activities that we can access mhm and are there any differences between your favorite favorite meeting places now and when you were a child yeah uh I guess the differ the main difference would be what I was doing in those meeting places um these days I would again watch movies or eat and hang out just generally with my friends but I would imagine that when I was younger I would go to playgrounds perhaps with my friends to hang out um and that in itself the the activity is different therefore the meeting meting place would also have to change as well from playground to I guess popular Street or a popular meeting place yeah perfect all right that will do for part one we'll go on to part two now y okay so here is your question give you a pencil there as well so I'll give you one minute to take some notes okay okay can begin okay then that's one minute yep okay so your question yes could you describe an important thing that you learned not in school or college yes um throughout my life an important saying that I've learned and stuck close to is to always be grateful with what I have …",
    "analysis": {
      "overallComment": "该考生在 Part 1 展现出了接近 9.0 的综合能力：答题长度普遍超出 Part 1 常规要求，观点层层推进，词汇与语法都呈现「自然精准」而非「刻意堆砌」的特征。虽存在少量自我修正与口头填充（um、well、I think），但都属自然话语标记，未造成理解负担或停顿过长。整体听感接近母语者的 spontaneous speech，又不失答题的结构感——这是高分段口语的典型表现。需说明的是，本转写为 mock test with feedback，考官/老师的提问与简评穿插其中，但考生作答部分（model answer 片段）已足以支撑 9.0 的评估。",
      "whyHighScore": [
        "答题扩展性强：6.0–6.5 考生通常用 1–2 句短句回答后即停顿；本考生在 'favorite room' 一题中给出了五句以上、有层次（功能→情感→记忆）的回答，显示出自然的 elaboration 能力。",
        "词汇重在精准搭配而非生僻词：如 'nice memories attached to it'、'pursue an activity'、'access to different kinds of'，高分段评分更看 collocational accuracy，而非简单堆砌高级词。",
        "语法能在口语中自然产出复杂结构且保持低错率：如虚拟语气 'if it were up to me... I would like to live there'、介词短语 'in that it's only like six floors'，是 7.5+ 区分于 6.5 的关键标志。",
        "话语标记使用成熟：self-correction（'I I think'）、reformulation（'throughout my life an important saying that I've learned and stuck close to'）都是真实口语中的 high-level discourse feature，不是背诵痕迹。",
        "语篇衔接靠语义而非靠 'and then... and then...'：使用 'because / therefore / in that / just because' 等功能连接，体现 coherence 9 分段的逻辑推进。"
      ],
      "examinerTips": [
        "模仿其'理由→例证→感受'三段式：例如 free time 题，先给活动（reading books），再给具体内容（different kinds of books），最后给个人意义（live another person's life / see through other people's perspective），这是 Part 1 拿高分的最简模板。",
        "多用 'paraphrase + 自评' 而非 '列举'：低分考生常说 'I like reading, watching movies, and listening to music'，高分考生会说 'it's just my place to relax whenever I watch movies or read I do it on the bed'——把同一件事用不同方式重述，是 lexical range 的核心体现。",
        "允许并善用 self-correction：'I I think it's slightly different... it's only like six floor six floors or something' 这种修复在考官眼中是 discourse competence，而非失分点，反而显示语言监控能力强。"
      ],
      "listenExcerpts": [
        "I chose this major because I'm interested in the areas of biology and chemistry and pharmacy school is a way I can study that in depth and also I want to be able to help um other people through this process so I thought that was a good major to study for that",
        "my favorite room is my bedroom just because there's a bed in it and I sleep in the bed um so and also it's just my place to relax whenever I watch movies or read I do it on the bed so it has nice memories attached to it as well",
        "if it were up to me I think yeah I would like to live there cuz I don't like moving",
        "throughout my life an important saying that I've learned and stuck close to is to always be grateful with what I have"
      ],
      "listenTips": [],
      "practiceTips": [
        "模仿其'理由→例证→感受'三段式：例如 free time 题，先给活动（reading books），再给具体内容（different kinds of books），最后给个人意义（live another person's life / see through other people's perspective），这是 Part 1 拿高分的最简模板。",
        "多用 'paraphrase + 自评' 而非 '列举'：低分考生常说 'I like reading, watching movies, and listening to music'，高分考生会说 'it's just my place to relax whenever I watch movies or read I do it on the bed'——把同一件事用不同方式重述，是 lexical range 的核心体现。",
        "允许并善用 self-correction：'I I think it's slightly different... it's only like six floor six floors or something' 这种修复在考官眼中是 discourse competence，而非失分点，反而显示语言监控能力强。"
      ],
      "claimedBand": 9.0,
      "analysisSource": "minimax-examiner",
      "bandCriteria": {
        "fluency": 9.0,
        "lexical": 9.0,
        "grammar": 9.0,
        "pronunciation": 8.5
      },
      "scoringDetails": {
        "fluency": {
          "score": 9.0,
          "why": "语速稳定、停顿多为 thinking pause 而非 lost-for-words；长 answer 内部节奏自然，没有为追求流利而吞音或跳过连接。self-correction 被用于 refine 表达，是 9 分段的标志；低分考生通常表现为长时间 'em... em...' 或反复从头开始。",
          "evidence": [
            "I chose this major because I'm interested in the areas of biology and chemistry and pharmacy school is a way I can study that in depth and also I want to be able to help um other people through this process so I thought that was a good major to study for that",
            "my favorite room is my bedroom just because there's a bed in it and I sleep in the bed um so and also it's just my place to relax whenever I watch movies or read I do it on the bed so it has nice memories attached to it as well"
          ]
        },
        "lexical": {
          "score": 9.0,
          "why": "用词重在 'paraphrase' 与 'precise collocation'：能用 'pharmaceutical area' 替代简单的 'medicine'，用 'pursue an activity' 替代 'do something'，用 'be grateful with what I have' 表达感恩。词伙（collocation）准确自然，没有 'big big' 这类低分段的重复修饰。",
          "evidence": [
            "pharmacy school so like the pharmaceutical area",
            "nice memories attached to it as well",
            "I meet my friends because I want to pursue an activity with them",
            "we have access to different kinds of theater plays restaurants whatever that we can do making it a great spot"
          ]
        },
        "grammar": {
          "score": 9.0,
          "why": "能在自然口语中产出虚拟语气、限定性/非限定性从句、介词短语作补语等复杂结构，且准确率高。'in that' 作为书面化连词出现在口语中，是 8.5+ 的信号。低分考生通常只产出 'because... and...' 的并列结构。",
          "evidence": [
            "if it were up to me I think yeah I would like to live there cuz I don't like moving",
            "I currently live in an apartment um I I think it's slightly different from other apartments in that it's only like six floor six floors or something",
            "I would imagine that when I was younger I would go to playgrounds perhaps with my friends to hang out um and that in itself the the activity is different therefore the meeting meting place would also have to change as well"
          ]
        },
        "pronunciation": {
          "score": 8.5,
          "why": "转写中可见该考生连读、缩读自然（'I'm'、'it's'、'I haven't'、'cuz'），且能较自信地使用 'pharmaceutical'、'throughout' 这类多音节词，提示发音清晰度较高、节奏控制良好。self-repair 痕迹（'I I think'、'the the activity'）说明有自然 thinking pause。给 8.5 而非 9.0 是因为转写无法呈现重音、语调变化与个别音素准确度，且 'meting' 出现一次口误（应为 'meeting'），可能有轻度音节压缩——但这在 spontaneous speech 中属正常现象，不影响可理解性。",
          "evidence": [
            "I I think it's slightly different from other apartments in that it's only like six floor six floors or something",
            "throughout my life an important saying that I've learned and stuck close to is to always be grateful with what I have"
          ]
        }
      },
      "fluencyHighlights": [],
      "lexicalHighlights": [],
      "grammarHighlights": [],
      "pronunciationHighlights": [],
      "contentHighlights": [],
      "sentences": [
        {
          "text": "I chose this major because I'm interested in the areas of biology and chemistry and pharmacy school is a way I can study that in depth and also I want to be able to help um other people through this process so I thought that was a good major to study for that",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "my favorite room is my bedroom just because there's a bed in it and I sleep in the bed um so and also it's just my place to relax whenever I watch movies or read I do it on the bed so it has nice memories attached to it as well",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "if it were up to me I think yeah I would like to live there cuz I don't like moving",
          "translation": "",
          "technique": "高分证据句"
        },
        {
          "text": "throughout my life an important saying that I've learned and stuck close to is to always be grateful with what I have",
          "translation": "",
          "technique": "高分证据句"
        }
      ],
      "improvements": [
        "模仿其'理由→例证→感受'三段式：例如 free time 题，先给活动（reading books），再给具体内容（different kinds of books），最后给个人意义（live another person's life / see through other people's perspective），这是 Part 1 拿高分的最简模板。",
        "多用 'paraphrase + 自评' 而非 '列举'：低分考生常说 'I like reading, watching movies, and listening to music'，高分考生会说 'it's just my place to relax whenever I watch movies or read I do it on the bed'——把同一件事用不同方式重述，是 lexical range 的核心体现。",
        "允许并善用 self-correction：'I I think it's slightly different... it's only like six floor six floors or something' 这种修复在考官眼中是 discourse competence，而非失分点，反而显示语言监控能力强。"
      ]
    }
  }
]
