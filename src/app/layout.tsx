import type { Metadata, Viewport } from "next";
import { SerwistProvider } from "@serwist/turbopack/react";
import "./globals.css";
import { SettingsProvider } from "@/providers/SettingsProvider";
import { ProgressProvider } from "@/providers/ProgressProvider";
import { PwaManager } from "@/components/layout/PwaManager";

export const metadata: Metadata = {
  title: "Muallimi Soniy",
  description: "Arab tili oʻrganish platformasi",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    // Light default tema — status bar matni qora bo'lishi uchun "default"
    statusBarStyle: "default",
    title: "Muallimi Soniy",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Pinch-zoom ochiq (WCAG 1.4.4); double-tap zoom body'dagi
  // touch-action: manipulation bilan o'chirilgan.
  maximumScale: 5,
  userScalable: true,
  // Light default; dark tanlanganda SettingsProvider meta'ni yangilaydi
  themeColor: "#f0f7f2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className="h-full antialiased" data-theme="light">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="min-h-dvh flex flex-col">
        {/* reloadOnOnline o'chirilgan: dars o'qish payti internet qaytsa
            sahifa yangilanib foydalanuvchi joyini yo'qotmasin */}
        <SerwistProvider
          swUrl="/serwist/sw.js"
          disable={process.env.NODE_ENV !== "production"}
          reloadOnOnline={false}
          options={{ updateViaCache: "none" }}
        >
          <SettingsProvider>
            <ProgressProvider>{children}</ProgressProvider>
            <PwaManager />
          </SettingsProvider>
        </SerwistProvider>
      </body>
    </html>
  );
}
