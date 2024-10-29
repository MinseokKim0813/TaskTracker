// src/components/QuoteDisplay.js
// I would give credit to the LLM entirely, because it generated most of the code

// Importing React and Material UI components
import React from "react";
import { Box, Typography } from "@mui/material";

const QuoteDisplay = ({ quote }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#222222", // Dark background for quote box
        color: "#ffffff", // White text for good contrast
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "1.5rem",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // Soft shadow
      }}
    >
      {quote ? (
        <>
          {/* Display quote text */}
          <Typography variant="h6" align="center">
            "{quote.q}"
          </Typography>
          {/* Display quote author */}
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ fontStyle: "italic", marginTop: "0.5rem" }}
          >
            - {quote.a}
          </Typography>
        </>
      ) : (
        // Placeholder text while quote loads
        <Typography variant="h6" align="center">
          Loading quote...
        </Typography>
      )}
    </Box>
  );
};

export default QuoteDisplay;
