"use client";

export function SplashScreen() {
  return (
    <div
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(52,211,153,0.06) 0%, #071a0e 60%)",
      }}
    >
      {/* Glow */}
      <div
        className="absolute rounded-full animate-pulse"
        style={{
          width: 280,
          height: 280,
          background:
            "radial-gradient(circle, rgba(52,211,153,0.15) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Logo — large, sharp */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Muallimi Soniy"
        className="relative w-40 h-40 object-contain"
        style={{
          filter: "brightness(1.3) contrast(1.1)",
          animation: "pulse-glow 2s ease-in-out infinite",
        }}
      />

      <h1 className="mt-8 text-3xl font-bold text-white tracking-wide">
        Muallimi Soniy
      </h1>
      <p className="mt-2 text-sm text-emerald-300/60 font-medium">
        Arab tili oʻrganish platformasi
      </p>
    </div>
  );
}
