import { Quote, Star } from "lucide-react";
import { GlassCard } from "@/components/finwise/Card";
import { SectionHeading } from "./SectionHeading";

const TESTIMONIALS = [
  {
    quote: "FinWise's AI advisor spotted a refinance opportunity that saved me $1,240 a year. It felt like having a private banker.",
    name: "Priya Sharma",
    role: "Product Designer",
    avatar: "PS",
  },
  {
    quote: "The EMI calculator is elegant, and the credit insights are actually actionable. I lifted my score by 46 points in 3 months.",
    name: "Daniel Cho",
    role: "Software Engineer",
    avatar: "DC",
  },
  {
    quote: "I finally understand my loans. The interface is calm, the math is transparent, and the recommendations make sense.",
    name: "Amelia Rossi",
    role: "Small Business Owner",
    avatar: "AR",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
      <SectionHeading
        eyebrow="Testimonials"
        title={<>Loved by people who <span className="gradient-text">think in numbers</span>.</>}
        subtitle="From first-time borrowers to seasoned investors."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <GlassCard
            key={t.name}
            className="relative flex flex-col justify-between animate-[fade-up_0.6s_ease-out_both]"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/25" />
            <div className="flex gap-0.5 text-[oklch(0.85_0.14_80)]">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-brand text-sm font-bold text-white">
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
