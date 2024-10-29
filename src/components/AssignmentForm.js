// src/components/AssignmentForm.js
import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, Box, InputAdornment } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const AssignmentForm = ({ handleFormSubmit, editData }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const dateInputRef = useRef(null); // Reference to the date input

  useEffect(() => {
    if (editData.title || editData.dueDate) {
      setTitle(editData.title);
      setDueDate(editData.dueDate);
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && dueDate) {
      handleFormSubmit(title, dueDate);
      setTitle("");
      setDueDate("");
    }
  };

  // Function to focus the date input when the icon is clicked
  const handleIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.focus();
      dateInputRef.current.showPicker();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginTop: "1rem",
      }}
    >
      <TextField
        label="Assignment Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        InputLabelProps={{
          style: { color: "#ffffff" },
        }}
        InputProps={{
          style: { color: "#ffffff" },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#ffffff" },
            "&:hover fieldset": { borderColor: "#ffffff" },
            "&.Mui-focused fieldset": { borderColor: "#ffffff" },
          },
        }}
      />

      <TextField
        label="Due Date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        inputRef={dateInputRef}
        InputLabelProps={{
          style: { color: "#ffffff" },
          shrink: true,
        }}
        InputProps={{
          style: { color: "#ffffff" },
          endAdornment: (
            <InputAdornment position="end">
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  padding: "4px",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={handleIconClick}
              >
                <CalendarTodayIcon style={{ color: "#3a3a3a" }} />
              </Box>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#ffffff" },
            "&:hover fieldset": { borderColor: "#ffffff" },
            "&.Mui-focused fieldset": { borderColor: "#ffffff" },
          },
          '& input[type="date"]::-webkit-calendar-picker-indicator': {
            display: "none",
          },
        }}
      />

      <Button type="submit" variant="contained" color="primary">
        {editData.title ? "Update Assignment" : "Add Assignment"}
      </Button>
    </Box>
  );
};

export default AssignmentForm;
