import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

const FEATURES = [
  {
    to: "/loan-eligibility",
    title: "Loan Eligibility",
    desc: "Instantly see if you qualify for personal, home, or auto loans.",
  },
  {
    to: "/credit-score",
    title: "Credit Score",
    desc: "Understand what drives your score and how to improve it.",
  },
  {
    to: "/emi-calculator",
    title: "EMI Calculator",
    desc: "Plan monthly payments with precise, tax-aware estimates.",
  },
  {
    to: "/ai-advisor",
    title: "AI Advisor",
    desc: "Chat with an AI-powered advisor for personalized guidance.",
  },
] as const;

function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-20 text-center">
        <p className="mb-4 inline-block rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          AI-powered personal finance
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Smarter money decisions with{" "}
          <span className="text-primary">FinWise AI</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          Loans, credit, EMI planning, and a personal AI advisor — all in one clean,
          professional workspace.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/ai-advisor"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            Talk to AI Advisor
          </Link>
          <Link
            to="/emi-calculator"
            className="rounded-md border border-input bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            Try EMI Calculator
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <Link
              key={f.to}
              to={f.to}
              className="group rounded-xl border border-border bg-card p-5 text-card-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <h3 className="text-base font-semibold group-hover:text-primary">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              <span className="mt-4 inline-block text-sm font-medium text-primary">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
