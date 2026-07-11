import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonCard, PageShell } from "../components/PageShell";

export const Route = createFileRoute("/loan-eligibility")({
  head: () => ({
    meta: [
      { title: "Loan Eligibility — FinWise AI" },
      { name: "description", content: "Check your eligibility for personal, home, and auto loans." },
    ],
  }),
  component: LoanEligibility,
});

function LoanEligibility() {
  return (
    <PageShell
      eyebrow="Tools"
      title="Loan Eligibility"
      subtitle="Instantly check whether you qualify for personal, home, and auto loans based on income, obligations, and credit profile."
    >
      <ComingSoonCard note="The eligibility engine will be wired up in the next step." />
    </PageShell>
  );
}
