# Kesimdan KEYIN manba audioda tovush qolib ketganmi — shuni topadi.
#
# MUAMMO (2026-08-24, foydalanuvchi 2 marta topdi: مُخْلِصَاتْ va تَبْرِيكْ):
#   Jarangsiz portlovchi (ت ك ق ط ب د ج) ikki fazali: avval ~100 ms JIMLIK
#   (yopilish), keyin PORTLASH. Kesim jimlikda tugasa, harf yo'qoladi,
#   lekin chunk "toza" ko'rinadi.
#
#   Chunkning O'ZIDAN qarab buni aniqlab bo'lmaydi: arab tilida vaqf
#   holatida oxirgi portlovchi ko'pincha portlatilmay o'qiladi — bu me'yor.
#   "Portlash yo'q" xato belgisi emas.
#
#   YAGONA ISHONCHLI USUL: kesim vaqtidan KEYIN manbada tovush bormi?
#   Bor bo'lsa — kesim erta tugagan.
#
# Ishlatish:
#   py tools/check_cut_tails.py                 # barcha cut_*.sh skriptlar
#   py tools/check_cut_tails.py cut_p20.sh      # bittasi

import array
import glob
import io
import os
import re
import subprocess
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FF = os.environ.get("FFMPEG", "ffmpeg")

SR = 16000
WIN = 0.01
LOOK = 0.30      # kesimdan keyin shuncha soniya qaraladi
QUIET = 0.04     # kesim oldidagi jimlik (yopilish) shu qadar bo'lsa — shubha kuchli


def rms_profile(src: str, a: float, b: float):
    if b <= a:
        return []
    raw = subprocess.run(
        [FF, "-v", "error", "-ss", "%.3f" % a, "-to", "%.3f" % b, "-i", src,
         "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"],
        capture_output=True, check=True,
    ).stdout
    pcm = array.array("h")
    pcm.frombytes(raw)
    n = int(SR * WIN)
    return [(a + i / SR, (sum(v * v for v in pcm[i:i + n]) / n) ** 0.5)
            for i in range(0, len(pcm) - n + 1, n)]


def find_sources(text: str) -> dict:
    """Skriptdagi SRC o'zgaruvchilarini fayl nomiga bog'laydi."""
    out = {}
    for m in re.finditer(r'(\w+)="[^"]*?/([^/"]+\.mp3)"', text):
        out[m.group(1)] = m.group(2)
    return out


def parse_cuts(path: str):
    """(source_mp3, chunk_nomi, start, end) ro'yxati."""
    text = open(path, encoding="utf-8", errors="replace").read()
    srcs = find_sources(text)
    only = [v for v in srcs.values()]
    cuts = []
    for line in text.split("\n"):
        line = line.split("#")[0].strip()
        if not line.startswith("cut"):
            continue
        nums = re.findall(r"\d+\.\d+", line)
        if len(nums) < 2:
            continue
        start, end = float(nums[-2]), float(nums[-1])
        if end <= start or end - start > 40:
            continue
        var = re.search(r"\$(\w*SRC\w*)", line)
        src = srcs.get(var.group(1)) if var else (only[0] if len(only) == 1 else None)
        if not src:
            continue
        # Nom ikki xil formatda bo'ladi: `cut $SRC $OUT/x.mp3 a b` yoki `cut x a b`
        m = re.search(r"([\w\-]+)\.mp3", line)
        if not m:
            m = re.search(r"cut\s+(?:\$\w+\s+)?([\w\-]+)", line)
        cuts.append((src, m.group(1) if m else "?", start, end))
    return cuts


def main() -> None:
    wanted = sys.argv[1:]
    scripts = sorted(glob.glob(os.path.join(ROOT, "tools", "cut_*.sh")))
    if wanted:
        scripts = [s for s in scripts if os.path.basename(s) in wanted]

    rows, checked = [], 0
    for sc in scripts:
        for src, name, start, end in parse_cuts(sc):
            path = os.path.join(ROOT, "public", "audio", src)
            if not os.path.exists(path):
                continue
            prof = rms_profile(path, max(0, end - 0.55), end + LOOK)
            if len(prof) < 20:
                continue
            checked += 1
            body = [v for t, v in prof if t < end - 0.05]
            after = [(t, v) for t, v in prof if t > end + 0.005]
            if not body or not after:
                continue
            floor = sorted(v for _, v in prof)[int(0.05 * len(prof))]
            thr = max(floor * 8.0, floor + 90.0)
            peak_after = max(v for _, v in after)
            if peak_after < thr:
                continue
            # kesim oldida jimlik bo'lganmi (yopilish fazasi)?
            tailq = [v for t, v in prof if end - QUIET <= t <= end]
            silent_before = bool(tailq) and max(tailq) < thr

            # PORTLASHNI keyingi so'zdan ajratish:
            #   portlash — kesimdan DARHOL keyin (<80 ms) va QISQA (<200 ms)
            #   keyingi so'z — kechroq boshlanadi va uzoq davom etadi
            loud_t = [t for t, v in after if v >= thr]
            onset = loud_t[0] - end
            seg_end = loud_t[0]
            for t in loud_t:
                if t - seg_end <= 0.03:
                    seg_end = t
                else:
                    break
            seg_len = seg_end - loud_t[0] + WIN
            is_burst = onset <= 0.08 and seg_len < 0.20
            if not (silent_before and is_burst):
                continue
            rows.append((os.path.basename(sc), name, end, peak_after, onset, seg_len))

    print("Tekshirilgan kesim: %d\n" % checked)
    if not rows:
        print("Kesimdan keyin tovush qolgan joy topilmadi.")
        return
    rows.sort(key=lambda r: (not r[5], -r[3]))
    print("  %-16s %-30s %9s %8s %s" % ("skript", "chunk", "kesim", "keyingi", "izoh"))
    for sc, name, end, pk, thr, sb in rows:
        why = "JIMLIKDA kesilgan - portlash yo'qolgan" if sb else "davomi bor"
        print("  %-16s %-30s %9.2f %8.0f  %s" % (sc, name, end, pk, why))
    strong = sum(1 for r in rows if r[5])
    print("\n%d ta kesimdan keyin tovush bor; shundan %d tasi JIMLIKDA tugagan (kuchli shubha)." % (len(rows), strong))


if __name__ == "__main__":
    main()
