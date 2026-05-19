#!/bin/bash
# Cut per-element chunks for page 9 (Qof ق + Shin ش).
# Manbalar:
#   - 17. qo.mp3  — Qof bo'limi 26 chunk (3 header + 6+7+4+6 so'z)
#   - 18. sha.mp3 — Shin bo'limi 24 chunk (3 header + 6+6+5+4 so'z)
# Chegaralar: silence-detect (-40dB/0.10s) + buffer -50/+100 ms.
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
# QOF (17. qo.mp3) — 26 chunk
# ════════════════════════════════════════════════════════════
QO_SRC="$ROOT/public/audio/17. qo.mp3"
QO_OUT="$ROOT/Materiallar/harflar/edit_audios/17_qo"
rm -rf "$QO_OUT"
mkdir -p "$QO_OUT"

# Headers: قَ ـقِـ ـقُ (pozitsion — connector harf)
cut "$QO_SRC" "$QO_OUT/q01_fatha.mp3"       2.630   3.161
cut "$QO_SRC" "$QO_OUT/q02_kasra.mp3"       3.761   4.332
cut "$QO_SRC" "$QO_OUT/q03_damma.mp3"       4.858   5.423
# Row 1 (6 so'z): زُقْ قِنْ قُلْ قُمْ قِفْ قِهْ
cut "$QO_SRC" "$QO_OUT/q04_zuq.mp3"         6.632   7.493
cut "$QO_SRC" "$QO_OUT/q05_qin.mp3"         8.845   9.615
cut "$QO_SRC" "$QO_OUT/q06_qul.mp3"        10.860  11.604
cut "$QO_SRC" "$QO_OUT/q07_qum.mp3"        13.176  13.937
cut "$QO_SRC" "$QO_OUT/q08_qif.mp3"        15.320  16.147
cut "$QO_SRC" "$QO_OUT/q09_qih.mp3"        17.752  18.505
# Row 2 (7 so'z): قَلْبُ قَبْلُ فَوْقُ قَلَمُ قَمَرُ لَقَبُ قُمْقُمْ
cut "$QO_SRC" "$QO_OUT/q10_qalbu.mp3"      20.282  21.488
cut "$QO_SRC" "$QO_OUT/q11_qablu.mp3"      22.736  23.802
cut "$QO_SRC" "$QO_OUT/q12_fawqu.mp3"      25.149  26.470
cut "$QO_SRC" "$QO_OUT/q13_qalamu.mp3"     27.845  28.791
cut "$QO_SRC" "$QO_OUT/q14_qamaru.mp3"     30.318  31.192
cut "$QO_SRC" "$QO_OUT/q15_laqabu.mp3"     32.712  33.759
cut "$QO_SRC" "$QO_OUT/q16_qumqum.mp3"     35.489  36.887
# Row 3 (4 so'z): اِقْتَرَبَ يَقْتَرِبُ اِنْقَلَبَ يَنْقَلِبُ
cut "$QO_SRC" "$QO_OUT/q17_iqtaraba.mp3"   38.635  40.149
cut "$QO_SRC" "$QO_OUT/q18_yaqtaribu.mp3"  41.386  43.042
cut "$QO_SRC" "$QO_OUT/q19_inqalaba.mp3"   44.347  46.141
cut "$QO_SRC" "$QO_OUT/q20_yanqalibu.mp3"  47.356  49.294
# Row 4 (6 so'z, 3 juftlik): كَمَرْ-قَمَرْ، فَلَكْ-فَلَقْ، فَرْكُ-فَرْقُ
cut "$QO_SRC" "$QO_OUT/q21_kamar.mp3"      53.237  54.047
cut "$QO_SRC" "$QO_OUT/q22_qamar.mp3"      55.624  56.462
cut "$QO_SRC" "$QO_OUT/q23_falak.mp3"      57.905  58.684
cut "$QO_SRC" "$QO_OUT/q24_falaq.mp3"      60.344  61.195
cut "$QO_SRC" "$QO_OUT/q25_farku.mp3"      62.696  63.873
cut "$QO_SRC" "$QO_OUT/q26_farqu.mp3"      65.399  66.564

