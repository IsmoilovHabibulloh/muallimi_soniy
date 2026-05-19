#!/bin/bash
# Cut audio chunks for page 25 — tanvinli tashdid (top section).
# Source: 36. tanvinli tashdid.mp3 (1:57)
# Layout: title + 3 rabb examples + R2-R4 (6 each, simple tanvins) +
# R5-R7 (5 each, color/form-VIII/form-X words with mixed tanvins).
# Boundaries from silencedetect -40dB/0.10s with -50/+100 ms buffer.

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/public/audio/36. tanvinli tashdid.mp3"
OUT="$ROOT/Materiallar/tanvin/edit_audios/36_tanvinli_tashdid"
PUB="$ROOT/public/audio/edit/36_tanvinli_tashdid"
FFMPEG="$ROOT/tools/ffmpeg"

mkdir -p "$OUT" "$PUB"

cut() {
    local name="$1" start="$2" end="$3"
    local dur=$(python3 -c "print(round($end - $start, 3))")
    "$FFMPEG" -y -ss "$start" -i "$SRC" -t "$dur" -c:a libmp3lame -b:a 192k -loglevel error "$OUT/$name.mp3"
    echo "  $name.mp3 ($dur s)"
}

echo "=== Page 25 tanvinli tashdid (37 chunks) ==="

echo "--- Title ---"
cut p25_title 0 2.00

echo "--- R1: 3 rabb examples (source order: rabban → rabbin → rabbun, fatha→kasra→damma) ---"
# Audio file names match content (the spoken word), not source position.
cut p25_r1_w3_rabban 3.40 4.55
cut p25_r1_w2_rabbin 5.78 6.90
cut p25_r1_w1_rabbun 8.10 9.30

echo "--- R2: tanvin fatha, 6 words ---"
cut p25_r2_w1_habban 11.34 12.55
cut p25_r2_w2_barran 13.92 15.10
cut p25_r2_w3_jarran 16.50 17.75
cut p25_r2_w4_massan 19.16 20.40
cut p25_r2_w5_kaffan 22.18 23.35
cut p25_r2_w6_mannan 25.08 26.65

echo "--- R3: tanvin kasra, 6 words ---"
cut p25_r3_w1_sittin 30.18 31.50
cut p25_r3_w2_sirrin 32.64 33.85
cut p25_r3_w3_hillin 35.10 36.35
cut p25_r3_w4_hissin 37.60 38.85
cut p25_r3_w5_izzin  40.00 41.30
cut p25_r3_w6_birrin 42.40 43.70

echo "--- R4: tanvin damma, 6 words ---"
cut p25_r4_w1_durrun  46.70 48.05
cut p25_r4_w2_dhullun 49.43 50.80
cut p25_r4_w3_ummun   52.10 53.70
cut p25_r4_w4_khuffun 55.10 56.35
cut p25_r4_w5_burrun  57.78 59.00
cut p25_r4_w6_kullun  60.27 61.55

echo "--- R5: colors (form II passive participle), 5 words ---"
cut p25_r5_w1_mubayyadan 65.55 67.40
cut p25_r5_w2_musawwadin 68.53 70.35
cut p25_r5_w3_musaffarun 71.62 73.40
cut p25_r5_w4_muhammaran 74.83 76.70
cut p25_r5_w5_mukhaddarin 77.97 79.75

echo "--- R6: form VIII/VII participles, 5 words ---"
cut p25_r6_w1_muhtazzan  82.27 84.05
cut p25_r6_w2_muhtajjin  85.24 87.05
cut p25_r6_w3_munsaddun  88.43 90.70
cut p25_r6_w4_mudtarrin  92.16 94.25
cut p25_r6_w5_mukhtassun 96.06 98.00

echo "--- R7: form X participles, 5 words ---"
cut p25_r7_w1_mustariddan 100.93 102.90
cut p25_r7_w2_mustahibbin 104.30 106.30
cut p25_r7_w3_mustahillun 107.71 109.80
cut p25_r7_w4_mustadillan 111.06 113.10
cut p25_r7_w5_mustaiddin  114.27 117.62

echo ""
echo "=== Copying to public/audio/edit/ ==="
cp "$OUT"/p25_*.mp3 "$PUB/"
echo "Done. Files: $(ls "$PUB"/p25_*.mp3 | wc -l) chunks."
