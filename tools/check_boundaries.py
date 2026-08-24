# Paragraf chegaralarini AUDIO bilan qat'iy tekshirish.
#
# Har chegara uchun ikki shart bajarilishi kerak:
#   1. Chegaradan OLDIN jimlik  -> oldingi paragrafning so'zlari qo'shilmaydi
#   2. Chegaradan KEYIN nutq    -> paragraf darhol boshlanadi, boshi kesilmaydi
#
# Shart buzilsa — chegara xato. Bu tekshiruvni har safar vaqt o'zgartirilganda
# ishga tushiring (2026-08-24 da chegaralar Whisper vaqtiga qo'yilgani uchun
# har paragraf oldingisining oxirini ijro etardi).
#
# Ishlatish:  py tools/check_boundaries.py

import array
import json
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO = os.path.join(ROOT, "public", "audio", "02. Muqaddima.mp3")
PARAS = os.path.join(ROOT, "tools", "_tmp", "muqaddima_paragraphs.json")
FF = os.environ.get("FFMPEG", "ffmpeg")

SR = 16000
PAD = 0.30      # chegaraning ikki tomonida tekshiriladigan oraliq
GUARD = 0.04    # chegaraning o'zidan shuncha chetlanamiz (kesim aniq emas)


def rms(a: float, b: float) -> float:
    if b <= a:
        return 0.0
    raw = subprocess.run(
        [FF, "-v", "error", "-ss", "%.3f" % a, "-to", "%.3f" % b, "-i", AUDIO,
         "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"],
        capture_output=True, check=True,
    ).stdout
    pcm = array.array("h")
    pcm.frombytes(raw)
    if not len(pcm):
        return 0.0
    return (sum(v * v for v in pcm) / len(pcm)) ** 0.5


def main() -> None:
    ps = json.load(open(PARAS, encoding="utf-8"))["paragraphs"]
    print("Chegara tekshiruvi (oldin JIM, keyin NUTQ bo'lishi shart):\n")
    print("   #   chegara   oldin    keyin   nisbat   holat")

    bad = 0
    for i in range(0, len(ps)):
        b = ps[i]["start"]
        before = rms(b - PAD - GUARD, b - GUARD)
        after = rms(b + GUARD, b + PAD + GUARD)
        ratio = after / before if before > 1 else 999.0
        ok = ratio >= 4.0
        if not ok:
            bad += 1
        print("  P%d  %7.2f  %7.0f  %7.0f  %6.1fx   %s"
              % (i + 1, b, before, after, min(ratio, 999), "OK" if ok else "XATO"))

    print("")
    if bad:
        print("XATO: %d ta chegara shartni buzdi — o'sha joylar qayta ko'rilsin." % bad)
        sys.exit(1)
    print("Barcha chegaralar to'g'ri: oldin jimlik, keyin nutq.")


if __name__ == "__main__":
    main()
