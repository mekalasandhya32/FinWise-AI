"""EMI calculator routes."""
from flask import Blueprint, render_template

emi_bp = Blueprint("emi", __name__, url_prefix="/emi-calculator")


@emi_bp.route("/")
def index():
    return render_template("emi.html", active="emi")
