import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

function transformQuizData(apiData) {
  // Destructure the quiz array from the API data
  const { quiz } = apiData?.data || {};
  let totalMarks = 0;
  // Map each section in the API data to our new format
  const sections = quiz?.map((section) => {
    // Transform each active question in the section
    const questions = section?.questions
      // ?.filter((q) => q?.is_active)
      ?.map((q) => {
        totalMarks += q?.marks;
        return {
          question: q?.question,
          options: q?.options,
          correctAnswer: q?.correct_answer,
          score: q?.marks,
        };
      });
    return {
      name: section?.title,
      questions,
    };
  });
  return {
    title: apiData?.data?.quizTitle,
    totalMarks,
    sections,
  };
}

// Example usage:
const apiData = {
  data: {
    status: "success",
    message: "Quiz uploaded successfully",
    quizFile:
      "quadragen-content-files/quizes/1740659257084_MBA-Brochure_1740653415379.json",
    quiz: [
      {
        title: "About D.Y. Patil",
        questions: [
          {
            question: "What was the former position held by D.Y. Patil?",
            options: [
              "Governor of Bihar",
              "Governor of Tripura",
              "Governor of West Bengal",
              "All of the above",
            ],
            correct_answer: "All of the above",
            marks: 1.2,
            is_active: true,
          },
          {
            question: "From which state in India is D.Y. Patil?",
            options: ["Maharashtra", "Karnataka", "Gujarat", "Rajasthan"],
            correct_answer: "Maharashtra",
            marks: 1.2,
            is_active: true,
          },
          {
            question: "What was D.Y. Patil's vision for youth in India?",
            options: [
              "To provide greater educational opportunities",
              "To promote agriculture",
              "To promote business",
              "To promote tourism",
            ],
            correct_answer: "To provide greater educational opportunities",
            marks: 1.2,
            is_active: true,
          },
          {
            question: "How many deemed universities has D.Y. Patil envisioned?",
            options: ["1", "2", "3", "4"],
            correct_answer: "3",
            marks: 1.2,
            is_active: true,
          },
          {
            question:
              "What was the purpose of establishing the Centre of Online Learning (COL)?",
            options: [
              "To bridge the gap between industry expectations and student skills",
              "To promote online education",
              "To offer more courses",
              "To increase enrollment",
            ],
            correct_answer:
              "To bridge the gap between industry expectations and student skills",
            marks: 1.2,
            is_active: true,
          },
          {
            question: "What is D.Y. Patil's principle for success in life?",
            options: [
              "Follow your passion",
              "Work hard",
              "Ego is the death of life",
              "Never give up",
            ],
            correct_answer: "Ego is the death of life",
            marks: 1.2,
            is_active: true,
          },
          {
            question: "From which town in Maharashtra is D.Y. Patil?",
            options: ["Kolhapur", "Pune", "Mumbai", "Nagpur"],
            correct_answer: "Kolhapur",
            marks: 1.2,
            is_active: true,
          },
          {
            question:
              "How many independent institutions has D.Y. Patil envisioned?",
            options: ["100", "150", "200", "250"],
            correct_answer: "150",
            marks: 1.2,
            is_active: true,
          },
          {
            question: "What was D.Y. Patil's goal?",
            options: [
              "To spread education across India",
              "To promote business",
              "To promote agriculture",
              "To promote tourism",
            ],
            correct_answer: "To spread education across India",
            marks: 1.2,
            is_active: true,
          },
          {
            question: "What is D.Y. Patil's profession?",
            options: [
              "Educationist",
              "Businessman",
              "Politician",
              "Agriculturist",
            ],
            correct_answer: "Educationist",
            marks: 1.2,
            is_active: true,
          },
        ],
        is_active: true,
      },
      {
        title: "MBA Overview",
        questions: [
          {
            question: "What is the duration of the MBA program?",
            options: ["1 year", "2 years", "3 years", "4 years"],
            correct_answer: "2 years",
            marks: 1.2,
            is_active: true,
          },
          {
            question:
              "How many specializations are offered in the MBA program?",
            options: ["8", "10", "11", "12"],
            correct_answer: "11",
            marks: 1.2,
            is_active: true,
          },
          {
            question: "What is the mode of instruction for the MBA program?",
            options: ["Online", "Offline", "Hybrid", "Both online and offline"],
            correct_answer: "Online",
            marks: 1.2,
            is_active: true,
          },
          {
            question:
              "How many live masterclasses are included in the MBA program?",
            options: ["1", "2", "3", "4"],
            correct_answer: "1",
            marks: 1.2,
            is_active: true,
          },
          {
            question: "What is the learning approach of the MBA program?",
            options: [
              "Flexible learning",
              "Rigid learning",
              "Self-paced learning",
              "Classroom learning",
            ],
            correct_answer: "Flexible learning",
            marks: 1.2,
            is_active: true,
          },
          {
            question: "What is the adherence of the MBA program?",
            options: [
              "4 Quadrants of UGC",
              "3 Quadrants of UGC",
              "2 Quadrants of UGC",
              "5 Quadrants of UGC",
            ],
            correct_answer: "4 Quadrants of UGC",
            marks: 1.2,
            is_active: true,
          },
          {
            question:
              "Which of the following is a highlight of the MBA program?",
            options: [
              "Placement assistance",
              "Cutting-edge curriculum",
              "Industry connect",
              "All of the above",
            ],
            correct_answer: "All of the above",
            marks: 1.2,
            is_active: true,
          },
          {
            question: "What is the focus of the MBA program?",
            options: [
              "Business case studies",
              "Real-world examples",
              "Both business case studies and real-world examples",
              "None of the above",
            ],
            correct_answer:
              "Both business case studies and real-world examples",
            marks: 1.2,
            is_active: true,
          },
          {
            question: "Who designed the MBA program?",
            options: [
              "Business professionals",
              "Academicians",
              "Both business professionals and academicians",
              "None of the above",
            ],
            correct_answer: "Both business professionals and academicians",
            marks: 1.2,
            is_active: true,
          },
          {
            question: "What is the purpose of the MBA program?",
            options: [
              "To bridge the gap between industry expectations and student skills",
              "To provide theoretical knowledge",
              "To promote online education",
              "To increase enrollment",
            ],
            correct_answer:
              "To bridge the gap between industry expectations and student skills",
            marks: 1.2,
            is_active: true,
          },
        ],
        is_active: true,
      },
      {
        title: "Why D.Y. Patil?",
        questions: [
          {
            question:
              "What is one of the advantages of studying at D.Y. Patil University?",
            options: [
              "Flexible learning",
              "Limited course options",
              "Rigid learning schedule",
              "No industry connect",
            ],
            correct_answer: "Flexible learning",
            marks: 1.2,
            is_active: true,
          },
          {
            question: "What is offered at D.Y. Patil University?",
            options: [
              "A wide range of courses across multiple disciplines",
              "Limited course options",
              "Only MBA courses",
              "Only engineering courses",
            ],
            correct_answer:
              "A wide range of courses across multiple disciplines",
            marks: 1.2,
            is_active: true,
          },
          {
            question:
              "How is the virtual classroom experience at D.Y. Patil University?",
            options: [
              "Interactive",
              "Boring",
              "One-way communication",
              "No virtual classroom",
            ],
            correct_answer: "Interactive",
            marks: 1.2,
            is_active: true,
          },
          {
            question: "Who teaches at D.Y. Patil University?",
            options: [
              "Distinguished faculty members and industry experts",
              "Inexperienced faculty",
              "Only industry experts",
              "Only faculty members",
            ],
            correct_answer:
              "Distinguished faculty members and industry experts",
            marks: 1.2,
            is_active: true,
          },
          {
            question:
              "What kind of support services are provided at D.Y. Patil University?",
            options: [
              "Comprehensive support services",
              "Limited support services",
              "No support services",
              "Only academic support services",
            ],
            correct_answer: "Comprehensive support services",
            marks: 1.2,
            is_active: true,
          },
          {
            question: "How are exams conducted at D.Y. Patil University?",
            options: [
              "Online exams from any location with internet access",
              "Only on-campus exams",
              "No exams",
              "Both online and on-campus exams",
            ],
            correct_answer:
              "Online exams from any location with internet access",
            marks: 1.2,
            is_active: true,
          },
          {
            question: "What is the learning approach at D.Y. Patil University?",
            options: [
              "Flexible learning",
              "Rigid learning schedule",
              "Self-paced learning",
              "Classroom learning",
            ],
            correct_answer: "Flexible learning",
            marks: 1.2,
            is_active: true,
          },
          {
            question:
              "What is the purpose of the dedicated relationship officers at D.Y. Patil University?",
            options: [
              "To provide personalized support throughout the journey",
              "To handle admissions",
              "To teach courses",
              "To conduct exams",
            ],
            correct_answer:
              "To provide personalized support throughout the journey",
            marks: 1.2,
            is_active: true,
          },
          {
            question:
              "What is the advantage of the virtual classroom environment at D.Y. Patil University?",
            options: [
              "Interactive and engaging",
              "Boring and one-way communication",
              "No virtual classroom",
              "Limited interaction",
            ],
            correct_answer: "Interactive and engaging",
            marks: 1.2,
            is_active: true,
          },
          {
            question:
              "What is the advantage of the faculty at D.Y. Patil University?",
            options: [
              "Distinguished and experienced",
              "Inexperienced",
              "Only industry experts",
              "Only academicians",
            ],
            correct_answer: "Distinguished and experienced",
            marks: 1.2,
            is_active: true,
          },
        ],
        is_active: true,
      },
      {
        title: "MBA Specializations",
        questions: [
          {
            question:
              "Which of the following is a specialization offered in the MBA program?",
            options: [
              "Sales and Marketing Management",
              "Human Resource Management",
              "Hospital and Healthcare Management",
              "All of the above",
            ],
            correct_answer: "All of the above",
            marks: 1.2,
            is_active: true,
          },
          {
            question:
              "What is the specialization related to digital marketing?",
            options: [
              "Digital Marketing Management",
              "Marketing Management",
              "Sales Management",
              "Retail Management",
            ],
            correct_answer: "Digital Marketing Management",
            marks: 1.2,
            is_active: true,
          },
          {
            question: "Which specialization focuses on finance?",
            options: [
              "Finance Management",
              "Accounting Management",
              "Banking Management",
              "Financial Planning",
            ],
            correct_answer: "Finance Management",
            marks: 1.2,
            is_active: true,
          },
          {
            question:
              "What is the specialization related to supply chain and logistics?",
            options: [
              "Logistics and Supply Chain Management",
              "Operations Management",
              "Project Management",
              "Production Management",
            ],
            correct_answer: "Logistics and Supply Chain Management",
            marks: 1.2,
            is_active: true,
          },
          {
            question:
              "Which specialization combines data science and business analytics?",
            options: [
              "Data Science and Business Analytics",
              "Business Analytics",
              "Data Science",
              "Data Management",
            ],
            correct_answer: "Data Science and Business Analytics",
            marks: 1.2,
            is_active: true,
          },
          {
            question:
              "What is the specialization focused on international business?",
            options: [
              "International Business Management",
              "Global Business Management",
              "Export-Import Management",
              "Foreign Trade Management",
            ],
            correct_answer: "International Business Management",
            marks: 1.2,
            is_active: true,
          },
          {
            question:
              "Which specialization is related to starting and running a business?",
            options: [
              "Entrepreneurship Management",
              "Business Management",
              "Management Studies",
              "Business Administration",
            ],
            correct_answer: "Entrepreneurship Management",
            marks: 1.2,
            is_active: true,
          },
          {
            question: "What is the specialization focused on managing events?",
            options: [
              "Event Management",
              "Event Planning",
              "Event Organizing",
              "Event Marketing",
            ],
            correct_answer: "Event Management",
            marks: 1.2,
            is_active: true,
          },
          {
            question: "Which specialization is related to retail operations?",
            options: [
              "Retail Management",
              "Retail Operations",
              "Retail Marketing",
              "Retail Sales",
            ],
            correct_answer: "Retail Management",
            marks: 1.2,
            is_active: true,
          },
          {
            question:
              "How many specializations are offered in the MBA program?",
            options: ["8", "10", "11", "12"],
            correct_answer: "11",
            marks: 1.2,
            is_active: true,
          },
        ],
        is_active: true,
      },
    ],
  },
};

