"""对抓取范文调用 AI 生成 analysis 字段（不生成范文正文）。

需要环境变量：
  MINIMAX_API_KEY=...

用法：
  python3 scripts/analyze_essay.py
  python3 scripts/analyze_essay.py --limit 5
"""

from __future__ import annotations

import argparse
import json
import os
import time
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"
OUT = RAW / "essays_analyzed.json"
API = "https://api.minimaxi.com/v1/text/chatcompletion_v2"

SYSTEM = """You are an IELTS Writing expert. Your task is to ANALYZE (not write) given
high-scoring essays. You identify WHY they scored well.
Always output valid JSON matching the EssayAnalysis schema. Do not invent essay body text."""


def load_rows() -> list[dict]:
    rows: list[dict] = []
    for name in ("ielts_liz_essays.json", "ielts_simon_essays.json"):
        p = RAW / name
        if p.exists():
            rows.extend(json.loads(p.read_text(encoding="utf-8")))
    return rows


def analyze_one(row: dict, api_key: str, model: str) -> dict:
    content = row.get("essay_content") or ""
    prompt = row.get("topic_prompt") or ""
    score = row.get("score") or 8.0
    user = f"""# Topic
{prompt}

# High-scoring essay (score: {score})
{content}

# Your task
Analyze why this essay scored {score}. Output in JSON:

{{
  "structure": "<paragraph-by-paragraph structural analysis>",
  "logic": "<argumentation logic analysis>",
  "vocabHighlights": [
    {{"word": "<high-score word/phrase>", "meaning": "<Chinese translation>"}}
  ],
  "bandCriteria": {{
    "taskResponse": <0.5-step>,
    "coherence": <0.5-step>,
    "lexical": <0.5-step>,
    "grammar": <0.5-step>
  }},
  "whyHighScore": ["<reason 1>", "<reason 2>"]
}}
"""
    resp = requests.post(
        API,
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        json={
            "model": model,
            "messages": [
                {"role": "system", "content": SYSTEM},
                {"role": "user", "content": user},
            ],
            "temperature": 0.3,
            "response_format": {"type": "json_object"},
        },
        timeout=60,
    )
    resp.raise_for_status()
    body = resp.json()
    text = body.get("choices", [{}])[0].get("message", {}).get("content") or "{}"
    try:
        analysis = json.loads(text)
    except json.JSONDecodeError:
        start = text.find("{")
        end = text.rfind("}")
        analysis = json.loads(text[start : end + 1])
    return {**row, "analysis": analysis}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--model", default=os.getenv("MINIMAX_MODEL", "MiniMax-M3"))
    args = parser.parse_args()

    api_key = os.getenv("MINIMAX_API_KEY", "").strip()
    if not api_key:
        raise SystemExit("请设置环境变量 MINIMAX_API_KEY")

    rows = load_rows()
    if args.limit:
        rows = rows[: args.limit]
    if not rows:
        raise SystemExit("data/raw 下没有范文")

    out: list[dict] = []
    for i, row in enumerate(rows):
        print(f"[{i+1}/{len(rows)}] {row.get('source_url')}")
        try:
            out.append(analyze_one(row, api_key, args.model))
            time.sleep(1.2)
        except Exception as e:  # noqa: BLE001
            print(f"  ✗ {e}")
            out.append({**row, "analysis_error": str(e)})

    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"✓ wrote {OUT}")


if __name__ == "__main__":
    main()
