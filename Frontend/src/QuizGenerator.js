import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Divider,
  Tooltip
} from "@mui/material";
import { CloudUpload, Delete, Send, Menu, ArrowBack, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const QuizGenerator = () => {
  const [file, setFile] = useState(null);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [quizData, setQuizData] = useState({});
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [quizzes, setQuizzes] = useState([
    { id: 1, title: "Math Quiz" },
    { id: 2, title: "Science Quiz" },
    { id: 3, title: "History Quiz" },
  ]);
  const navigate = useNavigate();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const questions = [
    "How many sections should the quiz have?",
    "How many questions should be there?",
    "What is the difficulty level? (Low, Medium, Hard)",
    "What is the total marks?",
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

  const validateInput = (value, currentStep) => {
    if (!value) return "❌ This field cannot be empty.";
    if (currentStep !== 2 && isNaN(value)) return "❌ Please enter a valid number.";
    if (currentStep === 2 && !["Low", "Medium", "Hard"].includes(value)) return "❌ Please enter 'Low', 'Medium', or 'Hard'.";
    return "";
  };

  const handleInputSubmit = () => {
    const errorMessage = validateInput(input, step);
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
    <Box sx={{ display: "flex", minHeight: "100vh" , flexDirection:"column"}}>
      {/* Sidebar */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 2 ,textAlign:"center"}}>
          <Typography variant="h2" >
            Quiz Generator
          </Typography>
          </Box>
     <Sidebar/>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Card sx={{ width: "400px", p: 2, borderRadius: "12px", boxShadow: "0px 4px 12px rgba(0,0,0,0.2)" }}>
          <CardContent>
            {/* Dynamic Title */}
            <Typography sx={{ bgcolor: "#e0e0e0", p: 1, borderRadius: "8px", mb: 2, textAlign: "center" }}>
              {file ? "Great! Now, let's configure your quiz." : "Welcome! Upload a file to start creating your quiz."}
            </Typography>

            {!file && (
              <Button variant="contained" component="label" startIcon={<CloudUpload />} sx={{ mt: 2 }}>
                Upload File
                <input type="file" hidden onChange={handleFileUpload} />
              </Button>
            )}
            {file && (
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
                <Typography sx={{ flexGrow: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", pr: 1 }}>
                  {file.name}
                </Typography>
                <IconButton onClick={() => setFile(null)} color="error"><Delete /></IconButton>
              </Box>
            )}
            {file && step < questions.length && (
              <Box sx={{ mt: 3, position: "relative" }}>
                <Typography sx={{ textAlign: "center", fontSize: "14px", color: "gray" }}>
                  Step {step + 1} of {questions.length}
                </Typography>
                {step > 0 && (
                  <IconButton
                    onClick={() => {
                      setStep(step - 1);
                      setInput(quizData[step - 1] || "");
                      setError(validateInput(quizData[step - 1] || "", step - 1));
                    }}
                    color="primary"
                    sx={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}
                  >
                    <ArrowBack />
                  </IconButton>
                )}
                <Typography sx={{ mb: 1, textAlign: "center" }}>{questions[step]}</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    fullWidth
                    value={input || quizData[step] || ""}
                    onChange={(e) => {
                      setInput(e.target.value);
                      setError(validateInput(e.target.value, step));
                    }}
                    placeholder="Type your answer..."
                  />
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
    </Box>
  );
};

export default QuizGenerator;
