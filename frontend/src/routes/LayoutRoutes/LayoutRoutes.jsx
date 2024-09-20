import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Lazy import components
const Login = React.lazy(() => import("../../pages/Login/Login"));
const Home = React.lazy(() => import("../../pages/Home/Home"));
const CreditCustomers = React.lazy(() => import("../../pages/Credit Customers/CreditCustomers"));
const AddIncome = React.lazy(() => import("../../components/Add Income/AddIncome"));
const Income = React.lazy(() => import("../../components/Income/Income"));

function LayoutRoutes() {
  return (
    <Router>
      {/* Suspense with fallback UI while components are loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/credit" element={<CreditCustomers />} />
          <Route path="/addincome" element={<AddIncome />} />
          <Route path="/income" element={<Income />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default LayoutRoutes;
