# -*- coding: utf-8 -*-
"""Suralar bo'limi (36-47 sahifalar) uchun o'zbekcha tarjima ma'lumotini quradi.

Manba: quran.uz API (Shayx Muhammad Sodiq Muhammad Yusuf — "Qur'oni Karim
ma'nolar tarjimasi", Tafsiri Hilol qisqa nashri). API faqat KIRILL matn
beradi; lotin varianti rasmiy imlo bo'yicha translit qilinadi
(U+02BB = o'/g' belgisi, U+02BC = tutuq belgisi). Natija islom.uz
ilovasidagi lotin matni bilan so'zma-so'z solishtirilgan (Fotiha 7-oyat).

Ishlatish:  py -X utf8 tools/fetch_tarjima.py
Natija:     src/lib/data/tarjima.ts
"""
import io
import json
import os
import sys
import subprocess

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "src", "lib", "data", "tarjima.ts")
API = "https://quran.uz/api/v1/quran"

# Kirill -> lotin (rasmiy o'zbek imlosi)
TURNED_COMMA = "ʻ"
APOSTROPHE = "ʼ"
SIMPLE = {
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d",
    "ж": "j", "з": "z", "и": "i", "й": "y", "к": "k",
    "л": "l", "м": "m", "н": "n", "о": "o", "п": "p",
    "р": "r", "с": "s", "т": "t", "у": "u", "ф": "f",
    "х": "x", "ч": "ch", "ш": "sh", "щ": "shch",
    "ы": "i", "ь": "", "э": "e",
    "ё": "yo", "ю": "yu", "я": "ya",
    "ў": "o" + TURNED_COMMA, "қ": "q", "ғ": "g" + TURNED_COMMA,
    "ҳ": "h", "ъ": APOSTROPHE,
}
VOWELS = set("аеёиоуўэюяы")
YE = "е"
TSE = "ц"
HARD = "ъ"
SOFT = "ь"


def translit(text):
    out = []
    for i, ch in enumerate(text):
        low = ch.lower()
        upper = ch != low
        nxt = text[i + 1] if i + 1 < len(text) else ""
        whole_upper = (
            upper and nxt.isalpha() and nxt == nxt.upper() and nxt.lower() != nxt
        )
        prev = text[i - 1].lower() if i > 0 else ""
        if low == YE:
            word_start = not prev.isalpha() and prev not in (HARD, SOFT)
            lat = "ye" if word_start or prev in VOWELS or prev in (HARD, SOFT) else "e"
        elif low == TSE:
            lat = "ts" if prev in VOWELS else "s"
        elif low in SIMPLE:
            lat = SIMPLE[low]
        else:
            out.append(ch)
            continue
        if upper and lat:
            lat = lat.upper() if whole_upper else lat[0].upper() + lat[1:]
        out.append(lat)
    return "".join(out)


def rng(fmt, surah, first, last):
    return [(fmt.format(n=n), surah, n) for n in range(first, last + 1)]


