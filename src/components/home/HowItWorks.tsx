import { CheckCircle2, MessageSquare, Rocket, UserPlus } from "lucide-react";
import { GlassCard } from "@/components/finwise/Card";
import { SectionHeading } from "./SectionHeading";

const STEPS = [
  { icon: UserPlus, title: "Create profile", desc: "Answer a few questions — no credit pull needed." },
  { icon: MessageSquare, title: "Chat with AI", desc: "Get personalized insights on loans, credit, and EMIs." },
  { icon: CheckCircle2, title: "Review options", desc: "Compare tailored offers and simulate real outcomes." },
  { icon: Rocket, title: "Take action", desc: "Apply, optimize, or save — with confidence and clarity." },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
      <SectionHeading
        eyebrow="How it works"
        title={<>From question to <span className="gradient-text">confident decision</span>.</>}
        subtitle="A calm, four-step flow that turns financial complexity into clarity."
      />

      <div className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent lg:block" />

        {STEPS.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={title}
            className="relative animate-[fade-up_0.6s_ease-out_both]"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl gradient-brand shadow-glow">
              <Icon className="h-6 w-6 text-white" />
              <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full glass-strong text-[10px] font-bold text-primary">
                {i + 1}
              </span>
            </div>
            <GlassCard className="mt-6 text-center">
              <h3 className="font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </GlassCard>
          </div>
        ))}
      </div>
    </section>
  );
}
