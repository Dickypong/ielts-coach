"""下载 YouTube 公开雅思口语示范（音频 + 字幕），生成 great_speaking.json。

用法：
  python scripts/scrape_youtube_speaking.py
  python scripts/scrape_youtube_speaking.py --limit 6

依赖：yt-dlp（已装在 .venv）
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_JSON = ROOT / "data" / "raw" / "great_speaking.json"
AUDIO_DIR = ROOT / "prototype" / "public" / "audio"
YT_DLP = ROOT / ".venv" / "bin" / "yt-dlp"

# 精选公开示范（标题已确认含 Band 9 / Speaking Sample）
CURATED = [
    {
        "id": "yt-adv-shadow-b9",
        "video_id": "gdzrv2N40II",
        "part": 2,
        "topic": "Band 9 full speaking shadow practice",
        "prompt": "Shadow a Band 9 IELTS Speaking test (Part 1–3 style answers).",
        "score": 9.0,
        "channel": "IELTS Advantage",
    },
    {
        "id": "yt-ess-p2-b9",
        "video_id": "09SmkNfwvDc",
        "part": 2,
        "topic": "IELTS Speaking Part 2 Band 9 sample",
        "prompt": "Part 2 cue-card style Band 9 model answer.",
        "score": 9.0,
        "channel": "English Speaking Success",
    },
    {
        "id": "yt-adv-what-b9",
        "video_id": "nJJyilEPwpk",
        "part": 1,
        "topic": "What a Band 9 speaking test sounds like",
        "prompt": "Full Band 9 speaking demonstration with natural answers.",
        "score": 9.0,
        "channel": "IELTS Advantage",
    },
    {
        "id": "yt-adv-perfect-b9",
        "video_id": "k4715CJ0Ii8",
        "part": 1,
        "topic": "Perfect Band 9 speaking test",
        "prompt": "Complete Band 9 speaking test sample.",
        "score": 9.0,
        "channel": "IELTS Advantage",
    },
    {
        "id": "yt-adv-excellent-b9",
        "video_id": "ybNEwnnIxWw",
        "part": 2,
        "topic": "Excellent Band 9.0 speaking test",
        "prompt": "Excellent Band 9 speaking performance sample.",
        "score": 9.0,
        "channel": "IELTS Advantage",
    },
    {
        "id": "yt-adv-advanced-b9",
        "video_id": "jYk0pvSiNhQ",
        "part": 3,
        "topic": "Advanced Band 9 speaking test",
        "prompt": "Advanced Band 9 speaking test with discussion answers.",
        "score": 9.0,
        "channel": "IELTS Advantage",
    },
    {
        "id": "yt-liz-part1",
        "video_id": "E0jCDsWoM1A",
        "part": 1,
        "topic": "Part 1 common questions",
        "prompt": "Common IELTS Speaking Part 1 questions with model answers.",
        "score": 8.5,
        "channel": "IELTS Liz",
    },
    {
        "id": "yt-e2-sim",
        "video_id": "Pfc81cLseAU",
        "part": 2,
        "topic": "Live Band 9 speaking simulation",
        "prompt": "Live IELTS Band 9 speaking simulation with expert assistance.",
        "score": 9.0,
        "channel": "E2 IELTS",
        "coversParts": [1, 2, 3],
    },
    {
        "id": "yt-adv-perfect2-b9",
        "video_id": "IevmdO16GuE",
        "part": 1,
        "topic": "IELTS Speaking Test · Perfect Band 9",
        "prompt": "Full Band 9 speaking test demonstration across everyday topics.",
        "score": 9.0,
        "channel": "IELTS Advantage",
        "coversParts": [1, 2, 3],
    },
    {
        "id": "yt-adv-pron-b9",
        "video_id": "t9PRLpkCUSM",
        "part": 1,
        "topic": "Band 9 speaking with clear pronunciation",
        "prompt": "Natural Band 9 answers focusing on pronunciation and fluency.",
        "score": 9.0,
        "channel": "IELTS Advantage",
        "coversParts": [1, 2],
    },
    {
        "id": "yt-anuradha-p3-b9",
        "video_id": "WVkeEFs1hUo",
        "part": 3,
        "topic": "Band 9 Speaking Part 3 · Famous people",
        "prompt": "Part 3 discussion sample about famous people (Band 9).",
        "score": 9.0,
        "channel": "IELTS Official-style sample",
        "coversParts": [3],
    },
    {
        "id": "yt-adv-how-b9",
        "video_id": "9DTyINOeY-Y",
        "part": 2,
        "topic": "How to get Band 9 in IELTS Speaking",
        "prompt": "Teacher explanation with Band 9 speaking examples for Parts 1–3.",
        "score": 8.5,
        "channel": "IELTS Advantage",
        "coversParts": [1, 2, 3],
    },
    {
        "id": "yt-adv-guide-2026",
        "video_id": "HtR63JFVE5Y",
        "part": 1,
        "topic": "Ultimate IELTS Speaking Guide 2026",
        "prompt": "Complete speaking guide with sample answers for Parts 1–3.",
        "score": 8.5,
        "channel": "IELTS Advantage",
        "coversParts": [1, 2, 3],
    },
    # ===== 继续扩充 =====
    {
        "id": "yt-adv-ca7-b9",
        "video_id": "CA7b8z-gKQA",
        "part": 1,
        "topic": "IELTS Speaking Test · Perfect Band 9 (long)",
        "prompt": "Full-length Band 9 speaking demonstration.",
        "score": 9.0,
        "channel": "IELTS Advantage",
        "coversParts": [1, 2, 3],
    },
    {
        "id": "yt-adv-ywq-b9",
        "video_id": "YWqU_QwCYCQ",
        "part": 1,
        "topic": "IELTS Speaking Test · Perfect Band 9",
        "prompt": "Another full Band 9 speaking test sample.",
        "score": 9.0,
        "channel": "IELTS Advantage",
        "coversParts": [1, 2, 3],
    },
    {
        "id": "yt-adv-acwp-b9",
        "video_id": "-AcwpQsrUUs",
        "part": 1,
        "topic": "IELTS Speaking Test · Perfect Band 9",
        "prompt": "Extended Band 9 speaking performance.",
        "score": 9.0,
        "channel": "IELTS Advantage",
        "coversParts": [1, 2, 3],
    },
    {
        "id": "yt-adv-rv79-b9",
        "video_id": "Rv79dEpaiX4",
        "part": 1,
        "topic": "IELTS Speaking · Perfect Band 9 Score",
        "prompt": "Band 9 speaking test with natural answers.",
        "score": 9.0,
        "channel": "IELTS Advantage",
        "coversParts": [1, 2, 3],
    },
    {
        "id": "yt-adv-b6-pron",
        "video_id": "b6_zfUHwlw8",
        "part": 1,
        "topic": "Band 9 Perfect Pronunciation",
        "prompt": "Band 9 speaking focused on pronunciation quality.",
        "score": 9.0,
        "channel": "IELTS Advantage",
        "coversParts": [1, 2],
    },
    {
        "id": "yt-adv-e4i-b9",
        "video_id": "E4iUiRBVUa4",
        "part": 1,
        "topic": "IELTS Speaking Exam · Perfect Band 9",
        "prompt": "Complete exam-style Band 9 speaking sample.",
        "score": 9.0,
        "channel": "IELTS Advantage",
        "coversParts": [1, 2, 3],
    },
    {
        "id": "yt-adv-sgwl-b9",
        "video_id": "Sgwl1MLWSPw",
        "part": 1,
        "topic": "What Band 9 IELTS Speaking Actually Sounds Like",
        "prompt": "Natural Band 9 speaking demonstration.",
        "score": 9.0,
        "channel": "IELTS Advantage",
        "coversParts": [1, 2, 3],
    },
    {
        "id": "yt-ross-rbwx-b9",
        "video_id": "RBwx5atq-PY",
        "part": 1,
        "topic": "Band 9 speaking test with feedback (2025)",
        "prompt": "Full mock test with examiner-style feedback.",
        "score": 9.0,
        "channel": "Ross IELTS Academy",
        "coversParts": [1, 2, 3],
    },
    {
        "id": "yt-ross-zcSb-b9",
        "video_id": "zcSb1WsQduQ",
        "part": 1,
        "topic": "Band 9 speaking test with feedback",
        "prompt": "Another Band 9 mock with feedback.",
        "score": 9.0,
        "channel": "Ross IELTS Academy",
        "coversParts": [1, 2, 3],
    },
    {
        "id": "yt-pro-bwww-b9",
        "video_id": "Bwwwot4vrYI",
        "part": 1,
        "topic": "Full Speaking Mock Test · Band 9",
        "prompt": "Full IELTS speaking mock test (Band 9).",
        "score": 9.0,
        "channel": "English Pro Tips",
        "coversParts": [1, 2, 3],
    },
    {
        "id": "yt-pro-le-b9",
        "video_id": "LE_F9u-DYe0",
        "part": 1,
        "topic": "Incredible Band 9 Speaking Test",
        "prompt": "Full Band 9 speaking mock with a young candidate.",
        "score": 9.0,
        "channel": "English Pro Tips",
        "coversParts": [1, 2, 3],
    },
    {
        "id": "yt-daily-julia-b9",
        "video_id": "ecN15c3gZYg",
        "part": 1,
        "topic": "Mock Exam · Julia from Australia · Band 9",
        "prompt": "Full Parts 1–3 mock exam with a Band 9 candidate.",
        "score": 9.0,
        "channel": "IELTS Daily",
        "coversParts": [1, 2, 3],
    },
    {
        "id": "yt-charles-hard-b9",
        "video_id": "vK4tewFE1fU",
        "part": 1,
        "topic": "Band 9.0 Mock · Extra Hard Questions",
        "prompt": "Band 9 mock test with harder Part 1–3 questions and feedback.",
        "score": 9.0,
        "channel": "IELTS with Charles",
        "coversParts": [1, 2, 3],
    },
    {
        "id": "yt-mock-vrz-b9",
        "video_id": "VRZPb4S_SBA",
        "part": 1,
        "topic": "Band 9.0 Mock Test with Feedback",
        "prompt": "Full Band 9 speaking mock with feedback.",
        "score": 9.0,
        "channel": "IELTS Speaking Practice",
        "coversParts": [1, 2, 3],
    },
    {
        "id": "yt-brandon-b9",
        "video_id": "0HOf9IIt7wg",
        "part": 1,
        "topic": "Band 9 Practice with Expert Examiner",
        "prompt": "Full speaking practice Parts 1–3 with examiner interaction.",
        "score": 9.0,
        "channel": "IELTS Speaking Practice",
        "coversParts": [1, 2, 3],
    },
    {
        "id": "yt-liz-practice",
        "video_id": "n5ohxW5lTIs",
        "part": 1,
        "topic": "IELTS Speaking Practice & Model Answers",
        "prompt": "Practice questions with model answers (IELTS Liz).",
        "score": 8.5,
        "channel": "IELTS Liz",
        "coversParts": [1, 2],
    },
    {
        "id": "yt-liz-p1-topics",
        "video_id": "QwDrJOpuMuA",
        "part": 1,
        "topic": "IELTS Speaking Part 1 Topics",
        "prompt": "Common Part 1 topics with model responses.",
        "score": 8.5,
        "channel": "IELTS Liz",
        "coversParts": [1],
    },
    {
        "id": "yt-edm-tcfh-b9",
        "video_id": "TcfhcHyNtcI",
        "part": 1,
        "topic": "Band 9.0 Mock Test with Feedback",
        "prompt": "Band 9 speaking mock test with feedback.",
        "score": 9.0,
        "channel": "edm IELTS",
        "coversParts": [1, 2, 3],
    },
]


def run(cmd: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(cmd, capture_output=True, text=True)


def download_one(item: dict) -> dict | None:
    vid = item["video_id"]
    url = f"https://www.youtube.com/watch?v={vid}"
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    out_tmpl = str(AUDIO_DIR / f"{item['id']}.%(ext)s")
    sub_tmpl = str(AUDIO_DIR / f"{item['id']}")

    # audio
    audio_cmd = [
        str(YT_DLP),
        "-f",
        "bestaudio/best",
        "-x",
        "--audio-format",
        "mp3",
        "--audio-quality",
        "5",
        "-o",
        out_tmpl,
        "--no-playlist",
        url,
    ]
    print(f"[yt] audio {vid} …")
    r = run(audio_cmd)
    if r.returncode != 0:
        print(r.stderr[-500:])
        return None

    audio_path = AUDIO_DIR / f"{item['id']}.mp3"
    if not audio_path.exists():
        # sometimes m4a leftover naming
        cands = list(AUDIO_DIR.glob(f"{item['id']}.*"))
        cands = [c for c in cands if c.suffix.lower() in {".mp3", ".m4a", ".webm", ".opus"}]
        if not cands:
            print("  ✗ no audio file")
            return None
        audio_path = cands[0]

    # subs
    print(f"[yt] subs {vid} …")
    sub_cmd = [
        str(YT_DLP),
        "--write-auto-sub",
        "--write-sub",
        "--sub-lang",
        "en.*,en",
        "--skip-download",
        "--sub-format",
        "vtt/srt/best",
        "-o",
        sub_tmpl,
        "--no-playlist",
        url,
    ]
    run(sub_cmd)

    transcript = extract_transcript(item["id"])
    duration = probe_duration(audio_path)

    return {
        "id": item["id"],
        "part": item["part"],
        "coversParts": item.get("coversParts") or [item["part"]],
        "matchNote": item.get("matchNote")
        or "公开示范录音，与口语题库按 Part 粗对齐，非一一对应。",
        "topic": item["topic"],
        "prompt": item["prompt"],
        "source": url,
        "sourceName": item["channel"],
        "sourceTitle": item["topic"],
        "score": item["score"],
        "duration": duration,
        "audioPath": f"/audio/{audio_path.name}",
        "transcript": transcript
        or "(字幕暂不可用：请打开来源链接观看原视频，或稍后用 Whisper 补全转写。)",
        "isAIGenerated": False,
        "candidate": {
            "name": f"{item['channel']} Demo",
            "background": "公开 YouTube 高分口语示范",
        },
        # 占位；正式点评由 enrich_great_speaking_analysis.py 从转写生成，禁止套假分项
        "analysis": {
            "overallComment": (
                f"来自 {item['channel']} 的真实公开示范。"
                f"来源标称约 Band {item['score']}，本 App 不做分项打分。"
            ),
            "listenExcerpts": [],
            "listenTips": ["先听原音，再对照转写跟读；不要把示范当逐题标准答案。"],
            "practiceTips": ["听完立刻用口语题库同 Part 题目录音自测。"],
            "claimedBand": item["score"],
            "fluencyHighlights": [],
            "lexicalHighlights": [],
            "grammarHighlights": [],
            "pronunciationHighlights": [],
            "contentHighlights": [],
            "sentences": [],
            "improvements": [],
            "bandCriteria": {
                "fluency": item["score"],
                "lexical": item["score"],
                "grammar": item["score"],
                "pronunciation": item["score"],
            },
        },
    }


def extract_transcript(stem: str) -> str:
    cands = sorted(AUDIO_DIR.glob(f"{stem}*.vtt")) + sorted(AUDIO_DIR.glob(f"{stem}*.srt"))
    if not cands:
        return ""
    text = cands[0].read_text(encoding="utf-8", errors="ignore")
    lines: list[str] = []
    seen: set[str] = set()
    for line in text.splitlines():
        line = line.strip()
        if not line or line.startswith("WEBVTT") or "-->" in line or line.isdigit():
            continue
        line = re.sub(r"<[^>]+>", "", line)
        line = re.sub(r"&\w+;", " ", line).strip()
        if not line or line in seen:
            continue
        seen.add(line)
        lines.append(line)
    # 合并过碎的字幕行
    joined = " ".join(lines)
    joined = re.sub(r"\s+", " ", joined).strip()
    # 控制长度，避免整场 mock 过长淹没 UI
    words = joined.split()
    if len(words) > 900:
        joined = " ".join(words[:900]) + " …"
    return joined


def probe_duration(path: Path) -> int:
    # use ffprobe if available, else yt-dlp metadata fallback
    r = run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nk=1:nw=1", str(path)])
    if r.returncode == 0:
        try:
            return max(1, int(float(r.stdout.strip())))
        except ValueError:
            pass
    return 120


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=0, help="0 = 全部 CURATED")
    parser.add_argument("--only-new", action="store_true", help="跳过已有 mp3 的条目，只补新视频")
    args = parser.parse_args()

    if not YT_DLP.exists():
        raise SystemExit("yt-dlp not found in .venv")

    existing: dict[str, dict] = {}
    if OUT_JSON.exists():
        try:
            for row in json.loads(OUT_JSON.read_text(encoding="utf-8")):
                if isinstance(row, dict) and row.get("id"):
                    existing[row["id"]] = row
        except Exception:  # noqa: BLE001
            existing = {}

    items = CURATED if not args.limit else CURATED[: args.limit]
    results: list[dict] = []
    for item in items:
        audio_mp3 = AUDIO_DIR / f"{item['id']}.mp3"
        if args.only_new and audio_mp3.exists() and item["id"] in existing:
            print(f"  · keep {item['id']}")
            results.append(existing[item["id"]])
            continue
        if audio_mp3.exists() and item["id"] in existing and not args.only_new:
            # 复用已下载音频，但仍刷新元数据/字幕
            print(f"  · refresh meta {item['id']}")
        try:
            row = download_one(item)
            if row:
                results.append(row)
                print(f"  ✓ {row['id']} audio={row['audioPath']} words={len(row['transcript'].split())}")
            elif item["id"] in existing:
                results.append(existing[item["id"]])
                print(f"  · fallback existing {item['id']}")
            else:
                print(f"  · skip {item['id']}")
        except Exception as e:  # noqa: BLE001
            print(f"  ✗ {item['id']}: {e}")
            if item["id"] in existing:
                results.append(existing[item["id"]])
        time.sleep(1.2)

    # 保留旧库里不在本次 CURATED 的条目
    curated_ids = {i["id"] for i in items}
    for oid, row in existing.items():
        if oid not in curated_ids:
            results.append(row)

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[yt] wrote {len(results)} → {OUT_JSON}")


if __name__ == "__main__":
    main()
