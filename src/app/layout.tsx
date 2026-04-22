import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SettingsProvider } from "@/providers/SettingsProvider";
import { ProgressProvider } from "@/providers/ProgressProvider";
import { ServiceWorkerRegister } from "@/components/layout/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "Muallimi Soniy",
  description: "Arab tili oʻrganish platformasi",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Muallimi Soniy",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#071a0e",
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
        <SettingsProvider>
          <ProgressProvider>{children}</ProgressProvider>
        </SettingsProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
