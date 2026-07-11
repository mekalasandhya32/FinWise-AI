import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonCard, PageShell } from "../components/PageShell";

export const Route = createFileRoute("/credit-score")({
  head: () => ({
    meta: [
      { title: "Credit Score — FinWise AI" },
      { name: "description", content: "Understand and improve your credit score with actionable insights." },
    ],
  }),
  component: CreditScore,
});

function CreditScore() {
  return (
    <PageShell
      eyebrow="Insights"
      title="Credit Score"
      subtitle="See what drives your credit score and get concrete steps to improve it."
    >
      <ComingSoonCard note="Score modeling and factor breakdown will be added next." />
    </PageShell>
  );
}
