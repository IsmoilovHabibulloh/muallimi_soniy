#!/bin/bash
# Cut per-element chunks for page 11 (Sod ص + Tho ط).
# Manbalar:
#   - 21. so.mp3 — Sod bo'limi: 3 header + 7 + 4 + 6 = 20 chunk
#   - 22. to.mp3 — Tho bo'limi: 3 header + 6 + 6 + 4 + 4 + 6 = 29 chunk
# Chegaralar: silencedetect (-40dB/0.10s) + buffer -50/+100 ms.
set -euo pipefail

ROOT="/Users/habibulloh22icloud.com/Desktop/Antigravity/muallimi soniy"
FF="$ROOT/tools/ffmpeg"

cut() {
  local src="$1" out="$2" start="$3" end="$4"
  local dur=$(awk "BEGIN{printf \"%.3f\", $end - $start}")
  "$FF" -hide_banner -loglevel error -y -ss "$start" -i "$src" -t "$dur" \
    -c:a libmp3lame -b:a 192k "$out"
}

# ════════════════════════════════════════════════════════════
# SOD (21. so.mp3) — 20 chunk
# ════════════════════════════════════════════════════════════
SO_SRC="$ROOT/public/audio/21. so.mp3"
SO_OUT="$ROOT/Materiallar/harflar/edit_audios/21_so"
rm -rf "$SO_OUT"
mkdir -p "$SO_OUT"

# Headers: صَ ـصِـ ـصُ (pozitsion — connector harf)
cut "$SO_SRC" "$SO_OUT/so01_fatha.mp3"        2.570   3.309
cut "$SO_SRC" "$SO_OUT/so02_kasra.mp3"        3.711   4.412
cut "$SO_SRC" "$SO_OUT/so03_damma.mp3"        4.934   5.654
# Row 2 (7 so'z): صُمْ صِفْ فَصْ صَرَفْ صَبَرْ بَصَرْ قَصَبْ
cut "$SO_SRC" "$SO_OUT/so04_sum.mp3"          7.036   7.976
cut "$SO_SRC" "$SO_OUT/so05_sif.mp3"          8.914   9.773
cut "$SO_SRC" "$SO_OUT/so06_fas.mp3"         10.965  11.893
cut "$SO_SRC" "$SO_OUT/so07_saraf.mp3"       13.102  14.219
cut "$SO_SRC" "$SO_OUT/so08_sabar.mp3"       15.271  16.358
cut "$SO_SRC" "$SO_OUT/so09_basar.mp3"       17.428  18.481
cut "$SO_SRC" "$SO_OUT/so10_qasab.mp3"       19.826  20.753
# Row 3 (4 so'z): نَصَرْ يَنْصُرُ اِسْتَبْصَرَ يَسْتَبْصِرُ
cut "$SO_SRC" "$SO_OUT/so11_nasar.mp3"       22.159  23.284
cut "$SO_SRC" "$SO_OUT/so12_yansuru.mp3"     24.491  26.195
cut "$SO_SRC" "$SO_OUT/so13_istabsara.mp3"   27.725  29.567
cut "$SO_SRC" "$SO_OUT/so14_yastabsiru.mp3"  30.836  32.737
# Row 4 (6 so'z, 3 juftlik — sin vs sod): سَفَرْ-صَفَرْ، سَيْفْ-صَيْفْ، اِنْتَسَبَ-اِنْتَصَبَ
cut "$SO_SRC" "$SO_OUT/so15_safar_sin.mp3"    35.128  36.103
cut "$SO_SRC" "$SO_OUT/so16_safar_sod.mp3"    37.247  38.325
cut "$SO_SRC" "$SO_OUT/so17_sayf_sin.mp3"     39.488  40.829
cut "$SO_SRC" "$SO_OUT/so18_sayf_sod.mp3"     42.034  43.416
cut "$SO_SRC" "$SO_OUT/so19_intasaba_sin.mp3" 44.695  46.624
cut "$SO_SRC" "$SO_OUT/so20_intasaba_sod.mp3" 47.898  49.839

