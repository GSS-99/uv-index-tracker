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

# Developer Journal: UV Index Tracker

## Day 2: Backend Proxy, Parameterized SQL & React/Vite Setup

**Date:** September 19, 2026

### Overview

Today's focus was bridging the Express backend to both an external weather API and PostgreSQL using parameterized raw SQL queries, then initializing a modern React frontend and verifying end-to-end data flow.

---

### Key Accomplishments

* **Backend API Proxy & Feature Routes:**
* Created `routes/uv.js` as a proxy endpoint (`GET /api/uv?lat={lat}&lon={lon}`) to query Open-Meteo safely from the server side.


* Built `routes/locations.js` supporting CRUD operations (`GET`, `POST`, `DELETE /api/locations`) using parameterized raw SQL queries (`$1, $2, ...`).


* Configured Express `express.json()` middleware and mounted feature routers with centralized error handling using `next(error)`.




* **Database Schema Alignment & Seeding:**
* Aligned backend routes with `schema.sql` (column `city_name`, coordinate precision `DECIMAL(9,6)`).


* Set up foreign key relationships (`REFERENCES users(id) ON DELETE CASCADE`) and added a development seed user (`id: 1`) to enable pre-auth location saving.




* **Frontend Initialization & Tailwind v4:**
* Initialized a React application in `frontend/` using Vite.


* Configured Tailwind CSS v4 using the modern `@tailwindcss/vite` plugin architecture.


* **End-to-End Pipeline Verification:**
* Connected React to Express via a custom `useEffect` fetch call (`http://localhost:5001/api/locations`).


* Verified end-to-end data rendering directly from PostgreSQL through Express to the browser UI.





---

### Development Copilot & Engineering Process

* **AI Technical Mentor:** Worked alongside **Google Gemini** as a senior full-stack mentor and interview partner.


* **Workflow Strategy:** Adopted an API-First testing workflow in Postman before UI integration, catching schema/column mismatches early and establishing solid interview defenses for key architectural choices.



---

### Key Technical Learnings & Interview Defenses

1. **Backend Proxying vs. Direct Client Calls:** Proxying external APIs through Express shields API keys, circumvents browser CORS restrictions, and provides a central bottleneck for future rate-limiting or server-side caching.


2. **Parameterized SQL vs. ORMs:** Native `pg.Pool` parameterized queries separate code execution from untrusted input at the database engine level, completely neutralizing SQL injection attacks without ORM overhead.


3. **Fixed-Point `DECIMAL(9,6)` for Geolocation:** Storing coordinates with fixed-point decimal precision prevents binary floating-point (`FLOAT`) rounding errors, providing exact accuracy down to ~11 centimeters.
4. **Vite vs. Create React App (CRA):** Vite serves code over native browser ES Modules (ESM) and uses `esbuild` for dependency pre-bundling, delivering instant dev server startup and lightning-fast Hot Module Replacement (HMR).

---

### Goals for Tomorrow (Day 3)

1. **Interactive Search & Location CRUD UI:** Build UI components for user city search and wire up save/delete buttons directly to `POST` and `DELETE /api/locations` endpoints.


2. **Live UV Forecast Component:** Trigger the `/api/uv` backend proxy for active locations and map raw Open-Meteo data to visual WHO UV risk index badges (Low to Extreme).


3. **Async State & Error UX:** Implement loading indicators, empty states, and fallback error handling for active network requests.