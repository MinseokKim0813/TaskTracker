// src/components/AssignmentForm.js
// I would give credit to the LLM entirely; I only modified the generated code

// Importing needed stuff from React and Materal UI
import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, Box, InputAdornment } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

// Form component for adding or editing assignments
const AssignmentForm = ({ handleFormSubmit, editData }) => {
  // States for assignment title and due date
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const dateInputRef = useRef(null); // ref for date input field

  // Effect to load existing data into form if we’re editing something
  useEffect(() => {
    if (editData.title || editData.dueDate) {
      setTitle(editData.title); // load title if there’s data to edit
      setDueDate(editData.dueDate); // load due date too if editing
    }
  }, [editData]); // runs again if editData changes

  // Handle form submit to either add or update an assignment
  const handleSubmit = (e) => {
    e.preventDefault(); // stop page reload on submit
    if (title && dueDate) {
      // make sure both fields are filled
      handleFormSubmit(title, dueDate); // send the form data up to parent
      setTitle(""); // clear form title after submitting
      setDueDate(""); // reset date too after submit
    }
  };

  // Opens date picker when calendar icon is clicked
  const handleIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.focus(); // focus on date input
      dateInputRef.current.showPicker(); // opens date picker if browser supports
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit} // submits the form
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginTop: "1rem",
      }}
    >
      {/* Input field for assignment title */}
      <TextField
        label="Assignment Title"
        value={title} // controls the title input
        onChange={(e) => setTitle(e.target.value)} // updates title state when typing
        required
        InputLabelProps={{
          style: { color: "#ffffff" }, // makes label white
        }}
        InputProps={{
          style: { color: "#ffffff" }, // makes text white
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#ffffff" }, // white border
            "&:hover fieldset": { borderColor: "#ffffff" },
            "&.Mui-focused fieldset": { borderColor: "#ffffff" },
          },
        }}
      />

      {/* Input field for assignment due date */}
      <TextField
        label="Due Date"
        type="date" // sets input type to date
        value={dueDate} // controls the date input
        onChange={(e) => setDueDate(e.target.value)} // updates due date state when typing
        required
        inputRef={dateInputRef} // ref for date input, so picker can be opened
        InputLabelProps={{
          style: { color: "#ffffff" },
          shrink: true, // keeps label up when date is set
        }}
        InputProps={{
          style: { color: "#ffffff" }, // makes text white
          endAdornment: (
            <InputAdornment position="end">
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  padding: "4px", // padding around icon
                  borderRadius: "4px", // rounded corners for icon box
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer", // cursor pointer when hovering over icon
                }}
                onClick={handleIconClick} // opens date picker when clicked
              >
                <CalendarTodayIcon style={{ color: "#3a3a3a" }} />
              </Box>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#ffffff" }, // white border for input
            "&:hover fieldset": { borderColor: "#ffffff" },
            "&.Mui-focused fieldset": { borderColor: "#ffffff" },
          },
          '& input[type="date"]::-webkit-calendar-picker-indicator': {
            display: "none", // hides default date picker icon
          },
        }}
      />

      {/* Button to submit the form, says Update or Add based on editing mode */}
      <Button type="submit" variant="contained" color="primary">
        {editData.title ? "Update Assignment" : "Add Assignment"}
      </Button>
    </Box>
  );
};

export default AssignmentForm;
