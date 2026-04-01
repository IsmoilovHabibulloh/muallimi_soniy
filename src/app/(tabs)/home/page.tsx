"use client";

import { GreetingHeader } from "@/components/home/GreetingHeader";
import { LastViewedCard } from "@/components/home/LastViewedCard";
import { ChaptersGrid } from "@/components/home/ChaptersGrid";

export default function HomePage() {
  return (
    <div className="max-w-lg mx-auto">
      <GreetingHeader />
      <LastViewedCard />
      <ChaptersGrid />
    </div>
  );
}
