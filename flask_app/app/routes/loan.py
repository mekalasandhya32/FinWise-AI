"""Loan eligibility routes."""
from flask import Blueprint, render_template

loan_bp = Blueprint("loan", __name__, url_prefix="/loan-eligibility")


@loan_bp.route("/")
def index():
    return render_template("loan.html", active="loan")
