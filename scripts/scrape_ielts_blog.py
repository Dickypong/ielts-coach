"""抓取 IELTS-Blog 公开 Band 8/9 范文。

用法：
  python3 scripts/scrape_ielts_blog.py
  python3 scripts/scrape_ielts_blog.py --limit 40 --band 8

输出：data/raw/ielts_blog_essays.json
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
OUT = ROOT / "data" / "raw" / "ielts_blog_essays.json"
HUBS = {
    8: "https://www.ielts-blog.com/ielts-writing-samples/ielts-essay-samples-of-band-8/",
    9: "https://www.ielts-blog.com/ielts-writing-samples/ielts-essay-samples-of-band-9/",
}
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
    if "to what extent" in p or "agree or disagree" in p or "agree/disagree" in p:
        return "观点类"
    if "positive or negative" in p:
        return "观点类"
    if "reason" in p or "solution" in p or "problem" in p:
        return "问题+解决方案"
    return "观点类"


def collect_links(soup: BeautifulSoup, base: str) -> list[str]:
    links: list[str] = []
    for a in soup.select("a[href]"):
        href = a.get("href", "").strip().split("#")[0]
        if not href:
            continue
        full = urljoin(base, href)
        if "ielts-blog.com" not in full:
            continue
        if "/ielts-essays-band-" not in full and "/ielts-essay-" not in full:
            continue
        if "/category/" in full or "samples-of-band" in full:
            continue
        if re.search(r"/ielts-essays-band-[89]/ielts-essay-", full) or re.search(
            r"/ielts-essay-topic-", full
        ):
            links.append(full)
    seen: set[str] = set()
    out: list[str] = []
    for u in links:
        k = u.rstrip("/")
        if k not in seen:
            seen.add(k)
            out.append(u)
    return out


def parse_essay_page(html: str, url: str, default_score: float) -> dict | None:
    soup = BeautifulSoup(html, "lxml")
    title_el = soup.select_one("h1.entry-title, h1")
    title = title_el.get_text(" ", strip=True) if title_el else ""

    content_el = soup.select_one(".entry-content, .post-content, article")
    if not content_el:
        return None
    for bad in content_el.select("script, style, .sharedaddy, .adsbygoogle, .code-block"):
        bad.decompose()

    paragraphs = [
        p.get_text(" ", strip=True)
        for p in content_el.find_all(["p", "blockquote"])
        if p.get_text(strip=True)
    ]
    if not paragraphs:
        return None

    prompt = ""
    essay_paras: list[str] = []
    started = False
    for para in paragraphs:
        lower = para.lower()
        if any(
            k in lower
            for k in (
                "this essay topic was seen",
                "this essay",
                "band score",
                "examiner",
                "click here",
                "subscribe",
                "leave a reply",
                "sample essay",
                "here is the essay",
                "the essay below",
                "sample band",
            )
        ) and word_count(para) < 80:
            if "sample band" in lower:
                started = True
            continue

        if not prompt and (
            "?" in para
            or "agree" in lower
            or "discuss" in lower
            or lower.startswith("some people")
            or "to what extent" in lower
        ) and word_count(para) < 140:
            prompt = para
            continue

        # 范文正文通常从较长段落开始
        if word_count(para) >= 40:
            started = True
        if started:
            essay_paras.append(para)

    essay_content = "\n\n".join(essay_paras).strip()
    if word_count(essay_content) < 180:
        # 兜底：去掉前两段说明后拼接
        essay_content = "\n\n".join(paragraphs[1:]).strip()
    if word_count(essay_content) < 180:
        return None

    score = default_score
    m = re.search(r"band\s*(8(?:\.5)?|9)", title + " " + " ".join(paragraphs[:3]), re.I)
    if m:
        score = float(m.group(1))
    if "band-9" in url:
        score = max(score, 9.0)
    elif "band-8" in url:
        score = max(score, 8.0)
    if score < 8.0:
        return None

    return {
        "source_name": "IELTS-Blog",
        "source_url": url,
        "topic_prompt": prompt or title or "IELTS Writing Task 2",
        "topic_type": guess_type(prompt or title),
        "essay_content": essay_content,
        "score": score,
        "author": "IELTS-Blog Sample",
        "word_count": word_count(essay_content),
        "fetched_at": int(datetime.now(timezone.utc).timestamp()),
        "page_title": title,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=40)
    parser.add_argument("--band", type=int, choices=[8, 9], default=8)
    args = parser.parse_args()

    OUT.parent.mkdir(parents=True, exist_ok=True)
    s = session()
    hub = HUBS[args.band]
    print(f"[blog] hub: {hub}")

    try:
        r = s.get(hub, timeout=40)
        r.raise_for_status()
        links = collect_links(BeautifulSoup(r.text, "lxml"), hub)
    except Exception as e:  # noqa: BLE001
        raise SystemExit(f"hub failed: {e}") from e

    print(f"[blog] candidate links: {len(links)}")
    essays: list[dict] = []
    for i, url in enumerate(links[: args.limit]):
        print(f"[blog] ({i+1}/{min(len(links), args.limit)}) {url}")
        try:
            time.sleep(DELAY)
            resp = s.get(url, timeout=40)
            resp.raise_for_status()
            item = parse_essay_page(resp.text, url, float(args.band))
            if item:
                essays.append(item)
                print(f"  ✓ score={item['score']} words={item['word_count']}")
            else:
                print("  · skipped")
        except Exception as e:  # noqa: BLE001
            print(f"  ✗ {e}")

    # 若已有文件则合并去重
    existing: list[dict] = []
    if OUT.exists():
        try:
            existing = json.loads(OUT.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            existing = []
    by_url = {e.get("source_url"): e for e in existing if e.get("source_url")}
    for e in essays:
        by_url[e["source_url"]] = e
    merged = list(by_url.values())
    OUT.write_text(json.dumps(merged, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[blog] wrote {len(merged)} essays (this run {len(essays)}) → {OUT}")


if __name__ == "__main__":
    main()
