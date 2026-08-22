# Muqaddima (02. Muqaddima.mp3) — to'liq transkripsiya, so'z darajasidagi vaqtlar bilan.
# Natija: tools/_tmp/muqaddima_words.json  (UTF-8)
#
# Ishlatish:  py tools/transcribe_muqaddima.py
#
# Whisper matnni "eshitib" yozadi — bizga uning MATNI kerak emas (matn allaqachon
# muqaddima.ts da bor), bizga har bir so'zning HAQIQIY vaqti kerak. Keyin
# align_muqaddima.py shu vaqtlarni bizdagi aniq matnga moslashtiradi.

import json
import os
import sys
import time

import whisper

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO = os.path.join(ROOT, "public", "audio", "02. Muqaddima.mp3")
OUT_DIR = os.path.join(ROOT, "tools", "_tmp")
OUT = os.path.join(OUT_DIR, "muqaddima_words.json")

MODEL = sys.argv[1] if len(sys.argv) > 1 else "small"


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    t0 = time.time()

    model = whisper.load_model(MODEL)
    result = model.transcribe(
        AUDIO,
        language="uz",
        word_timestamps=True,
        verbose=False,
    )

    words = [
        {"w": w["word"].strip(), "start": round(w["start"], 3), "end": round(w["end"], 3)}
        for seg in result["segments"]
        for w in seg.get("words", [])
    ]

    payload = {
        "model": MODEL,
        "audio": os.path.basename(AUDIO),
        "duration": round(words[-1]["end"], 2) if words else 0,
        "word_count": len(words),
        "words": words,
    }

    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=1)

    # Konsolga faqat ASCII yozamiz (Windows cp1251 o'zbek belgilarini chiqara olmaydi).
    print("model      : %s" % MODEL)
    print("words      : %d" % len(words))
    print("audio end  : %.2f s" % payload["duration"])
    print("elapsed    : %.0f s" % (time.time() - t0))
    print("written    : %s" % OUT)


if __name__ == "__main__":
    main()
