import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/PageShell";

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
      title="About FinWise AI"
      subtitle="We combine clean design, transparent math, and AI to help everyday people make confident financial decisions."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Our mission</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Make personal finance tools accessible, understandable, and genuinely useful.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">How we work</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Transparent formulas, private-by-default data, and AI that explains its reasoning.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
