// src/components/AssignmentList.js

// Importing React and Material UI components
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Button,
} from "@mui/material";

// Calculate time left as % of max 14 days
const calculateProgress = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const totalDays = (due - today) / (1000 * 60 * 60 * 24); // days left
  const percentage = Math.max(0, Math.min((totalDays / 14) * 100, 100));
  return Math.round(percentage);
};

// Calculate days left until due date
const calculateDaysLeft = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const daysLeft = Math.ceil((due - today) / (1000 * 60 * 60 * 24)); // round up
  return daysLeft > 0 ? daysLeft : 0; // 0 if past due
};

const AssignmentList = ({ assignments, onEdit, onDelete }) => {
  // Sort assignments by earliest due date
  const sortedAssignments = [...assignments].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        Upcoming Assignments
      </Typography>
      {sortedAssignments.map((assignment) => (
        <Card
          key={assignment.id} // Use ID as key
          variant="outlined"
          sx={{ marginBottom: "1rem", backgroundColor: "#f4f6f8" }}
        >
          <CardContent>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {assignment.title}
            </Typography>
            <Typography color="textSecondary">
              Due on {assignment.dueDate}
            </Typography>
            <Typography color="textSecondary" sx={{ marginBottom: 2 }}>
              {calculateDaysLeft(assignment.dueDate)} days left
            </Typography>
            {/* Days left as a progress bar */}
            <Box sx={{ width: "100%", marginBottom: 1 }}>
              <LinearProgress
                variant="determinate"
                value={calculateProgress(assignment.dueDate)}
              />
            </Box>
            {/* Edit and Delete buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => onEdit(assignment.id)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => onDelete(assignment.id)}
              >
                Delete
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default AssignmentList;
