"""Transcribe alif-hamza form audios to find missing readings."""
import json, os, sys
sys.stdout.reconfigure(encoding="utf-8")
sys.stderr.reconfigure(encoding="utf-8")
os.environ["PATH"] = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin" + os.pathsep + os.environ["PATH"]
import whisper

BASE = r"C:\Users\User\Desktop\Claud code\public\audio\edit\37_alif_hamza"

CHUNKS = [
    ("f1", "alif",         "ا",   "p25_ah_f1_alif.mp3"),
    ("f2", "alif_hamza_a", "أ",   "p25_ah_f2_alif_hamza_a.mp3"),
    ("f3", "alif_final",   "ـا",  "p25_ah_f3_alif_final.mp3"),
    ("f4", "alif_hamza_b", "إ",   "p25_ah_f4_alif_hamza_b.mp3"),
    ("f5", "waw_hamza",    "ؤ",   "p25_ah_f5_waw_hamza.mp3"),
    ("f6", "ya_hamza_iso", "ئ",   "p25_ah_f6_ya_hamza_iso.mp3"),
    ("f7", "ya_hamza_fin", "ـئ",  "p25_ah_f7_ya_hamza_fin.mp3"),
    ("f8", "ya_hamza_med", "ـئـ", "p25_ah_f8_ya_hamza_med.mp3"),
    ("f9", "hamza_alone",  "ء",   "p25_ah_f9_hamza_alone.mp3"),
]

print("Loading whisper 'small' model...", flush=True)
model = whisper.load_model("small")
print("Loaded.\n", flush=True)

results = []
for k, name, ar, fn in CHUNKS:
    p = os.path.join(BASE, fn)
    size = os.path.getsize(p)
    r = model.transcribe(p, language="ar", task="transcribe", fp16=False,
                         initial_prompt="ألف همزة واو ياء حرف")
    text = r["text"].strip()
    print(f"{k} {name} (book: {ar}) [{size} B]: {text!r}", flush=True)
    results.append({"key": k, "name": name, "book": ar, "size": size, "text": text})

with open(r"C:\Users\User\Desktop\Claud code\tools\transcribe_alif_hamza_result.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
print("\nSaved.", flush=True)
