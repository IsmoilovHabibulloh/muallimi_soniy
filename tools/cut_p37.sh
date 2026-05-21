#!/bin/bash
# Cut audio chunks for page 37 — Surah Ash-Shams (1-15) + start of Surah Al-Layl (1-7 + ayah 8 fragment)
# Sources:
#   Materiallar/suralarning asl nusxalari/audio/58. Shams.mp3 (128.78s)
#   Materiallar/suralarning asl nusxalari/audio/59. Layl.mp3  (172.43s)
#
# Boundaries from silencedetect -32dB/0.30s with ~0.3s buffers either side.
# Shams structure: Bismillah + 15 ayahs = 16 chunks.
# Layl structure (p37 only):  Bismillah + ayahs 1-7 + short fragment "وَأَمَّا" (start of ayah 8) = 9 chunks.

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_SH="$ROOT/Materiallar/suralarning asl nusxalari/audio/58. Shams.mp3"
SRC_LL="$ROOT/Materiallar/suralarning asl nusxalari/audio/59. Layl.mp3"
OUT_SH="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/58_shams"
OUT_LL="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/59_layl"
PUB_SH="$ROOT/public/audio/edit/58_shams"
PUB_LL="$ROOT/public/audio/edit/59_layl"
FFMPEG="ffmpeg"

mkdir -p "$OUT_SH" "$OUT_LL" "$PUB_SH" "$PUB_LL"

cut() {
    local src="$1" out="$2" name="$3" start="$4" end="$5"
    local dur=$(python -c "print(round($end - $start, 3))")
    "$FFMPEG" -y -ss "$start" -i "$src" -t "$dur" -c:a libmp3lame -b:a 192k -loglevel error "$out/$name.mp3"
    echo "  $name.mp3 ($dur s)"
}

echo "=== Surah Ash-Shams — Bismillah + 15 ayahs ==="
cut "$SRC_SH" "$OUT_SH" p37_sh_bismillah   0.700   6.500
cut "$SRC_SH" "$OUT_SH" p37_sh_a1          9.450  13.300
cut "$SRC_SH" "$OUT_SH" p37_sh_a2         14.300  18.650
cut "$SRC_SH" "$OUT_SH" p37_sh_a3         20.300  25.700
cut "$SRC_SH" "$OUT_SH" p37_sh_a4         28.150  33.150
cut "$SRC_SH" "$OUT_SH" p37_sh_a5         35.300  41.100
cut "$SRC_SH" "$OUT_SH" p37_sh_a6         43.150  47.700
cut "$SRC_SH" "$OUT_SH" p37_sh_a7         49.700  55.000
cut "$SRC_SH" "$OUT_SH" p37_sh_a8         57.250  63.800
cut "$SRC_SH" "$OUT_SH" p37_sh_a9         66.700  71.950
cut "$SRC_SH" "$OUT_SH" p37_sh_a10        74.100  79.200
cut "$SRC_SH" "$OUT_SH" p37_sh_a11        81.250  86.250
cut "$SRC_SH" "$OUT_SH" p37_sh_a12        89.000  93.550
cut "$SRC_SH" "$OUT_SH" p37_sh_a13        96.300 105.300
cut "$SRC_SH" "$OUT_SH" p37_sh_a14       108.500 121.350
cut "$SRC_SH" "$OUT_SH" p37_sh_a15       123.850 128.150

echo ""
echo "=== Surah Al-Layl — Bismillah + ayahs 1-7 + ayah 8 start fragment ==="
cut "$SRC_LL" "$OUT_LL" p37_ll_bismillah  1.000   6.400
cut "$SRC_LL" "$OUT_LL" p37_ll_a1         9.400  13.600
cut "$SRC_LL" "$OUT_LL" p37_ll_a2        15.300  19.900
cut "$SRC_LL" "$OUT_LL" p37_ll_a3        21.800  27.500
cut "$SRC_LL" "$OUT_LL" p37_ll_a4        29.800  34.700
cut "$SRC_LL" "$OUT_LL" p37_ll_a5        37.900  43.300
cut "$SRC_LL" "$OUT_LL" p37_ll_a6        45.100  48.800
cut "$SRC_LL" "$OUT_LL" p37_ll_a7        50.800  55.800
# Ayah 8 fragment "وَأَمَّا" — first ~1.1s of ayah 8 (continues to next page in book)
cut "$SRC_LL" "$OUT_LL" p37_ll_a8_start  58.800  60.300

echo ""
echo "=== Copying to public/audio/edit/ ==="
cp "$OUT_SH"/p37_sh_*.mp3 "$PUB_SH/"
cp "$OUT_LL"/p37_ll_*.mp3 "$PUB_LL/"
echo "Shams chunks: $(ls "$PUB_SH"/p37_sh_*.mp3 | wc -l)"
echo "Layl chunks:  $(ls "$PUB_LL"/p37_ll_*.mp3 | wc -l)"
