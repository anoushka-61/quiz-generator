import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Card,
  CardContent,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import {
  ArrowBack,
  EditOutlined,
  Check,
  Delete,
  Publish,
} from "@mui/icons-material";

const initialData = {
  title: "My Quiz Title",
  totalMarks: 0,
  sections: [
    {
      name: "HTML Basics",
      questions: [
        {
          question: "What does HTML stand for?",
          options: [
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language",
            "Hyper Text Markup Language",
            "Hyper Tech Markup Language",
          ],
          correctAnswer: "Hyper Text Markup Language",
          score: 5,
        },
        {
          question: "Which HTML tag defines an image?",
          options: ["<img>", "<image>", "<pic>", "<src>"],
          correctAnswer: "<img>",
          score: 5,
        },
        {
          question: "Which element defines a paragraph in HTML?",
          options: ["<p>", "<para>", "<paragraph>", "<div>"],
          correctAnswer: "<p>",
          score: 5,
        },
      ],
    },
    {
      name: "CSS Basics",
      questions: [
        {
          question: "What does CSS stand for?",
          options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets",
          ],
          correctAnswer: "Cascading Style Sheets",
          score: 5,
        },
        {
          question: "Which CSS property controls text size?",
          options: ["font-style", "text-style", "font-size", "text-size"],
          correctAnswer: "font-size",
          score: 5,
        },
        {
          question: "Which is the correct CSS syntax?",
          options: [
            "body {color: black;}",
            "{body;color:black;}",
            "body:color=black;",
            "body={color:black}",
          ],
          correctAnswer: "body {color: black;}",
          score: 5,
        },
      ],
    },
    {
      name: "JavaScript Basics",
      questions: [
        {
          question:
            "What is the correct syntax for referring to an external script?",
          options: [
            '<script href="xxx.js">',
            '<script name="xxx.js">',
            '<script src="xxx.js">',
            '<script link="xxx.js">',
          ],
          correctAnswer: '<script src="xxx.js">',
          score: 5,
        },
        {
          question: "Inside which HTML element do we put the JavaScript?",
          options: ["<js>", "<scripting>", "<script>", "<javascript>"],
          correctAnswer: "<script>",
          score: 5,
        },
        {
          question: "Which operator is used to assign a value to a variable?",
          options: ["=", "*", "-", "+"],
          correctAnswer: "=",
          score: 5,
        },
      ],
    },
    {
      name: "React Basics",
      questions: [
        {
          question: "What is a common way to define a React component?",
          options: [
            "function MyComponent() {}",
            "def MyComponent()",
            "createComponent(MyComponent)",
            "component MyComponent() {}",
          ],
          correctAnswer: "function MyComponent() {}",
          score: 5,
        },
        {
          question: "JSX stands for?",
          options: [
            "JavaScript XML",
            "JSON XML",
            "Java Syntax eXtension",
            "Just Simple eXpressions",
          ],
          correctAnswer: "JavaScript XML",
          score: 5,
        },
        {
          question: "Which hook is used for state in a functional component?",
          options: ["useState", "useEffect", "useContext", "useReducer"],
          correctAnswer: "useState",
          score: 5,
        },
      ],
    },
    {
      name: "Node.js Basics",
      questions: [
        {
          question: "Which command starts a Node.js application?",
          options: [
            "node app.js",
            "start app.js",
            "run app.js",
            "node run app.js",
          ],
          correctAnswer: "node app.js",
          score: 5,
        },
        {
          question: "Node.js is built on which JavaScript engine?",
          options: ["SpiderMonkey", "Chakra", "V8", "JavaScriptCore"],
          correctAnswer: "V8",
          score: 5,
        },
        {
          question: "Which built-in module creates a web server in Node.js?",
          options: ["web", "http", "server", "url"],
          correctAnswer: "http",
          score: 5,
        },
      ],
    },
    {
      name: "MongoDB Basics",
      questions: [
        {
          question: "MongoDB is a ____ database.",
          options: ["SQL-based", "Relational", "NoSQL", "Key-Value"],
          correctAnswer: "NoSQL",
          score: 5,
        },
        {
          question: "Which command starts the Mongo shell?",
          options: ["mongod", "mongo", "mongo-shell", "start-mongo"],
          correctAnswer: "mongo",
          score: 5,
        },
        {
          question: "Which data format does MongoDB use?",
          options: ["XML", "JSON", "BSON", "CSV"],
          correctAnswer: "BSON",
          score: 5,
        },
      ],
    },
    {
      name: "TypeScript Basics",
      questions: [
        {
          question: "TypeScript is a superset of which language?",
          options: ["Java", "JavaScript", "C++", "Python"],
          correctAnswer: "JavaScript",
          score: 5,
        },
        {
          question: "Which file extension is used for TypeScript files?",
          options: [".js", ".ts", ".tsx", ".jsx"],
          correctAnswer: ".ts",
          score: 5,
        },
        {
          question: "Which command compiles TypeScript?",
          options: ["tsc", "ts-run", "compile-ts", "typescript"],
          correctAnswer: "tsc",
          score: 5,
        },
      ],
    },
    {
      name: "Git Basics",
      questions: [
        {
          question: "Which command initializes a new Git repository?",
          options: ["git start", "git init", "git new", "git create"],
          correctAnswer: "git init",
          score: 5,
        },
        {
          question: "Which command stages changes for commit?",
          options: ["git push", "git stage", "git add", "git commit"],
          correctAnswer: "git add",
          score: 5,
        },
        {
          question: "Which command checks the status in Git?",
          options: ["git status", "git check", "git diff", "git info"],
          correctAnswer: "git status",
          score: 5,
        },
      ],
    },
    {
      name: "DevOps Basics",
      questions: [
        {
          question: "CI stands for ____ in DevOps.",
          options: [
            "Continuous Integration",
            "Continuous Information",
            "Code Integration",
            "Code Implementation",
          ],
          correctAnswer: "Continuous Integration",
          score: 5,
        },
        {
          question: "Which tool is commonly used for containerization?",
          options: ["Docker", "Jenkins", "Kubernetes", "GitLab"],
          correctAnswer: "Docker",
          score: 5,
        },
        {
          question: "Which tool orchestrates containers?",
          options: ["Docker", "Jenkins", "Kubernetes", "Git"],
          correctAnswer: "Kubernetes",
          score: 5,
        },
      ],
    },
    {
      name: "Testing Basics",
      questions: [
        {
          question: "Which framework is commonly used for testing React apps?",
          options: ["Mocha", "Jest", "Cypress", "Jasmine"],
          correctAnswer: "Jest",
          score: 5,
        },
        {
          question: "Which test checks functionality of separate modules?",
          options: [
            "Integration testing",
            "End-to-end testing",
            "Unit testing",
            "Acceptance testing",
          ],
          correctAnswer: "Unit testing",
          score: 5,
        },
        {
          question: "Which testing simulates real user scenarios?",
          options: [
            "Unit testing",
            "Integration testing",
            "End-to-end testing",
            "Smoke testing",
          ],
          correctAnswer: "End-to-end testing",
          score: 5,
        },
      ],
    },
  ],
};

