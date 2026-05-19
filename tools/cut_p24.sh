#!/bin/bash
# Cut audio chunks for page 24 (tanvin alphabet practice + 30 tanvin words).
# Source: 35. tanvin.mp3 (3:10), starts at 20.4s (after 23-page intro).
# Boundaries from silencedetect -30dB/0.20s with -50/+100 ms buffer.

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/public/audio/35. tanvin.mp3"
OUT="$ROOT/Materiallar/tanvin/edit_audios/35_tanvin"
PUB="$ROOT/public/audio/edit/35_tanvin"
FFMPEG="$ROOT/tools/ffmpeg"

mkdir -p "$OUT" "$PUB"

cut() {
    local name="$1" start="$2" end="$3"
    local dur=$(python3 -c "print(round($end - $start, 3))")
    "$FFMPEG" -y -ss "$start" -i "$SRC" -t "$dur" -c:a libmp3lame -b:a 192k -loglevel error "$OUT/$name.mp3"
    echo "  $name.mp3 ($dur s)"
}

echo "=== Page 24 — Block 1: fatha tanvin (-an), 28 syllables ==="
echo "--- R1 (9): alif, ba, ta, tsa, jim, ha, kha, dal, zal ---"
cut p24_r1_01_alif_an  20.36 21.05
cut p24_r1_02_ba_an    21.43 22.13
cut p24_r1_03_ta_an    22.57 23.23
cut p24_r1_04_tsa_an   23.76 24.41
cut p24_r1_05_jim_an   24.78 25.56
cut p24_r1_06_ha_an    25.90 26.66
cut p24_r1_07_kha_an   27.00 27.75
cut p24_r1_08_dal_an   28.13 28.90
cut p24_r1_09_zal_an   29.26 30.02

echo "--- R2 (10): ra, za, sa, sha, sod, dod, tho, zo, ayn, ghayn ---"
cut p24_r2_10_ra_an    30.38 31.16
cut p24_r2_11_za_an    31.51 32.34
cut p24_r2_12_sa_an    32.67 33.48
cut p24_r2_13_sha_an   33.79 34.61
cut p24_r2_14_sod_an   34.93 35.76
cut p24_r2_15_dod_an   36.12 36.96
cut p24_r2_16_tho_an   37.39 38.10
cut p24_r2_17_zo_an    38.47 39.30
cut p24_r2_18_ayn_an   39.76 40.52
cut p24_r2_19_ghayn_an 40.87 41.65

echo "--- R3 (9): fa, qof, kaf, lam, mim, nun, waw, ha, ya ---"
cut p24_r3_20_fa_an    42.21 42.88
cut p24_r3_21_qof_an   43.32 44.05
cut p24_r3_22_kaf_an   44.50 45.22
cut p24_r3_23_lam_an   45.61 46.38
cut p24_r3_24_mim_an   46.85 47.62
cut p24_r3_25_nun_an   48.13 48.96
cut p24_r3_26_waw_an   49.43 50.20
cut p24_r3_27_ha2_an   50.63 51.44
cut p24_r3_28_ya_an    51.78 52.59

echo "=== Page 24 — Block 2: kasra tanvin (-in), 28 syllables ==="
echo "--- R4 (9) ---"
cut p24_r4_01_alif_in  55.12 55.78
cut p24_r4_02_ba_in    56.23 57.04
cut p24_r4_03_ta_in    57.63 58.32
cut p24_r4_04_tsa_in   58.88 59.58
cut p24_r4_05_jim_in   60.07 60.88
cut p24_r4_06_ha_in    61.33 62.13
cut p24_r4_07_kha_in   62.58 63.40
cut p24_r4_08_dal_in   63.88 64.72
cut p24_r4_09_zal_in   65.13 65.98

echo "--- R5 (10) ---"
cut p24_r5_10_ra_in    66.40 67.22
cut p24_r5_11_za_in    67.62 68.48
cut p24_r5_12_sa_in    68.85 69.65
cut p24_r5_13_sha_in   70.09 70.88
cut p24_r5_14_sod_in   71.34 72.13
cut p24_r5_15_dod_in   72.54 73.36
cut p24_r5_16_tho_in   73.85 74.58
cut p24_r5_17_zo_in    74.94 75.83
cut p24_r5_18_ayn_in   76.27 77.13
cut p24_r5_19_ghayn_in 77.46 78.34

echo "--- R6 (9) ---"
cut p24_r6_20_fa_in    78.81 79.58
cut p24_r6_21_qof_in   79.96 81.02
cut p24_r6_22_kaf_in   81.31 82.04
cut p24_r6_23_lam_in   82.53 83.30
cut p24_r6_24_mim_in   83.83 84.58
cut p24_r6_25_nun_in   85.08 85.88
cut p24_r6_26_waw_in   86.31 87.08
cut p24_r6_27_ha2_in   87.57 88.38
cut p24_r6_28_ya_in    88.84 89.68

