import { BottomTabBar } from "@/components/layout/BottomTabBar";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1 pb-20 overflow-y-auto">{children}</main>
      {/* Fade gradient above tab bar */}
      <div
        className="fixed bottom-16 left-0 right-0 h-14 z-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--color-bg-dark))",
        }}
      />
      <BottomTabBar />
    </div>
  );
}
