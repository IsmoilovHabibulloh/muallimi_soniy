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
# 2026-05-19 REMAPPED: source plays 16 words once (0-39.4s) + rule narration
# (41-45s) + 16 words again (47-81s). Old cuts were 4s each — they grabbed
# PAIRS of different words, not single repeats. Each cut now single word
# from FIRST reading.
# ─────────────────────────────────────────────────────────────
# head: chig'atoy rule narration (segments 16-17 from silencedetect)
cut "$SRC_38" "$OUT_38/p27_head.mp3"             41.00 42.15    # only "Ta-yi marbuta" + 80ms fade-out
# Apply fade: ffmpeg ... -af "afade=t=out:st=1.07:d=0.08" ... (run manually)
# R1 (5 so'z): عَزِيزَةٌ فَرِيدَةٌ حَمِيدَةٌ سَعِيدَةٌ شَهِيدَةٌ
cut "$SRC_38" "$OUT_38/p27_r1_w1_azizatun.mp3"    0.85  2.65
cut "$SRC_38" "$OUT_38/p27_r1_w2_faridatun.mp3"   3.25  5.00
cut "$SRC_38" "$OUT_38/p27_r1_w3_hamidatun.mp3"   5.55  7.40
cut "$SRC_38" "$OUT_38/p27_r1_w4_saidatun.mp3"    8.05  9.90
cut "$SRC_38" "$OUT_38/p27_r1_w5_shahidatun.mp3" 10.50 12.35
# R2 (5 so'z): جَمِيلَةٌ حَلِيمَةٌ سَلِيمَةٌ شَرِيفَةٌ نَعِيمَةٌ
cut "$SRC_38" "$OUT_38/p27_r2_w1_jamilatun.mp3"  12.95 14.90
cut "$SRC_38" "$OUT_38/p27_r2_w2_halimatun.mp3"  15.55 17.35
cut "$SRC_38" "$OUT_38/p27_r2_w3_salimatun.mp3"  18.05 19.85
cut "$SRC_38" "$OUT_38/p27_r2_w4_sharifatun.mp3" 20.60 22.45
cut "$SRC_38" "$OUT_38/p27_r2_w5_naimatun.mp3"   23.25 25.05
# R3 (6 so'z, 3 juftlik): مَرَّةٌ - مَرَّاتٌ، كَرَّةٌ - كَرَّاتٌ، حُرَّةٌ - حُرَّاتٌ
cut "$SRC_38" "$OUT_38/p27_r3_w1_marratun.mp3"   26.35 27.80
cut "$SRC_38" "$OUT_38/p27_r3_w2_marraatun.mp3"  28.40 30.25
cut "$SRC_38" "$OUT_38/p27_r3_w3_karratun.mp3"   31.10 32.50
cut "$SRC_38" "$OUT_38/p27_r3_w4_karraatun.mp3"  33.30 35.00
cut "$SRC_38" "$OUT_38/p27_r3_w5_hurratun.mp3"   35.85 37.15
cut "$SRC_38" "$OUT_38/p27_r3_w6_hurraatun.mp3"  37.90 39.50

