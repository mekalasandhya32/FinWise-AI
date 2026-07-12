"""AI Advisor routes — Groq-powered chat endpoints."""
from __future__ import annotations

import json
import logging

from flask import Blueprint, Response, jsonify, render_template, request, stream_with_context

from ..services.groq_service import GroqService

logger = logging.getLogger(__name__)

advisor_bp = Blueprint("advisor", __name__, url_prefix="/ai-advisor")

MAX_HISTORY = 40


def _validate_messages(payload: dict) -> list[dict] | None:
    messages = payload.get("messages")
    if not isinstance(messages, list) or not messages:
        return None
    cleaned: list[dict] = []
    for m in messages[-MAX_HISTORY:]:
        if not isinstance(m, dict):
            return None
        role = m.get("role")
        content = m.get("content")
        if role not in {"user", "assistant"} or not isinstance(content, str):
            return None
        cleaned.append({"role": role, "content": content.strip()})
    if not any(m["role"] == "user" for m in cleaned):
        return None
    return cleaned


@advisor_bp.route("/")
def index():
    return render_template("advisor.html", active="advisor")


@advisor_bp.post("/api/chat")
def chat():
    """Non-streaming chat completion. Body: { messages: [{role, content}, ...] }"""
    payload = request.get_json(silent=True) or {}
    messages = _validate_messages(payload)
    if messages is None:
        return jsonify({"error": "Invalid or empty messages payload."}), 400
    try:
        reply = GroqService().chat(messages)
        return jsonify({"role": "assistant", "content": reply})
    except RuntimeError as exc:
        logger.error("Advisor chat failed: %s", exc)
        return jsonify({"error": str(exc)}), 502
    except Exception:
        logger.exception("Unexpected advisor error")
        return jsonify({"error": "Internal server error."}), 500


@advisor_bp.post("/api/chat/stream")
def chat_stream():
    """Server-Sent Events stream of assistant tokens."""
    payload = request.get_json(silent=True) or {}
    messages = _validate_messages(payload)
    if messages is None:
        return jsonify({"error": "Invalid or empty messages payload."}), 400

    def event_stream():
        try:
            service = GroqService()
            for chunk in service.stream(messages):
                yield f"data: {json.dumps({'delta': chunk})}\n\n"
            yield f"data: {json.dumps({'done': True})}\n\n"
        except RuntimeError as exc:
            logger.error("Advisor stream failed: %s", exc)
            yield f"data: {json.dumps({'error': str(exc)})}\n\n"
        except Exception:
            logger.exception("Unexpected advisor stream error")
            yield f"data: {json.dumps({'error': 'Internal server error.'})}\n\n"

    return Response(
        stream_with_context(event_stream()),
        mimetype="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Connection": "keep-alive",
        },
    )
