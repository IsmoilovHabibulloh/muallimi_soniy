# Muqaddima paragraflarining HAQIQIY audio vaqtlarini aniqlash.
#
# Nima uchun kerak: 02. Muqaddima.mp3 ostida fon musiqasi bor, shu sababli
# silencedetect (-25dB gacha sinaldi) bitta ham jimlik topmaydi. Paragraf
# chegaralarini faqat matnni audioga moslashtirib (forced alignment) topamiz.
#
# Usul:
#   1. muqaddima.ts dan 9 paragrafning ANIQ matni olinadi (bu — haqiqat manbai).
#   2. transcribe_muqaddima.py chiqargan Whisper so'zlari + vaqtlari o'qiladi.
#      Whisper matni xato bo'lishi mumkin; bizga faqat VAQTLAR kerak.
#   3. Ikki so'z ketma-ketligi Needleman-Wunsch bilan tekislanadi.
#   4. Har paragraf uchun: birinchi/oxirgi mos kelgan so'zning vaqti olinadi.
#   5. Har paragraf uchun moslik foizi chiqariladi — past bo'lsa ISHONMANG.
#
# Ishlatish:  py tools/align_muqaddima.py

import json
import os
import re
import unicodedata
from difflib import SequenceMatcher

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TS = os.path.join(ROOT, "src", "lib", "data", "muqaddima.ts")
WORDS = os.path.join(ROOT, "tools", "_tmp", "muqaddima_words.json")
OUT = os.path.join(ROOT, "tools", "_tmp", "muqaddima_paragraphs.json")

# Bismillah audioning boshida (elements.ts p1 "000" elementi 0-5s).
# Birinchi paragraf shundan keyin boshlanadi.
BISMILLAH_END = 5.0


def norm(w: str) -> str:
    """Solishtirish uchun so'zni soddalashtirish.

    O'zbek lotin yozuvida apostrof bir necha xil belgi bilan yoziladi
    (' U+2018, ' U+2019, ʻ U+02BB, ʼ U+02BC, ' ASCII). Whisper ham ularni
    turlicha chiqaradi — hammasini bitta ko'rinishga keltiramiz.
    """
    w = unicodedata.normalize("NFKC", w).lower()
    w = re.sub(r"[‘’ʻʼʿ`´']", "'", w)
    w = re.sub(r"[^a-z0-9'Ѐ-ӿ]", "", w)
    return w


def load_paragraphs() -> list[str]:
    src = open(TS, encoding="utf-8").read()
    body = src.split("MUQADDIMA_PARAGRAPHS: string[] = [", 1)[1].rsplit("];", 1)[0]
    return [m.group(1) for m in re.finditer(r'"((?:[^"\\]|\\.)*)"', body)]


def similarity(a: str, b: str) -> float:
    if a == b:
        return 1.0
    if not a or not b:
        return 0.0
    return SequenceMatcher(None, a, b).ratio()


def align(ref: list[str], hyp: list[str]) -> list[tuple[int, int]]:
    """Needleman-Wunsch. Qaytaradi: (ref_index, hyp_index) juftliklari."""
    n, m = len(ref), len(hyp)
    GAP = -0.6
    # Faqat oldingi qatorni saqlaymiz bo'lardi, lekin backtrack kerak —
    # yo'nalish matritsasini baytlarda saqlaymiz (659 x ~800 = arzon).
    prev = [GAP * j for j in range(m + 1)]
    ptr = []
    for i in range(1, n + 1):
        cur = [GAP * i] + [0.0] * m
        row = bytearray(m + 1)
        row[0] = 2  # up
        ri = ref[i - 1]
        for j in range(1, m + 1):
            s = similarity(ri, hyp[j - 1])
            diag = prev[j - 1] + (s if s >= 0.72 else -0.4)
            up = prev[j] + GAP
            left = cur[j - 1] + GAP
            best = diag
            d = 1  # diag
            if up > best:
                best, d = up, 2
            if left > best:
                best, d = left, 3
            cur[j] = best
            row[j] = d
        ptr.append(row)
        prev = cur

    pairs = []
    i, j = n, m
    while i > 0 and j > 0:
        d = ptr[i - 1][j]
        if d == 1:
            if similarity(ref[i - 1], hyp[j - 1]) >= 0.72:
                pairs.append((i - 1, j - 1))
            i -= 1
            j -= 1
        elif d == 2:
            i -= 1
        else:
            j -= 1
    pairs.reverse()
    return pairs


