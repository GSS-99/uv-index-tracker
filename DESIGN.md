# Technical Specification: Full-Stack UV Index Tracker

## 1. Product Requirements & Feature Set
*   **Real-time UV Dashboard:** Automatically fetches the user's current location via frontend GPS coordinates and loads the live UV Index, sun category (Low, High, Extreme), and safety recommendations.
*   **Fitzpatrick Skin Profile & Safe Exposure Calculator:** Users can select their skin type profile to calculate a customized "Time-to-Burn" safety window using client-side JavaScript formulas.
*   **Saved Locations Tracker:** Authenticated users can bookmark frequent geographic locations (e.g., home, vacation spots, beaches) for instant monitoring.
*   **Sunscreen Reapplication Timer:** A client-side notification/timer interface that tracks active sun exposure and alerts the user to reapply SPF protection every 2 hours.

## 2. API Routing Table (REST Architecture)
Every endpoint handles JSON data payloads and is structured under the `/api` namespace:

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/uv?lat={lat}&lon={lon}` | Fetches live UV data from external weather APIs (Open-Meteo/OpenUV) | No |
| `POST` | `/api/auth/google` | Validates Google OAuth tokens and initializes a user session | No |
| `POST` | `/api/auth/logout` | Clears active authentication session cookies | Yes |
| `GET` | `/api/locations` | Retrieves a list of the user's bookmarked locations from the database | Yes |
| `POST` | `/api/locations` | Saves a new city or set of GPS coordinates to the user's profile | Yes |
| `DELETE` | `/api/locations/:id` | Deletes a bookmarked location from the database engine | Yes |

## 3. Relational Database Schema (PostgreSQL via Prisma)
The database structure relies on standard relational patterns to connect authenticated users to their specific data records:

*   **User Model:** Core system identity records. Tracks unique database IDs, email profiles, created timestamps, and sets up explicit relational links to user settings and saved location metrics.
*   **Profile Model:** Extends the User record with personal preferences. Stores data points mapping to skin type classifications (Fitzpatrick scale values) and preferred baseline SPF configurations.
*   **Location Model:** Tracks saved coordinates. Stores references back to the parent User ID alongside city name definitions, latitude metrics, and longitude metrics.

## 4. UI Architecture & Component Framework
The system is built as a single-page application using React functional components:
*   `/pages`: Contains core layout states including `DashboardView`, `AuthView`, and `ProfileSettingsView`.
*   `/components`: Reusable user interface segments including a global navigation bar, contextual information alerts, metric status dials, and countdown timers.