// export default function QuestionCard({ question, selectedOption, onSelect }) {
//   return (
//     <div style={{ margin: "20px" }}>
//       <h2>{question.text}</h2>
//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {question.options.map((opt, index) => (
//           <li key={index} style={{ margin: "10px 0" }}>
//             <label>
//               <input
//                 type="radio"
//                 name={`question-${question.id}`}
//                 checked={selectedOption === index}
//                 onChange={() => onSelect(question.id, index)}
//               />
//               {" "}{opt}
//             </label>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

function QuestionCard({
  question,
  selectedOption,
  onSelect,
  showResults,
  userAnswer,
  correctAnswer,
}) {
  return (
    <div className="question-card">
      <div className="question-badge">Question {question.id}</div>
      <h2 className="question-text">{question.text}</h2>
      <div className="options-container">
        {question.options.map((opt, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = index === correctAnswer;
          const isUserAnswer = userAnswer === index;

          let optionClass = "option-card";
          if (showResults) {
            if (isCorrect) optionClass += " correct";
            else if (isUserAnswer && !isCorrect) optionClass += " incorrect";
          } else if (isSelected) {
            optionClass += " selected";
          }

          return (
            <label key={index} className={optionClass}>
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={isSelected}
                onChange={() => onSelect(question.id, index)}
                disabled={showResults}
              />
              <span className="option-content">
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="option-text">{opt}</span>
                {showResults && isCorrect && (
                  <svg
                    className="check-icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {showResults && isUserAnswer && !isCorrect && (
                  <svg
                    className="cross-icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionCard;