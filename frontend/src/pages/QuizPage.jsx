// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import QuestionCard from "../components/QuestionCard";

// export default function QuizPage() {
//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get("http://localhost:4000/api/questions")
//       .then(res => setQuestions(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   const handleSelect = (questionId, optionIndex) => {
//     setAnswers({ ...answers, [questionId]: optionIndex });
//   };

//   const nextQuestion = () => {
//     if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
//   };

//   const prevQuestion = () => {
//     if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
//   };

//   const submitQuiz = () => {
//     axios.post("http://localhost:4000/api/submit", { answers })
//       .then(res => navigate("/result", { state: res.data }))
//       .catch(err => console.error(err));
//   };

//   if (questions.length === 0) return <div>Loading...</div>;

//   return (
//     <div>
//       <QuestionCard
//         question={questions[currentIndex]}
//         selectedOption={answers[questions[currentIndex].id]}
//         onSelect={handleSelect}
//       />
//       <div style={{ margin: "20px" }}>
//         <button onClick={prevQuestion} disabled={currentIndex === 0}>Previous</button>
//         {currentIndex < questions.length - 1 ? (
//           <button onClick={nextQuestion}>Next</button>
//         ) : (
//           <button onClick={submitQuiz}>Submit</button>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import QuestionCard from "../components/QuestionCard";
// import ProgressBar from "./../components/ProgressBar";
// import Timer from "./../components/Timer";

// // Mock data for demo purposes
// const mockQuestions = [
//   {
//     id: 1,
//     text: "What is the capital of France?",
//     options: ["London", "Berlin", "Paris", "Madrid"],
//     correctAnswer: 2,
//   },
//   {
//     id: 2,
//     text: "Which planet is known as the Red Planet?",
//     options: ["Venus", "Mars", "Jupiter", "Saturn"],
//     correctAnswer: 1,
//   },
//   {
//     id: 3,
//     text: "What is 2 + 2?",
//     options: ["3", "4", "5", "6"],
//     correctAnswer: 1,
//   },
//   {
//     id: 4,
//     text: "Who painted the Mona Lisa?",
//     options: [
//       "Vincent van Gogh",
//       "Pablo Picasso",
//       "Leonardo da Vinci",
//       "Michelangelo",
//     ],
//     correctAnswer: 2,
//   },
//   {
//     id: 5,
//     text: "What is the largest ocean on Earth?",
//     options: [
//       "Atlantic Ocean",
//       "Indian Ocean",
//       "Arctic Ocean",
//       "Pacific Ocean",
//     ],
//     correctAnswer: 3,
//   },
// ];

// function QuizPage() {
//   const [questions] = useState(mockQuestions);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [timeLeft, setTimeLeft] = useState(300);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           submitQuiz();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const handleSelect = (questionId, optionIndex) => {
//     setAnswers({ ...answers, [questionId]: optionIndex });
//   };

//   const nextQuestion = () => {
//     if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
//   };

//   const prevQuestion = () => {
//     if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
//   };

//   const submitQuiz = () => {
//     const results = questions.map((q) => ({
//       id: q.id,
//       isCorrect: answers[q.id] === q.correctAnswer,
//       userAnswer: answers[q.id],
//       correctAnswer: q.correctAnswer,
//     }));

//     const score = results.filter((r) => r.isCorrect).length;

//     navigate("/result", {
//       state: {
//         score,
//         total: questions.length,
//         results,
//         questions,
//       },
//     });
//   };

//   if (questions.length === 0) return <div className="loading">Loading...</div>;

//   return (
//     <div className="quiz-page">
//       <header className="quiz-header">
//         <ProgressBar current={currentIndex + 1} total={questions.length} />
//         <Timer timeLeft={timeLeft} />
//       </header>

//       <main className="quiz-main">
//         <QuestionCard
//           question={questions[currentIndex]}
//           selectedOption={answers[questions[currentIndex].id]}
//           onSelect={handleSelect}
//         />
//       </main>

