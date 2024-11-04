import Categories from "../../common/Categories";
import NavigationBar from "../../navigation/NavigationBar";
import Products from "../Products/Products";
import Sorting from "../../common/Sorting";
const Dashboard = () => {

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
