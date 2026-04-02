import { BottomTabBar } from "@/components/layout/BottomTabBar";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <main
        className="flex-1 min-h-0 overflow-y-auto"
        style={{
          maskImage:
            "linear-gradient(to bottom, black, black calc(100% - 80px), transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black, black calc(100% - 80px), transparent)",
        }}
      >
        {children}
      </main>
      <BottomTabBar />
    </div>
  );
}
