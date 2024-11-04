import { createTheme } from "@mui/material";
import { alpha } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const navigationTheme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#3f51b5",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          marginLeft: "16px",
        },
      },
    },
  },
});

export const loginTheme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          paddingBottom: "8px",
          paddingTop: "8px",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          fontSize: "0.9em",
        },
      },
    },
  },
});

export const productFormTheme = createTheme({
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          fontSize: "0.9em",
        },
      },
    },
  },
});

export const navigationStyles = makeStyles((theme) => ({
  appBarBoxStyle: { flexGrow: 1 },
  toolBarStyle: { gap: "16px" },
  searchFieldStyle: {
    width: "50ch",
    backgroundColor: alpha("#fff", 0.15),
    "& .MuiInputBase-input": {
      padding: "8px 8px 8px 0px",
      color: "white",
      "&:hover": {
        borderColor: "transparent !important",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
  },
  searchIconStyle: { color: "white" }
}));