# ─────────────────────────────────────────────────────────────
# PASTKI BO'LIM (39. yoz-o'qiladigan.mp3) — Muqaddara qoidalari
# Mapping silencedetect d=0.7 dan taxminiy — uzun narrationlar
# bo'lim sarlavhalari (subtitle/alif_intro/ya_intro/vav_intro).
# ─────────────────────────────────────────────────────────────
# subtitle: `يازلماسه‌ده اوقيلاديگان حرفلر`
cut "$SRC_39" "$OUT_39/p27_subtitle.mp3"          0.00   3.00    # mavzu nomi (yozilmasada o'qiladigan harflar)
# alif_intro: `اَلِف مُقَدَّرَة` + chig'atoy izoh
cut "$SRC_39" "$OUT_39/p27_alif_intro.mp3"         4.05  5.85    # faqat "Alif Muqaddara" nomi (arabcha)
# alif 14 words (R1: 4, R2: 5, R3: 5) — 2026-05-19 REMAPPED via silencedetect.
# Source plays 14 words starting at 13.1s. r2_w1_haulai is elongated (3.75s).
cut "$SRC_39" "$OUT_39/p27_alif_r1_w1_ilah.mp3"   13.10 14.45
cut "$SRC_39" "$OUT_39/p27_alif_r1_w2_rahman.mp3" 15.55 17.20
cut "$SRC_39" "$OUT_39/p27_alif_r1_w3_quran.mp3"  18.20 19.70
cut "$SRC_39" "$OUT_39/p27_alif_r1_w4_haza.mp3"   20.50 21.95
cut "$SRC_39" "$OUT_39/p27_alif_r1_w5_zalika.mp3" 23.05 24.45    # alif_r2_w1 element
cut "$SRC_39" "$OUT_39/p27_alif_r2_w1_haulai.mp3" 25.55 29.30    # alif_r2_w2 (elongated)
cut "$SRC_39" "$OUT_39/p27_alif_r2_w2_lakin.mp3"  30.25 31.65    # alif_r2_w3
cut "$SRC_39" "$OUT_39/p27_alif_r2_w3_amana.mp3"  33.05 34.30    # alif_r2_w4
cut "$SRC_39" "$OUT_39/p27_alif_r2_w4_adam.mp3"   35.55 36.85    # alif_r2_w5
cut "$SRC_39" "$OUT_39/p27_alif_r2_w5_akhar.mp3"  38.05 39.40    # alif_r3_w1
cut "$SRC_39" "$OUT_39/p27_alif_r3_w1_amanna.mp3" 40.55 42.60    # alif_r3_w2
cut "$SRC_39" "$OUT_39/p27_alif_r3_w2_ibr.mp3"    43.70 45.85    # alif_r3_w3 ibrahim
cut "$SRC_39" "$OUT_39/p27_alif_r3_w3_ism.mp3"    46.90 49.10    # alif_r3_w4 ismail
cut "$SRC_39" "$OUT_39/p27_alif_r3_w4_ishaq.mp3"  50.10 51.70    # alif_r3_w5 ishaq
# 2026-05-19 REMAPPED — old timestamps were 2x off. Source plays each word
# once around 53-107s. Intro = just the Arabic name (like alif_intro).
# ya_intro: faqat "Yā Muqaddara" (arabcha)
cut "$SRC_39" "$OUT_39/p27_ya_intro.mp3"          53.00 54.65
# ya R1 (5 so'z): بِهٖ بِاَمْرِهٖ بِحُكْمِهٖ بِقُدْرَتِهٖ هٰذِهٖ
cut "$SRC_39" "$OUT_39/p27_ya_r1_w1_bihi.mp3"     62.20 63.25
cut "$SRC_39" "$OUT_39/p27_ya_r1_w2_biamrihi.mp3" 64.15 65.80
cut "$SRC_39" "$OUT_39/p27_ya_r1_w3_bihukmihi.mp3" 66.85 68.55
cut "$SRC_39" "$OUT_39/p27_ya_r1_w4_biqudratihi.mp3" 69.55 71.70
cut "$SRC_39" "$OUT_39/p27_ya_r1_w5_hazihi.mp3"   72.55 74.20
# vav_intro: faqat "Vāv Muqaddara" (arabcha)
cut "$SRC_39" "$OUT_39/p27_vav_intro.mp3"         75.00 76.80
# vav R1 (5 so'z): لَهُ اَمْرُهُ حُكْمُهُ قُدْرَتُهُ مَالُهُ
cut "$SRC_39" "$OUT_39/p27_vav_r1_w1_lahu.mp3"    84.40 85.45
cut "$SRC_39" "$OUT_39/p27_vav_r1_w2_amruhu.mp3"  86.65 88.20
cut "$SRC_39" "$OUT_39/p27_vav_r1_w3_hukmuhu.mp3" 89.20 90.75
cut "$SRC_39" "$OUT_39/p27_vav_r1_w4_qudratuhu.mp3" 91.65 93.55
cut "$SRC_39" "$OUT_39/p27_vav_r1_w5_maluhu.mp3"  94.30 96.00
# vav R2 (4 so'z): دَاوُدْ طَاوُسْ رُؤُسْ يَقْرَؤُنْ
cut "$SRC_39" "$OUT_39/p27_vav_r2_w1_daud.mp3"    97.30 98.85
cut "$SRC_39" "$OUT_39/p27_vav_r2_w2_taus.mp3"    99.90 101.60
cut "$SRC_39" "$OUT_39/p27_vav_r2_w3_ruus.mp3"   102.85 104.40
cut "$SRC_39" "$OUT_39/p27_vav_r2_w4_yaqra.mp3"  105.40 107.35

echo "Page 27 chunks cut successfully."
ls -la "$OUT_38" | tail -20
echo "---"
ls -la "$OUT_39" | tail -40
