import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20",
  secondary:
    "border border-white/15 bg-white/10 text-white hover:bg-white/15",
  ghost:
    "bg-transparent text-slate-300 hover:bg-white/10 hover:text-white",
  danger:
    "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/20",
};

export default function Button({
  children,
  variant = "primary",
  isLoading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={[
        "inline-flex items-center justify-center gap-2",
        "rounded-xl px-5 py-3",
        "text-sm font-semibold transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-blue-400/70",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantStyles[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {isLoading ? "Processing..." : children}
    </button>
  );
}