import { useState } from "react";
import { Box, Card, CardContent, Tabs, Tab, Typography, Button, TextField } from "@mui/material";
import "./QuizPreview.scss";

const dummyData = {
  totalMarks: 100,
  sections: [
    {
      name: "Section 1",
      questions: [
        {
          question: "What is the capital of France?",
          options: ["Berlin", "Madrid", "Paris", "Lisbon"],
          correctAnswer: "Paris",
          score: 10,
        },
        {
          question: "Which planet is known as the Red Planet?",
          options: ["Earth", "Mars", "Jupiter", "Saturn"],
          correctAnswer: "Mars",
          score: 10,
        },
      ],
    },
    {
      name: "Section 2",
      questions: [
        {
          question: "Who wrote 'To Kill a Mockingbird'?",
          options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Jane Austen"],
          correctAnswer: "Harper Lee",
          score: 10,
        },
        {
          question: "What is the chemical symbol for water?",
          options: ["H2O", "O2", "CO2", "NaCl"],
          correctAnswer: "H2O",
          score: 10,
        },
      ],
    },
  ],
};

const QuizPreview = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  
  return (
    <Box className="quiz-preview" maxWidth="lg" mx="auto" p={4}>
      <Typography variant="h4" gutterBottom>Quiz Preview</Typography>
      <Typography variant="h6">Total Marks: {dummyData.totalMarks}</Typography>
      
      <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
        {dummyData.sections.map((section, index) => (
          <Tab key={index} label={section.name} />
        ))}
      </Tabs>

      {dummyData.sections.map((section, index) => (
        <Box key={index} hidden={selectedTab !== index} p={2} className="section-content">
          <Typography variant="h5">{section.name}</Typography>
          {section.questions.map((question, qIndex) => (
            <Card key={qIndex} className="question-card">
              <CardContent>
                <Typography variant="body1" fontWeight="bold">{question.question}</Typography>
                {question.options.map((option, oIndex) => (
                  <Box key={oIndex} className="option-box">
                    <TextField disabled value={option} fullWidth />
                  </Box>
                ))}
                <Typography variant="body2" color="success.main">Correct Answer: {question.correctAnswer}</Typography>
                <Typography variant="body2">Score: {question.score}</Typography>
                <Box className="actions">
                  <Button variant="outlined" color="primary">Edit</Button>
                  <Button variant="outlined" color="error">Delete</Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default QuizPreview;