# FinWise AI — API Reference

FinWise AI exposes two server surfaces:

1. **Server routes** — raw HTTP endpoints under `src/routes/api/`.
2. **Server functions** — typed RPCs defined with `createServerFn` in
   `src/lib/*.functions.ts`, called from the browser via TanStack's
   internal RPC protocol.

---

## Server Route

### `POST /api/chat`

Streams a chat completion from the AI Financial Advisor.

**Request body**
```json
{
  "messages": [
    { "role": "user", "content": "How do I build an emergency fund?" }
  ]
}
```

**Response** — `text/event-stream` (SSE) containing incremental tokens.
Consumed by the `useChat` hook in `src/routes/ai-advisor.tsx`.

**Errors**
- `429` — provider rate limit; surface toast, retry later.
- `402` — AI credits exhausted; direct the user to billing.

---

## Server Functions

Server functions are invoked from the browser via `useServerFn` or
directly from route loaders. They validate input with Zod and return
JSON-serializable payloads.

### `saveLoanApplication(input)`
Persist a loan application to the `LoanApplications` sheet.

Input:
```ts
{
  name: string; email: string;
  age: number; income: number; expenses: number;
  existing_emi: number; employment_type: string;
  work_experience: number; loan_amount: number;
  loan_tenure: number; loan_purpose: string;
  estimated_emi: number; dti_ratio: number;
  score: number; risk: string; verdict: string;
}
```

Returns `{ ok: true }` on success, throws otherwise.

### `saveCreditAnalysis(input)`
Persist a credit-score analysis to the `CreditAnalyses` sheet.

### `saveEmiCalculation(input)`
Persist an EMI calculation to the `EmiCalculations` sheet.

---

## Google Apps Script Webhook

`integrations/google-apps-script/Code.gs` receives a JSON POST with:

```json
{ "sheet": "LoanApplications" | "CreditAnalyses" | "EmiCalculations",
  "row": { ...fields } }
```

The script appends the row (with a timestamp column prepended) to the
target sheet and returns `{ "ok": true }`.

---

## Flask Reference API

The Flask backend (under `backend/`) exposes parallel HTTP endpoints:

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/` | Home page (Jinja2) |
| GET | `/loan-eligibility/` | Loan page |
| POST | `/loan-eligibility/api/check` | Eligibility JSON API |
| POST | `/advisor/api/chat` | AI chat (JSON) |
| POST | `/advisor/api/chat/stream` | AI chat (SSE) |
