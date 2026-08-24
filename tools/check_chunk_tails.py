# Kesilgan (uzilib qolgan) audio chunklarni topish.
#
# Muammo: chunk talaffuz o'rtasida tugab qolsa, foydalanuvchi so'zning
# oxirini eshitmaydi ("zur" -> "zu"). Bu quloq bilan sezilади, lekin
# ko'zga ko'rinmaydi — shuning uchun avtomatik tekshiruv kerak.
#
# Usul: har chunk oxiridagi TAIL_MS energiyasi chunk'ning odatiy
# darajasiga (75-persentil) nisbatan o'lchanadi. Agar oxiri hali ham
# baland bo'lsa — tovush o'rtasida kesilgan.
# Xuddi shu tekshiruv chunk BOSHI uchun ham qilinadi.
#
# Ishlatish:
#   py tools/check_chunk_tails.py                    # barcha chunklar
#   py tools/check_chunk_tails.py 06_za 07_ma        # tanlangan papkalar

import array
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EDIT = os.path.join(ROOT, "public", "audio", "edit")
FF = os.environ.get("FFMPEG", "ffmpeg")

SR = 16000
EDGE = 0.040          # chekkada tekshiriladigan oraliq (40 ms)
RATIO_BAD = 0.25      # chekka energiyasi odatiy darajaning shundan oshsa — kesilgan


def samples(path: str):
    raw = subprocess.run(
        [FF, "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"],
        capture_output=True, check=True,
    ).stdout
    pcm = array.array("h")
    pcm.frombytes(raw)
    return pcm


def rms(seq) -> float:
    if not len(seq):
        return 0.0
    return (sum(v * v for v in seq) / len(seq)) ** 0.5


def analyse(path: str):
    pcm = samples(path)
    n = int(SR * EDGE)
    if len(pcm) < n * 3:
        return None
    win = int(SR * 0.02)
    levels = sorted(rms(pcm[i:i + win]) for i in range(0, len(pcm) - win, win))
    if not levels:
        return None
    typical = levels[int(0.75 * len(levels))]
    if typical < 50:
        return None
    return {
        "dur": len(pcm) / SR,
        "head": rms(pcm[:n]) / typical,
        "tail": rms(pcm[-n:]) / typical,
    }


def main() -> None:
    wanted = sys.argv[1:]
    dirs = sorted(d for d in os.listdir(EDIT) if os.path.isdir(os.path.join(EDIT, d)))
    if wanted:
        dirs = [d for d in dirs if d in wanted]

    flagged, total = [], 0
    for d in dirs:
        folder = os.path.join(EDIT, d)
        for name in sorted(os.listdir(folder)):
            if not name.endswith(".mp3"):
                continue
            total += 1
            r = analyse(os.path.join(folder, name))
            if not r:
                continue
            if r["tail"] > RATIO_BAD or r["head"] > RATIO_BAD:
                flagged.append((d, name, r))

    print("Tekshirildi: %d chunk, %d papka\n" % (total, len(dirs)))
    if not flagged:
        print("Kesilgan chunk topilmadi.")
        return

    flagged.sort(key=lambda x: -max(x[2]["tail"], x[2]["head"]))
    print("  %-16s %-24s %6s %8s %8s" % ("papka", "fayl", "davomi", "boshi", "oxiri"))
    for d, name, r in flagged:
        print("  %-16s %-24s %5.2fs %7.0f%% %7.0f%%"
              % (d, name, r["dur"], r["head"] * 100, r["tail"] * 100))
    print("\n%d ta chunk chekkasi baland — talaffuz o'rtasida kesilgan bo'lishi mumkin." % len(flagged))
    print("Har birini tekshirish:  py tools/audio_span.py \"public/audio/<manba>.mp3\" <boshi> <oxiri>")


if __name__ == "__main__":
    main()
