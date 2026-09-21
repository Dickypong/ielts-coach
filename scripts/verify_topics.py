"""验证每道剑桥真题是否至少有 N 篇范文。"""

from __future__ import annotations

import argparse
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TOPICS = ROOT / "prototype" / "src" / "data" / "writingTopics.ts"
ESSAYS = ROOT / "prototype" / "src" / "data" / "essays.ts"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--min", type=int, default=2)
    args = parser.parse_args()

    topics_src = TOPICS.read_text(encoding="utf-8")
    topic_ids = re.findall(r"id:\s*'((?:c1[0-8]|c19)-t\d-t2)'", topics_src)
    if not topic_ids:
        topic_ids = re.findall(r"id:\s*'(c\d+-t\d-t2)'", topics_src)

    if not ESSAYS.exists():
        raise SystemExit(f"missing {ESSAYS} — run transform_to_ts.py first")

    essays_src = ESSAYS.read_text(encoding="utf-8")
    topic_refs = re.findall(r'"topicId":\s*"([^"]+)"|topicId:\s*\'([^\']+)\'', essays_src)
    flat = [a or b for a, b in topic_refs]
    counts = Counter(flat)

    ok = 0
    weak: list[tuple[str, int]] = []
    for tid in topic_ids:
        n = counts.get(tid, 0)
        if n >= args.min:
            ok += 1
        else:
            weak.append((tid, n))

    print(f"Task2 topics: {len(topic_ids)}")
    print(f"with ≥{args.min} essays: {ok}")
    print(f"weak: {len(weak)}")
    for tid, n in weak[:40]:
        print(f"  {tid}: {n}")
    if weak:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
