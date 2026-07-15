# Milestone 5 — Project Development Phase

## Frontend (React + TanStack Start)

**Location:** `src/` at the repository root.

> Note: TanStack Start / Vite requires the app to live at the repo root
> (it discovers `vite.config.ts`, `package.json`, and `src/routes/`).
> Moving `src/` into a nested `frontend/` folder would break the build,
> so the frontend stays at root while all supporting documentation and
> milestone artifacts live in their dedicated folders.

- `src/routes/` — file-based routes (pages + `/api/chat` server route).
- `src/components/` — reusable UI (`finwise/`, `home/`, layout).
- `src/lib/` — server functions, AI gateway, Sheets service, loan engine.
- `src/styles.css` — Tailwind v4 tokens, glass + gradient utilities.

## Backend Reference (Flask)

**Location:** `backend/`.

- `backend/app/routes/` — blueprints: `main`, `loan`, `credit`, `emi`, `advisor`.
- `backend/app/services/` — `eligibility_service`, `groq_service`, `sheets_service`.
- `backend/app/templates/` — Jinja2 templates with reusable header/footer partials.
- `backend/app/static/` — CSS (`base`, `layout`, `components`, `pages`) + JS.

## Integrations

- `integrations/google-apps-script/Code.gs` — webhook that appends rows to
  three tabs of the target Google Sheet.

## AI Prompt

- `prompts/financial-advisor.md` — canonical system prompt shared between the
  React server route and the Flask advisor service.

## Development Workflow

```bash
bun install
bun run dev        # http://localhost:8080
bun run build      # production build
bun run lint       # ESLint
```

For the Flask reference stack, see `backend/README.md`.

## Coding Standards
- **TypeScript strict mode** for all frontend code.
- **Zod validation** on every server-function input.
- **Design tokens only** — no hardcoded colors in JSX.
- **Server / client separation** — `.server.ts` and `.functions.ts` files
  never imported into client bundles.
