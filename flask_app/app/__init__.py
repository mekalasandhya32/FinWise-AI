"""Application factory for FinWise AI."""
from __future__ import annotations

from flask import Flask
from dotenv import load_dotenv

from .config import get_config

load_dotenv()


def create_app(config_name: str = "development") -> Flask:
    """Create and configure a Flask application instance."""
    app = Flask(
        __name__,
        instance_relative_config=True,
        template_folder="templates",
        static_folder="static",
    )
    app.config.from_object(get_config(config_name))

    _register_blueprints(app)
    _register_error_handlers(app)

    return app


def _register_blueprints(app: Flask) -> None:
    from .routes.main import main_bp
    from .routes.loan import loan_bp
    from .routes.credit import credit_bp
    from .routes.emi import emi_bp
    from .routes.advisor import advisor_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(loan_bp)
    app.register_blueprint(credit_bp)
    app.register_blueprint(emi_bp)
    app.register_blueprint(advisor_bp)


def _register_error_handlers(app: Flask) -> None:
    from flask import render_template

    @app.errorhandler(404)
    def not_found(_):
        return render_template("base.html"), 404
