# Muallimi Soniy

Ahmad Hodiy Maqsudiyning **"Muallimi Soniy"** (1892) klassik darsligining ochiq kodli,
audio bilan integratsiya qilingan interaktiv versiyasi. Maqsad — arab alifbosi,
Qur'on tilovati va tajvidni har bir harf **to'g'ri mahrajdan** o'qilgan audio bilan o'rgatish.

- 🌐 **Web (PWA)**: [muallimisoniy.uz](https://muallimisoniy.uz) — to'liq offline ishlaydi
- 📱 **iOS (Swift)**: ishlab chiqilmoqda — [`iso prmt/`](../iso%20prmt/) fazalar
- 🤖 **Android (Kotlin)**: ishlab chiqilmoqda — [`android prmt/`](../android%20prmt/) fazalar

Loyiha ochiq kodli: kim shu kabi ta'lim loyihasi qurmoqchi bo'lsa, biz qiynalganday
qiynalmasin — kod va hujjatlar toza, tushunarli, takrorlanadigan bo'lishi shart.

---

## 🏛 Arxitektura: bitta manba — uch qism — barcha platformalar

Hamma platforma **bitta kontentni** ko'rsatadi. Kontent shu repoda (web manbasida)
yashaydi va **3 qismli paket** ko'rinishida git orqali tarqatiladi:

```
                    YAGONA HAQIQAT MANBAI (shu repo)
        src/lib/data/{elements,mock-data,types,muqaddima,legal-content}.ts
              src/lib/i18n/messages/*.json   src/app/globals.css
                  public/audio/ (mp3)   public/fonts/ (ttf/otf)
                                  │
                       npm run content   (tools/build-content.mjs)
                                  ▼
   ┌──────────────────── public/content/ ─ KONTENT PAKETI ───────────────────┐
   │  manifest.json                 ← master: versiya, har fayl sha256+bytes │
   │  1) sahifalar/book.json        ← boblar, darslar, sahifalar, 1885 element│
   │  2) audiolar/audio-manifest.json ← 13 pack, 1757 fayl, ~127 MB, sha256  │
   │  3) sozlamalar/{i18n,legal,settings}.json ← 4 til, defaults, tema, shrift│
   └──────────────────────────────────────────────────────────────────────────┘
                                  │  git push → GitHub
                                  ▼
        https://raw.githubusercontent.com/IsmoilovHabibulloh/muallimi_soniy/main/public/
                                  │
        ┌────────────────────────┼────────────────────────┐
        ▼                        ▼                        ▼
   🌐 Web (PWA)             📱 iOS (Swift)           🤖 Android (Kotlin)
   build vaqtida bundle     birinchi ochilishda      birinchi ochilishda
   + SW fonda keshlaydi     gitdan yuklab oladi      gitdan yuklab oladi
```

**Asosiy tamoyil**: audio/shrift binarylar **bir joyda** turadi (`public/audio/`,
`public/fonts/`) — paket JSON'lari ularga **nisbiy yo'l + bytes + sha256** bilan
ishora qiladi. Hech narsa ikki nusxada saqlanmaydi. Mobil foydalanuvchilar **serverga
emas, GitHub'ga** murojaat qiladi — GitHub raw rate-limit har foydalanuvchining o'z
IP'siga hisoblanadi, shuning uchun minglab foydalanuvchi ham muammosiz yuklab oladi.

---

## 📦 Kontent paketi — 3 qism

### 1-qism: `sahifalar/book.json` (~380 KB, minified)

Kitobning to'liq strukturasi. **Sxema barcha platformalarda bir xil** (Swift `Codable`,
Kotlin `@Serializable`, TS interfeyslari — `src/lib/data/types.ts`):

```jsonc
{
  "chapters": [ { "id": "ch_muqaddima", "title": {4 til}, "order": 1, "icon": "📖", "lessonCount": 2 } ],   // 10 bob
  "lessons":  { "ch_muqaddima": [ { "id": "ls_muqova", "chapterId": "...", "title": {4 til},
                "order": 1, "audioUrl": "audio/01. muqova.mp3", "pageCount": 1 } ] },                        // 13 dars
  "pageMap":  { "ls_muqova": [0], "ls_alifbo": [3,4], "...": [] },            // dars → sahifa raqamlari
  "pages":    { "0": [Element], "1": [Element], "3": [Element], "...": [] },  // 1885 element
  "extras":   { "muqaddimaParagraphs": ["...", "..."] }                       // 9 paragraf prose
}
```

