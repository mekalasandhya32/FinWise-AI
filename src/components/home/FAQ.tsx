import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

const FAQS = [
  { q: "Is FinWise AI free to use?", a: "Yes — core tools like the EMI calculator, credit insights, and AI advisor are free. Premium features are optional." },
  { q: "Do you check my credit score?", a: "We never perform a hard credit pull. Any score you see is based on information you provide or securely linked accounts." },
  { q: "How does the AI advisor work?", a: "It uses a Groq-powered large language model tuned for personal finance. Every recommendation includes its reasoning." },
  { q: "Is my data private?", a: "Absolutely. Your data is encrypted end-to-end and never used to train public models." },
  { q: "Which loan types are supported?", a: "Personal, home, auto, education, business, and travel loans — with region-aware rate estimates." },
  { q: "Can I import from my bank?", a: "Yes, with read-only integrations via trusted aggregators. You stay in control at every step." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-4xl px-5 py-20 md:px-8 md:py-24">
      <SectionHeading
        eyebrow="FAQ"
        title={<>Questions? <span className="gradient-text">Answered.</span></>}
        subtitle="Everything you might want to know before you dive in."
      />

      <div className="mt-14 flex flex-col gap-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className={cn(
                "glass overflow-hidden rounded-2xl transition-all duration-300",
                isOpen && "shadow-glow",
              )}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-display text-sm font-semibold md:text-base">{f.q}</span>
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full glass-strong transition-transform duration-300",
                    isOpen && "rotate-45 gradient-brand text-white",
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <div
                className={cn(
                  "grid transition-all duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
