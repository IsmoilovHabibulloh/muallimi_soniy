@AGENTS.md

# Claude protokollari

> Bu — foydalanuvchi tomonidan o'rnatilgan ish tartibi qoidalari. Doimo amal qiling.

## Git push va deploy

**Faqat foydalanuvchi aniq "git push qil" / "deploy qil" deb aytgandagina**
push va serverga deploy qiling. Bundan oldin mustaqil ravishda push qilmang —
o'zgarishni faqat lokalda saqlab, foydalanuvchi tasdig'ini kuting.

Sabab: foydalanuvchi nazoratni o'zida saqlashni xohlaydi.

## UI arxitekturasini yangilab borish

Foydalanuvchi UI ni o'zgartirsa va bu yerda (CLAUDE.md ning "UI Arxitekturasi"
bo'limida) eski tavsif yozilgan bo'lsa — **eski tavsifni o'chirib, yangisini
yozib qo'ying**. Eski va yangi tavsif yonma-yon turmasin.

Sabab: agar eski arxitektura qolib ketsa, keyingi suhbatda Claude qaysi to'g'ri
ekanligini bilmay qoladi va xato qaror qabul qilishi mumkin. **Yagona haqiqat
manbai (single source of truth)** — eng so'nggi UI holati.

How to apply:
- Komponent renamed yoki o'zgartirildi → CLAUDE.md dagi nomini ham yangilang.
- Layout/spacing o'zgardi → eski qiymatlarni o'chiring, yangisini yozing.
- Yangi tugma/funksiya qo'shildi → tegishli komponent bo'limiga qo'shing.
- Eski yondashuv bekor qilindi → uni butunlay olib tashlang, izoh qoldirmang.

# Muallimi Soniy

---

## 🛑 2 ENG MUHIM XATO — HAR YANGI HARF SAHIFASI BOSHIDA TEKSHIR

Bu ikki xato o'tgan sessiyalarda (p3, p4, p5) qayta-qayta takrorlandi.
Foydalanuvchi har safar tuzatadi. **Yangi sahifani boshlashdan oldin ikki
qoidani birdek qattiqlik bilan qo'llash shart**.

### Xato #1 — Connector harfning header'i isolated shaklda yozilgan

**QAT'IY QOIDA**:

```
Agar harf ∈ {ب ت ث ج ح خ س ش ص ض ط ظ ع غ ف ق ك ل م ن ه ي} (connector):
    HEADER MAJBURIY pozitsion shakllarda:
        fatha → "Xَ"        label: "X (boshida)"
        kasra → "ـXِـ"      label: "X (oʻrtasida)"
        damma → "ـXُ"       label: "X (oxirida)"
    ISOLATED shakl ("Xَ Xِ Xُ") YOZISH MUMKIN EMAS.

Agar harf ∈ {ا د ذ ر ز و} (non-connector):
    HEADER isolated shaklda:  "Xَ Xِ Xُ"
    Label: "X fatha" / "X kasra" / "X damma"
```

**Unicode**: tatweel `ـ` = U+0640. Namunalar: `مَ` / `ـمِـ` / `ـمُ` (p4 Mim
to'g'ri), `نَ` / `ـنِـ` / `ـنُ` (p5 Nun to'g'ri).

**⚠️ PLACEHOLDER KODGA ISHONMASLIK**: `src/lib/data/elements.ts` da p6-p16 uchun
**placeholder header'lar hozir isolated shaklda** (masalan `بَ بِ بُ`). Bu
**xato** — integratsiya vaqtida **qayta yozib chiqish shart**. Copy qilib,
faqat audio URL'ni yangilashga yo'l qo'ymang.

### Xato #2 — Arab matn rasmdan noto'g'ri ko'chirilgan

