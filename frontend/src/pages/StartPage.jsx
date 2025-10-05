// import { useNavigate } from "react-router-dom";

// export default function StartPage() {
//   const navigate = useNavigate();

//   const startQuiz = () => {
//     navigate("/quiz");
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h1>Welcome to the Quiz!</h1>
//       <button onClick={startQuiz} style={{ padding: "10px 20px", fontSize: "16px" }}>
//         Start Quiz
//       </button>
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";

function StartPage() {
  const navigate = useNavigate();

  return (
    <div className="start-page">
      <div className="start-container">
        <div className="quiz-icon">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
        </div>
        <h1 className="start-title">Welcome to QuizMaster</h1>
        <p className="start-description">
          Test your knowledge with our interactive quiz. Answer questions, track
          your progress, and see how well you perform!
        </p>
        <div className="quiz-info">
          <div className="info-chip">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <span>5 Questions</span>
          </div>
          <div className="info-chip">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>5 Minutes</span>
          </div>
        </div>
        <button className="start-button" onClick={() => navigate("/quiz")}>
          Start Quiz
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default StartPage;