```ts
Element = {
  id: string;          // "p{sahifa}_{lokal}" — masalan "p3_02"
  type: "harf" | "bogin" | "soz" | "jumla";
  arabic: string;      // arab matni
  uzbek: string;       // o'zbekcha izoh/transliteratsiya
  audioUrl?: string;   // nisbiy chunk yo'li (50 ta elementda YO'Q)
  start: number; end: number;  // soniya (chunk fayllar: start=0, end=davomiylik)
  x, y, width, height: number; // ⚠️ ESKI overlay koordinatalar — LAYOUTDA ISHLATILMAYDI
}
```

**Sahifa raqamlash semantikasi (yodlab oling):**
- `pages` da **50 ta kalit**: `"0"`, `"1"`, `"3"`...`"50"` — **`"2"` YO'Q** (muqaddima 1-sahifaga birlashtirilgan).
- `pageMap` **52 ta o'qish sahifasi** beradi — 25- va 30-sahifalar **ikki darsga tegishli** (takror). Reader "Sahifa X / 52" ko'rsatadi.
- `lesson.pageCount` denormalizatsiya — mundarija uchun **faqat `pageMap`** haqiqat manbai.

### 2-qism: `audiolar/audio-manifest.json` (~256 KB)

Har dars uchun bitta **pack** — to'liq dars mp3 + shu dars sahifalaridagi barcha
element chunk'lari. Har faylda yaxlitlik ma'lumoti:

```jsonc
{
  "packs": [
    {
      "id": "ls_alifbo", "lessonId": "ls_alifbo", "chapterId": "ch_harflar",
      "order": 3, "title": {4 til},
      "files": [ { "path": "audio/03. alifbo.mp3", "bytes": 3068238, "sha256": "..." },
                 { "path": "audio/edit/03_alifbo/e02_ba.mp3", "bytes": 16971, "sha256": "..." } ],
      "fileCount": 83, "sizeBytes": 5447910
    }
  ],  // 13 pack
  "totals": { "uniqueFiles": 1757, "uniqueBytes": 127100000 }
}
```

- Faqat ilova **haqiqatda ishlatadigan** fayllar (backup/manba audiolar kirmaydi).
- 25/30-sahifa chunk'lari ikki packda takrorlanadi — yuklovchi "fayl bor — o'tkazib yubor"
  qilsa, jami trafik `totals.uniqueBytes` bo'ladi.
- `sha256` — yaxlitlik tekshiruvi: buzuq yuklangan faylni aniqlash uchun.

### 3-qism: `sozlamalar/` — i18n, huquqiy matnlar, ilova konfiguratsiyasi

| Fayl | Tarkibi |
|------|---------|
| `i18n.json` | 4 til (`uz-latn`, `uz-cyrl`, `ru`, `en`) × 68 UI kaliti — barcha platformada bir xil matnlar |
| `legal.json` | Maxfiylik siyosati, foydalanish shartlari, ilova haqida (4 til) |
| `settings.json` | Quyida 👇 |

`settings.json` — platformalar **aynan takrorlashi shart** bo'lgan xulq qoidalari:

```jsonc
{
  "defaults":   { "repeatCount": 1, "speed": 1, "locale": "uz-latn", "theme": "light", "fontSize": "medium", ... },
  "constraints":{ "repeatCount": {"min":1,"max":10}, "fontScales": {"small":0.875,"medium":1,"large":1.125}, ... },
  "behaviors":  {
    "repeatCountResetsOnLaunch": true,   // har ishga tushishda 1× ga qaytadi
    "speedLockedTo1x": true,             // tezlik UI olib tashlangan
    "themeFallback": "light",            // sozlama buzilsa DOIM light
    "storageKeys": { "settings": "muallimi-settings", "progress": "muallimi-progress", "welcomeSeen": "muallimi-welcome-seen" }
  },
  "theme":    { "light": {CSS tokenlar}, "dark": {...}, "metaThemeColor": {...} },  // globals.css dan avtomatik
  "elements": { "colors": { "harf": "#a78bfa", ... }, "labels": {4 tilda} },
  "fonts":    { "files": [5 shrift: path+family+role+bytes+sha256], "stacks": {...} }
}
```

