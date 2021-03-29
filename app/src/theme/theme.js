import { lighten } from "polished";

export const Colors = {
  blue: "#2196f3",
  blueSecondary: "#1976d2",
  blueDark: "#1565c0",
  // menuListColor: "#64769c",
  menuListColor: lighten(0.4, "#000000"),
  light: "#ffffff",
  grey: "#808080",
  // textColor: "#64769c",
  textColor: "#777",
  buttonError: "#ff0033",
  greyLight: "#e0e0e0",
  disabled: "hsl(212.3, 16.7%, 69.4%)",
  error: "hsl(359.6, 82.1%, 62.7%)",
  errorActive: "hsl(359.6, 82.1%, 42.7%)",
  errorHover: "hsl(359.6, 82.1%, 65%)",
  primaryActive: "hsl(209.6, 100%, 35.9%)",
  primaryHover: "hsl(209.6, 100%, 65%)",
  secondary: "hsl(29.4, 100%, 63.1%)",
  secondaryActive: "hsl(29.4, 100%, 43.1%)",
  secondaryHover: "hsl(29.4, 100%, 65%)",
  success: "hsl(164, 75.6%, 46.7%)",
  successActive: "hsl(164, 75.6%, 26.7%)",
  successHover: "hsl(164, 75.6%, 60%)",
};
export const Fonts = {
  primary: "'Lato',sans serif",
  form: "'Roboto',sans serif",
  SubmitButton: "12px",
  resizeLabel: "12px",
  font: "12px",
  style: {
    light: 400,
    bold: 500,
    bolder: 600,
  },
};

export const sizes = {
  xs: "10px",
  sm: "12px",
  base: "16px",
  lg: "18px",
  xl: "20px",
  xxl: "24px",
  xxxl: "30px",
  xxxxl: "36px",
};
