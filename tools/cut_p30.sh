#!/bin/bash
# Cut audio chunks for page 30 — Alif Lom + Vasl section.
# Source: 37. alif va hamza.mp3 (3:36) — page 30 narration is 119-217s.
# Layout:
#   TOP (alif-lom vasl examples, 21 phrases in 6 rows): 119.31-188.74s (regions 1-21)
#   [4.54s break — divider between top/bottom]
#   BOTTOM (3-word vasl examples, 8 phrases in 4 rows × 2 cols): 193.28-216.05s (regions 22-29)
# Chig'atoy rules + vasl title = static text (no audio narration).
# Boundaries from silencedetect -28dB/0.35s + -50ms/+100ms safety buffers.

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/public/audio/37. alif va hamza.mp3"
OUT="$ROOT/Materiallar/alif hamza va alif lom/edit_audios/37_alif_hamza"
PUB="$ROOT/public/audio/edit/37_alif_hamza"
FFMPEG="$ROOT/tools/ffmpeg"

mkdir -p "$OUT" "$PUB"

cut() {
    local name="$1" start="$2" end="$3"
    local dur=$(python3 -c "print(round($end - $start, 3))")
    "$FFMPEG" -y -ss "$start" -i "$SRC" -t "$dur" -c:a libmp3lame -b:a 192k -loglevel error "$OUT/$name.mp3"
    echo "  $name.mp3 ($dur s)"
}

echo "=== Page 30 alif-lom + vasl (29 chunks) ==="

echo "--- TOP: Row 1 (4 phrases) — هٰذَا الْبَلَدُ ، مَا الْقَارِعَةُ ، مَا الْحُطَمَةُ ، هٰذَا الَّذِى ---"
cut p30_r1_w1_hadhalbaladu      119.31 121.51
cut p30_r1_w2_malqariatu        122.63 124.95
cut p30_r1_w3_malhutamatu       126.07 128.32
cut p30_r1_w4_hadhalladhi       129.75 131.98

echo "--- TOP: Row 2 (3 phrases) — مَنْ ذَا الَّذِى ، تَحْتَهَا الْأَنْهَارُ ، فَقُلْنَا اضْرِبْ ---"
cut p30_r2_w1_mandhalladhi      133.27 135.64
cut p30_r2_w2_tahtahalanhar     138.11 139.99
cut p30_r2_w3_faqulnadrib       141.21 143.21

echo "--- TOP: Row 3 (3 phrases) — بِئْسَ الِاسْمُ ، اِهْدِنَا الصِّرَاطَ ، يَا أَيُّهَا النَّاسُ ---"
cut p30_r3_w1_bisalismu         144.38 146.54
cut p30_r3_w2_ihdinasirata      147.82 150.14
cut p30_r3_w3_yaayyuhannas      151.44 153.81

echo "--- TOP: Row 4 (4 phrases) — اِلَى النَّاسِ ، عَلَى النَّاسِ ، فِى الْأَرْضِ ، فِى الصُّدُورِ ---"
cut p30_r4_w1_ilannas           155.55 156.72
cut p30_r4_w2_alannas           158.00 159.07
cut p30_r4_w3_filard            160.29 161.51
cut p30_r4_w4_fissudur          162.84 163.94

echo "--- TOP: Row 5 (4 phrases) — قَالُوا اتَّخَذَ ، قَالُوا ادْعُ ، لَقُوا الَّذِينَ ، اُوتُوا الْكِتَابَ ---"
cut p30_r5_w1_qaluttakhadha     165.16 166.46
cut p30_r5_w2_qaludu            167.91 170.66
cut p30_r5_w3_laqulladhina      172.60 174.64
cut p30_r5_w4_utulkitab         175.84 177.94

echo "--- TOP: Row 6 (3 phrases) — وَأَقِيمُوا الصَّلٰوةَ ، وَآتُوا الزَّكٰوةَ ، وَعَمِلُوا الصّٰلِحٰت ---"
cut p30_r6_w1_waaqimusalat      179.30 181.45
cut p30_r6_w2_waatuzakat        182.85 185.02
cut p30_r6_w3_waamilussalihat   186.31 188.84

echo "--- BOTTOM: Row 1 (2 phrases) — اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ، وَهٰذَا الْبَلَدُ الْأَمِينَ ---"
cut p30_b1_w1_ihdinasiratmust   193.23 194.82
cut p30_b1_w2_wahadhalbaladamn  196.28 197.70

echo "--- BOTTOM: Row 2 (2 phrases) — نَارُ اللهِ الْمُوقَدَةُ ، كَمَثَلِ الَّذِى اسْتَوْقَدَ ---"
cut p30_b2_w1_narullahimuqadah  198.89 200.45
cut p30_b2_w2_kamathalillistwq  201.60 203.15

echo "--- BOTTOM: Row 3 (2 phrases) — فَاتَّقُوا النَّارَ الَّتِى ، هُوَ التَّوَّابُ الرَّحِيمُ ---"
cut p30_b3_w1_fattaqunnaarallti 204.70 206.49
cut p30_b3_w2_huwattawwabrahim  208.29 209.96

echo "--- BOTTOM: Row 4 (2 phrases) — ذُو الْفَضْلِ الْعَظِيمِ ، اَنْتَ الْعَزِيزُ الْحَكِيمُ ---"
cut p30_b4_w1_dhulfadlazeem     211.27 212.94
cut p30_b4_w2_antalazeezhakeem  214.44 216.15

echo ""
echo "=== Copying to public/audio/edit/ ==="
cp "$OUT"/p30_*.mp3 "$PUB/"
echo "Done. Files: $(ls "$PUB"/p30_*.mp3 | wc -l) chunks."
