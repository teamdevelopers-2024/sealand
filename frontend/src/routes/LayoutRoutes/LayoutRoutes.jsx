import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../../pages/Login/Login";


function LayoutRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default LayoutRoutes;