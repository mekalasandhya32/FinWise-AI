import { Check, Clock, Gauge, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/finwise/Card";
import { SectionHeading } from "./SectionHeading";

const BENEFITS = [
  { icon: Gauge, title: "Lightning fast", desc: "Sub-second insights across every module." },
  { icon: ShieldCheck, title: "Private by default", desc: "Your data never trains public models." },
  { icon: Sparkles, title: "Explainable AI", desc: "Every recommendation shows its work." },
  { icon: Clock, title: "Always on", desc: "24/7 advisor that never sleeps or misses." },
  { icon: HeartHandshake, title: "Human-friendly", desc: "No jargon. Just clear next steps." },
  { icon: Check, title: "No credit pull", desc: "Explore options without hurting your score." },
];

export function Benefits() {
  return (
    <section id="benefits" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <SectionHeading
          align="left"
          eyebrow="Why FinWise"
          title={<>Designed for <span className="gradient-text">clarity</span>, built for you.</>}
          subtitle="Every choice — from typography to the AI's tone — is engineered to reduce cognitive load."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {BENEFITS.map(({ icon: Icon, title, desc }, i) => (
            <GlassCard
              key={title}
              className="hover-lift animate-[fade-up_0.6s_ease-out_both] !p-5"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[oklch(0.68_0.19_260/0.18)] text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-display font-semibold">{title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
