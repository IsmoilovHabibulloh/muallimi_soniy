#!/bin/bash
# Cut per-element chunks for page 15 (Dod ض + Zal ذ).
# Manbalar:
#   - 29. zo.mp3 — Dod bo'limi: 3 header + 6 + 6 + 4 + 6 = 25 chunk
#   - 30. za.mp3 — Zal bo'limi: 3 header + 8 + 6 + 6 + 6 = 29 chunk
# Chegaralar: silencedetect (-40dB/0.20s) + buffer -50/+100 ms.
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
# DOD (29. zo.mp3) — 25 chunk
# ════════════════════════════════════════════════════════════
DO_SRC="$ROOT/public/audio/29. zo.mp3"
DO_OUT="$ROOT/Materiallar/harflar/edit_audios/29_dod"
rm -rf "$DO_OUT"
mkdir -p "$DO_OUT"

# Headers (connector — pozitsion): ضَ / ـضِـ / ـضُ
cut "$DO_SRC" "$DO_OUT/do01_fatha.mp3"        0.798   1.518
cut "$DO_SRC" "$DO_OUT/do02_kasra.mp3"        2.012   2.833
cut "$DO_SRC" "$DO_OUT/do03_damma.mp3"        3.155   3.933
# Row 2 (6 so'z): ضَيْفْ عَضَلْ ضَهْبُ ضَبْطُ ضَعْفُ عَرَضْ
cut "$DO_SRC" "$DO_OUT/do04_dayf.mp3"         5.907   7.295
cut "$DO_SRC" "$DO_OUT/do05_adal.mp3"         8.901  10.232
cut "$DO_SRC" "$DO_OUT/do06_dahb.mp3"        11.750  13.226
cut "$DO_SRC" "$DO_OUT/do07_dabt.mp3"        14.649  15.943
cut "$DO_SRC" "$DO_OUT/do08_daf.mp3"         17.449  18.835
cut "$DO_SRC" "$DO_OUT/do09_arad.mp3"        20.378  21.551
# Row 3 (6 so'z — ض-ر-ب fe'l konjugatsiya): مَضْرِبْ مُضْرِبْ اِضْرِبْ تَضْرِبُ اَضْرِبُ نَضْرِبُ
cut "$DO_SRC" "$DO_OUT/do10_madrib.mp3"      23.129  24.525
cut "$DO_SRC" "$DO_OUT/do11_mudrib.mp3"      26.001  27.501
cut "$DO_SRC" "$DO_OUT/do12_idrib.mp3"       29.103  30.468
cut "$DO_SRC" "$DO_OUT/do13_tadribu.mp3"     32.153  33.575
cut "$DO_SRC" "$DO_OUT/do14_adribu.mp3"      35.330  36.750
cut "$DO_SRC" "$DO_OUT/do15_nadribu.mp3"     38.181  39.745
# Row 4 (4 so'z — Form VIII + Form X): اِضْطَرَبَ يَضْطَرِبُ اِسْتَضْعَفَ يَسْتَضْعِفُ
cut "$DO_SRC" "$DO_OUT/do16_idtaraba.mp3"    41.865  43.751
cut "$DO_SRC" "$DO_OUT/do17_yadtaribu.mp3"   45.269  47.119
cut "$DO_SRC" "$DO_OUT/do18_istadafa.mp3"    49.601  51.585
cut "$DO_SRC" "$DO_OUT/do19_yastadifu.mp3"   52.877  55.033
# Row 5 (6 so'z, 3 juftlik — dal/dod taqqoslash): دَرْسُ-ضَرْسُ، وَدْعُ-وَضْعُ، بَعْدُ-بَعْضُ
cut "$DO_SRC" "$DO_OUT/do20_darsu_dal.mp3"   59.564  60.784
cut "$DO_SRC" "$DO_OUT/do21_darsu_dod.mp3"   62.087  63.421
cut "$DO_SRC" "$DO_OUT/do22_wadu_dal.mp3"    64.548  65.721
cut "$DO_SRC" "$DO_OUT/do23_wadu_dod.mp3"    67.029  68.322
cut "$DO_SRC" "$DO_OUT/do24_badu_dal.mp3"    69.721  71.052
cut "$DO_SRC" "$DO_OUT/do25_badu_dod.mp3"    72.483  73.774

