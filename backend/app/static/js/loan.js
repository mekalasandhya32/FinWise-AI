/**
 * Loan Eligibility — client-side validation + API call + result rendering.
 * Backend endpoint: POST /loan-eligibility/api/check
 */
(function () {
  "use strict";

  const form = document.getElementById("loan-form");
  const resultPanel = document.getElementById("loan-result");
  if (!form || !resultPanel) return;

  const NUMERIC_FIELDS = ["age", "income", "expenses", "existing_emi", "work_experience", "loan_amount", "loan_tenure"];

  function clearErrors() {
    form.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
    form.querySelectorAll(".field").forEach((el) => el.classList.remove("has-error"));
  }

  function showError(field, message) {
    const el = form.querySelector(`[data-error-for="${field}"]`);
    if (el) {
      el.textContent = message;
      el.closest(".field")?.classList.add("has-error");
    }
  }

  function validateClient(data) {
    const errors = [];
    if (!data.name || data.name.length < 2) errors.push({ field: "name", message: "Enter your full name." });
    if (!data.age || data.age < 18 || data.age > 75) errors.push({ field: "age", message: "Age 18–75." });
    if (data.income < 0 || Number.isNaN(data.income)) errors.push({ field: "income", message: "Enter a valid income." });
    if (data.expenses < 0 || Number.isNaN(data.expenses)) errors.push({ field: "expenses", message: "Enter valid expenses." });
    if (data.existing_emi < 0 || Number.isNaN(data.existing_emi)) errors.push({ field: "existing_emi", message: "Enter existing EMI (0 if none)." });
    if (data.work_experience < 0 || Number.isNaN(data.work_experience)) errors.push({ field: "work_experience", message: "Enter work experience." });
    if (!data.loan_amount || data.loan_amount <= 0) errors.push({ field: "loan_amount", message: "Loan amount required." });
    if (!data.loan_tenure || data.loan_tenure < 3 || data.loan_tenure > 360) errors.push({ field: "loan_tenure", message: "Tenure 3–360 months." });
    return errors;
  }

  function collect() {
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    NUMERIC_FIELDS.forEach((k) => (data[k] = Number(data[k] || 0)));
    data.name = String(data.name || "").trim();
    return data;
  }

  function setLoading(loading) {
    const btn = form.querySelector("button[type='submit']");
    if (!btn) return;
    btn.disabled = loading;
    btn.querySelector(".spinner").hidden = !loading;
    btn.querySelector(".btn-label").textContent = loading ? "Analyzing…" : "Check my eligibility";
  }

  function fmt(n) { return Number(n).toLocaleString(); }

  function renderResult(result) {
    const dtiPct = Math.min(100, result.dti_ratio * 100);
    const eligibleClass = result.eligible ? "verdict-yes" : "verdict-no";
    const riskClass = "risk-" + result.risk.toLowerCase().replace(/\s+/g, "-");
    resultPanel.innerHTML = `
      <div class="card result-card">
        <div class="verdict-row">
          <div>
            <span class="label">Verdict</span>
            <h2 class="verdict ${eligibleClass}">${result.eligible ? "Eligible" : "Not eligible"}</h2>
          </div>
          <span class="pill ${riskClass}">${result.risk} risk</span>
        </div>

        <div class="score-block">
          <div class="score-row"><span>Eligibility score</span><strong>${result.score}/100</strong></div>
          <div class="progress"><div class="progress-fill" style="width:${result.score}%"></div></div>
        </div>

        <dl class="breakdown">
          <div><dt>Estimated EMI</dt><dd>$${fmt(result.estimated_emi)}/mo</dd></div>
          <div><dt>Interest rate</dt><dd>${result.interest_rate.toFixed(1)}% p.a.</dd></div>
          <div><dt>Disposable income</dt><dd>$${fmt(result.disposable_income)}</dd></div>
          <div><dt>Debt-to-Income</dt><dd>${(result.dti_ratio * 100).toFixed(1)}%</dd></div>
          <div><dt>Max safe borrowing</dt><dd>$${fmt(result.max_eligible_amount)}</dd></div>
        </dl>

        <div class="dti-block">
          <div class="score-row small"><span>DTI utilization</span><span>${dtiPct.toFixed(0)}%</span></div>
          <div class="progress"><div class="progress-fill dti-${dtiPct <= 40 ? "good" : dtiPct <= 55 ? "warn" : "bad"}" style="width:${dtiPct.toFixed(2)}%"></div></div>
        </div>
      </div>

      <div class="card">
        <h3 class="section-title">Why</h3>
        <ul class="bullets">${result.reasons.map((r) => `<li>${r}</li>`).join("")}</ul>
      </div>

      <div class="card">
        <h3 class="section-title">Recommendations</h3>
        <ul class="bullets accent">${result.recommendations.map((r) => `<li>${r}</li>`).join("")}</ul>
      </div>
    `;
  }

  function renderApiErrors(errors) {
    (errors || []).forEach((e) => showError(e.field, e.message));
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();

    const data = collect();
    const localErrors = validateClient(data);
    if (localErrors.length) {
      localErrors.forEach((err) => showError(err.field, err.message));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/loan-eligibility/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        if (json.errors) renderApiErrors(json.errors);
        else resultPanel.innerHTML = `<div class="card empty-state error"><h3>Something went wrong</h3><p>${json.error || "Please try again."}</p></div>`;
        return;
      }
      renderResult(json.result);
    } catch (err) {
      resultPanel.innerHTML = `<div class="card empty-state error"><h3>Network error</h3><p>${err.message}</p></div>`;
    } finally {
      setLoading(false);
    }
  });
})();
