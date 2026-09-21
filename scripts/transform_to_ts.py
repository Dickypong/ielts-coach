"""把 raw JSON 转为 prototype/src/data/essays.ts，并刷新 writingTopics.essayCount。"""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"
OUT_TS = ROOT / "prototype" / "src" / "data" / "essays.ts"
TOPICS_TS = ROOT / "prototype" / "src" / "data" / "writingTopics.ts"

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
    "whyHighScore": ["真实公开范文，标注来源后供学习参考"],
}


def sanitize_analysis(raw: object, score: float) -> dict:
    """只保留前端 Essay.analysis 需要的字段，避免 AI 多吐字段导致 TS 报错。"""
    src = raw if isinstance(raw, dict) else {}
    band = src.get("bandCriteria") if isinstance(src.get("bandCriteria"), dict) else {}
    vocab = src.get("vocabHighlights") if isinstance(src.get("vocabHighlights"), list) else []
    clean_vocab = []
    for v in vocab:
        if isinstance(v, dict) and v.get("word"):
            clean_vocab.append(
                {
                    "word": str(v.get("word") or ""),
                    "meaning": str(v.get("meaning") or ""),
                }
            )
    why = src.get("whyHighScore") if isinstance(src.get("whyHighScore"), list) else []
    return {
        "structure": str(src.get("structure") or DEFAULT_ANALYSIS["structure"]),
        "logic": str(src.get("logic") or DEFAULT_ANALYSIS["logic"]),
        "vocabHighlights": clean_vocab,
        "bandCriteria": {
            "taskResponse": float(band.get("taskResponse") or score),
            "coherence": float(band.get("coherence") or score),
            "lexical": float(band.get("lexical") or score),
            "grammar": float(band.get("grammar") or score),
        },
        "whyHighScore": [str(x) for x in why] or list(DEFAULT_ANALYSIS["whyHighScore"]),
    }


def load_list(name: str) -> list[dict]:
    p = RAW / name
    if not p.exists():
        return []
    data = json.loads(p.read_text(encoding="utf-8"))
    return data if isinstance(data, list) else []


def token_set(text: str) -> set[str]:
    return set(re.findall(r"[a-z]{3,}", text.lower()))


def similarity(a: str, b: str) -> float:
    ta, tb = token_set(a), token_set(b)
    if not ta or not tb:
        return 0.0
    return len(ta & tb) / len(ta | tb)


