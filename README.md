# FinWise AI

Premium AI-powered personal finance toolkit — loan eligibility, credit score insights, EMI calculator, and a streaming AI financial advisor. Ships as a modern **TanStack Start + React** web app (live preview) and a parallel **Flask** reference backend.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![Python](https://img.shields.io/badge/python-%3E%3D3.10-blue)

---

## ✨ Features

- **Loan Eligibility** — instant qualification insights with a multi-step glass UI.
- **Credit Score Analyzer** — visual score meter and factor breakdown.
- **EMI Calculator** — real-time amortization math and payment split.
- **AI Financial Advisor** — streaming chat over Lovable AI Gateway / Groq, markdown-rendered answers on loans, credit, savings, and budgeting.
- **Google Sheets Persistence** — loan applications, credit analyses, and EMI runs are saved via a Google Apps Script webhook.
- **Premium Design System** — dark-first glassmorphism, gradients, animations, fully responsive.

---

## 🗂 Repository Layout

```
finwise-ai/
├── src/                       # TanStack Start + React frontend (live app)
│   ├── routes/                # File-based routes (pages + /api server routes)
│   ├── components/            # Reusable UI (finwise/, home/, layout)
│   ├── lib/                   # Server functions, AI gateway, Sheets service
│   ├── hooks/                 # React hooks
│   └── styles.css             # Tailwind v4 + design tokens
├── public/                    # Static assets served as-is
├── backend/                   # Flask reference backend (parallel stack)
│   ├── app/
│   │   ├── routes/            # Blueprints: main, loan, credit, emi, advisor
│   │   ├── services/          # GroqService, SheetsService
│   │   ├── templates/         # Jinja2 templates
│   │   └── static/            # CSS/JS/images
│   ├── config.py              # Env-driven configuration
│   ├── run.py                 # Entrypoint
│   └── requirements.txt
├── integrations/
│   └── google-apps-script/    # Code.gs webhook (Sheets persistence)
├── docs/                      # Architecture, setup, deployment guides
├── prompts/                   # AI system prompts (versioned)
├── tests/                     # Frontend + backend test scaffolding
├── .env.example               # Root environment template
├── LICENSE
└── README.md
```

---

## 🚀 Quick Start

### Frontend (TanStack Start + React) — recommended

```bash
bun install
bun run dev
```

App runs at `http://localhost:8080`.

### Backend (Flask) — reference implementation

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env    # fill in GROQ_API_KEY, GOOGLE_SHEETS_ID, ...
python run.py
```

Flask app runs at `http://localhost:5000`.

### Google Sheets Webhook

Deploy `integrations/google-apps-script/Code.gs` as a Web App (execute as *me*, access *anyone*). Copy the deployment URL into `GOOGLE_APPS_SCRIPT_URL` (frontend) or `GOOGLE_SHEETS_ID` (Flask backend). See [`docs/SETUP.md`](docs/SETUP.md).

---

## 🔐 Environment Variables

Copy `.env.example` to `.env` and fill in:

| Key | Purpose |
| --- | --- |
| `LOVABLE_API_KEY` | Lovable AI Gateway (frontend streaming chat) |
| `GOOGLE_APPS_SCRIPT_URL` | Sheets webhook endpoint |
| `GROQ_API_KEY` | Direct Groq access (Flask backend) |
| `GOOGLE_SHEETS_ID` | Target spreadsheet (Flask backend) |
| `SECRET_KEY` | Flask session key |

Secrets are **never** committed. See [`docs/SETUP.md`](docs/SETUP.md) for details.

---

## 📚 Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — system design, data flow, both stacks.
- [`docs/SETUP.md`](docs/SETUP.md) — local dev, environment, Sheets webhook.
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — production deployment guide.
- [`prompts/financial-advisor.md`](prompts/financial-advisor.md) — AI system prompt.

---

## 🧪 Tests

Scaffolding lives in `tests/`. Frontend uses Playwright for smoke tests; backend uses `pytest`.

```bash
# Frontend
bunx vitest run

# Backend
cd backend && pytest
```

---

## 📄 License

[MIT](./LICENSE) © 2026 FinWise AI contributors.
