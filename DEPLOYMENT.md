# Muallimi Soniy — Deployment

## Server ma'lumotlari

| Parametr | Qiymat |
|----------|--------|
| Server | Essential Intel NL-3 v.2 |
| IP | `188.137.250.167` |
| OS | Ubuntu 24.04.2 LTS |
| Domen | `muallimisoniy.uz` |
| Node.js | v20.20.2 |
| PM2 | v6.0.14 |
| Nginx | v1.24.0 |

## Fayl joylashuvi

```
/var/www/muallimi_soniy/     ← loyiha papkasi
/etc/nginx/sites-available/muallimi-soniy  ← nginx config
```

## Deploy jarayoni (git push → pull → deploy)

### 1. Lokal: kod yozib, push qilish

```bash
cd muallimus-soniy
git add -A
git commit -m "Yangi o'zgarishlar"
git push origin main
```

### 2. Serverda: pull va deploy

```bash
ssh root@188.137.250.167
cd /var/www/muallimi_soniy
git pull origin main
npm ci
npx next build
pm2 restart muallimi-soniy
```

### Qisqa variant (bir buyruq):

```bash
ssh root@188.137.250.167 "cd /var/www/muallimi_soniy && git pull && npm ci && npx next build && pm2 restart muallimi-soniy"
```

## PM2 buyruqlari

```bash
pm2 status              # holat
pm2 logs muallimi-soniy # loglar
pm2 restart muallimi-soniy  # qayta ishga tushirish
pm2 stop muallimi-soniy     # to'xtatish
pm2 delete muallimi-soniy   # o'chirish
```

## Nginx buyruqlari

```bash
nginx -t                  # konfiguratsiya tekshirish
systemctl restart nginx   # qayta ishga tushirish
systemctl status nginx    # holat
```

## SSL sertifikat (certbot)

Domen DNS to'g'ri sozlangandan keyin:

```bash
certbot --nginx -d muallimisoniy.uz -d www.muallimisoniy.uz
```

Avtomatik yangilanadi (certbot.timer).

## DNS sozlamasi

Domen provayderingizda quyidagi yozuvlarni qo'shing:

| Tur | Nomi | Qiymat |
|-----|------|--------|
| A | @ | `188.137.250.167` |
| A | www | `188.137.250.167` |
| AAAA | @ | `2a13:4ac0:20:16:f816:3eff:feda:a439` |

## Nginx konfiguratsiya

```nginx
server {
    listen 80;
    server_name muallimisoniy.uz www.muallimisoniy.uz;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    location /images/ {
        root /var/www/muallimi_soniy/public;
        expires 30d;
    }

    location /audio/ {
        root /var/www/muallimi_soniy/public;
        expires 30d;
    }
}
```

## Offline (PWA) — deploy eslatmalari

- Service worker endi `/serwist/sw.js` da (eski `public/sw.js` o'chirilgan,
  alohida nginx sozlamasi kerak emas — Next orqali proxy bo'ladi).
- Har deploy'dan keyin foydalanuvchilarga "Yangi versiya tayyor" toasti
  chiqadi — "Yangilash" bosilgach yangi versiya qo'llanadi.
- Audio kesh (`ms-media-v1`, ~122 MB) deploy'da o'chmaydi — foydalanuvchi
  qayta yuklamaydi.
- nginx'da `proxy_cache` YOQILMASIN (hozir yo'q) — aks holda `/serwist/sw.js`
  eskirib, foydalanuvchilar eski versiyada qolib ketadi.
