#!/bin/bash
# Cut 01. muqova.mp3 into per-element chunks.
# Silence detect (-35dB / 0.15s) topgan 3 sound region:
#   A: 0.23 → 1.72  (معلم ثانى)
#   B: 2.86 → 3.40  (ياكى)
#   C: 3.79 → 5.08  (الفباء عربى — ikki so'z, 2 ta sub-region davomli)
# Buffer: -50 ms attack / +100 ms tail.

set -euo pipefail
cd "$(dirname "$0")/.."

SRC="muallimus-soniy/public/audio/01. muqova.mp3"
OUT="Materiallar/muqova/edit_audios/01_muqova"
mkdir -p "$OUT"

cut() {
  local name="$1" start="$2" end="$3"
  local dur
  dur=$(awk "BEGIN { printf \"%.3f\", $end - $start }")
  ./tools/ffmpeg -y -ss "$start" -to "$end" -i "$SRC" \
    -c:a libmp3lame -b:a 192k "$OUT/$name.mp3" 2>/dev/null
  printf "  %-28s %6.3f → %6.3f  (%.3fs)\n" "$name" "$start" "$end" "$dur"
}

echo "Cutting muqova chunks →  $OUT"
cut m01_muallimi_soniy  0.18  1.82
cut m02_yoki            2.81  3.50
cut m03_alifbo_arabiy   3.74  5.18

echo "Deploying → public/audio/edit/01_muqova/"
DEST="muallimus-soniy/public/audio/edit/01_muqova"
mkdir -p "$DEST"
cp "$OUT"/*.mp3 "$DEST"/
echo "Done."
