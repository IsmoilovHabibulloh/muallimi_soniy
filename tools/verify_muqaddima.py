# Muqaddima paragraf chegaralarini tekshirish.
#
# Har paragraf boshlanadigan nuqtada audioda AYNAN nima eshitilishini
# (Whisper so'zlari) kitobdagi kutilgan matn bilan yonma-yon ko'rsatadi.
# Ikkisi mos kelsa — chegara to'g'ri.
#
# Ishlatish:  py tools/verify_muqaddima.py

import io
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from difflib import SequenceMatcher  # noqa: E402

from align_muqaddima import load_paragraphs, norm  # noqa: E402

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORDS = json.load(open(os.path.join(ROOT, "tools", "_tmp", "muqaddima_words.json"), encoding="utf-8"))["words"]
PARAS = json.load(open(os.path.join(ROOT, "tools", "_tmp", "muqaddima_paragraphs.json"), encoding="utf-8"))["paragraphs"]
TEXT = load_paragraphs()

WINDOW = 5.0
N = 9


def overlap(expected: str, heard: str) -> float:
    """Kutilgan so'zlarning nechtasi audioda eshitilgan.

    Whisper o'zbekchani FONETIK yozadi ("ushbu" -> "uxbu", "kitobcha" ->
    "kitabca"), shu sababli aynan mos kelishni talab qilib bo'lmaydi —
    o'xshashlik darajasi bilan solishtiramiz.
    """
    e = [norm(w) for w in expected.split() if norm(w)]
    h = [norm(w) for w in heard.split() if norm(w)]
    hit = 0
    for w in e:
        if any(SequenceMatcher(None, w, x).ratio() >= 0.62 for x in h):
            hit += 1
    return 100.0 * hit / max(1, len(e))


def first_word_sim(expected: str, heard: str) -> float:
    """Paragrafning BIRINCHI so'zi eshitildimi — chegara kech qolmaganmi.

    Chegara 0.5 dan yuqori bo'lsa yetarli: Whisper paragraf boshidagi so'zni
    ayniqsa buzib yozadi ("O'sha" -> "Ose" = 0.50, "Shu" -> "Shoo" = 0.57,
    "Garchi" -> "Gerche" = 0.67). Bu uchalasi ham to'g'ri moslik.
    """
    e = [norm(w) for w in expected.split() if norm(w)]
    h = [norm(w) for w in heard.split() if norm(w)]
    if not e or not h:
        return 0.0
    return max(SequenceMatcher(None, e[0], x).ratio() for x in h[:6])


print("Har paragraf BOSHIDA audioda nima eshitiladi:\n")
scores = []
first_sims = []
for r in PARAS:
    i, s = r["index"], r["start"]
    heard = " ".join(w["w"] for w in WORDS if s - 0.3 <= w["start"] < s + WINDOW)
    expected = " ".join(TEXT[i].split()[:N])
    ov = overlap(expected, heard)
    fw = first_word_sim(expected, heard)
    scores.append(ov)
    first_sims.append(fw)
    print("P%d  @ %.2f s   moslik: %.0f%%   birinchi so'z: %s (%.2f)" % (i + 1, s, ov, "BOR" if fw >= 0.5 else "YO'Q", fw))
    print("   kitobda : " + expected)
    print("   audioda : " + (heard or "(so'z topilmadi)"))
    print()

good = sum(1 for s in scores if s >= 50)
firsts = sum(1 for f in first_sims if f >= 0.5)
print("Chegara aniq tushgan paragraflar: %d / %d" % (good, len(scores)))
print("Birinchi so'zi joyida: %d / %d" % (firsts, len(first_sims)))
print("O'rtacha moslik: %.0f%%" % (sum(scores) / len(scores)))
