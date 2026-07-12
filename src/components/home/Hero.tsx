import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BrainCircuit,
  LineChart,
  Lock,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Button } from "@/components/finwise/Button";
import { GlassCard } from "@/components/finwise/Card";

export function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-16 pt-14 md:px-8 md:pt-24">
      <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        <div className="animate-[fade-up_0.7s_ease-out]">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            AI-powered personal finance
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Smarter money{" "}
            <span className="relative inline-block">
              <span className="gradient-text">decisions</span>
              <svg aria-hidden className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8 Q 80 2 150 6 T 298 5" stroke="url(#g)" strokeWidth="3" strokeLinecap="round" />
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0" stopColor="oklch(0.68 0.19 260)" />
                    <stop offset="1" stopColor="oklch(0.62 0.22 300)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            , engineered by AI.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            FinWise AI unifies loan checks, credit insights, EMI planning, and a personal advisor into a single, beautifully simple workspace.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/ai-advisor">
              <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>Talk to AI Advisor</Button>
            </Link>
            <Link to="/emi-calculator">
              <Button size="lg" variant="secondary">Try EMI Calculator</Button>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-2"><Lock className="h-3.5 w-3.5" /> Bank-grade encryption</span>
            <span className="flex items-center gap-2"><Zap className="h-3.5 w-3.5" /> Real-time insights</span>
            <span className="flex items-center gap-2"><TrendingUp className="h-3.5 w-3.5" /> No credit-pull required</span>
          </div>
        </div>

        <div className="relative animate-[fade-up_0.8s_ease-out_0.15s_both]">
          <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_50%,oklch(0.68_0.19_260/0.35),transparent_70%)] blur-2xl" />

          <GlassCard glow className="relative p-5 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Portfolio</p>
                <p className="mt-1 font-display text-3xl font-bold gradient-text">$128,450</p>
              </div>
              <span className="rounded-full bg-[oklch(0.72_0.17_155/0.15)] px-3 py-1 text-xs font-semibold text-[oklch(0.85_0.15_155)]">
                +12.4%
              </span>
            </div>

            <div className="mt-5 h-32 rounded-xl bg-[oklch(1_0_0/0.04)] p-3">
              <svg viewBox="0 0 300 100" className="h-full w-full">
                <defs>
                  <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="oklch(0.68 0.19 260)" stopOpacity="0.5" />
                    <stop offset="1" stopColor="oklch(0.62 0.22 300)" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="line" x1="0" x2="1">
                    <stop offset="0" stopColor="oklch(0.68 0.19 260)" />
                    <stop offset="1" stopColor="oklch(0.62 0.22 300)" />
                  </linearGradient>
                </defs>
                <path d="M0 80 L30 60 L60 68 L90 45 L120 55 L150 30 L180 42 L210 22 L240 32 L270 15 L300 25 L300 100 L0 100Z" fill="url(#area)" />
                <path d="M0 80 L30 60 L60 68 L90 45 L120 55 L150 30 L180 42 L210 22 L240 32 L270 15 L300 25" fill="none" stroke="url(#line)" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { label: "Score", value: "782" },
                { label: "Loans", value: "3" },
                { label: "Saved", value: "$4.2k" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-[oklch(1_0_0/0.04)] p-3">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
                  <p className="mt-1 font-display text-lg font-bold">{s.value}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <div className="absolute -left-6 top-6 hidden md:block [animation:float_6s_ease-in-out_infinite]">
            <GlassCard className="flex items-center gap-3 !p-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg gradient-brand">
                <BrainCircuit className="h-4 w-4 text-white" />
              </span>
              <div>
                <p className="text-xs font-semibold">AI insight</p>
                <p className="text-[10px] text-muted-foreground">Refinance saves $1.2k</p>
              </div>
            </GlassCard>
          </div>
          <div className="absolute -right-4 bottom-8 hidden md:block [animation:float_7s_ease-in-out_infinite_1.5s]">
            <GlassCard className="flex items-center gap-3 !p-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[oklch(0.72_0.17_155/0.25)] text-[oklch(0.85_0.15_155)]">
                <LineChart className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold">Score +34</p>
                <p className="text-[10px] text-muted-foreground">Last 3 months</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
