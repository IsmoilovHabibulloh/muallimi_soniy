#!/bin/bash
# Cut audio chunks for page 36 — Ta'awwudh + Surat al-Fatiha + Surat al-Baqarah (1-5)
# Sources:
#   56. Fotiha.mp3 (83.30s) — Ta'awwudh + Bismillah + 6 verses of Fatiha
#   57. Baqara.mp3 (94.46s) — Bismillah + 5 verses of Baqarah
#
# Audio segments (silencedetect -30dB/0.30s + Whisper medium transcribe, 2026-05-21):
#
# === Fotiha (56. Fotiha.mp3) ===
#   1.27 - 8.07s   — A'uzubillah                              ~6.8s
#  10.16 -16.41s   — Bismillah (Fatiha v1)                    ~6.3s
#  21.12 -27.64s   — v2: Alhamdu lillahi rabbil aalamin       ~6.5s
#  29.83 -34.05s   — v3: Ar-Rahmani Rahim                     ~4.2s
#  36.91 -41.25s   — v4: Maliki yawmid din                    ~4.3s
#  44.92 -51.98s   — v5: Iyyaka na'budu wa iyyaka nasta'in    ~7.1s
#  55.83 -61.61s   — v6: Ihdinas siratal mustaqim             ~5.8s
#  65.48 -81.83s   — v7: Siratalladhina ... wala dallin       ~16.3s
#
# === Baqara (57. Baqara.mp3) ===
#   1.76 - 6.98s   — Bismillah (surah opener)                 ~5.2s
#  11.43 -18.67s   — v1: Alif Lam Mim                         ~7.2s
#  21.88 -33.30s   — v2: Dhalikal kitabu ... hudan lil muttaqin (joint, includes sub-pauses) ~11.4s
#  36.51 -50.59s   — v3: Alladhina yu'minuna bil ghayb...     ~14.1s
#  55.35 -77.07s   — v4: Walladhina yu'minuna bima unzila ... yuqinun (joint) ~21.7s
#  80.22 -90.51s   — v5: Ula'ika ala hudan min rabbihim ...    ~10.3s

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC1="$ROOT/public/audio/56. Fotiha.mp3"
SRC2="$ROOT/public/audio/57. Baqara.mp3"
OUT="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/56_fotiha_baqara"
PUB="$ROOT/public/audio/edit/56_fotiha_baqara"
FFMPEG="ffmpeg"

mkdir -p "$OUT" "$PUB"

cut() {
    local src="$1" name="$2" start="$3" end="$4"
    local dur=$(python -c "print(round($end - $start, 3))")
    "$FFMPEG" -y -ss "$start" -i "$src" -t "$dur" -c:a libmp3lame -b:a 192k -loglevel error "$OUT/$name.mp3"
    echo "  $name.mp3 ($dur s)"
}

echo "=== Page 36 — Ta'awwudh + Fatiha + Baqarah 1-5 (14 chunks) ==="

echo "--- Fotiha (56. Fotiha.mp3) ---"
cut "$SRC1" p36_taawwudh      1.20  8.30
cut "$SRC1" p36_fa_bismi     10.10 16.50
cut "$SRC1" p36_fa_v2        21.00 27.80
cut "$SRC1" p36_fa_v3        29.75 34.15
cut "$SRC1" p36_fa_v4        36.80 41.40
cut "$SRC1" p36_fa_v5        44.85 52.10
cut "$SRC1" p36_fa_v6        55.75 61.75
cut "$SRC1" p36_fa_v7        65.40 81.95

echo "--- Baqara (57. Baqara.mp3) ---"
cut "$SRC2" p36_bq_bismi      1.70  7.10
cut "$SRC2" p36_bq_v1        11.35 18.80
cut "$SRC2" p36_bq_v2        21.80 33.45
cut "$SRC2" p36_bq_v3        36.45 50.70
cut "$SRC2" p36_bq_v4        55.30 77.20
cut "$SRC2" p36_bq_v5        80.15 92.95    # 2.3s extra end — oxirgi so'z (المفلحون) tail clip bo'lmasin

echo ""
echo "=== Copying to public/audio/edit/ ==="
cp "$OUT"/p36_*.mp3 "$PUB/"
echo "Done. Files: $(ls "$PUB"/p36_*.mp3 | wc -l) chunks."
