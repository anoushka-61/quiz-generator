import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizGenerator from './QuizGenerator';
import QuizPreview from './QuizPreview';

function App() {
  return (
    <div className="App">
       <Router 
     future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}
    >
      <div className="App">
        <Routes>
          {/* Only one route, because we're handling scrolling via react-scroll */}
          <Route exact path="/quiz-preview" element={<QuizPreview/> } />
          <Route exact path="/" element={<QuizGenerator/> } />
         
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