def ts_string(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def main() -> None:
    analyzed = load_list("essays_analyzed.json")
    raw = (
        load_list("ielts_liz_essays.json")
        + load_list("ielts_simon_essays.json")
        + load_list("ielts_blog_essays.json")
    )
    # 以 source URL 去重合并：新抓 raw 全量保留；若 analyzed 有同 URL，优先用其 analysis
    by_src: dict[str, dict] = {}
    for row in raw:
        src = (row.get("source_url") or row.get("source") or "").strip().rstrip("/")
        if not src:
            continue
        by_src[src] = row
    for row in analyzed:
        src = (row.get("source_url") or row.get("source") or "").strip().rstrip("/")
        if not src:
            continue
        base = by_src.get(src, {})
        merged = {**base, **row}
        if row.get("analysis"):
            merged["analysis"] = row["analysis"]
        by_src[src] = merged
    rows = list(by_src.values()) or analyzed or raw
    if not rows:
        raise SystemExit("no raw essays found")
    print(f"merge essays: raw={len(raw)} analyzed={len(analyzed)} unique={len(rows)}")

    topics_src = TOPICS_TS.read_text(encoding="utf-8")
    # 去掉上次追加的公开范文段，避免重复膨胀
    topics_src = re.sub(
        r"\n\s*// ===== 公开渠道范文题[\s\S]*$",
        "\n]\n",
        topics_src.rstrip() + "\n",
    )
    topic_prompts = re.findall(
        r"id:\s*'([^']+)'[\s\S]*?prompt:\s*'((?:\\'|[^'])*)'",
        topics_src,
    )
    # fallback: double quotes
    if not topic_prompts:
        topic_prompts = re.findall(
            r'id:\s*"([^"]+)"[\s\S]*?prompt:\s*"((?:\\"|[^"])*)"',
            topics_src,
        )

    essays: list[dict] = []
    counts: dict[str, int] = {}

    for row in rows:
        prompt = row.get("topic_prompt") or ""
        content = row.get("essay_content") or row.get("content") or ""
        source = row.get("source_url") or row.get("source") or ""
        if not content or not source:
            continue

        best_id = "unmatched"
        best = 0.0
        for tid, tprompt in topic_prompts:
            s = similarity(prompt, tprompt.replace("\\'", "'"))
            if s > best:
                best = s
                best_id = tid
        if best < 0.22:
            best_id = f"ext-{hashlib.sha1(prompt.encode()).hexdigest()[:10]}"

        score = float(row.get("score") or 8.0)
        analysis = sanitize_analysis(row.get("analysis"), score)

        eid = row.get("id") or f"essay-{hashlib.sha1(source.encode()).hexdigest()[:10]}"
        essays.append(
            {
                "id": eid,
                "topicId": best_id,
                "score": score,
                "author": row.get("author") or row.get("source_name") or "Sample",
                "source": source,
                "sourceName": row.get("source_name") or "",
                "wordCount": int(row.get("word_count") or len(content.split())),
                "timeSpent": int(row.get("time_spent") or 40),
                "isAIGenerated": False,
                "content": content,
                "analysis": analysis,
            }
        )
        counts[best_id] = counts.get(best_id, 0) + 1

    # 写 essays.ts
    lines = [
        "// 真实公开范文（由 scripts/transform_to_ts.py 生成）",
        "// 禁止手工塞入 AI 仿写正文",
        "",
        "export type Essay = {",
        "  id: string",
        "  topicId: string",
        "  score: number",
        "  author: string",
        "  source: string",
        "  sourceName: string",
        "  wordCount: number",
        "  timeSpent: number",
        "  isAIGenerated: boolean",
        "  content: string",
        "  analysis: {",
        "    structure: string",
        "    logic: string",
        "    vocabHighlights: { word: string; meaning: string }[]",
        "    bandCriteria: {",
        "      taskResponse: number",
        "      coherence: number",
        "      lexical: number",
        "      grammar: number",
        "    }",
        "    whyHighScore: string[]",
        "  }",
        "}",
        "",
        "export const essays: Essay[] = ",
        json.dumps(essays, ensure_ascii=False, indent=2),
        "",
    ]
    OUT_TS.write_text("\n".join(lines), encoding="utf-8")
    print(f"✓ wrote {len(essays)} essays → {OUT_TS}")

    # 更新 essayCount
    def repl_count(match: re.Match[str]) -> str:
        tid = match.group(1)
        block = match.group(0)
        n = counts.get(tid, 0)
        return re.sub(r"essayCount:\s*\d+", f"essayCount: {n}", block)

    updated = re.sub(
        r"\{\s*id:\s*'([^']+)'[\s\S]*?essayCount:\s*\d+,?\s*\}",
        repl_count,
        topics_src,
    )

    # 把未匹配剑桥真题的公开范文题追加进题库，避免「有范文但 UI 看不见」
    existing_ids = set(re.findall(r"id:\s*'([^']+)'", updated))
    prompt_by_ext: dict[str, tuple[str, str]] = {}
    for row in rows:
        prompt = row.get("topic_prompt") or ""
        content = row.get("essay_content") or row.get("content") or ""
        source = row.get("source_url") or row.get("source") or ""
        if not content or not source or not prompt.strip():
            continue
        best = 0.0
        for tid, tprompt in topic_prompts:
            s = similarity(prompt, tprompt.replace("\\'", "'"))
            if s > best:
                best = s
        if best < 0.22:
            best_id = f"ext-{hashlib.sha1(prompt.encode()).hexdigest()[:10]}"
            if best_id not in existing_ids:
                prompt_by_ext[best_id] = (prompt.strip(), row.get("topic_type") or "观点类")

    extras: list[str] = []
    for tid, (prompt, typ) in sorted(prompt_by_ext.items()):
        safe_prompt = prompt.replace("\\", "\\\\").replace("'", "\\'")
        safe_type = str(typ).replace("'", "")
        extras.append(
            "  {\n"
            f"    id: '{tid}',\n"
            "    book: 0,\n"
            "    test: 0,\n"
            "    examDate: '公开范文',\n"
            "    task: 2,\n"
            f"    prompt: '{safe_prompt}',\n"
            f"    type: '{safe_type}',\n"
            "    tags: ['公开范文'],\n"
            "    difficulty: 'medium',\n"
            f"    essayCount: {counts.get(tid, 0)},\n"
            "  },"
        )

    if extras:
        updated = updated.rstrip()
        if updated.endswith("]"):
            updated = (
                updated[:-1].rstrip().rstrip(",")
                + ",\n\n  // ===== 公开渠道范文题（非剑桥编号） =====\n"
                + "\n".join(extras)
                + "\n]\n"
            )
        print(f"✓ appended {len(extras)} public topics")

    TOPICS_TS.write_text(updated, encoding="utf-8")
    print(f"✓ refreshed essayCount for {len(counts)} topics")


if __name__ == "__main__":
    main()
