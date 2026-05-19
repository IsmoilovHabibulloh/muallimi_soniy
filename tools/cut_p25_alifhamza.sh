#!/bin/bash
# Cut audio chunks for page 25 bottom — Alif va Hamza chapter intro.
# Source: 37. alif va hamza.mp3 (3:36).
#
# Audio struct (silencedetect -30dB/0.20s; confirmed regions):
#   #1  0.34-1.37  title `الف و همزة`
#   #2-4 1.59-5.96 uzbek explanation (skip)
#   #5  7.26-7.96  f1 alif (ا)
#   #6  9.72-10.49 f2 alif_hamza_a (أ)
#   #7  12.42-13.17 f3 alif_final (ـا)
#   #8  14.90-16.10 f4 alif_hamza_b (إ)
#   #9  19.03-19.79 f5 waw_hamza (ؤ)
#   #10 21.57-22.39 f6 ya_hamza_iso (ئ)
#   #11 24.29-25.07 f7 ya_hamza_fin (ـئ)
#   #12 26.63-27.79 f8 ya_hamza_med (ـئـ)
#   (27.79-31.93 uzbek explanation)
#   #13-14 31.93-32.97 row1 amara
#   #15-16 34.37-35.63 row1 akhadha
#   #17-18 36.97-38.53 row1 qaraa
#   #19-20 39.93-41.87 row1 yaqrau
#   #21-22 44.83-45.93 row2 amara
#   #23-24 47.38-48.70 row2 akhadha
#   #25-26 50.19-51.67 row2 qaraa
#   #27-28 53.08-54.96 row2 yaqrau
#
# NOTE: f9 hamza_alone (ء) NOT FOUND in -30dB silence map. The teacher
# may not have read the standalone hamza, or it's below detection threshold.
# Currently cut as a short slice from 27.95-28.80 (post-f8 tail) — silent.
# User must confirm; if real audio exists elsewhere, replace this cut.

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/public/audio/37. alif va hamza.mp3"
OUT="$ROOT/Materiallar/alif hamza va alif lom/edit_audios/37_alif_hamza"
PUB="$ROOT/public/audio/edit/37_alif_hamza"
FFMPEG="$ROOT/tools/ffmpeg"

mkdir -p "$OUT" "$PUB"

cut() {
    local name="$1" start="$2" end="$3"
    local dur=$(python3 -c "print(round($end - $start, 3))")
    "$FFMPEG" -y -ss "$start" -i "$SRC" -t "$dur" -c:a libmp3lame -b:a 192k -loglevel error "$OUT/$name.mp3"
    printf "  %-30s %6.2fs\n" "$name.mp3" "$dur"
}

echo "=== Page 25 alif va hamza (18 chunks, REMAPPED 2026-05-19) ==="

echo "--- Title (الف و همزة) ---"
cut p25_ah_title 0.25 1.55

echo "--- 9 forms (RTL: ا أ ـا إ ؤ ئ ـئ ـئـ ء) ---"
cut p25_ah_f1_alif         7.18 8.10
cut p25_ah_f2_alif_hamza_a 9.62 10.62
cut p25_ah_f3_alif_final   12.32 13.30
cut p25_ah_f4_alif_hamza_b 14.82 16.22
cut p25_ah_f5_waw_hamza    18.95 19.92
cut p25_ah_f6_ya_hamza_iso 21.48 22.52
cut p25_ah_f7_ya_hamza_fin 24.20 25.20
cut p25_ah_f8_ya_hamza_med 26.55 27.92
# f9 hamza_alone: no clear audio in source — short silent placeholder
cut p25_ah_f9_hamza_alone  27.92 28.65

echo "--- Row 1 (eski imlo): اَمَرَ اَخَذَ قَرَاَ يَقْرَاُ ---"
cut p25_ah_p1_w1_amara     31.83 33.10
cut p25_ah_p1_w2_akhadha   34.30 35.75
cut p25_ah_p1_w3_qaraa     36.90 38.65
cut p25_ah_p1_w4_yaqrau    39.85 42.00

echo "--- Row 2 (yangi imlo): اَمَرَ اَخَذَ قَرَأَ يَقْرَأُ ---"
cut p25_ah_p2_w1_amara     44.78 46.05
cut p25_ah_p2_w2_akhadha   47.30 48.85
cut p25_ah_p2_w3_qaraa     50.10 51.80
cut p25_ah_p2_w4_yaqrau    53.00 55.10

echo ""
echo "=== Copying to public/audio/edit/ ==="
cp "$OUT"/p25_*.mp3 "$PUB/"
echo "Done. Files: $(ls "$PUB"/p25_*.mp3 | wc -l) chunks."
