import { BottomTabBar } from "@/components/layout/BottomTabBar";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-dvh">
      <main
        className="flex-1 pb-20 overflow-y-auto"
        style={{
          maskImage:
            "linear-gradient(to bottom, black, black calc(100% - 100px), transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black, black calc(100% - 100px), transparent)",
        }}
      >
        {children}
      </main>
      <BottomTabBar />
    </div>
  );
}
