"""Google Sheets service (integration implemented later)."""
from __future__ import annotations

from flask import current_app


class SheetsService:
    """Thin wrapper around gspread. Business logic added later."""

    def __init__(self, sheet_id: str | None = None, credentials_file: str | None = None):
        self.sheet_id = sheet_id or current_app.config.get("GOOGLE_SHEETS_ID")
        self.credentials_file = (
            credentials_file or current_app.config.get("GOOGLE_SERVICE_ACCOUNT_FILE")
        )

    def append_row(self, worksheet: str, row: list) -> None:
        raise NotImplementedError("Google Sheets integration will be implemented later.")

    def read_rows(self, worksheet: str) -> list[dict]:
        raise NotImplementedError("Google Sheets integration will be implemented later.")
