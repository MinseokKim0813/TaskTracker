// src/App.js
import React, { useState, useEffect } from "react";
import { Container, Typography, Snackbar, Alert, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import theme from "./theme";
import AssignmentForm from "./components/AssignmentForm";
import AssignmentList from "./components/AssignmentList";
import QuoteDisplay from "./components/QuoteDisplay";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [assignments, setAssignments] = useState([]);
  const [quote, setQuote] = useState(null);
  const [showReminder, setShowReminder] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({
    id: null,
    title: "",
    dueDate: "",
  });

  useEffect(() => {
    fetchQuote();
    checkReminders();
  }, [assignments]);

  const fetchQuote = async () => {
    try {
      const response = await fetch(
        "https://api.allorigins.win/get?url=" +
          encodeURIComponent("https://zenquotes.io/api/random")
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        const data = JSON.parse(jsonResponse.contents);
        setQuote(data[0]);
      } else {
        console.error("Failed to fetch quote", response.status);
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  const checkReminders = () => {
    const now = new Date();
    const hasUpcoming = assignments.some((assignment) => {
      const due = new Date(assignment.dueDate);
      return (due - now) / (1000 * 60 * 60) <= 24;
    });
    setShowReminder(hasUpcoming);
  };

  const addAssignment = (title, dueDate) => {
    const duplicate = assignments.some(
      (assignment) => assignment.title.toLowerCase() === title.toLowerCase()
    );

    if (duplicate) {
      alert(
        "An assignment with this name already exists. Please use a different name."
      );
      return;
    }

    setAssignments([...assignments, { id: uuidv4(), title, dueDate }]);
  };

  const updateAssignment = (id, title, dueDate) => {
    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === id ? { ...assignment, title, dueDate } : assignment
    );
    setAssignments(updatedAssignments);
    setEditingIndex(null);
    setEditData({ id: null, title: "", dueDate: "" });
  };

  const handleEdit = (id) => {
    const assignment = assignments.find((assignment) => assignment.id === id);

    if (assignment) {
      setEditingIndex(id); // Use id for editing reference
      setEditData({
        id: assignment.id,
        title: assignment.title,
        dueDate: assignment.dueDate,
      });
    } else {
      console.error("Assignment not found for editing.");
    }
  };

  const handleDelete = (id) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id));
    if (editingIndex === id) setEditingIndex(null); // Clear edit if deleted
  };

  const handleFormSubmit = (title, dueDate) => {
    if (editingIndex !== null) {
      updateAssignment(editingIndex, title, dueDate);
    } else {
      addAssignment(title, dueDate);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#2a2a2a",
            padding: "20px",
          }}
        >
          <Container
            maxWidth="lg"
            style={{
              padding: "3rem",
              backgroundColor: "#3a3a3a",
              borderRadius: "8px",
              color: "#ffffff",
            }}
          >
            <Typography variant="h2" align="center" gutterBottom>
              Assignment Tracker
            </Typography>
            <QuoteDisplay quote={quote} />
            <AssignmentForm
              handleFormSubmit={handleFormSubmit}
              editData={editData}
            />
            <AssignmentList
              assignments={assignments}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <Snackbar
              open={showReminder}
              onClose={() => setShowReminder(false)}
            >
              <Alert severity="warning" onClose={() => setShowReminder(false)}>
                You have assignments due within the next 24 hours!
              </Alert>
            </Snackbar>
          </Container>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
