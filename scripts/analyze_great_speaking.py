"""对优秀口语示范生成「考官视角」高分点评：说明为什么能拿到标称 Band。

需要 MINIMAX_API_KEY，或可读 ~/.openclaw/openclaw.json。

用法：
  python3 scripts/analyze_great_speaking.py
  python3 scripts/analyze_great_speaking.py --limit 2
  python3 scripts/analyze_great_speaking.py --force   # 覆盖已有考官点评
  python3 scripts/transform_great_speaking.py
"""

from __future__ import annotations

import argparse
import json
import os
import re
import time
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "data" / "raw" / "great_speaking.json"
API = "https://api.minimaxi.com/v1/text/chatcompletion_v2"

SYSTEM = """你是资深 IELTS Speaking 考官与培训专家。
用户会给你一段公开高分口语示范的转写（可能含字幕噪音、老师讲解穿插）。
你的任务不是给「听法提示」，而是站在考官立场，解释：为什么这类回答能拿到高分（接近来源标称 Band）。

要求：
1. 紧扣官方四项：Fluency & Coherence / Lexical Resource / Grammatical Range & Accuracy / Pronunciation（发音只能根据转写中的节奏、停顿、自我修正痕迹做有限度推断，并标明不确定性）。
2. 每项必须引用转写中的原句作证据（英文原句），再用中文解释「考官听到这个会怎么加分」。
3. 说明与低分（如 6.0–6.5）考生常见表现的对比：高分考生具体多做了什么。
4. 若视频含教学讲解而非纯考生作答，请点评其中的 model answer 片段，并在总评里说明这一点。
5. 只输出合法 JSON（双引号、字符串内禁止未转义换行）。点评正文用中文，引用句用英文。"""


def load_api_key() -> str:
    key = os.getenv("MINIMAX_API_KEY", "").strip()
    if key:
        return key
    oc = Path.home() / ".openclaw" / "openclaw.json"
    if not oc.exists():
        return ""
    data = json.loads(oc.read_text(encoding="utf-8"))
    servers = (data.get("mcp") or {}).get("servers") or {}
    for name in ("MiniMax", "minimax"):
        env = (servers.get(name) or {}).get("env") or {}
        key = (env.get("MINIMAX_API_KEY") or "").strip()
        if key:
            return key
    return ""


def parse_json(text: str) -> dict:
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass
    start, end = text.find("{"), text.rfind("}")
    if start >= 0 and end > start:
        chunk = text[start : end + 1]
        try:
            return json.loads(chunk)
        except json.JSONDecodeError:
            # 常见：字符串内未转义换行 / 弯引号
            fixed = chunk.replace("\r\n", "\\n").replace("\n", "\\n")
            fixed = fixed.replace("\t", "\\t")
            fixed = fixed.replace("“", '\\"').replace("”", '\\"').replace("‘", "'").replace("’", "'")
            try:
                return json.loads(fixed)
            except json.JSONDecodeError:
                pass
    raise json.JSONDecodeError("unable to parse", text, 0)