# Element <-> sura/oyat xaritasi.
# (element_id, sura, oyat); oyat = 0 -> bismillah; sura = 0 -> maxsus matn.
MAP = {
    36: [("taawwudh", 0, 0), ("fa_bismi", 1, 1)]
        + [("fa_v%d" % n, 1, n) for n in range(2, 8)]
        + [("bq_bismi", 2, 0)]
        + [("bq_v%d" % n, 2, n) for n in range(1, 6)],
    37: [("sh_bismillah", 91, 0)] + rng("sh_a{n}", 91, 1, 15)
        + [("ll_bismillah", 92, 0)] + rng("ll_a{n}", 92, 1, 7),
    38: rng("ll_a{n}", 92, 8, 21)
        + [("du_bism", 93, 0)] + rng("du_a{n}", 93, 1, 10),
    39: [("duho_v11", 93, 11), ("sharh_bism", 94, 0)] + rng("sharh_v{n}", 94, 1, 8)
        + [("tin_bism", 95, 0)] + rng("tin_v{n}", 95, 1, 8)
        + [("alaq_bism", 96, 0)],
    40: [("a%02d" % n, 96, n) for n in range(1, 20)]
        + [("q_bism", 97, 0)]
        + [("q%02d" % n, 97, n) for n in range(1, 6)],
    41: [("bism", 98, 0)] + rng("a{n}", 98, 1, 8),
    42: [("zz_bism", 99, 0)] + rng("zz_a{n}", 99, 1, 8)
        + [("ad_bism", 100, 0)] + rng("ad_a{n}", 100, 1, 11),
    43: [("qr_bism", 101, 0)] + rng("qr_a{n}", 101, 1, 11)
        + [("tk_bism", 102, 0)] + rng("tk_a{n}", 102, 1, 8)
        + [("as_bism", 103, 0)],
    44: rng("as_a{n}", 103, 1, 3)
        + [("hu_bism", 104, 0)] + rng("hu_a{n}", 104, 1, 9)
        + [("fi_bism", 105, 0)] + rng("fi_a{n}", 105, 1, 5),
    45: [("qu_bism", 106, 0)] + rng("qu_a{n}", 106, 1, 4)
        + [("ma_bism", 107, 0)] + rng("ma_a{n}", 107, 1, 7)
        + [("ka_bism", 108, 0)] + rng("ka_a{n}", 108, 1, 3)
        + [("kf_bism", 109, 0)],
    46: rng("kf_a{n}", 109, 1, 6)
        + [("ns_bism", 110, 0)] + rng("ns_a{n}", 110, 1, 3)
        + [("ms_bism", 111, 0)] + rng("ms_a{n}", 111, 1, 5)
        + [("ix_bism", 112, 0)] + rng("ix_a{n}", 112, 1, 4),
    47: [("fq_bism", 113, 0)] + rng("fq_a{n}", 113, 1, 5)
        + [("ns_bism", 114, 0)] + rng("ns_a{n}", 114, 1, 6),
}

# Sura sarlavhalari (kitobdagi arabcha yozuvga mos).
ARABIC_NAMES = {
    1: "سُورَةُ الْفَاتِحَة",
    2: "سُورَةُ الْبَقَرَة",
    91: "سُورَةُ الشَّمْسِ",
    92: "سُورَةُ اللَّيْلِ",
    93: "سُورَةُ الضُّحٰى",
    94: "سُورَةُ الشَّرْحِ",
    95: "سُورَةُ التِّينِ",
    96: "سُورَةُ الْعَلَقِ",
    97: "سُورَةُ الْقَدْرِ",
    98: "سُورَةُ الْبَيِّنَةِ",
    99: "سُورَةُ الزَّلْزَلَةِ",
    100: "سُورَةُ الْعَادِيَاتِ",
    101: "سُورَةُ الْقَارِعَةِ",
    102: "سُورَةُ التَّكَاثُرِ",
    103: "سُورَةُ الْعَصْرِ",
    104: "سُورَةُ الْهُمَزَةِ",
    105: "سُورَةُ الْفِيلِ",
    106: "سُورَةُ قُرَيْشٍ",
    107: "سُورَةُ الْمَاعُونِ",
    108: "سُورَةُ الْكَوْثَرِ",
    109: "سُورَةُ الْكَافِرُونَ",
    110: "سُورَةُ النَّصْرِ",
    111: "سُورَةُ الْمَسَدِ",
    112: "سُورَةُ الْاِخْلَاصِ",
    113: "سُورَةُ الْفَلَقِ",
    114: "سُورَةُ النَّاسِ",
}

# Audioda bor, lekin Qur'on oyati bo'lmagan matnlar (kirillcha).
SPECIAL = {
    "taawwudh": "Қувилган "
                "шайтондан "
                "Аллоҳнинг "
                "паноҳини "
                "сўрайман.",
}


def js(s):
    return json.dumps(s, ensure_ascii=False)


def get(url):
    """curl orqali oladi - bu mashinadagi Python CA to'plami eskirgan."""
    raw = subprocess.run(
        ["curl", "-sSL", "--max-time", "40", "-H", "User-Agent: Mozilla/5.0", url],
        capture_output=True, check=True,
    ).stdout
    return json.loads(raw.decode("utf-8"))


