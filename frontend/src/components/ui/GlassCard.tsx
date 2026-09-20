import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className = "",
}: GlassCardProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10",
        "bg-white/[0.04] backdrop-blur-xl",
        "shadow-xl shadow-black/10",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}