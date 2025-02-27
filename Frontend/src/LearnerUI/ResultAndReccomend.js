import React from "react";
import QuizPerformance from "./QuizPerformance";

// Dummy Circular Progress Slider (using SVG as a placeholder)
const CircularProgressSlider = ({ value }) => {
  return (
    <div className="circle-slider" style={{ position: "relative" }}>
      <svg width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke="#2BA738"
          strokeWidth="5"
          fill="none"
        />
      </svg>
      <div
        className="circle-slider-label"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#2BA738",
          borderRadius: "50%",
          width: "100px",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 600,
          fontSize: "1.5rem",
        }}
      >
        {value}%
      </div>
    </div>
  );
};

// Dummy Skill Label with a linear progress bar
const SkillLabel = ({ name, secScore, maxMarks }) => {
  const percentValue =
    secScore && maxMarks
      ? (parseFloat(secScore) / parseFloat(maxMarks)) * 100
      : 0;
  const roundUpValue = Math.floor(percentValue * 100) / 100;
  return (
    <div className="skill-label" style={{ padding: "10px" }}>
      <div>
        <div>{name?.toLowerCase()}</div>
        <div>{roundUpValue}%</div>
      </div>
      <div
        className="border-linear-progress"
        style={{
          width: "100%",
          height: "8px",
          background: "#ccc",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${roundUpValue}%`,
            height: "100%",
            background: "#2BA738",
          }}
        ></div>
      </div>
    </div>
  );
};

// ScoreCard Component (with dummy data)
const ScoreCard = () => {
  const first_name = "John";
  const assessmentName = "Dummy Assessment";
  const skillData = {
    section: [
      { name: "Communication", secScore: "80", maxMarks: "100" },
      { name: "Technical", secScore: "90", maxMarks: "100" },
    ],
    score: "170",
    maxMarks: "200",
  };
  const obtainedMarks = parseFloat(skillData.score);
  const outOfMarks = parseFloat(skillData.maxMarks);
  const totalPercent = (obtainedMarks / outOfMarks) * 100;
  const formattedTotalPercent = parseFloat(totalPercent.toFixed(2));

  return (
    <div className="score-card">
      <div className="score-card--head">
        <div className="score-card--head-overlay">
          <h1>Congratulations, {first_name}!</h1>
          <p style={{ padding: 0, margin: 0 }}>
            You have successfully finished the {assessmentName}.
          </p>
          <p>Welcome to the first step towards your skill enhancement!</p>
        </div>
        <img
          className="score-card--head-img"
          src="/report-card-bg.svg"
          alt=""
          style={{
            background: "rgb(30 105 11 / 39%)",
            opacity: "2.5",
          }}
        />
      </div>
      <div
        className="score-card--bosdy"
        style={{
          display: "flex",
          padding: "10px 100px",
          justifyContent: "space-between",
        }}
      >
        <div className="skill-label-gridww" style={{ width: "50%" }}>
          {skillData?.section?.map((v, idx) => (
            <SkillLabel key={idx} {...v} />
          ))}
        </div>
        <div className="prg-slider-const flexbox-centers">
          <CircularProgressSlider value={formattedTotalPercent} />
          <div className="prg-slider-cont--label">
            Overall Score : {obtainedMarks}/{outOfMarks}
          </div>
        </div>
      </div>
      <div className="score-card--foot flexbox-center">
        {/* <div className="info-circle">ℹ️</div> */}
        <div
        //   dangerouslySetInnerHTML={{
        //     __html: "Keep up the great work! <b>Improvement</b> is on the way.",
        //   }}
        >
      <QuizPerformance strengths={strengths} weaknesses={weaknesses} />
        </div>
      </div>
    </div>
  );
};

const RecommendedCards = () => {
  const courses = [
    {
      title: "Course 1",
      description: "Learn the basics of course 1 and elevate your skills.",
      image:
        "https://timespro.com/_next/image?url=https%3A%2F%2Ftimesproweb-static-backend-prod.s3.ap-south-1.amazonaws.com%2FEC_Banking_Pro_Web_Banner_14926ce2b5.webp&w=1080&q=75",
    },
    {
      title: "Course 2",
      description: "Master advanced techniques in course 2 and stay ahead!",
      image:
        "https://timespro.com/_next/image?url=https%3A%2F%2Ftimesproweb-static-backend-prod.s3.ap-south-1.amazonaws.com%2FFlagship_Programme_E_Business_and_Logistics_Strategies_Emailer_1_11zon_b4e259e3f2.webp&w=1080&q=75",
    },
    {
      title: "Course 3",
      description: "Explore topics in course 3 and boost your expertise.",
      image:
        "https://timespro.com/_next/image?url=https%3A%2F%2Ftimesproweb-static-backend-prod.s3.ap-south-1.amazonaws.com%2FDAV_db4b1dbd9c.webp&w=1080&q=75",
    },
  ];

  return (
    <div className="recommended--cards--main">
      <h3>
        <img
          src="/ai-technology.png"
          alt="AI Icon"
          style={{ width: "20px", height: "20px", marginRight: "8px" }}
        />
        AI Recommended Courses
      </h3>
      <p>Based on your quiz attempt</p>
      <div className="recommended-cards" style={{boxShadow:"rgba(165, 170, 181, 0.16) 0px 3px 6px 0px;"}}>
        {courses?.map((course, idx) => (
          <div key={idx} className="recommended-card">
            <img
              src={course.image}
              alt={course.title}
              className="recommended-card-image"
              style={{
                height: "190px",
                objectFit: "cover",
                width: "100%",
                objectPosition: "center top",
                borderRadius: "8px",
              }}
            />
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <button
              className="buy-now-btn"
              style={{
                background: "linear-gradient(135deg, #8A2BE2, #FF69B4)",
                color: "#fff",
                padding: "10px 16px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
                marginTop: "10px",
                transition: "0.3s",
                width: "100%",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#e65c00")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#ff6600")}
            >
              🚀 Enroll Now & Level Up!
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const strengths = [
    { topic: "JavaScript", percentage: 80 },
    { topic: "React", percentage: 75 },
  ];
  
  const weaknesses = [
    { topic: "CSS", percentage: 40 },
    { topic: "Algorithms", percentage: 30 },
  ];
// Report Footer Component
const ReportFoot = () => {
  return (
    <div className="report-card--foot flexbox-center">
      <div>Powered by </div> &nbsp;
      <div className="tp-logo">
        <p> Quiz pro Logo</p>
      </div>
    </div>
  );
};

// Main Dummy Report Page Component
const AssessmentReportDummy = () => {
  return (
    <>
      {/* Inline CSS Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

        :root {
          --black: #000;
          --white: #fff;
          --white2: #f8f8f8;
          --light-grey: #999;
          --light-purple-background: #c9c9f7;
          --brown: #A52A2A;
          --blue: #007bff;
          --font-family-other: 'Poppins', sans-serif;
          --shadow-color: rgba(0, 0, 0, 0.1);
        }

        body {
          background: #f5f6fa;
          margin: 0;
          font-family: var(--font-family-other);
        }

        .flexbox-center {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .container-side-margin {
          padding: 0 20px;
        }

        .reports-page {
          padding: 20px;
        }

        .score-card--action-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
        }

        .back-to-icon {
          cursor: pointer;
          color: var(--black);
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .report-download-btn {
          background: var(--white);
          border: 1.5px solid #e4e4e4;
          color: #00008c;
          padding: 10px 12px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 700;
          cursor: pointer;
        }

        .score-card {
          background: var(--white);
          border: 0.5px solid #e4e4e4;
          border-radius: 8px;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 4px;
          overflow: hidden;
          margin-bottom: 20px;
        }
        .score-card--head {
          position: relative;
          height: 188px;
        }
        .score-card--head-overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: rgba(0, 0, 0, 0.4);
          color: var(--white);
          padding: 0 14px;
          text-align: center;
        }
        .score-card--head-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .score-card--body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .skill-label-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .skill-label {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .prg-slider-cont {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .score-card--foot {
          background-color: #f4f6ff;
          padding: 10px;
          text-align: center;
          display: flex;
          gap: 5px;
          align-items: center;
        }
        .recommended--cards--main {
          margin: 20px 0;
        }
        .recommended--cards--main h3 {
          margin-bottom: 10px;
        }
        .recommended-cards {
          display: flex;
          gap: 10px;
        }
        .recommended-card {
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 10px;
          flex: 1;
        }
        .counselling-card {
          display: flex;
          background: linear-gradient(90deg, rgb(0, 0, 140) 0%, rgb(16, 16, 38) 100%);
          color: var(--white);
          border-radius: 12px;
          overflow: hidden;
          margin: 20px 0;
        }
        .counselling-card--right {
          padding: 20px;
          flex: 1;
        }
        .counselling-card--right h1 {
          margin: 0 0 10px 0;
        }
        .counselling-card--img {
          width: 300px;
          object-fit: cover;
        }
        .report-card--foot {
          text-align: center;
          padding: 14px 0;
          border-top: 1px solid #e1dede;
        }
        .tp-logo img {
          width: 100px;
          height: 70px;
        }
      `}</style>

      <div className="reports-page container-side-margin">
        {/* <div className="score-card--action-bar">
          <div className="back-to-icon" onClick={() => alert("Back to Dashboard")}>
            &#8592; Back to Dashboard
          </div>
          <button className="report-download-btn" onClick={() => alert("Download Report")}>
            Download Report
          </button>
        </div> */}
        <ScoreCard />
        <RecommendedCards />
        {/* <BookCounsellingCard /> */}
        {/* <ReportFoot /> */}
      </div>
    </>
  );
};

export default AssessmentReportDummy;
