"use client";

import { ElementOverlay } from "./ElementOverlay";
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
  return (
    <div
      className="relative w-full flex items-start justify-center"
      onClick={onBackgroundClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={page.imageUrl}
        alt={`Page ${page.order}`}
        className="w-full h-auto rounded-xl select-none"
        draggable={false}
      />

      {/* Element overlays */}
      {page.elements.map((el) => (
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
