import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowUp, BrainCircuit, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { GlassCard } from "@/components/finwise/Card";
import { Button, Spinner } from "@/components/finwise/Button";

export const Route = createFileRoute("/ai-advisor")({
  head: () => ({
    meta: [
      { title: "AI Advisor — FinWise AI" },
      { name: "description", content: "Chat with an AI-powered financial advisor for personalized guidance." },
    ],
  }),
  component: AiAdvisor,
});

type Msg = { role: "user" | "ai"; text: string };

const SEED: Msg[] = [
  { role: "ai", text: "Hi 👋 I'm your FinWise AI advisor. Ask me anything about loans, credit, budgets, or investing." },
];

const SUGGESTIONS = [
  "How do I improve my credit score fast?",
  "Should I refinance my home loan?",
  "Build me a 6-month savings plan",
  "Explain APR vs APY simply",
];

function AiAdvisor() {
  const [messages, setMessages] = useState<Msg[]>(SEED);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setDraft("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: "This is a UI preview of the AI advisor. Groq integration will land in the next step — every response will include transparent reasoning.",
        },
      ]);
      setThinking(false);
      toast("Response generated", { description: "Preview mode — Groq wires up soon" });
    }, 1100);
  };

  return (
    <PageShell
      eyebrow="AI"
      title={<>Your personal <span className="gradient-text">AI money copilot</span>.</>}
      subtitle="A private, patient advisor that explains its reasoning — powered by Groq's lightning-fast inference (integration coming soon)."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <GlassCard className="flex h-[560px] flex-col !p-0">
          {/* messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex gap-3"}>
                {m.role === "ai" && (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl gradient-brand shadow-glow">
                    <BrainCircuit className="h-4 w-4 text-white" />
                  </span>
                )}
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[80%] rounded-2xl rounded-tr-sm gradient-brand px-4 py-2.5 text-sm text-white shadow-[0_8px_24px_-8px_oklch(0.68_0.19_260/0.7)] animate-[fade-up_0.3s_ease-out]"
                      : "max-w-[80%] rounded-2xl rounded-tl-sm glass px-4 py-2.5 text-sm leading-relaxed animate-[fade-up_0.3s_ease-out]"
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl gradient-brand">
                  <BrainCircuit className="h-4 w-4 text-white" />
                </span>
                <div className="flex items-center gap-2 rounded-2xl glass px-4 py-3 text-xs text-muted-foreground">
                  <Spinner /> Thinking...
                </div>
              </div>
            )}
          </div>

          {/* composer */}
          <div className="border-t border-[oklch(1_0_0/0.08)] p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(draft);
              }}
              className="flex items-center gap-2 glass-strong rounded-2xl p-1.5"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask about loans, credit, budgets, investing..."
                className="flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground/60"
              />
              <Button size="sm" type="submit" leftIcon={<ArrowUp className="h-4 w-4" />}>
                Send
              </Button>
            </form>
          </div>
        </GlassCard>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Try a prompt</p>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="glass hover-lift group w-full rounded-xl p-4 text-left text-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:rotate-12" />
                <span className="text-foreground/90">{s}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
