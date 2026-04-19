@AGENTS.md

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

- Bizda **har bir darsda bitta to'liq audio fayl** mavjud (`public/audio/*.mp3`).
- Bu audioni **harf / bo'g'in / so'z / jumla** kesimida bo'laklarga ajratamiz
  (boshlanish va tugash vaqti — `start`, `end`).
- Har bir bo'lakni sahifadagi mos elementga (matn ustidagi koordinata) biriktiramiz
  (`src/lib/data/elements.ts`).
- Foydalanuvchi harf/so'z/jumla ustiga bosganda — audio aynan o'sha segmentdan
  ijro etiladi.

## Ma'lumot olish (data API)

Element ikki darajada chaqirilishi kerak:

1. **Element darajasida** — bitta harf/so'z/jumla alohida ijro etiladi.
2. **Sahifa darajasida** — masalan 4-sahifa chaqirilsa, undagi **barcha
   elementlar va audio segmentlari birga** keladi (ketma-ket ijro yoki tanlab
   ijro uchun).

## Har bir sahifa ustida ish tartibi

1. Darsning audio faylini **eshitib chiqish**.
2. Har bir harf/bo'g'in/so'z/jumla uchun audiodagi **start–end vaqtini** belgilash.
3. Sahifa rasmidagi har bir elementning **koordinatasini** (x, y, w, h) belgilash.
4. Audio segmentni mos elementga biriktirish (`elements.ts`).
5. **Tekshirish:** har element ustiga bosib, to'g'ri talaffuz chiqayotganini
   eshitib qo'yish. Bu qadam o'tkazib yuborilmaydi.

## Element turlari

- `harf` — alohida harf
- `bogin` — bo'g'in
- `soz` — so'z
- `jumla` — jumla / oyat
