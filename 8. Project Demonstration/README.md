# Milestone 8 — Project Demonstration

## Live Application
- **Preview:** https://id-preview--bc410ff0-eba5-4381-96c3-323f26041327.lovable.app
- **Published:** https://fin-nova-glow.lovable.app

## Demo Walkthrough

1. **Landing / Home**
   - Animated hero with live-looking financial dashboard.
   - Scroll through Features, Services, Stats, Benefits, Financial Cards,
     How It Works, Testimonials, FAQ, and CTA.

2. **EMI Calculator** (`/emi-calculator`)
   - Drag principal / rate / tenure sliders.
   - Show real-time EMI and principal-vs-interest split.

3. **Loan Eligibility** (`/loan-eligibility`)
   - Fill a strong profile → **Eligible**, Low risk, high score.
   - Fill a weak profile → **Not Eligible**, Very High risk, reasons + fixes.
   - Row appended to `LoanApplications` sheet.

4. **Credit Score** (`/credit-score`)
   - Submit payment history + utilization inputs.
   - Animated meter + factor breakdown.

5. **AI Advisor** (`/ai-advisor`)
   - Ask "How do I plan a monthly budget on $4,000?"
   - Streamed markdown response, follow-up questions preserved in history.

6. **Persistence**
   - Open the linked Google Sheet — new rows visible with timestamp,
     user info, and computed metrics.

## Presenter Notes
- Emphasize the shared rule engine between the React frontend and the
  Flask reference backend.
- Highlight the versioned AI prompt at `prompts/financial-advisor.md`.
- Show the milestone folders as evidence of documentation-first workflow.
