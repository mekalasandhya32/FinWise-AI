import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake, Shield, Sparkles, Target } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { FeatureCard, GlassCard } from "@/components/finwise/Card";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — FinWise AI" },
      { name: "description", content: "FinWise AI helps you make smarter financial decisions with AI-driven insights." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell
      eyebrow="Company"
      title={<>Financial clarity, <span className="gradient-text">reimagined</span> with AI.</>}
      subtitle="We combine transparent math, calm design, and AI that explains itself — so everyday people can make confident financial decisions."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureCard icon={<Target className="h-6 w-6" />} title="Our mission" description="Make personal finance genuinely useful, understandable, and accessible to everyone." accent="blue" />
        <FeatureCard icon={<Shield className="h-6 w-6" />} title="Private by default" description="No credit-pulls to explore. Your data stays yours, always encrypted." accent="purple" />
        <FeatureCard icon={<Sparkles className="h-6 w-6" />} title="Transparent AI" description="Every recommendation includes the reasoning that produced it." accent="blue" />
        <FeatureCard icon={<HeartHandshake className="h-6 w-6" />} title="Human-first" description="We measure success in decisions our users feel good about — not clicks." accent="purple" />
      </div>

      <GlassCard className="mt-10 !p-10 md:!p-14">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold md:text-3xl">The FinWise principles</h2>
          <ol className="mt-6 space-y-4 text-muted-foreground">
            {[
              "Clarity over cleverness — every number is explained.",
              "Speed over surveillance — real-time answers without data harvesting.",
              "Honest defaults — the recommended path is the one we'd take ourselves.",
              "Design that respects attention — no dark patterns, ever.",
            ].map((line, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg gradient-brand text-xs font-bold text-white">{i + 1}</span>
                <span className="leading-relaxed">{line}</span>
              </li>
            ))}
          </ol>
        </div>
      </GlassCard>
    </PageShell>
  );
}
