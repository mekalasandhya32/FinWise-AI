import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Briefcase, DollarSign, Sparkles, User, Calendar, TrendingDown,
  Wallet, Target, Clock, ShieldCheck, ShieldAlert, CheckCircle2, XCircle,
  Lightbulb, Info,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { GlassCard } from "@/components/finwise/Card";
import { Input, Select } from "@/components/finwise/Field";
import { Button } from "@/components/finwise/Button";
import { saveLoanApplication } from "@/lib/local-store";

import {
  evaluateLoan, validateLoanInput,
  type LoanInput, type LoanResult, type EmploymentType, type LoanPurpose,
} from "@/lib/loan-eligibility";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/loan-eligibility")({
  head: () => ({
    meta: [
      { title: "Loan Eligibility Checker — FinWise AI" },
      { name: "description", content: "Check your loan eligibility with an AI-tuned rule engine: DTI, disposable income, EMI, and risk score." },
    ],
  }),
  component: LoanEligibility,
});

const EMPLOYMENT_OPTIONS: EmploymentType[] = ["Salaried", "Self-employed", "Freelancer", "Business", "Student"];
const PURPOSE_OPTIONS: LoanPurpose[] = ["Personal", "Home", "Auto", "Education", "Business", "Medical"];

function LoanEligibility() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LoanResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const save = useServerFn(saveLoanApplication);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") || "").trim();

    const input: LoanInput = {
      name: String(f.get("name") || "").trim(),
      age: Number(f.get("age") || 0),
      income: Number(f.get("income") || 0),
      expenses: Number(f.get("expenses") || 0),
      existingEmi: Number(f.get("existingEmi") || 0),
      employmentType: (f.get("employmentType") as EmploymentType) || "Salaried",
      workExperience: Number(f.get("workExperience") || 0),
      loanAmount: Number(f.get("loanAmount") || 0),
      loanTenure: Number(f.get("loanTenure") || 0),
      loanPurpose: (f.get("loanPurpose") as LoanPurpose) || "Personal",
    };

    const validation = validateLoanInput(input);
    if (validation.length) {
      const map: Record<string, string> = {};
      validation.forEach((v) => (map[v.field] = v.message));
      setErrors(map);
      setResult(null);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const evaluation = evaluateLoan(input);
      setResult(evaluation);

      // Best-effort save; do not block UX on sheets failure
      try {
        await save({
          data: {
            payload: {
              loanType: input.loanPurpose,
              loanAmount: input.loanAmount,
              monthlyIncome: input.income,
              existingEmi: input.existingEmi,
              employment: input.employmentType,
              yearsEmployed: input.workExperience,
            },
            user: { name: input.name, email },
            status: evaluation.eligible ? "eligible" : "not_eligible",
          },
        });
        toast.success(evaluation.eligible ? "You look eligible!" : "Analysis complete", {
          description: "Results saved to Google Sheets.",
        });
      } catch (err) {
        toast.message("Result ready", { description: "Sheets save skipped: " + (err as Error).message });
      }
    } catch (err) {
      toast.error("Could not evaluate", { description: (err as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell
      eyebrow="Loan Eligibility Checker"
      title={<>Find out if you <span className="gradient-text">qualify</span> — in seconds.</>}
      subtitle="Our rule-based engine analyzes your income, expenses, existing debt, and profile to give you an eligibility score, risk level, and personalised recommendations."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
        <GlassCard className="!p-7">
          <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
            <Input label="Full name" name="name" placeholder="Ada Lovelace" leftIcon={<User className="h-4 w-4" />} error={errors.name} required />
            <Input label="Email (for records)" name="email" type="email" placeholder="you@email.com" />
            <Input label="Age" name="age" type="number" min={18} max={75} placeholder="28" leftIcon={<Calendar className="h-4 w-4" />} error={errors.age} required />

            <Select label="Employment type" name="employmentType" error={errors.employmentType} required>
              {EMPLOYMENT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </Select>

            <Input label="Monthly income" name="income" type="number" min={0} placeholder="6500" leftIcon={<DollarSign className="h-4 w-4" />} error={errors.income} required />
            <Input label="Monthly expenses" name="expenses" type="number" min={0} placeholder="2200" leftIcon={<Wallet className="h-4 w-4" />} error={errors.expenses} required />
            <Input label="Existing EMI (total)" name="existingEmi" type="number" min={0} placeholder="450" leftIcon={<TrendingDown className="h-4 w-4" />} error={errors.existingEmi} required />
            <Input label="Work experience (years)" name="workExperience" type="number" min={0} placeholder="4" leftIcon={<Briefcase className="h-4 w-4" />} error={errors.workExperience} required />

            <Input label="Loan amount" name="loanAmount" type="number" min={0} placeholder="25000" leftIcon={<Target className="h-4 w-4" />} error={errors.loanAmount} required />
            <Input label="Loan tenure (months)" name="loanTenure" type="number" min={3} max={360} placeholder="36" leftIcon={<Clock className="h-4 w-4" />} error={errors.loanTenure} required />

            <Select label="Loan purpose" name="loanPurpose" className="sm:col-span-2" error={errors.loanPurpose} required>
              {PURPOSE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </Select>

            <div className="sm:col-span-2">
              <Button className="w-full" size="lg" loading={loading} leftIcon={<Sparkles className="h-4 w-4" />}>
                Check my eligibility
              </Button>
            </div>
          </form>
        </GlassCard>

        <div className="flex flex-col gap-4">
          {result ? <ResultView result={result} /> : <EmptyState />}
        </div>
      </div>
    </PageShell>
  );
}

function EmptyState() {
  return (
    <GlassCard className="flex h-full flex-col items-start justify-center gap-3 !p-8">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.68_0.19_260/0.18)] text-primary">
        <Info className="h-5 w-5" />
      </span>
      <p className="font-display text-lg font-semibold">Your eligibility report will appear here</p>
      <p className="text-sm text-muted-foreground">
        Fill in the form on the left. We compute DTI, disposable income, estimated EMI, and a risk-adjusted score using a transparent rule engine.
      </p>
      <ul className="mt-2 grid gap-2 text-xs text-muted-foreground">
        <li>• Debt-to-Income (DTI) ratio</li>
        <li>• Disposable income after obligations</li>
        <li>• Estimated EMI at purpose-specific rate</li>
        <li>• Eligibility score (0–100) & risk band</li>
      </ul>
    </GlassCard>
  );
}

function ResultView({ result }: { result: LoanResult }) {
  const dtiPct = Math.min(100, result.dtiRatio * 100);
  const riskColor = {
    Low: "text-[oklch(0.85_0.15_155)] bg-[oklch(0.72_0.17_155/0.15)]",
    Moderate: "text-[oklch(0.85_0.14_80)] bg-[oklch(0.80_0.16_80/0.15)]",
    High: "text-[oklch(0.85_0.14_40)] bg-[oklch(0.80_0.16_40/0.15)]",
    "Very High": "text-[oklch(0.85_0.18_22)] bg-[oklch(0.65_0.24_22/0.15)]",
  }[result.risk];

  return (
    <div className="flex flex-col gap-4 animate-[fade-up_0.5s_ease-out]">
      {/* Verdict card */}
      <GlassCard glow className="relative overflow-hidden !p-7">
        <div className="absolute inset-0 -z-10 gradient-brand opacity-10" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Verdict</p>
            <p className={cn(
              "mt-2 flex items-center gap-2 font-display text-3xl font-bold",
              result.eligible ? "gradient-text" : "text-[oklch(0.85_0.18_22)]",
            )}>
              {result.eligible ? <CheckCircle2 className="h-7 w-7" /> : <XCircle className="h-7 w-7" />}
              {result.eligible ? "Eligible" : "Not eligible"}
            </p>
          </div>
          <span className={cn("rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest", riskColor)}>
            {result.risk} risk
          </span>
        </div>

        {/* Score progress */}
        <div className="mt-6">
          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Eligibility score</span>
            <span className="font-display text-2xl font-bold">{result.score}<span className="text-sm text-muted-foreground">/100</span></span>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[oklch(1_0_0/0.08)]">
            <div
              className="h-full rounded-full gradient-brand transition-[width] duration-700 ease-out"
              style={{ width: `${result.score}%` }}
            />
          </div>
        </div>

        <dl className="mt-6 grid gap-3 border-t border-border pt-4 sm:grid-cols-2 text-sm">
          <Row label="Estimated EMI" value={`$${result.estimatedEmi.toLocaleString()}/mo`} />
          <Row label="Interest rate" value={`${result.interestRate.toFixed(1)}% p.a.`} />
          <Row label="Disposable income" value={`$${result.disposableIncome.toLocaleString()}`} />
          <Row label="Debt-to-Income" value={`${(result.dtiRatio * 100).toFixed(1)}%`} />
          <Row label="Max safe borrowing" value={`$${result.maxEligibleAmount.toLocaleString()}`} />
        </dl>

        {/* DTI progress bar */}
        <div className="mt-5">
          <div className="flex items-baseline justify-between text-xs text-muted-foreground">
            <span>DTI utilization</span>
            <span>{dtiPct.toFixed(0)}% of income</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[oklch(1_0_0/0.08)]">
            <div
              className={cn(
                "h-full rounded-full transition-[width] duration-700",
                dtiPct <= 40 ? "bg-[oklch(0.72_0.17_155)]" : dtiPct <= 55 ? "bg-[oklch(0.80_0.16_80)]" : "bg-[oklch(0.65_0.24_22)]",
              )}
              style={{ width: `${dtiPct.toFixed(2)}%` }}
            />
          </div>
        </div>
      </GlassCard>

      {/* Reasons */}
      <GlassCard>
        <div className="flex items-center gap-2">
          {result.eligible
            ? <ShieldCheck className="h-4 w-4 text-[oklch(0.85_0.15_155)]" />
            : <ShieldAlert className="h-4 w-4 text-[oklch(0.85_0.18_22)]" />}
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest">Why</h3>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {result.reasons.map((r, i) => (
            <li key={i} className="flex gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />{r}</li>
          ))}
        </ul>
      </GlassCard>

      {/* Recommendations */}
      <GlassCard>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-[oklch(0.85_0.14_80)]" />
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest">Recommendations</h3>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {result.recommendations.map((r, i) => (
            <li key={i} className="flex gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full gradient-brand" />{r}</li>
          ))}
        </ul>
      </GlassCard>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}
