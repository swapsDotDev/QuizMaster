// import { useLocation, useNavigate } from "react-router-dom";

// export default function ResultPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const data = location.state;

//   if (!data) {
//     return (
//       <div>
//         <h2>No results found.</h2>
//         <button onClick={() => navigate("/")}>Go Home</button>
//       </div>
//     );
//   }

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Quiz Completed!</h1>
//       <h2>Score: {data.score} / {data.total}</h2>

//       <h3>Details:</h3>
//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {data.results.map(r => (
//           <li key={r.id} style={{ margin: "10px" }}>
//             Question {r.id}: {r.isCorrect ? "✅ Correct" : "❌ Wrong"} (Correct Answer: {r.correctAnswer + 1})
//           </li>
//         ))}
//       </ul>

//       <button onClick={() => navigate("/")}>Restart Quiz</button>
//     </div>
//   );
// }

import { useLocation, useNavigate } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return (
      <div className="result-page">
        <div className="result-container">
          <h2>No results found.</h2>
          <button
            className="action-button primary"
            onClick={() => navigate("/")}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const percentage = Math.round((data.score / data.total) * 100);
  const passed = percentage >= 60;

  return (
    <div className="result-page">
      <div className="result-container">
        <div className="result-icon">
          {passed ? (
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          ) : (
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          )}
        </div>

        <h1 className="result-title">Quiz Completed!</h1>

        <div className="score-display">
          <div className="score-circle">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="12"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke={passed ? "#10b981" : "#f59e0b"}
                strokeWidth="12"
                strokeDasharray={`${percentage * 5.65} 565`}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
              />
            </svg>
            <div className="score-text">
              <div className="score-number">
                {data.score}/{data.total}
              </div>
              <div className="score-percentage">{percentage}%</div>
            </div>
          </div>
        </div>

        <p className="result-message">
          {passed
            ? "Congratulations! You passed the quiz with flying colors!"
            : "Good effort! Keep practicing to improve your score."}
        </p>

        <div className="question-breakdown">
          <h3>Question Breakdown</h3>
          <div className="breakdown-list">
            {data.results.map((r, idx) => (
              <div
                key={r.id}
                className={`breakdown-item ${
                  r.isCorrect ? "correct" : "incorrect"
                }`}
              >
                <div className="breakdown-header">
                  <span className="breakdown-number">Question {r.id}</span>
                  <span className="breakdown-status">
                    {r.isCorrect ? (
                      <>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Correct
                      </>
                    ) : (
                      <>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        Incorrect
                      </>
                    )}
                  </span>
                </div>
                {!r.isCorrect && (
                  <div className="breakdown-details">
                    <span>
                      Your answer: {String.fromCharCode(65 + r.userAnswer)}
                    </span>
                    <span>
                      Correct answer:{" "}
                      {String.fromCharCode(65 + r.correctAnswer)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="result-actions">
          <button
            className="action-button secondary"
            onClick={() => navigate("/")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            Go Home
          </button>
          <button
            className="action-button primary"
            onClick={() => navigate("/quiz")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
            </svg>
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;