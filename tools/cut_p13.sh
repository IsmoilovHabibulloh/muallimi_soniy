#!/bin/bash
# Cut per-element chunks for page 13 (Ha ح + G'ayn غ).
# Manbalar:
#   - 25. ha.mp3   — Ha bo'limi:    3 header + 6 + 5 + 4 + 4 + 6 = 28 chunk
#   - 26. g'o.mp3  — G'ayn bo'limi: 3 header + 6 + 5 + 4         = 18 chunk
# Chegaralar: silencedetect (-35dB/0.20s) + buffer -50/+100 ms.
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
# HA (25. ha.mp3) — 28 chunk
# ════════════════════════════════════════════════════════════
HA_SRC="$ROOT/public/audio/25. ha.mp3"
HA_OUT="$ROOT/Materiallar/harflar/edit_audios/25_ha"
rm -rf "$HA_OUT"
mkdir -p "$HA_OUT"

# Headers: حَ ـحِـ ـحُ (pozitsion — connector harf)
cut "$HA_SRC" "$HA_OUT/ha01_fatha.mp3"          2.046   2.729
cut "$HA_SRC" "$HA_OUT/ha02_kasra.mp3"          3.150   3.853
cut "$HA_SRC" "$HA_OUT/ha03_damma.mp3"          4.209   4.952
# Row 1 (6 so'z): حَى حِلْ حَجْ حَسَنْ حَسْبْ حَسَفْ
cut "$HA_SRC" "$HA_OUT/ha04_haa.mp3"            6.250   7.064
cut "$HA_SRC" "$HA_OUT/ha05_hil.mp3"            8.580   9.341
cut "$HA_SRC" "$HA_OUT/ha06_haj.mp3"           10.477  11.186
cut "$HA_SRC" "$HA_OUT/ha07_hasan.mp3"         12.267  13.220
cut "$HA_SRC" "$HA_OUT/ha08_hasb.mp3"          14.243  15.123
cut "$HA_SRC" "$HA_OUT/ha09_hasaf.mp3"         16.222  17.088
# Row 2 (5 so'z): مُحْسِنْ مَحْشَرْ مِنْحَرْ مَحْفَلْ اَحْسَنْ
cut "$HA_SRC" "$HA_OUT/ha10_muhsin.mp3"        19.314  20.734
cut "$HA_SRC" "$HA_OUT/ha11_mahshar.mp3"       21.949  23.228
cut "$HA_SRC" "$HA_OUT/ha12_minhar.mp3"        24.467  25.757
cut "$HA_SRC" "$HA_OUT/ha13_mahfal.mp3"        27.116  28.530
cut "$HA_SRC" "$HA_OUT/ha14_ahsan.mp3"         29.726  31.097
# Row 3 (4 so'z): اِمْتَحَنَ يَمْتَحِنُ اِحْتَمَلَ يَحْتَمِلُ
cut "$HA_SRC" "$HA_OUT/ha15_imtahana.mp3"      32.541  34.142
cut "$HA_SRC" "$HA_OUT/ha16_yamtahinu.mp3"     35.392  37.090
cut "$HA_SRC" "$HA_OUT/ha17_ihtamala.mp3"      38.421  39.956
cut "$HA_SRC" "$HA_OUT/ha18_yahtamilu.mp3"     41.197  42.898
# Row 4 (4 so'z): اِسْتَحْسَنَ يَسْتَحْسِنُ اِحْرَنْجَمَ يَحْرَنْجِمُ
cut "$HA_SRC" "$HA_OUT/ha19_istahsana.mp3"     45.260  47.204
cut "$HA_SRC" "$HA_OUT/ha20_yastahsinu.mp3"    48.372  50.581
cut "$HA_SRC" "$HA_OUT/ha21_ihranjama.mp3"     52.130  54.169
cut "$HA_SRC" "$HA_OUT/ha22_yahranjimu.mp3"    55.299  57.455
# Row 5 (6 so'z, 3 juftlik — kha vs ha): خَلْقُ-حَلْقُ، خَتْمُ-حَتْمُ، اَرْخَمْ-اَرْحَمْ
cut "$HA_SRC" "$HA_OUT/ha23_khalqu_kha.mp3"    61.212  62.481
cut "$HA_SRC" "$HA_OUT/ha24_halqu_ha.mp3"      63.783  65.042
cut "$HA_SRC" "$HA_OUT/ha25_khatmu_kha.mp3"    66.252  67.409
cut "$HA_SRC" "$HA_OUT/ha26_hatmu_ha.mp3"      68.743  69.938
cut "$HA_SRC" "$HA_OUT/ha27_arkham_kha.mp3"    71.538  72.885
cut "$HA_SRC" "$HA_OUT/ha28_arham_ha.mp3"      74.278  75.659

# ════════════════════════════════════════════════════════════
# G'AYN (26. g'o.mp3) — 18 chunk
# ════════════════════════════════════════════════════════════
GH_SRC="$ROOT/public/audio/26. g'o.mp3"
GH_OUT="$ROOT/Materiallar/harflar/edit_audios/26_gho"
rm -rf "$GH_OUT"
mkdir -p "$GH_OUT"

# Headers: غَ ـغِـ ـغُ (pozitsion — connector harf)
cut "$GH_SRC" "$GH_OUT/gho01_fatha.mp3"          1.714   2.480
cut "$GH_SRC" "$GH_OUT/gho02_kasra.mp3"          2.950   3.680
cut "$GH_SRC" "$GH_OUT/gho03_damma.mp3"          4.086   4.805
# Row 1 (6 so'z): غَمْ غَبْ غِلْ غَيْرُ بَغْلُ فَرْغُ
cut "$GH_SRC" "$GH_OUT/gho04_gham.mp3"           6.008   6.947
cut "$GH_SRC" "$GH_OUT/gho05_ghab.mp3"           7.975   8.853
cut "$GH_SRC" "$GH_OUT/gho06_ghil.mp3"           9.869  10.838
cut "$GH_SRC" "$GH_OUT/gho07_ghayru.mp3"        11.628  12.916
cut "$GH_SRC" "$GH_OUT/gho08_baghlu.mp3"        13.833  15.176
cut "$GH_SRC" "$GH_OUT/gho09_farghu.mp3"        16.352  17.622
# Row 2 (5 so'z): غَبْغَبْ مَبْلَغْ مَغْرِبْ اِغْلِبْ اِغْفِرْ
cut "$GH_SRC" "$GH_OUT/gho10_ghabghab.mp3"      18.948  20.252
cut "$GH_SRC" "$GH_OUT/gho11_mablag.mp3"        21.517  22.896
cut "$GH_SRC" "$GH_OUT/gho12_maghrib.mp3"       24.168  25.446
cut "$GH_SRC" "$GH_OUT/gho13_ighlib.mp3"        26.730  27.969
cut "$GH_SRC" "$GH_OUT/gho14_ighfir.mp3"        29.273  30.492
# Row 3 (4 so'z): اِشْتَغَلَ يَشْتَغِلُ اِسْتَغْفَرَ يَسْتَغْفِرُ
cut "$GH_SRC" "$GH_OUT/gho15_ishtaghala.mp3"    32.492  34.000
cut "$GH_SRC" "$GH_OUT/gho16_yashtaghilu.mp3"   35.265  36.903
cut "$GH_SRC" "$GH_OUT/gho17_istaghfara.mp3"    38.271  40.210
cut "$GH_SRC" "$GH_OUT/gho18_yastaghfiru.mp3"   41.395  43.414

echo "✓ Page 13 chunks: 28 (Ha) + 18 (G'ayn) = 46 jami"
