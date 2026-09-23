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

---

* **Database Schema Alignment & Seeding:**
* Aligned backend routes with `schema.sql` (column `city_name`, coordinate precision `DECIMAL(9,6`).
* Set up foreign key relationships (`REFERENCES users(id) ON DELETE CASCADE`) and added a development seed user (`id: 1`) to enable pre-auth location saving.

---

* **Frontend Initialization & Tailwind v4:**
* Initialized a React application in `frontend/` using Vite.
* Configured Tailwind CSS v4 using the modern `@tailwindcss/vite` plugin architecture.

---

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

## Day 3: Application UI/UX Design & Frontend Architecture Layout

**Date:** September 20, 2026

### Overview

Today’s development was centered around UI/UX design and frontend visual architecture. While the project initially focused on backend proxying, database schemas, and folder structures, today shifted toward designing a cohesive, intuitive user interface for the app before connecting all active interactive frontend components.

---

### Key Accomplishments

* **Application Design Complete:**
  * Defined the overall visual identity, layout structure, and design system for the UV Index Tracker frontend.
  * Mapped out component hierarchy, visual hierarchy, and color palettes corresponding to WHO UV safety risk levels (Low to Extreme).
* **UI/UX Strategy & Workflow Alignment:**
  * Prioritized user experience, accessibility, and visual clarity for dashboard cards, location management panels, and active UV metrics.
  * Documented design specs and component structures to streamline imminent frontend state wiring and API integration.

---

### Development Copilot & Engineering Process

* **AI Technical Mentor:** Partnered with **Google Gemini** to review layout ergonomics, visual clarity, and full-stack design consistency.
* **Workflow Strategy:** Took a design-first approach to the frontend before wiring complex async states, ensuring a smooth transition from layout mockups to functional React components.

---

### Key Technical Learnings & Interview Defenses

1. **Design-First Frontend Development:** Establishing clear visual structure and component layout before managing state prevents unnecessary layout refactors and accelerates component breakdown in React.
2. **Visual Hierarchy in Metrics Dashboarding:** Designing data-dense applications (like real-time weather and UV metrics) requires deliberate spatial hierarchy and responsive layout choices so key safety indicators stand out instantly.

---

