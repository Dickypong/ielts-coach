# 03 · 数据来源策略

> 核心原则：**真实数据优先，零 AI 生成内容**。
> 所有范文、口语录音必须来自公开渠道，明确标注来源出处。

## 1. 数据分类

### 1.1 静态资料（爬一次够用）
- 写作真题：剑桥 IELTS 10-18（36 道 Task 2 + 配套 Task 1）
- 写作范文：公开雅思博客 / 培训机构整理

### 1.2 动态资料（按需更新）
- 雅思哥真题回忆版（每月更新）
- 新题季的口语题库（每 4 个月换题）
- YouTube / B站新增的优秀示范

### 1.3 用户数据（本地生成）
- 用户提交的作文
- 用户录音
- AI 评分结果

## 2. 写作真题来源

### 2.1 剑桥 IELTS 10-18（手敲整理）

| 来源 | 形式 | 工作量 | 备注 |
|---|---|---|---|
| 剑桥雅思真题集 10-18（出版物） | 纸质书 / 电子书 | 已完成 | 36 道 Task 2 + 2 道 Task 1 |
| 公开题库（ieltsbro.com 等） | 网页 | 需爬虫 | 补充近期回忆版 |

**当前状态**：`prototype/src/data/writingTopics.ts` 已手敲 36 道真题，字段完整。

### 2.2 数据格式（writing_topics 表）

```typescript
interface WritingTopic {
  id: string            // 例：'c14-t4-t2'（剑桥14 Test 4 Task 2）
  book: number          // 10-18
  test: number          // 1-4
  examDate: string      // 例：'2019年'
  task: 1 | 2
  prompt: string        // 题目原文
  type: string          // 题型：观点类/讨论类/利弊类/问题+解决方案/图表类
  tags: string[]        // 话题标签
  difficulty: 'easy' | 'medium' | 'hard'
  essayCount: number    // 配套范文数（用于 UI 提示）
}
```

## 3. 写作范文来源（爬虫目标）

### 3.1 主要来源（按优先级）

| 优先级 | 来源 | URL | 类型 | 难度 |
|---|---|---|---|---|
| ⭐⭐⭐ | IELTS Liz | ieltsliz.com | 题型 + 范文 | 中（需解析 HTML） |
| ⭐⭐⭐ | IELTS-Simon | ielts-simon.com | 前考官范文 | 中（结构清晰） |
| ⭐⭐ | DC IELTS | dc-ielts.com | 范文库 | 中 |
| ⭐⭐ | 雅思哥高分范文 | ieltsbro.com/essay | 国内高分 | 中（需登录） |
| ⭐ | IELTS-blog | ielts-blog.com | 范文 + 解析 | 低 |
| ⭐ | 知乎 / 小红书 / 豆瓣 | 公开笔记 | 学员分享 | 高（非结构化） |

### 3.2 抓取方案

```python
# scripts/scrape_ielts_liz.py
import requests
from bs4 import BeautifulSoup
import json

def scrape_ielts_liz():
    """抓取 IELTS Liz 网站的写作范文"""
    base = 'https://ieltsliz.com/ielts-writing-task-2/'
    
    # 1. 获取所有范文列表
    list_url = base + 'sample-essay/'
    soup = BeautifulSoup(requests.get(list_url).text, 'html.parser')
    essay_links = [a['href'] for a in soup.select('a.essay-link')]
    
    essays = []
    for link in essay_links:
        # 2. 抓取每个范文页
        page = BeautifulSoup(requests.get(link).text, 'html.parser')
        
        essay = {
            'source_url': link,
            'source_name': 'IELTS Liz',
            'topic': page.select_one('h1').text,
            'content': page.select_one('.essay-content').text,
            'score': extract_score(page),
            'author': 'IELTS Liz Team',
            'word_count': count_words(page),
            # ... 其他字段
        }
        essays.append(essay)
    
    return essays
```

### 3.3 数据清洗规则

每篇范文入库前必须做：

1. **去重**：相同题目相同作者只保留一份
2. **过滤分数**：必须 ≥ 8.0
3. **清洗文本**：去除 HTML 标签、特殊字符
4. **分析生成**：调用 AI 生成 `analysis` 字段（结构分析、词汇亮点、为什么高分）
   - 注意：**AI 只做分析，不生成范文内容**
5. **标注来源**：URL + 作者 + 抓取时间

### 3.4 字段格式（essays 表）

```typescript
interface Essay {
  id: string
  topicId: string              // 关联 writing_topics.id
  score: number                 // ≥ 8.0
  author: string               // 例：'IELTS Liz Sample Answer'
  source: string               // URL
  sourceName: string           // 例：'IELTS Liz'
  wordCount: number
  timeSpent: number            // 推荐用时（分钟）
  content: string              // 范文正文
  analysis: {
    structure: string          // 结构分析（AI 生成）
    logic: string              // 逻辑分析（AI 生成）
    vocabHighlights: { word: string; meaning: string }[]
    bandCriteria: {
      taskResponse: number
      coherence: number
      lexical: number
      grammar: number
    }
    whyHighScore: string[]     // 要点列表（AI 生成）
  }
  fetchedAt: number            // 抓取时间戳
}
```

