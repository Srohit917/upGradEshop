import Categories from "../../common/Categories";
import NavigationBar from "../../Navigation/index";
import Products from "../Products/Products";
import Sorting from "../../common/Sorting";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../common/Loader";

const Dashboard = () => {

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const userDetails = useSelector((state) => state.userDetails);
  const { roles } = userDetails;

  const getUserDetails = async () => {
    if (roles && roles.length > 0)
      dispatch({ type: "UPDATE_USER_ROLES", payload: roles });
  };
  
  useEffect(() => {
    if (token) {
      getUserDetails();
    }
  }, []);

  return (
    <>
      <NavigationBar />
      <Categories />
      <Sorting />
      <Products />
      <Loader />
    </>
  );
};
export default Dashboard;
