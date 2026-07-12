"""Groq API service — production Financial Advisor."""
from __future__ import annotations

import logging
from typing import Iterator

from flask import current_app
from groq import Groq, GroqError

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are FinWise AI, a professional, friendly financial advisor.

You help users with:
- Loan advice (personal, home, auto, refinancing) — eligibility, EMI, interest impact
- Credit score improvement — practical, prioritized steps
- Savings advice — emergency funds, high-yield accounts, goal-based savings
- Budget planning — 50/30/20, zero-based, envelope; concrete numbers when income is provided
- Financial concepts — explain jargon (APR, APY, DTI, CIBIL/FICO, compounding) simply

Style:
- Use Markdown: headings, bullet lists, bold for key numbers, tables for comparisons.
- Show short reasoning, then a clear recommendation.
- Ask 1–2 crisp follow-up questions when personal data is needed.
- Add a brief disclaimer that this is educational, not licensed financial advice.
- Never fabricate rates or laws; if region-dependent, say so.
"""


class GroqService:
    """Production wrapper around the Groq chat completions API."""

    def __init__(self, api_key: str | None = None, model: str | None = None) -> None:
        self.api_key = api_key or current_app.config.get("GROQ_API_KEY")
        self.model = model or current_app.config.get("GROQ_MODEL") or "llama-3.1-70b-versatile"
        if not self.api_key:
            raise RuntimeError("GROQ_API_KEY is not configured.")
        self._client = Groq(api_key=self.api_key)

    def _build_messages(self, history: list[dict]) -> list[dict]:
        safe: list[dict] = [{"role": "system", "content": SYSTEM_PROMPT}]
        for m in history:
            role = m.get("role")
            content = (m.get("content") or "").strip()
            if role in {"user", "assistant"} and content:
                safe.append({"role": role, "content": content[:4000]})
        return safe

    def chat(self, history: list[dict], *, temperature: float = 0.5, max_tokens: int = 1024) -> str:
        """Non-streaming chat completion."""
        try:
            resp = self._client.chat.completions.create(
                model=self.model,
                messages=self._build_messages(history),
                temperature=temperature,
                max_tokens=max_tokens,
            )
            return resp.choices[0].message.content or ""
        except GroqError as exc:
            logger.exception("Groq API error")
            raise RuntimeError(f"Groq API error: {exc}") from exc

    def stream(self, history: list[dict], *, temperature: float = 0.5, max_tokens: int = 1024) -> Iterator[str]:
        """Streaming chat — yields text chunks as they arrive."""
        try:
            stream = self._client.chat.completions.create(
                model=self.model,
                messages=self._build_messages(history),
                temperature=temperature,
                max_tokens=max_tokens,
                stream=True,
            )
            for chunk in stream:
                delta = chunk.choices[0].delta.content if chunk.choices else None
                if delta:
                    yield delta
        except GroqError as exc:
            logger.exception("Groq streaming error")
            raise RuntimeError(f"Groq API error: {exc}") from exc
