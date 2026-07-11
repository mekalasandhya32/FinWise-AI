import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  gradient?: boolean;
  interactive?: boolean;
}

export function GlassCard({
  className,
  glow,
  gradient,
  interactive,
  children,
  ...rest
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6",
        gradient && "gradient-border",
        glow && "shadow-glow",
        interactive && "hover-lift cursor-pointer",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function FeatureCard({
  icon,
  title,
  description,
  accent = "blue",
}: {
  icon: ReactNode;
  title: string;
  description: string;
  accent?: "blue" | "purple";
}) {
  return (
    <GlassCard interactive className="group flex flex-col gap-4">
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110",
          accent === "blue"
            ? "bg-[oklch(0.68_0.19_260/0.18)] text-[oklch(0.85_0.14_260)] shadow-[0_0_24px_-6px_oklch(0.68_0.19_260/0.6)]"
            : "bg-[oklch(0.62_0.22_300/0.18)] text-[oklch(0.85_0.14_300)] shadow-[0_0_24px_-6px_oklch(0.62_0.22_300/0.6)]",
        )}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </GlassCard>
  );
}

export function StatCard({
  label,
  value,
  delta,
  icon,
}: {
  label: string;
  value: string;
  delta?: string;
  icon?: ReactNode;
}) {
  return (
    <GlassCard className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="mt-2 font-display text-3xl font-bold gradient-text">
          {value}
        </p>
        {delta && (
          <p className="mt-1 text-xs font-medium text-[oklch(0.72_0.17_155)]">
            {delta}
          </p>
        )}
      </div>
      {icon && (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(1_0_0/0.06)] text-primary">
          {icon}
        </div>
      )}
    </GlassCard>
  );
}

export function ResultCard({
  title,
  value,
  status = "success",
  breakdown,
}: {
  title: string;
  value: string;
  status?: "success" | "warning" | "danger";
  breakdown?: { label: string; value: string }[];
}) {
  const statusStyle = {
    success: "bg-[oklch(0.72_0.17_155/0.15)] text-[oklch(0.85_0.15_155)]",
    warning: "bg-[oklch(0.80_0.16_80/0.15)] text-[oklch(0.85_0.14_80)]",
    danger: "bg-[oklch(0.65_0.24_22/0.15)] text-[oklch(0.85_0.18_22)]",
  }[status];

  return (
    <GlassCard glow className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 gradient-brand opacity-10" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 font-display text-4xl font-bold gradient-text">
            {value}
          </p>
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest",
            statusStyle,
          )}
        >
          {status}
        </span>
      </div>
      {breakdown && (
        <dl className="mt-6 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
          {breakdown.map((b) => (
            <div key={b.label} className="flex items-center justify-between text-sm">
              <dt className="text-muted-foreground">{b.label}</dt>
              <dd className="font-medium text-foreground">{b.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </GlassCard>
  );
}
