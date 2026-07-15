# Milestone 4 — Project Planning Phase

## Sprint Plan

| Sprint | Duration | Deliverables |
|--------|----------|--------------|
| S1 | Week 1 | Project scaffold, routing, design tokens, header/footer |
| S2 | Week 2 | Home page — all 11 sections, animations, responsive polish |
| S3 | Week 3 | EMI Calculator + Credit Score Analyzer with UI + logic |
| S4 | Week 4 | Loan Eligibility engine (frontend + Flask reference) |
| S5 | Week 5 | AI Financial Advisor (streaming, markdown, history) |
| S6 | Week 6 | Google Sheets integration (Apps Script + server fns) |
| S7 | Week 7 | Testing, accessibility, responsive audit, bug fixes |
| S8 | Week 8 | Documentation, screenshots, milestone folders, publish |

## Task Breakdown

### Sprint 1 — Foundation
- Initialize TanStack Start + Tailwind v4.
- Configure typography, palette, glass utilities.
- Build `Header`, `Footer`, `PageShell`, root route metadata.

### Sprint 2 — Home Page
- Hero with animated dashboard SVG.
- `Features`, `Services`, `Stats`, `Benefits`, `FinancialCards`,
  `HowItWorks`, `Testimonials`, `FAQ`, `CTA`.

### Sprint 3 — Calculators
- EMI real-time math + slider inputs + amortization split.
- Credit Score meter + factor breakdown.

### Sprint 4 — Loan Eligibility Engine
- Rule engine in `src/lib/loan-eligibility.ts`.
- Mirror in `backend/app/services/eligibility_service.py`.
- Result cards: verdict, score bar, reasons, recommendations.

### Sprint 5 — AI Advisor
- `/api/chat` streaming route via Lovable AI Gateway / Claude.
- `useChat` client, markdown rendering, auto-scroll.
- System prompt versioned under `prompts/financial-advisor.md`.

### Sprint 6 — Sheets Persistence
- Google Apps Script `Code.gs` webhook (three sheet tabs).
- `saveLoanApplication`, `saveCreditAnalysis`, `saveEmiCalculation`.
- Zod validation + toast feedback.

### Sprint 7 — QA
- Playwright smoke tests on all routes.
- Responsive audit at 375 / 768 / 1024 / 1440 / 1920.
- Fix hydration mismatches; verify math parity Flask ↔ React.

### Sprint 8 — Documentation & Publish
- Milestone folders, README, LICENSE, `.env.example`, `.gitignore`.
- `docs/` — architecture, setup, deployment, testing, API.
- Publish via Lovable + optional custom domain.

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Google Apps Script quota exhaustion | Batch writes; graceful client-side toast on 429 |
| AI streaming interruption | `useChat` retry + user-visible error state |
| API key leakage | Enforce server-only access; audit env usage |
| Hydration mismatches | Round layout-affecting numbers on server |
