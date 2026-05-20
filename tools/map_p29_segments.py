"""Map all sound segments of p29 region in source 40 + transcribe."""
import os, subprocess, re, json, sys
sys.stdout.reconfigure(encoding="utf-8")
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
os.environ["PATH"] = os.path.dirname(FFMPEG) + os.pathsep + os.environ["PATH"]
import whisper

SRC = r"C:\Users\User\Desktop\Claud code\public\audio\40. yozilsa-o'qilmaydi.mp3"
TMP = r"C:\Users\User\AppData\Local\Temp\p29_segs"
os.makedirs(TMP, exist_ok=True)
SRC_OFFSET = 55.0

out = subprocess.run([FFMPEG, "-hide_banner", "-nostats", "-ss", str(SRC_OFFSET), "-i", SRC,
                      "-af", "silencedetect=noise=-35dB:duration=0.50",
                      "-f", "null", "-"], capture_output=True, text=True).stderr

starts = []
ends = []
for line in out.splitlines():
    m = re.search(r"silence_start: ([\d.]+)", line)
    if m: starts.append(float(m.group(1)))
    m = re.search(r"silence_end: ([\d.]+)", line)
    if m: ends.append(float(m.group(1)))

# Sound = silence_end → next silence_start
segments = []
i_end = 0
for s_start in starts:
    while i_end < len(ends) and ends[i_end] >= s_start:
        i_end += 1
    if i_end < len(ends):
        seg_start = ends[i_end] + SRC_OFFSET
        # find next silence_start after this end
        for s2 in starts:
            if s2 > ends[i_end]:
                seg_end = s2 + SRC_OFFSET
                if seg_end - seg_start >= 0.40:
                    segments.append((seg_start, seg_end - seg_start))
                break
        i_end += 1

# Simpler: just pair silence_end[i] with silence_start[i+1] (if exists)
segments = []
for i in range(min(len(ends), len(starts)-1) if starts and ends else 0):
    if starts[i+1] > ends[i]:
        segments.append((ends[i] + SRC_OFFSET, starts[i+1] - ends[i]))

print(f"Found {len(segments)} sound segments\n", flush=True)
for i, (s, d) in enumerate(segments):
    out_path = os.path.join(TMP, f"seg{i:02d}.mp3")
    subprocess.run([FFMPEG, "-y", "-ss", f"{s:.2f}", "-i", SRC, "-t", f"{d:.2f}",
                    "-c:a", "libmp3lame", "-b:a", "192k", "-loglevel", "error", out_path], check=True)

print("Loading whisper...", flush=True)
model = whisper.load_model("medium")
print()
results = []
for i, (s, d) in enumerate(segments):
    out_path = os.path.join(TMP, f"seg{i:02d}.mp3")
    r = model.transcribe(out_path, language="ar", task="transcribe", fp16=False)
    text = r["text"].strip()
    print(f"seg{i:02d} [{s:6.2f}-{s+d:6.2f}, {d:.2f}s]: {text!r}", flush=True)
    results.append({"i": i, "start": round(s, 2), "end": round(s+d, 2), "dur": round(d, 2), "text": text})

with open(r"C:\Users\User\Desktop\Claud code\tools\p29_segments_map.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
print(f"\nSaved {len(results)} segments", flush=True)
