"""从 writingTopics.ts 导入真题到 SQLite。"""

from __future__ import annotations

import json
import re
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT / "data" / "db" / "ielts_coach.db"
TS = ROOT / "prototype" / "src" / "data" / "writingTopics.ts"


def main() -> None:
    if not DB.exists():
        raise SystemExit("请先运行 scripts/init_db.py")

    src = TS.read_text(encoding="utf-8")
    # 粗匹配每个 topic 对象
    blocks = re.findall(r"\{\s*id:\s*'([^']+)'[\s\S]*?\n\s*\},?", src)
    # 更可靠：逐字段提取
    ids = re.findall(r"id:\s*'([^']+)'", src)
    books = re.findall(r"book:\s*(\d+)", src)
    tests = re.findall(r"test:\s*(\d+)", src)
    dates = re.findall(r"examDate:\s*'([^']*)'", src)
    tasks = re.findall(r"task:\s*([12])", src)
    prompts = re.findall(r"prompt:\s*'((?:\\'|[^'])*)'", src)
    types = re.findall(r"type:\s*'([^']*)'", src)
    tags = re.findall(r"tags:\s*(\[[^\]]*\])", src)
    diffs = re.findall(r"difficulty:\s*'([^']*)'", src)

    n = len(ids)
    assert n == len(prompts) == len(books), f"parse mismatch {n} ids / {len(prompts)} prompts / {len(books)} books"

    conn = sqlite3.connect(DB)
    for i in range(n):
        tag_list = json.loads(tags[i].replace("'", '"')) if i < len(tags) else []
        conn.execute(
            """
            INSERT OR REPLACE INTO writing_topics
            (id, book, test, exam_date, task, prompt, type, tags, difficulty)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                ids[i],
                int(books[i]),
                int(tests[i]),
                dates[i] if i < len(dates) else "",
                int(tasks[i]) if i < len(tasks) else 2,
                prompts[i].replace("\\'", "'"),
                types[i] if i < len(types) else "观点类",
                json.dumps(tag_list, ensure_ascii=False),
                diffs[i] if i < len(diffs) else "medium",
            ),
        )
    conn.commit()
    total = conn.execute("SELECT COUNT(*) FROM writing_topics").fetchone()[0]
    conn.close()
    print(f"✓ seeded {n} topics; total writing_topics = {total}")


if __name__ == "__main__":
    main()
