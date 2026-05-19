#!/bin/bash
# Cut 04. harakat.mp3 into per-element chunks (3 harakatlar).
# Boundaries from silence detection (-40dB, 0.10s) + envelope buffer.
set -euo pipefail
ROOT="/Users/habibulloh22icloud.com/Desktop/Antigravity/muallimi soniy"
FF="$ROOT/tools/ffmpeg"
SRC="$ROOT/public/audio/04. harakat.mp3"
OUT="$ROOT/Materiallar/harflar/edit_audios/04_harakat"
mkdir -p "$OUT"

cut() {
  local name="$1" start="$2" end="$3"
  local dur=$(awk "BEGIN{printf \"%.3f\", $end - $start}")
  "$FF" -hide_banner -loglevel error -y -ss "$start" -i "$SRC" -t "$dur" -c:a libmp3lame -b:a 192k "$OUT/$name"
}

# Silence-detected boundaries with -50ms / +100ms envelope buffer:
cut "h01_fatha.mp3"  2.959  3.466    # اَ : sound 3.009-3.366
cut "h02_kasra.mp3"  4.163  4.684    # اِ : sound 4.213-4.584
cut "h03_damma.mp3"  5.412  5.953    # اُ : sound 5.462-5.853

echo "OK — $(ls "$OUT"/*.mp3 | wc -l | tr -d ' ') chunks"
