import { createTheme } from "@mui/material/styles";

const COLORS = {
  LIGHT_BLUE: "#3bafd8",
  WHITE: "#FFF",
  BLACK: "#222",
  PRIMARY: "#1a4f8a",
};

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY,
    },
    common: {
      white: COLORS.WHITE,
      black: COLORS.BLACK,
    },
    custom: {
      lightBlue: COLORS.LIGHT_BLUE,
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