def truncate(t: str, n: int = 6500) -> str:
    t = re.sub(r"\s+", " ", (t or "").strip())
    if len(t) <= n:
        return t
    return t[: n // 2] + " … " + t[-n // 2 :]


def analyze_one(row: dict, api_key: str, model: str, retries: int = 3) -> dict:
    last_err: Exception | None = None
    for attempt in range(1, retries + 1):
        try:
            return _analyze_one_once(row, api_key, model)
        except Exception as e:  # noqa: BLE001
            last_err = e
            time.sleep(1.5 * attempt)
    assert last_err is not None
    raise last_err


def _analyze_one_once(row: dict, api_key: str, model: str) -> dict:
    score = float(row.get("score") or 8.5)
    part = row.get("part") or 2
    covers = row.get("coversParts") or [part]
    transcript = truncate(row.get("transcript") or "")
    if len(transcript) < 80:
        raise RuntimeError("转写过短，无法做考官点评")

    user = f"""# 示范元信息
标题：{row.get('topic')}
来源：{row.get('sourceName')}
来源标称 Band：{score}
主标 Part：{part}；覆盖：{covers}
题目/说明：{row.get('prompt')}
对齐说明：{row.get('matchNote') or ''}

# 转写（字幕，可能有噪音）
{transcript}

# 输出 JSON 结构
{{
  "overallComment": "<中文：考官总评，直接回答『为什么能拿约 {score} 分』，120-220字>",
  "whyHighScore": [
    "<中文：高分原因1，含对比低分表现>",
    "<中文：高分原因2>",
    "<中文：高分原因3>",
    "<中文：高分原因4>"
  ],
  "bandCriteria": {{
    "fluency": <0.5步进，接近{score}>,
    "lexical": <0.5步进>,
    "grammar": <0.5步进>,
    "pronunciation": <0.5步进>
  }},
  "scoringDetails": {{
    "fluency": {{
      "score": <同上>,
      "why": "<中文：流利连贯为何高分>",
      "evidence": ["<英文原句1>", "<英文原句2>"]
    }},
    "lexical": {{
      "score": <同上>,
      "why": "<中文：词汇为何高分>",
      "evidence": ["<英文搭配/短语1>", "<英文2>"]
    }},
    "grammar": {{
      "score": <同上>,
      "why": "<中文：语法广度与准确度为何高分>",
      "evidence": ["<英文复杂句1>", "<英文2>"]
    }},
    "pronunciation": {{
      "score": <同上>,
      "why": "<中文：根据转写可推断的节奏/停顿/自我修正；标明不确定性>",
      "evidence": ["<能体现节奏的英文片段>"]
    }}
  }},
  "examinerTips": [
    "<中文：考生可迁移的一条做法>",
    "<中文：另一条>"
  ],
  "listenExcerpts": ["<最能体现高分的英文原句1>", "<2>", "<3>", "<4>"]
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
            "temperature": 0.25,
            "max_tokens": 4000,
            "response_format": {"type": "json_object"},
        },
        timeout=150,
    )
    if not resp.ok:
        raise RuntimeError(f"HTTP {resp.status_code}: {resp.text[:200]}")
    body = resp.json()
    if body.get("base_resp", {}).get("status_code", 0) not in (0, None):
        raise RuntimeError(body.get("base_resp", {}).get("status_msg") or "MiniMax 失败")
    text = (body.get("choices") or [{}])[0].get("message", {}).get("content") or ""
    if not text:
        raise RuntimeError("空响应")
    data = parse_json(text)

    band = data.get("bandCriteria") or {}
    details = data.get("scoringDetails") or {}
    claimed = score

    def crit(name: str, fallback: float) -> dict:
        d = details.get(name) if isinstance(details.get(name), dict) else {}
        return {
            "score": float(d.get("score") or band.get(name) or fallback),
            "why": str(d.get("why") or ""),
            "evidence": [str(x) for x in (d.get("evidence") or []) if str(x).strip()][:4],
        }

    analysis = {
        "overallComment": str(data.get("overallComment") or "").strip(),
        "whyHighScore": [str(x) for x in (data.get("whyHighScore") or []) if str(x).strip()][:6],
        "examinerTips": [str(x) for x in (data.get("examinerTips") or []) if str(x).strip()][:5],
        "listenExcerpts": [str(x) for x in (data.get("listenExcerpts") or []) if str(x).strip()][:6],
        "listenTips": [],
        "practiceTips": [str(x) for x in (data.get("examinerTips") or []) if str(x).strip()][:5],
        "claimedBand": claimed,
        "analysisSource": "minimax-examiner",
        "bandCriteria": {
            "fluency": float(band.get("fluency") or claimed),
            "lexical": float(band.get("lexical") or claimed),
            "grammar": float(band.get("grammar") or claimed),
            "pronunciation": float(band.get("pronunciation") or claimed),
        },
        "scoringDetails": {
            "fluency": crit("fluency", claimed),
            "lexical": crit("lexical", claimed),
            "grammar": crit("grammar", claimed),
            "pronunciation": crit("pronunciation", claimed),
        },
        "fluencyHighlights": [],
        "lexicalHighlights": [],
        "grammarHighlights": [],
        "pronunciationHighlights": [],
        "contentHighlights": [],
        "sentences": [
            {"text": e, "translation": "", "technique": "高分证据句"}
            for e in (data.get("listenExcerpts") or [])[:5]
            if str(e).strip()
        ],
        "improvements": [str(x) for x in (data.get("examinerTips") or []) if str(x).strip()][:5],
    }
    if not analysis["overallComment"]:
        raise RuntimeError("缺少 overallComment")
    return analysis


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--model", default=os.getenv("MINIMAX_MODEL", "MiniMax-M3"))
    parser.add_argument("--sleep", type=float, default=1.2)
    args = parser.parse_args()

    api_key = load_api_key()
    if not api_key:
        raise SystemExit("未找到 MINIMAX_API_KEY（环境变量或 openclaw.json）")

    rows = json.loads(SRC.read_text(encoding="utf-8"))
    if args.limit:
        targets = rows[: args.limit]
    else:
        targets = rows

    ok = skip = fail = 0
    for i, row in enumerate(targets):
        existing = row.get("analysis") or {}
        if (
            not args.force
            and existing.get("analysisSource") == "minimax-examiner"
            and existing.get("whyHighScore")
            and existing.get("scoringDetails")
        ):
            print(f"[{i+1}/{len(targets)}] skip {row.get('id')}")
            skip += 1
            continue
        print(f"[{i+1}/{len(targets)}] analyze {row.get('id')} …", flush=True)
        try:
            row["analysis"] = analyze_one(row, api_key, args.model)
            # write progress after each success
            SRC.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
            ok += 1
            print(f"  ✓ {row['analysis']['overallComment'][:60]}…")
        except Exception as e:  # noqa: BLE001
            fail += 1
            print(f"  ✗ {e}")
        time.sleep(args.sleep)

    print(f"done ok={ok} skip={skip} fail={fail} → {SRC}")


if __name__ == "__main__":
    main()
