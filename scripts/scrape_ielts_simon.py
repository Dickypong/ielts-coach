"""抓取 IELTS-Simon 公开 Writing Task 2 范文。

用法：
  python3 scripts/scrape_ielts_simon.py
  python3 scripts/scrape_ielts_simon.py --limit 20

输出：data/raw/ielts_simon_essays.json
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
OUT = ROOT / "data" / "raw" / "ielts_simon_essays.json"
HUBS = [
    "https://ielts-simon.com/ielts-help-and-english-pr/ielts-writing-task-2/",
    "https://ielts-simon.com/",
]
UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
)
DELAY = 3.0


def session() -> requests.Session:
    s = requests.Session()
    s.headers.update({"User-Agent": UA, "Accept-Language": "en-US,en;q=0.9"})
    return s


def word_count(text: str) -> int:
    return len(re.findall(r"[A-Za-z']+", text))


def guess_type(prompt: str) -> str:
    p = prompt.lower()
    if "discuss both" in p:
        return "讨论类"
    if "advantage" in p and "disadvantage" in p:
        return "利弊类"
    if "to what extent" in p or "agree or disagree" in p or "do you agree" in p:
        return "观点类"
    if "problem" in p or "solution" in p or "cause" in p:
        return "问题+解决方案"
    return "观点类"


def collect_links(soup: BeautifulSoup, base: str) -> list[str]:
    links: list[str] = []
    for a in soup.select("a[href]"):
        href = a.get("href", "").strip()
        text = a.get_text(" ", strip=True).lower()
        full = urljoin(base, href).split("#")[0]
        if "ielts-simon.com" not in full:
            continue
        if "/ielts-writing-task-2/" not in full and "writing-task-2" not in full:
            if "sample" not in text and "band" not in text and "essay" not in text:
                continue
        if any(x in full for x in ("/tag/", "/category/", "/page/", "feed", "comment")):
            continue
        links.append(full)
    seen: set[str] = set()
    out: list[str] = []
    for u in links:
        if u.rstrip("/") not in seen:
            seen.add(u.rstrip("/"))
            out.append(u)
    return out


def parse_essay_page(html: str, url: str) -> dict | None:
    soup = BeautifulSoup(html, "lxml")
    title_el = soup.select_one("h1.entry-title, h3.entry-title, h1, article h3")
    title = title_el.get_text(" ", strip=True) if title_el else ""

    content_el = soup.select_one(".entry-content, .post-body, article .entry, article")
    if not content_el:
        return None

    for bad in content_el.select("script, style, .sharedaddy"):
        bad.decompose()

    paragraphs = [
        p.get_text(" ", strip=True)
        for p in content_el.find_all(["p", "blockquote"])
        if p.get_text(strip=True)
    ]
    if not paragraphs:
        raw = content_el.get_text("\n", strip=True)
        paragraphs = [x.strip() for x in raw.split("\n") if x.strip()]

    full_text = "\n\n".join(paragraphs)
    if word_count(full_text) < 180:
        return None

    prompt = ""
    essay_paras: list[str] = []
    started = False
    for para in paragraphs:
        lower = para.lower()
        if not prompt and (
            "?" in para
            or "agree" in lower
            or "discuss" in lower
            or lower.startswith("some people")
            or "to what extent" in lower
        ) and word_count(para) < 150:
            prompt = para
            continue
        if any(
            k in lower
            for k in (
                "here's my",
                "here is my",
                "band 9 essay",
                "my sample",
                "my essay",
                "model answer",
            )
        ):
            started = True
            continue
        if started or (prompt and word_count(para) > 40):
            essay_paras.append(para)

    essay_content = "\n\n".join(essay_paras).strip() or full_text
    if word_count(essay_content) < 180:
        return None

    score = 9.0
    m = re.search(r"band\s*(8(?:\.5)?|9)", full_text + " " + title, re.I)
    if m:
        score = float(m.group(1))
    if score < 8.0:
        return None

    return {
        "source_name": "IELTS-Simon",
        "source_url": url,
        "topic_prompt": prompt or title or "IELTS Writing Task 2",
        "topic_type": guess_type(prompt or title),
        "essay_content": essay_content,
        "score": score,
        "author": "Simon (ex-IELTS examiner)",
        "word_count": word_count(essay_content),
        "fetched_at": int(datetime.now(timezone.utc).timestamp()),
        "page_title": title,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=25)
    args = parser.parse_args()

    OUT.parent.mkdir(parents=True, exist_ok=True)
    s = session()

    links: list[str] = []
    for hub in HUBS:
        print(f"[simon] hub: {hub}")
        try:
            r = s.get(hub, timeout=30)
            r.raise_for_status()
            found = collect_links(BeautifulSoup(r.text, "lxml"), hub)
            print(f"  found {len(found)}")
            links.extend(found)
            time.sleep(DELAY)
        except Exception as e:  # noqa: BLE001
            print(f"  ✗ {e}")

    seen: set[str] = set()
    unique: list[str] = []
    for u in links:
        k = u.rstrip("/")
        if k not in seen:
            seen.add(k)
            unique.append(u)

    essays: list[dict] = []
    for i, url in enumerate(unique[: args.limit]):
        print(f"[simon] ({i+1}/{min(len(unique), args.limit)}) {url}")
        try:
            time.sleep(DELAY)
            resp = s.get(url, timeout=30)
            resp.raise_for_status()
            item = parse_essay_page(resp.text, url)
            if item:
                essays.append(item)
                print(f"  ✓ score={item['score']} words={item['word_count']}")
            else:
                print("  · skipped")
        except Exception as e:  # noqa: BLE001
            print(f"  ✗ {e}")

    OUT.write_text(json.dumps(essays, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[simon] wrote {len(essays)} essays → {OUT}")


if __name__ == "__main__":
    main()
