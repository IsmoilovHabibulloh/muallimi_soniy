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

**Qoida**: Rasm → vizual reja. Audio → haqiqiy matn. Ikkisi ziddiyatga tushsa — foydalanuvchidan so'rang.

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
- **Connector harflar** (ب, ت, ث, ج, ح, م, etc.) — so'z boshi/o'rtasi/oxirida
  shakli o'zgaradi. Boshida alohida (`مَ`), o'rtasida bog'langan (`ـمِـ`),
  oxirida bog'langan (`ـمُ`).
- **Non-connector harflar** (ا, د, ذ, ر, ز, و) — faqat o'ng tomondan bog'lanadi,
  shakli o'zgarmaydi.

### Qachon ko'rsatiladi

- **Alifbo harakatlar bo'limi** (sahifa 3, `رَ رِ رُ`): **harakatlar** o'rgatiladi,
  pozitsion shakllar aralashtirilmaydi. Kitob tartibiga mos.
- **Harf amaliyoti sahifalari** (sahifa 4+, har bir harf o'qitiladigan sahifa):
  **kitob ko'rsatgan shaklda** ishlatiladi. Odatda 3 ta harakat alohida, o'rtada
  va oxirida shakllar bilan ko'rsatiladi (masalan: `مَ / ـمِـ / ـمُ`, `تَ / ـتِـ / ـتُ`).
- **Non-connector harflar** (Za, Ra, Dal, Zal) — pozitsion shakllar alohida
  ko'rsatilmaydi (shakli o'zgarmagani uchun).

### Uslub

- `element.arabic` da pozitsion bog'lovchilar yoziladi: `ـمِـ`, `ـتُ`, `ـرِ` va h.k.
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

| Global # | Mazmun | Renderer | Image |
|----------|--------|----------|-------|
| 1 | Muqova | Page0 | - |
| 2 | Muqaddima (p1 + p2 birlashgan) | Page1 | - |
| 3 | Alifbo + harakatlar + Ra | Page3 | 3.jpg |
| 4 | Takrorlash: Za / Mim / Ta | Page4 | 4.jpg |
| 5 | Harflar (1-qism) | Page5 | 5.jpg |
| ... | ... | ... | ... |
| 54 | Duolar (oxirgi) | Page50 | 50.jpg |

Muhim: Muqaddima kitobda 2 sahifa bo'lgan, lekin uzluksiz matn —
birlashtirilgan. Sahifa 4 kitob sahifa 4 bilan aynan mos.

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
