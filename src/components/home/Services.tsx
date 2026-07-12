import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, Car, GraduationCap, Home, PiggyBank, Plane } from "lucide-react";
import { GlassCard } from "@/components/finwise/Card";
import { SectionHeading } from "./SectionHeading";

const SERVICES = [
  { icon: Home, title: "Home Loans", desc: "Finance your dream home with tailored rates and flexible tenures." },
  { icon: Car, title: "Auto Loans", desc: "Drive off the lot with competitive vehicle financing options." },
  { icon: GraduationCap, title: "Education Loans", desc: "Invest in your future — undergrad, grad, or upskilling." },
  { icon: Building2, title: "Business Loans", desc: "Fuel growth with working-capital and expansion funding." },
  { icon: PiggyBank, title: "Personal Loans", desc: "Consolidate debt or fund life's moments with one clean loan." },
  { icon: Plane, title: "Travel Loans", desc: "Turn wanderlust into reality with easy travel financing." },
];

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
      <SectionHeading
        eyebrow="Services"
        title={<>Every loan, <span className="gradient-text">one place</span>.</>}
        subtitle="Compare, plan, and apply across categories with AI guidance at every step."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(({ icon: Icon, title, desc }, i) => (
          <GlassCard
            key={title}
            interactive
            className="group animate-[fade-up_0.6s_ease-out_both]"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl gradient-brand shadow-glow transition-transform group-hover:scale-110">
                <Icon className="h-5 w-5 text-white" />
              </span>
              <Link
                to="/loan-eligibility"
                className="flex h-9 w-9 items-center justify-center rounded-full glass text-muted-foreground transition-all group-hover:text-primary group-hover:-translate-y-0.5"
                aria-label={`Explore ${title}`}
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
