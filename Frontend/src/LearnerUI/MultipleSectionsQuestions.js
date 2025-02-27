import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Typography, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

const MultipleSectionsQuestions = (props) => {
  const theme = useTheme();
  const { openQuestionPanel, setOpenQuestionPanel, onRandomQuestionSelect } = props;

  const [expandedIndex, setExpandedIndex] = useState(null);

  const response = {
    sections: [
      {
        sectionId: 1,
        sectionTitle: "Mathematics",
        questions: [
          {
            questionId: 101,
            questionText: "What is the square root of 144?",
            marks: 2,
            options: [
              { optionId: "a", text: "10", isCorrect: false },
              { optionId: "b", text: "12", isCorrect: true },
              { optionId: "c", text: "14", isCorrect: false },
              { optionId: "d", text: "16", isCorrect: false },
            ],
          },
          {
            questionId: 102,
            questionText: "Solve: 15 + 6 × 2",
            marks: 3,
            options: [
              { optionId: "a", text: "21", isCorrect: false },
              { optionId: "b", text: "27", isCorrect: false },
              { optionId: "c", text: "33", isCorrect: false },
              { optionId: "d", text: "27", isCorrect: true },
            ],
          },
        ],
      },
      {
        sectionId: 2,
        sectionTitle: "Science",
        questions: [
          {
            questionId: 201,
            questionText: "What is the chemical symbol for water?",
            marks: 1,
            options: [
              { optionId: "a", text: "H2O", isCorrect: true },
              { optionId: "b", text: "CO2", isCorrect: false },
              { optionId: "c", text: "O2", isCorrect: false },
              { optionId: "d", text: "NaCl", isCorrect: false },
            ],
          },
        ],
      },
    ],
  };

  const handleDrawerClose = () => setOpenQuestionPanel(false);
  const toggleQuestionsVisibility = (index) => setExpandedIndex(expandedIndex === index ? null : index);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            marginTop: "0px",
            borderTopLeftRadius: "12px",
            borderBottomLeftRadius: "12px",
            height: "100%",
            background: "#fff",
            borderLeft: "none",
            borderRight: "none",
            padding: "8px",
            marginTop:"94px",
            boxShadow:"0 4px 3px 0 #e7e8f8",
            border:"1px solid #e7e8f8",
          },
        }}
        variant="persistent"
        anchor="right"
        open={openQuestionPanel}
      >
        <DrawerHeader>
          <Typography variant="h6">Questions</Typography>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />

        {response.sections.map((section, sectionIndex) => (
          <Box key={section.sectionId} sx={{ border: "1px solid var(--light-purple-background)", backgroundColor: "#fcfcff", marginBottom: "10px" }}>
            <DrawerHeader onClick={() => toggleQuestionsVisibility(sectionIndex)} sx={{ cursor: "pointer", padding: "12px" }}>
              <Typography variant="h6">{section.sectionTitle}</Typography>
              <ExpandMoreIcon sx={{ transform: expandedIndex === sectionIndex ? "rotate(180deg)" : "rotate(0deg)" }} />
            </DrawerHeader>

            {expandedIndex === sectionIndex && (
              <>
                <Divider />
                <Accordion expanded sx={{ boxShadow: "none", background: "transparent" }}>
                  <AccordionDetails sx={{ padding: "8px" }}>
                    <Box display="flex" flexDirection="row" gap={2} maxHeight="220px">
                      {section.questions.map((question,index) => (
                        <Box
                          key={question.questionId}
                          padding="8px"
                          sx={{
                            cursor: "pointer",
                            textAlign: "left",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "12px",
                            backgroundColor: "#fff",
                            width: "fit-content",
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            "&:hover": { backgroundColor: "#f9f9f9" },
                          }}
                        >
                          <Typography variant="body1" fontWeight="bold">
                           Q {index+1}
                          </Typography>
                          
                        </Box>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </>
            )}
          </Box>
        ))}
      </Drawer>
    </Box>
  );
};

export default MultipleSectionsQuestions;
