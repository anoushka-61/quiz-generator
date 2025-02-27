// import React from "react";
// import { useNavigate } from "react-router-dom";

// const QuizComponent = () => {
//     const [Loading, setLoading] = useState(false);
//     const navigate = useNavigate()
//     useEffect(() => {
//         try {
//             const response = axios.post(
//                 "https://hy4s0t7gyl.execute-api.us-east-1.amazonaws.com/default/quadragen_quizGenerate",
//                 {
//                   courseFile: `quadragen-content-files/${fileKey}`,
//                   numSections: formData.sections,
//                   questionsPerSection: formData.questions,
//                   difficulty: formData.difficulty,
//                   totalMarks: formData.totalMarks,
//                 },
//                 {
//                   headers: { "Content-Type": "application/json" },
//                 }
//               );
//         } catch (error) {
            
//         }
//         finally{

//         }
//         const response = axios.post(
//             "https://hy4s0t7gyl.execute-api.us-east-1.amazonaws.com/default/quadragen_quizGenerate",
//             {
//               courseFile: `quadragen-content-files/${fileKey}`,
//               numSections: formData.sections,
//               questionsPerSection: formData.questions,
//               difficulty: formData.difficulty,
//               totalMarks: formData.totalMarks,
//             },
//             {
//               headers: { "Content-Type": "application/json" },
//             }
//           );
//     }, []);
//   return (
//     <>
//       {/* CSS Styles */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

//         :root {
//           --black: #000;
//           --white: #fff;
//           --white2: #f8f8f8;
//           --light-grey: #999;
//           --light-purple-background: #c9c9f7;
//           --brown: #A52A2A;
//           --blue: #007bff;
//           --font-family-other: 'Poppins', sans-serif;
//           --shadow-color: rgba(0, 0, 0, 0.1);
//         }

//         /* Container & Inner Box */
//         .quiz-page-container {
//           padding: 100px 60px 60px 60px;
//           background-color: #f4f4f4;
//           min-height: 100vh;
//           font-family: var(--font-family-other);
//         }
//         .quiz-inner-box {
//           padding: 24px;
//           border-radius: 16px;
//           box-shadow: 0 4px 3px 0 var(--shadow-color);
//           border: 1.5px solid var(--light-purple-background);
//           background-color: var(--white);
//           max-width: 800px;
//           margin: 0 auto;
//         }

//         /* Header */
//         .quiz-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }
//         .quiz-header-right {
//           margin-right: 28px;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }
//         .quiz-header-right-text {
//           font-size: 24px;
//           font-weight: bold;
//           color: var(--black);
//         }
//         .quiz-result-instruction {
//           padding: 10px 12px;
//           border-radius: 10px;
//           border: 1px solid var(--light-purple-background);
//           background-color: #f4f4ff;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           font-size: 14px;
//           font-weight: 500;
//           color: var(--black);
//           font-family: var(--font-family-other);
//         }

//         /* Title & Instruction Text */
//         .quiz-title {
//           font-size: 24px;
//           font-weight: bold;
//           margin: 12px 0;
//           color: var(--black);
//           word-break: break-word;
//         }
//         .quiz-instruction-text {
//           font-size: 14px;
//           color: var(--light-grey);
//           margin-bottom: 20px;
//           word-break: break-word;
//         }

//         /* Instruction Content */
//         .quiz-instruction-content {
//           padding: 20px;
//           border-radius: 12px;
//           margin-top: 16px;
//           background-color: #ededfd;
//         }

//         /* Sections */
//         .quiz-sections {
//           margin-top: 20px;
//         }
//         .quiz-sections h3 {
//           font-size: 18px;
//           margin-bottom: 8px;
//         }
//         .quiz-section-item {
//           padding: 8px 12px;
//           color: var(--brown);
//           margin-right: 16px;
//           background-color: var(--white);
//           border-radius: 4px;
//           border: 1px solid #eceaea;
//           display: inline-flex;
//           align-items: center;
//           margin-bottom: 8px;
//         }
//         .quiz-section-item .section-icon {
//           font-size: 16px;
//           margin-right: 8px;
//         }

//         /* Footer / Start Button */
//         .quiz-footer {
//           display: flex;
//           justify-content: flex-end;
//           padding-top: 12px;
//         }
//         .quiz-start-button {
//           padding: 12px 20px;
//           font-size: 16px;
//           background-color: var(--blue);
//           color: var(--white);
//           border: none;
//           border-radius: 4px;
//           cursor: pointer;
//         }

//         /* Additional elements from your snippet */
//         .quiz-header-buttons {
//           width: 96px !important;
//           height: 36px !important;
//           white-space: nowrap !important;
//         }
//         .viewAnalysis {
//           padding: 8px 12px !important;
//         }
//         .overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(0, 0, 0, 0.3);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 9999;
//         }
//         .overlay-content {
//           position: relative;
//           background: var(--white);
//           border-radius: 16px;
//           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//           width: 90%;
//           max-width: 500px;
//           box-sizing: border-box;
//           margin: 0 auto;
//           max-height: 90vh;
//           overflow-y: auto;
//         }
//         .overlay-content-closeicon {
//           position: absolute;
//           top: 10px;
//           right: 10px;
//           cursor: pointer;
//         }
//       `}</style>

//       {/* Main Container */}
//       <div className="quiz-page-container">
//         <div className="quiz-inner-box">
//           {/* Header */}
//           <div className="quiz-header">
//             <div className="quiz-header-right">
//               {/* Dummy icon and header text */}
//               <span role="img" aria-label="quiz" className="quiz-header-right-text">
//                 📘 Sample Quiz
//               </span>
//             </div>
//             {/* <div>
//               <span className="quiz-result-instruction">
//                 Due Date Passed - <span>12/12/2023</span>
//               </span>
//             </div> */}
//           </div>

//           {/* Title & Instruction Text */}
//           <h1 className="quiz-title">Sample Quiz Title</h1>
//           <p className="quiz-instruction-text">
//             Please read the instructions carefully before starting the quiz.
//           </p>

//           {/* Instruction Content */}
//           <div className="quiz-instruction-content">
//             <p>
//               This is dummy instruction content with <strong>HTML formatting</strong>.
//               You can include any details here.
//             </p>
//           </div>

//           {/* Sections */}
//           <div className="quiz-sections">
//             <h3>Sections:</h3>
//             <div>
//               <span className="quiz-section-item">
//                 <span className="section-icon" role="img" aria-label="section">🔹</span>
//                 Section 1
//               </span>
//               <span className="quiz-section-item">
//                 <span className="section-icon" role="img" aria-label="section">🔹</span>
//                 Section 2
//               </span>
//             </div>
//           </div>

//           {/* Footer / Start Button */}
//           <div className="quiz-footer">
//             <button
//               className="quiz-start-button"
//               onClick={() => {alert("Quiz Started!")
//               navigate("/quiz-question")
//               } }
//             >
//               Start Quiz
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default QuizComponent;