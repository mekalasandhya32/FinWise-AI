import { BadgeCheck, BrainCircuit, TrendingUp, Wallet } from "lucide-react";
import { StatCard } from "@/components/finwise/Card";

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Users guided" value="120K+" delta="↑ 18% this quarter" icon={<TrendingUp className="h-5 w-5" />} />
        <StatCard label="Loans analyzed" value="$2.4B" delta="↑ 9% MoM" icon={<Wallet className="h-5 w-5" />} />
        <StatCard label="Avg. score lift" value="+42" delta="in 90 days" icon={<BadgeCheck className="h-5 w-5" />} />
        <StatCard label="AI accuracy" value="98.6%" delta="benchmarked" icon={<BrainCircuit className="h-5 w-5" />} />
      </div>
    </section>
  );
}
