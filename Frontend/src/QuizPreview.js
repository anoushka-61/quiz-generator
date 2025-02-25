import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  Typography,
  TextField,
  IconButton,
  Grid,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { Edit, Check, Delete } from "@mui/icons-material";

const initialData = {
  totalMarks: 100,
  sections: [
    {
      name: "Math Section",
      questions: [
        {
          question: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          correctAnswer: "4",
          score: 10,
        },
        {
          question: "What is 5 × 6?",
          options: ["28", "30", "32", "34"],
          correctAnswer: "30",
          score: 10,
        },
      ],
    },
    {
      name: "Science Section",
      questions: [
        {
          question: "What is H2O?",
          options: ["Oxygen", "Water", "Hydrogen", "Nitrogen"],
          correctAnswer: "Water",
          score: 10,
        },
      ],
    },
  ],
};

const QuizPreview = () => {
  const [quizData, setQuizData] = useState(initialData);
  const [selectedTab, setSelectedTab] = useState(0);
  const [editing, setEditing] = useState({});
  const [deleteDialog, setDeleteDialog] = useState({ open: false, index: null });

  // Toggle edit mode
  const handleEditToggle = (key) => {
    setEditing((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Handle field updates
  const handleChange = (sectionIdx, questionIdx, field, value) => {
    const updatedQuiz = { ...quizData };
    updatedQuiz.sections[sectionIdx].questions[questionIdx][field] = value;

    // Recalculate total marks if score changes
    if (field === "score") {
      updatedQuiz.totalMarks = updatedQuiz.sections.reduce(
        (total, section) =>
          total + section.questions.reduce((sum, q) => sum + Number(q.score || 0), 0),
        0
      );
    }
    setQuizData(updatedQuiz);
  };

  // Update section name
  const handleSectionChange = (sectionIdx, value) => {
    const updatedQuiz = { ...quizData };
    updatedQuiz.sections[sectionIdx].name = value;
    setQuizData(updatedQuiz);
  };

  // Handle section deletion
  const handleDeleteSection = () => {
    const updatedQuiz = { ...quizData };
    updatedQuiz.sections.splice(deleteDialog.index, 1);
    updatedQuiz.totalMarks = updatedQuiz.sections.reduce(
      (total, section) =>
        total + section.questions.reduce((sum, q) => sum + Number(q.score || 0), 0),
      0
    );
    setQuizData(updatedQuiz);
    setDeleteDialog({ open: false, index: null });
    setSelectedTab(Math.max(0, selectedTab - 1));
  };

  return (
    <Box maxWidth="md" mx="auto" p={4}>
      {/* Quiz Header */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#1976D2" }}>
        Quiz Generator
      </Typography>

      {/* Total Score Display */}
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="h6">Total Marks:</Typography>
        <TextField
          type="number"
          variant="outlined"
          value={quizData.totalMarks}
          disabled
          sx={{ width: 100, fontWeight: "bold" }}
        />
      </Box>

      {/* Section Tabs with Delete Icon */}
      <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)} variant="scrollable">
        {quizData.sections.map((section, index) => (
          <Box key={index} display="flex" alignItems="center">
            <Tab label={section.name} />
            <IconButton onClick={() => setDeleteDialog({ open: true, index })} color="error">
              <Delete />
            </IconButton>
          </Box>
        ))}
      </Tabs>

      {/* Section Content */}
      {quizData.sections.map((section, sectionIdx) => (
        <Box key={sectionIdx} hidden={selectedTab !== sectionIdx} p={2}>
          {/* Editable Section Name */}
          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              variant="outlined"
              value={section.name}
              onChange={(e) => handleSectionChange(sectionIdx, e.target.value)}
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            />
          </Box>

          {/* Question List */}
          {section.questions.map((question, questionIdx) => (
            <Card key={questionIdx} sx={{ my: 2, p: 2 }}>
              <CardContent>
                {/* Editable Question */}
                <Box display="flex" alignItems="center" gap={1}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={question.question}
                    onChange={(e) => handleChange(sectionIdx, questionIdx, "question", e.target.value)}
                    disabled={!editing[`q-${sectionIdx}-${questionIdx}`]}
                  />
                  <IconButton onClick={() => handleEditToggle(`q-${sectionIdx}-${questionIdx}`)}>
                    {editing[`q-${sectionIdx}-${questionIdx}`] ? <Check /> : <Edit />}
                  </IconButton>
                </Box>

                {/* Editable MCQs */}
                <Grid container spacing={1} mt={1}>
                  {question.options.map((option, optIdx) => (
                    <Grid item xs={6} key={optIdx}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        value={option}
                        onChange={(e) =>
                          handleChange(sectionIdx, questionIdx, `options.${optIdx}`, e.target.value)
                        }
                        disabled={!editing[`opt-${sectionIdx}-${questionIdx}-${optIdx}`]}
                      />
                      <IconButton onClick={() => handleEditToggle(`opt-${sectionIdx}-${questionIdx}-${optIdx}`)}>
                        {editing[`opt-${sectionIdx}-${questionIdx}-${optIdx}`] ? <Check /> : <Edit />}
                      </IconButton>
                    </Grid>
                  ))}
                </Grid>

                {/* Editable Score */}
                <TextField
                  type="number"
                  variant="outlined"
                  value={question.score}
                  onChange={(e) => handleChange(sectionIdx, questionIdx, "score", e.target.value)}
                  disabled={!editing[`score-${sectionIdx}-${questionIdx}`]}
                  sx={{ mt: 1, width: 100 }}
                />
                <IconButton onClick={() => handleEditToggle(`score-${sectionIdx}-${questionIdx}`)}>
                  {editing[`score-${sectionIdx}-${questionIdx}`] ? <Check /> : <Edit />}
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </Box>
      ))}

      {/* Delete Section Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, index: null })}>
        <DialogTitle>Are you sure you want to delete this section?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, index: null })}>Cancel</Button>
          <Button onClick={handleDeleteSection} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuizPreview;
