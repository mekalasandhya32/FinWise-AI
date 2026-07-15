# Milestone 2 — Requirement Analysis

## Functional Requirements

### FR-1 Loan Eligibility
- Accept 10 inputs: Name, Age, Income, Expenses, Existing EMI,
  Employment Type, Work Experience, Loan Amount, Tenure, Purpose.
- Compute EMI, DTI, disposable income, eligibility score (0–100), risk
  band (Low / Moderate / High / Very High).
- Return verdict (Eligible / Not Eligible), reasons, recommendations.

### FR-2 Credit Score Analyzer
- Accept payment history, utilization, credit age, mix, inquiries.
- Render animated score meter with factor-level breakdown.
- Persist to Google Sheets.

### FR-3 EMI Calculator
- Real-time recompute on slider change (principal, rate, tenure).
- Show monthly EMI, total interest, principal-vs-interest split.

### FR-4 AI Financial Advisor
- Streaming chat with markdown responses.
- Conversation history preserved in-session.
- System prompt scoped to personal finance only.

### FR-5 Persistence
- Loan, credit, and EMI submissions saved to Google Sheets via
  Google Apps Script webhook.
- Timestamp, user name, and email captured with each row.

## Non-Functional Requirements

| # | Category | Requirement |
|---|----------|-------------|
| NFR-1 | Performance | Page interactive < 2s on 4G; calculators < 100ms |
| NFR-2 | Security | API keys server-side only; publishable keys OK client-side |
| NFR-3 | Accessibility | Semantic HTML, keyboard-navigable, WCAG-AA contrast |
| NFR-4 | Responsiveness | 375px → 1920px |
| NFR-5 | Reliability | Toast-based error surfacing; no silent failures |
| NFR-6 | Maintainability | Modular routes, reusable components, typed lib |

## Technology Stack

| Layer | Tool |
|-------|------|
| Frontend framework | React 19 + TanStack Start v1 |
| Build tool | Vite 7 |
| Language | TypeScript, HTML5, CSS3, JavaScript |
| Styling | Tailwind CSS v4 (custom design tokens) |
| AI | Claude / Lovable AI Gateway (streaming) |
| Persistence | Google Apps Script → Google Sheets |
| Hosting | Lovable (preview + published) |
| VCS | GitHub (two-way sync via Lovable) |

## Constraints
- No server database — Google Sheets is the system of record.
- API keys never exposed to the client.
- Must work on modern evergreen browsers (Chrome, Firefox, Edge, Safari).

## Assumptions
- Users have a stable internet connection.
- Google Apps Script Web App is deployed as *Anyone with the link*.
- The Lovable AI Gateway key is provisioned by Lovable at workspace level.
