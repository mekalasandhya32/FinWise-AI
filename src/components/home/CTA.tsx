import { Link } from "@tanstack/react-router";
import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/finwise/Button";
import { GlassCard } from "@/components/finwise/Card";

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
      <GlassCard className="relative overflow-hidden !p-10 md:!p-14">
        <div className="pointer-events-none absolute inset-0 -z-10 gradient-brand opacity-20" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[oklch(0.62_0.22_300/0.35)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[oklch(0.68_0.19_260/0.35)] blur-3xl" />

        <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full glass-strong px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Free forever
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Ready to meet your <span className="gradient-text">AI money copilot</span>?
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Start with a free chat with the AI advisor. No sign-up, no credit-pull, no obligation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/ai-advisor">
              <Button size="lg" rightIcon={<ChevronRight className="h-4 w-4" />}>Launch Advisor</Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">Learn more</Button>
            </Link>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