# ════════════════════════════════════════════════════════════
# ZAL (30. za.mp3) — 29 chunk
# ════════════════════════════════════════════════════════════
ZA_SRC="$ROOT/public/audio/30. za.mp3"
ZA_OUT="$ROOT/Materiallar/harflar/edit_audios/30_zal"
rm -rf "$ZA_OUT"
mkdir -p "$ZA_OUT"

# Headers (non-connector — isolated): ذَ / ذِ / ذُ
cut "$ZA_SRC" "$ZA_OUT/za01_fatha.mp3"        0.728   1.402
cut "$ZA_SRC" "$ZA_OUT/za02_kasra.mp3"        1.978   2.660
cut "$ZA_SRC" "$ZA_OUT/za03_damma.mp3"        3.223   3.924
# Row 2 (8 qisqa so'z): اِذْ مُذْ خُذْ عُذْ ذُبْ ذُقْ ذَرْ مُنْذْ
cut "$ZA_SRC" "$ZA_OUT/za04_idh.mp3"          5.346   6.080
cut "$ZA_SRC" "$ZA_OUT/za05_mudh.mp3"         7.365   8.246
cut "$ZA_SRC" "$ZA_OUT/za06_khudh.mp3"        9.585  10.530
cut "$ZA_SRC" "$ZA_OUT/za07_udh.mp3"         11.929  12.871
cut "$ZA_SRC" "$ZA_OUT/za08_dhub.mp3"        14.111  14.961
cut "$ZA_SRC" "$ZA_OUT/za09_dhuq.mp3"        16.389  17.223
cut "$ZA_SRC" "$ZA_OUT/za10_dhar.mp3"        18.803  19.621
cut "$ZA_SRC" "$ZA_OUT/za11_mundh.mp3"       21.243  22.835
# Row 3 (6 so'z - ismlar): اِذْنُ بَذْلُ ذِكْرُ ذِهْنُ ذَهَبْ مَذْهَبْ
cut "$ZA_SRC" "$ZA_OUT/za12_idhnu.mp3"       24.790  25.966
cut "$ZA_SRC" "$ZA_OUT/za13_badhlu.mp3"      29.162  30.491
cut "$ZA_SRC" "$ZA_OUT/za14_dhikru.mp3"      32.590  33.765
cut "$ZA_SRC" "$ZA_OUT/za15_dhihnu.mp3"      35.713  37.078
cut "$ZA_SRC" "$ZA_OUT/za16_dhahab.mp3"      38.893  40.176
cut "$ZA_SRC" "$ZA_OUT/za17_madhhab.mp3"     41.860  43.239
# Row 4 (6 so'z - fe'llar): ذَهَلَ يَذْهَلُ بَذَلَ يَبْذُلُ اِذْهَبْ يَذْهَبُ
cut "$ZA_SRC" "$ZA_OUT/za18_dhahala.mp3"     44.896  46.047
cut "$ZA_SRC" "$ZA_OUT/za19_yadhhalu.mp3"    48.057  49.523
cut "$ZA_SRC" "$ZA_OUT/za20_badhala.mp3"     51.340  52.434
cut "$ZA_SRC" "$ZA_OUT/za21_yabdhulu.mp3"    54.085  55.557
cut "$ZA_SRC" "$ZA_OUT/za22_idhhab.mp3"      57.372  58.759
cut "$ZA_SRC" "$ZA_OUT/za23_yadhhabu.mp3"    60.243  61.830
# Row 5 (6 so'z, 3 juftlik — zal/zain taqqoslash): ذِفْرُ-زِفْرُ، بَذْلُ-بَزْلُ، اَبْذَلُ-اَبْزَلُ
cut "$ZA_SRC" "$ZA_OUT/za24_dhifru.mp3"      64.193  65.410
cut "$ZA_SRC" "$ZA_OUT/za25_zifru.mp3"       67.267  68.477
cut "$ZA_SRC" "$ZA_OUT/za26_badhlu_zal.mp3"  70.691  71.929
cut "$ZA_SRC" "$ZA_OUT/za27_bazlu_zain.mp3"  73.600  74.904
cut "$ZA_SRC" "$ZA_OUT/za28_abdhalu.mp3"     76.900  78.202
cut "$ZA_SRC" "$ZA_OUT/za29_abzalu.mp3"      79.701  81.000

echo "Tayyor: $(ls "$DO_OUT" | wc -l) dod chunk + $(ls "$ZA_OUT" | wc -l) zal chunk"
