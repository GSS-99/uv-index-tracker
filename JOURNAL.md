# Developer Journal: UV Index Tracker

## Day 1: Foundation, Git Hygiene & Database Baseline
**Date:** September 18, 2026

### Overview
Today was focused on laying a clean, professional foundation for the full-stack UV Index Tracker project. I established the core repository structure, resolved Git environment configuration issues, and verified backend-to-database connectivity.

---

### Key Accomplishments
* **Repository Architecture & Git Setup:** 
  * Cleaned up nested workspace folder issues to ensure `.gitignore`, `.gitattributes`, `DESIGN.md`, and `backend/` sit at the project root level.
  * Published the repository as a public project on GitHub directly via VS Code's integrated Source Control.
* **Security & Git Hygiene:**
  * Verified `.gitignore` rules to safeguard database secrets (`.env`) from being committed.
  * Committed `.gitattributes` to handle cross-platform line-ending normalization (`LF`).
* **Backend Baseline:**
  * Validated the Express server running on `http://localhost:5001` (avoiding macOS AirPlay port 5000 conflicts).
  * Confirmed PostgreSQL connection (`uv_tracker_db`) via `pg.Pool` using an active `/api/health` endpoint.

---

### Development Copilot & Engineering Process
* **AI Technical Mentor:** Used **Google Gemini** as my project development copilot and technical pair programmer. Gemini served as a senior engineering mentor, guiding architectural decisions, debugging Git structure, and ensuring clean environment practices.
* **Workflow Strategy:** Established a daily context-prompting workflow to maintain high context precision, prevent AI hallucinations, and practice articulating code choices clearly.

---

### Key Technical Learnings
1. **Cross-Platform Line Endings:** Understood how `.gitattributes` prevents phantom Git line-change warnings across Mac (`LF`) and Windows (`CRLF`).
2. **System Port Conflicts:** Learned how macOS background services default to port 5000 and why moving dev environments to port 5001 prevents unexpected connection drops.

---

### Goals for Tomorrow
1. **Backend Routes (Raw SQL):** Create `routes/uv.js` (Open-Meteo external API proxy) and `routes/locations.js` (raw SQL CRUD operations for saved locations).
2. **Frontend Initialization:** Initialize a React app in `frontend/` using Vite and set up Tailwind CSS.
3. **End-to-End Integration:** Connect React to Express using a `useEffect` fetch call to verify full-stack data flow.