#!/bin/bash
# Cut audio chunks for page 39 — End of Duho (v.11) + Sharh (8) + Tin (8) + Alaq header
# Sources:
#   60. Zuho.mp3   → p39 Duho v.11
#   61. Sharh.mp3  → p39 Sharh bismillah + 8 ayat
#   62. Tiyn.mp3   → p39 Tin bismillah + 8 ayat
#   63. Alaq.mp3   → p39 Alaq bismillah (header only, body on next page)
#
# Boundaries from silencedetect -32dB/0.40s.
#
# Layout (kitob page 39 — suralarning asl nusxalari/39.jpg):
#   - Top: Duho's last verse (v.11)  — "Wa amma bini'mati rabbika fa-haddith"
#   - Sharh (Ash-Sharh) — bismillah + title + 8 ayat
#   - Tin (At-Tin) — bismillah + title + 8 ayat
#   - Alaq (Al-Alaq) — header only (bismillah + title); body on next page

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_ZUHO="$ROOT/public/audio/60. Zuho.mp3"
SRC_SHARH="$ROOT/public/audio/61. Sharh.mp3"
SRC_TIYN="$ROOT/public/audio/62. Tiyn.mp3"
SRC_ALAQ="$ROOT/public/audio/63. Alaq.mp3"

OUT_ZUHO="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/60_zuho"
OUT_SHARH="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/61_sharh"
OUT_TIYN="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/62_tiyn"
OUT_ALAQ="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/63_alaq"

PUB_ZUHO="$ROOT/public/audio/edit/60_zuho"
PUB_SHARH="$ROOT/public/audio/edit/61_sharh"
PUB_TIYN="$ROOT/public/audio/edit/62_tiyn"
PUB_ALAQ="$ROOT/public/audio/edit/63_alaq"

FFMPEG="ffmpeg"

mkdir -p "$OUT_ZUHO" "$OUT_SHARH" "$OUT_TIYN" "$OUT_ALAQ" \
         "$PUB_ZUHO" "$PUB_SHARH" "$PUB_TIYN" "$PUB_ALAQ"

cut() {
    local src="$1" out_dir="$2" name="$3" start="$4" end="$5"
    local dur=$(python -c "print(round($end - $start, 3))")
    "$FFMPEG" -y -ss "$start" -i "$src" -t "$dur" -c:a libmp3lame -b:a 192k -loglevel error "$out_dir/$name.mp3"
    echo "  $name.mp3 ($dur s)"
}

echo "=== Page 39 — Duho v.11 + Sharh + Tin + Alaq header ==="

echo "--- Duho v.11 (from 60. Zuho.mp3) ---"
# v.11: 86.18 → 91.79 (silencedetect)
cut "$SRC_ZUHO" "$OUT_ZUHO" p39_duho_v11   85.98  91.99

echo "--- Sharh (from 61. Sharh.mp3) ---"
# Bismillah: 1.05 → 6.33; 8 ayat
cut "$SRC_SHARH" "$OUT_SHARH" p39_sharh_bism   0.85   6.43
cut "$SRC_SHARH" "$OUT_SHARH" p39_sharh_v1     9.76  13.52
cut "$SRC_SHARH" "$OUT_SHARH" p39_sharh_v2    15.63  20.05
cut "$SRC_SHARH" "$OUT_SHARH" p39_sharh_v3    22.50  28.18
cut "$SRC_SHARH" "$OUT_SHARH" p39_sharh_v4    30.52  34.29
cut "$SRC_SHARH" "$OUT_SHARH" p39_sharh_v5    36.81  41.69
cut "$SRC_SHARH" "$OUT_SHARH" p39_sharh_v6    43.67  48.12
cut "$SRC_SHARH" "$OUT_SHARH" p39_sharh_v7    50.86  55.08
cut "$SRC_SHARH" "$OUT_SHARH" p39_sharh_v8    57.08  60.77

echo "--- Tin (from 62. Tiyn.mp3) ---"
# Bismillah: 1.45 → 6.08; 8 ayat
cut "$SRC_TIYN" "$OUT_TIYN" p39_tin_bism     1.25   6.18
cut "$SRC_TIYN" "$OUT_TIYN" p39_tin_v1       8.74  12.88
cut "$SRC_TIYN" "$OUT_TIYN" p39_tin_v2      14.29  17.75
cut "$SRC_TIYN" "$OUT_TIYN" p39_tin_v3      19.36  24.09
cut "$SRC_TIYN" "$OUT_TIYN" p39_tin_v4      26.39  35.47
cut "$SRC_TIYN" "$OUT_TIYN" p39_tin_v5      38.03  44.81
cut "$SRC_TIYN" "$OUT_TIYN" p39_tin_v6      48.08  60.44
cut "$SRC_TIYN" "$OUT_TIYN" p39_tin_v7      63.70  69.77
cut "$SRC_TIYN" "$OUT_TIYN" p39_tin_v8      72.30  79.23

echo "--- Alaq header (from 63. Alaq.mp3) ---"
# Bismillah: 1.69 → 6.72
cut "$SRC_ALAQ" "$OUT_ALAQ" p39_alaq_bism    1.49   6.82

echo ""
echo "=== Copying to public/audio/edit/ ==="
cp "$OUT_ZUHO"/p39_*.mp3 "$PUB_ZUHO/"
cp "$OUT_SHARH"/p39_*.mp3 "$PUB_SHARH/"
cp "$OUT_TIYN"/p39_*.mp3 "$PUB_TIYN/"
cp "$OUT_ALAQ"/p39_*.mp3 "$PUB_ALAQ/"

TOTAL=$(ls "$PUB_ZUHO"/p39_*.mp3 "$PUB_SHARH"/p39_*.mp3 "$PUB_TIYN"/p39_*.mp3 "$PUB_ALAQ"/p39_*.mp3 2>/dev/null | wc -l)
echo "Done. Total chunks: $TOTAL"