**Shriftlar pedagogik jihatdan muhim**: `NotoNaskhArabic-MuallimiSoniy.ttf` — maxsus
build (shadda+kasra ligaturalari o'chirilgan, kasra harf **ostida** chiqadi). Barcha
platformalar shu 5 shriftni bundle qilishi yoki `fonts/` dan yuklab olishi shart.

### Master `manifest.json`

```jsonc
{
  "schemaVersion": 2,            // paket TUZILISHI o'zgarsa oshadi
  "contentVersion": "2.0.0",     // kontent o'zgarsa oshadi — platformalar SHUNI solishtiradi
  "generatedAt": "2026-06-10T...",
  "contentHash": "sha256...",    // barcha paket fayllari hash'idan yagona hash
  "parts": {
    "sahifalar":  { "files": [{path,bytes,sha256}], "counts": { "chapters":10, "lessons":13, "pageKeys":50, "bookPages":52, "elements":1885, "muqaddimaParagraphs":9 } },
    "audiolar":   { "files": [...], "totals": { "packs":13, "uniqueFiles":1757, "uniqueBytes":... } },
    "sozlamalar": { "files": [...], "fonts": [...] }
  }
}
```

---

## 🔄 Universal offline yuklab olish protokoli

**Barcha platformalar bir xil algoritm** ishlatadi (web'da allaqachon ishlaydi —
`src/lib/offline/downloader.ts` etalon implementatsiya):

```
BIRINCHI OCHILISH (bootstrap):
1. GET {BAZA}/content/manifest.json
2. Har qism JSON'larini yuklab ol (sha256 tekshir) → lokal saqla
3. contentVersion'ni lokal saqla → ilova TAYYOR (sahifalar to'liq ishlaydi)

AUDIO (fonda yoki dars-darajali):
4. audio-manifest.json packlarini ol
5. Har fayl uchun: lokalda bormi? → bor: O'TKAZIB YUBOR (resume shu!)
   yo'q: GET {BAZA}/{path} → vaqtinchalik faylga yoz → atomik ko'chir
6. Parallellik: 4-6 oqim. Xato: navbat oxiriga, sessiyada ~5 urinish,
   qolgani keyingi sessiyada.
7. Ledger yurit (qaysi fayl tayyor): web — IndexedDB, iOS — fayl mavjudligi,
   Android — fayl mavjudligi + DataStore

YANGILANISH (har onlayn ochilishda):
8. GET manifest.json → contentVersion ≠ lokal? → JSON qismlarni qayta yukla,
   audio'da faqat sha256 o'zgarganlarni qayta yukla. Jim, fonda.

QOIDALAR:
- 206/qisman javob HECH QACHON saqlanmaydi — faqat to'liq 200
- Audio ijro paytida yuklash PAUZA qilinadi (bandwidth talashmaslik)
- Internet uzilsa kutadi, qaytsa davom etadi
- ZIP YO'Q — fayllar bitta-bitta (resume oson, xato lokallashadi)
- To'liq mp3 nomlarida BO'SHLIQ bor ("audio/05. ro.mp3") — URL'da %20 encode qiling
```

URL qurish:

```
BAZA = https://raw.githubusercontent.com/IsmoilovHabibulloh/muallimi_soniy/main/public/
manifest:  {BAZA}content/manifest.json
kitob:     {BAZA}content/sahifalar/book.json
audio:     {BAZA}audio/edit/03_alifbo/e02_ba.mp3      ← book.json'dagi nisbiy yo'l
shrift:    {BAZA}fonts/NotoNaskhArabic-MuallimiSoniy.ttf
```

---

## 🖥 Platforma ko'rsatmalari (1:1 klon qoidalari)

### Web — TAYYOR (etalon implementatsiya)

| Nima | Qayerda |
|------|---------|
| Data (bundle ichida, paket bilan bir manba) | `src/lib/data/*.ts` |
| Offline SW + kesh (Serwist) | `src/app/sw.ts`, `src/app/serwist/[path]/route.ts` |
| Fon yuklovchi (protokol etaloni) | `src/lib/offline/downloader.ts` |
| Sahifa renderlari (52 sahifa, qo'lda) | `src/components/lesson/RenderedPage.tsx` |
| Audio dvigatel (segment/repeat/loop) | `src/lib/audio/AudioEngine.ts` |

### iOS (Swift) — to'liq fazalar: [`iso prmt/`](../iso%20prmt/)

1. **Modellar**: `book.json` sxemasidan `Codable` strukturalar (tayyor — `iso prmt/01`).
   `LocalizedString` uchun `CodingKeys`: `"uz-latn"` → `uzLatn`.
2. **ContentManager**: yuqoridagi bootstrap protokoli; saqlash —
   `Application Support/MuallimiSoniy/{content,audio}/` + `isExcludedFromBackup = true`.
3. **AudioDownloadManager**: pack'lar bo'yicha, `withTaskGroup` + semafora(5),
   progress "X / Y fayl", resume = fayl mavjudligi (`iso prmt/04`).
4. **Sahifa renderlari**: `RenderedPage.tsx` dagi 50 ta `PageN` funksiyani SwiftUI'ga
   qo'lda ko'chirish (`iso prmt/07`; 52 o'qish sahifasini beradi — 25/30 ikki darsda).
   **Koordinatalardan foydalanmang** — RTL qatorlar,
   fluid clamp o'lchamlar. Elementlar `id` orqali topiladi: `els.first { $0.id == "p3_02" }`.
5. **Ekranlar**: Splash/Welcome/Tabs — web bilan piksel darajada 1:1 (`iso prmt/05b`).

### Android (Kotlin) — to'liq fazalar: [`android prmt/`](../android%20prmt/)

iOS bilan **bir xil JSON, bir xil protokol, bir xil dizayn** — faqat texnologiya boshqa:
`@Serializable` modellar (`@SerialName("uz-latn")`), OkHttp + korutinlar
(`Semaphore(5)`), saqlash `filesDir/content/` + `getExternalFilesDir()/audio/`,
DataStore (`muallimi_settings`), Compose'da 50 sahifa renderi, ExoPlayer + MediaSession.

### Umumiy temir qoidalar (har platformada)

1. **Audio-matn bog'lanishi muqaddas** — `audioUrl/start/end` qo'lda tekshirilgan
   haqiqat. Hech qachon avtomatik generatsiya qilmang, taxmin qilmang.
2. **Layout JSON'da EMAS** — sahifa ko'rinishi qo'lda yoziladi (web JSX → SwiftUI →
   Compose), JSON faqat element ma'lumotini beradi. `x/y/width/height` — o'lik maydonlar.
3. **Aktiv element boshqalarni xiralashtirmaydi** (opacity doim 1).
4. **"Bitta katta kitob"** — dars chegaralari ko'rinmas, 52 sahifa uzluksiz varaqlanadi.
5. **Custom shrift majburiy** — `Noto Naskh Arabic Muallimi` butun kitob bo'ylab;
   mad sahifalarda (17–21) alohida stack (`settings.json → fonts.stacks`).
6. **Sozlamalar xulqi** `settings.json → behaviors` dan: repeat har ochilishda 1×,
   tezlik 1.0 qulflangan, tema buzilsa light.

---

## 🛠 Kontent yangilash (maintainer workflow)

```bash
# 1. Manbani o'zgartiring (elements.ts, mock-data.ts, i18n, audio fayllar...)
# 2. tools/build-content.mjs ichida CONTENT_VERSION ni oshiring (masalan 2.0.0 → 2.1.0)
npm run content          # paketni qayta quradi (sha256 hammasi yangilanadi)
npm run content:verify   # paritet + yaxlitlik tekshiruvi (CI uchun ham qulay)
npx next build           # web ham shu manbadan quriladi
# 3. Hammasini BITTA commit bilan push qiling — platformalar keyingi ochilishda
#    contentVersion farqini ko'rib jim yangilanadi.
```

`content:verify` nimalarni tekshiradi: manifest sha256'lari diskka mos; audio to'plami
webning fon yuklovchi ro'yxati bilan **1:1**; har audio fayl diskda bor; i18n 4 tilda
kalitlar bir xil; shriftlar joyida.

---

## 🚀 Web'ni lokal ishga tushirish

```bash
npm ci
npm run dev          # http://localhost:3000
# PWA/offline testlari faqat production buildda:
npm run build && npm run start
```

Deploy: [DEPLOYMENT.md](DEPLOYMENT.md). Loyiha qoidalari va nozik joylar: [CLAUDE.md](CLAUDE.md).

## 🙏 Attribusiya

- Muallif: **Ahmad Hodiy Maqsudiy** (1868–1941), "Muallimi Soniy", 1892
- Qiroat: qori **Jahongir Ne'matov** — har harf to'g'ri mahrajdan
- O'zbekiston musulmonlari idorasi Din ishlari qo'mitasi ruxsati №3438
- Dasturlash: **VIPADS LLC** — support@vipads.uz
