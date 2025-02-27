import React,{useState} from "react";
import { Card, CardContent, Radio, Typography ,Drawer,Divider,ListItemButton} from "@mui/material";
import { Button, Checkbox ,Box,List,ListItem,ListItemText} from "@mui/material";
import { ArrowLeft ,Menu} from "lucide-react";
import './quizQuestion.scss';
import { FormControlLabel } from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MultipleSectionsQuestions from "./MultipleSectionsQuestions";

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
  


  const [selectedSection, setSelectedSection] = useState(response.sections[0]);
  const [selectedQuestion, setSelectedQuestion] = useState(selectedSection.questions[0]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // Default section
  const handleChange = (index) => {
    setSelectedValue(index);
  };
  const handleSectionChange = (section) => {
    setSelectedSection(section);
    setSelectedQuestion(section.questions[0]);
    setDrawerOpen(false);
  };
  return (
    <Typography variant="div" sx ={{width:"100%", display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}} className="header p-6 max-w-4xl mx-auto" >
     
    <Typography variant="div" className="flex items-center justify-between mb-4 header-content">
      <Button startIcon={<ArrowLeft />} color="#00000" className="absolute left-6">
        Back 
      </Button>
      <div className="ml-auto flex gap-2 header-content-left">
        <Button variant="outlined" sx={{ color: "#6439BF", border:"1px solid #6439BF", "&:hover": { backgroundColor: "#f0e9ff" ,color:"#6439BF"} }}>End Quiz</Button>
        <Button variant="contained" sx={{ backgroundColor: "#6439BF", "&:hover": { backgroundColor: "#512ea9" } }}>
  Next →
</Button>
      </div>
    </Typography>
     <Typography variant="div" sx={{display: "flex", flexDirection: "row", gap: 4, width:"100%",justifyContent: "flex-start", alignItems: "flex-start",    padding: "10px"}}>
      <Card sx={{width: "80%", padding:"12px",borderRadius:"14px",marginTop:"20px",boxShadow :"0 4px 3px 0 #e7e8f8"}}>
        <CardContent sx={{display: "flex", flexDirection: "row", gap: 4}}>
        <Typography variant="div" sx={{display: "flex", flexDirection: "column", gap: 4, width:"50%",justifyContent: "left", alignItems: "flex-start"}}>
          <div className="text-lg font-semibold mb-2" style={{fontSize:"16px", fontWeight:"bold"}}>Question 1 of 12</div>
          <Typography variant="div" sx={{fontSize: "16px", textAlign: "left"}}>
            You are developing an Android application and need to securely transfer a user's username from LoginActivity to UserProfileActivity. The username must not persist in memory after being transferred.

            Which Action should you take?
          </Typography>
          
          </Typography>
          <Typography variant="div" sx={{display: "flex", flexDirection: "column", gap: 4, width:"50%",justifyContent: "left", alignItems: "flex-start"}}> 
          <div className="font-semibold mt-4"  style={{fontSize:"16px", fontWeight:"bold"}}>Select Right Answer</div>
          <Typography variant="div" sx={{display:"flex", gap:"10px",flexDirection:"column"}}  className="space-y-2 mt-2">
          {[...Array(4)].map((_, index) => (
        <Typography variant="div" sx={{border : "2px solid #d5d5d5" , borderRadius:"8px" , padding:"10px", marginBottom:"10px"}} key={index} className="flex items-center border p-3 rounded-md">
          <FormControlLabel
            control={
              <Radio
                checked={selectedValue === index}
                onChange={() => handleChange(index)}
                sx={{
                  color: "#6439BF",
                  '&.Mui-checked': {
                    color: "#6439BF",
                  },
                }}
              />
            }
            label="Bundle the username into a key-value pair and pass it"
          />
        </Typography>
      ))}
          </Typography>
          </Typography>
        </CardContent>
      </Card>
     { !drawerOpen ?<IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "#000", marginLeft: "auto" }}>
      <MenuIcon />
    </IconButton>:  <MultipleSectionsQuestions
            openQuestionPanel={drawerOpen}
            setOpenQuestionPanel={setDrawerOpen}
            onRandonmQuestionSelect={()=>{}}
            activeSection={response.sections[0]}
            currentQuestionId={response.sections[0].questions[0].questionId}
            onSubmitQuiz={()=>{}}
            onSubmitSection={()=>{}}
            QuizSections={response.sections}
            // multiSectionQuizQuestions={response.sections[0].questions}
          />}
</Typography> 
    
    </Typography>
  );
};

export default QuizQuestion;