import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/Login/LoginForm";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<ProtectedRoute Component={Home} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
