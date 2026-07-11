import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonCard, PageShell } from "../components/PageShell";

export const Route = createFileRoute("/emi-calculator")({
  head: () => ({
    meta: [
      { title: "EMI Calculator — FinWise AI" },
      { name: "description", content: "Estimate monthly installments for any loan amount, rate, and tenure." },
    ],
  }),
  component: EmiCalculator,
});

function EmiCalculator() {
  return (
    <PageShell
      eyebrow="Tools"
      title="EMI Calculator"
      subtitle="Estimate monthly installments for any loan amount, interest rate, and tenure."
    >
      <ComingSoonCard note="The interactive calculator UI will land in the next step." />
    </PageShell>
  );
}
