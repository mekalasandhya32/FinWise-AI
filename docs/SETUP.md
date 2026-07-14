# Setup Guide

## Prerequisites

- Node.js 20+ and [Bun](https://bun.sh)
- Python 3.10+
- A Google account (for the Sheets webhook)
- A Groq API key (optional — only for the Flask backend)

## 1. Clone

```bash
git clone <your-repo-url> finwise-ai
cd finwise-ai
cp .env.example .env
```

## 2. Frontend (TanStack Start)

```bash
bun install
bun run dev
```

Open http://localhost:8080.

Required env: `LOVABLE_API_KEY`, `GOOGLE_APPS_SCRIPT_URL`.

## 3. Backend (Flask)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env           # fill in GROQ_API_KEY, SECRET_KEY, ...
python run.py
```

Open http://localhost:5000.

## 4. Google Sheets Webhook

1. Create a new Google Sheet.
2. Open **Extensions → Apps Script**.
3. Paste the contents of `integrations/google-apps-script/Code.gs`.
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the deployment URL into `GOOGLE_APPS_SCRIPT_URL`.

## 5. Verify

- Frontend home page loads with hero + sections.
- EMI calculator produces live numbers.
- AI Advisor streams a response.
- Submitting the loan form shows a success toast (row appears in the sheet).
