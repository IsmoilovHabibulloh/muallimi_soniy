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
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {pages.map((page) => (
          <div key={page.id} className="flex-[0_0_100%] min-w-0 px-1">
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
