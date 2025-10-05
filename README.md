
# Online Quiz Application

A full-stack React application built with Vite, allowing users to take a timed quiz, submit answers, and view their results with a detailed breakdown. The backend is powered by Node.js, Express, and SQLite, while the frontend uses React with a modern, responsive UI.

## Project Overview
The Online Quiz Application enables users to test their knowledge through an interactive quiz. Users can start the quiz, answer multiple-choice questions, navigate between questions, and submit their answers to receive a score. The application includes a timer and provides detailed feedback on correct and incorrect answers.

### Core Features

#### Backend:
- SQLite database to store quiz questions, options, and correct answers.
- API endpoints:
  - `GET /api/questions`: Fetches quiz questions without correct answers.
  - `POST /api/submit`: Accepts user answers, calculates the score, and returns results with feedback.

#### Frontend:
- Start page to begin the quiz.
- Quiz page displaying one question at a time with navigation ("Next", "Previous") and a "Submit" button.
- Result page showing the score, percentage, and a breakdown of correct/incorrect answers.
- State management to track user answers.

### Bonus Features:
- A 5-minute timer that auto-submits the quiz when expired.
- Detailed question breakdown on the results page, showing correct and incorrect answers.

## Tech Stack
- **Frontend**: React, Vite, React Router
- **Backend**: Node.js, Express, SQLite
- **Styling**: Custom CSS (`styles.css`)
- **Dev Tools**: ESLint, Vite with React Compiler enabled

## Getting Started

### Prerequisites
- Node.js (>= 14.x)
- npm or yarn
# QuizMaster — Online Quiz Application

A full-stack React + Vite quiz app with a Node/Express + SQLite backend. Users can start a timed quiz, answer one question at a time, submit answers, and see a detailed result breakdown.

This README explains how to run the project locally, what endpoints exist, and troubleshooting tips.

## Project layout

```
QuizMaster/
├── backend/                # Express server + SQLite db
│   ├── package.json
│   ├── quiz.db             # SQLite DB (created / seeded)
│   └── src/
│       ├── server.js
│   │       ├── db.js
│   │       └── routes/quizRoutes.js
├── frontend/               # React + Vite app
│   ├── package.json
│   └── src/
│       ├── App.jsx
│   ├── main.jsx
│   ├── pages/
│   │   ├── StartPage.jsx
│   │   ├── QuizPage.jsx
│   │   └── ResultPage.jsx
│   └── components/
│       ├── QuestionCard.jsx
│       ├── ProgressBar.jsx
│       └── Timer.jsx
└── package.json            # top-level scripts (start server+client concurrently)
```

## Requirements
- Node.js 14+ and npm

## Install

1. Install top-level dependencies used to orchestrate both servers (optional):

```bash
npm install
```

2. Install backend and frontend packages separately (if you prefer):

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Run (development)

From the repository root you can start both backend and frontend together:

```pwsh
npm run start
```

This runs the backend on http://localhost:5000 and the frontend (Vite) on http://localhost:5173.

You can also run them individually:

Backend only:

```pwsh
cd backend
npm run dev
# or: npm start
```

Frontend only:

```pwsh
cd frontend
npm run dev
```

## API

Base URL: http://localhost:5000

### GET /api/questions
Returns the quiz questions *without* correct answers. Example response:

```json
[
  { "id": 1, "text": "What is the capital of France?", "options": ["London","Berlin","Paris","Madrid"] }
]
```

### POST /api/submit
Request body:

```json
{ "answers": { "1": 2, "2": 1 } }
```

Response:

```json
{
  "score": 2,
  "total": 5,
  "results": [
    { "id": 1, "isCorrect": true, "userAnswer": 2, "correctAnswer": 2 }
  ]
}
```

The backend validates the answers payload, computes per-question correctness using the stored `correctAnswer` values, and returns a detailed breakdown.

## Testing

The backend includes a basic Jest test setup (see `backend/tests/quiz.test.js`). Run backend tests:

```pwsh
cd backend
npm test
```

If tests are not yet present or failing, please open `backend/tests` to add assertions around scoring and payload validation.

## Troubleshooting

- 404 when the frontend requests `/api/questions`:
  - Ensure the backend server is running (check the terminal where `npm run dev` or `npm start` is active).
  - Make sure the router in `backend/src/routes/quizRoutes.js` exposes `/questions` and the server mounts the router at `/api` (this project does that by default).
  - Confirm `db.js` connected to `quiz.db` successfully (startup logs print the database path). If `quiz.db` is missing, the backend may exit; recreate or seed it.

- CORS: The backend uses `cors()` so local dev requests from Vite should be allowed.

- Port conflicts: Backend defaults to 5000; frontend to 5173. If those ports are in use, stop conflicting processes or change the ports.

- If you see answers leaking in the `/api/questions` response, make sure `db.js` does not include `correctAnswer` when building the public response (the repo has been updated to avoid this).

## Creating / Seeding the SQLite database

If you need to create or re-seed the `quiz.db` manually, a SQL seed file is provided at `backend/seed.sql`.

Steps (run from the `backend` folder):

```pwsh
# Create the DB file and run the seed script
sqlite3 quiz.db < seed.sql

# Verify content (optional)
sqlite3 quiz.db "SELECT id, text, options, correctAnswer FROM questions;"
```

The `seed.sql` file creates the `questions` table and inserts 5 sample questions. After seeding, restart the backend server.

## Next improvements (suggested)

- Add validation for submitted question IDs: ensure the frontend cannot submit unknown IDs.
- Persist partial answers in `localStorage` to survive reloads.
- Add authentication if you want per-user tracking.
- Add more unit tests for the scoring logic and API error cases.

## Contact

If you want me to run the backend tests, re-seed the database, or add more detailed logging for troubleshooting, tell me which step to run and I will execute it and report back.
