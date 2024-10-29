// src/components/QuoteDisplay.js
import React from "react";
import { Box, Typography } from "@mui/material";

const QuoteDisplay = ({ quote }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#222222", // Black background for the quote container
        color: "#ffffff", // White text color for readability
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "1.5rem",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // Subtle shadow for effect
      }}
    >
      {quote ? (
        <>
          <Typography variant="h6" align="center">
            "{quote.q}"
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ fontStyle: "italic", marginTop: "0.5rem" }}
          >
            - {quote.a}
          </Typography>
        </>
      ) : (
        <Typography variant="h6" align="center">
          Loading quote...
        </Typography>
      )}
    </Box>
  );
};

export default QuoteDisplay;
