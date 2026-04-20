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

### 5. Build xatoni oldindan ushlash

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

## Pozitsion shakllar

Arab harflarining ikki toifasi bor:
- **Connector harflar** (ب, ت, ث, ج, ح, م, ف, ق, ك, ل, ن, ه, ي, etc.) — so'z
  boshi/o'rtasi/oxirida shakli o'zgaradi. Boshida alohida (`مَ`), o'rtasida
  bog'langan (`ـمِـ`), oxirida bog'langan (`ـمُ`).
- **Non-connector harflar** (`ا د ذ ر ز و`) — faqat o'ng tomondan bog'lanadi,
  shakli o'zgarmaydi.

### Qachon ko'rsatiladi

- **Alifbo harakatlar bo'limi** (sahifa 3, `رَ رِ رُ` section): **harakatlar**
  o'rgatiladi, pozitsion shakllar aralashtirilmaydi. Kitob tartibiga mos.
- **Harf amaliyoti sahifalari** (sahifa 4+, har bir harf o'qitiladigan sahifa):
  **kitobdagi shakllarga mos** ishlatiladi. Ko'p hollarda 3 ta harakat
  alohida/o'rtada/oxirida shakllari bilan: `مَ / ـمِـ / ـمُ`, `تَ / ـتِـ / ـتُ`.
- **Non-connector harflar** (Za, Ra, Dal, Zal, Vav, Alif) — pozitsion shakllar
  alohida ko'rsatilmaydi (shakli o'zgarmagani uchun). Kitob ham shunday
  qiladi — Za/Ra harakatlari hammasi alohida shaklda.

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
| 5  | Harflar (1-qism) — Ro, Za, Ma so'zlari, Nun, Ya | Page5 | 5.jpg | ? (keyingi sessiyada aniqlanadi) |
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
- Keyingi ishlaydigan sahifa: **5** (Harflar 1-qism) — PDF'lari
  `05._ro_rus final.pdf` allaqachon saqlangan, lekin content 5-16 sahifalarga
  tegishli (keng Ro/Za/Ma/Nun/Ya/Ba/Kaf/Lom/Vav/Ha/Fa/Qof/Sha/Sa/So/To/Ja/Xo
  harflari).

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
