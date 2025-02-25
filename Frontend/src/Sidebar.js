import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Tooltip
} from "@mui/material";
import { Menu, ChevronLeft, ChevronRight } from "@mui/icons-material";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const items = {
    "Today": [
      "Persisting Score on Select",
      "Pause SCORM event handling",
      "Leave Request for Family"
    ],
    "Previous 7 Days": [
      "Push repo to GitHub",
      "SCORM API Integration",
      "File Upload Handling",
      "SCORM Preview in React"
    ],
    "Previous 30 Days": [
      "Next.js API and Context"
    ]
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen ? 280 : 90,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebarOpen ? 280 : 90,
          transition: "width 0.3s",
          overflowX: "hidden",
          bgcolor: "#121212",
          color: "#fff",
          boxShadow: "2px 0px 10px rgba(0,0,0,0.1)"
        }
      }}
    >
      {/* Sidebar Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
        {sidebarOpen && (
          <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Quiz List
          </Typography>
        )}
        <Tooltip title={sidebarOpen ? "Collapse" : "Expand"}>
          <IconButton onClick={toggleSidebar} sx={{ color: "white" }}>
            {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Sidebar Content */}
      <List>
        {Object.entries(items).map(([section, notes], index) => (
          <Box key={index} sx={{ mb: 2 }}>
            {/* Section Title */}
            {sidebarOpen && (
              <Typography
                variant="body2"
                sx={{
                  pl: 3,
                  color: "#aaa",
                  mt: 2,
                  mb: 1,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  fontSize: "0.85rem"
                }}
              >
                {section}
              </Typography>
            )}
            {/* Section Items */}
            {notes.map((note, idx) => (
              <ListItem
                key={idx}
                button
                sx={{
                  pl: sidebarOpen ? 3 : 2,
                  py: 1.2,
                  "&:hover": { bgcolor: "#222" },
                  transition: "all 0.3s",
                  borderRadius: "6px",
                  mx: 1
                }}
              >
                <ListItemText
                  primary={note}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: "0.95rem",
                      fontWeight: "500",
                      color: "#ddd",
                      letterSpacing: "0.5px",
                    }
                  }}
                  sx={{
                    display: sidebarOpen ? "block" : "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                />
              </ListItem>
            ))}
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
