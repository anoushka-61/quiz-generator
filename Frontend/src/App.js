import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizGenerator from './generateQuiz';
import QuizPreview from './previewQuiz';
import { Toaster } from 'react-hot-toast';
import QuizQuestion from './LearnerUI/quizQuestion';
import Instruction from './LearnerUI/instruction';
import ResultAndReccomend from "./LearnerUI/ResultAndReccomend"
function App() {
  return (
    <div className="App">
       <Router 
     future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}
    >
     <Toaster position="bottom-center" reverseOrder={false} />
      <div className="App">
        <Routes>
          {/* Only one route, because we're handling scrolling via react-scroll */}
          <Route exact path="/quiz-preview" element={<QuizPreview/> } />
          <Route exact path="/" element={<QuizGenerator/> } />
          <Route exact path="/quiz-question" element={<QuizQuestion/>} />
          <Route exact path="/quiz-instruction" element={<Instruction/> } />
          <Route exact path="/result-recommend" element={<ResultAndReccomend/>} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
