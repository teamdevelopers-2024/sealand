import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Navbar from "../Navbar/Navbar";

// monthly data
const monthlyData = [
  { name: "Jan", expense: 1500 },
  { name: "Feb", expense: 3000 },
  { name: "Mar", expense: 4500 },
  { name: "Apr", expense: 3500 },
  { name: "May", expense: 5000 },
  { name: "Jun", expense: 7000 },
  { name: "Jul", expense: 8000 },
  { name: "Aug", expense: 9000 },
  { name: "Sep", expense: 12000 },
  { name: "Oct", expense: 11000 },
  { name: "Nov", expense: 9000 },
  { name: "Dec", expense: 13000 },
];

// weekly data
const weeklyData = [
  { name: "Sun", expense: 1000 },
  { name: "Mon", expense: 2000 },
  { name: "Tue", expense: 3000 },
  { name: "Wed", expense: 1500 },
  { name: "Thu", expense: 2500 },
  { name: "Fri", expense: 4000 },
  { name: "Sat", expense: 3500 },
];

// yearly data
const yearlyData = [
  { name: "2016", expense: 60000 },
  { name: "2017", expense: 70000 },
  { name: "2018", expense: 80000 },
  { name: "2019", expense: 90000 },
  { name: "2020", expense: 95000 },
  { name: "2021", expense: 105000 },
  { name: "2022", expense: 115000 },
  { name: "2023", expense: 125000 },
];

// expense history data
const expenseHistoryData = [
  {
    date: "18-09-2024",
    customerName: "Muhammed Danish",
    vehicleNumber: "KL 13 A 5672",
    paymentType: "By UPI",
    phoneNumber: "8921405362",
    amount: "₹ 1970",
  },
  {
    date: "18-09-2024",
    customerName: "Anjali Mehta",
    vehicleNumber: "KL 14 B 1234",
    paymentType: "Cash",
    phoneNumber: "9876543210",
    amount: "₹ 2500",
  },
  {
    date: "18-09-2024",
    customerName: "Rajesh Kumar",
    vehicleNumber: "KL 15 C 5678",
    paymentType: "By Card",
    phoneNumber: "8765432109",
    amount: "₹ 3000",
  },
  {
    date: "18-09-2024",
    customerName: "Sita Sharma",
    vehicleNumber: "KL 16 D 1357",
    paymentType: "By UPI",
    phoneNumber: "7654321098",
    amount: "₹ 2800",
  },
  {
    date: "18-09-2024",
    customerName: "Rahul Verma",
    vehicleNumber: "KL 17 E 2468",
    paymentType: "Cash",
    phoneNumber: "6543210987",
    amount: "₹ 1500",
  },
  {
    date: "18-09-2024",
    customerName: "Priya Singh",
    vehicleNumber: "KL 18 F 9876",
    paymentType: "By Card",
    phoneNumber: "5432109876",
    amount: "₹ 4000",
  },
  {
    date: "18-09-2024",
    customerName: "Vikram Rao",
    vehicleNumber: "KL 19 G 5432",
    paymentType: "By UPI",
    phoneNumber: "4321098765",
    amount: "₹ 3700",
  },
  {
    date: "18-09-2024",
    customerName: "Ravi Patel",
    vehicleNumber: "KL 20 H 9876",
    paymentType: "Cash",
    phoneNumber: "3210987654",
    amount: "₹ 2200",
  },
  // additional entries...
];

