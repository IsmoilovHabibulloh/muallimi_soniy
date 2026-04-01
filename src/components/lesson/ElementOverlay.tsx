"use client";

import type { Element } from "@/lib/data/types";

interface Props {
  element: Element;
  isActive: boolean;
  hasActiveElement: boolean;
  onClick: () => void;
}

export function ElementOverlay({
  element,
  isActive,
  hasActiveElement,
  onClick,
}: Props) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="absolute element-spring rounded-lg"
      style={{
        left: `${element.x}%`,
        top: `${element.y}%`,
        width: `${element.width}%`,
        height: `${element.height}%`,
        transform: isActive ? "translateY(-6px) scale(1.08)" : "none",
        boxShadow: isActive
          ? "0 8px 30px rgba(34, 197, 94, 0.5)"
          : "none",
        border: isActive ? "2px solid #22c55e" : "2px solid transparent",
        backgroundColor: isActive
          ? "rgba(34, 197, 94, 0.15)"
          : "rgba(255, 255, 255, 0.0)",
        opacity: hasActiveElement && !isActive ? 0.4 : 1,
        zIndex: isActive ? 10 : 1,
      }}
    />
  );
}
