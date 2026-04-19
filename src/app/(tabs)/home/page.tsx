"use client";

import { GreetingHeader } from "@/components/home/GreetingHeader";
import { BookHeroCard } from "@/components/home/BookHeroCard";

export default function HomePage() {
  return (
    <div className="max-w-lg mx-auto">
      <GreetingHeader />
      <BookHeroCard />
    </div>
  );
}
