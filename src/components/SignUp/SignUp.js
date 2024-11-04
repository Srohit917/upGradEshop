import { Button, Grid2 as Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { loginStyles, loginTheme } from "../../common/styles";
import { useFormik } from "formik";
import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";
import * as yup from "yup";
import { signUp } from "../../common/Services/apiServices";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../navigation/NavigationBar";
import "./SignUp.css";
import { EMPTY } from "../../common/constants";
import { showNotification } from "../../common/Notification";

const SignUp = () => {
  const navigate = useNavigate();
  const { lockIconStyle, textFieldStyle, footerStyle } = loginStyles();
  const formik = useFormik({
    initialValues: {
      firstName: EMPTY,
      lastName: EMPTY,
      emailAddress: EMPTY,
      password: EMPTY,
      confirmPassword: EMPTY,
      contactNumber: EMPTY,
    },
    validationSchema: yup.object().shape({
      emailAddress: yup
        .string()
        .email("Invalid Email")
        .required("Email address is required."),
      password: yup.string().min(8).required("Password is required."),
      firstName: yup.string().required("First Name is required."),
      lastName: yup.string().required("Last Name is required."),
      confirmPassword: yup
        .string()
        .required("Confirm Password is required.")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
      contactNumber: yup
        .string()
        .required("Contact Number is required.")
        .matches(/^[0-9]{10}$/, "Contact Number must be exactly 10 digits"),
    }),
    onSubmit: async (values) => {
      const roles = values.emailAddress.includes("upgrad.com")
        ? ["admin", "customer"]
        : ["customer"];
      const payload = {
        email: values.emailAddress,
        role: roles,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        contactNumber: values.contactNumber,
      };
      const result = await signUp(payload);
      if (result && result.message) {
        showNotification(result.message, "success");
        navigate("/login");
      }
    },
  });

  return (
    <MuiThemeProvider theme={loginTheme}>
      <Grid container direction="column">
        <Grid
          item
          display="flex"
          flexDirection="column"
          justifyContent="center"
          justifyItems="center"
        >
          <NavigationBar />
        </Grid>
        <Grid
          item
          width="30%"
          display="flex"
          alignSelf="center"
          flexDirection="column"
          justifyContent="center"
          justifyItems="center"
          flexGrow={1}
          paddingTop="24px"
          paddingBottom="24px"
        >
          <Grid
            item
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexDirection="column"
          >
            <LockOutlinedIcon fontSize="medium" className={lockIconStyle} />
            <Typography variant="h5">Sign up</Typography>
          </Grid>
          <Grid
            item
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexDirection="column"
            gap="20px"
            marginTop="18px"
            marginBottom="18px"
          >
            <TextField
              name="firstName"
              variant="outlined"
              label="First Name*"
              error={formik.errors.firstName}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              helperText={formik.errors.firstName}
              className={textFieldStyle}
            ></TextField>
            <TextField
              name="lastName"
              variant="outlined"
              label="Last Name*"
              error={formik.errors.lastName}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              helperText={formik.errors.lastName}
              className={textFieldStyle}
            ></TextField>
            <TextField
              name="emailAddress"
              variant="outlined"
              label="Email Address*"
              error={formik.errors.emailAddress}
              value={formik.values.emailAddress}
              onChange={formik.handleChange}
              helperText={formik.errors.emailAddress}
              className={textFieldStyle}
            ></TextField>
            <TextField
              name="password"
              type="password"
              variant="outlined"
              label="Password*"
              error={formik.errors.password}
              value={formik.values.password}
              onChange={formik.handleChange}
              helperText={formik.errors.password}
              className={textFieldStyle}
            ></TextField>
            <TextField
              name="confirmPassword"
              type="password"
              variant="outlined"
              label="Confirm Password*"
              error={formik.errors.confirmPassword}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              helperText={formik.errors.confirmPassword}
              className={textFieldStyle}
            ></TextField>
            <TextField
              name="contactNumber"
              type="number"
              variant="outlined"
              label="Contact Number*"
              error={formik.errors.contactNumber}
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
              helperText={formik.errors.contactNumber}
              className={textFieldStyle}
            ></TextField>
            <Button id="signUpBtn" onClick={formik.handleSubmit}>
              Sign Up
            </Button>
            <Button
              variant="body"
              id="signUpText"
              onClick={() => navigate("/login")}
            >
              Already have an account? Sign In
            </Button>
          </Grid>
          <Grid
            item
            justifyContent="center"
            display="flex"
            alignItems="flex-start"
          >
            <Typography variant="body" className={footerStyle}>
              Copyright <CopyrightOutlinedIcon /> <span> upGrad </span> 2024
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};
export default SignUp;
