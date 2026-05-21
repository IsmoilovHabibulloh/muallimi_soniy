#!/bin/bash
# Cut audio chunks for page 38 — Surah Al-Layl (8-21, continuation) + Surah Ad-Duha (1-10).
# Sources:
#   Materiallar/suralarning asl nusxalari/audio/59. Layl.mp3 (172.43s, 21 ayahs)
#   Materiallar/suralarning asl nusxalari/audio/60. Zuho.mp3 (92.81s, 11 ayahs)
#
# Page 38 layout:
#   Top:    Al-Layl ayahs 8-21 (14 chunks, continuation from p37)
#   Middle: Surah Ad-Duha divider (title + bismillah)
#   Bottom: Ad-Duha ayahs 1-10 (10 chunks; ayah 11 is on p39)
#
# Boundaries from silencedetect -32dB/0.70s with ~0.20s buffers either side.

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_LL="$ROOT/Materiallar/suralarning asl nusxalari/audio/59. Layl.mp3"
SRC_ZH="$ROOT/Materiallar/suralarning asl nusxalari/audio/60. Zuho.mp3"
OUT_LL="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/59_layl"
OUT_ZH="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/60_zuho"
PUB_LL="$ROOT/public/audio/edit/59_layl"
PUB_ZH="$ROOT/public/audio/edit/60_zuho"
FFMPEG="ffmpeg"

mkdir -p "$OUT_LL" "$OUT_ZH" "$PUB_LL" "$PUB_ZH"

cut() {
    local src="$1" out="$2" name="$3" start="$4" end="$5"
    local dur=$(python -c "print(round($end - $start, 3))")
    "$FFMPEG" -y -ss "$start" -i "$src" -t "$dur" -c:a libmp3lame -b:a 192k -loglevel error "$out/$name.mp3"
    echo "  $name.mp3 ($dur s)"
}

echo "=== Surah Al-Layl — ayahs 8-21 (page 38 continuation) ==="
cut "$SRC_LL" "$OUT_LL" p38_ll_a8    58.850  64.650
cut "$SRC_LL" "$OUT_LL" p38_ll_a9    66.700  70.150
cut "$SRC_LL" "$OUT_LL" p38_ll_a10   72.250  76.900
cut "$SRC_LL" "$OUT_LL" p38_ll_a11   79.450  87.300
cut "$SRC_LL" "$OUT_LL" p38_ll_a12   90.300  94.700
cut "$SRC_LL" "$OUT_LL" p38_ll_a13   97.100 103.400
cut "$SRC_LL" "$OUT_LL" p38_ll_a14  106.400 112.500
cut "$SRC_LL" "$OUT_LL" p38_ll_a15  114.900 121.350
cut "$SRC_LL" "$OUT_LL" p38_ll_a16  123.900 128.250
cut "$SRC_LL" "$OUT_LL" p38_ll_a17  130.300 134.800
cut "$SRC_LL" "$OUT_LL" p38_ll_a18  137.650 143.650
cut "$SRC_LL" "$OUT_LL" p38_ll_a19  147.350 156.350
cut "$SRC_LL" "$OUT_LL" p38_ll_a20  158.700 166.050
cut "$SRC_LL" "$OUT_LL" p38_ll_a21  167.800 170.950

echo ""
echo "=== Surah Ad-Duha — Bismillah + ayahs 1-10 ==="
cut "$SRC_ZH" "$OUT_ZH" p38_zh_bismillah   1.150   6.100
cut "$SRC_ZH" "$OUT_ZH" p38_zh_a1          8.450  10.350
cut "$SRC_ZH" "$OUT_ZH" p38_zh_a2         11.850  15.300
cut "$SRC_ZH" "$OUT_ZH" p38_zh_a3         16.850  21.750
cut "$SRC_ZH" "$OUT_ZH" p38_zh_a4         24.050  30.300
cut "$SRC_ZH" "$OUT_ZH" p38_zh_a5         32.850  38.700
cut "$SRC_ZH" "$OUT_ZH" p38_zh_a6         41.900  47.350
cut "$SRC_ZH" "$OUT_ZH" p38_zh_a7         50.800  57.950
cut "$SRC_ZH" "$OUT_ZH" p38_zh_a8         60.400  66.800
cut "$SRC_ZH" "$OUT_ZH" p38_zh_a9         69.800  74.950
cut "$SRC_ZH" "$OUT_ZH" p38_zh_a10        77.500  83.800

echo ""
echo "=== Copying to public/audio/edit/ ==="
cp "$OUT_LL"/p38_ll_*.mp3 "$PUB_LL/"
cp "$OUT_ZH"/p38_zh_*.mp3 "$PUB_ZH/"
echo "Layl chunks:  $(ls "$PUB_LL"/p38_ll_*.mp3 | wc -l)"
echo "Zuho chunks:  $(ls "$PUB_ZH"/p38_zh_*.mp3 | wc -l)"
