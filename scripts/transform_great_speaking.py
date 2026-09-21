"""把 great_speaking.json 转为 prototype/src/data/greatSpeaking.ts"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "data" / "raw" / "great_speaking.json"
OUT = ROOT / "prototype" / "src" / "data" / "greatSpeaking.ts"

HEADER = '''// 优秀口语录音：真实公开 YouTube 示范（由 scripts/transform_great_speaking.py 生成）
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
'''


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"missing {SRC}")
    rows = json.loads(SRC.read_text(encoding="utf-8"))
    # ensure required fields
    clean = []
    for r in rows:
        part = int(r.get("part") or 2)
        covers = r.get("coversParts") or [part]
        clean.append(
            {
                "id": r["id"],
                "part": part,
                "coversParts": [int(x) for x in covers],
                "matchNote": r.get("matchNote")
                or "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
                "topic": r.get("topic") or "",
                "prompt": r.get("prompt") or "",
                "source": r.get("source") or "",
                "sourceName": r.get("sourceName") or r.get("source_name") or "",
                "score": float(r.get("score") or 8.5),
                "duration": int(r.get("duration") or 120),
                "audioPath": r.get("audioPath") or "",
                "isAIGenerated": False,
                "candidate": r.get("candidate")
                or {"name": "Public Demo", "background": "YouTube"},
                "transcript": r.get("transcript") or "",
                "analysis": r.get("analysis")
                or {
                    "overallComment": "真实公开示范",
                    "fluencyHighlights": [],
                    "lexicalHighlights": [],
                    "grammarHighlights": [],
                    "pronunciationHighlights": [],
                    "contentHighlights": [],
                    "sentences": [],
                    "improvements": [],
                    "bandCriteria": {
                        "fluency": 8.5,
                        "lexical": 8.5,
                        "grammar": 8.5,
                        "pronunciation": 8.5,
                    },
                },
            }
        )
    OUT.write_text(HEADER + json.dumps(clean, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"✓ wrote {len(clean)} → {OUT}")


if __name__ == "__main__":
    main()
