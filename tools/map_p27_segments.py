"""Cut all sound segments of p27 source and transcribe to identify word order."""
import os, sys, re, json, subprocess
sys.stdout.reconfigure(encoding="utf-8")
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
os.environ["PATH"] = os.path.dirname(FFMPEG) + os.pathsep + os.environ["PATH"]
import whisper

SRC = r"C:\Users\User\Desktop\Claud code\public\audio\38. t-marbuta.mp3"
TMP = r"C:\Users\User\AppData\Local\Temp\p27_segs"
os.makedirs(TMP, exist_ok=True)

# Run silencedetect, parse output
out = subprocess.run([FFMPEG, "-hide_banner", "-nostats", "-i", SRC,
                      "-af", "silencedetect=noise=-35dB:duration=0.30",
                      "-f", "null", "-"], capture_output=True, text=True).stderr

silences = []
for line in out.splitlines():
    m = re.search(r"silence_start: ([\d.]+)", line)
    if m:
        silences.append(("start", float(m.group(1))))
    m = re.search(r"silence_end: ([\d.]+)", line)
    if m:
        silences.append(("end", float(m.group(1))))

# Build sound segments between silence_end and next silence_start
segments = []
last_end = None
for kind, t in silences:
    if kind == "end":
        last_end = t
    elif kind == "start" and last_end is not None:
        if t > last_end and (t - last_end) >= 0.30:
            segments.append((last_end, t - last_end))
        last_end = None

print(f"Found {len(segments)} sound segments\n", flush=True)

# Cut each
for i, (s, d) in enumerate(segments):
    out_path = os.path.join(TMP, f"seg{i:02d}.mp3")
    subprocess.run([FFMPEG, "-y", "-ss", f"{s:.2f}", "-i", SRC, "-t", f"{d:.2f}",
                    "-c:a", "libmp3lame", "-b:a", "192k", "-loglevel", "error", out_path],
                   check=True)

print("Cuts done. Loading medium model...", flush=True)
model = whisper.load_model("medium")
print("Transcribing...\n", flush=True)

results = []
for i, (s, d) in enumerate(segments):
    out_path = os.path.join(TMP, f"seg{i:02d}.mp3")
    r = model.transcribe(out_path, language="ar", task="transcribe", fp16=False)
    text = r["text"].strip()
    end = s + d
    print(f"seg{i:02d} [{s:6.2f}-{end:6.2f}, {d:.2f}s]: {text!r}", flush=True)
    results.append({"i": i, "start": round(s, 2), "end": round(end, 2), "dur": round(d, 2), "text": text})

with open(r"C:\Users\User\Desktop\Claud code\tools\p27_segments_map.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
print(f"\nSaved -> tools/p27_segments_map.json ({len(results)} segments)", flush=True)
