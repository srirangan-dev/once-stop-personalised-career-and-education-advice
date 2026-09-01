# PathFinder — Career & Education Advisor 🎓

**Live demo:** https://school-students-olive.vercel.app/

PathFinder is a full-stack web app that helps Indian school students (Class 9–College) figure out what career and academic path suits them. It combines an interest-based quiz, curated field/career information, a nearby-college finder, and an AI study assistant — all behind a simple login/signup flow with a personal dashboard.

## ✨ Features

- **Career Discovery Quiz** — A general quiz (`/quiz`) narrows students toward a broad field, then a field-specific quiz (`/quiz/:fieldId`) refines it further.
- **Career Paths** — Browse detailed info per field: relevant degrees, career options, top entrance exams, average salary range, and required skills.
- **Nearby Colleges Finder** — Uses the browser's Geolocation API + OpenStreetMap's Nominatim and Overpass APIs (100% free, no API key) to find and categorize colleges near the student (Engineering, Medical, Law, Polytechnic, Arts & Science, etc.) with distance sorting.
- **Timeline** — A roadmap/planning view for the student's academic journey.
- **AI Study Assistant** — A floating chat widget that answers strictly study-related questions (math, science, history, etc.) for CBSE/ICSE students, powered by Groq's Llama 3.1 API via a backend proxy.
- **Auth & Dashboard** — JWT-based signup/login; a personal dashboard stores quiz results, saved colleges, and a recent-activity log.
- **Protected Routes** — Quiz, careers, colleges, timeline, dashboard, and learn sections require login.

## 🏗️ Tech Stack

**Frontend**
- React 18 + Vite
- React Router DOM (routing)
- Framer Motion (animations)
- Recharts (data visualization)
- Axios (HTTP client)
- React Icons

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JSON Web Tokens (`jsonwebtoken`) for auth
- bcryptjs for password hashing
- CORS configured for local dev + Vercel/Render/Netlify deployments
- Groq API (Llama 3.1 8B Instant) for the AI assistant, called server-side to keep the key private

**Deployment**
- Frontend: Vercel (`vercel.json` → Vite build, `dist` output)
- Backend: Render (referenced in the CORS allow-list as `once-stop-personalised-career-and-wayn.onrender.com`)
- Database: MongoDB (Atlas or similar, via `MONGO_URI`)

## 📁 Project Structure

```
├── src/
│   ├── pages/          # Home, Quiz, FieldQuiz, CareerPaths, Colleges, Timeline, Dashboard, Login, Signup
│   ├── components/      # Navbar, Footer, AIAssistant, LearnSection, NearbyColleges, VideoCard/Modal, ProtectedRoute
│   ├── context/          # AuthContext (auth state)
│   ├── data/             # Fieldsdata.jsx, videos.jsx (static content)
│   ├── utils/             # DashboardHelpers.jsx
│   ├── config.js          # API_URL and app constants (from env vars)
│   └── App.jsx             # Route definitions
├── server/
│   ├── routes/    # auth.js, chat.js, dashboard.js
│   ├── models/    # User.js (Mongoose schema)
│   ├── middleware/  # auth.js (JWT verification)
│   └── index.js       # Express app entry point
├── public/
├── vite.config.js
└── vercel.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB connection string (e.g. MongoDB Atlas)
- A Groq API key (for the AI assistant)

### 1. Clone the repo
```bash
git clone https://github.com/srirangan-dev/once-stop-personalised-career-and-education-advice.git
cd once-stop-personalised-career-and-education-advice
```

### 2. Set up the backend
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_KEY=your_groq_api_key
```

Run the server:
```bash
npm run dev     # with nodemon
# or
npm start
```

### 3. Set up the frontend
From the project root:
```bash
npm install
```

Create a `.env` file in the root (optional — defaults to `http://localhost:5000`):
```env
VITE_API_URL=http://localhost:5000
```

Run the dev server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### 4. Build for production
```bash
npm run build
npm run preview
```

## 🔌 API Overview

| Route | Method | Description |
|---|---|---|
| `/api/auth/register` | POST | Create a new user account |
| `/api/auth/login` | POST | Log in and receive a JWT |
| `/api/auth/profile` | GET | Get the logged-in user's profile |
| `/api/auth/profile` | PUT | Update profile (stream, grade, name) |
| `/api/chat` | POST | Proxy to Groq's chat completion API for the study assistant |
| `/api/dashboard` | GET | Get quiz results, saved colleges, and activity log |
| `/api/dashboard/quiz` | POST | Save a quiz result |
| `/api/test` | GET | Health check |

Protected routes require an `Authorization: Bearer <token>` header.

## 🌍 Environment Variables

| Variable | Where | Purpose |
|---|---|---|
| `VITE_API_URL` | Frontend | Base URL of the backend API |
| `MONGO_URI` | Backend | MongoDB connection string |
| `JWT_SECRET` | Backend | Secret used to sign/verify JWTs |
| `GROQ_KEY` | Backend | API key for Groq (AI assistant) |
| `PORT` | Backend | Port the Express server listens on |

## 📄 License

No license specified — add one if you plan to open-source or distribute this project.
