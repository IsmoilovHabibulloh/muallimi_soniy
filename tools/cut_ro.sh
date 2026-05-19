#!/bin/bash
# Cut 05. ro.mp3 into per-element chunks (3 Ra harakatlari + 3 birikma).
# PDF: 05._ro_rus final.pdf
# Boundaries: silence-detected (-40dB/0.10s) + envelope buffer (-50ms/+100ms).
set -euo pipefail
ROOT="/Users/habibulloh22icloud.com/Desktop/Antigravity/muallimi soniy"
FF="$ROOT/tools/ffmpeg"
SRC="$ROOT/public/audio/05. ro.mp3"
OUT="$ROOT/Materiallar/harflar/edit_audios/05_ro"
mkdir -p "$OUT"

cut() {
  local name="$1" start="$2" end="$3"
  local dur=$(awk "BEGIN{printf \"%.3f\", $end - $start}")
  "$FF" -hide_banner -loglevel error -y -ss "$start" -i "$SRC" -t "$dur" -c:a libmp3lame -b:a 192k "$OUT/$name"
}

# Silence regions (-40dB/0.10s):
#   0-2.038, 2.564-3.446, 3.896-4.619, 5.117-7.927, 8.473-9.933, 10.416-11.783, 12.296-end
# Sound regions (with -50ms / +100ms buffer):
cut "r01_fatha.mp3"  1.988   2.664   # رَ
cut "r02_kasra.mp3"  3.396   3.996   # رِ
cut "r03_damma.mp3"  4.569   5.217   # رُ
cut "r04_ar.mp3"     7.877   8.573   # اَرْ
cut "r05_ir.mp3"     9.883  10.516   # اِرْ
cut "r06_ur.mp3"    11.733  12.396   # اُرْ

echo "OK — $(ls "$OUT"/*.mp3 | wc -l | tr -d ' ') chunks"
