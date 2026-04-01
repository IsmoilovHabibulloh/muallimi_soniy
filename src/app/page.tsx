"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { WelcomeScreen } from "@/components/layout/WelcomeScreen";

export default function SplashPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"splash" | "welcome" | "done">("splash");

  useEffect(() => {
    const welcomeSeen = localStorage.getItem("muallimi-welcome-seen");

    // Splash 2s → then decide
    const timer = setTimeout(() => {
      if (welcomeSeen) {
        setPhase("done");
        router.replace("/home");
      } else {
        setPhase("welcome");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  if (phase === "splash") return <SplashScreen />;
  if (phase === "welcome") return <WelcomeScreen />;
  return null;
}
