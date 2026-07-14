# Deployment

## Frontend (TanStack Start)

Any platform that supports Node/Bun SSR works. Recommended: Cloudflare Workers, Vercel, Netlify, or the Lovable-hosted preview/publish flow.

```bash
bun run build
bun run start
```

Set production environment variables in your hosting dashboard:
`LOVABLE_API_KEY`, `GOOGLE_APPS_SCRIPT_URL`.

### Lovable Publish

Click **Publish** in the Lovable editor — a stable URL is minted at `project--<id>.lovable.app`.

## Backend (Flask)

Use `gunicorn` behind a reverse proxy (Nginx / Caddy).

```bash
cd backend
pip install -r requirements.txt
gunicorn -w 4 -b 0.0.0.0:5000 run:app
```

Set env vars: `SECRET_KEY`, `GROQ_API_KEY`, `GOOGLE_SHEETS_ID`,
`GOOGLE_SERVICE_ACCOUNT_FILE` (mount the JSON securely).

## Google Apps Script

Re-deploy the Web App on every `Code.gs` change (Apps Script pins each
deployment to a version). Rotate the URL if you need to invalidate old
clients.

## Checklist

- [ ] Secrets set in the hosting environment (never committed)
- [ ] `service_account.json` mounted as a secret file (Flask only)
- [ ] HTTPS enforced
- [ ] Apps Script deployment access set to *Anyone* but URL kept private
- [ ] Error monitoring wired (Sentry / hosting logs)
