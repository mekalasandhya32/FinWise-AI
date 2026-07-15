# FinWise AI — Project Report

## 1. Project Description
FinWise AI is an AI-powered personal-finance platform that unifies loan
eligibility analysis, credit-score insight, EMI planning, and a streaming
AI financial advisor into a single premium web experience. It targets
first-time borrowers, salaried professionals, and financial-literacy
learners who need quick, explainable, and actionable financial guidance.

The application is built with **React 19**, **TanStack Start**, **HTML5**,
**CSS3**, **JavaScript**, and **TypeScript**. AI capabilities are powered
by **Claude** through the Lovable AI Gateway, and persistence is handled
through a **Google Apps Script** web app that writes to **Google Sheets**.
Source control and CI/CD are handled through **GitHub** with two-way sync
via **Lovable**.

## 2. Key Features
- AI-powered streaming financial advisor with markdown rendering.
- Rule-based loan eligibility engine with score, risk band, and
  recommendations.
- Credit-score analyzer with animated meter and factor breakdown.
- Real-time EMI calculator with amortization split.
- Google Sheets persistence for loan, credit, and EMI submissions.
- Dark-first glassmorphic UI with fluid animations and full responsiveness.

## 3. Scenarios

**S1 — Loan Eligibility.** A user enters income, expenses, existing EMIs,
and loan requirements. FinWise AI computes DTI, disposable income, and an
eligibility score, then returns a verdict with reasons and recommendations.

**S2 — Credit Score Insight.** A user shares payment history, utilization,
credit age, mix, and recent inquiries. FinWise AI renders an animated
score meter and per-factor guidance for improvement.

**S3 — EMI Planning.** A user drags sliders for principal, rate, and
tenure to see the monthly EMI and interest split update in real time.

**S4 — AI Advice.** A user asks the advisor "how do I build an emergency
fund?" and receives a streamed, markdown-formatted response tailored to
personal-finance best practices.

## 4. Technical Architecture

Three-tier design:
1. **Client** — React 19 + TanStack Router; Tailwind v4 design system.
2. **Server** — TanStack Start server functions and a streaming
   `/api/chat` route running on the Lovable edge runtime.
3. **External services** — Claude / Lovable AI Gateway for AI, Google
   Apps Script + Google Sheets for persistence.

See `docs/ARCHITECTURE.md` for the full diagram.

## 5. Prerequisites

**Hardware**
- Intel Core i5 (10th gen) / AMD Ryzen 5 or better.
- 8 GB RAM (16 GB recommended).
- 256 GB SSD.
- Stable internet ≥ 10 Mbps.

**Software**
- Windows 10/11, macOS Monterey+, or Ubuntu 20.04+.
- Node.js 20+ and Bun.
- Modern browser (Chrome, Firefox, Edge, Safari).
- GitHub account (for source-control sync).
- Google account (for Sheets webhook).

## 6. Project Workflow

Milestones map 1-to-1 to the repository's numbered folders:

1. Brainstorming & Ideation
2. Requirement Analysis
3. Project Design Phase
4. Project Planning Phase
5. Project Development Phase
6. Performance Testing
7. Documentation & Demo
8. Project Demonstration

Each folder contains its own README with the activities, deliverables,
and outcomes for that phase.

## 7. Conclusion
FinWise AI demonstrates a modern, production-grade approach to building
an AI-augmented consumer finance product: strict server/client
boundaries, a versioned prompt, a rule-based engine mirrored between
TypeScript and Python, and a documentation-first repository organization
suitable for mentor evaluation and public submission.

## 8. Future Enhancements
- Native mobile shell via Capacitor.
- User accounts + saved plans (Lovable Cloud / Supabase).
- Multi-currency and locale support.
- Investment planning module (SIP calculators, goal tracking).
- Regulatory guardrails and disclaimers per jurisdiction.
