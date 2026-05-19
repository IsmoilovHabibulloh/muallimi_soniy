"""Transcribe R5-R7 audio chunks with whisper to check word/audio match."""
import json
import os
import sys
sys.stdout.reconfigure(encoding="utf-8")
sys.stderr.reconfigure(encoding="utf-8")
os.environ["PATH"] = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin" + os.pathsep + os.environ["PATH"]
import whisper

CHUNKS = [
    ("r5_w1", "Mubayyaḍan",  "مُبَيَّضًا",   "an"),
    ("r5_w2", "Musawwadin",  "مُسَوَّدٍ",   "in"),
    ("r5_w3", "Musaffarun",  "مُصَفَّرٌ",    "un"),
    ("r5_w4", "Muḥammaran",  "مُحَمَّرًا",   "an"),
    ("r5_w5", "Mukhaḍḍarun", "مُخَضَّرٌ",    "un"),
    ("r6_w1", "Muhtazzan",  "مُهْتَزًّا",   "an"),
    ("r6_w2", "Muḥtajjun",  "مُحْتَجٌّ",    "un"),
    ("r6_w3", "Munsaddun",  "مُنْسَدٌّ",    "un"),
    ("r6_w4", "Muḍṭarrun",  "مُضْطَرٌّ",    "un"),
    ("r6_w5", "Mukhtaṣṣun", "مُخْتَصٌّ",    "un"),
    ("r7_w1", "Mustariddan",  "مُسْتَرِدًّا",  "an"),
    ("r7_w2", "Mustaḥibbun",  "مُسْتَحِبٌّ",  "un"),
    ("r7_w3", "Mustaḥillun",  "مُسْتَحِلٌّ",  "un"),
    ("r7_w4", "Mustadillan",  "مُسْتَدِلًّا", "an"),
    ("r7_w5", "Musta'iddun",  "مُسْتَعِدٌّ",  "un"),
]

NAME_MAP = {
    "r5_w1": "mubayyadan", "r5_w2": "musawwadin", "r5_w3": "musaffarun",
    "r5_w4": "muhammaran", "r5_w5": "mukhaddarun",
    "r6_w1": "muhtazzan", "r6_w2": "muhtajjun", "r6_w3": "munsaddun",
    "r6_w4": "mudtarrun", "r6_w5": "mukhtassun",
    "r7_w1": "mustariddan", "r7_w2": "mustahibbun", "r7_w3": "mustahillun",
    "r7_w4": "mustadillan", "r7_w5": "mustaiddun",
}

BASE = r"C:\Users\User\Desktop\Claud code\public\audio\edit\36_tanvinli_tashdid"

print("Loading whisper 'small' model (downloads ~250MB on first run)...", flush=True)
model = whisper.load_model("small")
print("Model loaded. Transcribing...\n", flush=True)

results = []
for key, expected_label, expected_arabic, expected_ending in CHUNKS:
    fname = f"p25_{key}_{NAME_MAP[key]}.mp3"
    path = os.path.join(BASE, fname)
    if not os.path.exists(path):
        print(f"MISSING: {path}", flush=True)
        continue
    r = model.transcribe(path, language="ar", task="transcribe", fp16=False)
    text = r["text"].strip()
    print(f"{key} (book: {expected_label} / {expected_ending}): {text}", flush=True)
    results.append({"key": key, "book_label": expected_label, "book_arabic": expected_arabic,
                    "expected_ending": expected_ending, "audio_text": text})

with open(r"C:\Users\User\Desktop\Claud code\tools\transcribe_r5_r7_result.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
print("\nSaved -> tools/transcribe_r5_r7_result.json", flush=True)
