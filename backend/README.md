# FinWise AI

A professional AI-powered financial web application built with Flask.

## Features (planned)

- Loan Eligibility checker
- Credit Score insights
- EMI Calculator
- AI Financial Advisor (Groq API)
- Google Sheets integration for data persistence
- Marketing pages: Home, About, Contact

## Tech Stack

- **Backend:** Python 3.10+, Flask 3
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **AI:** Groq API
- **Data:** Google Sheets API

## Project Structure

```
backend/
├── app/
│   ├── __init__.py            # Application factory
│   ├── config.py              # Configuration classes
│   ├── routes/                # Blueprints per feature
│   │   ├── __init__.py
│   │   ├── main.py            # Home, About, Contact
│   │   ├── loan.py            # Loan eligibility
│   │   ├── credit.py          # Credit score
│   │   ├── emi.py             # EMI calculator
│   │   └── advisor.py         # AI advisor
│   ├── services/              # External integrations (Groq, Sheets)
│   │   ├── __init__.py
│   │   ├── groq_service.py
│   │   └── sheets_service.py
│   ├── templates/
│   │   ├── base.html
│   │   ├── partials/
│   │   │   ├── header.html
│   │   │   └── footer.html
│   │   ├── home.html
│   │   ├── loan.html
│   │   ├── credit.html
│   │   ├── emi.html
│   │   ├── advisor.html
│   │   ├── about.html
│   │   └── contact.html
│   └── static/
│       ├── css/
│       │   ├── base.css
│       │   ├── layout.css
│       │   ├── components.css
│       │   └── pages.css
│       ├── js/
│       │   ├── main.js
│       │   ├── navigation.js
│       │   └── utils.js
│       └── images/
├── instance/                  # Local secrets (gitignored)
├── run.py                     # Entry point
├── requirements.txt
├── .env.example
├── .gitignore
└── README.md
```

## Getting Started

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python run.py
```

App runs at http://localhost:5000

## Environment

See `.env.example` for all required variables.

## License

MIT
