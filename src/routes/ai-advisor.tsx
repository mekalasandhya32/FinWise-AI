import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonCard, PageShell } from "../components/PageShell";

export const Route = createFileRoute("/ai-advisor")({
  head: () => ({
    meta: [
      { title: "AI Advisor — FinWise AI" },
      { name: "description", content: "Chat with an AI-powered financial advisor for personalized guidance." },
    ],
  }),
  component: AiAdvisor,
});

function AiAdvisor() {
  return (
    <PageShell
      eyebrow="AI"
      title="AI Financial Advisor"
      subtitle="Ask questions about budgeting, debt, investing, and planning. Powered by Groq (integration coming soon)."
    >
      <ComingSoonCard note="The chat interface and Groq API integration will follow." />
    </PageShell>
  );
}
