"""把 data/raw 下的范文 JSON 导入 SQLite。

会尽量按题目相似度关联到已有 writing_topics；匹配不到则创建 orphan topic。
若 essays_analyzed.json 存在则优先使用（含 AI analysis）。
"""

from __future__ import annotations

import hashlib
import json
import re
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "data" / "db" / "ielts_coach.db"
RAW = ROOT / "data" / "raw"

DEFAULT_ANALYSIS = {
    "structure": "待 AI 分析（运行 scripts/analyze_essay.py）",
    "logic": "待 AI 分析",
    "vocabHighlights": [],
    "bandCriteria": {
        "taskResponse": 8.0,
        "coherence": 8.0,
        "lexical": 8.0,
        "grammar": 8.0,
    },
    "whyHighScore": ["真实公开范文，待补充分析"],
}


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text.lower()).strip()


def token_set(text: str) -> set[str]:
    return set(re.findall(r"[a-z]{3,}", text.lower()))


def similarity(a: str, b: str) -> float:
    ta, tb = token_set(a), token_set(b)
    if not ta or not tb:
        return 0.0
    return len(ta & tb) / len(ta | tb)


def essay_id(source_url: str, content: str) -> str:
    h = hashlib.sha1(f"{source_url}|{content[:120]}".encode()).hexdigest()[:12]
    return f"essay-{h}"


def load_json_list(path: Path) -> list[dict]:
    if not path.exists():
        return []
    data = json.loads(path.read_text(encoding="utf-8"))
    return data if isinstance(data, list) else []


def main() -> None:
    if not DB_PATH.exists():
        raise SystemExit("请先运行 scripts/init_db.py")

    analyzed = load_json_list(RAW / "essays_analyzed.json")
    if analyzed:
        rows = analyzed
        print(f"using essays_analyzed.json ({len(rows)})")
    else:
        rows = (
            load_json_list(RAW / "ielts_liz_essays.json")
            + load_json_list(RAW / "ielts_simon_essays.json")
            + load_json_list(RAW / "ielts_blog_essays.json")
        )
        print(f"using raw essays ({len(rows)})")

    if not rows:
        raise SystemExit("data/raw 下没有范文，请先跑爬虫")

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    topics = conn.execute("SELECT id, prompt FROM writing_topics").fetchall()
    topic_map = [(r["id"], r["prompt"]) for r in topics]

    inserted = 0
    for row in rows:
        prompt = row.get("topic_prompt") or ""
        content = row.get("essay_content") or row.get("content") or ""
        source = row.get("source_url") or row.get("source") or ""
        if not content or not source:
            continue

        best_id = None
        best_score = 0.0
        for tid, tprompt in topic_map:
            s = similarity(prompt, tprompt)
            if s > best_score:
                best_score = s
                best_id = tid

        if best_score < 0.35 or not best_id:
            best_id = f"ext-{hashlib.sha1(normalize(prompt).encode()).hexdigest()[:10]}"
            conn.execute(
                """
                INSERT OR IGNORE INTO writing_topics
                (id, book, test, exam_date, task, prompt, type, tags, difficulty)
                VALUES (?, 0, 0, ?, 2, ?, ?, ?, ?)
                """,
                (
                    best_id,
                    row.get("exam_date") or "公开范文",
                    prompt or "External topic",
                    row.get("topic_type") or "观点类",
                    json.dumps(["external"], ensure_ascii=False),
                    "medium",
                ),
            )
            topic_map.append((best_id, prompt))

        analysis = row.get("analysis") or DEFAULT_ANALYSIS
        # 用官方分填充 bandCriteria 基准
        score = float(row.get("score") or 8.0)
        if isinstance(analysis, dict) and analysis.get("bandCriteria"):
            pass
        else:
            analysis = {
                **DEFAULT_ANALYSIS,
                "bandCriteria": {
                    "taskResponse": score,
                    "coherence": score,
                    "lexical": score,
                    "grammar": score,
                },
            }

        eid = row.get("id") or essay_id(source, content)
        conn.execute(
            """
            INSERT OR REPLACE INTO essays
            (id, topic_id, score, author, source, source_name, word_count, time_spent, content, analysis_json, fetched_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                eid,
                best_id,
                score,
                row.get("author") or row.get("source_name") or "Unknown",
                source,
                row.get("source_name") or "",
                int(row.get("word_count") or len(content.split())),
                int(row.get("time_spent") or 40),
                content,
                json.dumps(analysis, ensure_ascii=False),
                int(row.get("fetched_at") or 0) or None,
            ),
        )
        inserted += 1

    conn.commit()
    total = conn.execute("SELECT COUNT(*) FROM essays").fetchone()[0]
    conn.close()
    print(f"✓ imported/updated {inserted} essays; total in DB = {total}")


if __name__ == "__main__":
    main()
