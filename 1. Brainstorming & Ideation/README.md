# Milestone 1 — Brainstorming & Ideation

## Project Title
**FinWise AI — Intelligent Loan Eligibility, Credit Analysis & Financial Advisory Platform**

## Problem Statement
Everyday users struggle to understand loan eligibility, credit health, EMI
obligations, and personal budgeting. Traditional bank calculators are
static, siloed, and give no explanation. FinWise AI unifies these tools
into one premium, AI-guided experience — instant eligibility checks,
credit-score insight, EMI planning, and a streaming AI financial advisor
that explains the "why" behind every number.

## Target Users
- First-time borrowers evaluating a home / auto / education / personal loan.
- Salaried and self-employed users planning EMIs and monthly budgets.
- Users wanting to improve their credit score with concrete guidance.
- Financial literacy learners looking for plain-language explanations.

## Proposed Solution
A responsive web platform that:
- Runs rule-based **loan eligibility** with DTI, disposable income, risk scoring.
- Provides a **credit score analyzer** with visual factor breakdown.
- Offers a real-time **EMI calculator** with amortization split.
- Delivers a **streaming AI advisor** for loans, credit, savings, and budgeting.
- Persists submissions to **Google Sheets** for audit and later analysis.

## Core Modules
1. Home & marketing surface
2. Loan Eligibility Checker
3. Credit Score Analyzer
4. EMI Calculator
5. AI Financial Advisor (streaming chat)
6. About & Contact

## Ideation Notes
- **Design language:** dark-first glassmorphism, blue/purple gradients, soft
  shadows, animated hero, premium fintech feel.
- **AI provider:** Claude (Anthropic) / Lovable AI Gateway for the live
  streaming advisor; identical prompt shared with a Flask reference stack.
- **Persistence:** Google Apps Script webhook → Google Sheets tabs
  (`LoanApplications`, `CreditAnalyses`, `EmiCalculations`).
- **Deployment:** Lovable hosted preview + custom domain; GitHub as source
  of truth with two-way sync.

## Success Criteria
- End-to-end flows run without backend setup (webhook + Lovable AI Gateway).
- All four financial tools return results in under 1 second.
- AI advisor streams tokens with markdown-rendered output.
- Fully responsive down to 375px viewport.
