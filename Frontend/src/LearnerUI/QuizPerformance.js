import React from "react";

const QuizPerformance = ({ strengths, weaknesses }) => {
  return (
    <div className="quiz-performance-container" style={{width:"100%"}}>
      <h3>📊 Quiz Performance Summary</h3>
      <p className="summary-text">
        Here’s a breakdown of your **strongest** and **weakest** topics based on your quiz attempts.
      </p>

      {/* Strengths Section */}
      <div style={{display:"flex", flexDirection:"row", gap: "20px"}}>
      <div className="section">
        <h4>✅ Strengths</h4>
        <p className="section-desc">
          These are the topics you're excelling in. Keep up the great work! 🎯
        </p>
        {strengths.length > 0 ? (
          strengths.map((item, idx) => (
            <div key={idx} className="progress-bar">
              <span>{item.topic}</span>
              <div className="bar">
                <div 
                  className="fill strength" 
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <p className="progress-desc">
                You're **{item.percentage}% proficient** in {item.topic}.
              </p>
            </div>
          ))
        ) : (
          <p>No strengths identified yet.</p>
        )}
      </div>

      {/* Weaknesses Section */}
      <div className="section">
        <h4>⚠️ Weaknesses</h4>
        <p className="section-desc">
          These are areas that need improvement. Focus on these topics to boost your score! 🚀
        </p>
        {weaknesses.length > 0 ? (
          weaknesses.map((item, idx) => (
            <div key={idx} className="progress-bar">
              <span>{item.topic}</span>
              <div className="bar">
                <div 
                  className="fill weakness" 
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <p className="progress-desc">
                Your proficiency in {item.topic} is **only {item.percentage}%**. Try revising this topic!
              </p>
            </div>
          ))
        ) : (
          <p>Awesome! No weaknesses found. 🎉</p>
        )}
      </div>
      </div>
    </div>
  );
};

export default QuizPerformance;
