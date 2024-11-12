import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components//SignUp";
import AuthenticationComponent from "./AuthenticationComponent";
import AddProduct from "./components/Products/AddProduct";
import ProductDetail from "./components/Products/ProductDetails";
import OrderPage from "./components/order/Order";
import Dashboard from "./components/dashboard";
import { NavigationProvider } from "./common/history";

function App() {
  return (
    <BrowserRouter>
      <NavigationProvider>
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
      </NavigationProvider>
    </BrowserRouter>
  );
}

export default App;
