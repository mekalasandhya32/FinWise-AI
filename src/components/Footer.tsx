import { Link } from "@tanstack/react-router";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/loan-eligibility", label: "Loan Eligibility" },
  { to: "/credit-score", label: "Credit Score" },
  { to: "/emi-calculator", label: "EMI Calculator" },
  { to: "/ai-advisor", label: "AI Advisor" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 md:grid-cols-3">
        <div>
          <p className="text-base font-semibold">
            <span className="text-primary">Fin</span>Wise AI
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Smarter financial decisions, powered by AI.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="text-muted-foreground hover:text-primary">
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-muted-foreground md:text-right">
          © {new Date().getFullYear()} FinWise AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