# ════════════════════════════════════════════════════════════
# THO (22. to.mp3) — 29 chunk
# ════════════════════════════════════════════════════════════
TO_SRC="$ROOT/public/audio/22. to.mp3"
TO_OUT="$ROOT/Materiallar/harflar/edit_audios/22_to"
rm -rf "$TO_OUT"
mkdir -p "$TO_OUT"

# Headers: طَ ـطِـ ـطُ (pozitsion — connector harf)
cut "$TO_SRC" "$TO_OUT/to01_fatha.mp3"        1.209   1.729
cut "$TO_SRC" "$TO_OUT/to02_kasra.mp3"        2.325   2.895
cut "$TO_SRC" "$TO_OUT/to03_damma.mp3"        3.422   3.969
# Row 1 (6 so'z): طَلْ طَيْ شَطْ بَطْ قَطْ فَقَطْ
cut "$TO_SRC" "$TO_OUT/to04_tal.mp3"          5.661   6.473
cut "$TO_SRC" "$TO_OUT/to05_tay.mp3"          7.472   8.288
cut "$TO_SRC" "$TO_OUT/to06_shat.mp3"         9.125   9.895
cut "$TO_SRC" "$TO_OUT/to07_bat.mp3"         10.887  11.686
cut "$TO_SRC" "$TO_OUT/to08_qat.mp3"         12.650  13.365
cut "$TO_SRC" "$TO_OUT/to09_faqat.mp3"       14.704  15.695
# Row 2 (6 so'z): وَطَنْ طَلَبْ طَرَفْ طُهْرْ طِفْلُ مَطَرْ
cut "$TO_SRC" "$TO_OUT/to10_watan.mp3"       17.604  18.721
cut "$TO_SRC" "$TO_OUT/to11_talab.mp3"       20.220  21.122
cut "$TO_SRC" "$TO_OUT/to12_taraf.mp3"       22.524  23.497
cut "$TO_SRC" "$TO_OUT/to13_tuhr.mp3"        25.442  26.668
cut "$TO_SRC" "$TO_OUT/to14_tiflu.mp3"       28.086  29.293
cut "$TO_SRC" "$TO_OUT/to15_matar.mp3"       30.804  31.844
# Row 3 (4 so'z): مَطْلَبْ مَسْقَطْ مَوْطِنْ مَرْبِطْ
cut "$TO_SRC" "$TO_OUT/to16_matlab.mp3"      33.528  34.807
cut "$TO_SRC" "$TO_OUT/to17_masqat.mp3"      36.419  37.692
cut "$TO_SRC" "$TO_OUT/to18_mawtin.mp3"      39.485  41.087
cut "$TO_SRC" "$TO_OUT/to19_marbit.mp3"      42.455  43.866
# Row 4 (4 so'z): اِصْطَبَرْ يَصْطَبِرُ اِسْتَوْطَنَ يَسْتَوْطِنُ
cut "$TO_SRC" "$TO_OUT/to20_istabar.mp3"     46.201  47.870
cut "$TO_SRC" "$TO_OUT/to21_yastabiru.mp3"   49.427  51.221
cut "$TO_SRC" "$TO_OUT/to22_istawtana.mp3"   53.103  55.072
cut "$TO_SRC" "$TO_OUT/to23_yastawtinu.mp3"  56.354  58.470
# Row 5 (6 so'z, 3 juftlik — ta vs tho): تَرَفْ-طَرَفْ، سَبْتُ-سَبْطُ، مُسْتَتِرْ-مُسْتَطِرْ
cut "$TO_SRC" "$TO_OUT/to24_taraf_ta.mp3"     62.087  62.986
cut "$TO_SRC" "$TO_OUT/to25_taraf_tho.mp3"    64.311  65.249
cut "$TO_SRC" "$TO_OUT/to26_sabtu_ta.mp3"     67.193  68.367
cut "$TO_SRC" "$TO_OUT/to27_sabtu_tho.mp3"    69.697  70.800
cut "$TO_SRC" "$TO_OUT/to28_mustatir_ta.mp3"  72.966  74.480
cut "$TO_SRC" "$TO_OUT/to29_mustatir_tho.mp3" 75.898  77.432

echo "✓ Page 11 chunks generated: 20 Sod + 29 Tho = 49 total"
