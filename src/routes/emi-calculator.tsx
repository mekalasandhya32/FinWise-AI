import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Calculator, DollarSign, Percent, Save } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { GlassCard, ResultCard } from "@/components/finwise/Card";
import { Input } from "@/components/finwise/Field";
import { Button } from "@/components/finwise/Button";
import { saveEmiCalculation } from "@/lib/sheets.functions";

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
  const [amount, setAmount] = useState(25000);
  const [rate, setRate] = useState(9.5);
  const [months, setMonths] = useState(36);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const save = useServerFn(saveEmiCalculation);

  const { emi, total, interest } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = months;
    const p = amount;
    const emi = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    return { emi, total, interest: total - p };
  }, [amount, rate, months]);

  const fmt = (v: number) =>
    v.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <PageShell
      eyebrow="Tools"
      title={<>The clearest <span className="gradient-text">EMI calculator</span> you'll ever use.</>}
      subtitle="Adjust the sliders — see your monthly installment, total interest, and payoff timeline update instantly."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <GlassCard className="!p-7">
          <div className="grid gap-5">
            <Input
              label="Loan amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              leftIcon={<DollarSign className="h-4 w-4" />}
            />
            <div>
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Interest rate: <span className="text-foreground">{rate.toFixed(2)}%</span></label>
              <input
                type="range" min={1} max={24} step={0.1}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="mt-3 w-full accent-primary"
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Tenure: <span className="text-foreground">{months} months</span></label>
              <input
                type="range" min={6} max={240} step={1}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="mt-3 w-full accent-primary"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Input label="Your name" placeholder="Ada Lovelace" value={name} onChange={(e) => setName(e.target.value)} />
              <Input label="Email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <Button
              size="lg"
              loading={saving}
              leftIcon={<Save className="h-4 w-4" />}
              onClick={async () => {
                setSaving(true);
                try {
                  await save({
                    data: {
                      payload: { loanAmount: amount, rate, months, emi, totalInterest: interest, totalPayable: total },
                      user: { name, email },
                      status: "calculated",
                    },
                  });
                  toast.success("EMI saved", { description: `${fmt(emi)} / month logged to Sheets.` });
                } catch (err) {
                  toast.error("Save failed", { description: (err as Error).message });
                } finally {
                  setSaving(false);
                }
              }}
            >
              Save to Google Sheets
            </Button>
          </div>
        </GlassCard>

        <div className="flex flex-col gap-4">
          <ResultCard
            title="Monthly EMI"
            value={fmt(emi)}
            status="success"
            breakdown={[
              { label: "Total interest", value: fmt(interest) },
              { label: "Total payable", value: fmt(total) },
              { label: "Principal", value: fmt(amount) },
              { label: "Tenure", value: `${months} mo` },
            ]}
          />
          <GlassCard className="!p-5">
            <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-2"><Calculator className="h-3.5 w-3.5" /> Payoff breakdown</span>
              <span className="flex items-center gap-2"><Percent className="h-3.5 w-3.5" /> Live</span>
            </div>
            <div className="flex h-3 overflow-hidden rounded-full bg-[oklch(1_0_0/0.06)]">
              <div className="gradient-brand" style={{ width: `${((amount / total) * 100).toFixed(2)}%` }} />
              <div className="bg-[oklch(0.62_0.22_300/0.5)]" style={{ width: `${((interest / total) * 100).toFixed(2)}%` }} />
            </div>
            <div className="mt-3 flex justify-between text-xs text-muted-foreground">
              <span>Principal {Math.round((amount / total) * 100)}%</span>
              <span>Interest {Math.round((interest / total) * 100)}%</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </PageShell>
  );
}
