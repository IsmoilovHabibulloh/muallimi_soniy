"""Transcribe alif-hamza practice row chunks."""
import os, sys
sys.stdout.reconfigure(encoding="utf-8")
os.environ["PATH"] = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin" + os.pathsep + os.environ["PATH"]
import whisper

BASE = r"C:\Users\User\Desktop\Claud code\public\audio\edit\37_alif_hamza"

CHUNKS = [
    ("p1_w1", "amara",   "اَمَرَ",   "p25_ah_p1_w1_amara.mp3"),
    ("p1_w2", "akhadha", "اَخَذَ",   "p25_ah_p1_w2_akhadha.mp3"),
    ("p1_w3", "qaraa",   "قَرَاَ",   "p25_ah_p1_w3_qaraa.mp3"),
    ("p1_w4", "yaqrau",  "يَقْرَاُ", "p25_ah_p1_w4_yaqrau.mp3"),
    ("p2_w1", "amara",   "اَمَرَ",   "p25_ah_p2_w1_amara.mp3"),
    ("p2_w2", "akhadha", "اَخَذَ",   "p25_ah_p2_w2_akhadha.mp3"),
    ("p2_w3", "qaraa",   "قَرَأَ",   "p25_ah_p2_w3_qaraa.mp3"),
    ("p2_w4", "yaqrau",  "يَقْرَأُ", "p25_ah_p2_w4_yaqrau.mp3"),
]

print("Loading medium model...", flush=True)
model = whisper.load_model("medium")
print("Loaded.\n", flush=True)

for key, label, ar, fn in CHUNKS:
    p = os.path.join(BASE, fn)
    r = model.transcribe(p, language="ar", task="transcribe", fp16=False,
                         initial_prompt="أمر أخذ قرأ يقرأ")
    print(f"{key} ({label} / book: {ar}): {r['text'].strip()!r}", flush=True)