// Calculate total marks
initialData.totalMarks = initialData.sections.reduce(
  (total, section) =>
    total +
    section.questions.reduce((sum, q) => sum + Number(q.score || 0), 0),
  0
);

export default function QuizPreview() {
  const [quizData, setQuizData] = useState(initialData);
  const [selectedTab, setSelectedTab] = useState(0);
  const [editing, setEditing] = useState({});
  const [deleteDialog, setDeleteDialog] = useState({ open: false, index: null });
  const [draft, setDraft] = useState({});

  // Toggle edit mode for a field key with save behavior
  const toggleSaveField = (key, updateFn) => {
    if (editing[key]) {
      // Save: commit the draft value using the provided update function
      updateFn(draft[key]);
      setEditing((prev) => ({ ...prev, [key]: false }));
      setDraft((prev) => {
        const newDraft = { ...prev };
        delete newDraft[key];
        return newDraft;
      });
    } else {
      // Start editing: copy current value to draft if not already present
      setDraft((prev) => ({ ...prev, [key]: prev[key] || undefined }));
      setEditing((prev) => ({ ...prev, [key]: true }));
    }
  };

  // Handle draft change for editing fields
  const handleDraftChange = (key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  // Update question field in quizData
  const updateQuestionField = (sectionIdx, questionIdx, field, newValue) => {
    const updatedQuiz = { ...quizData };
    updatedQuiz.sections[sectionIdx].questions[questionIdx][field] = newValue;
    if (field === "score") {
      updatedQuiz.totalMarks = updatedQuiz.sections.reduce(
        (total, sec) =>
          total + sec.questions.reduce((sum, q) => sum + Number(q.score || 0), 0),
        0
      );
    }
    setQuizData(updatedQuiz);
  };

  // Update quiz title in header
  const handleQuizTitleChange = (value) => {
    setQuizData((prev) => ({ ...prev, title: value }));
  };

  // Update section title (left sidebar)
  const handleSectionChange = (sectionIdx, value) => {
    const updatedQuiz = { ...quizData };
    updatedQuiz.sections[sectionIdx].name = value;
    setQuizData(updatedQuiz);
  };

  // Added function: updateSectionTitle (same as handleSectionChange)
  const updateSectionTitle = (sectionIdx, newTitle) => {
    handleSectionChange(sectionIdx, newTitle);
  };

  // Delete a section
  const handleDeleteSection = () => {
    const updatedQuiz = { ...quizData };
    updatedQuiz.sections.splice(deleteDialog.index, 1);
    updatedQuiz.totalMarks = updatedQuiz.sections.reduce(
      (total, sec) =>
        total + sec.questions.reduce((sum, q) => sum + Number(q.score || 0), 0),
      0
    );
    setQuizData(updatedQuiz);
    setDeleteDialog({ open: false, index: null });
    setSelectedTab(Math.max(0, selectedTab - 1));
  };

  // Delete a question
  const handleDeleteQuestion = (sectionIdx, questionIdx) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const updatedQuiz = { ...quizData };
      updatedQuiz.sections[sectionIdx].questions.splice(questionIdx, 1);
      updatedQuiz.totalMarks = updatedQuiz.sections.reduce(
        (total, sec) =>
          total + sec.questions.reduce((sum, q) => sum + Number(q.score || 0), 0),
        0
      );
      setQuizData(updatedQuiz);
    }
  };

  return (
    <Box sx={{ fontFamily: "Montserrat, sans-serif", minHeight: "100vh" }}>
      {/* HEADER: Back Icon, Editable Title (center), Total Marks + Publish CTA (right) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          backgroundColor: "#fff",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
          borderBottom: "1px solid #ddd",
        }}
      >
        {/* Back Icon */}
        <IconButton>
          <ArrowBack />
        </IconButton>

        {/* Editable Quiz Title */}
        <TextField
          variant="standard"
          value={
            editing["quizTitle"]
              ? draft["quizTitle"] ?? quizData.title
              : quizData.title
          }
          onChange={(e) => {
            if (editing["quizTitle"]) {
              handleDraftChange("quizTitle", e.target.value);
            }
          }}
          InputProps={{ disableUnderline: true }}
          sx={{
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "900",
            width: 300,
          }}
        />
        <IconButton
          onClick={() =>
            toggleSaveField("quizTitle", (newVal) => handleQuizTitleChange(newVal))
          }
        >
          {editing["quizTitle"] ? (
            <Check color="success" fontSize="small" />
          ) : (
            <EditOutlined fontSize="small" />
          )}
        </IconButton>

        {/* Right Container: Total Marks + Publish Button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
            Total Marks: {quizData.totalMarks}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Publish />}
            sx={{ textTransform: "none" }}
          >
            Publish Quiz
          </Button>
        </Box>
      </Box>

      {/* MAIN BODY with Improved Gradient Background */}
      <Box
        sx={{
          background: "linear-gradient(to bottom, #cceeff, #e0f7fa, #f7f7f7)",
          p: 3,
          pt: 0,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* LEFT: Sections List (Vertical Tabs) */}
          <Box
            sx={{
              width: 250,
              backgroundImage: "linear-gradient(180deg,#e7e7ff,#fff,#fff)",
              p: 2,
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              overflowY: "auto",
              maxHeight: "calc(100vh - 100px)",
            }}
          >
            <Typography sx={{ fontSize: "1rem", fontWeight: "bold", mb: 1 }}>
              Sections
            </Typography>
            <Tabs
              orientation="vertical"
              value={selectedTab}
              onChange={(_, newValue) => setSelectedTab(newValue)}
              sx={{
                "& .MuiTab-root": {
                  textAlign: "left",
                  minHeight: 50,
                  textTransform: "none",
                  fontWeight: "bold",
                  color: "#333",
                  alignItems: "flex-start",
                },
              }}
            >
              {quizData.sections.map((section, index) => (
                <Tab
                  key={index}
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      {editing[`section-${index}`] ? (
                        <TextField
                          value={draft[`section-${index}`] ?? section.name}
                          onChange={(e) =>
                            handleDraftChange(`section-${index}`, e.target.value)
                          }
                          onBlur={() =>
                            toggleSaveField(`section-${index}`, (newVal) =>
                              updateSectionTitle(index, newVal)
                            )
                          }
                          variant="standard"
                          InputProps={{ disableUnderline: true }}
                          sx={{ width: 160 }}
                        />
                      ) : (
                        <Typography
                          onClick={() => {
                            setDraft((prev) => ({
                              ...prev,
                              [`section-${index}`]: section.name,
                            }));
                            setEditing((prev) => ({ ...prev, [`section-${index}`]: true }));
                          }}
                          sx={{ cursor: "pointer" }}
                        >
                          {section.name}
                        </Typography>
                      )}
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteDialog({ open: true, index });
                        }}
                        size="small"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  }
                />
              ))}
            </Tabs>
          </Box>

          {/* RIGHT: Questions for Selected Section */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              backgroundColor: "#ebebeb",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              overflowY: "auto",
              maxHeight: "calc(100vh - 100px)",
            }}
          >
            {quizData.sections[selectedTab]?.questions.map(
              (question, questionIdx) => (
                <Card
                  key={questionIdx}
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "#fff",
                    border: "1px solid #eee",
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        value={
                          editing[`q-${selectedTab}-${questionIdx}`]
                            ? draft[`q-${selectedTab}-${questionIdx}`] ??
                              question.question
                            : question.question
                        }
                        onChange={(e) => {
                          if (editing[`q-${selectedTab}-${questionIdx}`]) {
                            handleDraftChange(`q-${selectedTab}-${questionIdx}`, e.target.value);
                          }
                        }}
                        sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                      />
                      <IconButton
                        onClick={() =>
                          toggleSaveField(`q-${selectedTab}-${questionIdx}`, (newVal) =>
                            updateQuestionField(selectedTab, questionIdx, "question", newVal)
                          )
                        }
                        size="small"
                      >
                        {editing[`q-${selectedTab}-${questionIdx}`] ? (
                          <Check color="success" fontSize="small" />
                        ) : (
                          <EditOutlined fontSize="small" />
                        )}
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteQuestion(selectedTab, questionIdx)}
                        size="small"
                      >
                        <Delete color="error" fontSize="small" />
                      </IconButton>
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    {/* Options */}
                    {question.options.map((option, optIdx) => (
                      <Box
                        key={optIdx}
                        display="flex"
                        alignItems="center"
                        mb={1}
                        sx={{
                          backgroundColor:
                            question.correctAnswer === option ? "#f1f8e9" : "#fff",
                          border:
                            question.correctAnswer === option
                              ? "2px solid #8bc34a"
                              : "1px solid #ddd",
                          borderRadius: 2,
                          p: 0.5,
                        }}
                      >
                        <TextField
                          fullWidth
                          variant="outlined"
                          value={
                            editing[`opt-${selectedTab}-${questionIdx}-${optIdx}`]
                              ? draft[`opt-${selectedTab}-${questionIdx}-${optIdx}`] ??
                                option
                              : option
                          }
                          onChange={(e) => {
                            if (editing[`opt-${selectedTab}-${questionIdx}-${optIdx}`]) {
                              handleDraftChange(`opt-${selectedTab}-${questionIdx}-${optIdx}`, e.target.value);
                            }
                          }}
                          sx={{
                            backgroundColor: "#fff",
                            borderRadius: 2,
                            fontSize: "0.9rem",
                          }}
                        />
                        <IconButton
                          onClick={() =>
                            toggleSaveField(`opt-${selectedTab}-${questionIdx}-${optIdx}`, (newVal) => {
                              const updatedOptions = [...question.options];
                              updatedOptions[optIdx] = newVal;
                              updateQuestionField(selectedTab, questionIdx, "options", updatedOptions);
                            })
                          }
                          size="small"
                        >
                          {editing[`opt-${selectedTab}-${questionIdx}-${optIdx}`] ? (
                            <Check color="success" fontSize="small" />
                          ) : (
                            <EditOutlined fontSize="small" />
                          )}
                        </IconButton>
                      </Box>
                    ))}

                    {/* Score */}
                    <Box display="flex" alignItems="center" mt={1}>
                      <Typography variant="body1" sx={{ fontWeight: "bold", mr: 1, fontSize: "0.9rem", color: "#333" }}>
                        Score:
                      </Typography>
                      <TextField
                        type="number"
                        variant="outlined"
                        value={
                          editing[`score-${selectedTab}-${questionIdx}`]
                            ? draft[`score-${selectedTab}-${questionIdx}`] ??
                              question.score
                            : question.score
                        }
                        onChange={(e) => {
                          if (editing[`score-${selectedTab}-${questionIdx}`]) {
                            handleDraftChange(`score-${selectedTab}-${questionIdx}`, e.target.value);
                          }
                        }}
                        sx={{ width: 100, backgroundColor: "#fff", borderRadius: 2, fontSize: "0.9rem" }}
                      />
                      <IconButton
                        onClick={() =>
                          toggleSaveField(`score-${selectedTab}-${questionIdx}`, (newVal) =>
                            updateQuestionField(selectedTab, questionIdx, "score", newVal)
                          )
                        }
                        size="small"
                      >
                        {editing[`score-${selectedTab}-${questionIdx}`] ? (
                          <Check color="success" fontSize="small" />
                        ) : (
                          <EditOutlined fontSize="small" />
                        )}
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              )
            )}
          </Box>
        </Box>
      </Box>

      {/* Delete Section Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, index: null })}>
        <DialogTitle>Are you sure you want to delete this section?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, index: null })}>
            Cancel
          </Button>
          <Button onClick={handleDeleteSection} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}