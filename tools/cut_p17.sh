#!/bin/bash
# Cut per-element chunks for page 17 (Madli harflar — 84 syllables).
# Manbalar:
#   - 32. madli 01.mp3 — 28 harf × 3 mad shakl (fatha+alif / kasra+ya / damma+waw)
# Chegaralar: silence-detect (-35dB/0.15s) + buffer -30/+80 ms.
set -euo pipefail

ROOT="/Users/habibulloh22icloud.com/Desktop/Antigravity/muallimi soniy"
FF="$ROOT/tools/ffmpeg"

cut() {
  local src="$1" out="$2" start="$3" end="$4"
  local dur=$(awk "BEGIN{printf \"%.3f\", $end - $start}")
  "$FF" -hide_banner -loglevel error -y -ss "$start" -i "$src" -t "$dur" \
    -c:a libmp3lame -b:a 192k "$out"
}

SRC="$ROOT/public/audio/32. madli 01.mp3"
OUT="$ROOT/Materiallar/madlar/edit_audios/32_madli_01"
rm -rf "$OUT"
mkdir -p "$OUT"

# ═════════════════════════════════════════════════════════════
# Row 1: أ  ب  ت  (alef, ba, ta) × 3 mad forms = 9 syllables
# ═════════════════════════════════════════════════════════════
cut "$SRC" "$OUT/m01_alif_aa.mp3"   33.933   34.732  # آ
cut "$SRC" "$OUT/m02_alif_ii.mp3"   35.155   36.027  # إِى
cut "$SRC" "$OUT/m03_alif_uu.mp3"   36.371   37.197  # أُو
cut "$SRC" "$OUT/m04_ba_aa.mp3"     37.948   38.880  # بَا
cut "$SRC" "$OUT/m05_ba_ii.mp3"     39.209   40.119  # بِى
cut "$SRC" "$OUT/m06_ba_uu.mp3"     40.328   41.173  # بُو
cut "$SRC" "$OUT/m07_ta_aa.mp3"     41.923   42.756  # تَا
cut "$SRC" "$OUT/m08_ta_ii.mp3"     43.155   44.002  # تِى
cut "$SRC" "$OUT/m09_ta_uu.mp3"     44.304   45.086  # تُو

# Row 2: ث  ج  ح
cut "$SRC" "$OUT/m10_tsa_aa.mp3"    45.738   46.559  # ثَا
cut "$SRC" "$OUT/m11_tsa_ii.mp3"    47.033   47.827  # ثِى
cut "$SRC" "$OUT/m12_tsa_uu.mp3"    48.311   49.105  # ثُو
cut "$SRC" "$OUT/m13_ja_aa.mp3"     49.525   50.425  # جَا
cut "$SRC" "$OUT/m14_ja_ii.mp3"     50.725   51.706  # جِى
cut "$SRC" "$OUT/m15_ja_uu.mp3"     52.027   52.980  # جُو
cut "$SRC" "$OUT/m16_hha_aa.mp3"    53.417   54.367  # حَا
cut "$SRC" "$OUT/m17_hha_ii.mp3"    54.824   55.764  # حِى
cut "$SRC" "$OUT/m18_hha_uu.mp3"    56.312   57.075  # حُو

# Row 3: خ  د  ذ
cut "$SRC" "$OUT/m19_kha_aa.mp3"    57.617   58.697  # خَا
cut "$SRC" "$OUT/m20_kha_ii.mp3"    59.195   60.095  # خِى
cut "$SRC" "$OUT/m21_kha_uu.mp3"    60.587   61.467  # خُو
cut "$SRC" "$OUT/m22_da_aa.mp3"     61.978   62.916  # دَا
cut "$SRC" "$OUT/m23_da_ii.mp3"     63.320   64.296  # دِى
cut "$SRC" "$OUT/m24_da_uu.mp3"     64.687   65.662  # دُو
cut "$SRC" "$OUT/m25_dza_aa.mp3"    66.215   67.202  # ذَا
cut "$SRC" "$OUT/m26_dza_ii.mp3"    67.669   68.697  # ذِى
cut "$SRC" "$OUT/m27_dza_uu.mp3"    69.154   70.192  # ذُو

# Row 4: ر  ز  س
cut "$SRC" "$OUT/m28_ra_aa.mp3"     70.840   71.854  # رَا
cut "$SRC" "$OUT/m29_ra_ii.mp3"     72.360   73.331  # رِى
cut "$SRC" "$OUT/m30_ra_uu.mp3"     73.779   74.716  # رُو
cut "$SRC" "$OUT/m31_za_aa.mp3"     75.203   76.273  # زَا
cut "$SRC" "$OUT/m32_za_ii.mp3"     76.653   77.734  # زِى
cut "$SRC" "$OUT/m33_za_uu.mp3"     77.959   79.054  # زُو
cut "$SRC" "$OUT/m34_sa_aa.mp3"     79.592   80.682  # سَا
cut "$SRC" "$OUT/m35_sa_ii.mp3"     81.100   82.165  # سِى
cut "$SRC" "$OUT/m36_sa_uu.mp3"     82.604   83.552  # سُو