echo "=== Page 24 — Block 3: damma tanvin (-un), 28 syllables ==="
echo "--- R7 (9) ---"
cut p24_r7_01_alif_un  92.59 93.21
cut p24_r7_02_ba_un    93.59 94.33
cut p24_r7_03_ta_un    94.88 95.58
cut p24_r7_04_tsa_un   96.08 96.78
cut p24_r7_05_jim_un   97.12 97.98
cut p24_r7_06_ha_un    98.49 99.16
cut p24_r7_07_kha_un   99.57 100.34
cut p24_r7_08_dal_un   100.83 101.63
cut p24_r7_09_zal_un   102.10 102.91

echo "--- R8 (10) ---"
cut p24_r8_10_ra_un    103.31 104.16
cut p24_r8_11_za_un    104.63 105.53
cut p24_r8_12_sa_un    105.90 106.81
cut p24_r8_13_sha_un   107.17 108.03
cut p24_r8_14_sod_un   108.36 109.18
cut p24_r8_15_dod_un   109.55 110.48
cut p24_r8_16_tho_un   111.21 111.89
cut p24_r8_17_zo_un    112.29 113.13
cut p24_r8_18_ayn_un   113.56 114.36
cut p24_r8_19_ghayn_un 114.69 115.51

echo "--- R9 (9) ---"
cut p24_r9_20_fa_un    116.07 116.73
cut p24_r9_21_qof_un   117.23 117.93
cut p24_r9_22_kaf_un   118.54 119.18
cut p24_r9_23_lam_un   119.66 120.43
cut p24_r9_24_mim_un   120.92 121.71
cut p24_r9_25_nun_un   122.17 123.00
cut p24_r9_26_waw_un   123.42 124.23
cut p24_r9_27_ha2_un   124.64 125.58
cut p24_r9_28_ya_un    126.00 126.83

echo "=== Page 24 — Words section (30 words, 5 rows × 6) ==="
# ⚠️ MUHIM: Audio so'zlarni KITOB RTL TARTIBIGA TESKARI o'qiydi (chap→o'ng vizual tartib).
# Whisper transcribe asosida tasdiqlangan (2026-05-19). Har row ichida indekslar
# reversed: book_w01 = audio segment 6 (R10 oxirgi), book_w06 = audio segment 1 (R10 birinchi).
# Timings silencedetect -35dB/0.18s + -50/+100ms buffer.

echo "--- R10: book RTL = fawtu,fawtin,fawtan,thawbu,thawbin,thawban; audio LTR reverse ---"
cut p24_w01_fawtu       138.44 139.85
cut p24_w02_fawtin      136.48 137.88
cut p24_w03_fawtan      134.60 136.01
cut p24_w04_thawbu      132.76 134.10
cut p24_w05_thawbin     130.97 132.29
cut p24_w06_thawban     129.20 130.48

echo "--- R11: book RTL = awdhun,tawdun,farqan,lawhun,fawjun,laythan; audio LTR reverse ---"
cut p24_w07_awdhun      150.72 152.20
cut p24_w08_tawdun      148.80 150.09
cut p24_w09_farqan      146.82 148.19
cut p24_w10_lawhun      144.77 146.24
cut p24_w11_fawjun      142.81 144.15
cut p24_w12_laythan     140.68 142.17

echo "--- R12: book RTL = hawdun,ardin,arshan,qawsun,fawzin,dawran; audio LTR reverse ---"
cut p24_w13_hawdun      163.25 164.65
cut p24_w14_ardin       161.24 162.65
cut p24_w15_arshan      159.21 160.60
cut p24_w16_qawsun      157.17 158.48
cut p24_w17_fawzin      155.01 156.37
cut p24_w18_dawran      152.93 154.32

echo "--- R13: book RTL = shawqun,khawfin,farghan,sharu,ghayzin,sawtan; audio LTR reverse ---"
cut p24_w19_shawqun     175.99 177.49
cut p24_w20_khawfin     173.87 175.39
cut p24_w21_farghan     171.86 173.28
cut p24_w22_sharu       169.69 171.14
cut p24_w23_ghayzin     167.49 169.06
cut p24_w24_sawtan      165.12 166.81

echo "--- R14: book RTL = sharah,dalwin,lawnan,nawmun,hawlin,darkan; audio LTR reverse ---"
cut p24_w25_sharah      188.37 189.82
cut p24_w26_dalwin      186.36 187.89
cut p24_w27_lawnan      184.31 185.81
cut p24_w28_nawmun      182.17 183.73
cut p24_w29_hawlin      180.19 181.57
cut p24_w30_darkan      178.08 179.57

echo ""
echo "=== Copying to public/audio/edit/ ==="
cp "$OUT"/p24_*.mp3 "$PUB/"
echo "Done. Files: $(ls "$PUB"/p24_*.mp3 | wc -l) page-24 chunks."
