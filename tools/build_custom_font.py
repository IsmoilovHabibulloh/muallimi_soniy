#!/usr/bin/env python3
"""
Build a custom Noto Naskh Arabic font for Muallimi Soniy.

Removes two GSUB ligature substitutions so HarfBuzz falls back to
standard mark/mkmk positioning:

1. `uni0651 + uni0650 -> uni06510650`  (shadda + kasra)
2. `uni0651 + uni064D -> uni0651064D`  (shadda + kasratan / tanwin kasra)

Each pair has a reverse-order rule too, so 4 rules total are removed.

The result: when shadda + kasra/kasratan meet, the kasra/kasratan mark
is rendered BELOW the base letter (traditional form used in the textbook)
while shadda stays above — instead of the compact stacked form Noto
Naskh ships by default.

Other shadda+mark ligatures (tanwin fatha, superscript-alef) are kept
untouched — fathatan is naturally above the letter, so stacking with
shadda is correct there.

Usage:
    python3 tools/build_custom_font.py
"""
from __future__ import annotations

from pathlib import Path

from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public/fonts/NotoNaskhArabic-VariableFont_wght.ttf"
DST = ROOT / "public/fonts/NotoNaskhArabic-MuallimiSoniy.ttf"

LIG_LOOKUP_INDEX = 5
TARGET_LIGS = {"uni06510650", "uni0651064D"}
EXPECTED_REMOVED = 4  # 2 ligatures × forward + reverse pair

NEW_FAMILY = "Noto Naskh Arabic Muallimi"
NEW_POSTSCRIPT = "NotoNaskhArabicMuallimi-Variable"


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Source font not found: {SRC}")

    font = TTFont(SRC)
    gsub = font["GSUB"].table

    removed = 0
    for sub in gsub.LookupList.Lookup[LIG_LOOKUP_INDEX].SubTable:
        for first_glyph, ligs in list(sub.ligatures.items()):
            kept = [lig for lig in ligs if lig.LigGlyph not in TARGET_LIGS]
            removed += len(ligs) - len(kept)
            if kept:
                sub.ligatures[first_glyph] = kept
            else:
                del sub.ligatures[first_glyph]

    if removed != EXPECTED_REMOVED:
        raise SystemExit(
            f"Expected to remove {EXPECTED_REMOVED} ligature rules for "
            f"{sorted(TARGET_LIGS)}, but removed {removed}. Aborting — "
            f"source font may have changed."
        )

    for rec in font["name"].names:
        if rec.nameID in (1, 4, 16):
            rec.string = NEW_FAMILY.encode(rec.getEncoding())
        elif rec.nameID == 6:
            rec.string = NEW_POSTSCRIPT.encode(rec.getEncoding())

    font.save(DST)
    print(f"Wrote {DST}")
    print(f"  Removed {removed} ligature rules ({sorted(TARGET_LIGS)})")

    verify = TTFont(DST)
    gsub_v = verify["GSUB"].table
    remaining: list[str] = []
    for sub in gsub_v.LookupList.Lookup[LIG_LOOKUP_INDEX].SubTable:
        for first, ligs in sub.ligatures.items():
            for lig in ligs:
                remaining.append(f"{first} + {tuple(lig.Component)} -> {lig.LigGlyph}")

    for target in TARGET_LIGS:
        if any(target in line for line in remaining):
            raise SystemExit(f"FAIL: {target} still present in output font!")

    print(f"  Verified: {sorted(TARGET_LIGS)} removed, {len(remaining)} ligatures retained:")
    for line in remaining:
        print(f"    {line}")

    family_name = next(
        (rec.toUnicode() for rec in verify["name"].names if rec.nameID == 1),
        "<missing>",
    )
    print(f"  Family name: {family_name}")


if __name__ == "__main__":
    main()
