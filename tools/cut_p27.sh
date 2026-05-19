#!/usr/bin/env zsh
# Page 27 — Ta-marbuta + Muqaddara (Alif/Yā/Vāv)
#
# Manba audio:
#   38. t-marbuta.mp3  — yuqori bo'lim (`ة ـة = ت`)
#   39. yoz-o'qiladigan.mp3 — pastki bo'lim (Muqaddara qoidalari)
#
# Vaqtlar silencedetect (-30dB / d=0.5) natijasidan olingan.
# Yuqori bo'lim: 34 segment / 17 element = aniq mapping (har 2 seg = 1 element,
# audio'da har so'z 2 marta o'qilgan tartibi).
# Pastki bo'lim: 67 segment / 33 element — taxminiy mapping (audio strukturasi
# noaniq; foydalanuvchi tinglab tasdiqlasa, mos kelmagan chunks qayta kesilsin).
set -euo pipefail

ROOT="/Users/habibulloh22icloud.com/Desktop/Antigravity/muallimi soniy"
FFMPEG="$ROOT/tools/ffmpeg"
SRC_38="$ROOT/Materiallar/alif hamza va alif lom/audiosi/38. t-marbuta.mp3"
SRC_39="$ROOT/Materiallar/alif hamza va alif lom/audiosi/39. yoz-o'qiladigan.mp3"
OUT_38="$ROOT/public/audio/edit/38_t_marbuta"
OUT_39="$ROOT/public/audio/edit/39_yoz_oqiladigan"

mkdir -p "$OUT_38" "$OUT_39"

cut() {
  local src="$1" out="$2" start="$3" end="$4"
  local dur
  dur=$(awk -v s="$start" -v e="$end" 'BEGIN{printf "%.3f", e - s}')
  "$FFMPEG" -hide_banner -loglevel error -y -ss "$start" -t "$dur" -i "$src" -c copy "$out"
}

# ─────────────────────────────────────────────────────────────
# YUQORI BO'LIM (38. t-marbuta.mp3) — `ة ـة = ت` qoidasi (17 element)
# Har element audio'da 2 marta o'qilgan (silencedetect d=0.5 da 34 seg).
# ─────────────────────────────────────────────────────────────
# head:  ة ـة = ت  (header narration)
cut "$SRC_38" "$OUT_38/p27_head.mp3"             0.96  4.88
# R1 (5 so'z): عَزِيزَةٌ فَرِيدَةٌ حَمِيدَةٌ سَعِيدَةٌ شَهِيدَةٌ
cut "$SRC_38" "$OUT_38/p27_r1_w1_azizatun.mp3"   5.64  9.75
cut "$SRC_38" "$OUT_38/p27_r1_w2_faridatun.mp3"  10.57 14.76
cut "$SRC_38" "$OUT_38/p27_r1_w3_hamidatun.mp3"  15.63 19.74
cut "$SRC_38" "$OUT_38/p27_r1_w4_saidatun.mp3"   20.63 24.93
cut "$SRC_38" "$OUT_38/p27_r1_w5_shahidatun.mp3" 26.37 30.14
# R2 (5 so'z): جَمِيلَةٌ حَلِيمَةٌ سَلِيمَةٌ شَرِيفَةٌ نَعِيمَةٌ
cut "$SRC_38" "$OUT_38/p27_r2_w1_jamilatun.mp3"  31.12 34.86
cut "$SRC_38" "$OUT_38/p27_r2_w2_halimatun.mp3"  35.87 39.39
cut "$SRC_38" "$OUT_38/p27_r2_w3_salimatun.mp3"  41.08 45.41
cut "$SRC_38" "$OUT_38/p27_r2_w4_sharifatun.mp3" 47.16 50.77
cut "$SRC_38" "$OUT_38/p27_r2_w5_naimatun.mp3"   51.81 55.32
# R3 (6 so'z, 3 juftlik): مَرَّةٌ - مَرَّاتٌ، كَرَّةٌ - كَرَّاتٌ، حُرَّةٌ - حُرَّاتٌ
cut "$SRC_38" "$OUT_38/p27_r3_w1_marratun.mp3"   56.29 59.70
cut "$SRC_38" "$OUT_38/p27_r3_w2_marraatun.mp3"  60.88 64.25
cut "$SRC_38" "$OUT_38/p27_r3_w3_karratun.mp3"   65.39 68.98
cut "$SRC_38" "$OUT_38/p27_r3_w4_karraatun.mp3"  70.12 73.35
cut "$SRC_38" "$OUT_38/p27_r3_w5_hurratun.mp3"   74.45 77.57
cut "$SRC_38" "$OUT_38/p27_r3_w6_hurraatun.mp3"  78.56 81.53

