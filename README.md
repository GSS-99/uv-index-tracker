# UV Index Tracker ☀️

A full-stack single-page application (SPA) designed to help users monitor real-time UV index metrics, calculate safe sun-exposure windows using personalized skin profiles, and bookmark high-frequency locations.

👉 **[View Technical Architecture & System Design Specs](./DESIGN.md)**

---

## Features
* **Real-time UV Dashboard:** Live UV Index and risk classifications powered by Open-Meteo.
* **Personalized Protection Calculator:** Calculates personalized "Time-to-Burn" safety windows based on Fitzpatrick Skin Types.
* **Saved Locations Tracker:** Bookmark and monitor frequent geographic locations.
* **Sunscreen Reapplication Timer:** Interactive countdown timer for SPF reapplication alerts.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (Raw SQL via `pg` pool) |
| **External API** | Open-Meteo API |

---

## Getting Started

### Prerequisites
* **Node.js** (v18 or higher)
* **PostgreSQL** installed and running locally

---

### Local Installation & Setup

**Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/uv-index-tracker.git](https://github.com/your-username/uv-index-tracker.git)
   cd uv-index-tracker

1. Database Setup:
Create a PostgreSQL database named uv_tracker_db and execute the schema:

psql -d uv_tracker_db -f backend/db/schema.sql

2. Backend Setup:

cd backend
npm install

-Create a .env file in the backend/ directory:

PORT=5001
DATABASE_URL=postgres://localhost:5432/uv_tracker_db

-Start the backend development server:

npm run dev

3. Frontend Setup:
Open a new terminal window:

cd frontend
npm install
npm run dev

4. Project Structure:

uv-index-tracker/
├── backend/            # Express REST API & Database configuration
│   ├── db/             # PostgreSQL schema DDL files
│   ├── routes/         # API endpoints (uv, locations)
│   └── index.js        # Server entry point
├── frontend/           # React + Vite application
│   ├── src/            # Components, pages, and utility modules
│   └── index.html      # Vite HTML template
├── DESIGN.md           # Technical design specifications
└── README.md           # Project overview and setup guide