"""Loan eligibility routes — page + JSON API."""
from __future__ import annotations

from flask import Blueprint, jsonify, render_template, request

from ..services.eligibility_service import evaluate_payload

loan_bp = Blueprint("loan", __name__, url_prefix="/loan-eligibility")


@loan_bp.route("/", methods=["GET"])
def index():
    return render_template("loan.html", active="loan")


@loan_bp.route("/api/check", methods=["POST"])
def check_eligibility():
    """Evaluate a loan application. Body: JSON matching LoanInput."""
    if not request.is_json:
        return jsonify({"ok": False, "error": "Expected JSON body."}), 400
    try:
        payload = request.get_json(silent=False) or {}
    except Exception as exc:  # noqa: BLE001
        return jsonify({"ok": False, "error": f"Invalid JSON: {exc}"}), 400

    outcome = evaluate_payload(payload)
    if not outcome["ok"]:
        return jsonify(outcome), 422
    return jsonify(outcome), 200
