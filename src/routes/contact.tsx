import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/PageShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — FinWise AI" },
      { name: "description", content: "Get in touch with the FinWise AI team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell
      eyebrow="Support"
      title="Contact us"
      subtitle="Questions, feedback, or partnerships — we'd love to hear from you."
    >
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">Email</p>
        <a href="mailto:hello@finwise.ai" className="mt-1 block text-lg font-medium text-primary">
          hello@finwise.ai
        </a>
      </div>
    </PageShell>
  );
}