**Eng xato bo'lgan joylar** (oxirgi harfdagi harakat farqi katta ma'no beradi):
- `اَمَرْتَ` (sen m) ≠ `اَمَرْتِ` (sen f) ≠ `اَمَرْتُ` (men) ≠ `اَمَرَتْ` (u f)
- `مِيزَرْ` (mizar, xato) ≠ `مَيْزَرْ` (mayzar, to'g'ri)
- `اَيْمَنَيْنِ` (xato qo'shimcha) ≠ `اَيْمَيْنِ` (to'g'ri)
- `اَمْرَنَا` (xato, 1 ta ra) ≠ `اَمْرَرْنَا` (to'g'ri, 2 ta ra)
- **p6 xatolari** (takrorlanmasin):
  - `بَيْنَ` (xato, "bayna" mashhur preposition deb yozilgan) ≠ `بَيْنُ` (to'g'ri, ism shakli)
  - `رَيْبْ` (xato, Qur'on `لَا رَيْبَ فِيهِ` ta'sirida) ≠ `رَيْبُ` (to'g'ri)
  - `اَمْرَكَ` (xato, mim-sukun, 3 heca) ≠ `اَمَرَكَ` (to'g'ri, mim-fatha, 4 heca — u seni buyurdi)

**QAT'IY QOIDA**: Har arab so'zini rasmdan **harf-harf** (tanimay) parse
qiling. Struktura yozing:
```
alif+fatha → mim+fatha → ra+sukun → ta+kasra  →  اَمَرْتِ  →  "amarti"
```
So'zni "tanib", harakatlarini xotira asosida to'ldirish — **taqiqlangan**.
PDF'ga ishonmang (80% aniqlik). Shubhada bo'lsangiz — foydalanuvchidan so'rang,
taxmin qilmang.

**Majburiy audio verify**: Har so'zni yozganingizdan keyin `afplay` bilan
mos chunk'ni eshiting. Audio bilan transliteratsiya to'liq mos kelmasa —
qayta parse qiling.

To'liq protokol: `### ⚠️ Arab matnni rasmdan o'qish protokoli` bo'limida.

---

## Loyiha haqida

Bu — Ahmad Hodiy Maqsudiyning **"Muallimi Soniy"** (1892) klassik darsligini
audio bilan integratsiya qilingan interaktiv versiyasi. Maqsad — arab tilini
(Qur'on tilovati va tajvid) o'rgatish.

Loyiha **ochiq kodli** bo'ladi. Maqsad oliy: kelajakda kim shu kabi loyiha qurmoqchi
bo'lsa, biz qiynalganday qiynalmasin — kod va hujjatlar **toza, tushunarli, oson
takrorlanadigan** bo'lishi shart.

## ⚠️ Eng nozik jihat: audio-matn integratsiyasi

Har bir arab harfining **mahraji** (talaffuz nuqtasi) bor. Bizdagi audio yozuvlarda
**hamma harflar to'g'ri mahrajdan chiqarilgan** — bu darslikning butun mohiyati.

**Agar audioni xato biriktirsak yoki noto'g'ri segment ijro etilsa — darslik
o'z mohiyatini yo'qotadi va foydalanuvchiga noto'g'ri talaffuz o'rgatadi.**

Shuning uchun:
- Har bir sahifa **qo'lda, individual** ishlab chiqiladi.
- Audio segment koordinatalari va element pozitsiyalari **avtomatik generatsiya
  qilinmaydi** — har birini eshitib, tekshirib qo'yiladi.
- Audio integratsiyasini qo'l bilan tekshirmasdan **hech qachon** o'zgartirmang.

## Audio arxitekturasi

Audio integratsiyasi — **chunked-files** yondashuvi:

1. **Asl audio (backup)** — `public/audio/NN. <topic>.mp3` (har dars bitta katta fayl).
   Foydalanuvchiga ko'rinmaydi, lekin saqlanadi:
   - Audio control bar'dagi "to'liq ijro" (lesson.audioUrl) shuni ishlatadi.
   - Xato bo'lsa, qayta cut qilish uchun manba.
2. **Bo'lingan chunklar** — `public/audio/edit/<NN_topic>/eXX_<name>.mp3`:
   - Har bir element o'z fayli bilan (28 harf → 28 chunk).
   - App shu fayllardan ijro qiladi (per-element click).
3. **Master nusxalar** — `Materiallar/<bob>/edit_audios/<NN_topic>/`:
   - `public/audio/edit/...` ga aynan mos.
   - Source-of-truth — qayta deploy/qayta yaratish uchun.

### Element-chunk bog'lanishi

`src/lib/data/elements.ts` da:
```ts
const A = {
  alifbo: "/audio/03. alifbo.mp3",      // asl, backup
  e: (n: string) => `/audio/edit/03_alifbo/${n}.mp3`,  // chunk helper
};

["02", "harf", "ب", "Ba", A.e("e02_ba"), 0, 0.50, ...]
//                         ^chunkUrl  ^start  ^end (= chunk_duration)
```

Foydalanuvchi `ب` ustiga bosganda — `e02_ba.mp3` to'liq ijro etiladi.

## Ma'lumot olish (data API)

Element ikki darajada chaqirilishi kerak:

1. **Element darajasida** — bitta harf/so'z/jumla alohida ijro etiladi.
2. **Sahifa darajasida** — masalan 4-sahifa chaqirilsa, undagi **barcha
   elementlar va audio segmentlari birga** keladi (ketma-ket ijro yoki tanlab
   ijro uchun).

## 🚨 Yangi sahifa ustida ishlashdan oldin — MAJBURIY checklist

Bu checklist — avvalgi sessiyalarda o'rganilgan xatolarni takrorlamaslik uchun.
Har bir yangi sahifa uchun, TO'G'RIDAN-TO'G'RI boshlamang. Avval:

### 1. Kitob rasmini batafsil ko'ring

```
Read Materiallar/harflar/<N>.jpg  # yoki tegishli bob papkasi
```

- Rasmda **nechta element** borligini sanang (harflar, so'zlar, birikmalar).
- Bo'limlar, qatorlar, dividerlarni yozib oling.
- Agar shakllar bog'langan bo'lsa — **pozitsion shakllar** (ـمِـ, ـتُ kabi)
  borligini qayd eting.

### 2. PDF transkripsiyani tekshiring

```
Read Materiallar/audio_qoidalar/<NN>_*.pdf
```

- PDF dagi entry sonini **rasm dagi element soniga taqqoslang**.
- Agar PDF kam bo'lsa — PDF yetmagan entry'lar bor, **audio'da sukunat aniqlash
  bilan topish kerak**.
- PDF transkripsiya matnlari har doim to'g'ri emas (shin/sod, tarir/tarar kabi).

### 3. Audio ni batafsil analiz qiling

```bash
./tools/ffmpeg -i <audio> -af "silencedetect=noise=-40dB:duration=0.10" -f null -
```

- Sukunatlar orasidagi sound region'lar sonini PDF + rasm bilan taqqoslang.
- Agar son farq qilsa — tekshirish kerak. Audio'da qo'shimcha / kam so'z bormi?

### 4. Sahifalarni birlashtirishdan oldin rasmlarni taqqoslang

**O'tgan sessiyada xato qildik**: 3.jpg va 4.jpg "bir xil" deb merged qildik,
lekin ular butunlay boshqa sahifalar edi. Merge qilishdan oldin **ikkala rasmni
parallel ko'ring va haqiqatan bir xil ekanligiga ishonch hosil qiling**.

### 5. Connector harf bo'lsa — POZITSION SHAKLLAR majburiy

Agar sahifa connector harf (`ب ت ث ج ح خ س ش ص ض ط ظ ع غ ف ق ك ل م ن ه ي`)
ustida bo'lsa, header qatori **har doim** pozitsion shakllarda yoziladi:
`X / ـXِـ / ـXُ`. Uzbek label: `"X (boshida)" / "X (oʻrtasida)" / "X (oxirida)"`.

**Xato takror kelmasin**: Men p4 da mim/ta uchun to'g'ri qilganman, lekin p5
da nun/ya uchun isolated shakl yozib xato qilganman. Har YANGI sahifaga yangi
harf qo'shilsa — darhol ushbu qoidani qo'llash kerak, keyin tekshirmoq
uchun qoldirmaslik.

### 6. Build xatoni oldindan ushlash

Deploy qilishdan oldin **lokal build** ishga tushiring — TypeScript xatolarini
server build'da emas, lokal'da ushlash arzonroq:

```bash
cd muallimus-soniy && npx next build
```

Masalan duplicate object key (`4: make(4, p4)` ikki marta) xatolari bu bilan
ushlanadi.

## Har bir sahifa ustida ish tartibi (audio integratsiya protokoli)

> **Bu CLAUDE.md darajasidagi qat'iy protokol — har bir sahifa uchun amal qiling.**

### ⚠️ PDF'ga ko'r-ko'rona ishonmaslik

`Materiallar/audio_qoidalar/<NN>_*.pdf` fayllari 80% aniqlikdagi qo'llanma.
**PDF vaqtlari odatda tovushning markazi** (eng baland qism / loud peak)'ni
ko'rsatadi — to'liq sound envelope'ni emas. Shuning uchun ular:
- Vowel attack (boshidagi unli ko'tarilishi) — 50-100 ms kesib yuborilgan
- Fricative tail (oxiridagi shhh/ssss cho'zilgan tovush) — 100-200 ms kesilgan
- Ba'zi harflarni butunlay noto'g'ri joyga yo'naltirgan (masalan, alifbo'da `shin` — PDF 82.36 ga yo'naltirgan lekin u yerda sod, asl joyi 79.40)
- Ba'zi so'zlarni transkripsiyada tushirib qoldirgan (masalan, sahifa 4 Mim so'zlari: `umara`, `imru`, `irm` PDF to'liq bermagan)
- So'zlar oxirini kesgan (amara/imra/amru — 180-340 ms tail yo'qolgan)

**PDF'ni "markaz koordinatasi" sifatida boshlang'ich nuqta deb oling — har
doim -50/+100 ms buffer qo'shing va eshitib tasdiqlang.**

### ⚠️ Rasm bilan audio mos kelmasligi mumkin

Kitob rasmi vizual referens, lekin yakuniy haqiqat — foydalanuvchi audio eshituvi:
- Rasmda **تَرَرْ** (tarar) ko'ringan, lekin audio talaffuzi **تَرِرْ** (tarir).
  Demak harakat sukun emas kasra bo'lishi kerak.
- So'z oxiri ba'zida sukun, ba'zida damma/fatha/kasra — har birini eshitib tekshirish shart.
- Arab harakatlari ba'zan juda mayda chiziq — rasm past sifatli bo'lsa, farqlab
  bo'lmaydi. Shubhada bo'lsangiz — foydalanuvchidan aniqlashtirib so'rang.

**Qoida**: Rasm → vizual reja. Audio → haqiqiy matn. Ikkisi ziddiyatga tushsa — foydalanuvchidan so'rang.

### ⚠️ PDF'da entry'lar tushib qolishi mumkin

O'tgan sessiyada sahifa 4 Mim qatorida **3 ta so'z yetishmagan** edi (umara, imru, irm)
— PDF transkripsiyasi buzuq yoki to'liq emas edi. Echim:

1. **Rasm elementlarini sanash**: rasmda nechta so'z? PDF da nechta entry?
2. **Audio'da sukunat aniqlash**: `silencedetect` butun audio bo'ylab ishga tushiring.
   Sukunatlar orasidagi sound regions sonini PDF entry soniga taqqoslang.
3. **Farq bo'lsa — audio'da yashirilgan entry'lar bor**: ularning timing'ini
   silence boundary'laridan oling, foydalanuvchi tasdiqlaydi.

### ⚠️ So'zlar oxiri 180-340 ms kesilgan bo'lishi mumkin

PDF vaqtlari so'zning **loud peak markazini** ko'rsatadi. So'z oxiridagi tabiiy
fade-out 180-340 ms davom etadi — PDF buni kesib yuboradi.

Protokol:
1. Har so'z uchun **silence-detected tugash vaqtini oling** (PDF emas).
2. Buffer: +100 ms (ayniqsa cho'zilgan oxiri bor so'zlar uchun).
3. Foydalanuvchi eshitadi: "oxiri kesilgan" desa — silence boundary + 50ms ga qo'shing.

### ⚠️ Arab matnni rasmdan o'qish protokoli (eng ko'p xato keladigan joy)

O'tgan sessiyalarda (p3, p4, p5, p6) matn noto'g'ri ko'chirilgani uchun foydalanuvchi
qayta-qayta tuzatgan. **Xato pattern'lari**:

1. **Oxirgi harfdagi harakat** — `ت` oxirida `fatha/kasra/damma/sukun` turli ma'no
   beradi:
   - `اَمَرْتَ` (amarta, 2-m "sen") vs `اَمَرْتِ` (amarti, 2-f "sen") vs
     `اَمَرْتُ` (amartu, 1-sing "men") vs `اَمَرَتْ` (amarat, 3-f "u ayol")
2. **Alif boshidagi harakat** — `اَ` (fatha) vs `اُ` (damma) vs `اِ` (kasra):
   aktiv/passiv/predlog farqi
3. **Tushib qolgan harflar** — `مَرَرْتُ` (ikki ra) vs `مَرْتُ` (bir ra);
   `مَيْزَرْ` (m+y+z+r) vs `مِيزَرْ` (m+i+z+r — noto'g'ri)
4. **Qo'shilgan harflar** — `اَيْمَيْنِ` (aymayni, to'g'ri) vs `اَيْمَنَيْنِ`
   (aymanayni, qo'shimcha `نَ` bilan noto'g'ri)
5. **PDF ga ishonish** — PDF 80% aniqlik. Rasm va audio asosiy manba
6. **"Tanish so'z" pattern completion** — ko'rishga tanish ko'ringan so'zni
   xotira asosida to'ldirish
7. **O'rtadagi mim/ra/nun sukun vs fatha** — mayda nuqta/chiziq bo'lgani uchun
   ko'rinmaydi, lekin hecani o'zgartiradi:
   - `اَمْرَكَ` (amraka, 3 heca) vs `اَمَرَكَ` (amaraka, 4 heca — u seni
     buyurdi) — mim ostida fatha borligi "ma" hecasini beradi
   - `تَرْكُ` (tarku, 2 heca) vs `تَرَكَ` (taraka, 3 heca past fe'l)

### 🚨 "Tanish so'zlar" qora ro'yxati — DOIM shubhali

Bu so'zlar arab tilida ma'lum ma'no bilan keladi, lekin **darslikda odatdagidan
boshqa harakat bilan bo'lishi mumkin**. Xotira asosida yozmang — rasmdan harf-harf
parse qiling va audio bilan tasdiqlang:

| Tanish so'z | Odatdagi harakat | Darslikdagi variant | Misol |
|---|---|---|---|
| bayn | `بَيْنَ` (preposition) | `بَيْنُ` (ism shakli) | p6 Ba |
| rayb | `رَيْبَ` / `رَيْبْ` (Qur'on) | `رَيْبُ` | p6 Ba |
| amr | `اَمْر` (3 heca) | `اَمَرَ` (4 heca past fe'l) | p6 Kaf |
| qalb | `قَلْبْ` | `قَلْبُ` (ism shakli) | p9 |
| 'abd | `عَبْد` | `عَبْدُ` / `عَبَدَ` | — |

**Qoida**: Agar so'z ma'lum/mashhur tuyulsa — **bu qizil alarm**. Rasmni lupa
bilan ko'ring, audio'ni eshiting, foydalanuvchidan aniqlashtiring.

### 🔔 Juftlangan fe'llar — ikkisi birga keladi

Arab darsliklarida fe'l shakllari juft (3-m erkak + 3-f ayol) yonma-yon beriladi.
Agar biri ko'rinsa — ikkinchisini ham tekshiring:

| 3-erkak (u) | 3-ayol (u f) | 2-erkak + 2-f object |
|---|---|---|
| `اَمَرَ` (amara) | `اَمَرَتْ` (amarat) | — |
| `اَمَرَكَ` (amaraka, u erkakni b.) | `اَمَرَتْكَ` (amaratka, u ayol b.) | ↔ |
| `كَتَبَ` (kataba) | `كَتَبَتْ` (katabat) | — |

**Qoida**: Agar ro'yxatda `اَمَرَتْكَ` (ayol) ko'rinsa — unga juft erkak shakli
`اَمَرَكَ` bo'lishi dominant. `اَمْرَكَ` (3 heca) emas — juft buzilmaydi.

### Harakat shakllari — vizual xaritasi

Mayda xatolar oldini olish uchun, rasmda harakat qidirayotganda quyidagi
shakllarga diqqat bering:

```
ــَ  fatha   — harf USTIDA qiyaroq chiziq (tilted /)
ــِ  kasra   — harf OSTIDA qiyaroq chiziq (tilted \)
ــُ  damma   — harf USTIDA kichik "9" yoki "و" shakli
ــْ  sukun   — harf USTIDA kichik doira/halqa (°)
ــّ  tashdid — harf USTIDA kichik "w" shakli
ــً ــٍ ــٌ  tanvin — ikki fatha/kasra/damma (qo'sh chiziq)
```

**Damma vs sukun** — eng ko'p aralashtiriladi: damma "9" shaklida ko'rinadi
(oyoqli), sukun ideal doira. Rasm past sifatli bo'lsa, **ikkisini ham kuzating**
va audio bilan tasdiqlang.

### Har arab so'z uchun MAJBURIY qadam

1. **Harf-harf parse qilish** — so'zni "tanimang":
   - Har harfni alohida aniqla: bu alif/mim/ra/ta/...?
   - Har harakat shaklini aniqla: yuqorida chiziq (fatha)? curly (damma)?
     pastida chiziq (kasra)? kichik doira (sukun)?
2. **Qo'sh-ishonch texti** — strukturani yozing:
   `alif+fatha → mim+fatha → ra+sukun → ta+kasra` → `اَمَرْتِ` → "amarti"
3. **Harf sonini sanash** — rasm 4 harf ko'rsatyaptimi 3 mi? Ikki bir xil harf
   ketma-ket (`ر ر`, `م م`) borligini aniqlash
4. **Tanish so'z shkali** — agar so'z tanish tuyulsa → qora ro'yxatda bo'lsa
   **darhol ogohlantir** va qo'shimcha tekshiruv qil
5. **Juft fe'lni izlash** — agar past fe'l (3-f `اَمَرَتْ`) yonida — juft
   3-erkak shakli bo'lishini ko'z oldiga tuting
6. **Audio chunkni eshitish MAJBURIY** — har so'z yozilganidan so'ng:
   ```bash
   afplay muallimus-soniy/public/audio/edit/NN_topic/<chunk>.mp3
   ```
   Yozgan transliteratsiya audioga to'liq mos kelishi shart. Mos emasmi →
   qayta parse qil.
7. **Shubhada bo'lsa** — taxmin qilmay, foydalanuvchidan aniqlash so'rang

### Shubha signal'lari

- Harakat "xayolan to'g'ri" ko'rinadigan joylar
- PDF va rasm matnlari turlicha
- Rasm skan sifatsiz, harakat noaniq
- Qo'shimchalar (`-ayni`, `-um`, `-nā`, `-ti`, `-tu`) — eng ko'p xato joylar
- 2 ta bir xil harf ketma-ket (`ررْ`, `ممْ`, `نن`) — birini tushirish oson
- Oxirgi harfda sukun ko'ringan — **damma bo'lishi mumkin** (p6 da `رَيْبُ` xato)
- Mashhur so'z / Qur'on iborasi tanildi — avtomatik shubha

---

### Qadamlar

1. **PDF qo'llanmani o'qish** — boshlangich vaqt va matnlar uchun.
2. **Sukunat aniqlash** asl audioda:
   ```bash
   ./tools/ffmpeg -i <audio.mp3> -af "silencedetect=noise=-40dB:duration=0.10" -f null -
   ```
   Bu sound boundary'larni beradi.
3. **Energy profile tekshirish** (qisqa harflar uchun) — 25-50 ms oynalarda
   `volumedetect` bilan vowel peak'lar qaerda ekanini topish.
4. **Cut skript yozish** (`tools/cut_<topic>.sh`):
   - PDF asoslangan harflar uchun: PDF vaqtidan **-50 ms / +100 ms** buffer
     (vowel attack + fricative tail uchun).
   - Maxsus harflar uchun (PDF xato): silence-detected boundary'lar.
   - Re-encode `libmp3lame -b:a 192k` (sample-accurate).
5. **Skript ishga tushirish** — chunklar `Materiallar/<bob>/edit_audios/<NN_topic>/` ga.
6. **`public/audio/edit/<NN_topic>/` ga ko'chirish** — app shu joydan oladi.
7. **`elements.ts` da har elementga chunk URL biriktirish** —
   `audioUrl: A.e("eXX_name")`, `start: 0`, `end: chunk_duration`.
8. **MAJBURIY: foydalanuvchi bilan eshitib tekshirish** — har element bosib
   to'g'ri talaffuz chiqayotganini tasdiqlash. `afplay <chunk.mp3>` skript
   ichida ham qo'shilishi mumkin.
9. **`Materiallar/<bob>/<topic>.md` yozish** — yakuniy tasdiqlangan vaqtlar
   jadvali (PDF emas, **haqiqiy** vaqtlar). Metodologiya bo'limi ham yozing —
   keyingi safar qaytarish uchun.

### Chunk fayli vs. timing

Joriy arxitektura: **chunked files**. Har element o'z mp3 fayli bilan,
`start: 0`, `end: file_duration`. Bu:
- Backup-friendly (har chunk alohida tekshiriladi)
- Network o'rniga local audio playback yoqimliroq
- Asl audio `public/audio/<NN>.mp3` da saqlanadi (audio control bar uchun
  va backup sifatida).

### Asl audio = saqlanadi

**Asl `public/audio/NN.mp3` fayli HECH QACHON o'chirilmaydi.** Bu:
- Backup — chunk xato bo'lsa qayta cut qilish manbai
- "Play full" tugmasi shuni ishlatadi (audio control bar)
- Master nusxa Materiallar/<bob>/audiosi/ da ham saqlanadi

## Element turlari

- `harf` — alohida harf
- `bogin` — bo'g'in
- `soz` — so'z
- `jumla` — jumla / oyat

## Pozitsion shakllar — ⚠️ MAJBURIY, xato takror bo'lgan joy

Arab harflarining ikki toifasi bor:
- **Connector harflar**: `ب ت ث ج ح خ س ش ص ض ط ظ ع غ ف ق ك ل م ن ه ي` — so'z
  boshi/o'rtasi/oxirida shakli **o'zgaradi**. Harf amaliyoti sahifalarida
  3 ta harakat qatori **majburiy** pozitsion shakllar bilan:
  - Fatha — `X` (boshida) → `مَ`, `تَ`, `نَ`, `يَ`, `بَ`, ...
  - Kasra — `ـXِـ` (o'rtasida) → `ـمِـ`, `ـتِـ`, `ـنِـ`, `ـيِـ`, `ـبِـ`, ...
  - Damma — `ـXُ` (oxirida) → `ـمُ`, `ـتُ`, `ـنُ`, `ـيُ`, `ـبُ`, ...
- **Non-connector harflar**: `ا د ذ ر ز و` — faqat o'ng tomondan bog'lanadi,
  shakli o'zgarmaydi. Alohida shakllar ishlatiladi.

### ⚠️ Xato pattern (p5 da qayta takrorlandi)

Sessiyalarda men (Claude) p4 da mim/ta uchun pozitsion shakl yozdim (to'g'ri),
lekin **p5 da nun/ya uchun isolated shakl yozdim** (xato — foydalanuvchi aytgan).
Bu — bir xil qoida, lekin har yangi harfga qayta qo'llanilmagan.

**Qoida**: Har YANGI harf amaliyoti sahifasi qurilganda, `connector` bo'lsa
— pozitsion shakllar AVTOMATIK ravishda ishlatiladi, tekshirishni ertasiga
qoldirmang.

### Qachon ko'rsatiladi

- **Alifbo harakatlar bo'limi** (sahifa 3, `رَ رِ رُ` section): **harakatlar**
  o'rgatiladi, pozitsion shakllar aralashtirilmaydi. Kitob tartibiga mos.
- **Harf amaliyoti sahifalari** (sahifa 4+): connector harflar **har doim**
  `alohida / ـo'rtasidaـ / ـoxirida` — isolated shakllar aralashtirilmaydi.
  Uzbek label'da: `"Ma (boshida)"`, `"Mi (oʻrtasida)"`, `"Mu (oxirida)"`.
- **Non-connector harflar** (Za, Ra, Dal, Zal, Vav, Alif) — pozitsion shakllar
  alohida ko'rsatilmaydi (shakli o'zgarmagani uchun).

### Tekshirish qoidasi

Yangi harf sahifasini qurayotganda:
1. Kitob rasmidagi harakatlar qatoriga qarang.
2. Ikkinchi va uchinchi harf shakllarida **bog'lovchi chiziq** (ـ) bormi?
   - **Bor** → connector harf, pozitsion shakllar ishlatish kerak
   - **Yo'q** → non-connector, oddiy harakatlar

### Uslub

- `element.arabic` da pozitsion bog'lovchilar yoziladi: `ـمِـ`, `ـتُ` va h.k.
- `element.uzbek` label'ida pozitsiya ko'rsatiladi: `"Mi (oʻrtasida)"`, `"Tu (oxirida)"`.
- Pozitsion shaklni **faqat kitob ko'rsatgan joyda** ishlating — yangi o'rinda
  aralashtirmang.

---

# UI Arxitekturasi

> Bu bo'lim — foydalanuvchi tasdiqlagan UI qarorlari ro'yxati. Yangi sahifa yoki
> komponent qo'shganda, **shu yerdagi qoidalarga amal qilinadi**. O'zgarish
> kiritish kerak bo'lsa — avval bu yerda yozilgan qarorni yangilang.

## Bosh sahifa (`/home`)

Maqsad: **bitta yirik kitobga** kirish nuqtasi. Boblar grid'i yo'q (mundarija
`/darslar` va lesson sahifasidagi TOC drawer'da bor).

Tarkibi:
- **Salomlashish** (`GreetingHeader`) — vaqtga qarab ("Xayrli tong/kun/kech") va
  app sub-title.
- **Yagona kitob hero kartasi** (`BookHeroCard`) — markazda, kitobdek hissiyot
  beradigan element:
  - Logo / muqova rasmi (hozircha `/logo.png` — Muslim.uz)
  - "Muallimi Soniy" — sarlavha (extrabold, 22px)
  - "Ahmad Hodiy Maqsudiy" — muallif (sub, muted)
  - **Progress bar** + "Sahifa X / Y" — kitob bo'ylab umumiy joylashuv
  - **Katta gradient tugma**: `Boshlash` (progress yo'q) yoki `Davom eting`
    (progress mavjud) + Play ikonkasi
  - Kartani bosish — to'g'ridan-to'g'ri mos darsga olib boradi.

## Lesson sahifasi (`/lesson/[chapterId]/[lessonId]`)

**Asosiy g'oya:** URL parametri — bu shunchaki **kirish nuqtasi**. Foydalanuvchi
uchun bu **bitta yirik kitob** (54 sahifa) — barcha boblarning barcha darslari
ketma-ket sahifalardek ko'rinadi. Lesson chegaralari ko'rinmaydi —
foydalanuvchi swipe / scroll qilib davom etishi mumkin.

### Sahifa tuzilishi (kitobdagiga mos)

| Global # | Mazmun | Renderer | Image | Audio |
|----------|--------|----------|-------|-------|
| 1  | Muqova | Page0 | - | `01. muqova.mp3` |
| 2  | Muqaddima (p1 + p2 birlashgan) | Page1 | - | `02. Muqaddima.mp3` |
| 3  | Alifbo + harakatlar + Ra | Page3 | 3.jpg | `03. alifbo.mp3`, `04. harakat.mp3`, `05. ro.mp3` |
| 4  | Takrorlash: Za / Mim / Ta | Page4 | 4.jpg | `06. za.mp3`, `07. ma.mp3`, `08. ta.mp3` |
| 5  | Harflar (1-qism) — Ro davom so'zlari, Nun, Ya | Page5 | 5.jpg | `08. ta.mp3` (20.4s+ Ro davom), `09. na.mp3` (Nun), `10. ya.mp3` (Ya) |
| 6+ | Qo'shimcha harflar va so'zlar | Page6+ | 6-16.jpg | `09`–`31` audio fayllari |
| 17-21 | Madlar | — | 17-21.jpg | `32. madli 01.mp3`, `33. madli davomi...` |
| 22-23 | Tashdid | — | 22-23.jpg | `34. tashdid.mp3` |
| 24-25 | Tanvin | — | 24-25.jpg | `35. tanvin.mp3`, `36. tanvinli tashdid.mp3` |
| ... | Qolgan boblar | ... | ... | ... |
| 54 | Duolar (oxirgi) | Page50 | 50.jpg | ? |

**Muhim eslatmalar**:
- Muqaddima kitobda 2 sahifa bo'lgan, lekin uzluksiz matn — birlashtirilgan.
- Sahifa 4 kitob sahifa 4 bilan aynan mos. Za (non-connector) / Mim (connector,
  pozitsion) / Ta (connector, pozitsion).
- Audio fayllari `public/audio/NN. <topic>.mp3` formatda, chunklar
  `public/audio/edit/NN_topic/` papkada.
- **Sahifa 5 tugallangan**: Ro davom (9 so'z, t09-t17 chunks), Nun
  (20 element, 09_na/), Ya (18 element, 10_ya/). Muhim topilma —
  Ro davom so'zlari `08. ta.mp3` ning 20.4s+ qismida edi, alohida audio
  fayli yo'q.
- **Sahifa 6 tugallangan**: Ba (18 element, 11_ba/: 3 header + 15 so'z),
  Kaf (21 element, 12_ka/: 3 header + 18 so'z). Jami 39 element.
  Header'lar pozitsion shakllarda: `بَ / ـبِـ / ـبُ` va `كَ / ـكِـ / ـكُ`.
- **Sahifa 7 tugallangan**: Lam (26 element, 13_la/: 3 header + 23 so'z),
  Vav (23 element, 14_va/: 3 header + 20 so'z). Jami 49 element.
  Lam (connector) header'lari pozitsion: `لَ / ـلِـ / ـلُ`.
  Vav (non-connector) header'lari isolated: `وَ / وِ / وُ`.
  Row 3 Lam'da 6 akala fe'li shakli: akalta / akalna / akalat / akalti / akaltu / akaltum.
- **Sahifa 8 tugallangan**: Ha ه (21 element, 15_ha/: 3 header + 7+6+5 so'z),
  Fa ف (25 element, 16_fa/: 3 header + 6+6+6+4 so'z). Jami 46 element.
  Ikkalasi connector — header'lar pozitsion: `هَ / ـهِـ / ـهُ`, `فَ / ـفِـ / ـفُ`.
  Row 4 Fa'da past/present juft fe'llar: iftatana/yaftatinu, iftakara/yaftakiru.
- Keyingi ishlaydigan sahifa: **9** (Qof + Shin) — audio: `17. qo.mp3`,
  `18. sha.mp3`.

### Tarkibiy ma'lumot

- `getAllBookPages()` — barcha 54 sahifani **global tartibda** qaytaradi:
  bobdan-bobga, darsdan-darsga, sahifa-sahifa.
- Har bir sahifaga `chapter`, `lesson`, `globalIndex`, `lessonPageIndex`
  metadata biriktirilgan.
- Lesson sahifasi state: yagona `currentPageIndex` (0..53) — qolgan barcha
  ma'lumot (bob, dars, audio) shu indekstdan derive qilinadi.

### Tuzilma (yuqoridan pastga)

1. **Header** (`pt-6 pb-3`, **`border-b border-white/10`** — aniq pastki chiziq) —
   joriy sahifaga qarab dinamik:
   - Chap: orqaga tugma (`ArrowLeft`, 40×40)
   - O'rtada: **joriy** dars `lesson.title` + bob `chapter.title` (joriy
     sahifaning lesson/chapter'idan olinadi)
   - O'ngda: mundarija tugmasi (`ListOrdered`, 40×40)
2. **Sahifa ko'rinishi** (`HorizontalPager` + `PageView`):
   - Embla Carousel — barcha 54 sahifa bir ketma-ketlikda
   - **Adaptiv edge fade** (`maskImage`) — **ikkala tomonda alohida** scroll
     holatiga qarab ishlaydi:
     - **Tepa fade**: faqat `scrollTop > 4` bo'lganda (yuqorida content yashirin
       bo'lsa). Aks holda content header chizig'iga toza tegadi.
     - **Pastki fade**: faqat content sahifa tagiga sig'masa (`scrollTop +
       clientHeight < scrollHeight - 4`). Qisqa sahifalarda (masalan, Madlar)
       pastki fade yo'q — content kartasi to'liq, toza ko'rinadi.
     - `ResizeObserver` orqali sahifa o'zgarganda yoki window resize bo'lganda
       qayta hisoblanadi.
   - Konfig: `align: "center"`, `duration: 28`, `containScroll: "trimSnaps"`
3. **Sahifa indikatori** (`PageIndicator`) — butun kitob bo'yicha:
   - Chap: `<` (chevron, disabled at 0)
   - O'rtada: **progress bar** (yashil to'ldiriluvchi chiziq + drag handle)
     — bosib yoki sudrab istalgan sahifaga o'tish mumkin
   - O'ng: `>` (chevron, disabled at end)
   - Pastida: "X / 54" (kichik, muted)
4. **Audio nazorati** (`AudioControls`) — joriy sahifaning **lesson** ga
   tegishli audiodan foydalanadi:
   - Play/pause katta yumaloq tugma
   - Tezlik: 0.5x / 1x / 1.5x
   - Loop / sequential rejim toggle

### Sahifa o'tishi va URL sinxronizatsiyasi

- Lesson chegarasidan o'tilganda — `router.replace()` orqali URL yangilanadi
  (history clutter qilmaslik uchun `replace`, `push` emas).
- Audio source ham yangi lessonniki bo'ladi (`audio.loadAudio` qayta chaqiriladi).
- Progress (lastChapterId, lastLessonId, lessonPageIndex) avtomatik saqlanadi.

### Sahifani almashtirish usullari

- **Swipe** (chap/o'ng) — Embla
- **Chevron tugmalar** — PageIndicator chap/o'ngida
- **Progress bar** — bosish yoki sudrash bilan istalgan sahifaga
- **Klaviatura**: `←` / `→` (TOC ochiq bo'lsa — ishlamaydi)
- **TOC drawer** — istalgan dars/sahifaga sakrash

Sahifa o'zgarganda: audio to'xtaydi, faol element tozalanadi, progress saqlanadi.

## Mundarija drawer (`TocSheet`)

- **Trigger**: lesson header'dagi o'ng tomondagi tugma.
- **Pozitsiya**: o'ngdan slide-in (full height, max-w-md).
- **Backdrop**: yarim shaffof qora + blur, bosilganda yopiladi.
- **Yopish usullari**: backdrop, X tugma, `Esc` klavishi.
- **Tuzilma — to'liq mundarija**: barcha boblar **doim ochiq**, accordion yo'q.
  Har bob:
  - Sarlavha: ikonka + nomi (uppercase, kichik). Joriy bob — `primary` rangda.
  - Darslar ro'yxati: har dars boshida ikonka (`BookOpen` / `CheckCircle` —
    tugatilgan bo'lsa), nomi, sahifa soni, audio bor bo'lsa `Volume2` belgi.
  - Joriy dars `primary/15` fonda + `primary` rangda matn.
  - Har dars ostida — **sahifa chiplari** (`1, 2, 3, ...`):
    - 32×32 yumaloq kvadrat tugmalar
    - Joriy sahifa — `bg-primary` to'liq, oq matn
    - Boshqalar — `bg-white/5`, hover'da `primary/20`
    - Bosilganda `?page=N` query param bilan navigatsiya qiladi.
- **Lesson sahifasi** `?page=N` query param'ni o'qib, mos sahifadan boshlaydi.

## Vizual tamoyillar

- **Glass effekti**: `glass` (neytral) va `glass-green` (vurg'u uchun) classlari.
- **Asosiy rang**: `--color-primary` (yashil, dark/light theme uchun farqli).
- **Ikonkalar**: faqat `lucide-react`.
- **Yumshoqlik**: o'tishlar `transition-*` class'lari, `active:scale-[0.95-0.98]`
  feedback uchun.
- **Tugma o'lchamlari**: minimal touch target — 36×36 (kichik), 40×40 (asosiy).
- **Border-radius**: kartalar `rounded-[28px]`, tugmalar `rounded-2xl` yoki
  `rounded-xl`.

## Mas'uliyat / o'zgartirish qoidalari

- Bu hujjatdagi UI qarorlarini **foydalanuvchi tasdiqlagan**. O'zboshimcha
  o'zgartirmang.
- Yangi sahifa qo'shganda — yuqoridagi tamoyillarga (header, navigatsiya,
  rang) amal qiling.
- Foydalanuvchi yangi UI qarori bersa — shu yerga **darhol** yozib qo'ying,
  toki keyingi suhbatda u esda qolsin.
