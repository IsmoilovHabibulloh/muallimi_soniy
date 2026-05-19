#!/bin/bash
# Cut per-element chunks for page 21 (Mad davomi + Tashdid boshlanishi).
# Manbalar:
#   - 33. madli 02.mp3 (offset ~5:28-6:05) — 3 qator mad davomi (4+6+5 = 15 so'z)
#   - 34. tashdid.mp3 (offset 0-1:46) — intro + 3 rab + 6 qator × 7 = 46 element
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

# ═════════════════════════════════════════════════════════════
# 33. madli 02.mp3 — sahifa 21 yuqori qism (15 mad so'z)
# ═════════════════════════════════════════════════════════════

SRC_M="$ROOT/public/audio/33. madli 02.mp3"
OUT_M="$ROOT/Materiallar/madlar/edit_audios/33_madli_02"
mkdir -p "$OUT_M"

# Row 1: تَعْلِيمْ تَدْرِيسْ تَبْرِيكْ تَحْسِينْ
cut "$SRC_M" "$OUT_M/m21r1_w1_talim.mp3"    328.31  330.48  # تعليم
cut "$SRC_M" "$OUT_M/m21r1_w2_tadris.mp3"   330.87  332.59  # تدريس
cut "$SRC_M" "$OUT_M/m21r1_w3_tabrik.mp3"   333.13  334.50  # تبريك
cut "$SRC_M" "$OUT_M/m21r1_w4_tahsin.mp3"   335.51  337.30  # تحسين

# Row 2: بِيعَة مِيلَة عِيشَة يَبِيعُ يَمِيلُ تَعِيشُ
cut "$SRC_M" "$OUT_M/m21r2_w1_biya.mp3"     337.83  339.06  # بيعة
cut "$SRC_M" "$OUT_M/m21r2_w2_mila.mp3"     339.87  341.16  # ميلة
cut "$SRC_M" "$OUT_M/m21r2_w3_isha.mp3"     342.06  343.32  # عيشة
cut "$SRC_M" "$OUT_M/m21r2_w4_yabi.mp3"     344.15  345.50  # يبيع
cut "$SRC_M" "$OUT_M/m21r2_w5_yamil.mp3"    346.35  347.71  # يميل
cut "$SRC_M" "$OUT_M/m21r2_w6_taish.mp3"    348.55  349.88  # تعيش

# Row 3: تَبِيعِينَ تَوَارِيخْ تَرَاوِيح مُكْرَمِينَ مُسْلِمِينَ
cut "$SRC_M" "$OUT_M/m21r3_w1_tabiin.mp3"   350.82  352.56  # تبيعين
cut "$SRC_M" "$OUT_M/m21r3_w2_tawarikh.mp3" 353.50  355.27  # تواريخ
cut "$SRC_M" "$OUT_M/m21r3_w3_tarawih.mp3"  356.53  358.56  # تراويح
cut "$SRC_M" "$OUT_M/m21r3_w4_mukramin.mp3" 359.93  361.90  # مكرمين
cut "$SRC_M" "$OUT_M/m21r3_w5_muslimin.mp3" 362.71  364.71  # مسلمين

# ═════════════════════════════════════════════════════════════
# 34. tashdid.mp3 — sahifa 21 pastki qism (46 element)
# ═════════════════════════════════════════════════════════════

SRC_T="$ROOT/public/audio/34. tashdid.mp3"
OUT_T="$ROOT/Materiallar/tashdid/edit_audios/34_tashdid"
mkdir -p "$OUT_T"

# Intro narration: "Tashdidli harflar ustiga ushbu tashdid alomatlari
# qo'yilgan harflar ikkilantirib o'qiladi". Foydalanuvchi tasdiqladi:
# narration 0-8.20s da, undan keyin (9.12+) rabba/rabbi/rabbu misollari.
# Avval intro 9.92 da tugatilgan edi — bu rabba'ni ham ushlardi.
cut "$SRC_T" "$OUT_T/t_intro.mp3"   0.55  8.30

# 3 ربب misoli — foydalanuvchi tasdiqladi:
#   rabba: 8-10s oraliqida (haqiqiy speech 9.12-9.90)
#   rabbi: 10-12s oraliqida (haqiqiy speech 10.86-11.68)
#   rabbu: 12-14s oraliqida (haqiqiy speech 12.60-13.45)
cut "$SRC_T" "$OUT_T/t_rab1_rabba.mp3"  9.05   9.95   # رَبَّ (fatha)
cut "$SRC_T" "$OUT_T/t_rab2_rabbi.mp3" 10.80  11.75   # رَبِّ (kasra)
cut "$SRC_T" "$OUT_T/t_rab3_rabbu.mp3" 12.55  13.50   # رَبُّ (damma)

# Row 1: اِنَّ اَنَّ اَمَّ بَرَّ جَرَّ حَجَّ شَكَّ
cut "$SRC_T" "$OUT_T/t_r1_w1_inna.mp3"   14.38  15.93   # اِنَّ
cut "$SRC_T" "$OUT_T/t_r1_w2_anna.mp3"   16.70  17.95   # اَنَّ
cut "$SRC_T" "$OUT_T/t_r1_w3_amma.mp3"   18.72  19.99   # اَمَّ
cut "$SRC_T" "$OUT_T/t_r1_w4_barra.mp3"  20.59  21.70   # بَرَّ
cut "$SRC_T" "$OUT_T/t_r1_w5_jarra.mp3"  22.40  23.54   # جَرَّ
cut "$SRC_T" "$OUT_T/t_r1_w6_hajja.mp3"  24.27  25.39   # حَجَّ
cut "$SRC_T" "$OUT_T/t_r1_w7_shakka.mp3" 26.09  27.27   # شَكَّ

