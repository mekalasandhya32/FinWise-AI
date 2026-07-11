import { Link } from "@tanstack/react-router";
import { Github, Sparkles, Twitter, Linkedin, Mail } from "lucide-react";

const COLS = [
  {
    title: "Product",
    links: [
      { to: "/loan-eligibility", label: "Loan Eligibility" },
      { to: "/credit-score", label: "Credit Score" },
      { to: "/emi-calculator", label: "EMI Calculator" },
      { to: "/ai-advisor", label: "AI Advisor" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative mt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.68_0.19_260/0.5)] to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-brand shadow-glow">
                <Sparkles className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-bold">
                Fin<span className="gradient-text">Wise</span> AI
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A premium AI copilot for personal finance — clear loan insights, smarter credit, effortless planning.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Github, label: "GitHub" },
                { icon: Mail, label: "Email" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="glass flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-all hover:text-foreground hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Newsletter
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Weekly finance insights, no fluff.
            </p>
            <form className="mt-4 flex gap-2 glass rounded-xl p-1.5">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground/60"
              />
              <button
                type="button"
                className="gradient-brand rounded-lg px-4 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-[oklch(1_0_0/0.06)] pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} FinWise AI. Crafted with precision.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
