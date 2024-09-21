import React, { Suspense } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

// Lazy import components
const Login = React.lazy(() => import("../../pages/Login/Login"));
const Home = React.lazy(() => import("../../pages/Home/Home"));
const CreditCustomers = React.lazy(() => import("../../pages/Credit Customers/CreditCustomers"));
const Income = React.lazy(() => import("../../components/Income/Income"));
const Expense = React.lazy(()=>import("../../components/Expense/Expense"))

function LayoutRoutes() {
  return (
    <Router>
      {/* Suspense with fallback UI while components are loading */}
      <Suspense
        fallback={
          <div
            className="flex items-center justify-center h-screen bg-gray-900 text-white"
            style={{ backgroundColor: "#1a202c", height: "100vh" }} // Tailwind + inline style fallback
          >
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/credit" element={<CreditCustomers />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default LayoutRoutes;