def main():
    surahs = sorted({s for rows in MAP.values() for _, s, _ in rows if s})
    print("Suralar: %s" % ", ".join(map(str, surahs)))

    meta = {r["id"]: r for r in get(API + "/suralarlist")["data"]}
    ayahs = {}
    for s in surahs:
        data = get("%s/manotarjima/%d" % (API, s))
        ayahs[s] = {int(row["oyat"]): row["uzbek"].strip() for row in data}
        print("  %-3d %-16s %d oyat" % (s, meta[s]["surah"], len(data)))

    bismillah = ayahs[1][1]  # Fotiha 1-oyat = bismillah tarjimasi

    entries, missing = [], []
    for page in sorted(MAP):
        for eid, surah, ayah in MAP[page]:
            key = "p%d_%s" % (page, eid)
            if surah == 0:
                cy = SPECIAL[eid]
            elif ayah == 0:
                cy = bismillah
            else:
                cy = ayahs[surah].get(ayah)
                if not cy:
                    missing.append("%s (%d:%d)" % (key, surah, ayah))
                    continue
            entries.append((key, surah, ayah, translit(cy), cy))

    if missing:
        print("YETISHMAYDI: %s" % ", ".join(missing))

    used = sorted({s for _, s, _, _, _ in entries if s})
    L = []
    L.append("// AUTO-GENERATED - qo'lda tahrirlamang.")
    L.append("// Manba: quran.uz API (Shayx Muhammad Sodiq Muhammad Yusuf,")
    L.append("// \"Qur'oni Karim ma'nolar tarjimasi\" - Tafsiri Hilol qisqa nashri).")
    L.append("// Lotin matni rasmiy imlo bo'yicha translit qilingan.")
    L.append("// Qayta qurish: py -X utf8 tools/fetch_tarjima.py")
    L.append("")
    L.append("export interface AyahTarjima {")
    L.append("  /** sura raqami (0 - Qur'on oyati emas, masalan ta'avvuz) */")
    L.append("  s: number;")
    L.append("  /** oyat raqami (0 - bismillah) */")
    L.append("  a: number;")
    L.append("  /** lotin yozuvida */")
    L.append("  uz: string;")
    L.append("  /** kirill yozuvida (manbadagi asl matn) */")
    L.append("  cy: string;")
    L.append("}")
    L.append("")
    L.append("export interface SurahInfo {")
    L.append("  ar: string;")
    L.append("  uz: string;")
    L.append("  cy: string;")
    L.append("  /** nom ma'nosi */")
    L.append("  mean: string;")
    L.append("  meanCy: string;")
    L.append("  /** Makkiy / Madaniy */")
    L.append("  place: string;")
    L.append("  placeCy: string;")
    L.append("  ayahs: number;")
    L.append("}")
    L.append("")
    L.append("export const SURAH_INFO: Record<number, SurahInfo> = {")
    for s in used:
        m = meta[s]
        L.append(
            "  %d: { ar: %s, uz: %s, cy: %s, mean: %s, meanCy: %s, "
            "place: %s, placeCy: %s, ayahs: %d },"
            % (
                s, js(ARABIC_NAMES[s]), js(translit(m["surah"])), js(m["surah"]),
                js(translit(m["translate"] or "")), js(m["translate"] or ""),
                js(translit(m["palace"] or "")), js(m["palace"] or ""),
                m["ayah_count"],
            )
        )
    L.append("};")
    L.append("")
    L.append("export const AYAH_TARJIMA: Record<string, AyahTarjima> = {")
    for key, s, a, uz, cy in entries:
        L.append("  %s: { s: %d, a: %d, uz: %s, cy: %s }," % (js(key), s, a, js(uz), js(cy)))
    L.append("};")
    L.append("")

    with open(OUT, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(L))
    print("\n%s - %d element, %d sura" % (OUT, len(entries), len(used)))


if __name__ == "__main__":
    main()
