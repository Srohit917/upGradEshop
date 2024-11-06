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

export const navigationStyles = makeStyles(() => ({
  appBarBoxStyle: { flexGrow: 1 },
  toolBarStyle: { gap: "16px" },
  searchFieldStyle: {
    width: "50ch",
    backgroundColor: alpha("#fff", 0.15),
    borderRadius: "5px",
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
  searchIconStyle: { color: "white" },
}));

export const loginStyles = makeStyles(() => ({
  lockIconStyle: {
    borderRadius: "50%",
    backgroundColor: "#F33A6A",
    padding: "12px",
    color: "white",
  },
  textFieldStyle: {
    width: "100%",
  },
  footerStyle: {
    color: "lightslategrey",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
}));

export const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

export const addressStyles = makeStyles({
  labelStyle: {
    width: "40%",
    fontSize: "medium !important",
    color: "black !important",
  },
});

export const orderStyles = makeStyles({
  stepperContainer: {
    margin: "4% 12% 2% 12%"
  },
  backButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: "16px",
    marginBottom: "4%",
  },
  stepperLabelStyle: { pointerEvents: "none" },
  cardStyle: {
    display: "flex",
    margin: "2% 12% 2% 12%"
  },
  productDetailContainer: { display: "flex", flexDirection: "column", flex: 1 },
  cardContentStyle: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: "48px 24px !important"
  },
  prodDescStyle: { color: "text.secondary", fontStyle: "italic" },
  addressContainer: {
    display: "flex",
    flexDirection: "column",
    borderLeft: "1.5px solid lightgrey",
    flex: 0.5,
  },
  addressCardStyle: { display: "flex", flexDirection: "column", gap: 6, padding: "48px 24px !important" },
});

export const productStyles = makeStyles({
  footerStyle: {
    color: "lightslategrey",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    paddingTop: "24px",
  },
  shoppingCartIcon: {
    borderRadius: "50%",
    backgroundColor: "#F33A6A",
    padding: "12px",
    color: "white",
  },
  quantityField: {
    width: "100%",
    marginTop: 2,
  },
  productCardStyle: {
    width: 420,
    height: "auto",
    display: "flex",
    flexDirection: "column",
    height: 560
  },
  productImage: {
    objectFit: "cover",
    height: 320,
  },
  deleteConfirmation: {
    "& .MuiDialog-paper": { width: "30%", maxHeight: 460, height: 200 },
  },
  cardContentStyle: { flexGrow: 1, overflow: "scroll" },
  productNameStyle: {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
  },
  productDescStyle: {
    fontStyle: "italic"
  },
  cardActions: {
    display: "flex",
    flexDirection: "row",
  },
  buyBtnStyle: {
    backgroundColor: "#3f51b5 !important",
  },
});

export const imgStyle = {
  maxHeight: 600,
  width: 400,
};
