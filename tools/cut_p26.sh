#!/bin/bash
# Cut audio chunks for page 26 — hamza misollari.
# Source: 37. alif va hamza.mp3 (3:36) — page 26 starts ~59s (after p25 ends ~55s).
# Layout:
#   Top (10 visual rows — R3-R9 numbered + 3 unnumbered continuations):
#     R3 (eski, 4 words): yaʔmuru-style without explicit hamza
#     R4 (yangi, 4 words): same words with explicit hamza
#     R5 (4 words): quri'a-style — hamza-on-ya at end (-i')
#     R6 (5 words): yu'minu-style — hamza-on-waw
#     R7 (5 words): qaa'il-style — hamza-on-ya middle after long alif
#     R8 (5 words): bi'sa-style — hamza-on-ya middle (sukun)
#     R9 (5 words): shaa'a-style — hamza after long alif at end
#     C1 (5 words): shay'-style — hamza at word end after fatha+sukun-ya
#     C2 (6 words): hamza at end after vowel — VISUAL ONLY (no individual audio)
#     C3 (5 words): suu'-style — hamza after long waw — VISUAL ONLY
#   Bottom (2 rows after divider):
#     Rb1 (4 words): al-mar'/imra'an/imri'in/imru'un — declension of mar' with hamza
#     Rb2 (4 words): al-juz'/juz'aha/juz'iha/juz'uha — possessive with hamza
#
# Audio reads: R3-R9 + C1 individually. C2/C3 reuse a short shared "sample"
# chunk (1 segment in audio at 186.35-188.75). Bottom 2 rows fully read.
# Boundaries from silencedetect -35dB/0.30s with -100/+150 ms buffer.

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
    echo "  $name.mp3 ($dur s)"
}

echo "=== Page 26 hamza examples (46 chunks) ==="

echo "--- R3 (eski, 4 words): yaʔmuru yaʔkhudhu maʔmuur maʔkhuudh ---"
cut p26_r3_w1_yamuru   59.00 60.05
cut p26_r3_w2_yakhudhu 61.30 62.45
cut p26_r3_w3_mamuur   63.80 65.20
cut p26_r3_w4_makhuudh 66.75 68.55

echo "--- R4 (yangi, 4 words): yaʔmuru yaʔkhudhu maʔmuur maʔkhuudh ---"
cut p26_r4_w1_yamuru   71.75 73.30
cut p26_r4_w2_yakhudhu 74.45 75.95
cut p26_r4_w3_mamuur   77.20 78.85
cut p26_r4_w4_makhuudh 80.20 84.35

echo "--- R5 (4 words): qurie qaariʔa mubtadiʔ mustahziʔ ---"
cut p26_r5_w1_qurie       86.90 89.30
cut p26_r5_w2_qaariea     90.20 92.55
cut p26_r5_w3_mubtadie    93.80 96.15
cut p26_r5_w4_mustahzie   97.30 102.65

echo "--- R6 (5 words): yuʔminu muʔmin muʔadhdhin muʔallif luʔluʔ ---"
cut p26_r6_w1_yuminu     106.10 107.35
cut p26_r6_w2_mumin      108.40 109.65
cut p26_r6_w3_muadhdhin  110.55 111.70
cut p26_r6_w4_muallif    112.75 114.15
cut p26_r6_w5_luulue     115.15 117.05

echo "--- R7 (5 words): qaaʔil qaaʔim saaʔil maaʔil raʔiis ---"
cut p26_r7_w1_qaail   119.20 121.55
cut p26_r7_w2_qaaim   122.55 124.95
cut p26_r7_w3_saail   126.00 128.35
cut p26_r7_w4_maail   129.70 132.00
cut p26_r7_w5_raiis   133.20 135.70

echo "--- R8 (5 words): biʔsa biʔr saʔila yasʔal masʔuul ---"
cut p26_r8_w1_bisa     138.00 140.05
cut p26_r8_w2_bir      141.00 143.25
cut p26_r8_w3_saila    144.30 146.55
cut p26_r8_w4_yasal    147.75 150.20
cut p26_r8_w5_masuul   151.40 153.85

echo "--- R9 (5 words): shaaʔa saaʔa jaaʔa yashaaʔu masaaʔu ---"
cut p26_r9_w1_shaaa   155.40 156.80
cut p26_r9_w2_saaa    157.90 159.10
cut p26_r9_w3_jaaa    160.20 161.55
cut p26_r9_w4_yashaau 162.70 164.00
cut p26_r9_w5_masaau  165.10 166.50

echo "--- C1 (5 words): shayʔ jayʔ yajiiʔ yusiiʔ musiiʔ ---"
cut p26_c1_w1_shay    167.85 170.75
cut p26_c1_w2_jay     172.50 174.70
cut p26_c1_w3_yajii   175.80 178.00
cut p26_c1_w4_yusii   179.25 181.50
cut p26_c1_w5_musii   182.80 185.10

echo "--- C2/C3 (shared sample audio for 11 visual elements) ---"
cut p26_c23_sample    186.30 188.80

echo "--- Bottom R1: al-mar'/imra'an/imri'in/imru'un (4 words) ---"
cut p26_b1_w1_almaru   193.20 194.85
cut p26_b1_w2_imraan   196.20 197.70
cut p26_b1_w3_imriin   198.85 200.50
cut p26_b1_w4_imruun   201.55 203.20

echo "--- Bottom R2: al-juz'/juz'aha/juz'iha/juz'uha (4 words) ---"
cut p26_b2_w1_aljuzu     204.65 206.55
cut p26_b2_w2_juzaha     208.10 210.00
cut p26_b2_w3_juziha     211.05 212.95
cut p26_b2_w4_juzuha     214.25 216.20

echo ""
echo "=== Copying to public/audio/edit/ ==="
cp "$OUT"/p26_*.mp3 "$PUB/"
echo "Done. Files: $(ls "$PUB"/p26_*.mp3 | wc -l) chunks."
