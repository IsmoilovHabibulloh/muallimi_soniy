#!/bin/bash
# Cut Zo (ظ) audio chunks from 31. zo.mp3 — page 16
set -e

cd "$(dirname "$0")/.."
FFMPEG=./tools/ffmpeg
SRC="muallimus-soniy/public/audio/31. zo.mp3"
OUT="Materiallar/harflar/edit_audios/31_zho"
mkdir -p "$OUT"

cut() {
  local name="$1"; local start="$2"; local end="$3"
  local bs=$(awk "BEGIN{s=$start-0.05; if(s<0)s=0; print s}")
  local be=$(awk "BEGIN{print $end+0.10}")
  local dur=$(awk "BEGIN{print $be-$bs}")
  "$FFMPEG" -y -ss "$bs" -t "$dur" -i "$SRC" -c:a libmp3lame -b:a 192k "$OUT/$name.mp3" 2>/dev/null
}

# Headers (3) — pozitsion shakllar
cut "zh01_fatha"  0.487 1.003
cut "zh02_kasra"  1.723 2.294
cut "zh03_damma"  2.880 3.449

# Row 1 (6): ظَنْ ظِلْ فَظْ حَظْ عَظْ لَظْ
cut "zh04_zan"    4.913 5.737
cut "zh05_zil"    6.886 7.700
cut "zh06_faz"    8.832 9.582
cut "zh07_haz"   10.750 11.573
cut "zh08_az"    12.863 13.629
cut "zh09_laz"   15.009 15.854

# Row 2 (6): ظَفَرْ نَظَرْ حَظَرْ ظَمَرْ ظَلْفْ عِظَمْ
cut "zh10_zafar"     17.159 18.057
cut "zh11_nazar"     19.486 20.435
cut "zh12_hazar"     21.827 22.860
cut "zh13_zamar"     24.432 25.417
cut "zh14_zalf"      27.048 27.937
cut "zh15_izam"      29.808 30.834

# Row 3 (6): نِظَامْ ظَلْفُ ظِلْفْ حَظْلْ ظُلْمُ ظُهْرُ
cut "zh16_nizam"     32.334 33.524
cut "zh17_zalfu"     35.012 36.379
cut "zh18_zilf"      38.097 39.371
cut "zh19_hazl"      41.150 42.347
cut "zh20_zulmu"     44.084 45.291
cut "zh21_zuhru"     47.073 48.345

# Row 4 (6): اَظْهَرْ اَظْفَرْ مَظْهَرْ مَنْظَرْ مُظْهِرْ مُظْلِمْ
cut "zh22_azhar"     50.249 51.455
cut "zh23_azfar"     53.137 54.359
cut "zh24_mazhar"    56.041 57.387
cut "zh25_manzar"    59.167 60.753
cut "zh26_muzhir"    63.706 64.923
cut "zh27_muzlim"    66.857 68.189

# Row 5 (6 — past/present pairs): ظَهَرَ يَظْهَرُ نَظَرَ يَنْظُرُ ظَلَمَ يَظْلِمُ
cut "zh28_zahara"    69.743 70.794
cut "zh29_yazharu"   72.408 73.763
cut "zh30_nazara"    75.348 76.380
cut "zh31_yanzuru"   77.924 79.482
cut "zh32_zalama"    81.096 82.106
cut "zh33_yazlimu"   83.776 85.139

# Row 6 (4 — past/present pairs): اِنْتَظَمَ يَنْتَظِمُ اِسْتَعْظَمَ يَسْتَعْظِمُ
cut "zh34_intazama"   87.881 89.693
cut "zh35_yantazimu"  91.193 93.153
# zh36 — silence_detect oldingi "is" vowel attack'ni tushirib yuborardi; oldindan 0.48s qo'shildi
./tools/ffmpeg -y -ss 94.9 -t 2.01 -i "$SRC" -c:a libmp3lame -b:a 192k "$OUT/zh36_istazama.mp3" 2>/dev/null
cut "zh37_yastazimu"  98.089 100.298

# Comparison L1 (6 — 3 pairs zal/zo, ha-zo/ha-dod, zo/dod)
cut "zh38_zafar_zal"   102.858 103.745
cut "zh39_zafar_zo"    105.116 106.032
cut "zh40_hazar_zo"    107.943 108.808
cut "zh41_hadar_dod"   110.382 111.286
cut "zh42_zahr_zo"     113.011 114.237
cut "zh43_dahr_dod"    115.786 117.035

# Comparison L2 (6 — 3 pairs za/zo)
cut "zh44_zahr_za"     118.800 119.700
cut "zh45_zahr_zo2"    121.265 122.270
cut "zh46_azhar_za"    123.969 125.133
cut "zh47_azhar_zo"    126.597 127.774
cut "zh48_azam_za"     129.613 130.878
cut "zh49_azam_zo"     132.540 133.908

echo "Done: $(ls "$OUT" | wc -l) chunks written to $OUT"

# Mirror to public/audio/edit
mkdir -p "muallimus-soniy/public/audio/edit/31_zho"
cp "$OUT"/*.mp3 "muallimus-soniy/public/audio/edit/31_zho/"
echo "Mirrored to muallimus-soniy/public/audio/edit/31_zho/"
