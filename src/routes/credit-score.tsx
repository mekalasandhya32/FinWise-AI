import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { BadgeCheck, TrendingUp, ShieldCheck, Activity, Save } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { GlassCard, StatCard } from "@/components/finwise/Card";
import { Input } from "@/components/finwise/Field";
import { Button } from "@/components/finwise/Button";
import { saveCreditAnalysis } from "@/lib/local-store";


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
  const score = 782;
  const min = 300;
  const max = 900;
  const pct = ((score - min) / (max - min)) * 100;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const save = useServerFn(saveCreditAnalysis);

  const persist = async () => {
    setSaving(true);
    try {
      await save({
        data: {
          payload: {
            score,
            paymentHistory: "98%",
            utilization: "22%",
            accountAge: "6.4 yrs",
            recentInquiries: 2,
            risk: "Low",
          },
          user: { name, email },
          status: "analyzed",
        },
      });
      toast.success("Analysis saved to Google Sheets");
    } catch (err) {
      toast.error("Save failed", { description: (err as Error).message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageShell
      eyebrow="Insights"
      title={<>Your <span className="gradient-text">credit score</span>, decoded.</>}
      subtitle="See what drives your score, what's holding it back, and the exact steps that move the needle."
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <GlassCard glow className="relative overflow-hidden !p-8">
          <div className="pointer-events-none absolute inset-0 -z-10 gradient-brand opacity-10" />
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Current score</p>
          <div className="mt-2 flex items-end gap-3">
            <span className="font-display text-7xl font-bold gradient-text leading-none">{score}</span>
            <span className="mb-2 rounded-full bg-[oklch(0.72_0.17_155/0.15)] px-3 py-1 text-xs font-semibold text-[oklch(0.85_0.15_155)]">Excellent</span>
          </div>

          <div className="mt-8">
            <div className="relative h-2.5 rounded-full bg-[oklch(1_0_0/0.06)]">
              <div className="absolute inset-y-0 left-0 rounded-full gradient-brand shadow-glow" style={{ width: `${pct}%` }} />
              <div className="absolute -top-1 h-4.5 w-4.5 -translate-x-1/2 rounded-full border-2 border-background gradient-brand" style={{ left: `${pct}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>Poor · 300</span>
              <span>Fair · 550</span>
              <span>Good · 700</span>
              <span>Excellent · 900</span>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              { label: "Payment history", value: "98%", tone: "success" },
              { label: "Credit utilization", value: "22%", tone: "success" },
              { label: "Account age", value: "6.4 yrs", tone: "success" },
              { label: "Recent inquiries", value: "2", tone: "warning" },
            ].map((f) => (
              <div key={f.label} className="glass rounded-xl p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{f.label}</p>
                <p className="mt-1.5 font-display text-xl font-bold">{f.value}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="flex flex-col gap-4">
          <StatCard label="90-day change" value="+34" delta="↑ improving" icon={<TrendingUp className="h-5 w-5" />} />
          <StatCard label="On-time streak" value="42 mo" delta="never missed" icon={<BadgeCheck className="h-5 w-5" />} />
          <StatCard label="Risk factor" value="Low" icon={<ShieldCheck className="h-5 w-5" />} />
          <GlassCard className="!p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[oklch(0.62_0.22_300/0.18)] text-[oklch(0.85_0.14_300)]"><Activity className="h-4.5 w-4.5" /></span>
              <p className="font-display font-semibold">Next best action</p>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Lower utilization on your primary card below 15% to unlock an estimated +18 points in ~60 days.
            </p>
          </GlassCard>

          <GlassCard className="!p-5">
            <p className="mb-3 font-display font-semibold">Save this analysis</p>
            <div className="grid gap-3">
              <Input label="Your name" placeholder="Ada Lovelace" value={name} onChange={(e) => setName(e.target.value)} />
              <Input label="Email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Button onClick={persist} loading={saving} leftIcon={<Save className="h-4 w-4" />}>
                Save to Google Sheets
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </PageShell>
  );
}
