# Architecture

FinWise AI ships as two parallel implementations sharing one product vision.

## Stacks

### 1. TanStack Start + React (primary, live preview)

```
Browser ──► TanStack Router (src/routes)
              │
              ├─► Page routes  ──► React components (src/components)
              │                     └─► Design system (src/styles.css, finwise/*)
              │
              └─► Server routes (src/routes/api/*)
                    ├─► /api/chat        → Lovable AI Gateway (streaming)
                    └─► server functions → Google Apps Script webhook (Sheets)
```

- **Rendering:** SSR + hydration via TanStack Start (Vite 7, React 19).
- **State:** URL-driven routing, `useChat` for AI streaming, local component state for calculators.
- **AI:** OpenAI-compatible streaming through Lovable AI Gateway.
- **Persistence:** Google Apps Script HTTP webhook receives JSON, appends rows to a spreadsheet.

### 2. Flask (reference backend)

```
Browser ──► Flask app (backend/app)
              ├─► Blueprints: main, loan, credit, emi, advisor
              ├─► Jinja2 templates + static assets
              └─► Services
                    ├─► GroqService  → Groq API (streaming SSE)
                    └─► SheetsService → gspread → Google Sheets
```

- **Pattern:** Application Factory, class-based config, blueprint-per-feature.
- **Rendering:** Server-rendered HTML with vanilla JS + CSS.
- **AI:** Direct Groq client with streaming SSE endpoint.
- **Persistence:** `gspread` writing to a Google Sheet via service account.

## Shared Concepts

- **Financial modules:** Loan Eligibility, Credit Score, EMI, AI Advisor.
- **Data schema:** three sheets/tabs — `LoanApplications`, `CreditAnalyses`, `EmiCalculations` — each row timestamped with user identifiers and computed metrics.
- **Prompt:** the same financial-advisor system prompt (see `prompts/financial-advisor.md`) drives both AI paths.

## Directory Ownership

| Path | Owner | Purpose |
| --- | --- | --- |
| `src/` | Frontend | Live TanStack app |
| `backend/` | Backend | Flask reference stack |
| `integrations/google-apps-script/` | Integrations | Sheets webhook |
| `prompts/` | AI | Versioned system prompts |
| `docs/` | Docs | This directory |
| `tests/` | QA | Vitest + Pytest scaffolds |
