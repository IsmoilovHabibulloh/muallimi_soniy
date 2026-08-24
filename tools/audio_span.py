# Audiodagi bitta talaffuzning HAQIQIY boshi va oxirini o'lchash.
#
# Nima uchun: PDF vaqtlari ham, Whisper vaqtlari ham talaffuzning
# markazini ko'rsatadi — boshidagi ko'tarilish va oxiridagi so'nish
# (ayniqsa "r", "s", "sh" kabi tovushlarda 100-300 ms) kesilib qoladi.
# Bu skript energiya bo'yicha aniq chegarani beradi.
#
# Ishlatish:
#   py tools/audio_span.py "public/audio/06. za.mp3" 18.2 19.6
#
# Chiqish: energiya profili + tavsiya etilgan boshi/oxiri.

import array
import os
import subprocess
import sys

FF = os.environ.get("FFMPEG", "ffmpeg")
SR = 16000
WIN = 0.01
LEAD = 0.05   # boshidan oldin qoldiriladigan zaxira
TAIL = 0.08   # oxiridan keyin qoldiriladigan zaxira (so'nish uchun)


def profile(path: str, a: float, b: float):
    raw = subprocess.run(
        [FF, "-v", "error", "-ss", "%.3f" % a, "-to", "%.3f" % b, "-i", path,
         "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"],
        capture_output=True, check=True,
    ).stdout
    pcm = array.array("h")
    pcm.frombytes(raw)
    n = int(SR * WIN)
    return [(a + i / SR, (sum(v * v for v in pcm[i:i + n]) / n) ** 0.5)
            for i in range(0, len(pcm) - n + 1, n)]


def main() -> None:
    path, a, b = sys.argv[1], float(sys.argv[2]), float(sys.argv[3])
    prof = profile(path, a, b)
    vals = sorted(v for _, v in prof)
    floor = vals[int(0.20 * len(vals))]
    peak = vals[int(0.95 * len(vals))]
    thr = floor + 0.10 * (peak - floor)

    loud = [t for t, v in prof if v > thr]
    if not loud:
        print("nutq topilmadi")
        return
    start, end = loud[0], loud[-1] + WIN

    top = max(v for _, v in prof) or 1
    for t, v in prof:
        mark = ""
        if abs(t - start) < WIN / 2:
            mark = "  <== BOSHI"
        elif abs(t - (end - WIN)) < WIN / 2:
            mark = "  <== OXIRI"
        print("  %6.3f  %6.0f  %s%s" % (t, v, "#" * int(34 * v / top), mark))

    print("")
    print("pol %.0f / cho'qqi %.0f / chegara %.0f" % (floor, peak, thr))
    print("nutq: %.3f - %.3f  (%.3f s)" % (start, end, end - start))
    print("TAVSIYA (zaxira bilan): %.3f  %.3f   (%.3f s)"
          % (start - LEAD, end + TAIL, (end + TAIL) - (start - LEAD)))


if __name__ == "__main__":
    main()
