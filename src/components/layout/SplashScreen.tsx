"use client";

export function SplashScreen() {
  return (
    <div
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-bg-dark"
    >
      {/* Glow */}
      <div
        className="absolute rounded-full animate-pulse w-[280px] h-[280px] md:w-[450px] md:h-[450px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-primary-glow) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Muallimi Soniy"
        className="relative w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain"
        style={{
          animation: "pulse-glow 2s ease-in-out infinite",
        }}
      />

      <h1 className="mt-8 text-3xl md:text-5xl lg:text-6xl font-bold text-text-main tracking-wide">
        Muallimi Soniy
      </h1>
      <p className="mt-2 md:mt-4 text-sm md:text-lg lg:text-xl text-text-muted font-medium">
        Arab tili oʻrganish platformasi
      </p>
    </div>
  );
}
