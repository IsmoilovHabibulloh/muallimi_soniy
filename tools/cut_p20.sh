#!/bin/bash
# Cut chunks for Page 20 — Mad davomi (45 elements + 3 silent intros optional)
# Source: 33. madli 02.mp3 (6:05). Page 20 portion: ~03:04 to ~05:25.

set -e

# Yo'l skript joylashuvidan olinadi (avval macOS yo'li qotib yozilgan edi).
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/public/audio/33. madli 02.mp3"
OUT="$ROOT/Materiallar/madlar/edit_audios/33_madli_02"
FF="${FFMPEG:-$ROOT/tools/ffmpeg}"
command -v "$FF" >/dev/null 2>&1 || FF=ffmpeg

mkdir -p "$OUT"

cut() {
  local name=$1 start=$2 end=$3
  local duration
  duration=$(awk -v s="$start" -v e="$end" 'BEGIN {printf "%.3f", e-s}')
  "$FF" -y -ss "$start" -t "$duration" -i "$SRC" -c:a libmp3lame -b:a 192k "$OUT/$name.mp3" 2>/dev/null
  echo "  ✓ $name ($duration s)"
}

echo "=== Top section: 15 long verb forms (mad-ending plurals) ==="
cut p20_01_yashhaduuna     184.20 186.30
cut p20_02_tadribuuna_1    187.85 189.85
cut p20_03_yarjiuuna       190.75 192.85
cut p20_04_tajlisuuna      194.20 196.20
cut p20_05_yukrimuuna      197.20 199.00
cut p20_06_tuslimuuna      199.80 201.75
cut p20_07_tukhlisuuna     202.55 204.65
cut p20_08_tukrimuuna      206.45 207.85
cut p20_09_yansuruuna      208.80 211.20
cut p20_10_tadribuuna_2    212.85 215.10
cut p20_11_yajtamiuuna     215.95 218.20
cut p20_12_taktasibuuna    219.60 221.30
cut p20_13_yahtasibuuna    222.95 224.65
cut p20_14_tastashhaduuna  225.60 228.30
cut p20_15_yastakhrijuuna  230.45 232.10

echo "=== Mid section: 6 past dual/feminine imperatives ==="
cut p20_16_ushkuraa        234.85 236.40
cut p20_17_unsuraa         237.40 239.45
cut p20_18_ilamaa          240.40 242.10
cut p20_19_ushkurii        243.13 244.85
cut p20_20_unsurii         245.70 247.85
cut p20_21_ilamii          248.80 250.60

echo "=== Mid section: 4 dual nouns ==="
cut p20_22_mukrimaani      252.45 254.30
cut p20_23_muslimaani      255.30 257.30
cut p20_24_mukhlisaani     258.05 260.10
cut p20_25_munfiqaani      261.10 263.55

echo "=== Mid section: 4 plural masculine nouns ==="
cut p20_26_mukrimuuna      265.30 267.10
cut p20_27_muslimuuna      267.95 270.05
cut p20_28_mukhlisuuna     270.85 272.85
cut p20_29_munfiquuna      273.95 276.40

echo "=== Mid section: 4 feminine plural + passives ==="
cut p20_30_muslimaat       278.30 280.25
# 2026-08-24: oxirgi "t" PORTLASHI kesilib qolgan edi (283.42-283.51).
# Jarangsiz portlovchi tovushda avval jimlik (yopilish), keyin portlash
# keladi - jimlikda kesilsa harf butunlay yo'qoladi.
cut p20_31_mukhlisaat      281.45 283.60
cut p20_32_mansuuruuna     284.85 287.20
cut p20_33_matluubuuna     288.35 290.55

echo "=== Bottom section: 6 short ya-mad words ==="
cut p20_34_miil            294.45 295.65
cut p20_35_niil            296.20 297.55
cut p20_36_fiil            298.20 299.45
cut p20_37_hiin            300.10 301.35
cut p20_38_siin            302.05 303.30
cut p20_39_shiin           303.95 305.30

echo "=== Bottom section: 5 medium ya-mad words ==="
cut p20_40_kariim          305.85 307.15
cut p20_41_aliim           307.75 309.10
cut p20_42_samii           309.65 310.90
cut p20_43_aziiz           312.20 313.65
cut p20_44_hakiim          314.45 315.85

echo "=== Bottom section: 4 longer ya-mad words ==="
cut p20_45_miskiin         316.45 318.30
cut p20_46_mutiir          318.85 320.70
cut p20_47_ifriit          321.40 323.05
cut p20_48_idriis          323.80 325.50

echo ""
echo "Done. 48 chunks cut into:"
echo "  $OUT"
ls "$OUT" | wc -l