# Row 5: ش  ص  ض
cut "$SRC" "$OUT/m37_sha_aa.mp3"    84.295   85.385  # شَا
cut "$SRC" "$OUT/m38_sha_ii.mp3"    85.859   86.923  # شِى
cut "$SRC" "$OUT/m39_sha_uu.mp3"    87.265   88.239  # شُو
cut "$SRC" "$OUT/m40_ssa_aa.mp3"    88.773   89.817  # صَا
cut "$SRC" "$OUT/m41_ssa_ii.mp3"    90.301   91.424  # صِى
cut "$SRC" "$OUT/m42_ssa_uu.mp3"    91.845   92.874  # صُو
cut "$SRC" "$OUT/m43_dho_aa.mp3"    93.384   94.509  # ضَا
cut "$SRC" "$OUT/m44_dho_ii.mp3"    94.941   96.017  # ضِى
cut "$SRC" "$OUT/m45_dho_uu.mp3"    96.427   97.461  # ضُو

# Row 6: ط  ظ  ع
cut "$SRC" "$OUT/m46_tho_aa.mp3"    98.288   99.260  # طَا
cut "$SRC" "$OUT/m47_tho_ii.mp3"    99.779  100.768  # طِى
cut "$SRC" "$OUT/m48_tho_uu.mp3"   101.247  102.190  # طُو
cut "$SRC" "$OUT/m49_zho_aa.mp3"   102.847  103.963  # ظَا
cut "$SRC" "$OUT/m50_zho_ii.mp3"   104.480  105.495  # ظِى
cut "$SRC" "$OUT/m51_zho_uu.mp3"   105.974  106.958  # ظُو
cut "$SRC" "$OUT/m52_ayn_aa.mp3"   107.662  108.639  # عَا
cut "$SRC" "$OUT/m53_ayn_ii.mp3"   109.328  110.369  # عِى
cut "$SRC" "$OUT/m54_ayn_uu.mp3"   110.849  111.888  # عُو

# Row 7: غ  ف  ق
cut "$SRC" "$OUT/m55_gha_aa.mp3"   112.367  113.544  # غَا
cut "$SRC" "$OUT/m56_gha_ii.mp3"   114.016  114.979  # غِى
cut "$SRC" "$OUT/m57_gha_uu.mp3"   115.380  116.409  # غُو
cut "$SRC" "$OUT/m58_fa_aa.mp3"    117.001  118.009  # فَا
cut "$SRC" "$OUT/m59_fa_ii.mp3"    118.444  119.431  # فِى
cut "$SRC" "$OUT/m60_fa_uu.mp3"    119.867  120.699  # فُو
cut "$SRC" "$OUT/m61_qa_aa.mp3"    121.318  122.259  # قَا
cut "$SRC" "$OUT/m62_qa_ii.mp3"    122.731  123.661  # قِى
cut "$SRC" "$OUT/m63_qa_uu.mp3"    124.098  124.940  # قُو

# Row 8: ك  ل  م
cut "$SRC" "$OUT/m64_ka_aa.mp3"    125.590  126.561  # كَا
cut "$SRC" "$OUT/m65_ka_ii.mp3"    126.978  127.896  # كِى
cut "$SRC" "$OUT/m66_ka_uu.mp3"    128.382  129.318  # كُو
cut "$SRC" "$OUT/m67_la_aa.mp3"    129.757  130.770  # لَا
cut "$SRC" "$OUT/m68_la_ii.mp3"    131.212  132.286  # لِى
cut "$SRC" "$OUT/m69_la_uu.mp3"    132.528  133.476  # لُو
cut "$SRC" "$OUT/m70_ma_aa.mp3"    134.046  135.065  # مَا
cut "$SRC" "$OUT/m71_ma_ii.mp3"    135.486  136.517  # مِى
cut "$SRC" "$OUT/m72_ma_uu.mp3"    136.797  137.715  # مُو

# Row 9: ن  و  ه  (kitob tartibi — و و ه o'rinlari almashgan)
cut "$SRC" "$OUT/m73_na_aa.mp3"    138.236  139.229  # نَا
cut "$SRC" "$OUT/m74_na_ii.mp3"    139.602  140.563  # نِى
cut "$SRC" "$OUT/m75_na_uu.mp3"    140.826  141.750  # نُو
cut "$SRC" "$OUT/m76_wa_aa.mp3"    142.273  143.312  # وَا
cut "$SRC" "$OUT/m77_wa_ii.mp3"    143.649  144.668  # وِى
cut "$SRC" "$OUT/m78_wa_uu.mp3"    144.878  145.849  # وُو
cut "$SRC" "$OUT/m79_ha_aa.mp3"    146.407  147.515  # هَا
cut "$SRC" "$OUT/m80_ha_ii.mp3"    147.896  148.985  # هِى
cut "$SRC" "$OUT/m81_ha_uu.mp3"    149.385  150.411  # هُو

# Row 10: ي (faqat 3 syllable)
cut "$SRC" "$OUT/m82_ya_aa.mp3"    150.886  151.997  # يَا
cut "$SRC" "$OUT/m83_ya_ii.mp3"    152.394  153.388  # يِى
cut "$SRC" "$OUT/m84_ya_uu.mp3"    153.717  154.636  # يُو

echo "Done. Madli 01: $(ls "$OUT" | wc -l) chunk."
