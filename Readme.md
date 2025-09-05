# Legal Logic – React Dashboard

A modern React dashboard for your legal document AI backend.

## Features

- Upload and manage documents (PDF, DOCX, TXT)
- View parsed document text and metadata
- Summarize documents (extractive or LLM)
- “What-if” scenario analysis
- Extract clauses and key entities
- Blue, clean, responsive UI

## Getting Started

### 1. Start the Backend

Follow the backend repo instructions to install dependencies and run FastAPI:

```bash
cd <your-backend-folder>
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 2. Start the Frontend

```bash
cd legal-logic-dashboard
npm install
npm run dev
```

The dashboard will open at [http://localhost:5173](http://localhost:5173).

**By default, the frontend expects the backend at `http://localhost:8000`.**
To change API URL, create a `.env` file and add:

```
VITE_API_URL=http://your-backend-url:8000
```

### 3. Deploy

- **Frontend**: Deploy to Vercel, Netlify, or any static host.
- **Backend**: Deploy to Render, Railway, AWS, or your own server.

---

## Project Structure

- `src/components/`: All React dashboard components
- `src/types.ts`: TypeScript types
- `src/index.css`: Global styles (blue theme)
- `vite.config.ts`: Vite config
- `.env`: (optional) API URL override

---

## License

MIT
