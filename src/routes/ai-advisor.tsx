import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { toast } from "sonner";
import { ArrowUp, BrainCircuit, Sparkles, RefreshCw, Square } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { GlassCard } from "@/components/finwise/Card";
import { Button, Spinner } from "@/components/finwise/Button";
import { Markdown } from "@/components/finwise/Markdown";

export const Route = createFileRoute("/ai-advisor")({
  head: () => ({
    meta: [
      { title: "AI Advisor — FinWise AI" },
      {
        name: "description",
        content:
          "Chat with FinWise AI — a real-time AI financial advisor for loans, credit, savings, and budgets.",
      },
    ],
  }),
  component: AiAdvisor,
});

const SUGGESTIONS = [
  "How do I improve my credit score fast?",
  "Should I refinance my home loan?",
  "Build me a 6-month savings plan",
  "Explain APR vs APY simply",
];

const WELCOME: UIMessage = {
  id: "welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text:
        "Hi 👋 I'm **FinWise AI**, your financial copilot.\n\nAsk me about **loans, credit scores, savings, budgets, or investing** — I'll explain clearly and give you a concrete plan.",
    },
  ],
};

function extractText(message: UIMessage): string {
  return message.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join("");
}

function AiAdvisor() {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status, stop, error, regenerate, setMessages } = useChat({
    messages: [WELCOME],
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (err) => {
      toast.error("Advisor unavailable", {
        description: err.message || "Please try again in a moment.",
      });
    },
  });

  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  useEffect(() => {
    if (!isBusy) inputRef.current?.focus();
  }, [isBusy]);

  const submit = (text: string) => {
    const value = text.trim();
    if (!value || isBusy) return;
    setInput("");
    void sendMessage({ text: value });
  };

  const clearConversation = () => {
    setMessages([WELCOME]);
    toast("Conversation cleared");
  };

  return (
    <PageShell
      eyebrow="AI"
      title={
        <>
          Your personal <span className="gradient-text">AI money copilot</span>.
        </>
      }
      subtitle="A private, patient advisor that explains its reasoning — powered by Lovable AI streaming inference."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <GlassCard className="flex h-[600px] flex-col !p-0">
          {/* header */}
          <div className="flex items-center justify-between border-b border-[oklch(1_0_0/0.08)] px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl gradient-brand shadow-glow">
                <BrainCircuit className="h-4 w-4 text-white" />
              </span>
              <div>
                <p className="text-sm font-semibold">FinWise Advisor</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {isBusy ? "Thinking…" : "Online"}
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={clearConversation}
              leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
            >
              New chat
            </Button>
          </div>

          {/* messages */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((m) => {
              const text = extractText(m);
              const isUser = m.role === "user";
              return (
                <div key={m.id} className={isUser ? "flex justify-end" : "flex gap-3"}>
                  {!isUser && (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl gradient-brand shadow-glow">
                      <BrainCircuit className="h-4 w-4 text-white" />
                    </span>
                  )}
                  <div
                    className={
                      isUser
                        ? "max-w-[80%] rounded-2xl rounded-tr-sm gradient-brand px-4 py-2.5 text-sm text-white shadow-[0_8px_24px_-8px_oklch(0.68_0.19_260/0.7)] animate-[fade-up_0.3s_ease-out]"
                        : "max-w-[85%] rounded-2xl rounded-tl-sm glass px-4 py-3 animate-[fade-up_0.3s_ease-out]"
                    }
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{text}</p>
                    ) : text ? (
                      <Markdown>{text}</Markdown>
                    ) : (
                      <TypingDots />
                    )}
                  </div>
                </div>
              );
            })}

            {status === "submitted" && (
              <div className="flex gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl gradient-brand">
                  <BrainCircuit className="h-4 w-4 text-white" />
                </span>
                <div className="flex items-center gap-2 rounded-2xl glass px-4 py-3 text-xs text-muted-foreground">
                  <Spinner /> Thinking…
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-xs text-destructive">
                <p className="font-semibold">Advisor error</p>
                <p className="opacity-80">{error.message}</p>
                <button
                  onClick={() => regenerate()}
                  className="mt-2 text-xs font-semibold underline underline-offset-2"
                >
                  Retry
                </button>
              </div>
            )}
          </div>

          {/* composer */}
          <div className="border-t border-[oklch(1_0_0/0.08)] p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit(input);
              }}
              className="flex items-center gap-2 glass-strong rounded-2xl p-1.5"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about loans, credit, budgets, investing…"
                className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/60"
                autoFocus
                disabled={false}
              />
              {isBusy ? (
                <Button
                  size="sm"
                  type="button"
                  variant="secondary"
                  onClick={() => stop()}
                  leftIcon={<Square className="h-3.5 w-3.5" />}
                >
                  Stop
                </Button>
              ) : (
                <Button
                  size="sm"
                  type="submit"
                  leftIcon={<ArrowUp className="h-4 w-4" />}
                  disabled={!input.trim()}
                >
                  Send
                </Button>
              )}
            </form>
            <p className="mt-2 px-2 text-[10px] text-muted-foreground/70">
              Educational guidance only — not licensed financial advice.
            </p>
          </div>
        </GlassCard>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Try a prompt
          </p>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => submit(s)}
              disabled={isBusy}
              className="glass hover-lift group w-full rounded-xl p-4 text-left text-sm transition-all disabled:opacity-50"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:rotate-12" />
                <span className="text-foreground/90">{s}</span>
              </div>
            </button>
          ))}

          <div className="glass rounded-xl p-4 text-xs text-muted-foreground">
            <p className="mb-1 font-semibold text-foreground">What I'm good at</p>
            <ul className="list-disc space-y-1 pl-4">
              <li>Loan eligibility & EMI planning</li>
              <li>Credit score improvement</li>
              <li>Savings & emergency fund strategy</li>
              <li>Monthly budget breakdowns</li>
              <li>Explaining financial jargon</li>
            </ul>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 py-1">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:-0.3s]" />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:-0.15s]" />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
    </div>
  );
}