# Row 2: بَرُّ جَرُّ حَجُّ شَكُّ ذَمُّ حَقُّ شَرُّ
cut "$SRC_T" "$OUT_T/t_r2_w1_barru.mp3"   28.53  29.54  # بَرُّ
cut "$SRC_T" "$OUT_T/t_r2_w2_jarru.mp3"   30.38  31.49  # جَرُّ
cut "$SRC_T" "$OUT_T/t_r2_w3_hajju.mp3"   32.35  33.43  # حَجُّ
cut "$SRC_T" "$OUT_T/t_r2_w4_shakku.mp3"  34.39  35.55  # شَكُّ
cut "$SRC_T" "$OUT_T/t_r2_w5_zammu.mp3"   36.62  38.14  # ذَمُّ
cut "$SRC_T" "$OUT_T/t_r2_w6_haqqu.mp3"   39.27  40.38  # حَقُّ
cut "$SRC_T" "$OUT_T/t_r2_w7_sharru.mp3"  41.38  42.47  # شَرُّ

# Row 3: بِرُّ سِرُّ سِتُّ عِزُّ طِلُّ حِلُّ حِسُّ
cut "$SRC_T" "$OUT_T/t_r3_w1_birru.mp3"   43.80  44.86  # بِرُّ
cut "$SRC_T" "$OUT_T/t_r3_w2_sirru.mp3"   45.77  46.85  # سِرُّ
cut "$SRC_T" "$OUT_T/t_r3_w3_sittu.mp3"   47.77  48.89  # سِتُّ
cut "$SRC_T" "$OUT_T/t_r3_w4_izzu.mp3"    49.72  50.80  # عِزُّ
cut "$SRC_T" "$OUT_T/t_r3_w5_tillu.mp3"   51.78  52.81  # طِلُّ
cut "$SRC_T" "$OUT_T/t_r3_w6_hillu.mp3"   53.77  54.95  # حِلُّ
cut "$SRC_T" "$OUT_T/t_r3_w7_hissu.mp3"   55.92  57.02  # حِسُّ

# Row 4: بُرُّ دُرُّ خُفُّ كُلُّ دُبُّ زُقُّ اُمُّ
cut "$SRC_T" "$OUT_T/t_r4_w1_burru.mp3"   58.70  59.67  # بُرُّ
cut "$SRC_T" "$OUT_T/t_r4_w2_durru.mp3"   60.70  61.81  # دُرُّ
cut "$SRC_T" "$OUT_T/t_r4_w3_khuffu.mp3"  62.83  63.90  # خُفُّ
cut "$SRC_T" "$OUT_T/t_r4_w4_kullu.mp3"   65.11  66.23  # كُلُّ
cut "$SRC_T" "$OUT_T/t_r4_w5_dubbu.mp3"   67.31  68.47  # دُبُّ
cut "$SRC_T" "$OUT_T/t_r4_w6_zuqqu.mp3"   69.61  70.81  # زُقُّ
cut "$SRC_T" "$OUT_T/t_r4_w7_ummu.mp3"    72.07  73.51  # اُمُّ

# Row 5: بُرَّ ذُمَّ سُبَّ فُكَّ سُرَّ سُمَّ ثُمَّ
cut "$SRC_T" "$OUT_T/t_r5_w1_burra.mp3"   75.35  76.39  # بُرَّ
cut "$SRC_T" "$OUT_T/t_r5_w2_zumma.mp3"   77.79  79.54  # ذُمَّ
cut "$SRC_T" "$OUT_T/t_r5_w3_subba.mp3"   80.48  81.58  # سُبَّ
cut "$SRC_T" "$OUT_T/t_r5_w4_fukka.mp3"   82.58  83.68  # فُكَّ
cut "$SRC_T" "$OUT_T/t_r5_w5_surra.mp3"   84.64  85.71  # سُرَّ
cut "$SRC_T" "$OUT_T/t_r5_w6_summa.mp3"   86.74  88.20  # سُمَّ
cut "$SRC_T" "$OUT_T/t_r5_w7_thumma.mp3"  89.19  90.83  # ثُمَّ

# Row 6: بُرِّ دُرِّ خُفِّ كُلِّ دُبِّ زُقِّ ضُرِّ
cut "$SRC_T" "$OUT_T/t_r6_w1_burri.mp3"   92.71  93.71  # بُرِّ
cut "$SRC_T" "$OUT_T/t_r6_w2_durri.mp3"   94.67  95.68  # دُرِّ
cut "$SRC_T" "$OUT_T/t_r6_w3_khuffi.mp3"  96.51  97.59  # خُفِّ
cut "$SRC_T" "$OUT_T/t_r6_w4_kulli.mp3"   98.53  99.54  # كُلِّ
cut "$SRC_T" "$OUT_T/t_r6_w5_dubbi.mp3"  100.41 101.57  # دُبِّ
cut "$SRC_T" "$OUT_T/t_r6_w6_zuqqi.mp3"  102.41 103.55  # زُقِّ
cut "$SRC_T" "$OUT_T/t_r6_w7_zurri.mp3"  104.41 105.47  # ضُرِّ

echo "✅ Page 21 chunks ready: 15 mad + 46 tashdid = 61 chunks"
ls "$OUT_M" | wc -l
ls "$OUT_T" | wc -l
