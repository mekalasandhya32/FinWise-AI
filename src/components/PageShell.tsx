import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">{subtitle}</p>
      )}
      {children && <div className="mt-8">{children}</div>}
    </section>
  );
}

export function ComingSoonCard({ note }: { note: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card p-8 text-card-foreground">
      <p className="text-sm font-medium text-primary">Coming soon</p>
      <p className="mt-2 text-sm text-muted-foreground">{note}</p>
    </div>
  );
}
