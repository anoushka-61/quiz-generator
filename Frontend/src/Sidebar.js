import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  TextField,
  InputAdornment,
  Avatar,
  Typography,
  IconButton
} from "@mui/material";
import {
  Search,
  Assignment,
  FormatListBulleted,
  ChevronRight,
  ChevronLeft
} from "@mui/icons-material";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
    "Previous 30 Days": ["Next.js API and Context"]
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen ? 280 : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebarOpen ? 280 : 60,
          backgroundColor: "#F8F9FB",
          borderRight: "1px solid #E0E0E0",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: sidebarOpen ? "initial" : "center",
          transition: "width 0.3s ease-in-out"
        }
      }}
    >
      {/* Profile & Toggle Button */}
      <Box display="flex" alignItems="center" gap={sidebarOpen ? 2 : 0} mb={2} p={1}>
        <Avatar sx={{ bgcolor: "#DA2128", width: 40, height: 40 }}>K</Avatar>
        {sidebarOpen && (
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Kevin Dukkon
            </Typography>
            <Typography variant="body2" color="gray">
              hey@kevdu.co
            </Typography>
          </Box>
        )}
        <IconButton onClick={toggleSidebar} sx={{ ml: "auto" }}>
          {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>

      {/* Quiz List Section */}
      <ListItem
        button
        sx={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          mb: 2,
          justifyContent: sidebarOpen ? "flex-start" : "center"
        }}
      >
       {sidebarOpen && <Assignment sx={{ mr: sidebarOpen ? 2 : 0, color: "#007BFF" }} />}
        {sidebarOpen && (
          <ListItemText
            primary="Quiz List"
            primaryTypographyProps={{ fontWeight: "bold" }}
          />
        )}
      </ListItem>

      {/* Search Box */}
      {sidebarOpen && (
        <TextField
          fullWidth
          placeholder="Search"
          variant="outlined"
          size="small"
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#fff"
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
      )}

      {/* Sidebar List */}
      <List>
        {Object.entries(items).map(([section, notes], index) => (
          <Box key={index}>
            {sidebarOpen && (
              <ListSubheader sx={{ fontSize: "0.85rem", color: "#888", mt: 2 }}>
                {section}
              </ListSubheader>
            )}
            {notes.map((note, idx) => (
              <ListItem
                key={idx}
                button
                sx={{
                  pl: sidebarOpen ? 2 : 1,
                  borderRadius: "12px",
                  justifyContent: sidebarOpen ? "flex-start" : "center"
                }}
              >
                {sidebarOpen &&<FormatListBulleted sx={{ mr: sidebarOpen ? 2 : 0, color: "#007BFF" }} />}
                {sidebarOpen && <ListItemText primary={note} />}
              </ListItem>
            ))}
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
