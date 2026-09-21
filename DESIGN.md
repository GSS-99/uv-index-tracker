# Technical Specification: UV Index Tracker

## 1. System Overview & Tech Stack
A full-stack single-page application (SPA) providing real-time UV index monitoring, personalized skin-exposure calculation, and location bookmarking.

* **Frontend:** React, Vite, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (accessed via native `pg` driver using parameterized raw SQL)
* **External Services:** Open-Meteo Weather API

---

## 2. Feature Set
* **Real-time UV Dashboard:** Queries local UV index metrics using browser location coordinates or custom search terms.
* **Personalized Protection Calculator:** Calculates safe sun-exposure windows based on client-side Fitzpatrick Skin Type formulas.
* **Saved Locations Tracker:** Allows authenticated users to bookmark high-frequency locations for quick retrieval.
* **Sunscreen Reapplication Timer:** Client-side timer notifying users to reapply SPF protection.

---

## 3. Database Architecture
The database schema is defined and executed directly in `backend/db/schema.sql` (Single Source of Truth).

* **`users`**: Core user accounts created during Google OAuth authentication.
* **`profiles`**: 1-to-1 extension of `users`. Stores Fitzpatrick skin classifications (1–6) and baseline SPF preferences.
* **`locations`**: 1-to-Many relation linked to `users`. Stores bookmarked GPS coordinates with `ON DELETE CASCADE` rules.

---

## 4. REST API Specification

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/uv?lat={lat}&lon={lon}` | Proxies requests to Open-Meteo API for UV index data | No |
| `POST` | `/api/auth/google` | Validates Google OAuth tokens and sets user session | No |
| `POST` | `/api/auth/logout` | Terminates active user session | Yes |
| `GET` | `/api/locations` | Fetches bookmarked locations for the active user | Yes |
| `POST` | `/api/locations` | Bookmarks a new location for the active user | Yes |
| `DELETE` | `/api/locations/:id` | Deletes a bookmarked location record | Yes |

---

## 5. Frontend Architecture
* **`src/pages/`**: Main page layouts (`Dashboard`, `Login`, `Profile`, `Info`).
* **`src/components/`**: Reusable UI components (SearchBar, UVDial, ExposureTimer, LocationCard).
* **`src/services/`**: Modular API fetch modules wrapping backend HTTP requests.