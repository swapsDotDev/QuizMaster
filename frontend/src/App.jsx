// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import StartPage from "./pages/StartPage";
// import QuizPage from "./pages/QuizPage";
// import ResultPage from "./pages/ResultPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<StartPage />} />
//         <Route path="/quiz" element={<QuizPage />} />
//         <Route path="/result" element={<ResultPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import "./../styles.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;