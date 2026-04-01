import type { Locale } from "./types";

interface LegalSection {
  privacyPolicy: string;
  termsOfUse: string;
  aboutApp: string;
}

export const LEGAL_CONTENT: Record<Locale, LegalSection> = {
  "uz-latn": {
    privacyPolicy: `MAXFIYLIK SIYOSATI

Kuchga kirgan: 2026-yil, 16-fevral

1. KIRISH

Ushbu Maxfiylik siyosati "MYSTAR" MChJ tomonidan ishlab chiqilgan "Muallimi Soniy" ilovasi foydalanuvchilarining shaxsiy ma'lumotlarini to'plash, saqlash, qayta ishlash va himoya qilish tartibini belgilaydi.

Ilovadan foydalanishni boshlash orqali Siz ushbu Maxfiylik siyosati shartlariga rozilik bildirasiz.

2. BIZ TO'PLAYDIGAN MA'LUMOTLAR

2.1. Ixtiyoriy ma'lumotlar
Ilova faqat "Fikr bildirish" bo'limi orqali quyidagi ma'lumotlarni qabul qiladi:

  • Ism — Murojaat egasini aniqlash
  • Telefon raqam — Aloqa o'rnatish
  • Fikr matni — Ilovani yaxshilash

Muhim: Ushbu ma'lumotlar faqat foydalanuvchi "Fikr bildirish" formasini ixtiyoriy ravishda to'ldirib, "Yuborish" tugmasini bosgan taqdirdagina to'planadi. Ilova avtomatik ravishda hech qanday shaxsiy ma'lumotni to'plamaydi.

2.2. Mahalliy saqlash
Ilova quyidagi texnik ma'lumotlarni faqat qurilmada mahalliy saqlaydi va serverga yubormaydi:
  • Tanlangan til sozlamasi
  • Tanlangan mavzu (kunduzgi/tungi rejim)
  • Oxirgi o'qilgan sahifa raqami

2.3. Biz to'plaMAYDIGAN ma'lumotlar
  • GPS joylashuv ma'lumotlari
  • Kontaktlar, suratlar yoki qurilmadagi fayllar
  • Qurilma identifikatorlari (IMEI, MAC)
  • Reklama identifikatorlari
  • Moliyaviy yoki to'lov ma'lumotlari
  • Biometrik va sog'liq ma'lumotlari

3. MA'LUMOTLARDAN FOYDALANISH

"Fikr bildirish" orqali olingan ma'lumotlar faqat quyidagi maqsadlarda ishlatiladi:
  • Foydalanuvchi murojaatlariga javob berish
  • Ilovadagi xatolarni tuzatish
  • Ilova sifatini oshirish

Ma'lumotlar marketing, reklama yoki profillash maqsadlarida ishlatilmaydi.

4. UCHINCHI SHAXSLARGA BERISH

Biz foydalanuvchilarning shaxsiy ma'lumotlarini uchinchi shaxslarga sotmaymiz, ijaraga bermaymiz yoki tijorat maqsadlarida bermaymiz.

Ma'lumotlar faqat O'zbekiston Respublikasi qonunchiligiga muvofiq vakolatli davlat organlarining yozma talabi yoki foydalanuvchining roziligi bilan berilishi mumkin.

5. SAQLASH VA HIMOYA

  • Barcha ma'lumotlar HTTPS (TLS/SSL) orqali shifrlangan
  • Server ma'lumotlari xavfsiz muhitda saqlanadi
  • Ma'lumotlarga faqat vakolatli xodimlar kira oladi
  • Ma'lumotlar 90 kun ichida o'chiriladi

6. FOYDALANUVCHI HUQUQLARI

Siz quyidagi huquqlarga egasiz:
  • Ma'lumotlarni so'rash huquqi
  • Ma'lumotlarni o'chirish huquqi
  • Ma'lumotlarni tuzatish huquqi
  • Rozilikni bekor qilish huquqi

Murojaatlar uchun: shohruxbekaralov@gmail.com
Javob muddati: 30 kun

7. BOLALAR MAXFIYLIGI

Ilova ta'limiy xarakterga ega. Biz 13 yoshdan kichik bolalardan ataylab shaxsiy ma'lumot to'plamaymiz.

8. UCHINCHI TOMON XIZMATLARI

Ilova uchinchi tomon analitika, reklama yoki kuzatish xizmatlaridan foydalanmaydi.

9. AMALDAGI QONUNCHILIK

Ushbu Maxfiylik siyosati quyidagi qonun hujjatlariga muvofiq ishlab chiqilgan:
  • O'zR "Shaxsga doir ma'lumotlar to'g'risida"gi Qonuni (O'RQ-547)
  • O'zR "Axborot erkinligi" Qonuni
  • Google Play Developer Distribution Agreement
  • Apple Developer Program License Agreement

10. BOG'LANISH

Kompaniya: MYSTAR MChJ
Email: shohruxbekaralov@gmail.com
Ilova: Muallimi Soniy`,

    termsOfUse: `FOYDALANISH SHARTLARI

Kuchga kirgan: 2026-yil, 16-fevral

1. UMUMIY QOIDALAR

Ushbu Shartlar "MYSTAR" MChJ tomonidan ishlab chiqilgan "Muallimi Soniy" ilovasidan foydalanish tartib va qoidalarini belgilaydi.

Ilovani o'rnatish yoki foydalanish orqali Siz ushbu Shartlarga rozilik bildirasiz.

2. ILOVA TAVSIFI

"Muallimi Soniy" — Ahmad Xodiy Maqsudiy tomonidan yozilgan kitobning raqamli versiyasi bo'lib, arab alifbosini interaktiv o'rganish uchun mo'ljallangan bepul ta'limiy ilovadir.

Huquqiy asos: O'zbekiston Respublikasi Vazirlar Mahkamasi huzuridagi Din ishlari bo'yicha qo'mitaning 2014-yil 10-noyabrdagi 3438-son xulosasi asosida nashr etilgan "Muallimi soniy" kitobi va MP3 diskidan foydalanilgan.

3. OCHIQ KOD VA ERKIN FOYDALANISH

Ushbu loyiha to'liq ochiq kodli (open source) bo'lib, GitHub platformasida joylashtirilgan. Istalgan shaxs dasturiy koddan cheklovsiz foydalanishi, ko'chirib olishi, o'zgartirishi va tarqatishi mumkin.

GitHub: github.com/IsmoilovHabibulloh/muallimi-soniy

4. BERILGAN HUQUQLAR

Foydalanuvchiga quyidagi huquqlar beriladi:
  • Ilovani bepul yuklab olish va o'rnatish
  • Barcha funksiyalardan cheklanmagan foydalanish
  • Kontentni o'qish va tinglash
  • Dasturiy kodni ko'rish, o'rganish, o'zgartirish va tarqatish

5. JAVOBGARLIK CHEKLOVI

Ilova "MAVJUD HOLDA" (AS IS) taqdim etiladi. Kompaniya ilovaning uzluksiz yoki xatosiz ishlashini kafolatlamaydi.

6. INTERNET ULANISHI

Ilova asosan oflayn rejimda ishlaydi. Internet faqat quyidagi hollarda talab qilinadi:
  • Birinchi ishga tushirish va kontent yuklash
  • Yangilanishlarni yuklab olish
  • "Fikr bildirish" formasini yuborish

7. INTELLEKTUAL MULK

Asl kitob matni Ahmad Xodiy Maqsudiy qalamiga mansub. VazMahkama huzuridagi Din ishlari qo'mitasining 2014-yil 10-noyabrdagi 3438-son xulosasi asosida nashr etilgan.

Audio yozuvlar: Jahongir qori Nematov.

8. NIZOLARNI HAL QILISH

Barcha nizolar avval muzokaralar yo'li bilan, muzokaralar natija bermaganida O'zbekiston Respublikasi qonunchiligiga muvofiq hal qilinadi.

9. BOG'LANISH

Kompaniya: MYSTAR MChJ
Email: shohruxbekaralov@gmail.com
Ilova: Muallimi Soniy`,

    aboutApp: `DASTUR HAQIDA

Muallimi Soniy — Ikkinchi Muallim

Ilova nomi: Muallimi Soniy
Versiya: 1.0.0
Ishlab chiqaruvchi: MYSTAR MChJ (CodingTech.uz)
Kategoriya: Ta'lim (Education)
Narx: Bepul
Kod: Ochiq (Open Source)

1. ILOVA HAQIDA

"Muallimi Soniy" — mashhur islom olimi Ahmad Xodiy Maqsudiy tomonidan yozilgan arab alifbosini o'rgatishga bag'ishlangan klassik darslikning zamonaviy raqamli versiyasidir.

Huquqiy asos: O'zbekiston Respublikasi Vazirlar Mahkamasi huzuridagi Din ishlari bo'yicha qo'mitaning 2014-yil 10-noyabrdagi 3438-son xulosasi asosida nashr etilgan "Muallimi soniy" kitobi va MP3 diskidan foydalanilgan.

2. MUALLIF HAQIDA

Ahmad Xodiy Maqsudiy (1868–1941) — tatar-boshqird pedagogi, yozuvchi va islom olimi. "Muallimi Soniy" uning eng mashhur asarlaridan bo'lib, arab alifbosini bosqichma-bosqich o'rgatish uchun mo'ljallangan.

3. AUDIO

Barcha sahifalarning ovozli talaffuzini Jahongir qori Nematov o'qigan. MP3 formatda.

4. IMKONIYATLAR

  • Raqamlashtirilgan kitob
  • Professional ovozli talaffuz
  • Kunduzgi va tungi rejim
  • 4 tilda interfeys
  • Oflayn rejim
  • Butunlay bepul va ochiq kodli

5. OCHIQ KOD

Dasturiy kod to'liq ochiq. Istalgan shaxs erkin foydalanishi mumkin.
GitHub: github.com/IsmoilovHabibulloh/muallimi-soniy

6. NASHR MA'LUMOTLARI

Asl muallif: Ahmad Xodiy Maqsudiy
Huquqiy asos: VazMahkama, 3438-son, 2014
Audio: Jahongir qori Nematov
Raqamlashtirish: MYSTAR MChJ
Nashr yili: 2026

7. TASHAKKUR

  • O'zbekiston Musulmonlar Idorasi
  • Din ishlari bo'yicha qo'mita (3438-son xulosa)
  • Jahongir qori Nematov — audio yozuvlar
  • Ahmad Xodiy Maqsudiy rahmatullohi — asar muallifi

8. BOG'LANISH

Kompaniya: MYSTAR MChJ
Email: shohruxbekaralov@gmail.com`,
  },

  "uz-cyrl": {
    privacyPolicy: `МАХФИЙЛИК СИЁСАТИ

Кучга кирган: 2026-йил, 16-феврал

1. КИРИШ

Ушбу Махфийлик сиёсати "MYSTAR" МЧЖ томонидан ишлаб чиқилган "Муаллими Соний" иловаси фойдаланувчиларининг шахсий маълумотларини тўплаш, сақлаш, қайта ишлаш ва ҳимоя қилиш тартибини белгилайди.

Иловадан фойдаланишни бошлаш орқали Сиз ушбу Махфийлик сиёсати шартларига розилик билдирасиз.

2. БИЗ ТЎПЛАЙДИГАН МАЪЛУМОТЛАР

Илова фақат "Фикр билдириш" бўлими орқали ихтиёрий маълумотларни қабул қилади. Илова автоматик равишда ҳеч қандай шахсий маълумотни тўпламайди.

Созламалар фақат қурилмада маҳаллий сақланади ва серверга юборилмайди.

Биз тўплаМАЙДИГАН маълумотлар:
  • GPS жойлашув маълумотлари
  • Контактлар, суратлар ёки қурилмадаги файллар
  • Қурилма идентификаторлари
  • Реклама идентификаторлари
  • Молиявий маълумотлар

3-9. Ўзбекча (лотин) версияси билан бир хил.

Мурожаатлар учун: shohruxbekaralov@gmail.com`,

    termsOfUse: `ФОЙДАЛАНИШ ШАРТЛАРИ

Кучга кирган: 2026-йил, 16-феврал

1. УМУМИЙ ҚОИДАЛАР

"Муаллими Соний" — Аҳмад Ходий Мақсудий томонидан ёзилган китобнинг рақамли версияси бўлиб, араб алифбосини интерактив ўрганиш учун мўлжалланган бепул таълимий иловадир.

2. ОЧИҚ КОД

Ушбу лойиҳа тўлиқ очиқ кодли (open source). Истаган шахс дастурий коддан чеклансиз фойдаланиши мумкин.

GitHub: github.com/IsmoilovHabibulloh/muallimi-soniy

3-8. Ўзбекча (лотин) версияси билан бир хил.

Мурожаатлар учун: shohruxbekaralov@gmail.com`,

    aboutApp: `ДАСТУР ҲАҚИДА

Муаллими Соний — Иккинчи Муаллим

Версия: 1.0.0
Ишлаб чиқарувчи: MYSTAR МЧЖ (CodingTech.uz)
Категория: Таълим
Нарх: Бепул
Код: Очиқ (Open Source)

Масҳҳур ислом олими Аҳмад Ходий Мақсудий (1868–1941) томонидан ёзилган араб алифбосини ўргатишга бағишланган классик дарсликнинг замонавий рақамли версияси.

Аудио: Жаҳонгир қори Нематов
Рақамлаштириш: MYSTAR МЧЖ
GitHub: github.com/IsmoilovHabibulloh/muallimi-soniy

Мурожаатлар: shohruxbekaralov@gmail.com`,
  },

  ru: {
    privacyPolicy: `ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ

Дата вступления в силу: 16 февраля 2026 г.

1. ВВЕДЕНИЕ

Настоящая Политика конфиденциальности определяет порядок сбора, хранения, обработки и защиты персональных данных пользователей приложения «Муаллими Соний», разработанного ООО «MYSTAR».

2. СОБИРАЕМЫЕ ДАННЫЕ

2.1. Добровольные данные
Приложение принимает данные только через раздел «Обратная связь»:
  • Имя — идентификация обратившегося
  • Номер телефона — установление связи
  • Текст отзыва — улучшение приложения

Важно: Данные собираются только при добровольной отправке формы. Приложение не собирает персональные данные автоматически.

2.2. Локальное хранение
Настройки хранятся только на устройстве (без отправки на сервер):
  • Язык, тема, номер последней страницы

2.3. Данные, которые мы НЕ собираем
  • GPS, контакты, фото, IMEI, рекламные ID, финансовые данные, биометрия

3. ИСПОЛЬЗОВАНИЕ ДАННЫХ

Только для ответов на обращения и улучшения приложения. Не для маркетинга.

4. ПЕРЕДАЧА ТРЕТЬИМ ЛИЦАМ

Не продаём и не передаём. Только по запросу государственных органов РУз.

5. ХРАНЕНИЕ И ЗАЩИТА

HTTPS шифрование, защищённый сервер, удаление через 90 дней.

6. ПРАВА ПОЛЬЗОВАТЕЛЯ

Запрос, удаление, исправление данных, отзыв согласия.
Email: shohruxbekaralov@gmail.com (ответ: 30 дней)

7. ДЕТИ

Не собираем данные детей младше 13 лет.

8. СТОРОННИЕ СЕРВИСЫ

Не используем аналитику, рекламу или отслеживание.

9. ЗАКОНОДАТЕЛЬСТВО

ЗРУ-547, Google Play и Apple Developer Agreement.`,

    termsOfUse: `УСЛОВИЯ ИСПОЛЬЗОВАНИЯ

Дата вступления в силу: 16 февраля 2026 г.

1. ОБЩИЕ ПОЛОЖЕНИЯ

«Муаллими Соний» — бесплатное образовательное приложение для изучения арабского алфавита на основе книги Ахмада Ходия Максуди.

Правовая основа: Заключение № 3438 от 10.11.2014 Комитета по делам религий при Кабинете Министров РУз.

2. ОТКРЫТЫЙ КОД

Проект полностью открытый (open source). Любой может свободно использовать, копировать, изменять и распространять код.

GitHub: github.com/IsmoilovHabibulloh/muallimi-soniy

3. ПРАВА ПОЛЬЗОВАТЕЛЯ

  • Бесплатная загрузка и установка
  • Неограниченное использование
  • Свободное использование исходного кода

4. ОГРАНИЧЕНИЕ ОТВЕТСТВЕННОСТИ

Приложение предоставляется «КАК ЕСТЬ» (AS IS).

5. ИНТЕРНЕТ

Работает офлайн. Интернет только для первой загрузки и обновлений.

6. КОНТАКТЫ

ООО «MYSTAR», shohruxbekaralov@gmail.com`,

    aboutApp: `О ПРОГРАММЕ

Муаллими Соний — Второй Учитель

Версия: 1.0.0
Разработчик: ООО «MYSTAR» (CodingTech.uz)
Категория: Образование
Цена: Бесплатно
Код: Открытый (Open Source)

Современная цифровая версия классического учебника арабского алфавита Ахмада Ходия Максуди (1868–1941).

Аудио: Джахангир кори Нематов
Разработка: ООО «MYSTAR»
GitHub: github.com/IsmoilovHabibulloh/muallimi-soniy

Контакт: shohruxbekaralov@gmail.com`,
  },

  en: {
    privacyPolicy: `PRIVACY POLICY

Effective Date: February 16, 2026

1. INTRODUCTION

This Privacy Policy defines the procedures for collecting, storing, processing, and protecting personal data of users of the "Muallimi Soniy" application developed by MYSTAR LLC.

2. DATA WE COLLECT

2.1. Voluntary Data
Only through "Feedback" section:
  • Name — to identify the sender
  • Phone number — to establish contact
  • Feedback text — to improve the application

Important: Data is collected only when the user voluntarily submits the form. The app does not automatically collect any personal data.

2.2. Local Storage
Stored only on device (never sent to server):
  • Language, theme, last read page

2.3. Data We Do NOT Collect
  • GPS, contacts, photos, device IDs, ad IDs, financial data, biometrics

3. USE OF DATA

Only for responding to feedback and improving the app. Not for marketing.

4. THIRD PARTIES

We do not sell or share data. Only upon legal request from Uzbekistan authorities.

5. SECURITY

HTTPS encryption, secure server, data deleted within 90 days.

6. USER RIGHTS

Request, delete, correct data, withdraw consent.
Email: shohruxbekaralov@gmail.com (response: 30 days)

7. CHILDREN

We do not collect data from children under 13.

8. THIRD-PARTY SERVICES

No analytics, advertising, or tracking.

9. LEGISLATION

Uzbekistan personal data laws, Google Play & Apple Developer agreements.`,

    termsOfUse: `TERMS OF USE

Effective Date: February 16, 2026

1. GENERAL

"Muallimi Soniy" is a free educational app for learning the Arabic alphabet based on the book by Ahmad Khodiy Maqsudiy.

Legal basis: Conclusion No. 3438 dated 10.11.2014, Committee for Religious Affairs, Republic of Uzbekistan.

2. OPEN SOURCE

This project is fully open source. Anyone can freely use, copy, modify, and distribute the code.

GitHub: github.com/IsmoilovHabibulloh/muallimi-soniy

3. USER RIGHTS

  • Free download and installation
  • Unlimited use of all features
  • Free use of source code

4. LIMITATION OF LIABILITY

The app is provided "AS IS."

5. INTERNET

Works offline. Internet only for initial download and updates.

6. CONTACT

MYSTAR LLC, shohruxbekaralov@gmail.com`,

    aboutApp: `ABOUT THE APPLICATION

Muallimi Soniy — The Second Teacher

Version: 1.0.0
Developer: MYSTAR LLC (CodingTech.uz)
Category: Education
Price: Free
Code: Open Source

A modern digital version of the classic Arabic alphabet textbook by Ahmad Khodiy Maqsudiy (1868–1941).

Audio: Jahongir qori Nematov
Development: MYSTAR LLC
GitHub: github.com/IsmoilovHabibulloh/muallimi-soniy

Contact: shohruxbekaralov@gmail.com`,
  },
};
