"""Transcribe all p26 chunks to verify which audio matches which word."""
import os, sys, json
sys.stdout.reconfigure(encoding="utf-8")
os.environ["PATH"] = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin" + os.pathsep + os.environ["PATH"]
import whisper

BASE = r"C:\Users\User\Desktop\Claud code\public\audio\edit\37_alif_hamza"

CHUNKS = [
    # (key, expected_label, book_arabic, filename)
    ("r3_w1", "yamuru",     "يَامُرُ",      "p26_r3_w1_yamuru.mp3"),
    ("r3_w2", "yakhudhu",   "يَاخُذُ",      "p26_r3_w2_yakhudhu.mp3"),
    ("r3_w3", "mamuur",     "مَامُورْ",     "p26_r3_w3_mamuur.mp3"),
    ("r3_w4", "makhuudh",   "مَاخُوذْ",     "p26_r3_w4_makhuudh.mp3"),
    ("r4_w1", "yamuru",     "يَأْمُرُ",     "p26_r4_w1_yamuru.mp3"),
    ("r4_w2", "yakhudhu",   "يَأْخُذُ",     "p26_r4_w2_yakhudhu.mp3"),
    ("r4_w3", "mamuur",     "مَأْمُورْ",    "p26_r4_w3_mamuur.mp3"),
    ("r4_w4", "makhuudh",   "مَأْخُوذْ",    "p26_r4_w4_makhuudh.mp3"),
    ("r5_w1", "qurie",      "قُرِئَ",        "p26_r5_w1_qurie.mp3"),
    ("r5_w2", "qaariea",    "قَارِئَ",       "p26_r5_w2_qaariea.mp3"),
    ("r5_w3", "mubtadie",   "مُبْتَدِئْ",    "p26_r5_w3_mubtadie.mp3"),
    ("r5_w4", "mustahzie",  "مُسْتَهْزِئْ",  "p26_r5_w4_mustahzie.mp3"),
    ("r6_w1", "yuminu",     "يُؤْمِنُ",     "p26_r6_w1_yuminu.mp3"),
    ("r6_w2", "mumin",      "مُؤْمِنْ",     "p26_r6_w2_mumin.mp3"),
    ("r6_w3", "muadhdhin",  "مُؤَذِّنْ",    "p26_r6_w3_muadhdhin.mp3"),
    ("r6_w4", "muallif",    "مُؤَلِّفْ",    "p26_r6_w4_muallif.mp3"),
    ("r6_w5", "luulue",     "لُؤْلُؤْ",     "p26_r6_w5_luulue.mp3"),
    ("r7_w1", "qaail",      "قَائِلْ",      "p26_r7_w1_qaail.mp3"),
    ("r7_w2", "qaaim",      "قَائِمْ",      "p26_r7_w2_qaaim.mp3"),
    ("r7_w3", "saail",      "سَائِلْ",      "p26_r7_w3_saail.mp3"),
    ("r7_w4", "maail",      "مَائِلْ",      "p26_r7_w4_maail.mp3"),
    ("r7_w5", "raiis",      "رَئِيسْ",      "p26_r7_w5_raiis.mp3"),
    ("r8_w1", "bisa",       "بِئْسَ",       "p26_r8_w1_bisa.mp3"),
    ("r8_w2", "bir",        "بِئْرُ",       "p26_r8_w2_bir.mp3"),
    ("r8_w3", "saila",      "سَئِلَ",       "p26_r8_w3_saila.mp3"),
    ("r8_w4", "yasal",      "يَسْئَلْ",     "p26_r8_w4_yasal.mp3"),
    ("r8_w5", "masuul",     "مَسْئُولْ",    "p26_r8_w5_masuul.mp3"),
    ("r9_w1", "shaaa",      "شَاءَ",        "p26_r9_w1_shaaa.mp3"),
    ("r9_w2", "saaa",       "سَاءَ",        "p26_r9_w2_saaa.mp3"),
    ("r9_w3", "jaaa",       "جَاءَ",        "p26_r9_w3_jaaa.mp3"),
    ("r9_w4", "yashaau",    "يَشَاءُ",      "p26_r9_w4_yashaau.mp3"),
    ("r9_w5", "masaau",     "مَسَاءُ",      "p26_r9_w5_masaau.mp3"),
    ("c1_w1", "shay",       "شَىْءُ",       "p26_c1_w1_shay.mp3"),
    ("c1_w2", "jay",        "جَىْءُ",       "p26_c1_w2_jay.mp3"),
    ("c1_w3", "yajii",      "يَجِىْءُ",     "p26_c1_w3_yajii.mp3"),
    ("c1_w4", "yusii",      "يُسِىْءُ",     "p26_c1_w4_yusii.mp3"),
    ("c1_w5", "musii",      "مُسِىْءُ",     "p26_c1_w5_musii.mp3"),
    ("b1_w1", "almaru",     "اَلْمَرْءُ",   "p26_b1_w1_almaru.mp3"),
    ("b1_w2", "imraan",     "اِمْرَأً",     "p26_b1_w2_imraan.mp3"),
    ("b1_w3", "imriin",     "اِمْرِئٍ",     "p26_b1_w3_imriin.mp3"),
    ("b1_w4", "imruun",     "اِمْرُؤٌ",     "p26_b1_w4_imruun.mp3"),
    ("b2_w1", "aljuzu",     "اَلْجُزْءُ",   "p26_b2_w1_aljuzu.mp3"),
    ("b2_w2", "juzaha",     "جُزْأَهَا",    "p26_b2_w2_juzaha.mp3"),
    ("b2_w3", "juziha",     "جُزْئِهَا",    "p26_b2_w3_juziha.mp3"),
    ("b2_w4", "juzuha",     "جُزْؤُهَا",    "p26_b2_w4_juzuha.mp3"),
]

print("Loading medium model...", flush=True)
model = whisper.load_model("medium")
print("Loaded.\n", flush=True)

results = []
for key, label, ar, fn in CHUNKS:
    p = os.path.join(BASE, fn)
    if not os.path.exists(p):
        print(f"{key} MISSING", flush=True)
        continue
    r = model.transcribe(p, language="ar", task="transcribe", fp16=False)
    t = r["text"].strip()
    print(f"{key} (book: {ar} = {label}): {t!r}", flush=True)
    results.append({"key": key, "label": label, "book": ar, "audio_text": t})

with open(r"C:\Users\User\Desktop\Claud code\tools\transcribe_p26_result.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
print("\nSaved.", flush=True)
