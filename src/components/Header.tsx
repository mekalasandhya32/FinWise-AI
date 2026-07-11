import { Link } from "@tanstack/react-router";
import { useState } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/loan-eligibility", label: "Loan Eligibility" },
  { to: "/credit-score", label: "Credit Score" },
  { to: "/emi-calculator", label: "EMI Calculator" },
  { to: "/ai-advisor", label: "AI Advisor" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="text-lg font-bold tracking-tight">
          <span className="text-primary">Fin</span>Wise AI
        </Link>

        <button
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="rounded-md p-2 md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block h-0.5 w-5 bg-foreground" />
          <span className="mt-1 block h-0.5 w-5 bg-foreground" />
          <span className="mt-1 block h-0.5 w-5 bg-foreground" />
        </button>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-foreground/80 transition-colors hover:text-primary"
                  activeProps={{ className: "text-primary font-medium" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-border bg-background md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3 text-sm">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2 hover:bg-accent"
                  activeProps={{ className: "text-primary font-medium" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
