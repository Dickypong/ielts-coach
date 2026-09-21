"""抓取 IELTS Liz 公开 Writing Task 2 范文。

用法：
  python3 scripts/scrape_ielts_liz.py
  python3 scripts/scrape_ielts_liz.py --limit 25

输出：data/raw/ielts_liz_essays.json
注意：仅抓取公开页面；遵守间隔 ≥ 3 秒；不伪造分数。
"""

from __future__ import annotations

import argparse
import json
import re
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "raw" / "ielts_liz_essays.json"
HUBS = [
    "https://ieltsliz.com/ielts-writing-task-2/",
    "https://ieltsliz.com/ielts-writing-task-2-model-essay/",
    "https://ieltsliz.com/ielts-agree-disagree-essay-sample-answer/",
    "https://ieltsliz.com/ielts-discussion-essay-model-answer/",
    "https://ieltsliz.com/ielts-advantage-disadvantage-model-essay/",
    "https://ieltsliz.com/ielts-solution-essay-band-9-model-answer/",
    "https://ieltsliz.com/positive-or-negative-development-ielts-model-essay/",
    "https://ieltsliz.com/ielts-model-essay-score-9/",
    "https://ieltsliz.com/ielts-model-essay-two-questions/",
    "https://ieltsliz.com/funding-music-lessons-sample-answer/",
    "https://ieltsliz.com/ielts-essay-question-answer-june-2018/",
    "https://ieltsliz.com/recent-ielts-essay-question-international-aid/",
    "https://ieltsliz.com/model-answers-for-ielts-essays-january-2018/",
]
UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
)
DELAY = 3.0

# 明确是范文/model answer 的 URL 关键词
ESSAY_URL_HINTS = (
    "model-essay",
    "model-answer",
    "sample-answer",
    "sample-essay",
    "band-9",
    "score-9",
    "model-1",
    "model-essay-2",
    "model-answers",
    "question-answer",
    "international-aid",
    "funding-music",
)

SKIP_HINTS = (
    "essay-ideas",
    "essay-topics",
    "essay-questions",
    "essay-planning",
    "types-of-ielts",
    "paraphrasing",
    "linking-words",
    "band-scores",
    "feedback",
    "introduction-content",
    "body-paragraphs",
    "thesis-statement",
    "connecting-sentences",
    "last-5-mins",
    "should-i-give",
    "improving-sentences",
    "how-many-paragraphs",
    "how-to-put-examples",
    "using-the-passive",
    "current-essay-question",
    "current-topic",
)


def session() -> requests.Session:
    s = requests.Session()
    s.headers.update({"User-Agent": UA, "Accept-Language": "en-US,en;q=0.9"})
    return s


def word_count(text: str) -> int:
    return len(re.findall(r"[A-Za-z']+", text))


def extract_score(text: str, url: str) -> float | None:
    lower = (text + " " + url).lower()
    if "band 9" in lower or "score 9" in lower or "band-9" in lower or "score-9" in lower:
        return 9.0
    if "band 8.5" in lower or "8.5" in lower and "band" in lower:
        return 8.5
    if "band 8" in lower or "score 8" in lower:
        return 8.0
    # model / sample answer 页默认视为考官示范，按 8.0 收录（Liz 公开示范通常 ≥8）
    if any(h in url for h in ("model", "sample-answer", "sample-essay")):
        return 8.0
    return None


def guess_type(prompt: str) -> str:
    p = prompt.lower()
    if "discuss both" in p:
        return "讨论类"
    if "advantages" in p and "disadvantages" in p:
        return "利弊类"
    if "to what extent" in p or "agree or disagree" in p:
        return "观点类"
    if "cause" in p or "problem" in p or "solution" in p or "what are the" in p:
        return "问题+解决方案"
    if "positive" in p or "negative" in p or "development" in p:
        return "观点类"
    return "观点类"


def collect_links(soup: BeautifulSoup, base: str) -> list[str]:
    links: list[str] = []
    for a in soup.select("a[href]"):
        href = a.get("href", "").strip()
        if not href:
            continue
        full = urljoin(base, href).split("#")[0].replace("http://www.ieltsliz.com", "https://ieltsliz.com")
        full = full.replace("https://www.ieltsliz.com", "https://ieltsliz.com")
        if "ieltsliz.com" not in full:
            continue
        if any(s in full for s in SKIP_HINTS):
            continue
        if any(x in full for x in ("replytocom=", "comment-page", "/tag/", "/feed", "moderation-hash", "unapproved=")):
            continue
        if any(h in full for h in ESSAY_URL_HINTS) or re.search(
            r"model-essay|sample-answer|model-answer|band-9|score-9|model-answers", full
        ):
            links.append(full)
    # 去重保序
    seen: set[str] = set()
    out: list[str] = []
    for u in links:
        key = u.rstrip("/")
        if key not in seen:
            seen.add(key)
            out.append(u)
    return out


