import type { ReactNode } from "react";

type BadgeVariant = "blue" | "green" | "purple" | "yellow" | "red";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  blue: "border-blue-400/20 bg-blue-400/10 text-blue-300",
  green: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  purple: "border-purple-400/20 bg-purple-400/10 text-purple-300",
  yellow: "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",
  red: "border-red-400/20 bg-red-400/10 text-red-300",
};

export default function Badge({
  children,
  variant = "blue",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1",
        "text-xs font-semibold tracking-wide",
        variantStyles[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}