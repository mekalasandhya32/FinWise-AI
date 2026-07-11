"""AI Advisor routes (Groq integration wired later)."""
from flask import Blueprint, render_template

advisor_bp = Blueprint("advisor", __name__, url_prefix="/ai-advisor")


@advisor_bp.route("/")
def index():
    return render_template("advisor.html", active="advisor")
