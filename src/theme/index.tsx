import { createTheme } from "@mui/material/styles";

// Define your theme
const theme = createTheme({
  palette: {
    // primary: {
    //   main: "#1976d2", // Customize your primary color
    // },
    // secondary: {
    //   main: "#dc004e", // Customize your secondary color
    // },
    // background: {
    //   default: "#f5f5f5", // Default background color
    //   paper: "#ffffff", // Paper background color
    // },
    // text: {
    //   primary: "#333333", // Primary text color
    //   secondary: "#666666", // Secondary text color
    // },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
  //   typography: {
  //     fontFamily: "Arial, sans-serif", // Set the default font family
  //     h1: {
  //       fontSize: "2rem",
  //       fontWeight: 700,
  //     },
  //     body1: {
  //       fontSize: "1rem",
  //     },
  //   },
});

export default theme;
