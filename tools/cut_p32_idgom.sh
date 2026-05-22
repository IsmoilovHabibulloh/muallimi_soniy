#!/bin/bash
# Cut audio chunks for page 32 — Idg'om section (kitobning aniq matnlari).
# Source: 44. idg'om.mp3 (49.19s) — title + 12 misol (6 qator × 2 ustun).
#
# Audio strukturasi (silencedetect -32dB/0.30s + Whisper medium tasdiq):
#   title:     ~1.488-1.999  "إِدْغَام"
#   ex1:        4.067-5.613   مِنْ مَسَدٍ
#   ex2:        6.926-8.743   لَنْ نُؤْمِنَ
#   ex3:       10.210-11.936  مِنْ وَلِيٍّ
#   ex4:       13.755-15.738  وَمَنْ يَعْمَلْ
#   ex5:       17.743-18.961  وَمَنْ لَمْ
#   ex6:       20.304-22.112  مِنْ رَبِّهِمْ
#   ex7:       23.822-25.592  هُدًى مِنْ
#   ex8:       27.177-29.764  شَيْئًا نُكْرًا
#   ex9:       32.132-34.876  اِلٰهٌ وَاحِدٌ
#   ex10:      36.615-38.835  خَيْرًا يَرَهُ
#   ex11:      40.839-43.826  هُدًى لِلْمُتَّقِينَ  (2 sound regions birga — natural pause inside)
#   ex12:      45.423-48.149  غَفُورٌ رَحِيمٌ
#
# Cut buffers: -50ms boshida, +100ms oxirida (xavfsizlik).

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_ORIG="$ROOT/public/audio/44. idg'om.mp3"
# Apostrophe in path breaks subshells — use temp copy without apostrophe.
SRC="$ROOT/public/audio/44. idgom.mp3"
cp "$SRC_ORIG" "$SRC"
OUT="$ROOT/Materiallar/vasl vaqf idg'om va boshqalar/edit_audios/44_idgom"
PUB="$ROOT/public/audio/edit/44_idgom"
FFMPEG="ffmpeg"

mkdir -p "$OUT" "$PUB"

cut() {
    local name="$1" start="$2" end="$3"
    local dur
    dur=$(python -c "print(round($end - $start, 3))")
    "$FFMPEG" -y -ss "$start" -i "$SRC" -t "$dur" -c:a libmp3lame -b:a 192k -loglevel error "$PUB/$name.mp3"
    echo "  $name.mp3 ($dur s)"
}

echo "=== Page 32 Idg'om (13 chunk) ==="

cut p32_title         1.40   2.10     # إِدْغَام
cut p32_e01_minmasad  4.00   5.75     # مِنْ مَسَدٍ
cut p32_e02_lannumin  6.85   8.85     # لَنْ نُؤْمِنَ
cut p32_e03_minwali  10.15  12.05     # مِنْ وَلِيٍّ
cut p32_e04_wamanya  13.70  15.85     # وَمَنْ يَعْمَلْ
cut p32_e05_wamanlam 17.70  19.10     # وَمَنْ لَمْ
cut p32_e06_minrabb  20.25  22.25     # مِنْ رَبِّهِمْ
cut p32_e07_hudamin  23.75  25.75     # هُدًى مِنْ
cut p32_e08_shaynkr  27.10  29.95     # شَيْئًا نُكْرًا
cut p32_e09_ilahwah  32.05  35.05     # اِلٰهٌ وَاحِدٌ
cut p32_e10_khayyar  36.55  39.05     # خَيْرًا يَرَهُ
cut p32_e11_hudalmu  40.75  43.95     # هُدًى لِلْمُتَّقِينَ
cut p32_e12_ghafrah  45.35  48.30     # غَفُورٌ رَحِيمٌ

echo ""
echo "=== Copying to Materiallar (master backup) ==="
# OUT path has apostrophe — handle via cp with quoted target
if [ -d "$OUT" ] || mkdir -p "$OUT" 2>/dev/null; then
    cp "$PUB"/p32_*.mp3 "$OUT/" 2>/dev/null || echo "  (skipped — path issue)"
fi
rm -f "$SRC"  # cleanup temp copy
echo "Done. Files in public: $(ls "$PUB"/p32_*.mp3 | wc -l) chunks."
