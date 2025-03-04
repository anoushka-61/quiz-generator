import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Typography } from "@mui/material";
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
  const { transformedData, openQuestionPanel,currentQuestionId, setOpenQuestionPanel, onRandomQuestionSelect ,currentSectionId} = props;
    console.log(transformedData)
  const [expandedIndex, setExpandedIndex] = useState(currentSectionId);

  // Handle drawer close
  const handleDrawerClose = () => setOpenQuestionPanel(false);

  // Handle section expand/collapse
  const toggleQuestionsVisibility = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // Collapse if clicked again
    } else {
      setExpandedIndex(index); // Expand the clicked section
    }
  };

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
            padding: "4px",
            marginTop: "106px",
            boxShadow: "0 4px 3px 0 #e7e8f8",
            border: "1px solid #e7e8f8",
          },
        }}
        variant="persistent"
        anchor="right"
        open={openQuestionPanel}
      >
        {/* Header */}
        <DrawerHeader>
          <Typography variant="h6">Questions</Typography>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* Mapping Dynamic Sections */}
        {transformedData?.sections?.map((section, sectionIndex) => (
          <Box key={section.sectionId} sx={{ border: "1px solid var(--light-purple-background)", backgroundColor: "#fcfcff", marginBottom: "10px" }}>
            {/* Section Header */}
            <DrawerHeader onClick={() => toggleQuestionsVisibility(sectionIndex)} sx={{ cursor: "pointer", padding: "12px" }}>
              <Typography variant="p" fontSize={"16px"} textAlign={"left"}>{section.sectionTitle}</Typography>
              <ExpandMoreIcon sx={{ transform: expandedIndex === sectionIndex ? "rotate(180deg)" : "rotate(0deg)" }} />
            </DrawerHeader>

            {/* Questions List */}
            {(expandedIndex === sectionIndex ) && (
              <>
                <Divider />
                <Accordion expanded sx={{ boxShadow: "none", background: "transparent" }}>
                  <AccordionDetails sx={{ padding: "8px" }}>
                    <Box sx={{display: "grid",
                           gridTemplateColumns:"repeat(4,1fr)",
                            gap:"2",}} >
                      {section.questions.map((question, index) => (
                        <Box
                          key={question.questionId}
                          padding="8px"
                          onClick={() => onRandomQuestionSelect(question)}
                          sx={{
                            cursor: "pointer",
                            textAlign: "left",
                            border:question.questionId === currentQuestionId ? "2px solid #6439BF" : "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "12px",
                            backgroundColor: question.questionId === currentQuestionId ? "#f0e9ff" : "#fff",
                            width: "fit-content",
                            display: "flex",
                            flexDirection:"row",

                            marginTop: "10px",
                            "&:hover": { backgroundColor: "#f9f9f9" },
                          }}
                        >
                          <Typography variant="body1" fontWeight="bold" sx={{display:"flex",flexDirection:"row"}}>
                            <Typography>Q </Typography><Typography>{(sectionIndex*10)+(index + 1)}</Typography>
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