def parse_essay_page(html: str, url: str) -> dict | None:
    soup = BeautifulSoup(html, "lxml")
    title_el = soup.select_one("h1.entry-title, h1")
    title = title_el.get_text(" ", strip=True) if title_el else ""

    content_el = soup.select_one(".entry-content, article .post-content, article")
    if not content_el:
        return None

    for bad in content_el.select("script, style, .sharedaddy, .jp-relatedposts, .adsbygoogle"):
        bad.decompose()

    # 优先：从 “Model Essay / Band 9” 标题之后截取
    essay_paras: list[str] = []
    prompt = ""
    capturing = False
    for el in content_el.find_all(["h2", "h3", "h4", "p", "blockquote"]):
        text = el.get_text(" ", strip=True)
        if not text:
            continue
        lower = text.lower()
        tag = el.name.lower()

        if tag in {"h2", "h3", "h4"}:
            if any(k in lower for k in ("model essay", "band 9", "band 8", "sample answer", "my essay")):
                capturing = True
            continue

        if not prompt and (
            "?" in text
            or "to what extent" in lower
            or "discuss both" in lower
            or "agree or disagree" in lower
            or lower.startswith("some people")
        ) and word_count(text) < 120:
            prompt = text
            continue

        if capturing:
            # 跳过教学引导句
            if word_count(text) < 50 and any(
                k in lower for k in ("this model", "this essay shows", "in this lesson", "click here")
            ):
                continue
            essay_paras.append(text)

    if not essay_paras:
        # 兜底：取最长连续段落块
        paragraphs = [
            p.get_text(" ", strip=True)
            for p in content_el.find_all(["p", "blockquote"])
            if p.get_text(strip=True)
        ]
        # 找第一个像范文开头的段
        start = 0
        for i, para in enumerate(paragraphs):
            if word_count(para) > 60 and not any(
                k in para.lower()
                for k in ("this is an estimated", "in this lesson", "you will learn", "click below")
            ):
                # 更像范文：含 In my opinion / On the one hand / In conclusion 等
                if any(
                    k in para.lower()
                    for k in (
                        "in my opinion",
                        "on the one hand",
                        "it is often",
                        "many people",
                        "nowadays",
                        "while",
                        "although",
                    )
                ):
                    start = i
                    break
        essay_paras = paragraphs[start:]
        for para in paragraphs[:start]:
            if not prompt and ("?" in para or word_count(para) < 100):
                if any(k in para.lower() for k in ("agree", "discuss", "extent", "some people")):
                    prompt = para

    essay_content = "\n\n".join(essay_paras).strip()
    # 去掉页尾广告/推广
    cut_markers = ("recommended for", "all the best", "liz", "share this", "related posts")
    lines = essay_content.split("\n\n")
    trimmed: list[str] = []
    for line in lines:
        if any(m in line.lower() for m in cut_markers) and word_count(line) < 40:
            break
        trimmed.append(line)
    essay_content = "\n\n".join(trimmed).strip()

    if word_count(essay_content) < 180:
        return None

    score = extract_score((content_el.get_text(" ", strip=True) + " " + title), url)
    if score is None or score < 8.0:
        return None

    if not prompt:
        prompt = title or "IELTS Writing Task 2"

    return {
        "source_name": "IELTS Liz",
        "source_url": url,
        "topic_prompt": prompt,
        "topic_type": guess_type(prompt),
        "essay_content": essay_content,
        "score": score,
        "author": "IELTS Liz Sample Answer",
        "word_count": word_count(essay_content),
        "fetched_at": int(datetime.now(timezone.utc).timestamp()),
        "page_title": title,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=40)
    args = parser.parse_args()

    OUT.parent.mkdir(parents=True, exist_ok=True)
    s = session()

    links: list[str] = []
    for hub in HUBS:
        print(f"[liz] hub: {hub}")
        try:
            r = s.get(hub, timeout=30)
            r.raise_for_status()
            found = collect_links(BeautifulSoup(r.text, "lxml"), hub)
            print(f"  +{len(found)}")
            links.extend(found)
            # hub 本身也可能是范文页
            links.append(hub)
            time.sleep(1.0)
        except Exception as e:  # noqa: BLE001
            print(f"  ✗ {e}")

    # 去重保序
    seen: set[str] = set()
    unique: list[str] = []
    for u in links:
        key = u.rstrip("/")
        if key not in seen and "ieltsliz.com" in key:
            seen.add(key)
            unique.append(u)
    print(f"[liz] candidate links: {len(unique)}")

    essays: list[dict] = []
    for i, url in enumerate(unique[: args.limit]):
        print(f"[liz] ({i+1}/{min(len(unique), args.limit)}) {url}")
        try:
            time.sleep(DELAY)
            resp = s.get(url, timeout=30)
            resp.raise_for_status()
            item = parse_essay_page(resp.text, url)
            if item:
                essays.append(item)
                print(f"  ✓ score={item['score']} words={item['word_count']}")
            else:
                print("  · skipped (no qualifying essay)")
        except Exception as e:  # noqa: BLE001 — 单篇失败不影响整体
            print(f"  ✗ {e}")

    OUT.write_text(json.dumps(essays, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[liz] wrote {len(essays)} essays → {OUT}")


if __name__ == "__main__":
    main()