## 4. 口语优秀录音来源（爬虫目标）

### 4.1 YouTube 公开频道

| 频道 | URL | 内容 | 订阅量 |
|---|---|---|---|
| IELTS Liz | youtube.com/@IELTSLiz | 口语示范 + 写作 | 50 万 |
| E2 IELTS | youtube.com/@E2IELTS | 口语 9 分示范 | 200 万 |
| IELTS Energy Podcast | youtube.com/@IELTSEnergy | 口语讨论 | 100 万 |
| Magoosh IELTS | youtube.com/@MagooshIELTS | 口语技巧 | 30 万 |
| Oxford Online English | youtube.com/@OxfordOnlineEnglish | 口语 + 发音 | 300 万 |

### 4.2 B 站

- 搜索关键词："雅思口语 8分示范"、"雅思口语 9分"、"雅思口语 Part 2"
- 推荐 up 主：雅思小婊贝、雅思口语 9 分达人 等

### 4.3 抓取工具

```bash
# 安装 yt-dlp
brew install yt-dlp

# 下载视频
yt-dlp -f "bestaudio" -o "audio/%(title)s.%(ext)s" "VIDEO_URL"

# 提取音频为 MP3
yt-dlp -x --audio-format mp3 -o "audio/%(title)s.mp3" "VIDEO_URL"

# 下载字幕（如果有）
yt-dlp --write-auto-subs --sub-lang en -o "subs/%(title)s" "VIDEO_URL"
```

### 4.4 转写方案

**Whisper API**（推荐，准确度高）：
```python
import openai

audio_file = open("audio/sample.mp3", "rb")
transcript = openai.Audio.transcribe("whisper-1", audio_file)
```

**本地 whisper.cpp**（离线）：
```bash
# 编译 whisper.cpp
git clone https://github.com/ggerganov/whisper.cpp
cd whisper.cpp && make

# 转写
./main -m models/ggml-base.en.bin -f audio/sample.mp3
```

### 4.5 数据格式（great_speaking 表）

```typescript
interface GreatSpeaking {
  id: string
  part: 1 | 2 | 3
  topic: string                // 例：'Hometown'
  prompt: string               // 完整题目
  source: string               // YouTube/B 站 URL
  sourceName: string           // 频道名
  sourceTitle: string          // 视频标题
  score: number                // ≥ 8.0（从视频描述或评论推断）
  duration: number             // 秒
  audioPath: string            // 本地音频相对路径
  transcript: string           // 完整转写
  analysis: {
    overallComment: string     // AI 生成总评
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
  fetchedAt: number
}
```

## 5. 爬虫脚本组织

### 5.1 目录结构

```
scripts/
├── common/
│   ├── http_client.py          # 带频率限制的 HTTP 客户端
│   ├── html_parser.py          # HTML 解析工具
│   └── db_writer.py            # 写入 SQLite
├── scrape_ielts_liz.py         # 范文
├── scrape_ielts_simon.py       # 范文
├── scrape_dc_ielts.py          # 范文
├── scrape_ielts_bro.py         # 雅思哥
├── scrape_youtube_audio.py     # YouTube 音频
├── scrape_bilibili_audio.py    # B 站音频
├── transcribe_audio.py         # 音频转写（Whisper）
├── analyze_essay.py            # AI 分析范文（只分析不生成）
└── import_to_db.py             # 整合数据入 SQLite
```

### 5.2 执行流程

```
1. scrape_ielts_liz.py  →  essays.json (raw)
2. analyze_essay.py     →  essays.json (含 analysis)
3. scrape_youtube_audio.py → audio/*.mp3
4. transcribe_audio.py  → transcripts/*.json
5. analyze_speaking.py  → great_speaking.json (含 analysis)
6. import_to_db.py      → ielts_coach.db
```

### 5.3 频率控制

- 每个域名请求间隔 ≥ 3 秒
- 每次抓取任务前随机延迟 5-15 秒
- 尊重 robots.txt
- 单次抓取不超过 100 个请求

## 6. 版权与合规

### 6.1 立场
- 本项目为**个人学习用途**，非商业
- 抓取公开可访问的内容用于学习，符合 fair use
- 所有数据**标注来源**，尊重知识产权

### 6.2 必须做的事
- ✅ 每篇范文标注 `source`（URL）和 `sourceName`（来源名）
- ✅ 每段口语录音标注 YouTube/B站 URL 和频道名
- ✅ 在 app 设置页提供 "数据来源清单" 链接
- ✅ 用户导出数据时附带来源信息

### 6.3 不做的事
- ❌ 不绕过任何登录 / 付费墙
- ❌ 不爬取明确禁止爬取的网站
- ❌ 不删除原始水印 / 作者署名
- ❌ 不声称为自己的原创内容

## 7. 数据更新策略

| 数据 | 更新频率 | 触发 |
|---|---|---|
| 雅思哥真题回忆 | 每月 | 手动 / 定时任务 |
| 写作范文 | 不定期 | 新题目出现时 |
| 口语题库 | 每 4 个月（换题季） | 手动 |
| 优秀口语录音 | 不定期 | 发现新资源时 |

数据采集脚本放在 `scripts/`，可手动执行也可配 launchd 定时执行（macOS）。