# Milestone 3 — Project Design Phase

## High-Level Architecture

```
                ┌────────────────────────────────────────────┐
                │            Browser (React 19)              │
                │   TanStack Router · Tailwind v4 · Glass UI │
                └──────────────┬─────────────────────────────┘
                               │  HTTPS
                ┌──────────────┴─────────────────────────────┐
                │        TanStack Start Server (SSR)         │
                │  /api/chat  ·  server functions (RPC)      │
                └──────┬───────────────────────┬─────────────┘
                       │                       │
                       ▼                       ▼
             ┌──────────────────┐   ┌────────────────────────┐
             │ Lovable AI /     │   │  Google Apps Script    │
             │ Claude (stream)  │   │  Web App (webhook)     │
             └──────────────────┘   └───────────┬────────────┘
                                                ▼
                                    ┌───────────────────────┐
                                    │   Google Sheets DB    │
                                    │  Loans / Credit / EMI │
                                    └───────────────────────┘
```

## Module Design

| Module | Route | Component tree | Server surface |
|--------|-------|----------------|----------------|
| Home | `/` | `Hero → Features → Services → Stats → Benefits → Cards → HowItWorks → Testimonials → FAQ → CTA` | — |
| Loan Eligibility | `/loan-eligibility` | Form + Result cards | `saveLoanApplication` |
| Credit Score | `/credit-score` | Meter + factor cards | `saveCreditAnalysis` |
| EMI Calculator | `/emi-calculator` | Sliders + split chart | `saveEmiCalculation` |
| AI Advisor | `/ai-advisor` | Chat UI (`useChat`) | `/api/chat` (streaming) |
| About | `/about` | Static content | — |
| Contact | `/contact` | Form | — |

## Data Model — Google Sheets

**LoanApplications**
`Timestamp | Name | Email | Age | Income | Expenses | ExistingEMI | Employment | Experience | LoanAmount | Tenure | Purpose | EstimatedEMI | DTI | Score | Risk | Verdict`

**CreditAnalyses**
`Timestamp | Name | Email | PaymentHistory | Utilization | Age | Mix | Inquiries | Score | Grade`

**EmiCalculations**
`Timestamp | Name | Email | Principal | Rate | Tenure | EMI | TotalInterest | TotalPayable`

## Design System
- **Typography:** Plus Jakarta Sans (body) + Space Grotesk (display).
- **Palette:** deep navy `#0F172A` base, electric blue → violet gradient
  accents, warm amber for callouts.
- **Effects:** glassmorphism (`backdrop-blur-xl` + translucent surfaces),
  soft shadows, mesh gradients, hover-lift, fade-up animations.
- **Components:** `Button`, `Card` (Feature / Stat / Result), `Field`
  (input / select), `Markdown`, `PageShell`, `Header`, `Footer`.

## Security Design
- `CLAUDE_API_KEY` / `LOVABLE_API_KEY` read only inside server handlers.
- Zod validation on every server function.
- Apps Script webhook URL stored in `process.env`, never bundled.
- Toast-based user-facing error surfacing; server-side logs for details.
