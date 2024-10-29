// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Original primary color
    },
    secondary: {
      main: "#ff4081", // Original secondary color
    },
    background: {
      default: "#fafafa", // Light background color
      paper: "#ffffff", // Default paper color for cards
    },
    text: {
      primary: "#000000", // Default dark text color for readability
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontWeight: 700,
    },
  },
});

export default theme;
