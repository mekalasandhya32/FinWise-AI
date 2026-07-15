# Testing Guide

## Layers

| Layer | Tool | Location |
|-------|------|----------|
| Unit / integration (frontend) | Vitest | `tests/frontend`, `src/**/__tests__` |
| End-to-end (frontend) | Playwright | ad-hoc scripts under `/tmp/browser` |
| Unit (backend) | pytest | `tests/backend` |

## Running Tests

### Frontend
```bash
bunx vitest run
```

### Backend
```bash
cd backend
pytest ../tests/backend
```

## Key Test Suites

### `tests/backend/test_eligibility.py`
Verifies the Flask loan-eligibility engine matches the TypeScript engine
for canonical strong / weak profiles.

### Smoke Matrix

| Area | Path | Type |
|------|------|------|
| Home renders | `/` | Playwright |
| EMI math | `/emi-calculator` | Vitest |
| Loan eligibility (strong) | `/loan-eligibility` | Playwright |
| Loan eligibility (weak) | `/loan-eligibility` | Playwright |
| AI streaming | `/api/chat` | Playwright |
| Sheets webhook | `saveLoanApplication` | Vitest (mocked) |

## Manual QA Checklist
- Every route returns HTTP 200 and renders without console errors.
- All forms validate required fields with inline error messaging.
- AI advisor streams tokens progressively (no full-message flash).
- Google Sheet receives a new row within 2 seconds of form submit.
- Mobile viewport (390px) has no horizontal scroll.
