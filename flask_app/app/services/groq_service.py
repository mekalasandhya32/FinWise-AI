"""Groq API service (integration implemented later)."""
from __future__ import annotations

from flask import current_app


class GroqService:
    """Thin wrapper around the Groq client. Business logic added later."""

    def __init__(self, api_key: str | None = None, model: str | None = None):
        self.api_key = api_key or current_app.config.get("GROQ_API_KEY")
        self.model = model or current_app.config.get("GROQ_MODEL")

    def chat(self, messages: list[dict]) -> str:
        raise NotImplementedError("Groq integration will be implemented later.")
