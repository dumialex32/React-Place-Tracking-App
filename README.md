# WorldWise - Travel Tracking App 🌍

## A travel tracking application for tracking your travels around the world. Mark cities you've visited, add notes, and see them on a map.

---

### Features:

- View list of visited cities

- Add new cities with notes and dates

- See cities on an interactive map

---

### Installation & Setup:

Prerequisites
Node.js (v14 or later)

1. Clone the repository

   ```bash
   git clone https://github.com/dumialex32/worldwise.git
   cd React-Place-Tracking-App
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up the JSON Server (mock backend)
   Install JSON Server globally (if you haven't already):

   ```bash
   npm install -g json-server
   ```

4. Start the server in a separate terminal:

   ```bash
   json-server --watch data/cities.json --port 8000
   ```

5. Start the React application
   In another terminal:

   ```bash
   npm run dev
   ```

The app should automatically open in your browser at http://localhost:5173 (or similar port).
