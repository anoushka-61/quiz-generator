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
import axios from "axios";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: "AKIATTSKGAGFDMILU77D",
  secretAccessKey: "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",
  region: "us-east-1", // Adjust the region if needed
});

const s3 = new AWS.S3();
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
  const [responseData, setResponseData] = useState(null);
  const [responseFile, setResponseFile] = useState(null);
  const [fileFailure, setFileFailure] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [fileKey, setFileKey] = useState(null);
  const navigate = useNavigate();

  const validFormats = [
    "application/pdf",
    "video/mp4",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  // const handleFileUpload = (uploadedFile) => {
  //   console.log({uploadedFile})
  //   if (!uploadedFile) return;

  //   let errors = {};
  //   if (!validFormats.includes(uploadedFile.type)) {
  //     toast.error("❌ Invalid file type! Upload PDF, MP4, or DOC.");
  //     errors.file = "❌ Invalid file type! Upload PDF, MP4, or DOC.";
  //     setError(errors);
  //     return;
  //   }
  //   setError(errors);
  //   setFile(uploadedFile);
  // };

  const handleFileUpload = (uploadedFile) => {
    localStorage.removeItem("quizData");
    if (!uploadedFile) return;

    let errors = {};
    if (!validFormats.includes(uploadedFile.type)) {
      toast.error("❌ Invalid file type! Upload PDF, MP4, or DOC.");
      errors.file = "❌ Invalid file type! Upload PDF, MP4, or DOC.";
      setError(errors);
      return;
    }
    setError({});
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
    // Generate S3 key using a FE generated path for course content upload:
    // Format: content/courseId_timestamp.ext

    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop();
    const key = `content/${"course"}_${timestamp}.${fileExtension}`;
    setFileKey(key);

    const params = {
      Bucket: "quadragen-content-files",
      Key: key,
      Body: file,
      ContentType: file.type,
    };
    setLoading(true);
    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading file:", err);
        setLoading(false);
        toast.error("Upload failed, please try again.");
        setResponseFile("");
        setFileFailure(err);
        setUploadingFile(false);
      } else {
        setTimeout(()=>{
          setLoading(false);
          toast.success("Upload successful!", {
            style: {
              background: "#E6F4EA", // Light green background
              color: "#1E4620", // Dark green text for contrast
              padding: "12px 20px",
              borderRadius: "8px",
              border: "1px solid #A3D9A5", // Green border for a soft look
              boxShadow: "0px 4px 10px rgba(163, 217, 165, 0.5)", // Subtle glow
            },
          });
          setResponseFile(data);
          setShowForm(true);
          setUploadingFile(false);
        },15000)
        // Optionally, you can use data.Location as the URL of the uploaded file.
      }
      
    });
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

  const handleSubmit = async () => {
    if (!validateInput()) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "https://hy4s0t7gyl.execute-api.us-east-1.amazonaws.com/default/quadragen_quizGenerate",
        {
          courseFile: `quadragen-content-files/${fileKey}`,
          numSections: formData.sections,
          questionsPerSection: formData.questions,
          difficulty: formData.difficulty,
          totalMarks: formData.totalMarks,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response?.data) {
        setResponseData(response.data);
        toast.success("Quiz generation initiated. Please wait...", {
          style: {
            background: "#E6F4EA",
            color: "#1E4620",
            padding: "12px 20px",
            borderRadius: "8px",
            border: "1px solid #A3D9A5",
            boxShadow: "0px 4px 10px rgba(163, 217, 165, 0.5)",
          },
        });
        localStorage.setItem("quizData", JSON.stringify(response.data));
        navigate("/quiz-preview?courseId=" + fileKey, { state: response.data });
        // In success scenario, call GET API immediately.
        // await fetchQuizData();
      } else {
        // toast.error(
        //   `${response.data.error || "Failed to generate quiz. Please try again"}`,
        //   {
        //     style: {
        //       background: "#FDEDED",
        //       color: "#611A15",
        //       padding: "12px 20px",
        //       borderRadius: "8px",
        //       border: "1px solid #F5C6C7",
        //       boxShadow: "0px 4px 10px rgba(245, 198, 199, 0.5)",
        //     },
        //   }
        // );
        // On failure, wait for 2 minutes before calling GET API.
        setTimeout(fetchQuizData, 120000);
      }
    } catch (err) {
      setError(err);
      // toast.error(`${err || "Failed to generate quiz. Please try again"}`, {
      //   style: {
      //     background: "#FDEDED",
      //     color: "#611A15",
      //     padding: "12px 20px",
      //     borderRadius: "8px",
      //     border: "1px solid #F5C6C7",
      //     boxShadow: "0px 4px 10px rgba(245, 198, 199, 0.5)",
      //   },
      // });
      // On error, wait for 2 minutes before calling GET API.
      setTimeout(fetchQuizData, 120000);
    }
    // Note: setLoading(false) is handled in fetchQuizData's finally block.
  };

  const fetchQuizData = async () => {
    try {
      const courseId = fileKey
        ? fileKey.split("/")[1].replace(/\.[^/.]+$/, "")
        : "";
      const getResponse = await axios.get(
        `https://hojir3vx1i.execute-api.us-east-1.amazonaws.com/default/quadragen-getQuizById?courseId=${courseId}`
      );
      localStorage.setItem("quizData", JSON.stringify(getResponse.data));
      navigate("/quiz-preview?courseId=" + fileKey, { state: getResponse.data });
    } catch (err) {
      console.error("Error fetching quiz data:", err);
      toast.error("Failed to fetch quiz data. Please try again later.");
    } finally {
      setLoading(false);
    }
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
                  fontWeight: 700,
                  backgroundImage: "linear-gradient(135deg, #8A2BE2, #FF69B4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textTransform: "capitalize",
                  letterSpacing: "1.5px",
                }}
              >
                <img
                  src="/quiz.png"
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                />{" "}
                QuizPro
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
                    paddingBottom: "8px",
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
                      <Typography variant="body2" sx={{ mb: 3 }}>
                        Drag & drop a file here or click below to upload
                      </Typography>
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUpload />}
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 700,
                          color: "white", // Set text color to white
                          backgroundImage:
                            "linear-gradient(135deg, #FF69B4, #8A2BE2)", // Gradient background
                      "&:hover": {
                        backgroundImage:
                            "linear-gradient(135deg,#8A2BE2, #FF69B4)", // Darker blue on hover
                      }, // Gradient background
                          padding: "10px", // Add padding to ensure background is visible
                          display: "inline-block", // Prevent full-width background
                          textTransform: "capitalize",
                          letterSpacing: "1.5px",
                          textAlign: "center",
                        }}
                      >
                        Upload File
                        <input
                          type="file"
                          hidden
                          onChange={handleFileChange}
                          accept=".pdf, .doc, .docx, .mp4"
                        />
                      </Button>
                    </>
                  )}
                </Box>
                {error.file && (
                  <Typography color="error" sx={{ mt: 1 }}>
                    {error.file}
                  </Typography>
                )}
                {file && (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<NavigateNext />}
                    sx={{ mt: 2,  backgroundImage:
                            "linear-gradient(135deg, #FF69B4, #8A2BE2)", // Gradient background
                      "&:hover": {
                        backgroundImage:
                            "linear-gradient(135deg,#8A2BE2, #FF69B4)", // Darker blue on hover
                      }, }}
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
                      backgroundImage:
                            "linear-gradient(135deg, #FF69B4, #8A2BE2)", // Gradient background
                      "&:hover": {
                        backgroundImage:
                            "linear-gradient(135deg,#8A2BE2, #FF69B4)", // Darker blue on hover
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
      {Loading && <QuizLoader open={Loading} uploadingFile={uploadingFile} />}
    </Box>
  );
};

export default QuizGenerator;
