"""Rule-based loan eligibility engine — pure functions, no side effects.

Mirrors src/lib/loan-eligibility.ts so the Flask API and the React UI produce
identical results for the same inputs.
"""
from __future__ import annotations

from dataclasses import dataclass, asdict
from typing import Any


INTEREST_RATE_BY_PURPOSE = {
    "Home": 8.5,
    "Auto": 9.5,
    "Education": 10.0,
    "Personal": 12.5,
    "Business": 13.0,
    "Medical": 11.0,
}

EMPLOYMENT_WEIGHT = {
    "Salaried": 1.0,
    "Business": 0.9,
    "Self-employed": 0.85,
    "Freelancer": 0.75,
    "Student": 0.4,
}


@dataclass
class LoanInput:
    name: str
    age: int
    income: float
    expenses: float
    existing_emi: float
    employment_type: str
    work_experience: float
    loan_amount: float
    loan_tenure: int
    loan_purpose: str


def calculate_emi(principal: float, annual_rate: float, months: int) -> float:
    if principal <= 0 or months <= 0:
        return 0.0
    r = annual_rate / 12 / 100
    if r == 0:
        return round(principal / months)
    emi = (principal * r * (1 + r) ** months) / ((1 + r) ** months - 1)
    return round(emi)


def validate(payload: dict[str, Any]) -> list[dict[str, str]]:
    errs: list[dict[str, str]] = []
    def add(f: str, m: str) -> None: errs.append({"field": f, "message": m})

    if not payload.get("name") or len(str(payload["name"]).strip()) < 2:
        add("name", "Enter your full name.")
    age = payload.get("age")
    if not isinstance(age, (int, float)) or age < 18 or age > 75:
        add("age", "Age must be between 18 and 75.")
    for f in ("income", "expenses", "existing_emi", "work_experience"):
        v = payload.get(f)
        if v is None or not isinstance(v, (int, float)) or v < 0:
            add(f, f"{f.replace('_', ' ').title()} is required.")
    if not payload.get("employment_type"):
        add("employment_type", "Select employment type.")
    if not payload.get("loan_amount") or payload["loan_amount"] <= 0:
        add("loan_amount", "Loan amount must be greater than 0.")
    tenure = payload.get("loan_tenure")
    if not tenure or tenure < 3 or tenure > 360:
        add("loan_tenure", "Tenure must be 3–360 months.")
    if not payload.get("loan_purpose"):
        add("loan_purpose", "Select a loan purpose.")
    return errs


def evaluate(data: LoanInput) -> dict[str, Any]:
    rate = INTEREST_RATE_BY_PURPOSE.get(data.loan_purpose, 12.0)
    estimated_emi = calculate_emi(data.loan_amount, rate, data.loan_tenure)

    disposable = max(0.0, data.income - data.expenses - data.existing_emi)
    total_obligations = data.existing_emi + estimated_emi
    dti = total_obligations / data.income if data.income > 0 else 1.0

    reasons: list[str] = []
    recommendations: list[str] = []
    score = 100

    if data.age < 21:
        score -= 15; reasons.append("Applicant is under 21.")
    elif data.age > 60:
        score -= 15; reasons.append("Applicant is nearing retirement age.")

    if data.income < 1500:
        score -= 25
        reasons.append("Monthly income is below the recommended threshold.")
        recommendations.append("Increase steady monthly income or add a co-applicant.")

    if dti > 0.5:
        score -= 30
        reasons.append(f"Debt-to-income ratio is high ({dti * 100:.0f}%).")
        recommendations.append("Reduce existing EMIs or request a smaller loan amount.")
    elif dti > 0.4:
        score -= 15
        reasons.append(f"Debt-to-income ratio is elevated ({dti * 100:.0f}%).")

    if estimated_emi > disposable * 0.6:
        score -= 20
        reasons.append("Estimated EMI consumes too much of your disposable income.")
        recommendations.append("Extend loan tenure to lower the monthly EMI.")

    weight = EMPLOYMENT_WEIGHT.get(data.employment_type, 0.7)
    score = round(score * weight)
    if weight < 0.8:
        recommendations.append("A longer employment or business history strengthens your profile.")

    if data.work_experience < 1:
        score -= 10; reasons.append("Less than 1 year of work experience.")
    elif data.work_experience >= 5:
        score += 5

    max_affordable_emi = data.income * 0.5 - data.existing_emi
    r = rate / 12 / 100
    if max_affordable_emi > 0 and r > 0:
        max_eligible = round(
            (max_affordable_emi * ((1 + r) ** data.loan_tenure - 1)) / (r * (1 + r) ** data.loan_tenure)
        )
    else:
        max_eligible = 0

    if max_eligible > 0 and data.loan_amount > max_eligible:
        score -= 10
        reasons.append(f"Requested amount exceeds your safe borrowing limit (~{max_eligible:,}).")
        recommendations.append(f"Consider borrowing up to {max_eligible:,} for a healthier profile.")

    score = max(0, min(100, score))

    eligible = score >= 55 and dti <= 0.55 and disposable >= estimated_emi * 1.1

    if score >= 80: risk = "Low"
    elif score >= 65: risk = "Moderate"
    elif score >= 45: risk = "High"
    else: risk = "Very High"

    if eligible and not reasons:
        reasons.append("Strong income, healthy DTI, and stable employment profile.")
    if not eligible and not recommendations:
        recommendations.append("Improve savings, clear existing debt, or apply with a co-borrower.")
    if not recommendations:
        recommendations.append("Maintain your current profile and pay EMIs on time to boost credit health.")

    return {
        "eligible": eligible,
        "score": score,
        "risk": risk,
        "estimated_emi": estimated_emi,
        "disposable_income": round(disposable, 2),
        "dti_ratio": round(dti, 4),
        "interest_rate": rate,
        "max_eligible_amount": max(0, max_eligible),
        "reasons": reasons,
        "recommendations": recommendations,
    }


def evaluate_payload(payload: dict[str, Any]) -> dict[str, Any]:
    """Validate + evaluate. Returns {ok, errors?, result?}."""
    errors = validate(payload)
    if errors:
        return {"ok": False, "errors": errors}
    data = LoanInput(
        name=str(payload["name"]).strip(),
        age=int(payload["age"]),
        income=float(payload["income"]),
        expenses=float(payload["expenses"]),
        existing_emi=float(payload["existing_emi"]),
        employment_type=str(payload["employment_type"]),
        work_experience=float(payload["work_experience"]),
        loan_amount=float(payload["loan_amount"]),
        loan_tenure=int(payload["loan_tenure"]),
        loan_purpose=str(payload["loan_purpose"]),
    )
    return {"ok": True, "result": evaluate(data), "input": asdict(data)}
