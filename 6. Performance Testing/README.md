# Milestone 6 — Performance Testing

## Test Strategy

| Layer | Tool | Scope |
|-------|------|-------|
| Unit | Vitest | Loan engine, EMI math, validation |
| Integration | Vitest (mocked fetch) | Sheets server functions |
| End-to-end | Playwright | Route rendering, form flows, AI streaming |
| Backend | pytest | Flask eligibility service parity |

## Executed Test Cases

### TC-1 EMI Math
- Input: principal 25,000; rate 9.5%; tenure 36 months.
- Expected EMI: **801**. **PASS.**

### TC-2 Loan Eligibility — Strong Profile
- 30 y/o salaried, income 8000, expenses 2500, existing EMI 400,
  requesting 25,000 home loan over 60 months.
- Expected: **Eligible**, risk **Low**, score **≥ 90**. **PASS.**

### TC-3 Loan Eligibility — Weak Profile
- 22 y/o freelancer, income 1200, expenses 900, existing EMI 700,
  requesting 30,000 personal loan over 24 months.
- Expected: **Not Eligible**, risk **Very High**, DTI > 100%. **PASS.**

### TC-4 Form Validation
- Missing name / negative income / age < 18 → inline errors, no submit. **PASS.**

### TC-5 AI Advisor Streaming
- Prompt "Explain 50/30/20 budgeting" → tokens stream in, markdown lists
  render, history preserved between turns. **PASS.**

### TC-6 Sheets Persistence
- Submit loan form → row appended to `LoanApplications` tab within 2s;
  success toast shown. **PASS.**

### TC-7 Responsive Audit
- 375 / 414 / 768 / 1024 / 1440 / 1920 — no horizontal scroll, all CTAs
  reachable, nav collapses to hamburger < 768px. **PASS.**

### TC-8 Cross-Browser
- Chrome 128, Firefox 129, Edge 128, Safari 17 — visual + functional parity. **PASS.**

## Performance Metrics
- Lighthouse Performance: **95+**
- Largest Contentful Paint: **< 1.8s**
- Cumulative Layout Shift: **< 0.02**
- Time to Interactive: **< 2.1s**

## Known Non-Issues
- Google Apps Script cold start adds ~500ms on the first submission of
  each deployment. Subsequent submissions are < 200ms.
