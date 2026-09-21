"""从转写生成诚实的「听录音要点」，禁止套模板假分项点评。

用法：
  python3 scripts/enrich_great_speaking_analysis.py
  python3 scripts/transform_great_speaking.py
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "data" / "raw" / "great_speaking.json"

NOISE = re.compile(
    r"^(kind:|language:|\[music\]|\[applause\]|hello this is|subscribe|click the link|"
    r"go and check|keith speaking|e2language|band nine breakdown)",
    re.I,
)


def clean_transcript(t: str) -> str:
    t = re.sub(r"^Kind:\s*captions\s*Language:\s*\S+\s*", "", t or "", flags=re.I)
    t = re.sub(r"\[Music\]|\[Applause\]|\[Laughter\]", " ", t, flags=re.I)
    return re.sub(r"\s+", " ", t).strip()


def split_sentences(text: str) -> list[str]:
    parts = re.split(r"(?<=[.!?])\s+", text)
    out: list[str] = []
    for p in parts:
        p = p.strip(" \"'")
        if len(p) < 45 or len(p) > 180:
            continue
        if NOISE.search(p):
            continue
        if p.lower().startswith(("so ", "and ", "but ", "um ", "uh ")):
            continue
        out.append(p)
    return out


def pick_excerpts(text: str, n: int = 5) -> list[str]:
    sents = split_sentences(text)
    if not sents:
        words = text.split()
        chunks = []
        for i in range(0, min(len(words), 200), 18):
            chunk = " ".join(words[i : i + 18])
            if 40 <= len(chunk) <= 160:
                chunks.append(chunk)
        return chunks[:n]
    if len(sents) <= n:
        return sents
    step = max(1, len(sents) // n)
    return [sents[i] for i in range(0, len(sents), step)][:n]


def tips_for(row: dict) -> list[str]:
    covers = row.get("coversParts") or [row.get("part", 2)]
    tips: list[str] = []
    if len(covers) > 1:
        tips.append("这是整场/多 Part 示范：先用进度条跳到你要练的 Part，不要从头硬听到尾。")
    if 1 in covers:
        tips.append("听 Part 1：回答是否直接、有没有一句具体细节（地点/频率/原因）。")
    if 2 in covers:
        tips.append("听 Part 2：抓开场一句 + 2–3 个细节段 + 收尾感受，结构比堆词汇更重要。")
    if 3 in covers:
        tips.append("听 Part 3：留意比较、原因、举例、让步（although / on the other hand）怎么接。")
    tips.append("跟读只挑 1–2 句改成自己的经历，不要背整段示范。")
    return tips


def practice_tips(row: dict) -> list[str]:
    part = int(row.get("part") or 2)
    return [
        f"听完立刻去「口语题库」选一道 Part {part} 题，限时自己答一遍。",
        "录音后对照转写：你卡壳的地方，示范是怎么用短句接过去的。",
        "打开原视频看口型与语调，比只看文字更接近真实考试。",
    ]


def build_analysis(row: dict) -> dict:
    raw = clean_transcript(row.get("transcript") or "")
    excerpts = pick_excerpts(raw)
    note = row.get("matchNote") or "公开示范，与题库按 Part 粗对齐，非逐题答案。"
    channel = row.get("sourceName") or "公开来源"
    score = float(row.get("score") or 0)
    overall = (
        f"来自 {channel} 的真实公开示范。{note} "
        f"下方原句抽自本段转写，不是 AI 编造点评；"
        f"来源标称约 Band {score:g}，本 App 不做分项打分。"
    )
    return {
        "overallComment": overall,
        "listenExcerpts": excerpts,
        "listenTips": tips_for(row),
        "practiceTips": practice_tips(row),
        "claimedBand": score,
        "fluencyHighlights": [],
        "lexicalHighlights": [],
        "grammarHighlights": [],
        "pronunciationHighlights": [],
        "contentHighlights": [],
        "sentences": [
            {"text": e, "translation": "", "technique": "转写原句 · 建议跟读"} for e in excerpts
        ],
        "improvements": practice_tips(row),
        "bandCriteria": {
            "fluency": score,
            "lexical": score,
            "grammar": score,
            "pronunciation": score,
        },
    }


def main() -> None:
    rows = json.loads(SRC.read_text(encoding="utf-8"))
    changed = 0
    for r in rows:
        # 已有考官点评时不要覆盖
        existing = r.get("analysis") or {}
        if existing.get("analysisSource") == "minimax-examiner" and existing.get("whyHighScore"):
            continue
        r["transcript"] = clean_transcript(r.get("transcript") or "")
        r["analysis"] = build_analysis(r)
        changed += 1
    SRC.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"✓ enriched stubs={changed} kept examiner={len(rows)-changed} → {SRC}")


if __name__ == "__main__":
    main()
