import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import { CloudUpload, Delete, Send, ArrowBack } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const QuizGenerator = () => {
  const [file, setFile] = useState(null);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [quizData, setQuizData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const questions = [
    "",
    "How many sections should the quiz have?",
    "How many questions should be there?",
    "What is the difficulty level? (Low, Medium, Hard)",
    "What is the total marks?"
  ];

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    const validFormats = ["application/pdf", "video/mp4", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!uploadedFile) return;
    if (!validFormats.includes(uploadedFile.type)) {
      toast.error("❌ Invalid file type! Upload PDF, MP4, or DOC.");
      setFile(null);
      return;
    }
    setFile(uploadedFile);
    setStep(1);
  };

  const validateInput = (value,num) => {
    console.log({num,value})
    if (!value) return "❌ This field cannot be empty.";
    if (num !== 3 && isNaN(value)) return "❌ Please enter a valid number.";
    if (num === 3 && !["Low", "Medium", "Hard"].includes(value)) return "❌ Please enter 'Low', 'Medium', or 'Hard'.";
    return "";
  };

  const handleInputSubmit = () => {
    const value = quizData[step]?quizData[step]:input
    const errorMessage = validateInput(value,step);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    
    setQuizData({ ...quizData, [step]: input || quizData[step] });
    setError("");
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      toast.success("✅ Quiz data collected! Redirecting to preview...");
      setTimeout(() => navigate("/quiz-preview", { state: quizData }), 1000);
    }
    setInput("");
  };

  return (
    <Box sx={{
      bgcolor: "#f4f4f4",
      minHeight: "100vh",
      p: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Card sx={{ width: "400px", p: 2, borderRadius: "12px", boxShadow: "0px 4px 12px rgba(0,0,0,0.2)" }}>
        <CardContent>
          <Typography sx={{ bgcolor: "#e0e0e0", p: 1, borderRadius: "8px", mb: 2, textAlign: "center" }}>
            Welcome! Upload a file to generate a quiz.
          </Typography>
          {!file && (
            <Button variant="contained" component="label" startIcon={<CloudUpload />} sx={{ mt: 2 }}>
              Upload File
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>
          )}
          {file && (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              <Typography sx={{ flexGrow: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", pr: 1 }}>{file.name}</Typography>
              <IconButton onClick={() => setFile(null)} color="error"><Delete /></IconButton>
            </Box>
          )}
          {file && step < questions.length && (
            <Box sx={{ mt: 3, position: "relative" }}>
            <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
            {step > 1 && (
                <IconButton onClick={() => {
                  setStep(step - 1);
                  setInput(quizData[step - 1] || "");
                  setError(validateInput(quizData[step - 1]|| "", step-1));
                }} color="#00000" >
                  <ArrowBack />
                </IconButton>
              )}
              <Typography sx={{ textAlign: "center", fontSize: "14px", color: "gray" }}>
                Step {step + 1} of {questions.length}
              </Typography>
            
              </Box>
              <Typography sx={{ mb: 1, textAlign: "center" }}>{questions[step]}</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField fullWidth value={input || quizData[step] || ""} onChange={(e) => {
                  const value = e.target.value === ""?quizData[step]?quizData[step]:"":e.target.value
                  setInput(value);

                  setError(validateInput(value , step));
                }} placeholder="Type your answer..." />
                <IconButton onClick={handleInputSubmit} color="primary"><Send /></IconButton>
              </Box>
              {error && (
                <Typography sx={{ color: "red", fontSize: "12px", mt: 1, textAlign: "left" }}>
                  {error}
                </Typography>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuizGenerator;
