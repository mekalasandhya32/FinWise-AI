import { CreditCard, Wifi } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

type CardTheme = { grad: string; label: string; holder: string; number: string; tag: string };

const CARDS: CardTheme[] = [
  {
    grad: "linear-gradient(135deg, oklch(0.68 0.19 260), oklch(0.62 0.22 300))",
    label: "Platinum",
    holder: "ALEX MORGAN",
    number: "•••• 4821",
    tag: "Rewards 5×",
  },
  {
    grad: "linear-gradient(135deg, oklch(0.28 0.06 265), oklch(0.16 0.03 265))",
    label: "Obsidian",
    holder: "ALEX MORGAN",
    number: "•••• 7745",
    tag: "0% APR",
  },
  {
    grad: "linear-gradient(135deg, oklch(0.72 0.17 155), oklch(0.62 0.22 300))",
    label: "Aurora",
    holder: "ALEX MORGAN",
    number: "•••• 1130",
    tag: "Cashback 3%",
  },
];

function Card({ card, i }: { card: CardTheme; i: number }) {
  return (
    <div
      className="group relative aspect-[1.6/1] w-full max-w-sm rounded-3xl p-6 shadow-elegant transition-transform duration-500 hover:-translate-y-2 hover:rotate-0 animate-[fade-up_0.7s_ease-out_both]"
      style={{
        background: card.grad,
        transform: `rotate(${(i - 1) * 3}deg)`,
        animationDelay: `${i * 120}ms`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_20%_10%,oklch(1_0_0/0.25),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/15" />

      <div className="relative flex h-full flex-col justify-between text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] opacity-70">FinWise</p>
            <p className="mt-1 font-display text-lg font-bold">{card.label}</p>
          </div>
          <Wifi className="h-5 w-5 rotate-90 opacity-80" />
        </div>

        <div>
          <div className="mb-4 h-8 w-11 rounded-md bg-gradient-to-br from-white/70 to-white/30" />
          <p className="font-mono text-lg tracking-widest">{card.number}</p>
          <div className="mt-3 flex items-end justify-between text-xs">
            <span className="opacity-80">{card.holder}</span>
            <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold backdrop-blur">
              {card.tag}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FinancialCards() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <SectionHeading
          align="left"
          eyebrow="Cards & Wallets"
          title={<>Manage every card <span className="gradient-text">in one wallet</span>.</>}
          subtitle="Beautiful, secure card tracking. See balances, spends, and perks across all your accounts."
        />

        <div className="relative flex items-center justify-center">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_50%,oklch(0.62_0.22_300/0.35),transparent_60%)] blur-3xl" />
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-3">
            {CARDS.map((c, i) => (
              <Card key={c.label} card={c} i={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-70">
        {["VISA", "Mastercard", "Amex", "Discover", "UnionPay", "RuPay"].map((n) => (
          <span key={n} className="flex items-center gap-2 text-sm font-semibold tracking-wider text-muted-foreground">
            <CreditCard className="h-4 w-4" />
            {n}
          </span>
        ))}
      </div>
    </section>
  );
}
