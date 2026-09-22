# Muallimi Soniy — Deployment

Loyihani o'z serveringizga o'rnatish bo'yicha umumiy qo'llanma.

> ℹ️ Bu ochiq kodli repozitoriy. Bu yerda **hech qanday server manzili, foydalanuvchi
> nomi, port, parol yoki sertifikat saqlanmaydi**. Ishlab turgan o'rnatmaning aniq
> qiymatlari repodan tashqarida, alohida joyda turadi.

## Talablar

| Komponent | Versiya |
|-----------|---------|
| OS | Ubuntu 24.04 LTS (yoki shunga o'xshash) |
| Node.js | v20 LTS |
| PM2 | v6+ |
| Nginx | v1.24+ |

## Arxitektura

```
Internet → CDN/proxy (ixtiyoriy) → nginx (:443 / :80) → Next.js (127.0.0.1:<APP_PORT>)
                                        ↓
                            statik audio/rasm/shrift — diskdan
```

Next.js ilovasi faqat `127.0.0.1` da tinglaydi, tashqariga nginx chiqaradi.
Katta audio fayllar (~250 MB) Next.js orqali emas, nginx tomonidan to'g'ridan-to'g'ri
diskdan beriladi — shunda ilovaga yuk tushmaydi va Range (`206`) so'rovlari to'g'ri ishlaydi.

## 1. Kodni olish

```bash
git clone https://github.com/<foydalanuvchi>/muallimi_soniy.git /var/www/muallimi_soniy
cd /var/www/muallimi_soniy
```

Repo hajmi ~760 MB (audio va `Materiallar/` tufayli).

## 2. Bog'liqliklar

```bash
npx --yes npm@11 ci
```

> ⚠️ **`npm ci` oddiy npm 10 bilan ishlamaydi** — bu loyihaning `package-lock.json`
> fayli npm 11 bilan generatsiya qilingan, npm 10 unda `npm error npm ci` bilan yiqiladi.
>
> Agar server umumiy bo'lsa (boshqa loyihalar ham ishlasa), **global npm'ni
> yangilamang** — `npx --yes npm@11 ci` faqat shu loyiha uchun ishlaydi va
> tizimdagi npm'ga tegmaydi.
>
> npm 11 ba'zi install-skriptlarni (`sharp`, `esbuild`, `@swc/core`) xavfsizlik
> sababli o'tkazib yuboradi — bu build'ga xalaqit bermaydi.

## 3. Build

```bash
npx next build
```

## 4. PM2 bilan ishga tushirish

```bash
pm2 start ./node_modules/.bin/next --name muallimi-soniy \
  --cwd /var/www/muallimi_soniy -- start -H 127.0.0.1 -p <APP_PORT>
pm2 save
```

`pm2 save` + `pm2 startup` — server qayta yuklanganda ilova o'zi ko'tariladi.

Kundalik buyruqlar:

```bash
pm2 status
pm2 logs muallimi-soniy
pm2 restart muallimi-soniy
```

## 5. Nginx

Ikkita fayl: umumiy `location` bloklari uchun snippet va uni `include` qiladigan
server bloklari. Snippet'ning asosiy qismi:

```nginx
# Statik media — diskdan to'g'ridan-to'g'ri
location /audio/  { alias /var/www/muallimi_soniy/public/audio/;  expires 30d; access_log off; }
location /images/ { alias /var/www/muallimi_soniy/public/images/; expires 30d; }
location /fonts/  { alias /var/www/muallimi_soniy/public/fonts/;  expires 365d; }

# Next.js hash'langan build fayllari
location /_next/static/ {
    proxy_pass http://127.0.0.1:<APP_PORT>;
    proxy_set_header Host $host;
    expires 365d;
    add_header Cache-Control "public, immutable";
}

# Qolgan hammasi Next.js'ga (/serwist/sw.js ham shu yerdan)
location / {
    proxy_pass http://127.0.0.1:<APP_PORT>;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

Qo'llashdan oldin **har doim**:

```bash
nginx -t && systemctl reload nginx
```

> ⚠️ Umumiy serverda `systemctl restart nginx` **ishlatmang** — boshqa saytlar uziladi.
> `reload` yetarli va uzilishsiz.
>
> ⚠️ nginx 1.24 da `http2 on;` direktivasi **yo'q** (u 1.25+ da paydo bo'lgan).
> 1.24 uchun eski shakl: `listen 443 ssl http2;`

## 6. HTTPS

Ikki yondashuvdan birini tanlang:

**a) Let's Encrypt (domen to'g'ridan-to'g'ri serverga ishora qilsa)**

```bash
certbot --nginx -d <domen> -d www.<domen>
```

Avtomatik yangilanadi (`certbot.timer`). `:80` blokida ACME so'rovlari
redirect'siz o'tishi kerak:

```nginx
location ^~ /.well-known/acme-challenge/ { root /var/www/muallimi_soniy/public; }
```

**b) CDN proxy orqasida (Cloudflare va h.k.)**

Agar proxy "Full (strict)" rejimda bo'lsa, origin'da haqiqiy sertifikat kerak,
aks holda `526` xatosi chiqadi. Eng qulayi — provayderning Origin CA sertifikati:
u uzoq muddatli va proxy tomonidan tan olinadi. Sertifikat va maxfiy kalit
serverda saqlanadi (kalit `chmod 600`), **repoga qo'yilmaydi**.

Bunday sertifikat **avtomatik yangilanmaydi** — muddati tugashidan oldin qo'lda
almashtirish kerak.

Tekshirish:

```bash
# sertifikat va kalit juft keladimi
diff <(openssl x509 -in <cert> -noout -pubkey) <(openssl pkey -in <key> -pubout) && echo JUFT

# origin nima qaytaryapti
echo | openssl s_client -connect 127.0.0.1:443 -servername <domen> 2>/dev/null \
  | openssl x509 -noout -dates -ext subjectAltName
```

## 7. Yangilanishlarni chiqarish

```bash
cd /var/www/muallimi_soniy
git pull origin main
npx --yes npm@11 ci
npx next build
pm2 restart muallimi-soniy
```

## Offline (PWA) eslatmalari

- Service worker `/serwist/sw.js` manzilida, Next.js orqali beriladi — alohida
  nginx sozlamasi kerak emas.
- Har deploy'dan keyin foydalanuvchilarga "Yangi versiya tayyor" toasti chiqadi.
- Audio kesh (`ms-media-v1`, ~122 MB) deploy'da o'chmaydi.
- **nginx'da `proxy_cache` YOQILMASIN** va CDN'da ham `/serwist/sw.js` keshlanmasin —
  aks holda service worker eskirib, foydalanuvchilar eski versiyada qolib ketadi.

## Muammolarni tekshirish

```bash
pm2 logs muallimi-soniy --lines 50     # ilova loglari
tail -50 /var/log/nginx/error.log      # nginx xatolari
curl -I http://127.0.0.1:<APP_PORT>/   # ilova javob beryaptimi
```

CDN xatolari: **521** = origin yiqilgan (pm2/nginx tekshiring),
**526** = origin sertifikati yaroqsiz (6-bo'limga qarang).
