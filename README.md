
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

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd online-quiz-app
   ```

2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```

4. Set up the backend:  
   The backend uses SQLite, which creates a `quiz.db` file automatically in the server directory.  
   The database is seeded with 5 sample questions on startup.

5. Run the backend:
   ```bash
   cd server
   npm start
   ```
   The server runs on http://localhost:5000 by default.

6. Run the frontend:
   ```bash
   cd client
   npm run dev
   ```
   The frontend runs on http://localhost:5173 (default Vite port).

7. Access the application:  
   Open http://localhost:5173 in your browser to start the quiz.

## Project Structure
```
online-quiz-app/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Reusable components (ProgressBar, QuestionCard, Timer)
│   │   ├── pages/          # Page components (StartPage, QuizPage, ResultPage)
│   │   ├── App.jsx         # Main app with routing
│   │   └── styles.css      # Custom styles
├── server/                 # Backend (Node.js + Express)
│   ├── routes/
│   │   └── quizRoutes.js   # API routes
│   ├── db.js               # SQLite database setup
│   └── server.js           # Express server
├── quiz.db                 # SQLite database file (auto-generated)
└── README.md               # Project documentation
```

## Available Scripts

### In the client directory:
- `npm run dev`: Starts the Vite development server with hot module replacement (HMR).
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code issues.

### In the server directory:
- `npm start`: Starts the Express server.

## API Endpoints

### GET /api/questions
Returns: Array of questions with id, text, and options (excludes correct answers).

**Example Response:**
```json
[
  { "id": 1, "text": "What is the capital of France?", "options": ["London", "Berlin", "Paris", "Madrid"] }
]
```

### POST /api/submit
**Request Body:**
```json
{ "answers": { "1": 2, "2": 1 } }
```

**Response:**
```json
{
  "score": 2,
  "total": 5,
  "results": [
    { "id": 1, "isCorrect": true, "userAnswer": 2, "correctAnswer": 2 }
  ]
}
```

## Future Improvements
- Backend:
  - Add unit tests for scoring logic (e.g., using Jest).
  - Validate question IDs in the /submit endpoint.
  - Use environment variables for configuration (e.g., PORT, database path).

- Frontend:
  - Add unit tests for components using Jest and React Testing Library.
  - Require answer selection before navigating or submitting.
  - Enhance accessibility with ARIA attributes and keyboard navigation.
  - Persist quiz state in localStorage to prevent data loss on refresh.

- General:
  - Use environment variables for API URLs (e.g., REACT_APP_API_URL).
  - Add TypeScript for type safety.
  - Document API and components with JSDoc or OpenAPI.

## License
This project is open-source and available under the MIT License.
