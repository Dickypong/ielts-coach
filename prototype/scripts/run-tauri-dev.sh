#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."
cargo build --manifest-path src-tauri/Cargo.toml
codesign -s - --force src-tauri/target/debug/ielts-coach || true
exec ./node_modules/.bin/tauri dev "$@"
