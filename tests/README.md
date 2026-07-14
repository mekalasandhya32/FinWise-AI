# Tests

Test scaffolding for FinWise AI.

## Frontend (`tests/frontend`)

Uses Vitest + Playwright. Run from the project root:

```bash
bunx vitest run
```

Add unit tests next to source under `src/**/__tests__/` or here for
integration flows.

## Backend (`tests/backend`)

Uses pytest. Run from `backend/`:

```bash
cd backend
pytest ../tests/backend
```

## Smoke Test Matrix

| Area | Path | Type |
| --- | --- | --- |
| Home renders | `/` | Playwright |
| EMI math | `/emi-calculator` | Vitest |
| AI streaming | `/api/chat` | Playwright |
| Sheets webhook | `saveLoanApplication` | Vitest (mocked) |
