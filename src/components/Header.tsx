import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./finwise/Button";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/loan-eligibility", label: "Loans" },
  { to: "/credit-score", label: "Credit" },
  { to: "/emi-calculator", label: "EMI" },
  { to: "/ai-advisor", label: "AI Advisor" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled ? "backdrop-blur-xl bg-[oklch(0.16_0.03_265/0.7)] border-b border-[oklch(1_0_0/0.08)]" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl gradient-brand shadow-glow">
            <Sparkles className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Fin<span className="gradient-text">Wise</span>
            <span className="ml-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">AI</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full glass px-2 py-1.5">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-all hover:text-foreground"
                  activeProps={{
                    className:
                      "rounded-full px-4 py-1.5 text-sm text-white gradient-brand shadow-[0_6px_18px_-8px_oklch(0.68_0.19_260/0.9)]",
                  }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/ai-advisor" className="hidden md:inline-flex">
            <Button size="sm" leftIcon={<Sparkles className="h-4 w-4" />}>
              Try AI
            </Button>
          </Link>
          <button
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="glass flex h-10 w-10 items-center justify-center rounded-xl lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="lg:hidden animate-[fade-up_0.25s_ease-out]">
          <ul className="mx-4 mb-4 flex flex-col gap-1 glass-strong rounded-2xl p-3">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-[oklch(1_0_0/0.05)] hover:text-foreground"
                  activeProps={{
                    className: "block rounded-xl px-4 py-3 text-sm text-white gradient-brand font-medium",
                  }}
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
