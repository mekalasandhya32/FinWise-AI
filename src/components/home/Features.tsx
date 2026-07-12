import { Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  BrainCircuit,
  Calculator,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { FeatureCard } from "@/components/finwise/Card";
import { SectionHeading } from "./SectionHeading";

const FEATURES = [
  { to: "/loan-eligibility", icon: <Wallet className="h-6 w-6" />, title: "Loan Eligibility", desc: "AI-tuned scoring for personal, home, and auto loans, in seconds.", accent: "blue" as const },
  { to: "/credit-score", icon: <BadgeCheck className="h-6 w-6" />, title: "Credit Score", desc: "See what drives your score and unlock steps to improve it.", accent: "purple" as const },
  { to: "/emi-calculator", icon: <Calculator className="h-6 w-6" />, title: "EMI Calculator", desc: "Plan installments with precise, tax-aware, real-time estimates.", accent: "blue" as const },
  { to: "/ai-advisor", icon: <BrainCircuit className="h-6 w-6" />, title: "AI Advisor", desc: "Chat with a Groq-powered advisor that explains its reasoning.", accent: "purple" as const },
  { to: "/", icon: <ShieldCheck className="h-6 w-6" />, title: "Secure Vault", desc: "Bank-grade encryption keeps your finances private, always.", accent: "blue" as const },
  { to: "/", icon: <Sparkles className="h-6 w-6" />, title: "Smart Alerts", desc: "Get proactive nudges when the market changes in your favor.", accent: "purple" as const },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
      <SectionHeading
        eyebrow="Everything you need"
        title={<>A complete <span className="gradient-text">financial toolkit</span>.</>}
        subtitle="Six essential modules, one calm interface. Move seamlessly between decisions."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <Link
            key={f.title}
            to={f.to}
            className="block animate-[fade-up_0.6s_ease-out_both]"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <FeatureCard icon={f.icon} title={f.title} description={f.desc} accent={f.accent} />
          </Link>
        ))}
      </div>
    </section>
  );
}
