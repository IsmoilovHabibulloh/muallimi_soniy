#!/bin/bash
# Cut audio chunks for page 29 — Yazilsa-o'qilmaydigan aliflar/lamlar.
# Source: 40. yozilsa-o'qilmaydi.mp3 (5:17 / 317s). Audio covers page 28
# bottom (0-73.5s) and page 29 (76.6s onwards). Page boundary at 73.54-76.58s
# (3.04s silence gap).
#
# Page 29 has 3 sections:
#  Section 1 (76.58-157.41s): Middle aliflar not pronounced.
#    1 narration + 4 rows (5+3+3+3 = 14 words/phrases) = 15 chunks
#  Section 2 (160.50-216.30s): Middle lams not pronounced.
#    1 narration + 3 rows (5+5+4 = 14 words) = 15 chunks
#  Section 3 (216.30-316.55s): With prefix word, both alif & lam not pronounced.
#    1 narration (2-line) + 4 rows (4+4+3+3 = 14 phrases) = 15 chunks
#
# Total: 45 chunks. Boundaries from silencedetect -30dB/0.30s.
# NOTE: timings are silencedetect-based auto-cuts — user should verify by
# listening and adjust if needed.

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/public/audio/40. yozilsa-o'qilmaydi.mp3"
OUT="$ROOT/Materiallar/alif hamza va alif lom/edit_audios/40_yozilsa_oqilmaydi"
PUB="$ROOT/public/audio/edit/40_yozilsa_oqilmaydi"
FFMPEG="$ROOT/tools/ffmpeg"

# Clean previous output to avoid stale files
rm -rf "$OUT" "$PUB"
mkdir -p "$OUT" "$PUB"

cut() {
    local name="$1" start="$2" end="$3"
    local dur=$(python3 -c "print(round($end - $start, 3))")
    "$FFMPEG" -y -ss "$start" -i "$SRC" -t "$dur" -c:a libmp3lame -b:a 192k -loglevel error "$OUT/$name.mp3"
    echo "  $name.mp3 ($dur s)"
}

echo "=== Page 29 yozilsa-oqilmaydi (45 chunks) ==="

echo ""
echo "--- SECTION 1: Middle alif not pronounced ---"
cut p29_s1_title         76.58 119.60

echo "  Row 1: بِالْغَيْبِ وَبِالْاٰخِرَةِ كَالْفَرَاشِ وَالْعَصْرِ وَانْحَرْ"
cut p29_s1_r1_w1_bilghayb    120.40 121.95
cut p29_s1_r1_w2_wabilakhira 122.55 124.45
cut p29_s1_r1_w3_kalfarash   125.10 127.05
cut p29_s1_r1_w4_walasr      127.65 129.65
cut p29_s1_r1_w5_wanhar      130.40 132.35

echo "  Row 2: وَالْمُشْرِكِينَ رَبِّ الْعَالَمِينَ صِرَاطَ الَّذِينَ"
cut p29_s1_r2_w1_walmushrikin 133.05 135.05
cut p29_s1_r2_w2_rabbilalam   135.75 137.75
cut p29_s1_r2_w3_siratalladhin 138.50 140.50

echo "  Row 3: غَيْرِ الْمَغْضُوبِ هُمُ الْمُفْلِحُونَ لَيْلَةُ الْقَدْرِ"
cut p29_s1_r3_w1_ghayrilmaghdub 141.35 143.35
cut p29_s1_r3_w2_humulmuflihun  144.00 146.10
cut p29_s1_r3_w3_laylatulqadr   147.55 149.20

echo "  Row 4: حَذَرَ الْمَوْتِ وَاِذَا اسْتَسْقَى اَنْفُسَكُمُ اسْتَكْبَرْتُمْ"
cut p29_s1_r4_w1_hadharalmawt    149.80 151.85
cut p29_s1_r4_w2_waidhastasqa    152.65 154.65
cut p29_s1_r4_w3_anfusakumistakbartum 155.25 157.65

echo ""
echo "--- SECTION 2: Middle lam not pronounced ---"
cut p29_s2_title         160.50 170.50

echo "  Row 1: اَلتَّبَعُ اَلثَّمَرُ اَلدَّخَلُ اَلذَّهَبُ اَلرَّصَدُ"
cut p29_s2_r1_w1_attabau   172.00 174.10
cut p29_s2_r1_w2_aththamaru 175.00 177.10
cut p29_s2_r1_w3_addakhalu  177.70 179.80
cut p29_s2_r1_w4_adhdhahabu 180.60 182.65
cut p29_s2_r1_w5_arrasadu   183.55 185.55

echo "  Row 2: اَلزَّبَدُ اَلسَّفَرُ اَلشَّجَرُ اَلصَّفَرُ اَلضَّرَرُ"
cut p29_s2_r2_w1_azzabadu  186.55 188.60
cut p29_s2_r2_w2_assafaru  189.50 191.40
cut p29_s2_r2_w3_ashshajaru 192.40 194.25
cut p29_s2_r2_w4_assofaru   195.50 197.40
cut p29_s2_r2_w5_addhararu  198.65 200.60

echo "  Row 3: اَلطَّلَبُ اَلظَّفَرُ اَللَّهَبُ اَلنَّسَبُ"
cut p29_s2_r3_w1_attalabu   201.85 203.80
cut p29_s2_r3_w2_azhzhafaru 205.20 207.20
cut p29_s2_r3_w3_allahabu   208.30 210.30
cut p29_s2_r3_w4_annasabu   211.55 213.85

echo ""
echo "--- SECTION 3: With prefix word, both alif & lam not pronounced ---"
# Narration is 2-line chig'atoy explanation — longer than other sections
cut p29_s3_title         216.30 232.86

echo "  Row 1: هُوَ التَّبَعُ هُوَ الثَّمَرُ هُوَ الدَّخَلُ هُوَ الذَّهَبُ"
cut p29_s3_r1_w1_huwattabau     234.70 236.80
cut p29_s3_r1_w2_huwaththamaru  238.20 240.00
cut p29_s3_r1_w3_huwaddakhalu   241.50 243.75
cut p29_s3_r1_w4_huwadhdhahabu  245.30 248.05

echo "  Row 2: هُوَ الرَّصَدُ هُوَ الزَّبَدُ هُوَ السَّفَرُ هُوَ الشَّجَرُ"
cut p29_s3_r2_w1_huwarrasadu   249.85 252.75
cut p29_s3_r2_w2_huwazzabadu   254.55 256.75
cut p29_s3_r2_w3_huwassafaru   258.65 260.60
cut p29_s3_r2_w4_huwashshajaru 262.50 265.15

echo "  Row 3: هُوَ الصَّفَرُ هُوَ الضَّرَرُ هُوَ الطَّلَبُ"
cut p29_s3_r3_w1_huwassofaru  266.85 271.70
cut p29_s3_r3_w2_huwaddhararu 273.30 275.80
cut p29_s3_r3_w3_huwattalabu  277.15 279.55

echo "  Row 4: هُوَ الظَّفَرُ هُوَ اللَّهَبُ هُوَ النَّسَبُ"
cut p29_s3_r4_w1_huwazhzhafaru 280.85 286.05
cut p29_s3_r4_w2_huwallahabu   288.00 293.30
cut p29_s3_r4_w3_huwannasabu   295.45 316.60

echo ""
echo "=== Copying to public/audio/edit/40_yozilsa_oqilmaydi/ ==="
cp "$OUT"/p29_*.mp3 "$PUB/"
echo "Done. Files: $(ls "$PUB"/p29_*.mp3 | wc -l) chunks."
