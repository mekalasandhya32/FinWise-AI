# FinWise AI

**Intelligent Loan Eligibility, Credit Analysis & Financial Advisory Platform**

FinWise AI is a premium, AI-augmented personal-finance web application. It
unifies loan eligibility, credit-score insight, EMI planning, and a
streaming AI financial advisor into a single responsive, glassmorphic
experience. Built with **React 19 + TanStack Start**, styled with
**Tailwind v4**, powered by **Claude** through the Lovable AI Gateway,
and persisted through **Google Apps Script + Google Sheets**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![Stack](https://img.shields.io/badge/stack-TanStack%20Start-8B5CF6)

---

## ✨ Key Features

- **AI Financial Advisor** — streaming markdown chat over Claude / Lovable AI.
- **Loan Eligibility Checker** — rule-based engine with score, risk band, reasons, and recommendations.
- **Credit Score Analyzer** — animated meter + factor-level breakdown.
- **EMI Calculator** — real-time amortization + principal/interest split.
- **Google Sheets Persistence** — all submissions saved via Google Apps Script webhook.
- **Premium Design System** — dark-first glassmorphism, gradient accents, fluid animations, fully responsive.

---

## 🗂 Repository Structure

The repository follows a milestone-based hierarchy inspired by academic
project submissions. Application code lives at the root (required by
TanStack / Vite), and every milestone gets its own documented folder.

```
finwise-ai/
├── 1. Brainstorming & Ideation/
├── 2. Requirement Analysis/
├── 3. Project Design Phase/
├── 4. Project Planning Phase/
├── 5. Project Development Phase/
├── 6. Performance Testing/
├── 7. Documentation & Demo/
│   ├── PROJECT_REPORT.md
│   └── screenshots/
├── 8. Project Demonstration/
│
├── src/                        # React + TanStack Start frontend
│   ├── routes/                 # File-based routes + /api/chat
│   ├── components/             # Reusable UI (finwise/, home/, layout)
│   ├── lib/                    # Server fns, AI gateway, Sheets, loan engine
│   └── styles.css              # Tailwind v4 tokens + glass utilities
├── public/                     # Static assets
├── backend/                    # Flask reference backend (parallel stack)
├── integrations/
│   └── google-apps-script/     # Code.gs webhook
├── prompts/                    # Versioned AI system prompts
├── docs/                       # Architecture, setup, deployment, testing, API
├── tests/                      # Vitest + pytest scaffolds
├── .env.example
├── LICENSE
└── README.md
```

> **Why does `src/` live at the root?** TanStack Start / Vite discovers
> `vite.config.ts`, `package.json`, and `src/routes/` from the repository
> root. Moving the frontend into a nested `frontend/` folder would break
> `npm install`, `npm run dev`, `npm run build`, and Lovable ↔ GitHub sync.
> The milestone folders host all supporting documentation instead.

---

## 🚀 Quick Start

```bash
npm install          # or: bun install
npm run dev          # http://localhost:8080
npm run build        # production build
```

### Environment
Copy `.env.example` to `.env` and fill in:

| Variable | Purpose |
|----------|---------|
| `LOVABLE_API_KEY` | Lovable AI Gateway (streaming Claude) |
| `CLAUDE_API_KEY` | Direct Claude access (optional) |
| `GOOGLE_APPS_SCRIPT_URL` | Sheets webhook endpoint |

### Google Apps Script Webhook
Deploy `integrations/google-apps-script/Code.gs` as a Web App
(execute as *me*, access *anyone*). Paste the deployment URL into
`GOOGLE_APPS_SCRIPT_URL`. See [`docs/SETUP.md`](docs/SETUP.md).

---

## 🧰 Technology Stack

| Layer | Tool |
|-------|------|
| Framework | React 19, TanStack Start v1 |
| Language | TypeScript, HTML5, CSS3, JavaScript |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 |
| AI | Claude via Lovable AI Gateway |
| Persistence | Google Apps Script → Google Sheets |
| Source control | GitHub (two-way sync via Lovable) |
| Hosting | Lovable (preview + published) |

---

## 📚 Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — system design.
- [`docs/SETUP.md`](docs/SETUP.md) — local development setup.
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — production deployment.
- [`docs/TESTING.md`](docs/TESTING.md) — test strategy and suites.
- [`docs/api/README.md`](docs/api/README.md) — API reference.
- [`prompts/financial-advisor.md`](prompts/financial-advisor.md) — versioned AI prompt.
- [`7. Documentation & Demo/PROJECT_REPORT.md`](7.%20Documentation%20%26%20Demo/PROJECT_REPORT.md) — full project report.

---

## 🧪 Tests

```bash
# Frontend
bunx vitest run

# Backend
cd backend && pytest ../tests/backend
```

---

## 📄 License

[MIT](./LICENSE) © 2026 FinWise AI contributors.
