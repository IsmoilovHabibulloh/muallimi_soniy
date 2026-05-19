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

echo "=== Page 26 hamza examples (56 chunks) ==="
# 2026-05-19 REMAPPED: previous cuts were ~27s off (page 26 starts at ~31.9s,
# not 59s as previously assumed). All R3-C3 cuts re-aligned via silencedetect.
# C2/C3 now have individual audio per word (was sharing one "sample" chunk).

echo "--- R3 (eski, 4 words): yaʔmuru yaʔkhudhu maʔmuur maʔkhuudh ---"
cut p26_r3_w1_yamuru    31.85 33.05
cut p26_r3_w2_yakhudhu  34.28 35.73
cut p26_r3_w3_mamuur    36.91 38.61
cut p26_r3_w4_makhuudh  39.85 41.95   # includes 'ma' syllable (39.90-40.19) + gap + khuudh

echo "--- R4 (yangi, 4 words): yaʔmuru yaʔkhudhu maʔmuur maʔkhuudh ---"
cut p26_r4_w1_yamuru    44.78 46.03
cut p26_r4_w2_yakhudhu  47.30 48.80   # includes 'ya' syllable (47.38-47.65) + gap + khudhu
cut p26_r4_w3_mamuur    50.13 51.78
cut p26_r4_w4_makhuudh  53.00 55.05   # includes 'ma' syllable (53.06-53.34) + gap + khuudh

echo "--- R5 (4 words): qurie qaariʔa mubtadiʔ mustahziʔ ---"
cut p26_r5_w1_qurie     59.08 59.98
cut p26_r5_w2_qaariea   61.41 62.36
cut p26_r5_w3_mubtadie  63.88 65.18
cut p26_r5_w4_mustahzie 66.82 68.57

echo "--- R6 (5 words): yuʔminu muʔmin muʔadhdhin muʔallif luʔluʔ ---"
cut p26_r6_w1_yuminu    71.84 73.19
cut p26_r6_w2_mumin     74.52 75.87
cut p26_r6_w3_muadhdhin 77.27 78.77
cut p26_r6_w4_muallif   80.29 81.59
cut p26_r6_w5_luulue    83.25 84.30

echo "--- R7 (5 words): qaaʔil qaaʔim saaʔil maaʔil raʔiis ---"
cut p26_r7_w1_qaail     87.00  89.30
cut p26_r7_w2_qaaim     90.25  92.55
cut p26_r7_w3_saail     93.83  96.13
cut p26_r7_w4_maail     97.41  99.71
cut p26_r7_w5_raiis    100.91 102.66

echo "--- R8 (5 words): biʔsa biʔr saʔila yasʔal masʔuul ---"
cut p26_r8_w1_bisa     106.20 107.35
cut p26_r8_w2_bir      108.48 109.63
cut p26_r8_w3_saala    110.60 111.70
cut p26_r8_w4_yasal    112.82 114.17
cut p26_r8_w5_masuul   115.22 117.02

echo "--- R9 (5 words): shaaʔa saaʔa jaaʔa yashaaʔu masaaʔu ---"
cut p26_r9_w1_shaaa    119.28 121.53
cut p26_r9_w2_saaa     122.60 124.95
cut p26_r9_w3_jaaa     126.07 128.37
cut p26_r9_w4_yashaau  129.75 132.00
cut p26_r9_w5_masaau   133.26 135.66

echo "--- C1 (5 words, eski ـىْءُ): shayʔ jayʔ yajiiʔ yusiiʔ musiiʔ ---"
cut p26_c1_w1_shia     138.08 140.03   # passive: "shi'a" (was willed)
cut p26_c1_w2_jia      141.06 143.26   # passive: "ji'a" (was brought)
cut p26_c1_w3_yajii    144.38 146.58
cut p26_c1_w4_yusii    147.80 150.20
cut p26_c1_w5_musii    151.42 153.87

echo "--- C2 (6 words, hamza at end after various vowels): shay fay mil bar juz qiraa ---"
cut p26_c2_w1_shay     155.50 156.75
cut p26_c2_w2_fay      157.88 159.08
cut p26_c2_w3_mil      160.25 161.55
cut p26_c2_w4_bar      162.75 163.95
cut p26_c2_w5_juz      165.14 166.49
cut p26_c2_w6_qiraa    167.91 170.71

echo "--- C3 (5 words, hamza after long waw ـوءُ): suu yasuu wadu quru muru ---"
cut p26_c3_w1_suu      172.57 174.67
cut p26_c3_w2_yasuu    175.84 177.99
cut p26_c3_w3_wadu     179.29 181.49
cut p26_c3_w4_quru     182.84 185.04
cut p26_c3_w5_muru     186.30 188.85

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
