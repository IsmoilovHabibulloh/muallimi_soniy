"""Re-transcribe inconclusive chunks with medium model to confirm tanvin endings."""
import json, os, sys
sys.stdout.reconfigure(encoding="utf-8")
sys.stderr.reconfigure(encoding="utf-8")
os.environ["PATH"] = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin" + os.pathsep + os.environ["PATH"]
import whisper

# Chunks where whisper-small output didn't clearly show the tanvin ending.
# Each: (key, expected_arabic, expected_ending, filename)
CHUNKS = [
    ("r5_w1", "مُبَيَّضًا",  "an", "p25_r5_w1_mubayyadan.mp3"),
    ("r5_w3", "مُصَفَّرٌ",   "un", "p25_r5_w3_musaffarun.mp3"),
    ("r5_w4", "مُحَمَّرًا",  "an", "p25_r5_w4_muhammaran.mp3"),
    ("r6_w1", "مُهْتَزًّا",  "an", "p25_r6_w1_muhtazzan.mp3"),
    ("r6_w3", "مُنْسَدٌّ",   "un", "p25_r6_w3_munsaddun.mp3"),
    ("r6_w4", "مُضْطَرٌّ",   "un", "p25_r6_w4_mudtarrun.mp3"),
    ("r6_w5", "مُخْتَصٌّ",   "un", "p25_r6_w5_mukhtassun.mp3"),
    ("r7_w1", "مُسْتَرِدًّا", "an", "p25_r7_w1_mustariddan.mp3"),
    ("r7_w2", "مُسْتَحِبٌّ",  "un", "p25_r7_w2_mustahibbun.mp3"),
    ("r7_w3", "مُسْتَحِلٌّ",  "un", "p25_r7_w3_mustahillun.mp3"),
    ("r7_w4", "مُسْتَدِلًّا", "an", "p25_r7_w4_mustadillan.mp3"),
]

BASE = r"C:\Users\User\Desktop\Claud code\public\audio\edit\36_tanvinli_tashdid"

print("Loading whisper 'medium' model (downloads ~1.5GB on first run)...", flush=True)
model = whisper.load_model("medium")
print("Model loaded.\n", flush=True)

results = []
for key, ar, ending, fname in CHUNKS:
    path = os.path.join(BASE, fname)
    # Add a prompt hint about diacritics — helps whisper preserve tanvin
    r = model.transcribe(path, language="ar", task="transcribe", fp16=False,
                         initial_prompt="مُبَيَّضًا مُصَفَّرٌ مُحَمَّرًا تنوين تشديد")
    text = r["text"].strip()
    print(f"{key} (book: {ar} / {ending}): {text}", flush=True)
    results.append({"key": key, "book_arabic": ar, "expected_ending": ending, "audio_text": text})

with open(r"C:\Users\User\Desktop\Claud code\tools\transcribe_verify_medium_result.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
print("\nSaved.", flush=True)
