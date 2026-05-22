#!/bin/bash
# Cut audio chunks for page 33 — Arab harflari ismi.
# Source: 47. harflar nomi.mp3 (38.77s) — TITLE + 29 letter names.
#
# ⚠️ Eski versiyada chunklar SHIFTED — eski p33_h01_alif.mp3 aslida TITLE
# ni o'z ichiga olardi. Bu skript boundary'larni qayta tartibga soladi:
# yangi p33_top_title.mp3 = TITLE, yangi p33_h01_alif.mp3 = Alif, va h.k.
#
# Sound segments (silencedetect -30dB/0.20s + Whisper medium tasdiq):
#  title:    0.263-1.839  (1.58s) — "Arab harflarining ismlari"
#  h01 alif: 3.855-4.211  (0.36s)
#  h02 ba:   5.165-5.720
#  h03 ta:   6.083-6.697
#  ...
#  h29 ya:   37.914-38.292
#
# Buffers: -50ms boshida, +120ms oxirida (qisqa harflar uchun tail).

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/public/audio/47. harflar nomi.mp3"
PUB="$ROOT/public/audio/edit/47_harflar"
FFMPEG="ffmpeg"

mkdir -p "$PUB"

cut() {
    local name="$1" start="$2" end="$3"
    local dur
    dur=$(python -c "print(round($end - $start, 3))")
    "$FFMPEG" -y -ss "$start" -i "$SRC" -t "$dur" -c:a libmp3lame -b:a 192k -loglevel error "$PUB/$name.mp3"
    echo "  $name.mp3 ($dur s)"
}

echo "=== Page 33 Arab harflari ismi (1 title + 29 letters) ==="

cut p33_top_title    0.20  2.00     # عرب حرفلرینینگ اسملری

cut p33_h01_alif     3.75  4.40     # ا
cut p33_h02_ba       5.05  5.85     # ب
cut p33_h03_ta       5.95  6.80     # ت
cut p33_h04_tsa      6.95  7.80     # ث
cut p33_h05_jim      8.05  8.95     # ج
cut p33_h06_ha       9.25 10.05     # ح
cut p33_h07_kha     10.30 11.20     # خ
cut p33_h08_dal     11.55 12.45     # د
cut p33_h09_zal     12.65 13.70     # ذ
cut p33_h10_ra      13.95 14.75     # ر
cut p33_h11_za      15.05 15.95     # ز
cut p33_h12_sin     16.20 17.15     # س
cut p33_h13_shin    17.30 18.30     # ش
cut p33_h14_sod     18.50 19.40     # ص
cut p33_h15_dod     19.65 20.65     # ض
cut p33_h16_to      20.95 21.80     # ط
cut p33_h17_zo      22.15 23.05     # ظ
cut p33_h18_ayn     23.40 24.40     # ع
cut p33_h19_ghayn   24.65 25.80     # غ
cut p33_h20_fa      26.15 26.90     # ف
cut p33_h21_qof     27.27 28.05     # ق
cut p33_h22_kof     28.65 29.40     # ك
cut p33_h23_lam     29.90 30.80     # ل
cut p33_h24_mim     31.15 32.05     # م
cut p33_h25_nun     32.40 33.35     # ن
cut p33_h26_waw     33.70 34.60     # و
cut p33_h27_haa     35.10 35.90     # ه
cut p33_h28_lamalif 36.20 37.30     # لا
cut p33_h29_ya      37.85 38.50     # ي

echo ""
echo "Done. Files in public: $(ls "$PUB"/p33_top_title.mp3 "$PUB"/p33_h*.mp3 2>/dev/null | wc -l) chunks."
