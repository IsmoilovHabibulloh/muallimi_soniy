"""Re-cut p28 Block 2 (Vav Alifiyya) + Block 3 (Yozilsa) + add 4 subtitles."""
import os, subprocess, sys
sys.stdout.reconfigure(encoding="utf-8")
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
os.environ["PATH"] = os.path.dirname(FFMPEG) + os.pathsep + os.environ["PATH"]
import whisper

SRC_39 = r"C:\Users\User\Desktop\Claud code\public\audio\39. yoz-o'qiladigan.mp3"
SRC_40 = r"C:\Users\User\Desktop\Claud code\public\audio\40. yozilsa-o'qilmaydi.mp3"
OUT_39 = r"C:\Users\User\Desktop\Claud code\public\audio\edit\39_yoz_oqiladigan"
OUT_40 = r"C:\Users\User\Desktop\Claud code\public\audio\edit\40_yozilsa_oqilmaydi"

# (src, filename, start, dur, book)
CUTS = [
    # Block 1 subtitle 2 (between R3 and R4) — from 39.yoz
    (SRC_39, OUT_39, "p28_b1_sub2",      145.05, 4.30, "shuningdek..."),
    # Block 2 — Vav Alifiyya (re-cut)
    (SRC_39, OUT_39, "p28_b2_intro",     164.40, 1.75, "Vav Alifiyya"),
    (SRC_39, OUT_39, "p28_b2_sub",       167.40, 4.40, "ushbu so'zlardagi vavlar..."),
    # R5: salat/zakat/dhakat/hayat/ghadat/riba — 6 words
    (SRC_39, OUT_39, "p28_r5_w1_salat",  173.40, 1.45, "صَلٰوةٌ"),
    (SRC_39, OUT_39, "p28_r5_w2_zakat",  175.80, 1.55, "زَكٰوةٌ"),
    (SRC_39, OUT_39, "p28_r5_w3_dhakat", 178.15, 1.60, "ذَكٰوةٌ"),
    (SRC_39, OUT_39, "p28_r5_w4_hayat",  180.60, 1.50, "حَيٰوةٌ"),
    (SRC_39, OUT_39, "p28_r5_w5_ghadat", 183.05, 1.50, "غَدٰوةٌ"),
    (SRC_39, OUT_39, "p28_r5_w6_riba",   185.40, 1.05, "رِبٰوا"),
    # Block 3 — Yozilsa from 40.yozilsa
    (SRC_40, OUT_40, "p28_b3_title",     0.00, 3.00, "Yozilsada o'qilmaydi"),
    (SRC_40, OUT_40, "p28_b3_sub1",      4.30, 7.10, "ushbu so'zlar boshidagi alif..."),
    # R6: ulu/ula/ulati/ulai/ulaika
    (SRC_40, OUT_40, "p28_r6_w1_ulu",    12.35, 0.90, "اُولُو"),
    (SRC_40, OUT_40, "p28_r6_w2_ula",    14.30, 0.90, "اُولى"),
    (SRC_40, OUT_40, "p28_r6_w3_ulati",  16.20, 1.00, "اُولاَتِ"),
    (SRC_40, OUT_40, "p28_r6_w4_ulai",   18.30, 1.75, "اُولاَءِ"),
    (SRC_40, OUT_40, "p28_r6_w5_ulaika", 21.05, 2.00, "اُولئك"),
    # Block 3 subtitle 2 (between R6 and R7)
    (SRC_40, OUT_40, "p28_b3_sub2",      25.55, 9.80, "ushbu so'zlarki..."),
    # R7: amanu/aminu/qalu/ilamu/imalu
    (SRC_40, OUT_40, "p28_r7_w1_amanu",  37.20, 1.35, "اَمَنُوا"),
    (SRC_40, OUT_40, "p28_r7_w2_aminu",  39.55, 1.35, "اَمِنُوا"),
    (SRC_40, OUT_40, "p28_r7_w3_qalu",   41.80, 1.30, "قَالُوا"),
    (SRC_40, OUT_40, "p28_r7_w4_ilamu",  44.20, 1.45, "اِعْلَمُوا"),
    (SRC_40, OUT_40, "p28_r7_w5_imalu",  46.60, 1.55, "اِعْمَلُوا"),
]

for src, out, name, start, dur, _ in CUTS:
    out_path = os.path.join(out, name + ".mp3")
    subprocess.run([FFMPEG, "-y", "-ss", f"{start:.2f}", "-i", src, "-t", f"{dur:.2f}",
                    "-c:a", "libmp3lame", "-b:a", "192k", "-loglevel", "error", out_path],
                   check=True)

print(f"Cut {len(CUTS)} files. Verifying with whisper...", flush=True)
model = whisper.load_model("medium")
print()
for src, out, name, start, dur, ar in CUTS:
    out_path = os.path.join(out, name + ".mp3")
    r = model.transcribe(out_path, language="ar", task="transcribe", fp16=False)
    print(f"{name} (book: {ar}): {r['text'].strip()!r}", flush=True)
