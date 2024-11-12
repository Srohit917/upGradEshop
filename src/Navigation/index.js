import { Fragment, useCallback, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {InputAdornment, ThemeProvider as MuiThemeProvider, TextField} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { navigationStyles, navigationTheme } from "../common/styles";
import "./NavigationBar.css";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import _debounce from "lodash.debounce";
import { EMPTY } from "../common/constants";
import { navigateTo } from "../common/history";

const NavigationBar = () => {

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const productDetails = useSelector((state) => state.productDetails);
  const { sortBy, filterType, filterProducts } = productDetails;
  const { isAdmin, isLoggedIn, roles } = userDetails;
  const { appBarBoxStyle, toolBarStyle, searchFieldStyle, searchIconStyle } = navigationStyles();

  const handleRedirection = (page) => {
    navigateTo(`/${page}`);
  };

  const handleOnSearch = useCallback(
    _debounce((e) => {
      const val = e.target.value;
      const prod = filterProducts.filter((pro) =>
        pro.name.toLowerCase().includes(val)
      );
      dispatch({
        type: "UPDATE_FILTERED_PRODUCTS",
        payload: prod,
        searchItem: e.target.value,
        sortBy: sortBy,
        filterType: filterType,
      });
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    dispatch({
      type: "UPDATE_FILTERED_PRODUCTS",
      filterType: "all",
      sortBy: "default",
      searchItem: EMPTY,
    });
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    dispatch({ type: "RESET_USER_DETAILS" });
    dispatch({ type: "RESET_CATEGORY_DETAILS" });
    dispatch({ type: "RESET_PRODUCT_DETAILS" });
    dispatch({ type: "RESET_ADDRESS" })
  }

  return (
    <MuiThemeProvider theme={navigationTheme}>
      <Box className={appBarBoxStyle}>
        <AppBar position="sticky">
          <Toolbar className={toolBarStyle}>
            <ShoppingCart />
            <Typography variant="h6" component="div" className="appName">
              upGrad E-Shop
            </Typography>
            {isLoggedIn && (
              <TextField
                id="input-with-sx"
                placeholder="Search..."
                autoComplete="off"
                className={searchFieldStyle}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon className={searchIconStyle} />
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={handleOnSearch}
              />
            )}
            <Box className={appBarBoxStyle} />
            {!isLoggedIn ? (
              <Fragment>
                <Button
                  color="inherit"
                  variant="text"
                  id="navigationBtn"
                  onClick={() => handleRedirection("login")}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  variant="text"
                  id="navigationBtn"
                  onClick={() => handleRedirection("signUp")}
                >
                  Sign Up
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button
                  color="inherit"
                  variant="text"
                  id="navigationBtn"
                  onClick={() => handleRedirection("")}
                >
                  Home
                </Button>
                {isAdmin && (
                  <Button
                    color="inherit"
                    variant="text"
                    id="navigationBtn"
                    onClick={() => handleRedirection("addProduct")}
                  >
                    Add Product
                  </Button>
                )}
                <Button
                  variant="contained"
                  className="logOutBtn"
                  onClick={handleLogOut}
                >
                  LogOut
                </Button>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </MuiThemeProvider>
  );
};
export default NavigationBar;
