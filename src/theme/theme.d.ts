import "@mui/material/styles/createPalette";
import "@mui/material/styles/createTypography";

import "@mui/material/styles";

import {
  TypographyOptions,
  TypographyStyleOptions,
} from "@mui/material/styles";

interface customColors {
  custom: {
    lightBlue: string;
  };
}

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    custom;
  }

  interface PaletteOptions {
    custom;
  }
}