# ════════════════════════════════════════════════════════════
# SHIN (18. sha.mp3) — 24 chunk
# ════════════════════════════════════════════════════════════
SH_SRC="$ROOT/public/audio/18. sha.mp3"
SH_OUT="$ROOT/Materiallar/harflar/edit_audios/18_sha"
rm -rf "$SH_OUT"
mkdir -p "$SH_OUT"

# Headers: شَ ـشِـ ـشُ (pozitsion — connector harf)
cut "$SH_SRC" "$SH_OUT/s01_fatha.mp3"       1.164   1.996
cut "$SH_SRC" "$SH_OUT/s02_kasra.mp3"       2.413   3.046
cut "$SH_SRC" "$SH_OUT/s03_damma.mp3"       3.560   4.244
# Row 1 (6 so'z): رَشْ بُشْ شَرْ شَقْ شَمْ شَكْ
cut "$SH_SRC" "$SH_OUT/s04_rash.mp3"        6.498   7.357
cut "$SH_SRC" "$SH_OUT/s05_bush.mp3"        8.637   9.571
cut "$SH_SRC" "$SH_OUT/s06_shar.mp3"       10.777  11.569
cut "$SH_SRC" "$SH_OUT/s07_shaq.mp3"       12.846  13.601
cut "$SH_SRC" "$SH_OUT/s08_sham.mp3"       14.793  15.752
cut "$SH_SRC" "$SH_OUT/s09_shak.mp3"       16.803  17.443
# Row 2 (6 so'z): بِشْرُ شِرْبُ شَهْرُ نَشْرُ شُكْرُ شُرْبُ
cut "$SH_SRC" "$SH_OUT/s10_bishru.mp3"     18.817  20.056
cut "$SH_SRC" "$SH_OUT/s11_shirbu.mp3"     21.299  22.498
cut "$SH_SRC" "$SH_OUT/s12_shahru.mp3"     23.744  25.075
cut "$SH_SRC" "$SH_OUT/s13_nashru.mp3"     26.447  27.669
cut "$SH_SRC" "$SH_OUT/s14_shukru.mp3"     28.823  30.177
cut "$SH_SRC" "$SH_OUT/s15_shurbu.mp3"     31.454  32.652
# Row 3 (5 so'z): مَشْرَبْ مَشْرِبْ مَشْرِقْ مُشْتَهِرْ مُشْتَرَكْ
cut "$SH_SRC" "$SH_OUT/s16_mashrab.mp3"    34.372  35.777
cut "$SH_SRC" "$SH_OUT/s17_mashrib.mp3"    37.060  38.420
cut "$SH_SRC" "$SH_OUT/s18_mashriq.mp3"    39.857  41.158
cut "$SH_SRC" "$SH_OUT/s19_mushtahir.mp3"  42.619  44.176
cut "$SH_SRC" "$SH_OUT/s20_mushtarak.mp3"  45.561  47.043
# Row 4 (4 so'z): اِشْتَهَرَ يَشْتَهِرُ اِبْرَنْشَقَ يَبْرَنْشِقُ
cut "$SH_SRC" "$SH_OUT/s21_ishtahara.mp3"  49.079  50.657
cut "$SH_SRC" "$SH_OUT/s22_yashtahiru.mp3" 52.092  53.822
cut "$SH_SRC" "$SH_OUT/s23_ibranshaqa.mp3" 55.644  57.892
cut "$SH_SRC" "$SH_OUT/s24_yabranshiqu.mp3" 59.150  61.523

echo "Done. Qof: $(ls "$QO_OUT" | wc -l) chunk. Shin: $(ls "$SH_OUT" | wc -l) chunk."
