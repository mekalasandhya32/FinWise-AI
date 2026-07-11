import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Briefcase, DollarSign, Percent, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { GlassCard, ResultCard } from "@/components/finwise/Card";
import { Input, Select } from "@/components/finwise/Field";
import { Button } from "@/components/finwise/Button";

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
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
      toast.success("Eligibility check complete", { description: "Sample result — logic wires up next." });
    }, 900);
  };

  return (
    <PageShell
      eyebrow="Tools"
      title={<>Check your <span className="gradient-text">loan eligibility</span> in seconds.</>}
      subtitle="Answer a few questions and get an AI-tuned readiness score for personal, home, or auto loans."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <GlassCard className="!p-7">
          <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
            <Select label="Loan type">
              <option>Personal</option>
              <option>Home</option>
              <option>Auto</option>
            </Select>
            <Input label="Loan amount" type="number" placeholder="25,000" leftIcon={<DollarSign className="h-4 w-4" />} />
            <Input label="Monthly income" type="number" placeholder="6,500" leftIcon={<DollarSign className="h-4 w-4" />} />
            <Input label="Existing EMI" type="number" placeholder="450" leftIcon={<DollarSign className="h-4 w-4" />} />
            <Select label="Employment">
              <option>Salaried</option>
              <option>Self-employed</option>
              <option>Freelancer</option>
            </Select>
            <Input label="Years of employment" type="number" placeholder="3" leftIcon={<Briefcase className="h-4 w-4" />} />

            <div className="sm:col-span-2">
              <Button className="w-full" size="lg" loading={loading} leftIcon={<Sparkles className="h-4 w-4" />}>
                Check eligibility
              </Button>
            </div>
          </form>
        </GlassCard>

        <div className="flex flex-col gap-4">
          {showResult ? (
            <ResultCard
              title="Estimated eligibility"
              value="$42,500"
              status="success"
              breakdown={[
                { label: "Approval odds", value: "High" },
                { label: "Suggested tenure", value: "36 mo" },
                { label: "Est. rate", value: "8.9% p.a." },
                { label: "Monthly EMI", value: "$1,349" },
              ]}
            />
          ) : (
            <GlassCard className="flex h-full flex-col items-start justify-center gap-3 !p-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.68_0.19_260/0.18)] text-primary">
                <Percent className="h-5 w-5" />
              </span>
              <p className="font-display text-lg font-semibold">Your result will appear here</p>
              <p className="text-sm text-muted-foreground">
                Fill in the form to see an instant readiness score, suggested tenure, and estimated rate.
              </p>
            </GlassCard>
          )}
        </div>
      </div>
    </PageShell>
  );
}
