import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
      <div className="max-w-3xl animate-[fade-up_0.6s_ease-out]">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full gradient-brand" />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
      {children && <div className="mt-12 animate-[fade-up_0.7s_ease-out_0.1s_both]">{children}</div>}
    </section>
  );
}