//       <footer className="quiz-footer">
//         <button
//           className="nav-button secondary"
//           onClick={prevQuestion}
//           disabled={currentIndex === 0}
//         >
//           <svg
//             width="20"
//             height="20"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//           >
//             <line x1="19" y1="12" x2="5" y2="12" />
//             <polyline points="12 19 5 12 12 5" />
//           </svg>
//           Previous
//         </button>
//         {currentIndex < questions.length - 1 ? (
//           <button className="nav-button primary" onClick={nextQuestion}>
//             Next
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <line x1="5" y1="12" x2="19" y2="12" />
//               <polyline points="12 5 19 12 12 19" />
//             </svg>
//           </button>
//         ) : (
//           <button className="nav-button primary submit" onClick={submitQuiz}>
//             Submit Quiz
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <polyline points="20 6 9 17 4 12" />
//             </svg>
//           </button>
//         )}
//       </footer>
//     </div>
//   );
// }

// export default QuizPage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import Timer from "../components/Timer";

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to fetch questions with a timeout
  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout
      const res = await fetch("http://localhost:5000/api/questions", {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error("Failed to fetch questions");
      const data = await res.json();
      setQuestions(data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to load questions");
      setLoading(false);
    }
  };

  // Fetch questions on mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answers, questions, navigate]);

  const handleSelect = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const submitQuiz = () => {
    if (questions.length === 0) {
      navigate("/result", {
        state: { score: 0, total: 0, results: [], questions: [] },
      });
      return;
    }
    fetch("http://localhost:5000/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to submit answers");
        return res.json();
      })
      .then((data) => {
        navigate("/result", {
          state: {
            score: data.score,
            total: data.total,
            results: data.results,
            questions,
          },
        });
      })
      .catch((err) => setError(err.message));
  };

  // Placeholder question for blurred UI
  const placeholderQuestion = {
    id: 0,
    text: "Placeholder Question",
    options: ["Option A", "Option B", "Option C", "Option D"],
  };

  if (loading) {
    return (
      <div className="quiz-page">
        <header className="quiz-header">
          <ProgressBar current={1} total={5} />
          <Timer timeLeft={300} />
        </header>
        <main className="quiz-main">
          <div className="question-card placeholder">
            <div className="question-badge">Question 1</div>
            <h2 className="question-text">Loading question...</h2>
            <div className="options-container">
              {placeholderQuestion.options.map((_, index) => (
                <label key={index} className="option-card disabled">
                  <span className="option-content">
                    <span className="option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="option-text">Loading option...</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </main>
        <footer className="quiz-footer">
          <button className="nav-button secondary" disabled>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Previous
          </button>
          <button className="nav-button primary" disabled>
            Next
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
        </footer>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="quiz-page">
        <header className="quiz-header">
          <ProgressBar current={1} total={5} />
          <Timer timeLeft={300} />
        </header>
        <main className="quiz-main">
          <div className="question-card placeholder blurred">
            <div className="question-badge">Question 1</div>
            <h2 className="question-text">{placeholderQuestion.text}</h2>
            <div className="options-container">
              {placeholderQuestion.options.map((opt, index) => (
                <label key={index} className="option-card disabled">
                  <span className="option-content">
                    <span className="option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="option-text">{opt}</span>
                  </span>
                </label>
              ))}
            </div>
            {error && (
              <div className="error-message">
                <p>Error: {error}</p>
                <button className="nav-button primary" onClick={fetchQuestions}>
                  Retry
                </button>
              </div>
            )}
          </div>
        </main>
        <footer className="quiz-footer">
          <button className="nav-button secondary" disabled>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Previous
          </button>
          <button className="nav-button primary" disabled>
            Next
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
        </footer>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <header className="quiz-header">
        <ProgressBar current={currentIndex + 1} total={questions.length} />
        <Timer timeLeft={timeLeft} />
      </header>

      <main className="quiz-main">
        <QuestionCard
          question={questions[currentIndex]}
          selectedOption={answers[questions[currentIndex].id]}
          onSelect={handleSelect}
        />
      </main>

      <footer className="quiz-footer">
        <button
          className="nav-button secondary"
          onClick={prevQuestion}
          disabled={currentIndex === 0}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Previous
        </button>
        {currentIndex < questions.length - 1 ? (
          <button className="nav-button primary" onClick={nextQuestion}>
            Next
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
        ) : (
          <button className="nav-button primary submit" onClick={submitQuiz}>
            Submit Quiz
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </button>
        )}
      </footer>
    </div>
  );
}

export default QuizPage;