"""Cut all sound segments from 32s to end of source, transcribe, output a mapping table."""
import os, sys, re, json, subprocess
sys.stdout.reconfigure(encoding="utf-8")
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
os.environ["PATH"] = os.path.dirname(FFMPEG) + os.pathsep + os.environ["PATH"]
import whisper

SRC = r"C:\Users\User\Desktop\Claud code\public\audio\37. alif va hamza.mp3"
SRC_BASE_OFFSET = 28.0  # silencedetect was run starting at -ss 28
START_AFTER = 30.0  # only keep segments after this absolute time (skip page 25)
TMP = r"C:\Users\User\AppData\Local\Temp\p26_segs"
os.makedirs(TMP, exist_ok=True)

# Parse silence boundaries from /tmp/silences.txt
silences = []
with open(r"C:\Users\User\AppData\Local\Temp\silences.txt", "r") as f:
    for line in f:
        m = re.search(r"silence_start: ([\d.]+)", line)
        if m:
            silences.append(("start", float(m.group(1))))
        m = re.search(r"silence_end: ([\d.]+)", line)
        if m:
            silences.append(("end", float(m.group(1))))

# Build sound segments: between silence_end and next silence_start
segments = []
last_end = 0.0
for kind, t in silences:
    abs_t = t + SRC_BASE_OFFSET
    if kind == "end":
        last_end = abs_t
    elif kind == "start":
        if last_end > 0 and abs_t > last_end:
            seg_start = last_end
            seg_dur = abs_t - last_end
            if seg_dur >= 0.30 and seg_start >= START_AFTER:
                segments.append((seg_start, seg_dur))

print(f"Found {len(segments)} sound segments after {START_AFTER}s\n", flush=True)

# Cut each segment
for i, (s, d) in enumerate(segments):
    out = os.path.join(TMP, f"seg{i:02d}.mp3")
    subprocess.run([FFMPEG, "-y", "-ss", f"{s:.2f}", "-i", SRC, "-t", f"{d:.2f}",
                    "-c:a", "libmp3lame", "-b:a", "192k", "-loglevel", "error", out],
                   check=True)

print("Cuts done. Loading whisper medium model...", flush=True)
model = whisper.load_model("medium")
print("Transcribing each segment...\n", flush=True)

results = []
for i, (s, d) in enumerate(segments):
    out = os.path.join(TMP, f"seg{i:02d}.mp3")
    r = model.transcribe(out, language="ar", task="transcribe", fp16=False)
    text = r["text"].strip()
    end = s + d
    print(f"seg{i:02d} [{s:6.2f}-{end:6.2f}, {d:.2f}s]: {text!r}", flush=True)
    results.append({"i": i, "start": round(s, 2), "end": round(end, 2), "dur": round(d, 2), "text": text})

with open(r"C:\Users\User\Desktop\Claud code\tools\p26_segments_map.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
print(f"\nSaved -> tools/p26_segments_map.json ({len(results)} segments)", flush=True)
