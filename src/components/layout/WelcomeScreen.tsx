"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSettings } from "@/providers/SettingsProvider";

const WELCOME_TEXTS = {
  "uz-latn": {
    welcome: "Xush kelibsiz!",
    description:
      'Bu ilova "Ahmad Xodiy Maqsudiy — Muallimi Soniy" kitobini o\'qish va talaffuzni eshitish uchun mo\'ljallangan.',
    wuduReminder:
      "Bu kitob Qur'on harflarini o'rgatadi. Iltimos, tahoratli holda foydalaning.",
    offlineNote:
      "Ilova offline ishlaydi. Internet faqat yangi kontent yuklash uchun kerak.",
    continueBtn: "Davom etish",
  },
  "uz-cyrl": {
    welcome: "Хуш келибсиз!",
    description:
      'Бу илова "Аҳмад Ходий Мақсудий — Муаллими Соний" китобини ўқиш ва талаффузни эшитиш учун мўлжалланган.',
    wuduReminder:
      "Бу китоб Қуръон ҳарфларини ўргатади. Илтимос, таҳоратли ҳолда фойдаланинг.",
    offlineNote:
      "Илова офлайн ишлайди. Интернет фақат янги контент юклаш учун керак.",
    continueBtn: "Давом этиш",
  },
  ru: {
    welcome: "Добро пожаловать!",
    description:
      'Это приложение предназначено для чтения и прослушивания произношения из книги "Ахмад Ходий Максуди — Муаллими Сони".',
    wuduReminder:
      "Эта книга обучает буквам Корана. Пожалуйста, используйте в состоянии омовения.",
    offlineNote:
      "Приложение работает офлайн. Интернет нужен только для загрузки нового контента.",
    continueBtn: "Продолжить",
  },
  en: {
    welcome: "Welcome!",
    description:
      'This app is designed for reading and listening to the pronunciation from the book "Ahmad Khodiy Maqsudiy — Muallimi Soniy".',
    wuduReminder:
      "This book teaches Quran letters. Please use it in a state of wudu (ablution).",
    offlineNote:
      "The app works offline. Internet is only needed for downloading new content.",
    continueBtn: "Continue",
  },
};

export function WelcomeScreen() {
  const router = useRouter();
  const { settings } = useSettings();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const texts = WELCOME_TEXTS[settings.locale] || WELCOME_TEXTS["uz-latn"];

  const handleContinue = () => {
    localStorage.setItem("muallimi-welcome-seen", "true");
    setVisible(false);
    setTimeout(() => router.replace("/home"), 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(52,211,153,0.04) 0%, #0c1222 65%)",
      }}
    >
      <div
        className={`max-w-[380px] w-full px-7 py-9 rounded-[28px] text-center transition-all duration-500 ${visible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
        style={{
          background:
            "linear-gradient(160deg, rgba(15,30,55,0.95), rgba(10,18,38,0.98))",
          border: "1.5px solid rgba(52, 211, 153, 0.2)",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(52,211,153,0.08)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Muallimi Soniy"
          className="w-28 h-28 mx-auto mb-7 object-contain"
          style={{ filter: "brightness(1.4) contrast(1.1)" }}
        />

        <h1 className="text-[28px] font-extrabold text-white mb-3 tracking-tight">
          {texts.welcome}
        </h1>

        <p className="text-[15px] text-slate-300/70 leading-relaxed mb-7">
          {texts.description}
        </p>

        <div
          className="rounded-2xl px-5 py-4 mb-5 flex items-start gap-3.5 text-left"
          style={{
            background: "rgba(52, 211, 153, 0.08)",
            border: "1px solid rgba(52, 211, 153, 0.18)",
          }}
        >
          <span className="text-[26px] leading-none mt-0.5 shrink-0">🤲</span>
          <p className="text-[13px] text-emerald-300 leading-[1.6] flex-1">
            {texts.wuduReminder}
          </p>
        </div>

        <p className="text-[12px] text-white/30 mb-7 leading-relaxed">
          {texts.offlineNote}
        </p>

        <button
          onClick={handleContinue}
          className="w-full py-4 rounded-2xl font-bold text-[16px] text-white transition-all active:scale-[0.97] hover:brightness-110"
          style={{
            background: "linear-gradient(135deg, #10b981, #34d399)",
            boxShadow:
              "0 4px 24px rgba(52, 211, 153, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          {texts.continueBtn}
        </button>
      </div>
    </div>
  );
}
