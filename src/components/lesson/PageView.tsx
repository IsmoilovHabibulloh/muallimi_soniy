"use client";

import { useState } from "react";
import { ElementOverlay } from "./ElementOverlay";
import { RenderedPage, hasRenderer } from "./RenderedPage";
import type { Page, Element } from "@/lib/data/types";

interface Props {
  page: Page;
  activeElementId: string | null;
  onElementClick: (element: Element) => void;
  onBackgroundClick: () => void;
}

export function PageView({
  page,
  activeElementId,
  onElementClick,
  onBackgroundClick,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  // Extract page number from imageUrl (e.g., "/images/3.jpg" → 3)
  const pageNumber = parseInt(page.imageUrl.replace(/.*\/(\d+)\.jpg/, "$1"));

  // Use rendered page if available
  if (hasRenderer(pageNumber)) {
    return (
      <RenderedPage
        pageNumber={pageNumber}
        elements={page.elements}
        activeElementId={activeElementId}
        onElementClick={onElementClick}
        onBackgroundClick={onBackgroundClick}
      />
    );
  }

  // Fallback to image-based view
  return (
    <div
      className="relative w-full flex items-start justify-center"
      onClick={onBackgroundClick}
    >
      {!loaded && (
        <div className="absolute inset-0 rounded-xl bg-white/5 animate-pulse" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={page.imageUrl}
        alt={`Page ${page.order}`}
        className={`w-full h-auto rounded-xl select-none transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        draggable={false}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
      {loaded &&
        page.elements.map((el) => (
          <ElementOverlay
            key={el.id}
            element={el}
            isActive={activeElementId === el.id}
            hasActiveElement={activeElementId !== null}
            onClick={() => onElementClick(el)}
          />
        ))}
    </div>
  );
}
