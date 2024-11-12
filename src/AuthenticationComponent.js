import { Fragment } from "react";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import { Outlet } from "react-router-dom";

const AuthenticationComponent = () => {
  const userState = useSelector((state) => state.userDetails);
  const { isLoggedIn } = userState;
  return <Fragment>{isLoggedIn ? <Outlet /> : <Login />}</Fragment>;
};
export default AuthenticationComponent;
