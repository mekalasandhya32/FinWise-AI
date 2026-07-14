"""Unit tests for the loan eligibility rule engine."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "backend"))

from app.services.eligibility_service import calculate_emi, evaluate_payload  # noqa: E402


def test_calculate_emi_matches_reference():
    # $25,000 @ 9.5% for 36 months → ~$801/mo
    assert calculate_emi(25000, 9.5, 36) == 801


def test_evaluate_strong_profile_is_eligible():
    out = evaluate_payload({
        "name": "Ada Lovelace",
        "age": 32,
        "income": 8000,
        "expenses": 2500,
        "existing_emi": 300,
        "employment_type": "Salaried",
        "work_experience": 6,
        "loan_amount": 20000,
        "loan_tenure": 36,
        "loan_purpose": "Personal",
    })
    assert out["ok"] is True
    r = out["result"]
    assert r["eligible"] is True
    assert r["risk"] in {"Low", "Moderate"}
    assert r["score"] >= 65


def test_evaluate_high_dti_rejected():
    out = evaluate_payload({
        "name": "Test User",
        "age": 40,
        "income": 2000,
        "expenses": 1200,
        "existing_emi": 900,
        "employment_type": "Freelancer",
        "work_experience": 1,
        "loan_amount": 30000,
        "loan_tenure": 24,
        "loan_purpose": "Personal",
    })
    assert out["ok"] is True
    assert out["result"]["eligible"] is False
    assert out["result"]["risk"] in {"High", "Very High"}


def test_validation_flags_bad_input():
    out = evaluate_payload({"name": "", "age": 12})
    assert out["ok"] is False
    fields = {e["field"] for e in out["errors"]}
    assert "name" in fields and "age" in fields
