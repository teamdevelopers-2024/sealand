import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Home from "../../pages/Home/Home";
import CreditCustomers from "../../pages/Credit Customers/CreditCustomers";


function LayoutRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/credit" element={<CreditCustomers />} />
      </Routes>
    </Router>
  );
}

export default LayoutRoutes;