def main() -> None:
    paragraphs = load_paragraphs()
    data = json.load(open(WORDS, encoding="utf-8"))
    hyp_raw = data["words"]

    # Ma'lumot tayyorlash: har ref so'ziga paragraf indeksini biriktiramiz.
    ref_words, ref_para = [], []
    for pi, p in enumerate(paragraphs):
        for w in p.split():
            nw = norm(w)
            if nw:
                ref_words.append(nw)
                ref_para.append(pi)

    hyp_words = [norm(h["w"]) for h in hyp_raw]
    keep = [k for k, w in enumerate(hyp_words) if w]
    hyp_words = [hyp_words[k] for k in keep]
    hyp_times = [(hyp_raw[k]["start"], hyp_raw[k]["end"]) for k in keep]

    pairs = align(ref_words, hyp_words)

    # Langar nuqtalar: mos kelgan so'zlar (ref indeksi -> audio vaqti).
    # Vaqtlar o'sib borishi shart (monoton), aks holda interpolatsiya buziladi.
    anchors = []
    for ri, hj in pairs:
        s, e = hyp_times[hj]
        if anchors and s < anchors[-1][1]:
            continue
        anchors.append((ri, s, e))

    if len(anchors) < 2:
        raise SystemExit("langar juda kam — moslashtirish ishonchsiz")

    # Mos kelmagan so'zlarning vaqtini qo'shni langarlar orasida chiziqli
    # interpolatsiya bilan baholaymiz. Shu tufayli paragraf chetidagi
    # (ko'pincha mos kelmaydigan) so'zlar ham vaqtga ega bo'ladi va
    # paragraf oxiri kesilib qolmaydi.
    audio_end = hyp_times[-1][1]
    total_ref = len(ref_words)
    span = (anchors[-1][2] - anchors[0][1]) / max(1, anchors[-1][0] - anchors[0][0])

    def est(idx: int, which: str) -> float:
        lo = hi = None
        for a in anchors:
            if a[0] <= idx:
                lo = a
            if a[0] >= idx and hi is None:
                hi = a
        if lo and lo[0] == idx:
            return lo[1] if which == "start" else lo[2]
        if lo and hi and hi[0] != lo[0]:
            f = (idx - lo[0]) / (hi[0] - lo[0])
            return lo[2] + f * (hi[1] - lo[2])
        if lo:  # oxirgi langardan keyin — o'rtacha tezlik bilan davom ettiramiz
            return min(audio_end, lo[2] + (idx - lo[0]) * span)
        return max(BISMILLAH_END, anchors[0][1] - (anchors[0][0] - idx) * span)

    counts = {i: ref_para.count(i) for i in range(len(paragraphs))}
    matched_per = {i: 0 for i in range(len(paragraphs))}
    for ri, _ in pairs:
        matched_per[ref_para[ri]] += 1

    bounds = []  # har paragrafning birinchi/oxirgi ref indeksi
    for i in range(len(paragraphs)):
        idxs = [k for k in range(total_ref) if ref_para[k] == i]
        bounds.append((idxs[0], idxs[-1]))

    result = []
    for i, (first, last) in enumerate(bounds):
        result.append(
            {
                "index": i,
                "start": round(max(BISMILLAH_END, est(first, "start")), 2),
                "end": round(min(audio_end, est(last, "end")), 2),
                "matched": matched_per[i],
                "total": counts[i],
                "rate": round(100.0 * matched_per[i] / counts[i], 1),
            }
        )

    # Ketma-ketlik: ustma-ust tushmasin, orada egasiz bo'shliq qolmasin.
    for i in range(1, len(result)):
        prev_r, r = result[i - 1], result[i]
        mid = round((prev_r["end"] + r["start"]) / 2, 2)
        prev_r["end"] = mid
        r["start"] = mid
    result[-1]["end"] = round(audio_end, 2)

    # Chegarani paragrafning BIRINCHI so'ziga yopishtirish.
    #
    # Interpolatsiya chegarani birinchi so'zning o'rtasiga yoki undan keyinga
    # tushirib qo'yishi mumkin — o'shanda paragraf birinchi so'zisiz ijro
    # etiladi (P9: "Garchi" 428.92 da boshlangan, chegara esa 429.30 edi).
    #
    # Jimlik bo'yicha yopishtirib bo'lmaydi: Whisper so'z vaqtlari ketma-ket
    # (bir so'z tugagan joyda keyingisi boshlanadi), yozuv ostida fon musiqasi
    # borligi uchun haqiqiy jimlik yo'q. Shu sababli paragrafning birinchi
    # so'zini chegara atrofidan qidiramiz.
    SNAP_WINDOW = 2.5
    SNAP_MIN_SIM = 0.5
    for i in range(1, len(result)):
        b = result[i]["start"]
        first_ref = ref_words[bounds[i][0]]
        best, best_sim = None, 0.0
        for k, (hs, _he) in enumerate(hyp_times):
            if abs(hs - b) > SNAP_WINDOW:
                continue
            sim = similarity(first_ref, hyp_words[k])
            if sim > best_sim:
                best, best_sim = hs, sim
        if best is not None and best_sim >= SNAP_MIN_SIM:
            snapped = round(best, 2)
            result[i - 1]["end"] = snapped
            result[i]["start"] = snapped

    json.dump(
        {"audio_words": len(hyp_words), "ref_words": len(ref_words), "paragraphs": result},
        open(OUT, "w", encoding="utf-8"),
        ensure_ascii=False,
        indent=1,
    )

    print("ref words   : %d" % len(ref_words))
    print("audio words : %d" % len(hyp_words))
    print("aligned     : %d (%.1f%%)" % (len(pairs), 100.0 * len(pairs) / len(ref_words)))
    print("")
    print("  #   start     end    dur    matched/total   rate")
    for r in result:
        if not r:
            print("  ??  ALIGNMENT FAILED")
            continue
        print(
            "  P%d %7.2f %7.2f %6.2f    %4d/%-4d      %5.1f%%"
            % (r["index"] + 1, r["start"], r["end"], r["end"] - r["start"], r["matched"], r["total"], r["rate"])
        )
    print("")
    print("written: %s" % OUT)


if __name__ == "__main__":
    main()
