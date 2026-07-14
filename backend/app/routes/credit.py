"""Credit score routes."""
from flask import Blueprint, render_template

credit_bp = Blueprint("credit", __name__, url_prefix="/credit-score")


@credit_bp.route("/")
def index():
    return render_template("credit.html", active="credit")
