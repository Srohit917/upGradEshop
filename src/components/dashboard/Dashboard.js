import Categories from "../../common/Categories";
import NavigationBar from "../../navigation/NavigationBar";
import Products from "../products/Products";
import Sorting from "../../common/Sorting";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { fetchUserDetails } from "../../common/Services/apiServices";
const Dashboard = () => {

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const getUserDetails = async () => {
    const { userId } = jwtDecode(token);
    const { roles } = await fetchUserDetails(userId);
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
    </>
  );
};
export default Dashboard;
