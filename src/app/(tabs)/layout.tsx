import { BottomTabBar } from "@/components/layout/BottomTabBar";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1 pb-20 overflow-y-auto">{children}</main>
      <BottomTabBar />
    </div>
  );
}
