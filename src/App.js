// src/App.js
// I would give credit to the LLM entirely; I only modified the generated code little bit

// Importing needed libraries and components
import React, { useState, useEffect, useRef } from "react";
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
import {
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "./firebase";

// Main App component
function App() {
  const [assignments, setAssignments] = useState([]);
  const [quote, setQuote] = useState(null);
  const [showReminder, setShowReminder] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [requestCount, setRequestCount] = useState(0); // for rate limiting
  const intervalRef = useRef(null); // Reference for interval to reset it

  const [editData, setEditData] = useState({
    id: null,
    title: "",
    dueDate: "",
  });

  useEffect(() => {
    checkReminders(); // check for assignments due soon
    fetchAssignments(); // Load assignments when app loads
    fetchQuote(); // Fetch initial quote immediately on start
    startAutoQuoteInterval(); // Start interval for fetching quotes every 30 seconds

    return () => {
      clearInterval(intervalRef.current); // Clean up on unmount
    };
  }, []);

  // Start or reset the auto quote interval
  const startAutoQuoteInterval = () => {
    clearInterval(intervalRef.current); // Clear existing interval
    intervalRef.current = setInterval(() => {
      fetchQuote(); // Fetch a new quote
      setRequestCount(0); // Reset request count every 30 seconds
    }, 30000); // 30 seconds
  };

  // Fetch assignments from Firestore
  const fetchAssignments = async () => {
    const querySnapshot = await getDocs(collection(db, "assignments"));
    const assignmentsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAssignments(assignmentsData);
  };

  // Fetch a random quote from Zen Quotes API with rate limiting
  const fetchQuote = async () => {
    if (requestCount < 5) {
      // Check if within rate limit
      try {
        const response = await fetch(
          "https://api.allorigins.win/get?url=" +
            encodeURIComponent("https://zenquotes.io/api/random")
        );
        if (response.ok) {
          const jsonResponse = await response.json();
          const data = JSON.parse(jsonResponse.contents);
          setQuote(data[0]);
          setRequestCount((prevCount) => prevCount + 1); // Increment request count
          startAutoQuoteInterval(); // Reset interval when manually fetching
        } else {
          console.error("Failed to fetch quote", response.status);
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    } else {
      console.log("API limit reached. Try again after 30 seconds.");
    }
  };

  // Check if any assignments are due within the next 24 hours
  const checkReminders = () => {
    const now = new Date();
    const hasUpcoming = assignments.some((assignment) => {
      const due = new Date(assignment.dueDate);
      return (due - now) / (1000 * 60 * 60) <= 24;
    });
    setShowReminder(hasUpcoming);
  };

  // Add a new assignment to Firestore
  const addAssignment = async (title, dueDate) => {
    const duplicate = assignments.some(
      (assignment) => assignment.title.toLowerCase() === title.toLowerCase()
    );
    if (duplicate) {
      alert("An assignment with this name already exists.");
      return;
    }
    const newAssignment = { title, dueDate };
    const docRef = await addDoc(collection(db, "assignments"), newAssignment);
    setAssignments([...assignments, { id: docRef.id, ...newAssignment }]);
  };

  // Update Firestore when editing
  const updateAssignment = async (id, title, dueDate) => {
    const assignmentDoc = doc(db, "assignments", id);
    await updateDoc(assignmentDoc, { title, dueDate });
    fetchAssignments(); // Refresh after updating
    setEditingIndex(null); // Reset to switch back to "Add Assignment" mode
  };

  // Load assignment data into editData for editing
  const handleEdit = (id) => {
    const assignment = assignments.find((assignment) => assignment.id === id);
    if (assignment) {
      setEditingIndex(id);
      setEditData({
        id: assignment.id,
        title: assignment.title,
        dueDate: assignment.dueDate,
      });
    } else {
      console.error("Assignment not found for editing.");
    }
  };

  // Delete an assignment from Firestore
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "assignments", id));
    fetchAssignments();
  };

  // Handle form submission to add or update assignment
  const handleFormSubmit = (title, dueDate) => {
    if (editingIndex !== null) {
      updateAssignment(editingIndex, title, dueDate);
      setEditingIndex(null); // Reset editing index
      setEditData({ id: null, title: "", dueDate: "" }); // Reset editData to clear form
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
            {/* Display the quote with click handler */}
            <div onClick={fetchQuote} style={{ cursor: "pointer" }}>
              <QuoteDisplay quote={quote} />
            </div>
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
