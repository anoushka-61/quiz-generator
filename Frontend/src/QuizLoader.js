import { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Modal } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy"; // AI Icon
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const loadingMessages = [
 "Generating AI-powered quiz...",
  "Analyzing content for optimal questions...",
  "Fine-tuning difficulty for accuracy...",
  "Enhancing question clarity and relevance...",
  "Finalizing quiz structure for the best experience...",
];
const uploadingFileMessages = [
  "Uploading your file...",
  "Encrypting file data...",
  "Verifying file integrity...",
  "Transmitting data securely...",
  "Storing file safely...",
  "Finalizing file upload...",
  "Completing the process..."
];
const JsonLoader = [
  "Submitting your answers...",
  "Validating responses...",
  "Saving your progress...",
  "Uploading data securely...",
  "Finalizing quiz submission..."
];

const QuizLoader = ({ open,uploadingFile,attemptingQuiz }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(
        (prevIndex) => (prevIndex + 1) % loadingMessages.length
      );
    }, 5000); // Change text every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Modal
      open={open}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          background: "#fff",
          padding: "8px 16px",
          borderRadius: "8px",
          boxShadow: 3,
          width :"440px"
        }}
      >
        {/* <SmartToyIcon sx={{ fontSize: 28, color: "#1976D2" }} /> */}
        {/* <CircularProgress size={24} sx={{ color: "#1976D2" }} /> */}
        <DotLottieReact
          src="https://lottie.host/d4e321b0-bf82-4fef-8163-e2aef4d525d2/F7lKpUBwAH.lottie"
          loop
          autoplay
          style={{ width: "80px", height: "80px" }} // Adjust size as needed
        />

        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", color: "#2C3E50" }}
        >
          {uploadingFile?uploadingFileMessages[currentMessageIndex]:attemptingQuiz?JsonLoader[currentMessageIndex]:loadingMessages[currentMessageIndex]}
        </Typography>
      </Box>
    </Modal>
  );
};

export default QuizLoader;