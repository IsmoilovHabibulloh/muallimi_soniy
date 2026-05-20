"""Transcribe all 17 p27 ta-marbuta chunks to verify each matches its book word."""
import os, sys, json
sys.stdout.reconfigure(encoding="utf-8")
os.environ["PATH"] = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin" + os.pathsep + os.environ["PATH"]
import whisper

BASE = r"C:\Users\User\Desktop\Claud code\public\audio\edit\38_t_marbuta"

CHUNKS = [
    ("head",   "ة ـة = ت",   "Ta marbuta head",  "p27_head.mp3"),
    ("r1_w1",  "عَزِيزَةٌ",   "Azizatun",         "p27_r1_w1_azizatun.mp3"),
    ("r1_w2",  "فَرِيدَةٌ",   "Faridatun",        "p27_r1_w2_faridatun.mp3"),
    ("r1_w3",  "حَمِيدَةٌ",   "Hamidatun",        "p27_r1_w3_hamidatun.mp3"),
    ("r1_w4",  "سَعِيدَةٌ",   "Saidatun",         "p27_r1_w4_saidatun.mp3"),
    ("r1_w5",  "شَهِيدَةٌ",   "Shahidatun",       "p27_r1_w5_shahidatun.mp3"),
    ("r2_w1",  "جَمِيلَةٌ",   "Jamilatun",        "p27_r2_w1_jamilatun.mp3"),
    ("r2_w2",  "حَلِيمَةٌ",   "Halimatun",        "p27_r2_w2_halimatun.mp3"),
    ("r2_w3",  "سَلِيمَةٌ",   "Salimatun",        "p27_r2_w3_salimatun.mp3"),
    ("r2_w4",  "شَرِيفَةٌ",   "Sharifatun",       "p27_r2_w4_sharifatun.mp3"),
    ("r2_w5",  "نَعِيمَةٌ",   "Naimatun",         "p27_r2_w5_naimatun.mp3"),
    ("r3_w1",  "مَرَّةٌ",     "Marratun",         "p27_r3_w1_marratun.mp3"),
    ("r3_w2",  "مَرَّاتٌ",    "Marraatun",        "p27_r3_w2_marraatun.mp3"),
    ("r3_w3",  "كَرَّةٌ",     "Karratun",         "p27_r3_w3_karratun.mp3"),
    ("r3_w4",  "كَرَّاتٌ",    "Karraatun",        "p27_r3_w4_karraatun.mp3"),
    ("r3_w5",  "حُرَّةٌ",     "Hurratun",         "p27_r3_w5_hurratun.mp3"),
    ("r3_w6",  "حُرَّاتٌ",    "Hurraatun",        "p27_r3_w6_hurraatun.mp3"),
]

print("Loading medium model...", flush=True)
model = whisper.load_model("medium")
print("Loaded.\n", flush=True)

results = []
for key, ar, label, fn in CHUNKS:
    p = os.path.join(BASE, fn)
    if not os.path.exists(p):
        print(f"{key} MISSING: {fn}", flush=True)
        continue
    r = model.transcribe(p, language="ar", task="transcribe", fp16=False)
    t = r["text"].strip()
    print(f"{key} (book: {ar} = {label}): {t!r}", flush=True)
    results.append({"key": key, "book": ar, "label": label, "audio_text": t})

with open(r"C:\Users\User\Desktop\Claud code\tools\transcribe_p27_result.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
print("\nSaved -> tools/transcribe_p27_result.json", flush=True)
