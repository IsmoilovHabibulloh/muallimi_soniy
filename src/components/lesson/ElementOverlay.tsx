"use client";

import type { Element } from "@/lib/data/types";
import { ELEMENT_COLORS } from "@/lib/data/types";

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
  const color = ELEMENT_COLORS[element.type];

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
        transform: isActive ? "translateY(-4px) scale(1.06)" : "none",
        boxShadow: isActive
          ? `0 6px 24px ${color}66`
          : `0 0 0 1.5px ${color}40`,
        border: isActive
          ? `2px solid ${color}`
          : `1.5px solid ${color}50`,
        backgroundColor: isActive
          ? `${color}20`
          : `${color}08`,
        borderRadius: "8px",
        zIndex: isActive ? 10 : 1,
        animation: !hasActiveElement ? "element-hint 2.5s ease-in-out infinite" : "none",
        animationDelay: `${Math.random() * 2}s`,
      }}
    />
  );
}
