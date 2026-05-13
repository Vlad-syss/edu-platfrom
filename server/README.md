# EduPlatform Server

Node.js / Express backend for the EduPlatform React app.

## Local setup

1. Download the Firebase Admin service account key:
   - Firebase Console → Project settings → Service accounts → **Generate new private key**.
   - Save the JSON file as `server/serviceAccountKey.json` (gitignored).
2. Install dependencies:
   ```
   cd server
   npm install
   ```
3. (Optional) copy `.env.example` to `.env` and adjust `PORT` / `CLIENT_ORIGIN`.
4. Run the server:
   ```
   npm run dev
   ```
   The API listens on `http://localhost:5000`.

The Vite dev server (`npm run dev` from `lab3-new/`) proxies `/api/*` to `http://localhost:5000`, so the React app can call relative URLs in development.

## Endpoints

| Method | Path                       | Auth | Description                                                   |
| ------ | -------------------------- | ---- | ------------------------------------------------------------- |
| GET    | `/api/health`              | no   | Health check.                                                 |
| GET    | `/api/protected`           | yes  | Sample protected route.                                       |
| GET    | `/api/reviews/:courseId`   | no   | All reviews for a course. Adds `dateFormatted` (DD.MM.YYYY) and sorts by date descending. |
| POST   | `/api/reviews`             | yes  | Adds a new review. Validates `text` length (10–500). Sets `createdAt` (ISO 8601). |

Authenticated requests must include a Firebase ID token: `Authorization: Bearer <token>`.

## Production build

```
# from lab3-new/
npm run build           # produces lab3-new/dist/
# from lab3-new/server/
npm start               # serves dist/ as static + API on the same port
```

## Deployment (Render)

- Root directory: `lab3-new/server`
- Build command: `npm install`
- Start command: `node server.js`
- Env vars:
  - `CLIENT_ORIGIN` — your Netlify URL (e.g. `https://edu-platform.netlify.app`)
  - `FIREBASE_SERVICE_ACCOUNT` — paste the full JSON of the service account key (single line).
