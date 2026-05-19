#!/bin/bash
# Cut audio chunks for page 28 — Yaa Alifiyya + Vav Alifiyya + Yozilsada o'qilmaydi.
# Sources:
#   - 39. yoz-o'qiladigan.mp3 (3:07) — Block 1 (Yaa) + Block 2 (Vav)
#   - 40. yozilsa-o'qilmaydi.mp3 (5:17, first ~55s) — Block 3 (Yozilsada o'qilmaydi)
#
# Boundaries from silencedetect -32dB/0.30s analysis with safety buffers (-50/+100ms).
# First-pass timing — needs user verification by playback in app.

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC39="$ROOT/public/audio/39. yoz-o'qiladigan.mp3"
SRC40="$ROOT/public/audio/40. yozilsa-o'qilmaydi.mp3"
OUT39="$ROOT/Materiallar/alif hamza va alif lom/edit_audios/39_yoz_oqiladigan"
OUT40="$ROOT/Materiallar/alif hamza va alif lom/edit_audios/40_yozilsa_oqilmaydi"
PUB39="$ROOT/public/audio/edit/39_yoz_oqiladigan"
PUB40="$ROOT/public/audio/edit/40_yozilsa_oqilmaydi"
FFMPEG="$ROOT/tools/ffmpeg"

mkdir -p "$OUT39" "$OUT40" "$PUB39" "$PUB40"

cut() {
    local src="$1" out="$2" name="$3" start="$4" end="$5"
    local dur=$(python3 -c "print(round($end - $start, 3))")
    "$FFMPEG" -y -ss "$start" -i "$src" -t "$dur" -c:a libmp3lame -b:a 192k -loglevel error "$out/$name.mp3"
    echo "  $name.mp3 ($dur s)"
}

c39() { cut "$SRC39" "$OUT39" "$1" "$2" "$3"; }
c40() { cut "$SRC40" "$OUT40" "$1" "$2" "$3"; }

echo "=== 39. yoz-o'qiladigan (Block 1 Yaa + Block 2 Vav) ==="

echo "--- Block 1 intro (Yaa Alifiyya title + narration 1) ---"
c39 p28_b1_intro 0.0 12.10

echo "--- Row 1: اِلى عَلى لَدى مَتى اَنّى حَتّى ---"
c39 p28_r1_w1_ila    12.60 14.50
c39 p28_r1_w2_ala    15.10 17.25
c39 p28_r1_w3_lada   17.75 19.80
c39 p28_r1_w4_mata   20.10 22.05
c39 p28_r1_w5_anna   22.60 24.55
c39 p28_r1_w6_hatta  25.20 29.45

echo "--- Row 2: عِيسى مُوسى اَعْلى تَعالى شَتّى ---"
c39 p28_r2_w1_isa    29.85 31.80
c39 p28_r2_w2_musa   32.60 34.40
c39 p28_r2_w3_ala2   35.10 36.95
c39 p28_r2_w4_taala  37.60 39.50
c39 p28_r2_w5_shatta 40.10 42.75

echo "--- Row 3: يَحْيى مُرْتَضى يَتَزَكّى فَتَرْضى ---"
c39 p28_r3_w1_yahya     43.30 45.95
c39 p28_r3_w2_murtada   46.55 49.20
c39 p28_r3_w3_yatazakka 49.70 51.85
c39 p28_r3_w4_fatarda   52.60 54.70

echo "--- Block 1 sub-narration (subtitle 2: 'shuningdek...') ---"
c39 p28_b1_sub 55.30 59.50

echo "--- Row 4: سَوَّيهَا دَسَّيهَا زَكَّيهَا فَسَوَّيهَا عُقْبَيهَا ---"
c39 p28_r4_w1_sawwayha   59.40 61.00
c39 p28_r4_w2_dassayha   61.90 63.30
c39 p28_r4_w3_zakkayha   63.80 65.85
c39 p28_r4_w4_fasawwayha 66.50 68.65
c39 p28_r4_w5_uqbayha    69.30 71.85

echo "--- Block 2 intro (Vav Alifiyya title + narration) ---"
c39 p28_b2_intro 77.50 88.80

echo "--- Row 5: صَلٰوةٌ زَكٰوةٌ ذَكٰوةٌ حَيٰوةٌ غَدٰوةٌ رِبٰوا ---"
c39 p28_r5_w1_salat   89.10 91.85
c39 p28_r5_w2_zakat   92.50 94.50
c39 p28_r5_w3_dhakat  95.80 97.50
c39 p28_r5_w4_hayat   98.65 100.95
c39 p28_r5_w5_ghadat  102.70 104.50
c39 p28_r5_w6_riba    105.30 108.70

echo ""
echo "=== 40. yozilsa-o'qilmaydi (Block 3) ==="

echo "--- Block 3 intro (Yozilsada o'qilmaydigan harflar title) ---"
c40 p28_b3_title 0.0 2.95

echo "--- Block 3 narration 1 (sub-subtitle 1) ---"
c40 p28_b3_sub1 4.20 17.30

echo "--- Row 6: اُولُو اُولى اُولاَتِ اُولاَءِ اُولئك ---"
c40 p28_r6_w1_ulu    18.20 20.10
c40 p28_r6_w2_ula    20.95 23.10
c40 p28_r6_w3_ulati  29.80 31.55
c40 p28_r6_w4_ulai   31.80 34.30
c40 p28_r6_w5_ulaika 37.10 38.60

echo "--- Block 3 narration 2 (sub-subtitle 2) ---"
c40 p28_b3_sub2 50.00 55.20

echo "--- Row 7: اَمَنُوا اَمِنُوا قَالُوا اِعْلَمُوا اِعْمَلُوا ---"
c40 p28_r7_w1_amanu   39.45 40.95
c40 p28_r7_w2_aminu   41.75 43.10
c40 p28_r7_w3_qalu    44.15 45.70
c40 p28_r7_w4_ilamu   46.55 48.20
c40 p28_r7_w5_imalu   57.10 58.90

echo ""
echo "=== Copying to public/audio/edit/ ==="
cp "$OUT39"/p28_*.mp3 "$PUB39/"
cp "$OUT40"/p28_*.mp3 "$PUB40/"
echo "Done."
echo "  39_yoz_oqiladigan/: $(ls "$PUB39"/p28_*.mp3 2>/dev/null | wc -l) chunks"
echo "  40_yozilsa_oqilmaydi/: $(ls "$PUB40"/p28_*.mp3 2>/dev/null | wc -l) chunks"
