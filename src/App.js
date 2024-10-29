// src/App.js
// I would give credit to the LLM entirely, because it generated most of the code

// Importing needed libraraies and components
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

// Main App component
function App() {
  // states for keeping assignments, quotes, reminders, and edit details
  const [assignments, setAssignments] = useState([]);
  const [quote, setQuote] = useState(null);
  const [showReminder, setShowReminder] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({
    id: null,
    title: "",
    dueDate: "",
  });

  // effect for loading quote and checking reminders when assignments change
  useEffect(() => {
    fetchQuote(); // get the quote
    checkReminders(); // check for assignments due soon
  }, [assignments]); // re-run when assignments updates

  // Fetch a random quote from Zen Quotes API
  const fetchQuote = async () => {
    try {
      // API request to Zen Quotes
      const response = await fetch(
        "https://api.allorigins.win/get?url=" +
          encodeURIComponent("https://zenquotes.io/api/random")
      );

      // check if response is ok
      if (response.ok) {
        const jsonResponse = await response.json();
        const data = JSON.parse(jsonResponse.contents);
        setQuote(data[0]); // set quote from API data
      } else {
        console.error("Failed to fetch quote", response.status);
      }
    } catch (error) {
      console.error("Error fetching quote:", error); // if request fails
    }
  };

  // Check if any assignments are due within next 24 hrs
  const checkReminders = () => {
    const now = new Date(); // Current time
    const hasUpcoming = assignments.some((assignment) => {
      const due = new Date(assignment.dueDate); // due date of assignment
      // If due within 24 hours, return true
      return (due - now) / (1000 * 60 * 60) <= 24;
    });
    setShowReminder(hasUpcoming); // set reminder if something due soon
  };

  // Add a new assignment if no duplicate title is found
  const addAssignment = (title, dueDate) => {
    // check if title exists in assignments
    const duplicate = assignments.some(
      (assignment) => assignment.title.toLowerCase() === title.toLowerCase()
    );

    if (duplicate) {
      // If duplicate, show alert and stop here
      alert("An assignment with this name already exists.");
      return;
    }

    // Add the assignment with unique ID if no duplicate
    setAssignments([...assignments, { id: uuidv4(), title, dueDate }]);
  };

  // Update an existing assignment’s details
  const updateAssignment = (id, title, dueDate) => {
    const updatedAssignments = assignments.map((assignment) =>
      // Find the assignment to update by matching ID
      assignment.id === id ? { ...assignment, title, dueDate } : assignment
    );
    setAssignments(updatedAssignments); // save updated list
    setEditingIndex(null); // Reset edit state
    setEditData({ id: null, title: "", dueDate: "" }); // Clear edit data
  };

  // Load assignment data into editData for editing
  const handleEdit = (id) => {
    // Find assignment by its ID
    const assignment = assignments.find((assignment) => assignment.id === id);

    if (assignment) {
      // if found, set editing mode and load data
      setEditingIndex(id);
      setEditData({
        id: assignment.id,
        title: assignment.title,
        dueDate: assignment.dueDate,
      });
    } else {
      console.error("Assignment not found for editing."); // log if not found
    }
  };

  // Delete an assignment by ID
  const handleDelete = (id) => {
    // Remove assignment with matching ID
    setAssignments(assignments.filter((assignment) => assignment.id !== id));
    if (editingIndex === id) setEditingIndex(null); // clear edit state if needed
  };

  // Handle form submission to add or update assignment
  const handleFormSubmit = (title, dueDate) => {
    if (editingIndex !== null) {
      updateAssignment(editingIndex, title, dueDate); // update if editing
    } else {
      addAssignment(title, dueDate); // add new if not editing
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
            {/* Display the quote */}
            <QuoteDisplay quote={quote} />
            {/* Form for adding or editing assignments */}
            <AssignmentForm
              handleFormSubmit={handleFormSubmit}
              editData={editData}
            />
            {/* List all assignments with edit and delete options */}
            <AssignmentList
              assignments={assignments}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            {/* Reminder alert for upcoming assignments */}
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
