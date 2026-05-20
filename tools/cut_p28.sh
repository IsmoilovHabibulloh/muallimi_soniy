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

# 2026-05-19 REMAPPED — old timestamps were 100s+ off (cutting from start
# instead of post-p27 region at 107s+). R2 audio is read in REVERSE order
# in source (shatta→taala→ala→musa→isa), so r2_* cuts are reverse-mapped.
echo "--- Block 1 intro (Yaa Alifiyya — arabcha sarlavha) ---"
c39 p28_b1_intro 108.50 110.30

echo "--- Row 1: اِلى عَلى لَدى مَتى اَنّى حَتّى ---"
c39 p28_r1_w1_ila    116.45 117.35
c39 p28_r1_w2_ala    117.85 118.85
c39 p28_r1_w3_lada   119.30 120.35
c39 p28_r1_w4_mata   120.80 121.85
c39 p28_r1_w5_anna   122.35 123.90
c39 p28_r1_w6_hatta  124.35 125.75

echo "--- Row 2: REVERSED audio (book RTL→audio LTR) ---"
c39 p28_r2_w1_isa    133.85 135.30   # last in audio = first in book
c39 p28_r2_w2_musa   132.00 133.45
c39 p28_r2_w3_ala2   130.20 131.50   # middle stays
c39 p28_r2_w4_taala  128.20 129.70
c39 p28_r2_w5_shatta 126.20 127.70   # first in audio = last in book

echo "--- Row 3: يَحْيى مُرْتَضى يَتَزَكّى فَتَرْضى ---"
c39 p28_r3_w1_yahya     135.85 137.25
c39 p28_r3_w2_murtada   137.85 139.50
c39 p28_r3_w3_yatazakka 140.15 142.00
c39 p28_r3_w4_fatarda   142.60 144.20

echo "--- Row 4: سَوَّيهَا دَسَّيهَا زَكَّيهَا فَسَوَّيهَا عُقْبَيهَا ---"
c39 p28_r4_w1_sawwayha   150.15 152.20
c39 p28_r4_w2_dassayha   152.85 155.00
c39 p28_r4_w3_zakkayha   155.60 157.85
c39 p28_r4_w4_fasawwayha 158.55 160.75
c39 p28_r4_w5_uqbayha    161.40 163.45

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
