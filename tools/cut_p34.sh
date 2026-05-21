#!/bin/bash
# Cut audio chunks for page 34 — Iymon kalimalari (5 kalima)
# Sources: 49-52. kalimalar 01-04.mp3 (kalimalarning asl nusxalari)
#
# Layout:
#   Title:         49 [0.998-2.540] — "Kalimat-i iyman"
#   Kalima 1 (Tayyiba):
#     heading:     49 [4.423-6.181]
#     body:        49 [9.097-16.594]
#   Kalima 2 (Shahada):
#     heading:     49 [18.040-19.478]
#     part1:       49 [22.099-27.537]
#     part2:       49 [27.686-32.967]
#   Kalima 3 (Tawhid):  audio 50
#     heading:     50 [0.694-2.204]
#     part1:       50 [4.464-12.107]
#     part2:       50 [13.780-18.999]
#     part3:       50 [20.357-23.431]
#     part4:       50 [24.734-31.292]
#   Kalima 4 (Radd-i kufr):  audio 51
#     heading:     51 [1.190-2.885]
#     part1:       51 [5.727-16.068]
#     part2:       51 [17.195-22.028]
#     part3:       51 [23.086-28.296]
#   Kalima 5 (Istighfar):  audio 52
#     heading:     52 [0.599-2.445]
#     ast1:        52 [4.123-6.886]
#     ast2:        52 [7.772-10.599]
#     ast3:        52 [11.970-14.300]  (3rd "Astaghfirullaha" extracted from start of seg4)
#     extension:   52 [14.300-22.936]  (ta'ala min kulli dhanbin..khata'an — NO sirran, sirran is in seg5)
#     p2 (alaniya):52 [24.045-26.626]  (sirran aw 'alaniyatan — audio extra: kitobda faqat "sirran")
#     p3 (tawba):  52 [27.957-38.435]  (wa atubu ilayhi mina dhanbi alladhi a'lamu wa mina dhanbi alladhi la a'lam)
#     p4 (ghuyub): 52 [39.627-44.416]  (innaka anta 'allamul ghuyub)
#
# Boundaries from silencedetect -32dB/0.30s (with finer -28dB/0.10s for Shahada split).
# Whisper medium model bilan transcribe qilingan: 2026-05-21.

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC1="$ROOT/public/audio/49. kalimalar 01.mp3"
SRC2="$ROOT/public/audio/50. kalimalar 02.mp3"
SRC3="$ROOT/public/audio/51. kalimalar 03.mp3"
SRC4="$ROOT/public/audio/52. kalimalar 04.mp3"
OUT="$ROOT/Materiallar/kalimalarning asl nusxalari/edit_audios/49_kalimalar_01"
PUB="$ROOT/public/audio/edit/49_kalimalar_01"
FFMPEG="ffmpeg"

mkdir -p "$OUT" "$PUB"

cut() {
    local src="$1" name="$2" start="$3" end="$4"
    local dur=$(python -c "print(round($end - $start, 3))")
    "$FFMPEG" -y -ss "$start" -i "$src" -t "$dur" -c:a libmp3lame -b:a 192k -loglevel error "$OUT/$name.mp3"
    echo "  $name.mp3 ($dur s)"
}

echo "=== Page 34 — Iymon kalimalari (22 chunks) ==="

echo "--- Title + Kalima 1 (Tayyiba) + Kalima 2 (Shahada) — audio 49 ---"
cut "$SRC1" p34_title          0.998  2.540
cut "$SRC1" p34_k1_head        4.423  6.181
cut "$SRC1" p34_k1_body        9.097 16.594
cut "$SRC1" p34_k2_head       18.040 19.478
cut "$SRC1" p34_k2_p1         22.099 27.537
cut "$SRC1" p34_k2_p2         27.686 32.967

echo "--- Kalima 3 (Tawhid) — audio 50 ---"
cut "$SRC2" p34_k3_head        0.694  2.204
cut "$SRC2" p34_k3_p1          4.464 12.107
cut "$SRC2" p34_k3_p2         13.780 18.999
cut "$SRC2" p34_k3_p3         20.357 23.431
cut "$SRC2" p34_k3_p4         24.734 31.292

echo "--- Kalima 4 (Radd-i Kufr) — audio 51 ---"
cut "$SRC3" p34_k4_head        1.190  2.885
cut "$SRC3" p34_k4_p1          5.727 16.068
cut "$SRC3" p34_k4_p2         17.195 22.028
cut "$SRC3" p34_k4_p3         23.086 28.296

echo "--- Kalima 5 (Istighfar) — audio 52 ---"
cut "$SRC4" p34_k5_head        0.599  2.445
cut "$SRC4" p34_k5_ast1        4.123  6.886
cut "$SRC4" p34_k5_ast2        7.772 10.599
cut "$SRC4" p34_k5_ast3       11.970 14.300
cut "$SRC4" p34_k5_ext        14.300 22.936
cut "$SRC4" p34_k5_p2_alaniya 24.045 26.626
cut "$SRC4" p34_k5_p3_tawba   27.957 38.435
cut "$SRC4" p34_k5_p4_ghuyub  39.627 44.416

echo ""
echo "=== Copying to public/audio/edit/ ==="
cp "$OUT"/p34_*.mp3 "$PUB/"
echo "Done. Files: $(ls "$PUB"/p34_*.mp3 | wc -l) chunks."
