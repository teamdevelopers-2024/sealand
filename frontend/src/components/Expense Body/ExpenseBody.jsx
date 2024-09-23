import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"; // Import Line from Chart.js
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import api from "../../services/api"; 
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, PointElement, LinearScale, Tooltip, Legend);

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

const weeklyData = [
  { name: "Sun", expense: 1000 },
  { name: "Mon", expense: 2000 },
  { name: "Tue", expense: 3000 },
  { name: "Wed", expense: 1500 },
  { name: "Thu", expense: 2500 },
  { name: "Fri", expense: 4000 },
  { name: "Sat", expense: 3500 },
];

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
  const [expense, setExpense] = useState(106480);
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentYear, setCurrentYear] = useState(2023);
  const entriesPerPage = 5;
  const [expenseHistoryData, setExpenseHistoryData] = useState([]);

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

  const graphData =
    timePeriod === "Weekly"
      ? weeklyData
      : timePeriod === "Yearly"
      ? yearlyData
      : monthlyData;

  const data = {
    labels: graphData.map(data => data.name),
    datasets: [
      {
        label: "Expenses",
        data: graphData.map(data => data.expense),
        borderColor: "#00d8ff",
        backgroundColor: "rgba(0, 216, 255, 0.2)",
        borderWidth: 3,
        tension: 0.1, // Smoother line
      },
    ],
  };

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
            <h2 className="text-3xl font-bold text-cyan-400">
              {timePeriod} Expense
            </h2>
            <h3 className="text-3xl text-red-400 font-bold">
              {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(expense)}
            </h3>
            <p className="text-xl text-cyan-400">
              This {timePeriod.toLowerCase()}:{" "}
              {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(expense)}
            </p>
          </div>

          <div className="w-2/4 relative">
            <div className="absolute z-10 bottom--4 left-0 p-2">
              <select value={timePeriod} onChange={handleTimePeriodChange} className="bg-gray-700 px-4 py-2 rounded-full text-cyan-500">
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div className="mt-5 relative" style={{ width: "600px", height: "300px", marginBottom: "45px" }}>
              <div className="flex justify-center mb-2 text-gray-300">
                {timePeriod === "Daily" ? (
                  <span className="text-lg font-semibold">Last 7 Days</span>
                ) : timePeriod === "Monthly" ? (
                  <span className="text-lg font-semibold">{currentYear}</span>
                ) : (
                  <span className="text-lg font-semibold">Last 5 Years</span>
                )}
              </div>
              <Line
                data={data}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      backgroundColor: "#333",
                      titleColor: "#fff",
                      bodyColor: "#fff",
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false, 
                      },
                      ticks: {
                        color: "#999", 
                      },
                    },
                    y: {
                      display: false, 
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />

              {timePeriod === "Monthly" && (
                <>
                  <div
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full text-cyan-400 hover:bg-gray-600 transition"
                    style={{
                      marginLeft: "-60px",
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                    }}
                    onClick={handlePrevYear}
                  >
                    <FaChevronLeft />
                  </div>
                  <div
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full text-cyan-400 hover:bg-gray-600 transition"
                    style={{
                      marginRight: "-60px",
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                    }}
                    onClick={handleNextYear}
                  >
                    <FaChevronRight />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-cyan-400">Expense History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-gray-400">
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Amount</th>
                  <th className="py-2 px-4">Description</th>
                  <th className="py-2 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.map((entry, index) => (
                  <tr key={index} className="bg-gray-700 text-gray-200">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{entry.name}</td>
                    <td className="py-2 px-4">{entry.amount}</td>
                    <td className="py-2 px-4">{entry.description}</td>
                    <td className="py-2 px-4">{entry.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleShowAll}
                className="px-4 py-2 bg-cyan-500 rounded text-white hover:bg-cyan-600"
              >
                Show All
              </button>

              <div className="flex space-x-2">
                <button
                  onClick={handlePrevPage}
                  className={`px-4 py-2 bg-gray-600 rounded text-white ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"}`}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  className={`px-4 py-2 bg-gray-600 rounded text-white ${currentPage === pageCount ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"}`}
                  disabled={currentPage === pageCount}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Navbar />
    </div>
  );
};

export default Expense;
