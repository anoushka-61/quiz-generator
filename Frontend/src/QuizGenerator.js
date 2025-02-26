import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  MenuItem,
  Grid,
} from "@mui/material";
import {
  CloudUpload,
  Delete,
  NavigateNext,
  Send,
  ArrowBack,
  SmartToy,
} from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import QuizLoader from "./QuizLoader";
import { Sparkles } from "lucide-react"; // Using lucide-react for the icon

const QuizGenerator = () => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    sections: "",
    questions: "",
    difficulty: "",
    totalMarks: "",
  });
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const validFormats = [
    "application/pdf",
    "video/mp4",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFileUpload = (uploadedFile) => {
    if (!uploadedFile) return;
    if (!validFormats.includes(uploadedFile.type)) {
      toast.error("❌ Invalid file type! Upload PDF, MP4, or DOC.");
      return;
    }
    setFile(uploadedFile);
  };

  const handleFileChange = (e) => {
    handleFileUpload(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileUpload(droppedFile);
  };

  const handleNextAfterFile = () => {
    setShowForm(true);
  };

  const validateInput = () => {
    let errors = {};

    // Ensure sections and questions are numbers and greater than zero
    if (
      !formData.sections ||
      isNaN(formData.sections) ||
      Number(formData.sections) <= 0
    ) {
      errors.sections = "❌ Enter a valid number!";
    }

    if (
      !formData.questions ||
      isNaN(formData.questions) ||
      Number(formData.questions) <= 0
    ) {
      errors.questions = "❌ Enter a valid number!";
    }

    // Difficulty must be one of the predefined values
    if (!["Low", "Medium", "Hard"].includes(formData.difficulty)) {
      errors.difficulty = "❌ Select 'Low', 'Medium', or 'Hard'";
    }

    // Marks should be a number and in the range of 1 to 100
    if (
      !formData.totalMarks ||
      isNaN(formData.totalMarks) ||
      Number(formData.totalMarks) < 1 ||
      Number(formData.totalMarks) > 100
    ) {
      errors.totalMarks = "❌ Enter a number between 1 and 100!";
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateInput()) return;
    setLoading(true);
    toast.success("✅ Quiz data collected! Redirecting to preview...");
    // setTimeout(() => navigate("/quiz-preview", { state: formData }), 1000);
  };
  const handleBackToUpload = () => {
    setShowForm(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        background: " linear-gradient(to bottom, #e7e7ff, #fff, #fff)",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            width: "80%",
            p: 2,
            borderRadius: "12px",
            boxShadow: "0 3px 6px 0 rgba(165, 170, 181, 0.16);",
            position: "relative",
          }}
        >
          {showForm && (
            <IconButton
              sx={{
                position: "absolute",
                left: 16,
                borderRadius: "8px", // Default border-radius
                "&:hover": {
                  borderRadius: "2px", // Reduced border-radius on hover
                },
              }}
              onClick={handleBackToUpload}
            >
              <ArrowBack />
              <Typography sx={{ ml: 1, fontSize: "14px", fontWeight: "bold" }}>
                Change File
              </Typography>
            </IconButton>
          )}
          <CardContent>
            <Box sx={{ textAlign: "center", p: 3 }}>
              {/* Brand Name */}
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "700",
                  color: "#000", // Pure Black for strong branding
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                }}
              >
                🚀 QuizPro
              </Typography>

              {/* Title with a Modern & Clean Look */}
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: "600",
                  color: "#333", // Dark Gray for contrast
                  mt: 1,
                }}
              >
                Smarter Quizzes, Better Learning
              </Typography>

              {/* Subtitle with Subtle Styling */}
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  color: "#666", // Light Gray for a soft look
                  fontSize: "16px",
                  fontWeight: "500",
                  mt: 1,
                  maxWidth: "75%",
                  margin: "0 auto",
                }}
              >
                AI-powered assessments for a seamless quiz creation experience.
                Customize, analyze, and elevate engagement with ease.
              </Typography>
            </Box>

            {!showForm ? (
              <Box
                sx={{
                  textAlign: "center",
                  mt: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#333", // Professional dark grey
                    textAlign: "center",
                    textTransform: "capitalize",
                    letterSpacing: "0.5px",
                    fontFamily: "'Roboto', sans-serif", // Modern, corporate feel
                  }}
                >
                  Upload Your File to Proceed
                </Typography>

                <Box
                  sx={{
                    border: "2px dashed #ccc",
                    borderRadius: "8px",
                    p: 3,
                    textAlign: "center",
                    cursor: "pointer",
                    bgcolor: dragging ? "#e3e3e3" : "#f9f9f9",
                    "&:hover": { bgcolor: "#f1f1f1" },
                    width: "60%",
                  }}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {file ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        borderRadius: "6px",
                        background: "#f1f1f1",
                      }}
                    >
                      <Typography
                        sx={{
                          flexGrow: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          pr: 1,
                        }}
                      >
                        {file.name}
                      </Typography>
                      <IconButton onClick={() => setFile(null)} color="error">
                        <Delete />
                      </IconButton>
                    </Box>
                  ) : (
                    <>
                      <Typography variant="body2">
                        Drag & drop a file here or click below to upload
                      </Typography>
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUpload />}
                        sx={{ mt: 2 }}
                      >
                        Upload File
                        <input type="file" hidden onChange={handleFileChange} />
                      </Button>
                    </>
                  )}
                </Box>

                {file && (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<NavigateNext />}
                    sx={{ mt: 2 }}
                    onClick={handleNextAfterFile}
                  >
                    Let's Configure
                  </Button>
                )}
              </Box>
            ) : (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
                  Quiz Configuration
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Number of Sections"
                      fullWidth
                      value={formData.sections}
                      onChange={(e) =>
                        setFormData({ ...formData, sections: e.target.value })
                      }
                      error={!!error.sections}
                      helperText={error.sections}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Number of Questions"
                      fullWidth
                      value={formData.questions}
                      onChange={(e) =>
                        setFormData({ ...formData, questions: e.target.value })
                      }
                      error={!!error.questions}
                      helperText={error.questions}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Difficulty Level"
                      fullWidth
                      value={formData.difficulty}
                      onChange={(e) =>
                        setFormData({ ...formData, difficulty: e.target.value })
                      }
                      error={!!error.difficulty}
                      helperText={error.difficulty}
                    >
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Hard">Hard</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Total Marks"
                      fullWidth
                      type="number"
                      value={formData.totalMarks}
                      onChange={(e) =>
                        setFormData({ ...formData, totalMarks: e.target.value })
                      }
                      error={!!error.totalMarks}
                      helperText={error.totalMarks}
                    />
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    textAlign: "center",
                    mt: 3,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#3b82f6", // Blue background
                      color: "white", // White text
                      borderRadius: "24px", // Rounded corners
                      padding: "10px 20px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textTransform: "none",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Soft shadow
                      "&:hover": {
                        backgroundColor: "#2563eb", // Darker blue on hover
                      },
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onClick={handleSubmit}
                  >
                    <Sparkles size={20} />
                    Generate
                  </Button>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
      {Loading && <QuizLoader open={Loading} />}
    </Box>
  );
};

export default QuizGenerator;
