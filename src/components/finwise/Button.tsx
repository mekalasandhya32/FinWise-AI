import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "destructive";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    "gradient-brand text-white shadow-[0_10px_30px_-10px_oklch(0.68_0.19_260/0.7)] hover:shadow-glow hover:-translate-y-0.5",
  secondary:
    "glass-strong text-foreground hover:bg-[oklch(1_0_0/0.14)]",
  ghost:
    "bg-transparent text-foreground hover:bg-[oklch(1_0_0/0.06)]",
  outline:
    "border border-[oklch(1_0_0/0.18)] bg-transparent text-foreground hover:bg-[oklch(1_0_0/0.06)]",
  destructive:
    "bg-destructive text-destructive-foreground hover:opacity-90",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-sm rounded-xl",
  md: "h-11 px-6 text-sm rounded-xl",
  lg: "h-13 px-8 text-base rounded-2xl",
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  ...rest
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold tracking-tight",
        "transition-all duration-300 active:translate-y-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        SIZES[size],
        VARIANTS[variant],
        className,
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <Spinner /> : leftIcon}
      <span>{children}</span>
      {!loading && rightIcon}
    </button>
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white",
        "[animation:spin_0.7s_linear_infinite]",
        className,
      )}
      aria-label="Loading"
      role="status"
    />
  );
}