# ─────────────────────────────────────────────────────────────
# PASTKI BO'LIM (39. yoz-o'qiladigan.mp3) — Muqaddara qoidalari
# Mapping silencedetect d=0.7 dan taxminiy — uzun narrationlar
# bo'lim sarlavhalari (subtitle/alif_intro/ya_intro/vav_intro).
# ─────────────────────────────────────────────────────────────
# subtitle: `يازلماسه‌ده اوقيلاديگان حرفلر`
cut "$SRC_39" "$OUT_39/p27_subtitle.mp3"          4.07  12.02
# alif_intro: `اَلِف مُقَدَّرَة` + chig'atoy izoh
cut "$SRC_39" "$OUT_39/p27_alif_intro.mp3"        13.12 29.23
# alif R1 (5 so'z): إِلٰهُ رَحْمٰنْ قُرْءَانْ هٰذَا  + (إلاه qavs ichida)
cut "$SRC_39" "$OUT_39/p27_alif_r1_w1_ilah.mp3"   30.32 34.23
cut "$SRC_39" "$OUT_39/p27_alif_r1_w2_rahman.mp3" 35.59 39.32
cut "$SRC_39" "$OUT_39/p27_alif_r1_w3_quran.mp3"  40.60 45.80
cut "$SRC_39" "$OUT_39/p27_alif_r1_w4_haza.mp3"   46.98 51.63
cut "$SRC_39" "$OUT_39/p27_alif_r1_w5_zalika.mp3" 53.04 60.78
# alif R2 (5 so'z): هٰؤُلَاءِ لٰكِنْ ءَامَنَ ءَادَمُ + (zalika allaqachon R1 da)
cut "$SRC_39" "$OUT_39/p27_alif_r2_w1_haulai.mp3" 62.28 65.71
cut "$SRC_39" "$OUT_39/p27_alif_r2_w2_lakin.mp3"  66.99 71.63
cut "$SRC_39" "$OUT_39/p27_alif_r2_w3_amana.mp3"  72.60 76.71
cut "$SRC_39" "$OUT_39/p27_alif_r2_w4_adam.mp3"   77.97 83.01
cut "$SRC_39" "$OUT_39/p27_alif_r2_w5_akhar.mp3"  84.46 88.10
# alif R3 (5 so'z): اٰخَرُ اٰمَنَّا اِبْرٰهِيمْ اِسْمٰعِيلْ اِسْحٰقْ
cut "$SRC_39" "$OUT_39/p27_alif_r3_w1_amanna.mp3" 89.28 93.47
cut "$SRC_39" "$OUT_39/p27_alif_r3_w2_ibr.mp3"    94.39 98.78
cut "$SRC_39" "$OUT_39/p27_alif_r3_w3_ism.mp3"    99.97 104.34
cut "$SRC_39" "$OUT_39/p27_alif_r3_w4_ishaq.mp3"  105.48 110.17
cut "$SRC_39" "$OUT_39/p27_alif_r3_w5_extra.mp3"  111.23 115.58
# ya_intro: `يَائ مُقَدَّرَة` + izoh
cut "$SRC_39" "$OUT_39/p27_ya_intro.mp3"          116.52 122.42
# ya R1 (5 so'z): بِهٖ بِاَمْرِهٖ بِحُكْمِهٖ بِقُدْرَتِهٖ هٰذِهٖ
cut "$SRC_39" "$OUT_39/p27_ya_r1_w1_bihi.mp3"     124.45 129.57
cut "$SRC_39" "$OUT_39/p27_ya_r1_w2_biamrihi.mp3" 130.28 133.30
cut "$SRC_39" "$OUT_39/p27_ya_r1_w3_bihukmihi.mp3" 133.94 137.18
cut "$SRC_39" "$OUT_39/p27_ya_r1_w4_biqudratihi.mp3" 137.94 141.84
cut "$SRC_39" "$OUT_39/p27_ya_r1_w5_hazihi.mp3"   142.69 145.08
# vav_intro: `وَاو مُقَدَّرَة` + izoh
cut "$SRC_39" "$OUT_39/p27_vav_intro.mp3"         145.08 152.02
# vav R1 (5 so'z): لَهُ اَمْرُهُ حُكْمُهُ قُدْرَتُهُ مَالُهُ
cut "$SRC_39" "$OUT_39/p27_vav_r1_w1_lahu.mp3"    152.91 157.71
cut "$SRC_39" "$OUT_39/p27_vav_r1_w2_amruhu.mp3"  158.69 163.26
cut "$SRC_39" "$OUT_39/p27_vav_r1_w3_hukmuhu.mp3" 164.45 167.43
cut "$SRC_39" "$OUT_39/p27_vav_r1_w4_qudratuhu.mp3" 167.43 174.79
cut "$SRC_39" "$OUT_39/p27_vav_r1_w5_maluhu.mp3"  175.87 179.67
# vav R2 (4 so'z): دَاوُدْ طَاوُسْ رُؤُسْ يَقْرَؤُنْ
cut "$SRC_39" "$OUT_39/p27_vav_r2_w1_daud.mp3"    180.72 183.06
cut "$SRC_39" "$OUT_39/p27_vav_r2_w2_taus.mp3"    183.06 185.44
cut "$SRC_39" "$OUT_39/p27_vav_r2_w3_ruus.mp3"    185.44 186.36
cut "$SRC_39" "$OUT_39/p27_vav_r2_w4_yaqra.mp3"   186.36 187.60

echo "Page 27 chunks cut successfully."
ls -la "$OUT_38" | tail -20
echo "---"
ls -la "$OUT_39" | tail -40
