"use client";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  green?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function GlassCard({
  children,
  className = "",
  green,
  onClick,
  style,
}: GlassCardProps) {
  return (
    <div
      className={`${green ? "glass-green" : "glass"} p-4 ${onClick ? "cursor-pointer active:scale-[0.97] transition-transform" : ""} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
}
