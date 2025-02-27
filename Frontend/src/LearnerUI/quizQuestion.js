import React,{useState} from "react";
import { Card, CardContent, Radio, Typography ,Drawer,Divider,ListItemButton} from "@mui/material";
import { Button, Checkbox ,Box,List,ListItem,ListItemText} from "@mui/material";
import { ArrowLeft ,Menu} from "lucide-react";
import './quizQuestion.scss';
import { FormControlLabel } from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MultipleSectionsQuestions from "./MultipleSectionsQuestions";
import { toast } from "react-hot-toast";
const QuizQuestion = () => {
  const response =
  {
    "sections": [
      {
        "sectionId": 1,
        "sectionTitle": "Mathematics",
        "questions": [
          {
            "questionId": 101,
            "questionText": "What is the square root of 144?",
            "marks": 2,
            "options": [
              { "optionId": "a", "text": "10", "isCorrect": false },
              { "optionId": "b", "text": "12", "isCorrect": true },
              { "optionId": "c", "text": "14", "isCorrect": false },
              { "optionId": "d", "text": "16", "isCorrect": false }
            ]
          },
          {
            "questionId": 102,
            "questionText": "Solve: 15 + 6 × 2",
            "marks": 3,
            "options": [
              { "optionId": "a", "text": "21", "isCorrect": false },
              { "optionId": "b", "text": "27", "isCorrect": false },
              { "optionId": "c", "text": "33", "isCorrect": false },
              { "optionId": "d", "text": "27", "isCorrect": true }
            ]
          }
        ]
      },
      {
        "sectionId": 2,
        "sectionTitle": "Science",
        "questions": [
          {
            "questionId": 201,
            "questionText": "What is the chemical symbol for water?",
            "marks": 1,
            "options": [
              { "optionId": "a", "text": "H2O", "isCorrect": true },
              { "optionId": "b", "text": "CO2", "isCorrect": false },
              { "optionId": "c", "text": "O2", "isCorrect": false },
              { "optionId": "d", "text": "NaCl", "isCorrect": false }
            ]
          }
        ]
      }
    ]
  }
  
  const transformQuizData = (quizData) => {
    if (!quizData?.data?.quiz) return { sections: [] };
  
    return {
      sections: quizData.data.quiz.map((quizItem, sectionIndex) => ({
        sectionId: sectionIndex + 1, // Assigning an incremental section ID
        sectionTitle: quizItem.title,
        questions: quizItem.questions.map((question, questionIndex) => ({
          questionId: sectionIndex * 100 + questionIndex + 1, // Unique ID for each question
          questionText: question.question,
          marks: question.marks,
          options: question.options.map((option, optionIndex) => ({
            optionId: String.fromCharCode(97 + optionIndex), // Converts 0 -> 'a', 1 -> 'b', etc.
            text: option,
            isCorrect: option === question.correct_answer, // Check if the option is correct
          })),
        })),
      })),
    };
  };
  
  // Example Usage:
  const quizData = JSON.parse(localStorage.getItem("quizData") || "{}");
  const transformedData = transformQuizData(quizData);
  console.log(transformedData);
  

  const [selectedSection, setSelectedSection] = useState(response.sections[0]);
  const [selectedQuestion, setSelectedQuestion] = useState(selectedSection.questions[0]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // Default section
  
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const currentSection = transformedData.sections[sectionIndex];
  const currentQuestion = currentSection?.questions[questionIndex];
 const totalQuestions = transformedData?.sections?.reduce((sum,section)=>sum+section.questions.length, 0)||0;
 const currentQuestionValue = transformedData?.sections?.slice(0, sectionIndex)?.reduce((sum, sec) => sum + sec.questions.length, 0) + questionIndex + 1; // Sum previous + current index

  const handleChange = (index) => {
    setSelectedValue(index);
  };
  const handleSectionChange = (section) => {
    setSelectedSection(section);
    setSelectedQuestion(section.questions[0]);
    setDrawerOpen(false);
  };
  const isLastQuestion =
  sectionIndex === transformedData.sections.length - 1 &&
  questionIndex === transformedData.sections[sectionIndex].questions.length - 1;

  const handleRandomQuestionSelect = (question) => {
    console.log({ question})
    // Find the section index where the selected question belongs
    const newSectionIndex = transformedData?.sections.findIndex((sec) =>
      sec.questions.some((q) => q.questionId === question.questionId)
    );
  
    // Update state to reflect the selected question and section
    if (newSectionIndex !== -1) {
      setSectionIndex(newSectionIndex);
      setSelectedQuestion(question);
      setQuestionIndex(
        transformedData.sections[newSectionIndex].questions.findIndex((q) => q.questionId === question.questionId)
      );
    }
  };
  
  const handleNextQuestion = () => {
    if (questionIndex < currentSection.questions.length - 1) {
      // Move to the next question within the same section
      setQuestionIndex((prev) => prev + 1);
      setSelectedValue(null);
    } else if (questionIndex === currentSection.questions.length - 1 && sectionIndex < transformedData.sections.length - 1) {
      // Move to the next section if the current section is finished
      setSectionIndex((prev) => prev + 1);
      setQuestionIndex(0);
      setSelectedValue(null);
    } else {
      toast.success("Quiz Completed!",{ style: {
        background: "#E6F4EA",
        color: "#1E4620",
        padding: "12px 20px",
        borderRadius: "8px",
        border: "1px solid #A3D9A5",
        boxShadow: "0px 4px 10px rgba(163, 217, 165, 0.5)",
      }}); // Handle quiz completion
    }}
  return (
    <Typography variant="div" sx ={{width:"100%", display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}} className="header p-6 max-w-4xl mx-auto" >
     
    <Typography variant="div" className="flex items-center justify-between mb-4 header-content">
      <Button startIcon={<ArrowLeft />} color="#00000" className="absolute left-6">
        Back 
      </Button>
      <div className="ml-auto flex gap-2 header-content-left">
        <Button variant="outlined" sx={{ color: "#6439BF", border:"1px solid #6439BF", "&:hover": { backgroundColor: "#f0e9ff" ,color:"#6439BF"} }}>End Quiz</Button>
        <Button variant="contained" onClick={handleNextQuestion} sx={{ backgroundColor: "#6439BF", "&:hover": { backgroundColor: "#512ea9" } }}>
        { isLastQuestion ? "Finish":"Next"} →
</Button>
      </div>
    </Typography>
    <Typography variant="div" sx={{ display: "flex", flexDirection: "row", gap: 4, width: "100%", justifyContent: "flex-start", alignItems: "flex-start", padding: "10px" ,paddingLeft:"30px",paddingRight:"10px"}}>
        <Card sx={{ width: "80%", padding: "12px", borderRadius: "14px", marginTop: "20px", boxShadow: "0 4px 3px 0 #e7e8f8", border:"1px solid #e7e8f8 " }}>
          <CardContent sx={{ display: "flex", flexDirection: "row", gap: 10,justifyContent:"flex-start" }}>
            <Typography sx={{ display: "flex", flexDirection: "column", gap: 4, alignItems:"left" ,width:"60%"}}>
            <div className="text-lg font-semibold mb-2" style={{ fontSize: "16px", fontWeight: "bold",textAlign:"left" }}>
              Question {currentQuestionValue} of {totalQuestions}
            </div>
            <Typography variant="div" sx={{ fontSize: "16px", textAlign: "left" }}>
              {currentQuestion?.questionText}
            </Typography>
            </Typography>
            <Typography>
            <div className="font-semibold mt-4" style={{ fontSize: "16px", fontWeight: "bold" }}>
              Select the Right Answer
            </div>
            <Typography variant="div" sx={{ display: "flex", gap: "10px", flexDirection: "column",paddingTop:"24px" }} className="space-y-2 mt-2">
              {currentQuestion?.options.map((option, index) => (
                <Typography variant="div" sx={{ border: "2px solid #d5d5d5", borderRadius: "8px", padding: "10px", marginBottom: "10px" ,display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"8px",width:"300px"}} key={index} className="flex items-center border p-3 rounded-md">
                  <FormControlLabel
                    control={
                      <Radio
                        checked={selectedValue === option.optionId}
                        onChange={() => handleChange(option.optionId)}
                        sx={{
                          color: "#6439BF",
                          "&.Mui-checked": {
                            color: "#6439BF",
                          },
                        }}
                      />
                    }
                    label={option.text}
                  />
                </Typography>
              ))}
            </Typography>
            </Typography>
          </CardContent>
        </Card>
        {!drawerOpen ? (
          <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "#000", marginLeft: "auto", paddingRight:"20px" }}>
            <MenuIcon />
          </IconButton>
        ) : (
          <MultipleSectionsQuestions
            openQuestionPanel={drawerOpen}
            setOpenQuestionPanel={setDrawerOpen}
            onRandomQuestionSelect={handleRandomQuestionSelect}
            activeSection={currentSection}
            currentQuestionId={currentQuestion?.questionId}
            onSubmitQuiz={() => {}}
            onSubmitSection={() => {}}
            QuizSections={transformedData.sections}
            transformedData={transformedData}
            currentSectionId={sectionIndex}
          />
        )}
      </Typography>
    </Typography>
  );
};

export default QuizQuestion;