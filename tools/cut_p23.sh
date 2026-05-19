#!/bin/bash
# Cut audio chunks for page 23 (tashdid continuation + tanvin start).
# Source: 34. tashdid.mp3 (5:54) + 35. tanvin.mp3 (3:10)
# Boundaries from silencedetect -35dB/0.25s with -50/+100 ms buffer.

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_TASH="$ROOT/public/audio/34. tashdid.mp3"
SRC_TANV="$ROOT/public/audio/35. tanvin.mp3"
OUT_TASH="$ROOT/Materiallar/tashdid/edit_audios/34_tashdid"
OUT_TANV="$ROOT/Materiallar/tanvin/edit_audios/35_tanvin"
PUB_TASH="$ROOT/public/audio/edit/34_tashdid"
PUB_TANV="$ROOT/public/audio/edit/35_tanvin"
FFMPEG="$ROOT/tools/ffmpeg"

mkdir -p "$OUT_TASH" "$OUT_TANV" "$PUB_TASH" "$PUB_TANV"

cut() {
    local src="$1" out="$2" name="$3" start="$4" end="$5"
    local dur=$(python3 -c "print(round($end - $start, 3))")
    "$FFMPEG" -y -ss "$start" -i "$src" -t "$dur" -c:a libmp3lame -b:a 192k -loglevel error "$out/$name.mp3"
    echo "  $name.mp3 ($dur s)"
}

cut_tash() {
    cut "$SRC_TASH" "$OUT_TASH" "$1" "$2" "$3"
}

cut_tanv() {
    cut "$SRC_TANV" "$OUT_TANV" "$1" "$2" "$3"
}

echo "=== Page 23 tashdid (40 words from 34. tashdid.mp3) ==="

echo "--- R1: V verbal noun (تَفَعُّلْ pattern), 6 words ---"
cut_tash p23_r1_w1_tawatturr 246.68 247.83
cut_tash p23_r1_w2_tanaum    248.96 250.31
cut_tash p23_r1_w3_tawaghul  251.38 252.75
cut_tash p23_r1_w4_tanaffus  253.69 255.15
cut_tash p23_r1_w5_taraqqub  256.09 257.41
cut_tash p23_r1_w6_tafakkur  258.38 259.60

echo "--- R2: V verbal noun continued, 5 words ---"
cut_tash p23_r2_w1_taallum   260.88 262.22
cut_tash p23_r2_w2_takammul  263.30 264.95
cut_tash p23_r2_w3_tafannun  266.72 268.49
cut_tash p23_r2_w4_tasawwur  269.12 270.44
cut_tash p23_r2_w5_taghayyur 271.34 272.68

echo "--- R3: V active participle (مُتَفَعِّلْ), 5 words ---"
cut_tash p23_r3_w1_mutakabbir 274.04 275.64
cut_tash p23_r3_w2_mutakaththir 276.45 278.04
cut_tash p23_r3_w3_mutahajjir 278.88 280.48
cut_tash p23_r3_w4_mutawahhid 281.27 282.93
cut_tash p23_r3_w5_mutasakhkhin 283.76 285.39

echo "--- R4: V active participle, 5 words ---"
cut_tash p23_r4_w1_mutabaddil 287.27 288.93
cut_tash p23_r4_w2_mutahadhdhib 289.75 291.47
cut_tash p23_r4_w3_mutaharriz  292.39 294.05
cut_tash p23_r4_w4_mutaazziz   294.94 296.83
cut_tash p23_r4_w5_mutayassir  297.56 299.19

echo "--- R5: V active participle, 5 words ---"
cut_tash p23_r5_w1_mutawattin  300.70 302.37
cut_tash p23_r5_w2_mutanaim    303.19 304.97
cut_tash p23_r5_w3_mutawaghil  305.79 307.51
cut_tash p23_r5_w4_mutanaffis  308.30 310.06
cut_tash p23_r5_w5_mutafakkir  310.91 312.52

echo "--- R6: V active participle, 5 words ---"
cut_tash p23_r6_w1_mutaallim   313.62 315.44
cut_tash p23_r6_w2_mutakammil  316.09 318.21
cut_tash p23_r6_w3_mutafannin  318.97 321.22
cut_tash p23_r6_w4_mutasawwir  322.00 323.66
cut_tash p23_r6_w5_mutaghayyir 325.52 327.18

echo "--- R7: IX form (اِفْعَلَّ — colors/states), 5 words ---"
cut_tash p23_r7_w1_iswadda  329.59 331.02
cut_tash p23_r7_w2_isfarra  332.02 333.47
cut_tash p23_r7_w3_ihmarra  334.48 335.96
cut_tash p23_r7_w4_ightarra 337.24 338.69
cut_tash p23_r7_w5_ihtazza  339.78 341.30

echo "--- R8: X form (اِسْتَفْعَلَ with idgham), 4 words ---"
cut_tash p23_r8_w1_istaradda 343.41 345.00
cut_tash p23_r8_w2_istahabba 345.99 347.67
cut_tash p23_r8_w3_istahalla 348.61 350.40
cut_tash p23_r8_w4_istadalla 351.26 352.97

echo ""
echo "=== Page 23 tanvin (intro + 3 demos from 35. tanvin.mp3) ==="
cut_tanv p23_intro_tanvin 2.18 11.28
cut_tanv p23_an_demo      12.23 12.87
cut_tanv p23_in_demo      13.71 14.39
cut_tanv p23_un_demo      15.21 15.93

echo ""
echo "=== Copying to public/audio/edit/ ==="
cp "$OUT_TASH"/p23_*.mp3 "$PUB_TASH/"
cp "$OUT_TANV"/p23_*.mp3 "$PUB_TANV/"
echo "Done. Files: $(ls "$PUB_TASH"/p23_*.mp3 | wc -l) tashdid + $(ls "$PUB_TANV"/p23_*.mp3 | wc -l) tanvin chunks."
