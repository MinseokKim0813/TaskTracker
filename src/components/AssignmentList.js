// src/components/AssignmentList.js
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Button,
} from "@mui/material";

const calculateProgress = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const totalDays = (due - today) / (1000 * 60 * 60 * 24);
  const percentage = Math.max(0, Math.min((1 - totalDays / 30) * 100, 100));
  return Math.round(percentage);
};

const AssignmentList = ({ assignments, onEdit, onDelete }) => {
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
          key={assignment.id} // Use the unique ID as the key
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
            <Typography color="textSecondary" sx={{ marginBottom: 2 }}>
              Due on {assignment.dueDate}
            </Typography>
            <Box sx={{ width: "100%", marginBottom: 1 }}>
              <LinearProgress
                variant="determinate"
                value={calculateProgress(assignment.dueDate)}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => onEdit(assignment.id)} // Pass the id instead of the title
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => onDelete(assignment.id)} // Pass the id for deletion
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
