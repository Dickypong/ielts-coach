/**
 * 2026 年 9-12 月雅思口语保留题（来自备考资料 PDF）。
 * 与默认题库共存：练习页可在"默认题库 / 9-12 保留题"之间切换。
 * Part 2 题附带 Part 3 讨论题 + 范例回答 + 中文翻译，方便跟读练习。
 *
 * 数据格式与 speakingTopics 对齐，可直接拼到 useAllSpeakingTopics 的结果里。
 */

import type { SpeakingTopic } from './speakingTopics'

const SOURCE = '2026 9-12 保留题'

/** Part 1：每个 topic 包含 4-6 个问题，每个问题附带英文/中文范例回答 */
export const predictedSpeakingTopics: SpeakingTopic[] = [
  // ===== Part 1 · Singing =====
  {
    id: 'pred-p1-singing',
    examPeriod: '2026 Q4',
    part: 1,
    prompt: 'Singing（唱歌）',
    subQuestions: [
      'Did you sing when you were a child?',
      'How well did you sing?',
      'Do you like singing?',
      'Did you take music lessons?',
      'Will you sing in the car?',
    ],
    tags: ['Part 1', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'easy',
    source: SOURCE,
    fullPrompt: 'Singing（唱歌）',
    exampleAnswer: [
      '1) Yes, I used to sing a lot when I was a kid. I remember singing those nursery rhymes in kindergarten — things like "Twinkle Twinkle Little Star." But honestly, I wasn\'t very good at it. My parents would probably say I sounded like a broken record.',
      '2) Well, I\'d say I was a terrible singer back then. I could never hit the high notes, and my classmates would sometimes laugh at my performances. But looking back, it was really innocent fun.',
      '3) Actually, I do enjoy singing, but only when I\'m alone in my room or singing along to songs in the car. I\'m too shy to sing in front of others. I think music really helps me relax after a long day.',
      '4) Yes, I took music lessons for about two years when I was in primary school. I learned basic piano and some music theory. But unfortunately, I had to stop because my schedule got too busy with academic subjects.',
      '5) Definitely! When I\'m driving alone, I love cranking up the volume and singing at the top of my lungs. It\'s one of my favorite things to do on road trips. But I stay quiet when there are passengers — that would be too embarrassing!',
    ].join('\n\n'),
    exampleAnswerZh: [
      '1) 是的，我小时候经常唱歌。我记得在幼儿园唱那些童谣，比如《小星星》。但说实话，我唱得不太好。我父母可能会说我像一台坏掉的唱片。',
      '2) 嗯，我得说那时候我唱得很差。我从来都唱不上去高音，我的同学们有时会笑话我的表演。但现在回想起来，那真的是很单纯的乐趣。',
      '3) 实际上我喜欢唱歌，但只有在独自在房间里或跟着车里播放的歌一起唱时才喜欢。在别人面前唱我太害羞了。我觉得音乐能帮助我在漫长的一天后放松下来。',
      '4) 是的，我上小学时大约学了两年音乐课。我学了基础钢琴和一些乐理知识。但不幸的是，我不得不停止，因为学业太忙了。',
      '5) 当然！一个人开车时，我喜欢把音量调大然后尽情唱。这是 road trips 时我最喜欢做的事。但有乘客我就安静——那太尴尬了。',
    ].join('\n\n'),
  },

  // ===== Part 1 · Tidiness =====
  {
    id: 'pred-p1-tidiness',
    examPeriod: '2026 Q4',
    part: 1,
    prompt: 'Tidiness（整洁）',
    subQuestions: [
      'Were you a tidy person as a child?',
      'Are you a tidy person now?',
      'What do you think of untidy people?',
      'What do you think of those who don\'t care about tidiness?',
    ],
    tags: ['Part 1', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'easy',
    source: SOURCE,
    fullPrompt: 'Tidiness（整洁）',
    exampleAnswer: [
      '1) Not really, I was quite messy as a child. I always left my toys scattered around the house, and my mom had to clean up after me every day. Looking back, I think I was a typical messy kid who hated organizing things.',
      '2) Well, I\'d say I\'m somewhat tidy now, but not obsessive about it. I keep my workspace relatively clean, and I try to organize my desk once a week. However, my room still gets messy from time to time, especially when I\'m busy with studies.',
      '3) I think untidy people are just more relaxed about their surroundings. Some people live in chaos and seem perfectly happy with it. As long as it doesn\'t affect others, I don\'t really mind. Everyone has different standards, I suppose.',
      '4) Honestly, people who are overly tidy might be a bit hard to live with. They\'re always cleaning and organizing, which can feel stressful for others. But at the same time, I respect their discipline and attention to detail. It\'s just not my style.',
    ].join('\n\n'),
    exampleAnswerZh: [
      '1) 其实不是，我小时候挺邋遢的。我总是把玩具扔得满地都是，我妈每天都得帮我收拾。现在回想起来，我觉得我就是典型的讨厌整理东西的邋遢孩子。',
      '2) 嗯，我得说我现在还算整洁，但不是那种有洁癖的。我尽量让我的工作空间保持干净，每周整理一次桌子。但我的房间还是会不时变乱，特别是学习忙的时候。',
      '3) 我觉得邋遢的人只是对周围环境更随意一些。有些人在混乱中生活似乎也很开心。只要不影响别人，我并不真的在意。每个人有不同的标准，我想。',
      '4) 说实话，有洁癖的人可能有点难相处。他们总是在打扫整理，这可能会让其他人感到压力。但同时，我很尊重他们的自律和注重细节。这只是不是我的风格。',
    ].join('\n\n'),
  },

  // ===== Part 1 · Science =====
  {
    id: 'pred-p1-science',
    examPeriod: '2026 Q4',
    part: 1,
    prompt: 'Science（科学）',
    subQuestions: [
      'Did you learn much about science at school?',
      'How do you learn about science in daily life?',
      'Do you like science?',
      'What area of science do you know about?',
    ],
    tags: ['Part 1', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'easy',
    source: SOURCE,
    fullPrompt: 'Science（科学）',
    exampleAnswer: [
      '1) Yes, I learned quite a bit about science in school, especially physics and biology. We had interesting experiments in class, like growing plants or testing simple circuits. But honestly, I wasn\'t particularly good at it. I found some concepts quite difficult to understand.',
      '2) In daily life, I learn about science mainly through educational videos and documentaries. YouTube has so many great channels that explain scientific concepts in a fun way. Also, I follow some science accounts on social media — they post interesting facts every day. Sometimes I even read science news online to keep updated.',
      '3) Yes, I do! Science really cracks the code for me — it helps me understand how everything works. I come across new discoveries all the time and they absolutely blow my mind. Being curious about how things work has always been my thing.',
      '4) The area I\'m best at is computer science — I majored in it, so I know my way around. I\'ve also branched out into AI and data science recently to keep up with the trends. Though when it comes to physics or biology, I can only fall back on what I learned in school.',
    ].join('\n\n'),
    exampleAnswerZh: [
      '1) 是的，我在学校学了不少科学知识，特别是物理和生物。我们在课堂上有趣的实验，比如种植物或测试简单电路。但说实话，我学得不太好。有些概念我觉得挺难理解的。',
      '2) 在日常生活中，我主要通过教育视频和纪录片学习科学。YouTube 上有很多很棒的频道，用有趣的方式解释科学概念。我也关注社交媒体上的一些科学账号——它们每天发布有趣的知识。有时我还会上网阅读科学新闻来保持更新。',
      '3) 是的，我喜欢！科学帮我搞懂一切——它让我理解事物如何运作。我经常遇到新发现，它们让我震惊。对事物如何运作好奇一直是我的爱好。',
      '4) 我最擅长的是计算机科学——我主修这个，所以比较在行。最近也扩展到人工智能和数据科学以跟上趋势。但说到物理或生物，我只能依靠学校学的。',
    ].join('\n\n'),
  },

  // ===== Part 1 · Watch =====
  {
    id: 'pred-p1-watch',
    examPeriod: '2026 Q4',
    part: 1,
    prompt: 'Watch（手表）',
    subQuestions: [
      'Do you wear a watch in your daily life?',
      'Has anyone ever given you a watch?',
      'Do people around you like wearing watches?',
      'What kind of watches do they usually like?',
    ],
    tags: ['Part 1', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'easy',
    source: SOURCE,
    fullPrompt: 'Watch（手表）',
    exampleAnswer: [
      '1) Actually, I don\'t wear a watch regularly these days. I usually just check the time on my phone — it\'s much more convenient. But I do have a watch at home that my grandfather gave me as a gift. I only wear it on special occasions.',
      '2) Yes, my grandfather gave me a watch as a birthday gift when I turned 18. It\'s a traditional mechanical watch — nothing too fancy, but I really treasure it because it has sentimental value. He said it symbolized growing up and being responsible.',
      '3) I think it really depends on the person. Some of my friends love wearing watches — they see it as a fashion statement. Others, especially younger generations, probably prefer smartwatches or just use their phones. It\'s kind of a mixed situation nowadays.',
      '4) I think most people here prefer simple, practical watches. They usually like something that\'s not too expensive but looks decent. Smartwatches are becoming more popular, especially among young people. Traditional mechanical watches are still popular with older generations, though.',
    ].join('\n\n'),
    exampleAnswerZh: [
      '1) 其实，我这些天不常常戴手表。我通常直接在手机上看时间——这样更方便。但我家里确实有一块手表，是我爷爷送给我的礼物。我只在特殊场合才戴。',
      '2) 是的，我爷爷在我 18 岁生日时送给我一块手表。这是一块传统的机械表——不算太奢华，但我很珍惜它，因为有纪念意义。他说它象征着成长和责任。',
      '3) 我觉得这真的因人而异。我的一些朋友喜欢戴手表——他们把它当作一种时尚宣言。其他人，特别是年轻人，可能更喜欢智能手表或直接用手机。现在这种情况挺混合的。',
      '4) 我觉得这里大多数人更喜欢简单实用的手表。他们通常喜欢不太贵但看起来不错的。智能手表越来越受欢迎，特别是在年轻人中。但传统机械表在老一辈中仍然很受欢迎。',
    ].join('\n\n'),
  },

  // ===== Part 1 · Park and gardens =====
  {
    id: 'pred-p1-park',
    examPeriod: '2026 Q4',
    part: 1,
    prompt: 'Park and gardens（公园）',
    subQuestions: [
      'Was there a park near your home that you liked to go to when you were a child?',
      'What did you do there?',
      'Do you think there should be more parks and gardens in your city?',
    ],
    tags: ['Part 1', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'easy',
    source: SOURCE,
    fullPrompt: 'Park and gardens（公园）',
    exampleAnswer: [
      '1) Yes, there was a small park right next to my residential area when I was a child. It wasn\'t very big — just some slides and swings, but to me it felt like a huge adventure playground. I went there almost every day after school with my friends.',
      '2) We did all sorts of fun things there. We would play hide and seek, climb the jungle gym, or just run around chasing each other. Sometimes we brought snacks and had little picnics under the trees. Those were really happy memories that I still cherish.',
      '3) Absolutely! I think every city needs more green spaces. With more parks and gardens, people would have better places to relax and the environment would improve too. It\'s crucial for quality of life in urban areas.',
    ].join('\n\n'),
    exampleAnswerZh: [
      '1) 是的，我小时候住的附近有一个小公园。它不大——只有滑梯和秋千，但对我来说就像一个巨大的冒险乐园。放学后我几乎每天都和朋友们去那儿。',
      '2) 我们在那儿做各种有趣的事情。我们玩捉迷藏，爬攀爬架，或者互相追逐着跑。有时候我们带着零食在树下野餐。那些都是我现在仍然珍惜的快乐回忆。',
      '3) 当然！我觉得每个城市都需要更多绿地。有更多公园和花园，人们会有更好的放松地方，环境也会改善。这对城市地区的生活质量至关重要。',
    ].join('\n\n'),
  },

  // ===== Part 1 · Websites =====
  {
    id: 'pred-p1-websites',
    examPeriod: '2026 Q4',
    part: 1,
    prompt: 'Websites（网站）',
    subQuestions: [
      'Do you like using websites?',
      'Do you prefer searching for information on websites or in books?',
      'Do you plan to create your own website?',
      'Which website do you usually use?',
    ],
    tags: ['Part 1', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'easy',
    source: SOURCE,
    fullPrompt: 'Websites（网站）',
    exampleAnswer: [
      '1) Yes, I definitely like using websites. They\'re so convenient — I can access information anytime, anywhere. Compared to traditional methods, websites are much faster and more efficient for finding what I need.',
      '2) I definitely prefer searching on websites rather than in books. Websites give you instant results, and you can access way more information in a short time. Books take longer to get, and sometimes the info is outdated. But I still read books for deep, detailed research.',
      '3) To be honest, I don\'t really have plans to create my own website right now. Maybe someday when I have something special to share, like a blog about my hobbies or travel experiences. But for now, I\'m too busy with studies and haven\'t really thought about it.',
      '4) It depends on what I need. For searching, I use Baidu. For videos, I\'m really into Bilibili — I can spend hours scrolling through content. For shopping, it\'s Taobao and JD. Each has its own purpose.',
    ].join('\n\n'),
    exampleAnswerZh: [
      '1) 是的，我确实喜欢用网站。它们非常方便——我可以随时随地获取信息。相比传统方式，网站查找东西更快更有效率。',
      '2) 我更喜欢在网上搜索而不是在书里搜索。网站能立即给你结果，短时间内可以获取更多信息。书需要更长时间获取，而且有时候信息过时了。但我仍然会为了深入详细的研究而读书。',
      '3) 说实话，我现在没有真的计划创建自己的网站。也许有一天当我有什么特别的东西要分享时，比如关于我爱好或旅行经历的博客。但现在我学习太忙了，还没真正想过这个。',
      '4) 看需要什么。搜索用百度。视频我喜欢 B 站——可以刷几个小时。购物用淘宝和京东。各有各的用途。',
    ].join('\n\n'),
  },

  // ===== Part 1 · The space =====
  {
    id: 'pred-p1-space',
    examPeriod: '2026 Q4',
    part: 1,
    prompt: 'The space（太空）',
    subQuestions: [
      'Have you ever learnt anything about space and the stars when you were at school?',
      'Would you like to know more about space and the stars?',
      'Do you like science-fiction movies set in space?',
      'Do you want to go into outer space in the future?',
    ],
    tags: ['Part 1', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'medium',
    source: SOURCE,
    fullPrompt: 'The space（太空）',
    exampleAnswer: [
      '1) Yes, I learned some basic things about space in school, like the names of planets in our solar system and basic concepts like gravity. But it was mostly surface-level knowledge — nothing too deep or detailed. I remember looking at the stars and wondering what\'s out there.',
      '2) Actually, I\'m quite curious about space and would love to learn more. The universe is so mysterious — there are so many things we still don\'t know. If I had the chance, I\'d love to read more books or watch documentaries about black holes and galaxies.',
      '3) Yes, I absolutely love sci-fi movies set in space. Movies like Interstellar or The Martian are my favorites. The visual effects are amazing, and the ideas are so creative. They make me think about what\'s possible in the future.',
      '4) Would I want to go into outer space? That sounds incredible, but also terrifying at the same time. The idea of floating in zero gravity and seeing Earth from above would be amazing. But I\'m not sure I\'d have the courage — it seems quite dangerous and uncomfortable.',
    ].join('\n\n'),
    exampleAnswerZh: [
      '1) 是的，我在学校学了一些基本的太空知识，比如太阳系行星的名字和重力等基本概念。但大多是浅层面的知识——不太深入。我记得仰望星星时会想那边有什么。',
      '2) 实际上我对太空很好奇，很想了解更多。宇宙如此神秘——有很多我们还不知道的东西。如果有机会，我很乐意读更多关于黑洞和银河的书或看纪录片。',
      '3) 是的，我非常喜欢太空背景的科幻电影。像《星际穿越》或《火星救援》是我的最爱。视觉效果令人惊叹，创意无限。它们让我思考未来的可能性。',
      '4) 我想去外太空吗？听起来很惊人，但同时也令人恐惧。飘浮在零重力和从上方看地球的想法会很惊人。但我不确定我有勇气——似乎相当危险和不舒服。',
    ].join('\n\n'),
  },

  // ===== Part 1 · Music =====
  {
    id: 'pred-p1-music',
    examPeriod: '2026 Q4',
    part: 1,
    prompt: 'Music（音乐）',
    subQuestions: [
      'Do you like music?',
      'What kinds of music do you listen to?',
      'Do you prefer sad or happy music?',
      'Does happy music make you feel more excited?',
      'Is it easy to learn music?',
      'Do you learn music lessons at school?',
    ],
    tags: ['Part 1', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'easy',
    source: SOURCE,
    fullPrompt: 'Music（音乐）',
    exampleAnswer: [
      '1) Yes, I absolutely love music. It\'s a huge part of my life — I listen to music almost every day, whether I\'m studying, working out, or just relaxing. I can\'t imagine life without music.',
      '2) I listen to all kinds of music, but mostly pop and some R&B. My favorite artists change from time to time. When I\'m feeling down, I prefer softer melodies. But when I need energy, I\'ll put on something more upbeat.',
      '3) It really depends on my mood. When I\'m feeling sad or tired, I prefer sad music because it somehow connects with my feelings. But when I\'m with friends or at a party, happy music definitely makes everything better.',
      '4) Yes, definitely! Happy music instantly boosts my mood and gives me energy. It\'s like a natural medicine — when I hear an upbeat song, I just feel more positive and ready to take on the world.',
      '5) Learning music isn\'t easy, but it\'s definitely worth it. You need practice and patience. It\'s like learning a new language — the more you practice, the better you get. But if you have a good teacher, it becomes much easier.',
      '6) Yes, we had some basic music classes at school, mainly learning to sing and some simple music theory. But it wasn\'t very formal — more like fun activities. I wished we had more structured music education.',
    ].join('\n\n'),
    exampleAnswerZh: [
      '1) 是的，我非常喜欢音乐。音乐是我生活的一大组成部分——我几乎每天都会听音乐，不管是在学习、锻炼还是放松时。我无法想象没有音乐的生活。',
      '2) 我听各种音乐，但主要是流行音乐和一些 R&B。我喜欢的歌手随时会变。当我心情不好时，我更喜欢轻柔的旋律。但当我需要能量时，我会放更劲爆的音乐。',
      '3) 这真的取决于我的心情。当我感到悲伤或累的时候，我更喜欢悲伤的音乐，因为它以某种方式与我的感受产生共鸣。但当我和朋友在一起或在派对上，快乐的音乐绝对让一切更好。',
      '4) 是的，当然！快乐音乐瞬间提升我的情绪，给我能量。它就像天然的药物——当我听到一首欢快的歌，我就感觉更积极，准备好面对世界。',
      '5) 学音乐不容易，但绝对值得。你需要练习和耐心。它就像学一门新语言——越练习越好。但如果有好的老师，会变得更容易。',
      '6) 是的，我们在学校有一些基础的音乐课，主要是学唱歌和一些简单的乐理。但不是非常正式——更像是趣味活动。我希望能有更有系统的音乐教育。',
    ].join('\n\n'),
  },

  // ===== Part 1 · Teachers =====
  {
    id: 'pred-p1-teachers',
    examPeriod: '2026 Q4',
    part: 1,
    prompt: 'Teachers（老师）',
    subQuestions: [
      'Is it easy to remember your teachers in elementary school?',
      'Did you want to be a teacher when you were young?',
      'Do you think teachers are different now than when your parents were at school?',
      'Did you have a favorite teacher at school?',
    ],
    tags: ['Part 1', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'easy',
    source: SOURCE,
    fullPrompt: 'Teachers（老师）',
    exampleAnswer: [
      '1) To be honest, I don\'t remember many of my elementary school teachers clearly. There are a few faces I can recall, but their names have faded from memory. It\'s been too many years, and I wasn\'t very close to most of them.',
      '2) When I was young, I think I briefly thought about being a teacher, but it wasn\'t a serious dream. Teaching seemed like a lot of work for not much money. But looking back, it must be a really meaningful profession.',
      '3) I think teachers are quite different now compared to my parents\' time. These days, teachers use technology a lot more — computers, projectors, and online platforms. Classrooms are more interactive now, and the relationship between teachers and students seems more equal.',
      '4) Yes, I do have a favorite teacher — my high school English teacher, Ms. Wang. She was so patient and always encouraged us to speak up in class. She made English fun and accessible. I\'m still grateful for her influence on my language skills.',
    ].join('\n\n'),
    exampleAnswerZh: [
      '1) 说实话，我不太记得小学老师们的样子了。有几张脸我能回忆起来，但他们的名字已经模糊了。过了太多年了，而且我和他们大多数都不太亲近。',
      '2) 当我年轻的时候，我想我曾短暂想过当老师，但不是认真的梦想。教学似乎工作多但钱不多。但现在回想起来，这一定是一个非常有意义的职业。',
      '3) 我觉得现在的老师和父母那个时代很不同。现在老师们更多地使用技术——电脑、投影仪和在线平台。现在课堂更互动了，老师和学生之间的关系似乎也更平等了。',
      '4) 是的，我有一个最喜欢的老师——我的高中英语老师，王老师。她非常有耐心，总是鼓励我们在课堂上发言。她让英语变得有趣且容易上手。我仍然很感激她对我语言能力的影响。',
    ].join('\n\n'),
  },

  // ===== Part 1 · Social media =====
  {
    id: 'pred-p1-socialmedia',
    examPeriod: '2026 Q4',
    part: 1,
    prompt: 'Social media（社交媒体）',
    subQuestions: [
      'Do your friends and family use social media?',
      'Do you think people in your country find social media useful?',
      'Do you spend too much time on social media?',
      'When did you start using social media?',
    ],
    tags: ['Part 1', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'easy',
    source: SOURCE,
    fullPrompt: 'Social media（社交媒体）',
    exampleAnswer: [
      '1) Yes, almost all my friends and family use social media. Wechat is the most popular here, and everyone uses it to stay connected. My parents even use it more than I do sometimes — they\'re always sending me random articles and videos.',
      '2) Yes, I think most people in my country find social media extremely useful. It\'s how we communicate, share information, and even do business. During the pandemic, it became even more important for staying connected. But there\'s also concerns about privacy and misinformation.',
      '3) I don\'t think I spend too much time on social media, but I could probably cut down a bit. I use it mainly for keeping up with friends and news. Sometimes I catch myself scrolling mindlessly for too long, though. Moderation is key.',
      '4) I started using social media when I was around 14 or 15, mainly Wechat and QQ. At first, it was mainly for fun and keeping in touch with classmates. Looking back, I probably started a bit too early. These days, there\'s more awareness about age restrictions.',
    ].join('\n\n'),
    exampleAnswerZh: [
      '1) 是的，我几乎所有的朋友和家人都在使用社交媒体。微信是最流行的，我们都用它来保持联系。我父母有时候用它比我還多——他们总是给我发各种文章和视频。',
      '2) 是的，我觉得我们国家大多数人觉得社交媒体非常有用。它是我们沟通、分享信息、甚至做生意的方式。疫情期间，它在保持联系方面变得更加重要。但也有对隐私和虚假信息的担忧。',
      '3) 我不觉得花在社交媒体上的时间太多，但也许可以减少一点。我主要用它来了解朋友和新闻。有时候我发现自己会无意识地刷太久。适度是关键。',
      '4) 我大约在 14 或 15 岁开始使用社交媒体，主要是微信和 QQ。起初主要是为了好玩和与同学保持联系。现在回想起来，我可能开始得有点早了。現在人们对年龄限制有更強的意识。',
    ].join('\n\n'),
  },

  // ===== Part 1 · Headphone =====
  {
    id: 'pred-p1-headphone',
    examPeriod: '2026 Q4',
    part: 1,
    prompt: 'Headphone（耳机）',
    subQuestions: [
      'How often do you wear headphones?',
      'Do you think headphones are useful?',
      'Are headphones popular in your country?',
      'In what situations should people not wear headphones?',
    ],
    tags: ['Part 1', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'easy',
    source: SOURCE,
    fullPrompt: 'Headphone（耳机）',
    exampleAnswer: [
      '1) Actually, I wear headphones quite often, maybe a couple of hours every day. I usually put them on when listening to music or watching videos on my phone, especially when I\'m on the bus or train. It helps me relax and avoid disturbing others around me.',
      '2) Yeah, I think they\'re pretty useful. They\'re great for enjoying music or videos without disturbing others, especially on public transport. Also, good headphones can block out noise and help you focus. The only downside is you might not hear important announcements.',
      '3) Definitely, they\'re very popular in China. I see people wearing them everywhere — on the subway, in cafes, even walking on the street. Young people especially love wireless earbuds these days. They\'ve become kind of a fashion accessory too.',
      '4) Well, they probably shouldn\'t wear them when driving or crossing the street — it\'s not safe because you can\'t hear horns or traffic. Also, when talking to someone face-to-face, it\'s kind of rude to keep them on. And in important meetings, you should take them off too.',
    ].join('\n\n'),
    exampleAnswerZh: [
      '1) 实际上，我经常戴耳机，大概每天几个小时。我一般在听音乐或看视频时戴耳机，特别是在公交车或地铁上。这能让我放松，也不打扰周围的人。',
      '2) 是的，我觉得很有用。戴耳机听音乐或看视频不会打扰别人，特别是在公共交通上。而且好的耳机可以隔绝噪音帮助你集中注意力。唯一的缺点是可能听不到重要通知。',
      '3) 当然，非常流行！在中国到处都有人戴耳机——地铁里、咖啡馆、甚至街上走路时。现在的年轻人尤其喜欢无线耳机。耳机甚至成为一种时尚配饰。',
      '4) 嗯，开车或过马路时不应该戴——不安全因为你听不到喇叭或交通声音。还有，和别人面对面说话时一直戴着也不太礼貌。在重要会议中也应该摘下来。',
    ].join('\n\n'),
  },

  // ===== Part 1 · Telling jokes =====
  {
    id: 'pred-p1-jokes',
    examPeriod: '2026 Q4',
    part: 1,
    prompt: 'Telling jokes（讲笑话）',
    subQuestions: [
      'Do you like to tell jokes?',
      'Do you often joke with your friends?',
      'Do you have friends who love telling jokes?',
      'What are some common comedy shows in your country?',
      'Do you like being joked about?',
    ],
    tags: ['Part 1', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'medium',
    source: SOURCE,
    fullPrompt: 'Telling jokes（讲笑话）',
    exampleAnswer: [
      '1) Actually, I do enjoy a good joke, but I\'m not the funniest person in the room. I prefer listening to others make me laugh rather than trying to be the comedian myself. Sometimes I slip in a pun or two when I\'m with close friends.',
      '2) Sure, me and my friends joke around quite a bit. It\'s our way of having fun and keeping things light between us. We often tease each other about small things, like someone\'s bad taste in music or their cooking skills.',
      '3) Definitely! One of my best friends is basically a human joke machine. He\'s always coming up with something funny — sometimes about daily life, sometimes about our teachers. Everyone loves hanging out with him because he\'s so funny.',
      '4) In China, variety shows are really popular — things like "Happy Camp" or "The Rap of China" have comedy elements. Also, stand-up comedy is getting more popular lately, especially in big cities like Shanghai and Beijing. Many young people go to comedy clubs for a good laugh.',
      '5) It depends on the joke. If it\'s mild and among close friends, I\'m totally fine with it — we all have fun together. But nobody likes being meanly teased or mocked in front of others. It can be really embarrassing and hurtful.',
    ].join('\n\n'),
    exampleAnswerZh: [
      '1) 是的，我喜欢好笑话，但我不是房间里最搞笑的人。我更喜欢听别人逗我笑，而不是自己当喜剧演员。有时和好朋友在一起我会说个双关语。',
      '2) 当然！我和朋友经常开玩笑。这是我们找乐子、让气氛轻松的方式。我们经常互相取笑一些小事情，比如某人对音乐的审美或厨艺。',
      '3) 当然！我最好的朋友之一简直是个笑话制造机。他总是能想出有趣的东西——有时关于日常生活，有时关于我们的老师。大家都喜欢和他在一起因为他太搞笑了。',
      '4) 在中国，综艺节目很火——《快乐大本营》《中国有嘻哈》等都有喜剧元素。近来单口喜剧也越来越流行，特别是在上海、北京这样的大城市。很多年轻人会去喜剧俱乐部找乐子。',
      '5) 看情况。如果是轻微的玩笑，在好朋友之间我完全无所谓——大家一起找乐子。但没人喜欢被恶意取笑或在别人面前被嘲弄。那会很尴尬甚至伤人。',
    ].join('\n\n'),
  },

  // ===== Part 1 · Cars =====
  {
    id: 'pred-p1-cars',
    examPeriod: '2026 Q4',
    part: 1,
    prompt: 'Cars（汽车）',
    subQuestions: [
      'Would you like to be the driver or the passenger?',
      'Is there a lot of cars on the roads in your city?',
      'Do you want to own a very expensive car?',
      'Did you go on a long car journey when you were a child?',
    ],
    tags: ['Part 1', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'easy',
    source: SOURCE,
    fullPrompt: 'Cars（汽车）',
    exampleAnswer: [
      '1) I\'d prefer to be the driver — I like having control over the route and music. I enjoy picking the playlist and deciding where to go. But being a passenger is also nice for relaxing and just looking out the window, especially on long trips.',
      '2) Oh, definitely. The traffic can be pretty bad during rush hour — sometimes it takes an hour to get across town. Finding a parking spot is always a nightmare, especially near shopping malls or my school. The roads are just getting more and more crowded.',
      '3) Honestly, not really. An expensive car is nice to have, but it\'s not my priority in life. I\'d rather spend money on travel or experiences, like trying different foods or going to concerts. A car is just a tool to get from A to B in my mind.',
      '4) Yes, we did! My family used to go on road trips during holidays — visiting relatives in other cities. Though I did get carsick sometimes, the journey was still fun. Those family road trips are some of my best childhood memories.',
    ].join('\n\n'),
    exampleAnswerZh: [
      '1) 我更喜欢开车——我喜欢控制路线和音乐。我喜欢选播放列表和决定去哪里。但当乘客也很放松，可以看看窗外，特别是长途旅行。',
      '2) 哦，当然是。高峰期交通很糟糕——有时穿越城市要一个小时。找停车位总是件头疼的事，特别是在商场或学校附近。路上越来越堵。',
      '3) 说实话，不是。名车很好，但不是我的优先考虑。我更愿意把钱花在旅行或体验上，比如尝试不同的食物或去音乐会。车在我心里只是从 A 到 B 的工具。',
      '4) 是的，我们去过！我家人以前节假日自驾游——去看其他城市的亲戚。虽然我有时候会晕车，但旅途还是很有趣。那些家庭公路旅行是我最好的童年记忆之一。',
    ].join('\n\n'),
  },

  // ===== Part 1 · Clothes =====
  {
    id: 'pred-p1-clothes',
    examPeriod: '2026 Q4',
    part: 1,
    prompt: 'Clothes（衣服）',
    subQuestions: [
      'What kind of clothes do you like to wear?',
      'Do you wear different clothes on the weekend?',
      'Do you buy clothes because of the brand? What brands do you usually buy?',
      'What colors of clothes do you dislike?',
    ],
    tags: ['Part 1', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'easy',
    source: SOURCE,
    fullPrompt: 'Clothes（衣服）',
    exampleAnswer: [
      '1) I prefer comfortable, casual clothes — things like jeans, t-shirts, and hoodies. I\'m not really into formal wear unless it\'s for special occasions. I care more about feeling comfortable than following the latest fashion trends.',
      '2) Yeah, definitely. On weekdays I usually wear something simple for school, but on the weekend I dress more casually — maybe a hoodie and sweatpants when I\'m just hanging out at home. It\'s all about comfort and the occasion.',
      '3) Not really — I don\'t really care about brands. I go for clothes that look good and fit well, regardless of the brand. But I do have a few favorites that I always come back to. If something\'s on sale, I\'ll fork out for it!',
      '4) I\'m not a fan of overly bright colors — like neon yellow or bright orange. They just don\'t suit me. I prefer neutral colors like black, white, and gray. They match with everything and don\'t stand out too much.',
    ].join('\n\n'),
    exampleAnswerZh: [
      '1) 我更喜欢舒适休闲的衣服——比如牛仔裤、T 恤和连帽衫。除非特殊场合，不然我不会穿正装。我更在意穿得舒服，而不是追赶最新时尚。',
      '2) 是的，显然是。穿简单的衣服。但在周末我穿得更休闲——在家闲逛时可能穿连帽衫和运动裤。一切都是为了舒服和看场合。',
      '3) 不太在乎——我不在意品牌。我选衣服看样子和穿起来好不好，不管品牌。但我有几个一直回购的最爱。如果打折，我就掏钱买！',
      '4) 我不喜欢过于鲜艳的颜色——比如亮黄色或亮橙色。它们不适合我。我更喜欢中性颜色如黑、白、灰。它们什么都能搭配，不会太显眼。',
    ].join('\n\n'),
  },

  // ===== Part 1 · Shopping =====
  {
    id: 'pred-p1-shopping',
    examPeriod: '2026 Q4',
    part: 1,
    prompt: 'Shopping（购物）',
    subQuestions: [
      'Do you often go shopping?',
      'Do you prefer online or offline shopping?',
      'Do you compare prices before making a purchase?',
      'Have you ever returned a product you bought?',
    ],
    tags: ['Part 1', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'easy',
    source: SOURCE,
    fullPrompt: 'Shopping（购物）',
    exampleAnswer: [
      '1) Actually, I don\'t go shopping that often — maybe once or twice a month. My parents usually get what I need online or we go to the supermarket together on weekends. I\'m not really into browsing malls for hours.',
      '2) I prefer online shopping to be honest. It\'s so convenient — you can browse tons of options in minutes and get things delivered to your door. Plus, it\'s often cheaper with discounts. But offline is good for trying things on, like clothes or shoes.',
      '3) Yeah, I usually check a few different stores or websites before buying something expensive, like my headphones or phone. I want to make sure I\'m getting a good deal. For small stuff, I don\'t really bother.',
      '4) Yes, once or twice! I once bought a jacket online that looked totally different from the pictures. The return policy was pretty easy, so I sent it back and got a refund. Have to be careful with online shopping!',
    ].join('\n\n'),
    exampleAnswerZh: [
      '1) 实际上，我不常逛街——可能一个月一两次。我父母通常在网上买我需要的东西，或者周末一起去超市。我不喜欢逛商场逛几个小时。',
      '2) 说实话，我更喜欢网购。非常方便——几分钟就能浏览很多选择，还能送到门口。而且经常有折扣更便宜。但线下适合试试东西，比如衣服或鞋子。',
      '3) 是的，买贵的东西之前我会比较几家不同的店或网站，比如耳机或手机。我想确保买到划算的。小东西我就不麻烦了。',
      '4) 有，一两次！我有一次网上买的夹克和图片完全不一样。退货政策挺容易的，所以退回去了，拿到了退款。线上购物得小心！',
    ].join('\n\n'),
  },

  // ===== Part 2+3 · 无聊的地方 =====
  {
    id: 'pred-p2-boring-place',
    examPeriod: '2026 Q4',
    part: 2,
    prompt: 'Describe a boring place you have been to.',
    subQuestions: [
      'Where it is',
      'When you went there',
      'Who you went with',
      'And explain why you felt it was boring',
    ],
    tags: ['Part 2', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'medium',
    source: SOURCE,
    fullPrompt: 'Describe a boring place you have been to.\nYou should say:\n- Where it is\n- When you went there\n- Who you went with\n- And explain why you felt it was boring',
    exampleAnswer:
      "A boring place I have been to is a small town called Dalian in Liaoning Province. Actually, I've been there twice, but I have to say it was quite disappointing both times.\n\nI went there with my family during a summer vacation about three years ago. We planned the trip for months, expecting a relaxing beach holiday, but the reality was completely different.\n\nThe main reason I found it boring was that there was literally nothing to do. The beach was crowded and dirty, and the weather was so hot that we couldn't even walk outside during midday. The town itself was very quiet — almost dead, with few restaurants or entertainment options. We spent most of our time inside the hotel room, watching TV or scrolling on our phones.\n\nThe worst part was that everything closed early, around 8 or 9 PM. There was no nightlife at all, which made the evenings feel extremely long and dull. We had expected to experience the local culture and try fresh seafood, but most restaurants were either closed or offering overpriced, low-quality food.\n\nIn the end, we cut our trip short and returned home two days earlier than planned. This experience taught me that not every tourist destination is worth visiting, and sometimes popular places are just overhyped. I'd rather do thorough research next time before booking a trip.",
    exampleAnswerZh:
      '我去过的一个无聊的地方是辽宁的一个叫大连的小城镇。实际上我去过那儿两次，但两次都挺失望的。\n\n三年前的一个暑假，我和家人一起去那儿。我们计划了好几个月，期待一个轻松的海滩度假，但现实完全不一样。\n\n我觉得无聊主要是因为那儿几乎没什么可做的。海滩很拥挤，而且很脏，天气热得中午根本无法走出酒店。小城镇本身非常安静——几乎死气沉沉的，餐厅或娱乐选择很少。我们大部分时间都待在酒店房间里，看电视或刷手机。\n\n最糟糕的是一切都关得很早，大概晚上 8 或 9 点。夜生活完全没有，这让傍晚感觉极其漫长和无聊。我们原本期待体验当地文化和品尝新鲜海鲜，但大多数餐厅要么关门了，要么就是价格很高、质量很差的食物。\n\n最后，我们提前两天结束了旅行，提前回家了。这次经历让我明白不是每个旅游目的地都值得去，有时候热门地方只是被过度炒作了。下次预订旅行前我会先做好充分的研究。',
    part3Questions: [
      {
        question: 'On what occasions do people feel bored?',
        answer:
          'People usually feel bored when they have nothing interesting to do or when they\'re in a repetitive situation. For example, waiting in a long queue, sitting through a boring meeting, or being alone with nothing to do can all trigger boredom. Boredom often comes when our brain is looking for stimulation but can\'t find any engaging activity. Sometimes even when we have free time, if we can\'t decide what to do, we end up feeling bored. The key is that boredom is a signal — our mind is telling us we need something more interesting or challenging.',
        answerZh:
          '人们通常在没什么有趣的事情可做或处于重复性的情境中时会感到无聊。例如，在长队中等待、参加无聊的会议或独自一人无所事事都可能引发无聊。无聊通常来自我们的大脑在寻找刺激但找不到任何吸引人的活动的时候。有时候即使我们有自由时间，如果我们无法决定做什么，最终也会感到无聊。关键是无聊是一种信号——我们的思维告诉我们需要一些更有趣或更有挑战性的东西。',
      },
      {
        question: 'Why do students find their teachers\' lessons boring?',
        answer:
          'Students often find teachers\' lessons boring when the teaching style doesn\'t match their learning preferences. If the teacher just reads from textbooks or speaks in a monotone voice for the entire class, students will naturally lose interest. Also, if the topic feels irrelevant to real life, students can\'t see the point of learning it. Some subjects are naturally more interesting than others, but a good teacher can make any topic engaging. I think the main problem is the lack of interaction and real-world examples.',
        answerZh:
          '学生通常在教学风格不符合他们的学习偏好时会觉得老师的课无聊。如果老师整节课只是照本宣科或用单调的声音说话，学生自然会失去兴趣。而且，如果主题与现实生活无关，学生看不到学习的意义。有些科目天生比其他科目更有趣，但好的老师可以让任何主题都引人入胜。我认为主要问题是缺乏互动和真实世界的例子。',
      },
      {
        question: 'How to avoid feeling bored?',
        answer:
          'There are several ways to avoid feeling bored. First, try to find something interesting in whatever you\'re doing — even small details can make a difference. Second, change your environment or routine; sometimes a small change can bring new excitement. Third, challenge yourself with a new task or goal — having something to work towards keeps your mind engaged. Lastly, connect with people; social interaction is one of the most effective ways to beat boredom.',
        answerZh:
          '有几种方法可以避免感到无聊。首先，试着在你正在做的事情中找到有趣的东西——即使是小细节也能有所不同。其次，改变你的环境或日常；有时候小的改变能带来新的刺激。第三，用新任务或目标挑战自己——有事情可做能让你的大脑保持活跃。最后，与人交流；社交互动是消除无聊的最有效方式之一。',
      },
      {
        question: "Why do some people find playing on their phones boring?",
        answer:
          'Some people find playing on their phones boring because they\'re just mindlessly scrolling without any real purpose. They might be looking at the same content over and over, watching videos that don\'t interest them, or just swiping without enjoyment. Eventually, the screen becomes repetitive and loses its appeal. Also, too much screen time can cause eye strain and fatigue, which leads to boredom. The problem isn\'t the phone itself — it\'s how people use it. When used actively for communication or learning, phones aren\'t boring at all.',
        answerZh:
          '有些人觉得玩手机无聊，因为他们只是毫无目的地盲目刷手机。他们可能一遍又一遍地看同样的内容，看并不感兴趣的视频，或者只是無趣地滑動。最终，屏幕变得重复，失去吸引力。而且，过多的屏幕时间会导致眼睛疲劳，这会导致无聊。问题不在于手机本身——而在于人们怎么使用它。当用于主动交流或学习时，手机一点也不无聊。',
      },
    ],
  },

  // ===== Part 2+3 · 高建筑 =====
  {
    id: 'pred-p2-skyscraper',
    examPeriod: '2026 Q4',
    part: 2,
    prompt: 'A high-rise building you like or dislike',
    subQuestions: [
      'Where it is',
      'What it looks like',
      'What it is used for',
      'And explain why you like or dislike it',
    ],
    tags: ['Part 2', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'medium',
    source: SOURCE,
    fullPrompt: 'A high-rise building you like or dislike\nYou should say:\n- Where it is\n- What it looks like\n- What it is used for\n- And explain why you like or dislike it',
    exampleAnswer:
      "The high-rise building I want to talk about is the Ping An Finance Center in Shenzhen, also known as Ping An Financial Tower. It's one of the tallest buildings in China, standing at about 599 meters with over 115 floors.\n\nI first learned about this building from news and social media. It's often featured as one of the most iconic skyscrapers in Shenzhen, and many tourists visit it just to take photos. The building is located in the Futian District, right in the heart of Shenzhen's business area.\n\nIn terms of appearance, the tower has a sleek, modern design with a distinctive glass facade that reflects the sky. Its shape narrows towards the top, giving it a graceful, pencil-like silhouette. At night, the LED lights on the building create stunning visual displays that can be seen from miles away.\n\nThe building is primarily used for commercial and office purposes. It houses the headquarters of Ping An Insurance, one of the largest financial companies in China. There's also observation decks on the upper floors where visitors can enjoy panoramic views of Shenzhen and Hong Kong.\n\nI have mixed feelings about this building. On one hand, I admire its impressive architecture and engineering — it's a remarkable achievement that represents Shenzhen's rapid development. Standing at the observation deck and looking down at the city below is truly breathtaking. On the other hand, I sometimes wonder if focusing so much on building taller and taller skyscrapers is really necessary. These massive structures consume enormous amounts of energy and resources.\n\nOverall, while I don't dislike the building itself, I do have some reservations about the trend of constantly building higher. Still, it's undeniable that the Ping An Finance Center is an impressive landmark and a symbol of modern China.",
    exampleAnswerZh:
      '我想说的高楼是深圳平安金融中心，又称平安金融塔。它是中国最高的建筑之一，高约 599 米，有 115 层以上。\n\n我第一次是从新闻和社交媒体上了解到这座建筑的。它经常作为深圳最具标志性的摩天大楼被报道，很多游客专门来拍照。大楼位于福田区，正好在深圳商业区的核心位置。\n\n从外观来看，这座塔线条简洁、现代，有独特的玻璃幕墙，可以反射天空。它的形状向顶部逐渐收窄，呈现出优雅的铅笔状轮廓。晚上，建筑上的 LED 灯创造出令人惊叹的视觉效果，在几公里外都能看到。\n\n这座建筑主要用于商业和办公用途。它是平安保险的总部，中国最大的金融机构之一。顶层还有观光平台，游客可以在那儿欣赏深圳和香港的全景。\n\n我对这座建筑感情很复杂。一方面，我钦佩它令人印象深刻的建筑和工程——这是一个了不起的成就，代表了深圳的快速发展。站在观光台上俯瞰下面的城市真的很惊人。另一方面，我有时在想，专注于建造越来越高的摩天大楼是否真的有必要。这些巨大的建筑消耗大量的能源和资源。\n\n总的来说，虽然我不讨厌这座建筑本身，但我确实对不断建更高的趋势有一些保留意见。不可否认的是，平安金融中心是一个令人印象深刻的里程碑，也是现代中国的象征。',
    part3Questions: [
      {
        question: 'Have you ever lived in a high-rise building?',
        answer:
          "Yes, I've lived in a high-rise building for most of my life. My family moved into an apartment building when I was about ten years old, and we've been living in high-rises ever since. The building has 30 floors, and we live on the 15th floor. It feels quite normal to me now, but I do miss having a garden or outdoor space sometimes.",
        answerZh:
          '是的，我一生中大部分时间都住在高楼里。我大约十岁时全家搬进了一栋公寓楼，从此就住在高楼里。大楼有 30 层，我们住在 15 楼。现在我觉得很习惯了，但有时候确实想念有花园或户外空间。',
      },
      {
        question: 'What impact do you think climate has on architectural design?',
        answer:
          'Climate has a significant impact on architectural design. In hot and humid regions like southern China, buildings need good ventilation and shading to stay cool. In cold northern areas, insulation and heating systems become crucial. Architects also consider rainfall, wind patterns, and even earthquake resistance when designing buildings. Each region\'s climate shapes how buildings look and function.',
        answerZh:
          '气候对建筑设计有重大影响。在炎热潮湿的华南地区，建筑需要良好的通风和遮阳来保持凉爽。在寒冷的北方地区，保温和供暖系统变得至关重要。建筑师在设计建筑时还会考虑降雨、风向甚至抗震。每个地区的气候都塑造了建筑的外观和功能。',
      },
      {
        question: 'Why do you think many Chinese people now live in high-rise buildings?',
        answer:
          'There are several reasons why many Chinese people now live in high-rise buildings. First, urbanization has led to severe land shortage in cities, so building vertically is the most practical solution. Second, high-rises are more affordable for the average family compared to standalone houses. Third, they offer convenience — elevators, security, and managed facilities. Lastly, government policies have also encouraged high-density development to accommodate the growing urban population.',
        answerZh:
          '中国人现在住在高楼里有几个原因。首先，城市化导致城市土地严重短缺，所以垂直建造是最实际的解决方案。其次，与独立住宅相比，高层对普通家庭来说更负担得起。第三，它们提供便利——电梯、安保和管理的设施。最后，政府政策也鼓励高密度开发以容纳不断增长的城市人口。',
      },
      {
        question: 'In the future, will Chinese people prefer high-rise buildings or houses?',
        answer:
          "I think in the future, Chinese people will continue to prefer high-rise buildings, especially in major cities where land is limited. However, there might be a trend towards better-designed high-rises with more green spaces and better facilities. In smaller cities or rural areas, people might still prefer houses or low-rise apartments. The key is balance — we need both high-density living and quality of life.",
        answerZh:
          '我认为将来中国人会继续更喜欢高楼，特别是在土地有限的大城市。然而，可能会有一种趋势，设计更好的高楼，有更多的绿色空间和更好的设施。在小城市或农村地区，人们可能仍然更喜欢房子或低层住宅。关键是平衡——我们需要高密度的生活，也需要生活质量。',
      },
    ],
  },

  // ===== Part 2+3 · 本地新闻 =====
  {
    id: 'pred-p2-local-news',
    examPeriod: '2026 Q4',
    part: 2,
    prompt: "Local news you've heard or seen",
    subQuestions: [
      'What it was',
      'When you heard/saw it',
      'Where you heard/saw it',
      'Explain how you felt about it',
    ],
    tags: ['Part 2', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'medium',
    source: SOURCE,
    fullPrompt: "Local news you've heard or seen\nYou should say:\n- What it was\n- When you heard/saw it\n- Where you heard/saw it\n- Explain how you felt about it",
    exampleAnswer:
      "The local news I want to talk about is about a new subway line opening in my city. I first heard about this news from a Wechat article shared by my friend about six months ago. The article said that the new Line 7 would start operating by the end of this year, connecting several residential areas directly to the city center.\n\nI learned more details from local TV news a few weeks later. According to the report, the new line is about 30 kilometers long with 20 stations, passing through some of the most crowded areas in my city. This will significantly reduce commute time for thousands of residents.\n\nI felt very excited when I heard this news, and here's why. Currently, I have to take two different bus lines to get to my school, which takes about an hour and a half. With the new subway line, my commute would be cut down to less than 40 minutes. Not only would it save time, but it would also be more comfortable — no more standing in crowded buses during rush hour.\n\nThe news also mentioned that this new line would benefit the elderly and people with disabilities, as all stations are equipped with elevators and other accessibility features. This shows that the government is paying attention to everyone's needs, not just commuters.\n\nOverall, this local news made me feel optimistic about my city's development. It's great to see improvements in public transportation that make life easier for ordinary people. I hope to see more such projects in the future.",
    exampleAnswerZh:
      '我想说的本地新闻是关于我所在城市新地铁线路开通的新闻。我大约六个月前第一次从朋友分享的微信文章中得知这个消息。文章说新的 7 号线将在今年年底开始运营，将几个住宅区与市中心直接连接起来。\n\n几周后，我从当地电视新闻中了解到更多细节。根据报道，新线路约 30 公里长，有 20 个站点，经过我所在城市一些最拥挤的区域。这将大大缩短成千上万居民的通勤时间。\n\n当我听到这个消息时我很兴奋，原因如下。目前，我上学需要换乘两路不同的公交车，大约需要一个半小时。有了新地铁线路，我的通勤时间将缩短到 40 分钟以内。不仅节省时间，而且更舒适——不再需要在高峰时间站在拥挤的公交车上。\n\n新闻还提到这条新线路将惠及老年人和残疾人，因为所有站点都配备了电梯和其他无障碍设施。这表明政府关注每个人的需求，而不仅仅是通勤者。\n\n总的来说，这个本地新闻让我对我城市的发展感到乐观。看到公共交通的改善让普通人的生活更便利，真是太好了。我希望将来能看到更多这样的项目。',
    part3Questions: [
      {
        question: 'Do many people talk about local news?',
        answer:
          "I think it really depends on the person and their interests. Some people, especially older generations, follow local news very closely because they want to know what's happening in their community — things like new shops opening, road closures, or local politics. However, younger people tend to focus more on national or international news, or trending topics on social media. They might think local news is less exciting or relevant to their lives.",
        answerZh:
          '我认为这真的取决于个人和他们的兴趣。有些人，特别是老一代，非常关注本地新闻，因为他们想知道社区里发生了什么——比如新店开业、道路封闭或当地政治。然而，年轻人往往更关注全国或国际新闻，或社交媒体上的热门话题。他们可能觉得本地新闻不那么刺激或与他们的生活相关。',
      },
      {
        question: 'Do young people or old people care more about local news?',
        answer:
          "I'd say older people generally care more about local news. They usually have deeper roots in the community and care about neighborhood changes. They read local newspapers and watch local TV. Younger people, on the other hand, get most of their information from social media and tend to focus on entertainment, celebrities, or national issues. They might find local news boring since it doesn't directly affect their daily lives.",
        answerZh:
          '我觉得老年人通常更关心本地新闻。他们通常在社区里扎根更深，关心邻里的变化。他们读当地报纸，看当地电视。另一方面，年轻人从社交媒体获取大部分信息，倾向于关注娱乐、名人或国家问题。他们可能觉得本地新闻无聊，因为它不会直接影响他们的日常生活。',
      },
      {
        question: 'Do people pay more attention to local news or national news?',
        answer:
          'I think most people pay more attention to national or international news these days, especially big events or trending topics. National news often affects policies, economy, and everyone\'s future. However, local news is still important for certain groups — people who care about their community, business owners, or the elderly. The key difference is that national news is more widely shared and discussed on social media, while local news tends to stay within specific communities.',
        answerZh:
          '我认为现在大多数人更关注全国或国际新闻，特别是重大事件或热门话题。全国新闻通常影响政策、经济和每个人的未来。然而，本地对某些群体仍然很重要——关心社区的人、企业主或老年人。主要区别在于全国新闻在社交媒体上被更广泛地分享和讨论，而本地新闻往往停留在特定社区内。',
      },
    ],
  },

  // ===== Part 2+3 · 从事医疗行业的人 =====
  {
    id: 'pred-p2-medical',
    examPeriod: '2026 Q4',
    part: 2,
    prompt: 'Describe a person you know who works in the medical field (e.g. doctor, nurse, vet)',
    subQuestions: [
      'Who this person is',
      'How you know him/her',
      'What he/she does in their job',
      'And explain how you feel about him/her',
    ],
    tags: ['Part 2', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'medium',
    source: SOURCE,
    fullPrompt:
      'Describe a person you know who works in the medical field (e.g. doctor, nurse, vet)\nYou should say:\n- Who this person is\n- How you know him/her\n- What he/she does in their job\n- And explain how you feel about him/her',
    exampleAnswer:
      "The person I want to talk about is my aunt, Dr. Li, who works as a pediatrician at a local hospital. She's been working in the medical field for over 20 years and is definitely one of the most dedicated people I know.\n\nShe's my mother's younger sister, so I've known her since I was born. Growing up, she was always the one taking care of me when I was sick. I remember as a child, I was always a bit scared of going to the hospital, but my aunt would make me feel comfortable and explain things in a gentle way.\n\nAs a pediatrician, her main job is to diagnose and treat illnesses in children, from common colds to more serious conditions. She works long hours, often staying late at the hospital to check on her patients. She also needs to communicate with worried parents and explain their children's conditions in a way they can understand. Additionally, she attends regular training sessions to stay updated with the latest medical knowledge.\n\nI have tremendous respect for her. Working in healthcare is incredibly demanding — both physically and emotionally. She deals with sick children every day, which must be emotionally draining, yet she always remains patient and compassionate. The fact that she chose a profession focused on helping others, especially children, shows her kind nature. What inspires me most is her dedication — despite the long hours and challenges, she never complains and genuinely loves her job. She's definitely a role model for me.",
    exampleAnswerZh:
      '我想说的是我的阿姨，李医生，她在一家当地医院当儿科医生。她在医疗领域工作了 20 多年，绝对是我认识的最敬业的人之一。\n\n她是我妈妈的妹妹，所以我从出生就认识她。我成长的过程中，当生病时总是她照顾我。我记得小时候，我总是有点害怕去医院，但我的阿姨会让我感到舒服，用温和的方式解释事情。\n\n作为儿科医生，她的主要工作是诊断和治疗儿童的疾病，从普通感冒到更严重的病情。她工作时间很长，经常在医院待到很晚检查病人。她还需要与担忧的家长交流，用他们能理解的方式解释孩子的病情。此外，她还要参加定期的培训课程以保持最新的医学知识。\n\n我对她非常敬佩。在医疗工作非常辛苦——身心俱疲。她每天面对生病的孩子，这一定让人情绪疲惫，但她总是保持耐心和富有同情心。她选择了一个专注于帮助他人的职业，尤其是孩子，这显示了她的善良本性。最激励我的是她的敬业精神——尽管工作时间很长且充满挑战，她从不抱怨，真正热爱她的工作。她绝对是我的榜样。',
    part3Questions: [
      {
        question: 'Why do some people want to be doctors?',
        answer:
          'I think people want to become doctors for various reasons. First, the profession is respected and considered noble — doctors help people and save lives, which is meaningful. Second, it offers job security and a stable income. Third, some people have personal experiences, like being inspired by a doctor who helped them or a family member. Lastly, some choose it because their parents push them in that direction, though that\'s less ideal.',
        answerZh:
          '我认为人们想成为医生的原因有很多。首先，这个职业受尊重且被认为是高尚的——医生帮助人们，拯救生命，这很有意义。其次，它提供工作保障和稳定的收入。第三，有些人有个人经历，比如被帮助过他们的医生或家庭成员启发。最后，有些人选择它是因为父母引导他们朝这个方向，尽管这不那么理想。',
      },
      {
        question: 'Do you think it is difficult to become a doctor?',
        answer:
          'Yes, I think it is quite difficult to become a doctor. The path is very long and demanding. First, you need excellent grades to get into medical school. Then, you study for many years — typically 5 to 8 years of university education. After that, you need to complete residency training, which involves long hours and intense work. Additionally, you must pass many exams and stay updated with medical knowledge throughout your career. It requires not just intelligence, but also dedication, patience, and strong communication skills.',
        answerZh:
          '是的，我觉得成为医生相当困难。道路很漫长且要求很高。首先，你需要优秀的成绩才能进入医学院。然后，你要学习很多年——通常是 5 到 8 年的大学教育。之后，你需要完成住院医师实习，这涉及长时间和高强度的工作。此外，你必须通过许多考试，并在整个职业生涯中保持最新的医学知识。这不仅需要智慧，还需要耐心、毅力和强大的沟通能力。',
      },
      {
        question: 'Do you think studying biology at school makes students healthier?',
        answer:
          'I think studying biology at school can help students make healthier choices, but it doesn\'t directly make them healthier. Biology teaches them about the human body, nutrition, and how diseases work. With this knowledge, they can better understand their health and make informed decisions. However, actually being healthy requires action — eating well, exercising, and good habits. Knowledge alone isn\'t enough. But biology education does provide a foundation for understanding health, which is a positive step.',
        answerZh:
          '我认为在学校学习生物可以帮助学生做出更健康的选择，但这并不会直接让他们更健康。生物教会他们关于人体、营养和疾病如何运作的知识。有了这些知识，他们可以更好地了解自己的健康并做出明智的决定。然而，真正的健康需要行动——吃得健康、锻炼和好习惯。光有知识是不够的。但生物教育确实为了解健康奠定了基础，这是积极的一步。',
      },
    ],
  },

  // ===== Part 2+3 · 喜欢的商业人物 =====
  {
    id: 'pred-p2-business',
    examPeriod: '2026 Q4',
    part: 2,
    prompt: 'Describe a business person you admire',
    subQuestions: [
      'Who this person is',
      'How you know him/her',
      'What business he/she does',
      'And explain why you admire him/her',
    ],
    tags: ['Part 2', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'medium',
    source: SOURCE,
    fullPrompt: 'Describe a business person you admire\nYou should say:\n- Who this person is\n- How you know him/her\n- What business he/she does\n- And explain why you admire him/her',
    exampleAnswer:
      "The business person I admire is Jack Ma, the founder of Alibaba. I know about him mainly from news articles, interviews, and his speeches online. He's become one of the most influential entrepreneurs in China and even globally.\n\nI first became aware of him around 2014 when Alibaba went public, making headlines worldwide. Since then, I've followed his career and found his story truly inspiring. He started Alibaba from his apartment in the 1990s when e-commerce was almost unheard of in China. Through hard work and vision, he built it into one of the largest companies in the world, revolutionizing how people shop and do business.\n\nHe's involved in various businesses — primarily e-commerce through Taobao and Tmall, but also cloud computing through Alibaba Cloud, digital payments through Alipay, and logistics through Cainiao. His company has created millions of jobs and transformed China's digital economy.\n\nI admire him for several reasons. First, his persistence — he failed many times before succeeding, but never gave up. Second, his vision — he saw the potential of the internet before most people did. Third, he's generous — he's donated billions to charity and education through his foundation. Fourth, despite his success, he's humble and often jokes about himself. What impresses me most is that he uses his wealth and influence to give back to society. He's not just a successful businessman, but someone who genuinely cares about making the world better.",
    exampleAnswerZh:
      '我敬佩的商业人士是马云，阿里巴巴的创始人。我主要从新闻文章、采访和网络上的演讲了解到他。他已经成为中国乃至全球最具影响力的企业家之一。\n\n我大约在 2014 年阿里巴巴上市时首次了解到他，当时成为全球新闻头条。从那时起，我关注他的事业，发现他的故事真的很激励人。他在 1990 年代从他的公寓创立了阿里巴巴，当时电子商务在中国几乎闻所未闻。通过努力和远见，他把它打造成了世界上最大的公司之一，彻底改变了人们的购物和经商方式。\n\n他涉及多种业务——主要是淘宝和天猫的电子商务，还有阿里云的云计算、支付宝的数字支付和菜鸟的物流。他的公司创造了数百万个工作岗位，改变了中国数字经济。\n\n敬佩他有几个原因。首先，他的坚持——在成功之前他失败了很多次，但从未放弃。其次他的远见——他在大多数人之前看到了互联网的潜力。第三，他慷慨——通过他的基金会向慈善和教育捐赠了数十亿。第四，尽管成功了，他很谦虚，经常自嘲。最让我印象深刻的是他用他的财富和影响力回馈社会。他不仅仅是一个成功的商人，而是一个真正关心让世界变得更好的人。',
  },

  // ===== Part 2 · 特别场景下吃的食物 =====
  {
    id: 'pred-p2-special-food',
    examPeriod: '2026 Q4',
    part: 2,
    prompt: 'Describe a special meal/food you eat on a particular occasion',
    subQuestions: [
      'What it is',
      'How it is made',
      'When and where you eat it',
      'And explain why you eat it',
    ],
    tags: ['Part 2', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'medium',
    source: SOURCE,
    fullPrompt: 'Describe a special meal/food you eat on a particular occasion\nYou should say:\n- What it is\n- How it is made\n- When and where you eat it\n- And explain why you eat it',
    exampleAnswer:
      "The special meal I want to talk about is dumplings, or \"jiaozi,\" which we eat during the Spring Festival, especially on Chinese New Year's Eve. This is a traditional food that has deep cultural significance in Chinese families.\n\nMy grandmother usually makes the dumplings. She starts by preparing the filling — typically a mixture of ground pork and cabbage, sometimes with mushrooms or other vegetables. She adds various seasonings like soy sauce, ginger, and garlic to make it flavorful. Then, we all sit together and wrap the dumplings by hand. The dough is made from flour and water, rolled into small circles, and then filled and folded into different shapes. Finally, they're boiled in hot water until they float to the surface.\n\nWe eat dumplings on New Year's Eve around midnight, gathering as a whole family. We usually have them at my grandparents' home, where everyone comes together for the reunion dinner. The atmosphere is warm and festive, with talking, laughing, and the sound of boiling pots.\n\nWe eat dumplings for several reasons. First, they symbolize wealth and good luck — their shape resembles ancient gold ingots. Second, eating them together represents family unity and happiness. Third, it's a tradition passed down through generations. For me, the most important part is the family bonding moment — we don't just eat, we cook together and share stories. The taste is delicious, but the memory and meaning behind it are what make it truly special.",
    exampleAnswerZh:
      '我想说的特别食物是饺子，我们在春节特别是在除夕夜吃。这是一种在中国家庭中具有深刻文化意义的传统食物。\n\n我奶奶通常会包饺子。她从准备馅料开始——通常是猪肉和白菜的混合物，有时加蘑菇或其他蔬菜。她加入各种调味品如酱油、姜和蒜来调味。然后，我们大家一起坐下来手工包饺子。面团是用面粉和水制成的，擀成小圆形，然后包馅并折成不同的形状。最后，它们在沸水中煮到浮起来。\n\n我们在除夕午夜左右吃饺子，全家团聚。我们通常在爷爷奶奶家吃，每个人都回来吃团圆饭。气氛温暖而喜庆，有说笑和煮锅的声音。\n\n我们吃饺子有几个原因。首先，它们象征财富和好运——形状像古代的金元宝。其次，一起吃代表家庭团结和幸福。第三，这是代代相传的传统。对我来说，最重要的是家庭凝聚时刻——我们不只是一起吃，还一起做饭和分享故事。味道很好，但背后的记忆和意义才是真正让它变得特别的原因。',
  },

  // ===== Part 2 · 看体育比赛的经历 =====
  {
    id: 'pred-p2-sports-event',
    examPeriod: '2026 Q4',
    part: 2,
    prompt: 'Describe an experience of watching a sports event',
    subQuestions: [
      'What the event was',
      'When and where you watched it',
      'Who you watched it with',
      'And explain how you felt about this experience',
    ],
    tags: ['Part 2', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'medium',
    source: SOURCE,
    fullPrompt: 'Describe an experience of watching a sports event\nYou should say:\n- What the event was\n- When and where you watched it\n- Who you watched it with\n- And explain how you felt about this experience',
    exampleAnswer:
      "The sports event I want to talk about is watching a live football match between Shandong Taishan and Shanghai Shenhua in the Chinese Super League. I watched it about two years ago at Jinan Olympic Sports Center Stadium with my father.\n\nIt was during the 2024 season, on a cool autumn evening. My father got tickets from his friend, so we decided to go together. This was my first time watching a professional football match live, so I was quite excited.\n\nThe atmosphere was amazing — thousands of fans cheering, waving flags, and singing team songs. The stadium was packed with both Taishan and Shenhua supporters, creating a lively and competitive vibe. When Taishan scored, the entire section erupted in cheers. I could feel the ground shaking from all the footsteps and yells.\n\nWatching it live was completely different from watching on TV. The speed, the energy, the crowd's passion — it was overwhelming. I could see every detail up close, from the players' facial expressions to their precise movements. Although Taishan lost that match 2-1, the experience itself was unforgettable. It made me appreciate the game more and understand why football is so popular in China. Since then, I've become a bigger fan of live sports and hope to watch more matches in the future.",
    exampleAnswerZh:
      '我想说的体育赛事是观看中国超级联赛中山东泰山和上海申花的现场比赛。我大约两年前在济南奥林匹克体育中心体育场和爸爸一起看的。\n\n那是 2024 赛季的一个凉爽的秋夜。爸爸从他朋友那儿拿到票，所以我们决定一起去。这是我第一次现场观看职业足球比赛，所以我非常兴奋。\n\n气氛棒极了——成千上万的球迷欢呼、挥舞旗帜、唱队歌。体育场坐满了泰山和申花的球迷，创造了一种充满活力和竞争的气氛。当泰山进球时，整个区都爆发了欢呼。我能感觉到地面因为所有的脚步声和喊叫声而震动。\n\n现场观看与在电视上看完全不同。速度、能量、人群的热情——令人难以抗拒。我能近距离看到每一个细节，从球员的表情到他们精准的动作。虽然泰山那场比赛输了 2-1，但这个经历本身令人难忘。它让我更欣赏这项运动，也理解了为什么足球在中国如此受欢迎。从那时起，我成了更大的现场体育迷，希望将来能观看更多比赛。',
  },

  // ===== Part 2 · 改变决定的时刻 =====
  {
    id: 'pred-p2-change-decision',
    examPeriod: '2026 Q4',
    part: 2,
    prompt: 'Describe a time when you changed a decision',
    subQuestions: [
      'What decision you made',
      'Why you changed the decision',
      'Is it a good result',
      'And explain how you felt about it',
    ],
    tags: ['Part 2', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'medium',
    source: SOURCE,
    fullPrompt: 'Describe a time when you changed a decision\nYou should say:\n- What decision you made\n- Why you changed the decision\n- Is it a good result\n- And explain how you felt about it',
    exampleAnswer:
      "The decision I want to talk about is changing my major choice during university application. Initially, I had planned to apply for a business-related major, but eventually changed to English literature, which was quite a big switch for me.\n\nOriginally, I decided to study business administration because many people said it offers better job prospects and higher salaries. My parents also preferred it, thinking it would lead to a stable career. I filled in my application forms with business as my first choice without much personal thought.\n\nHowever, a few weeks before the deadline, I changed my mind. I realized that while business might lead to good money, I wouldn't be happy spending years studying something I'm not passionate about. I love reading, writing, and analyzing literature. I started questioning whether I'd truly enjoy business classes. After much reflection, I decided to follow my heart and changed my application to English literature.\n\nWas it a good result? Looking back, I believe it was the right choice. I'm now studying something I genuinely enjoy, which keeps me motivated. Although job prospects might be less certain, I'm happier and more engaged in my studies. Learning about different cultures and literary works has broadened my horizons significantly.\n\nI felt relieved and more confident after changing the decision. It was scary to go against expectations, but I learned an important lesson: sometimes, you have to make decisions based on your own interests and passions, not just what others think is best. Following your heart might be riskier, but it's more likely to lead to a fulfilling life.",
    exampleAnswerZh:
      '我想说的决定是改变我大学申请的专业。最初，我计划申请商业相关的专业，但最终改成了英语文学，这对我来说是一个很大的转变。\n\n最初，我决定学商业管理，因为很多人说它有更好的工作前景和更高的工资。我父母也更喜欢它，认为它会带来稳定的职业。我在申请表上把商业作为第一选择，没有太多的个人思考。\n\n然而，在截止日期前几周，我改变了主意。我意识到虽然商业可能带来不错的钱，但我不会快乐地花费多年学习我不喜欢的东西。我喜欢阅读、写作和分析文学。我开始质疑我是否会真正喜欢商业课程。经过深思熟虑后，我决定跟随我的心，把申请改成了英语文学。\n\n这是一个好的结果吗？回想起来，我相信是正确的选择。我现在学的是我真正喜欢的东西，这让我保持动力。虽然工作前景可能不那么确定，但我更快乐，在学习中更投入。学习不同的文化和文学作品大大开阔了我的视野。\n\n改变决定后我感到如释重负，更有信心。违背期望很可怕，但我学到了重要的一课：有时候，你必须根据自己的兴趣和热情做决定，而不只是别人认为最好的。跟随你的心可能更有风险，但它更有可能带来充实的生活。',
  },

  // ===== Part 2 · 一直以来的追求 =====
  {
    id: 'pred-p2-ambition',
    examPeriod: '2026 Q4',
    part: 2,
    prompt: 'Describe an ambition you have had for a long time.',
    subQuestions: [
      'What it was',
      'How you got the desire to want to achieve it',
      'What you have to do to achieve it',
      'And explain how you feel about it',
    ],
    tags: ['Part 2', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'medium',
    source: SOURCE,
    fullPrompt: 'Describe an ambition you have had for a long time.\nYou should say:\n- What it was\n- How you got the desire to want to achieve it\n- What you have to do to achieve it\n- And explain how you feel about it',
    exampleAnswer:
      "One ambition I've had for a long time is to become fluent in English. It's been maybe 5 or 6 years since I first started learning English in middle school, and I've always wanted to speak it as naturally as a native speaker.\n\nI got this desire because I realized English is becoming more and more important — for my future career, for traveling, and for accessing information online. Many of my favorite movies, books, and video games are in English, and I hate depending on subtitles.\n\nTo achieve this, I know I need to practice more speaking and listening. I'm planning to study abroad for a year after university, which I think will really accelerate my progress. I also try to watch English videos without subtitles and practice with any foreigners I meet.\n\nI feel pretty motivated about this ambition. It's a long-term goal, so I won't give up easily. I know it takes time and effort, but I'm willing to put in the work. Eventually, I want to be able to think in English and express myself without translating in my head first.",
    exampleAnswerZh:
      '一个我一直以来的追求是能够流利地使用英语。大概从上初中开始学英语到现在已经有 5、6 年了，我一直想让英语说得和母语一样自然。\n\n我产生这个欲望是因为我意识到英语越来越重要——为了未来的职业发展、旅行，以及获取网上的信息。我最喜欢的很多电影、书籍和电子游戏都是英文的，我不喜欢依赖字幕。\n\n要做到这一点，我知道需要多练习口语和听力。我计划大学毕业后去国外学习一年，我认为这样会大大提高我的进步。我还试着不看字幕看英文视频，遇到外国人的时候尽量练习。\n\n对这个追求我感到很有动力。这是一个长期目标，所以，我不会轻易放弃。我知道需要时间和努力，但我愿意付出。最终，我想能够用英语思考，不再在脑子里先翻译再表达。',
  },

  // ===== Part 2 · 电子产品故障 =====
  {
    id: 'pred-p2-tech-issue',
    examPeriod: '2026 Q4',
    part: 2,
    prompt: 'Describe a problem of technology you have encountered, like a computer or a cell phone.',
    subQuestions: [
      'What it was',
      'When and where you had this problem',
      'How the problem was solved',
      'And explain how you felt when you had this problem',
    ],
    tags: ['Part 2', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'medium',
    source: SOURCE,
    fullPrompt: 'Describe a problem of technology you have encountered, like a computer or a cell phone.\nYou should say:\n- What it was\n- When and where you had this problem\n- How the problem was solved\n- And explain how you felt when you had this problem',
    exampleAnswer:
      "I want to talk about a pretty frustrating phone problem I had last year. My phone just died suddenly in the middle of an important call with my mom, and it wouldn't turn back on at all.\n\nThis happened maybe 6 months ago. I was on my way to meet my friends, and I was having this really important conversation with my mom about something urgent. Suddenly, the screen went black and the phone just stopped working. I tried pressing the power button over and over, but nothing happened. I was in the middle of nowhere and had no way to contact anyone.\n\nIt turned out the problem was my phone had completely run out of battery, even though I thought I'd charged it that morning. Apparently, a charger cable I'd recently bought was faulty and wasn't actually charging the phone properly. I had to borrow a stranger's phone to call my mom back, which was pretty embarrassing.\n\nI felt so frustrated and helpless at the moment. I was completely by myself in an unfamiliar area and had no way to get help. It made me realize how dependent we've become on our phones. Once the problem was fixed, I made sure to always carry a power bank and check my charger regularly. lesson learned.",
    exampleAnswerZh:
      '我想说的是去年遇到的一个非常烦人的手机问题。我在和妈妈的一个重要电话中手机突然就没电关机了再也开不了机。\n\n这大概是 6 个月前的事。我正要去见朋友，和妈妈正在聊一件紧急的事。突然屏幕就黑了，手机完全开不了机。我一遍遍按电源键，但什么都没用。我身处前不着村后不着店的地方，没办法联系任何人。\n\n原来是手机完全没电了，虽然我那天早上以为充过电了。显然是我新买的充电器有问题，没有正常充电。我不得不借陌生人的手机给妈妈回电，真的很尴尬。\n\n那一刻我又 Frustrated 又无助。我独自在一个陌生的地方没办法得到帮助。这让我意识到我们对手机有多依赖。问题解决后，我确保常に带着充电宝并定期检查充电器。吃一堑长一智。',
  },

  // ===== Part 2 · 早起经历 =====
  {
    id: 'pred-p2-early-morning',
    examPeriod: '2026 Q4',
    part: 2,
    prompt: 'Describe a time when you had to get up very early.',
    subQuestions: [
      'Where you were',
      'What time you had to get up',
      'Why you had to get up so early',
      'And explain how you felt about getting up very early',
    ],
    tags: ['Part 2', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'medium',
    source: SOURCE,
    fullPrompt: 'Describe a time when you had to get up very early.\nYou should say:\n- Where you were\n- What time you had to get up\n- Why you had to get up so early\n- And explain how you felt about getting up very early',
    exampleAnswer:
      "I want to talk about a time when I had to get up super early — it was for a school trip to watch a football match. We were going to see Shandong Taishan play, and the match was at 7:30 in the morning, which is pretty unusual.\n\nI had to get up at around 4:30 in the morning. My alarm went off while it was still completely dark outside, and honestly, it was really tough. My mom had to practically drag me out of bed.\n\nThe reason we had to get up so early was because the stadium was quite far from where we lived, maybe 2 hours away by bus. We also had to gather at the school first and then take the bus together. Plus, we wanted to get good seats, so arriving early made sense.\n\nAt first, I felt absolutely terrible — I was so sleepy and grumpy. I kept wondering why I signed up for this. But once we got to the stadium and saw our team play, all that tiredness disappeared. The excitement of watching live football and cheering with other fans was totally worth it. Looking back, it was actually a memorable experience, and I'm glad I pushed through.",
    exampleAnswerZh:
      '我想说的是一次需要很早起床的经历——是为了去看学校组织的足球比赛。泰山队早上 7:30 比赛，真的很罕见。\n\n我大概 4:30 就起来了。闹钟响的时候外面还完全漆黑。说实话，真的非常困。我妈妈几乎是把我从床上拖起来的。\n\n我们需要这么早起床是因为球场离我们住的地方很远，坐公交要 2 个小时。我们还要先在学校集合，然后一起坐公交。而且，我们想占到好座位，所以早到是有意义的。\n\n刚开始，我觉得糟透了——我困得要命还很烦躁。我一直想为什么我要报名这个。但一旦到了球场，看到我们的球队比赛，所有的疲惫都消失了。看现场足球和球迷一起欢呼的兴奋完全值得。现在回想起来，这真的是一段难忘的经历，我很高兴我坚持了下来。',
  },

  // ===== Part 2 · 去过但不喜欢的别人的家 =====
  {
    id: 'pred-p2-grandma-house',
    examPeriod: '2026 Q4',
    part: 2,
    prompt: 'Describe a home that you like to visit but did not want to live in.',
    subQuestions: [
      'Where it is',
      'What it is like',
      'What you visited it for',
      'And explain why you would not like to live there',
    ],
    tags: ['Part 2', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'medium',
    source: SOURCE,
    fullPrompt: 'Describe a home that you like to visit but did not want to live in.\nYou should say:\n- Where it is\n- What it is like\n- What you visited it for\n- And explain why you would not like to live there',
    exampleAnswer:
      "I want to talk about my grandmother's house in the countryside. It's this cozy traditional house with a small garden in a village about 3 hours from my city. I visit there almost every summer during the break, and I really enjoy the time there.\n\nThe house itself is nothing fancy — it's got maybe 3 rooms, a kitchen, and a small courtyard with some flowers and vegetables. The walls are a bit old-fashioned, and there's no air conditioning, but it has this warm, traditional vibe. What I love most is the quiet atmosphere — you can hear birds singing in the morning and see stars at night.\n\nI usually visit during summer vacation to keep my grandmother company. We'd spend time together — I'd help her with the garden, she'd cook my favorite dishes, and we'd just talk for hours. It's really relaxing and peaceful compared to the busy city life.\n\nBut honestly, I wouldn't want to live there full-time. The main reason is the lack of convenience — the nearest hospital or shopping mall is quite far away. Also, there's no good internet connection, which would be tough for my studies and work. And honestly, it gets pretty boring after a few weeks without my friends or the city amenities. I think it's perfect for short visits, but not for permanent living.",
    exampleAnswerZh:
      '我想说的是我奶奶在农村的房子。那是一栋温馨的传统房子，带一个小花园，离我的城市大概 3 个小时车程。我几乎每年暑假都去那里住我很享受在那里的时光。\n\n房子本身很普通——大概 3 间屋子、一个厨房和一个小院子，种着花和蔬菜。墙有点老式，也没有空调，但有一种温暖的传统氛围。我最喜欢的是安静的氛围——早上能听到鸟叫，晚上能看到星星。\n\n我夏天去那里主要是陪奶奶。我们一起度过时光——我帮她料理花园，她做我最喜欢吃的菜，我们一聊就是几个小时。和繁忙的城市生活相比，这里真的很放松。\n\n但说实话，我不会长期住在那里。主要是因为不方便——最近的医院或商场都很远。还有，没有好的网络连接，这对我的学习和工作来说很难熬。还有，过了几周没有朋友和城市设施真的会无聊。我觉得短期拜访很完美，但长期住就不行了。',
  },

  // ===== Part 2 · 名人广告 =====
  {
    id: 'pred-p2-celebrity-ad',
    examPeriod: '2026 Q4',
    part: 2,
    prompt: 'Describe a piece of advertisement which is about a famous person.',
    subQuestions: [
      'What the advertisement is about',
      'When and where you saw it',
      'What the famous person does in the advertisement',
      'And explain how you felt about it',
    ],
    tags: ['Part 2', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'medium',
    source: SOURCE,
    fullPrompt: 'Describe a piece of advertisement which is about a famous person.\nYou should say:\n- What the advertisement is about\n- When and where you saw it\n- What the famous person does in the advertisement\n- And explain how you felt about it',
    exampleAnswer:
      "I want to talk about a sports advertisement I saw a while back — it featured Cristiano Ronaldo, the famous Portuguese footballer. It was for a sports drink brand, and I remember seeing it on a billboard near my school one afternoon.\n\nThe advertisement was pretty simple — Ronaldo was shown drinking the product, then doing some football skills, with the slogan \"Stay Hydrated, Stay Strong\" or something like that. It was quite dynamic and energetic, showing him in action. The product was positioned as something that helps athletes perform at their best.\n\nI saw it maybe last year on my way home from school. It was one of those big digital billboards near the main road, so it was hard to miss. The visual was really striking — bright colors and Ronaldo's athletic moves caught my attention immediately.\n\nHonestly, it didn't really influence my purchasing decisions — I'm not into sports drinks that much. But I have to admit, seeing a world-class athlete in the ad did make me stop and look for a moment. It definitely created a strong impression. I think these ads work because people look up to famous athletes and want to be like them, so using their image makes the product seem more appealing and trustworthy.",
    exampleAnswerZh:
      '我想说的是之前看到的一个运动广告——主角是葡萄牙著名足球运动员 C 罗。是一个运动饮料品牌，我记得有一天下午在学校附近的大广告牌上看到的。\n\n广告很简单——罗纳尔多喝着那个产品，然后展示一些足球技巧，标语是\"保持水分，保持强壮\"之类的。很有活力，展示他动作的一面。产品定位是帮助运动员达到最佳状态。\n\n大概是去年在放学路上看到的。是在主干道附近的大数字广告牌，所以很难错过。视觉效果真的很抢眼——明亮的颜色和罗纳尔多的动作立即吸引了我的注意力。\n\n说实话，并没有真正影响我的购买决定——我不太喜欢运动饮料。但不得不承认，看到世界级运动员在广告里确实让我停下来看了一会儿。它肯定留下了深刻印象。我觉得这些广告有效是因为人们崇拜著名运动员，想像他们，所以用他们的形象让产品看起来更有吸引力和可信度。',
  },

  // ===== Part 2 · 擅长学习语言的人 =====
  {
    id: 'pred-p2-language-learner',
    examPeriod: '2026 Q4',
    part: 2,
    prompt: 'Describe a person who is good at learning languages.',
    subQuestions: [
      'Who it is',
      'How you knew him/her',
      'What languages he/she has learnt',
      'And explain why you think he/she is good at learning languages',
    ],
    tags: ['Part 2', '保留题', SOURCE],
    hasAudio: false,
    difficulty: 'medium',
    source: SOURCE,
    fullPrompt: 'Describe a person who is good at learning languages.\nYou should say:\n- Who it is\n- How you knew him/her\n- What languages he/she has learnt\n- And explain why you think he/she is good at learning languages',
    exampleAnswer:
      "I want to talk about my English teacher, Miss Zhang. She's definitely the most language-talented person I know. She's in her 30s and has been teaching English for about 10 years now. But what impresses me most is not just her English — it's her whole language ability.\n\nI first realized she was exceptional when she switched between English, Japanese, and Korean during a school event once, and all of them sounded completely natural. It blew my mind. Later, I learned she's actually proficient in 5 languages — English, Japanese, Korean, French, and of course her native Mandarin.\n\nWhat makes her so good at learning languages, I think, is her method. She's super disciplined about practicing every day — she spends at least an hour on listening and speaking, even during busy teaching periods. She's also not afraid to make mistakes, which she says is key. And she's always watching foreign TV shows without subtitles to expose herself to natural conversations.\n\nBut more than that, I think it's her attitude. She's genuinely curious about other cultures, not just the language itself. She travels whenever she can and always tries to use what she's learned in real situations. That passion makes learning feel natural instead of like a chore.\n\nI feel pretty inspired by her. If I could be half as good at languages as her, I'd be more than happy. She's proof that with the right approach and dedication, anyone can become multilingual.",
    exampleAnswerZh:
      '我想说的是我的英语老师张老师。她绝对是我认识的最有语言天赋的人。她 30 多岁，已经教英语大概 10 年了。但让我印象最深的不只是她的英语——是她的整体语言能力。\n\n我第一次意识到她很厉害是在一次学校活动中，她能在英语、日语和韩语之间自由切换，而且听起来都非常自然。我震惊了。后来我才知道她实际上精通 5 种语言——英语、日语、韩语、法语，还有她的母语中文。\n\n我觉得她擅长学习语言的原因是她的方法。她每天练习超级自律——即使在教学繁忙期间也花至少一个小时听力和口语。还有她不怕犯错误，她说这是关键。她还总是看外语电视节目来让自己接触真实的对话。\n\n但除此之外，我觉得是她的态度。她对其他文化真正好奇，而不只是语言本身。她一有机会就旅行，总是在真实情境中练习她学过的东西。这种热情让学习感觉自然而然而不是像完成任务。\n\n我很受她的启发。如果我能像她一半那么擅长语言，我就很满足了。她证明了只要有正确的方法和奉献，任何人都可以成为多语言者。',
  },
]

export const PREDICTED_BANK_INFO = {
  id: 'predicted-2026-q4',
  name: '2026 年 9-12 月保留题',
  source: SOURCE,
  total: predictedSpeakingTopics.length,
  parts: [1, 2] as const,
}