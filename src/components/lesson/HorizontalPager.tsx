"use client";

import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { Page, Element } from "@/lib/data/types";
import { PageView } from "./PageView";

interface Props {
  pages: Page[];
  currentIndex: number;
  activeElementId: string | null;
  onPageChange: (index: number) => void;
  onElementClick: (element: Element) => void;
  onBackgroundClick: () => void;
}

export function HorizontalPager({
  pages,
  currentIndex,
  activeElementId,
  onPageChange,
  onElementClick,
  onBackgroundClick,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: currentIndex,
    watchDrag: true,
    containScroll: "trimSnaps",
    duration: 28,
    skipSnaps: false,
    align: "center",
  });

  // Sync external index → embla
  useEffect(() => {
    if (emblaApi && emblaApi.selectedScrollSnap() !== currentIndex) {
      emblaApi.scrollTo(currentIndex, false);
    }
  }, [currentIndex, emblaApi]);

  // Listen to embla slide changes → update parent
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const idx = emblaApi.selectedScrollSnap();
    if (idx !== currentIndex) {
      onPageChange(idx);
    }
  }, [emblaApi, currentIndex, onPageChange]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="overflow-hidden h-full" ref={emblaRef}>
      <div className="flex h-full">
        {/* Har slide O'ZI scroll bo'ladi — scroll balandligi faqat shu
            sahifa kontenticha. (Aks holda tashqi scroller eng uzun sahifa
            bo'yicha cho'zilib, qisqa sahifalarda ham katta bo'sh scroll
            qolardi.) */}
        {pages.map((page, idx) => (
          <div
            key={page.id}
            data-page-slide={idx}
            className="flex-[0_0_100%] min-w-0 px-1 h-full overflow-y-auto overscroll-contain"
          >
            <PageView
              page={page}
              activeElementId={activeElementId}
              onElementClick={onElementClick}
              onBackgroundClick={onBackgroundClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
