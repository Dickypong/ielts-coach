"""初始化 SQLite schema（见 docs/02-tech-architecture.md）。"""

from __future__ import annotations

import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "data" / "db" / "ielts_coach.db"

SCHEMA = """
CREATE TABLE IF NOT EXISTS writing_topics (
  id TEXT PRIMARY KEY,
  book INTEGER NOT NULL,
  test INTEGER NOT NULL,
  exam_date TEXT,
  task INTEGER NOT NULL,
  prompt TEXT NOT NULL,
  type TEXT NOT NULL,
  tags TEXT,
  difficulty TEXT,
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS essays (
  id TEXT PRIMARY KEY,
  topic_id TEXT NOT NULL,
  score REAL NOT NULL,
  author TEXT,
  source TEXT NOT NULL,
  source_name TEXT,
  word_count INTEGER,
  time_spent INTEGER,
  content TEXT NOT NULL,
  analysis_json TEXT NOT NULL,
  fetched_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (topic_id) REFERENCES writing_topics(id)
);

CREATE TABLE IF NOT EXISTS great_speaking (
  id TEXT PRIMARY KEY,
  part INTEGER NOT NULL,
  topic TEXT NOT NULL,
  prompt TEXT,
  source TEXT NOT NULL,
  source_title TEXT,
  score REAL NOT NULL,
  duration INTEGER,
  audio_path TEXT,
  transcript TEXT NOT NULL,
  analysis_json TEXT NOT NULL,
  fetched_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS user_essays (
  id TEXT PRIMARY KEY,
  topic_id TEXT,
  content TEXT NOT NULL,
  word_count INTEGER,
  evaluation_json TEXT,
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS user_recordings (
  id TEXT PRIMARY KEY,
  topic_id TEXT,
  audio_path TEXT NOT NULL,
  duration INTEGER,
  transcript TEXT,
  evaluation_json TEXT,
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_essays_topic ON essays(topic_id);
CREATE INDEX IF NOT EXISTS idx_user_essays_date ON user_essays(created_at DESC);
"""


def main() -> None:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    try:
        conn.executescript(SCHEMA)
        conn.commit()
        print(f"✓ database ready: {DB_PATH}")
    finally:
        conn.close()


if __name__ == "__main__":
    main()
