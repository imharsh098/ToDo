import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgetPasswordPage from "./components/ForgetPasswordPage";
import SignInPage from "./components/LoginPage";
import SignUpPage from "./components/RegisterPage";
import "./App.css";
import Home from "./components/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<SignInPage />}></Route>
        <Route path="/register" element={<SignUpPage />}></Route>
        <Route path="/forget-password" element={<ForgetPasswordPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
