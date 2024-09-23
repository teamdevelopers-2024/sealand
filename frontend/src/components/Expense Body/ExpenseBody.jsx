import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../../services/api"; 
import ExpenseModal from "../View Expense/ExpenseModal";

// Monthly data
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

// Weekly data
const weeklyData = [
  { name: "Sun", expense: 1000 },
  { name: "Mon", expense: 2000 },
  { name: "Tue", expense: 3000 },
  { name: "Wed", expense: 1500 },
  { name: "Thu", expense: 2500 },
  { name: "Fri", expense: 4000 },
  { name: "Sat", expense: 3500 },
];

// Yearly data
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

const Expense = () => {
  const [timePeriod, setTimePeriod] = useState("Monthly");
  const [expense, setExpense] = useState(106480); // Default for monthly
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentYear, setCurrentYear] = useState(2023);
  const entriesPerPage = 5;
  const [expenseHistoryData, setExpenseHistoryData] = useState([]);
  
  // State for modal visibility and selected expense
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchIncomeHistory = async () => {
      try {
        const response = await api.showExpense();
        setExpenseHistoryData(response.data);
        console.log("expense history", response.data);
      } catch (error) {
        console.error("Error fetching income history data", error);
      }
    };

    fetchIncomeHistory();
  }, []);

  const handleViewExpense = (entry) => {
    setSelectedExpense(entry);
    setIsModalOpen(true);
  };

  const handleTimePeriodChange = (event) => {
    const period = event.target.value;
    setTimePeriod(period);
    if (period === "Daily") {
      const today = new Date().toISOString().split("T")[0];
      const dailyExpense = expenseHistoryData
        .filter((entry) => entry.date === today)
        .reduce((total, entry) => total + parseInt(entry.amount.replace(/[^\d]/g, "")), 0);
      setExpense(dailyExpense);
    } else if (period === "Weekly") {
      setExpense(24500);
    } else if (period === "Monthly") {
      setExpense(106480);
    } else if (period === "Yearly") {
      setExpense(120000);
    }
  };

  const graphData = timePeriod === "Weekly" ? weeklyData : timePeriod === "Yearly" ? yearlyData : monthlyData;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = showAll ? expenseHistoryData : expenseHistoryData.slice(0, 3);
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

  const handleNextYear = () => {
    if (timePeriod === "Monthly") {
      setCurrentYear((prevYear) => prevYear + 1);
    }
  };

  const handlePrevYear = () => {
    if (timePeriod === "Monthly" && currentYear > 2020) {
      setCurrentYear((prevYear) => prevYear - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-10 text-gray-100 relative">
      <main className="mt-8 p-2">
        <div className="bg-gray-800 p-8 rounded-lg flex justify-between items-center mb-8">
          <div className="text-left space-y-3 w-1/3">
            <h2 className="text-5xl font-bold text-cyan-400">Total Expense</h2>
            <h3 className="text-3xl text-red-400 font-bold">
              {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(expense)}
            </h3>
            <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
            <h2 className="text-3xl font-bold text-cyan-400">{timePeriod} Expense</h2>
            <h3 className="text-3xl text-red-400 font-bold">
              {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(expense)}
            </h3>
            <p className="text-xl text-cyan-400">
              This {timePeriod.toLowerCase()}:{" "}
              {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(expense)}
            </p>
          </div>

          {/* Graph Section */}
          <div className="w-2/4 relative">
            <div className="absolute z-10 bottom--4 left-0 p-2">
              <select value={timePeriod} onChange={handleTimePeriodChange} className="bg-gray-700 px-4 py-2 rounded-full text-cyan-500">
                <option value="Daily">Daily</option>
                <option value="Monthly">Month</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div className="mt-5 relative" style={{ width: "600px", height: "300px", marginBottom: "45px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={graphData}>
                  <XAxis dataKey="name" stroke="#999" />
                  <YAxis stroke="#999" hide />
                  <Tooltip cursor={false} />
                  <Line type="monotone" dataKey="expense" stroke="#00d8ff" strokeWidth={3} dot={{ stroke: "#00d8ff", strokeWidth: 2 }} activeDot={false} />
                </LineChart>
              </ResponsiveContainer>

              {timePeriod === "Monthly" && (
                <>
                  <button onClick={handlePrevYear} className="absolute left-5 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full text-cyan-400 hover:bg-gray-600 transition" style={{ marginLeft: "-80px", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    &lt;
                  </button>
                  <button onClick={handleNextYear} className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full text-cyan-400 hover:bg-gray-600 transition" style={{ marginRight: "-80px", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    &gt;
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Expense History Section */}
        <div className="bg-gray-800 p-8 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">Expense History</h2>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500">
                <th className="pb-2">Date</th>
                <th className="pb-2">Payee Name</th>
                <th className="pb-2">Expense Type</th>
                <th className="pb-2">Payment Type</th>
                <th className="pb-2">Phone number</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((entry,index) => (
                <tr key={entry.id} className="border-b border-gray-700">
                  <td className="py-2">
                    {new Date(entry.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="py-2">{entry.payeeName}</td>
                  <td className="py-2">{entry.expenseType}</td>
                  <td className="py-2">{entry.paymentMethod}</td>
                  <td className="py-2">{entry.contactNumber}</td>
                  <td className="py-2">{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(entry.totalExpense)}</td>
                  <td className="py-2">
                    <button
                     onClick={() => handleViewExpense(entry)}
                      className="text-cyan-400"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!showAll && expenseHistoryData.length > 3 && (
            <div className="flex justify-center mt-4">
              <button onClick={handleShowAll} className="bg-gray-700 text-white px-4 py-2 rounded">Show All</button>
            </div>
          )}
        </div>

        {/* Modal for Viewing Expense */}
        <ExpenseModal isOpen={isModalOpen} expense={selectedExpense} onClose={() => setIsModalOpen(false)} />
      </main>
    </div>
  );
};

export default Expense;
