import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signUp" exact Component={SignUp} />
        <Route path="/login" exact Component={Login} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
