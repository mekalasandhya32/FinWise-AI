import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MessageCircle, Send, User } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { GlassCard } from "@/components/finwise/Card";
import { Input, Textarea } from "@/components/finwise/Field";
import { Button } from "@/components/finwise/Button";

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
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent", { description: "We'll get back to you within 24 hours." });
    }, 900);
  };

  return (
    <PageShell
      eyebrow="Support"
      title={<>Let's <span className="gradient-text">talk</span>.</>}
      subtitle="Questions, feedback, or partnerships — we usually reply within a business day."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <GlassCard className="!p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-brand"><Mail className="h-4.5 w-4.5 text-white" /></span>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Email</p>
                <a href="mailto:hello@finwise.ai" className="font-display text-base font-semibold">hello@finwise.ai</a>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="!p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.62_0.22_300/0.2)] text-[oklch(0.85_0.14_300)]"><MessageCircle className="h-4.5 w-4.5" /></span>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Live chat</p>
                <p className="font-display text-base font-semibold">Mon–Fri, 9am–6pm</p>
              </div>
            </div>
          </GlassCard>
        </div>

        <GlassCard className="!p-7">
          <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
            <Input label="Name" placeholder="Jane Doe" leftIcon={<User className="h-4 w-4" />} />
            <Input label="Email" type="email" placeholder="jane@company.com" leftIcon={<Mail className="h-4 w-4" />} />
            <Input className="sm:col-span-2" label="Subject" placeholder="How can we help?" />
            <Textarea className="sm:col-span-2" label="Message" placeholder="Tell us a bit more..." />
            <div className="sm:col-span-2">
              <Button className="w-full" size="lg" loading={loading} rightIcon={<Send className="h-4 w-4" />}>
                Send message
              </Button>
            </div>
          </form>
        </GlassCard>
      </div>
    </PageShell>
  );
}