const Expense = () => {
  const [timePeriod, setTimePeriod] = useState("Monthly");
  const [expense, setExpense] = useState(106480); // Default for monthly
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const handleTimePeriodChange = (event) => {
    const period = event.target.value;
    setTimePeriod(period);

    // expense based on time period
    if (period === "Daily") {
      const today = new Date().toISOString().split("T")[0];
      const dailyExpense = expenseHistoryData
        .filter((entry) => entry.date === today)
        .reduce(
          (total, entry) =>
            total + parseInt(entry.amount.replace(/[^\d]/g, "")),
          0
        );
      setExpense(dailyExpense);
    } else if (period === "Weekly") {
      setExpense(24500); // weekly expense
    } else if (period === "Monthly") {
      setExpense(106480); // monthly expense
    } else if (period === "Yearly") {
      setExpense(120000); // yearly expense
    }
  };

  const graphData =
    timePeriod === "Weekly"
      ? weeklyData
      : timePeriod === "Yearly"
      ? yearlyData
      : monthlyData;

  // entries to display
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = showAll
    ? expenseHistoryData
    : expenseHistoryData.slice(0, 3);

  const pageCount = Math.ceil(expenseHistoryData.length / entriesPerPage);

  const handleNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleShowAll = () => {
    setShowAll(true);
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 p-10 text-gray-100 relative">
        {/* Main Content */}
        <main className="mt-8 p-2">
          {/* Expense Overview */}
          <div className="bg-gray-800 p-8 rounded-lg flex justify-between items-center mb-8">
            <div className="text-left space-y-3 w-1/3">
              <h2 className="text-5xl font-bold text-cyan-400">Total Expense</h2>
              <h3 className="text-3xl text-red-300 font-bold">
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(expense)}
              </h3>
              <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
              <h2 className="text-3xl font-bold text-cyan-400">
                {timePeriod} Expense
              </h2>
              <h3 className="text-3xl text-red-300 font-bold">
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(expense)}
              </h3>
              <p className="text-xl text-cyan-400">
                This {timePeriod.toLowerCase()}:   {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(expense)}
              </p>
            </div>

            {/* Graph and Dropdown */}
            <div className="w-2/4 relative">
              <div className="absolute z-10 bottom--4 left-0 p-2">
                <select
                  value={timePeriod}
                  onChange={handleTimePeriodChange}
                  className="bg-gray-700 px-4 py-2 rounded-lg text-cyan-400"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Week</option>
                  <option value="Monthly">Month</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>

              {/* Graph */}
              <div className="mt-5" style={{ width: "600px", height: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={graphData}>
                    <XAxis dataKey="name" stroke="#999" />
                    <YAxis stroke="#999" hide />
                    <Tooltip cursor={false} />
                    <Line
                      type="monotone"
                      dataKey="expense"
                      stroke="#00d8ff"
                      strokeWidth={3}
                      dot={{ stroke: "#00d8ff", strokeWidth: 2 }}
                      activeDot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Expense History */}
          <div className="bg-gray-800 p-10 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-cyan-400">
                Expense History
              </h3>
              <button onClick={handleShowAll} className="text-cyan-400">
                See all
              </button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Customer Name</th>
                  <th className="pb-2">Vehicle Number</th>
                  <th className="pb-2">Payment Type</th>
                  <th className="pb-2">Phone Number</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries
                  .slice(indexOfFirstEntry, indexOfLastEntry)
                  .map((entry, index) => (
                    <tr key={index} className="border-t border-gray-700">
                      <td className="py-4">{entry.date}</td>
                      <td className="py-4">{entry.customerName}</td>
                      <td className="py-4">{entry.vehicleNumber}</td>
                      <td className="py-4">{entry.paymentType}</td>
                      <td className="py-4">{entry.phoneNumber}</td>
                      <td className="py-4">{entry.amount}</td>
                      <td className="py-4">
                        <button className="bg-cyan-400 text-gray-900 px-3 py-1 rounded">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* Pagination*/}
            {showAll && (
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="bg-cyan-400 px-4 py-2 rounded-lg"
                >
                  &#8592; {/* Left arrow */}
                </button>
                <span className="text-gray-500">
                  Page {currentPage} of {pageCount}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === pageCount}
                  className="bg-cyan-400 px-4 py-2 rounded-lg"
                >
                  &#8594; {/* Right arrow */}
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Expense;
