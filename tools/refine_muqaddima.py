# Paragraf chegaralarini AUDIO ENERGIYASI bo'yicha aniqlashtirish.
#
# NIMA UCHUN KERAK (2026-08-24 da aniqlangan xato):
#   Whisper so'zning boshlanish vaqtini HAQIQIYDAN ERTA ko'rsatadi — o'lchov
#   bo'yicha ~0.3 s. Misol: "Qo'lingizdagi" uchun Whisper 4.72 dedi, audio
#   energiyasi esa nutq 5.03 da boshlanishini ko'rsatdi.
#   Chegara Whisper vaqtiga qo'yilsa, har paragraf OLDINGI paragrafning
#   oxirgi so'zlarini ham ijro etadi.
#
# USUL:
#   Har chegara atrofida (±WINDOW s) 10 ms oynalarda RMS o'lchanadi.
#   Yozuv ostida fon musiqasi borligi uchun mutlaq chegara ishlamaydi —
#   shuning uchun LOKAL moslashuvchan chegara ishlatiladi:
#       pol   = 20-persentil (fon darajasi)
#       cho'qqi = 90-persentil (nutq darajasi)
#       chegara = pol + 0.15 * (cho'qqi - pol)
#   Oynadagi ENG UZUN jim oraliq topiladi (paragraflar orasidagi tanaffus
#   gap ichidagi tanaffuslardan uzunroq bo'ladi) va chegara o'sha
#   jimlikning OXIRIGA — nutq qayta boshlanadigan nuqtaga qo'yiladi.
#
# Ishlatish:  py tools/refine_muqaddima.py

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
WIN = 0.01           # 10 ms oyna
WINDOW = 1.6         # chegara atrofida qidiriladigan oraliq (±)
LEAD = 0.05          # nutq boshlanishidan shuncha oldin kesamiz (attack yo'qolmasin)
MIN_PAUSE = 0.12     # bundan qisqa jimlik tanaffus deb hisoblanmaydi


def rms_profile(a: float, b: float):
    raw = subprocess.run(
        [FF, "-v", "error", "-ss", "%.3f" % a, "-to", "%.3f" % b, "-i", AUDIO,
         "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"],
        capture_output=True, check=True,
    ).stdout
    pcm = array.array("h")
    pcm.frombytes(raw)
    n = int(SR * WIN)
    out = []
    for i in range(0, len(pcm) - n + 1, n):
        c = pcm[i:i + n]
        out.append((a + i / SR, (sum(v * v for v in c) / len(c)) ** 0.5))
    return out


def refine(boundary: float) -> tuple[float, str]:
    a, b = max(0.0, boundary - WINDOW), boundary + WINDOW
    prof = rms_profile(a, b)
    if not prof:
        return boundary, "profil yo'q"

    vals = sorted(v for _, v in prof)
    floor = vals[int(0.20 * len(vals))]
    peak = vals[int(0.90 * len(vals))]
    if peak <= floor * 1.5:
        return boundary, "nutq/jimlik farqi yo'q — tegilmadi"
    thr = floor + 0.15 * (peak - floor)

    # Eng uzun jim oraliqni topamiz.
    runs, cur = [], None
    for t, v in prof:
        if v <= thr:
            cur = (t, t) if cur is None else (cur[0], t)
        elif cur is not None:
            runs.append(cur)
            cur = None
    if cur is not None:
        runs.append(cur)
    runs = [r for r in runs if r[1] - r[0] >= MIN_PAUSE]
    if not runs:
        return boundary, "tanaffus topilmadi — tegilmadi"

    best = max(runs, key=lambda r: r[1] - r[0])
    onset = best[1] + WIN            # jimlikdan keyingi birinchi baland oyna
    return round(max(a, onset - LEAD), 2), "tanaffus %.2f-%.2f (%.2f s)" % (best[0], best[1], best[1] - best[0])


def main() -> None:
    data = json.load(open(PARAS, encoding="utf-8"))
    ps = data["paragraphs"]

    print("Chegaralarni audio energiyasi bo'yicha aniqlashtirish:\n")
    print("   #    eski     yangi    farq    izoh")
    for i in range(1, len(ps)):
        old = ps[i]["start"]
        new, note = refine(old)
        print("  P%d  %7.2f  %7.2f  %+6.2f   %s" % (i + 1, old, new, new - old, note))
        ps[i]["start"] = new
        ps[i - 1]["end"] = new

    data["refined"] = True
    json.dump(data, open(PARAS, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("\nyangilandi: %s" % PARAS)

    print("\nYakuniy jadval:")
    print("   #    start      end     davomi   so'z   tezlik")
    for r in ps:
        dur = r["end"] - r["start"]
        print("  P%d  %7.2f  %7.2f  %7.2f  %5d   %.2f so'z/s"
              % (r["index"] + 1, r["start"], r["end"], dur, r["total"], r["total"] / dur))


if __name__ == "__main__":
    main()