export default function QuizPreview() {
  const [quizData, setQuizData] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);
  const [editing, setEditing] = useState({});
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    index: null,
  });
  const [draft, setDraft] = useState({});
  
  useEffect(() => {
    const localQuizData = JSON.parse(localStorage.getItem("quizData")) || {};

    const initialData = transformQuizData(localQuizData) || {};

    // Calculate total marks
    initialData.totalMarks = initialData?.sections?.reduce(
      (total, section) =>
        total +
        section?.questions?.reduce((sum, q) => sum + Number(q.score || 0), 0),
      0
    );
    setQuizData(initialData);
  }, []);

  const navigate = useNavigate();
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
          total +
          sec.questions.reduce((sum, q) => sum + Number(q.score || 0), 0),
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
          total +
          sec.questions.reduce((sum, q) => sum + Number(q.score || 0), 0),
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
        <IconButton onClick={() => navigate(-1)}>
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
          }}
        />
        {/* <IconButton
          onClick={() =>
            toggleSaveField("quizTitle", (newVal) => handleQuizTitleChange(newVal))
          }
        >
          {editing["quizTitle"] ? (
            <Check color="success" fontSize="small" />
          ) : (
            <EditOutlined fontSize="small" />
          )}
        </IconButton> */}

        {/* Right Container: Total Marks + Publish Button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
            Total Marks: {quizData?.totalMarks?.toFixed(0)}
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
              {quizData?.sections?.map((section, index) => (
                <Tab
                  key={index}
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      {editing[`section-${index}`] ? (
                        <TextField
                          value={draft[`section-${index}`] ?? section.name}
                          onChange={(e) =>
                            handleDraftChange(
                              `section-${index}`,
                              e.target.value
                            )
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
                            setEditing((prev) => ({
                              ...prev,
                              [`section-${index}`]: true,
                            }));
                          }}
                          sx={{ cursor: "pointer" }}
                        >
                          {section.name}
                        </Typography>
                      )}
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
            {quizData?.sections?.[selectedTab]?.questions?.map(
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
                            handleDraftChange(
                              `q-${selectedTab}-${questionIdx}`,
                              e.target.value
                            );
                          }
                        }}
                        sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                      />
                      <IconButton
                        onClick={() =>
                          toggleSaveField(
                            `q-${selectedTab}-${questionIdx}`,
                            (newVal) =>
                              updateQuestionField(
                                selectedTab,
                                questionIdx,
                                "question",
                                newVal
                              )
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
                        onClick={() =>
                          handleDeleteQuestion(selectedTab, questionIdx)
                        }
                        size="small"
                      >
                        <Delete color="error" fontSize="small" />
                      </IconButton>
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    {/* Options */}
                    {question?.options?.map((option, optIdx) => (
                      <Box
                        key={optIdx}
                        display="flex"
                        alignItems="center"
                        mb={1}
                        sx={{
                          backgroundColor:
                            question.correctAnswer === option
                              ? "#f1f8e9"
                              : "#fff",
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
                            editing[
                              `opt-${selectedTab}-${questionIdx}-${optIdx}`
                            ]
                              ? draft[
                                  `opt-${selectedTab}-${questionIdx}-${optIdx}`
                                ] ?? option
                              : option
                          }
                          onChange={(e) => {
                            if (
                              editing[
                                `opt-${selectedTab}-${questionIdx}-${optIdx}`
                              ]
                            ) {
                              handleDraftChange(
                                `opt-${selectedTab}-${questionIdx}-${optIdx}`,
                                e.target.value
                              );
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
                            toggleSaveField(
                              `opt-${selectedTab}-${questionIdx}-${optIdx}`,
                              (newVal) => {
                                const updatedOptions = [...question.options];
                                updatedOptions[optIdx] = newVal;
                                updateQuestionField(
                                  selectedTab,
                                  questionIdx,
                                  "options",
                                  updatedOptions
                                );
                              }
                            )
                          }
                          size="small"
                        >
                          {editing[
                            `opt-${selectedTab}-${questionIdx}-${optIdx}`
                          ] ? (
                            <Check color="success" fontSize="small" />
                          ) : (
                            <EditOutlined fontSize="small" />
                          )}
                        </IconButton>
                      </Box>
                    ))}

                    {/* Score */}
                    <Box display="flex" alignItems="center" mt={1}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          mr: 1,
                          fontSize: "0.9rem",
                          color: "#333",
                        }}
                      >
                        Score:
                      </Typography>
                      <TextField
                        type="number"
                        variant="outlined"
                        value={
                          editing[`score-${selectedTab}-${questionIdx}`]
                            ? draft[`score-${selectedTab}-${questionIdx}`] ??
                              question.score?.toFixed(1)
                            : question.score?.toFixed(1)
                        }
                        onChange={(e) => {
                          if (editing[`score-${selectedTab}-${questionIdx}`]) {
                            handleDraftChange(
                              `score-${selectedTab}-${questionIdx}`,
                              e.target.value
                            );
                          }
                        }}
                        sx={{
                          width: 100,
                          backgroundColor: "#fff",
                          borderRadius: 2,
                          fontSize: "0.9rem",
                        }}
                      />
                      <IconButton
                        onClick={() =>
                          toggleSaveField(
                            `score-${selectedTab}-${questionIdx}`,
                            (newVal) =>
                              updateQuestionField(
                                selectedTab,
                                questionIdx,
                                "score",
                                newVal
                              )
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
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, index: null })}
      >
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