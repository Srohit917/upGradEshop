import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import AuthenticationComponent from "./AuthenticationComponent";
import AddProduct from "./components/Products/AddProduct";
import ProductDetail from "./components/Products/ProductDetails";
import Dashboard from "./components/Dashboard/Dashboard";
import OrderPage from "./components/Order/Order";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signUp" exact Component={SignUp} />
        <Route path="/login" exact Component={Login} />
        <Route element={<AuthenticationComponent />}>
          <Route path="/" exact Component={Dashboard} />
          <Route path="/addProduct" exact Component={AddProduct} />
          <Route path="/productDetail" exact Component={ProductDetail} />
          <Route path="/orderProduct" exact Component={OrderPage} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
