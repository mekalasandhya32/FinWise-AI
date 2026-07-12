import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { Features } from "@/components/home/Features";
import { Services } from "@/components/home/Services";
import { Benefits } from "@/components/home/Benefits";
import { FinancialCards } from "@/components/home/FinancialCards";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FinWise AI — Smarter money decisions, engineered by AI" },
      {
        name: "description",
        content:
          "AI-powered loan eligibility, credit insights, EMI planning, and a personal financial advisor — unified in one beautifully simple workspace.",
      },
      { property: "og:title", content: "FinWise AI — Smarter money decisions, engineered by AI" },
      {
        property: "og:description",
        content:
          "Loan checks, credit insights, EMI planning, and an AI advisor — one calm interface for smarter money decisions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <Services />
      <Benefits />
      <FinancialCards />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
