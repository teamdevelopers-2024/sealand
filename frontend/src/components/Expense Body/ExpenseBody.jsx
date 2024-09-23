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

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale,PointElement, LinearScale, Tooltip, Legend);

// Sample expense history data
const expenseHistoryData = [
  {
    date: "2023-09-01",
    customerName: "John Doe",
    vehicleNumber: "ABC123",
    paymentType: "Cash",
    phoneNumber: "1234567890",
    amount: "2000",
  },
  {
    date: "2023-09-02",
    customerName: "Jane Smith",
    vehicleNumber: "XYZ456",
    paymentType: "Card",
    phoneNumber: "0987654321",
    amount: "1500",
  },
  {
    date: "2023-09-03",
    customerName: "Alice Johnson",
    vehicleNumber: "LMN789",
    paymentType: "Cash",
    phoneNumber: "1231231234",
    amount: "2500",
  },
  // Add more entries as needed
];

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

  const dailyData = [
    { name: "Sun", expense: 0 },
    { name: "Mon", expense: 0 },
    { name: "Tue", expense: 0 },
    { name: "Wed", expense: 0 },
    { name: "Thu", expense: 0 },
    { name: "Fri", expense: 0 },
    { name: "Sat", expense: 0 },
  ];

  const handleTimePeriodChange = (event) => {
    const period = event.target.value;
    setTimePeriod(period);

    if (period === "Daily") {
      const today = new Date();
      const dayOfWeek = today.getDay(); // Get current day of the week
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - dayOfWeek); // Get the start of the week (Sunday)

      const expenses = expenseHistoryData.reduce((acc, entry) => {
        const entryDate = new Date(entry.date);
        const dayIndex = entryDate.getDay();
        if (entryDate >= startOfWeek && entryDate <= today) {
          acc[dayIndex] += parseInt(entry.amount.replace(/[^\d]/g, "")); // Update daily expenses
        }
        return acc;
      }, dailyData.map(data => data.expense));

      // Update dailyData with calculated expenses
      dailyData.forEach((data, index) => {
        data.expense = expenses[index];
      });

      setExpense(dailyData.reduce((total, day) => total + day.expense, 0)); // Calculate total daily expense
    } else if (period === "Weekly") {
      setExpense(24500); // Weekly expense
    } else if (period === "Monthly") {
      setExpense(106480); // Monthly expense
    } else if (period === "Yearly") {
      setExpense(120000); // Yearly expense
    }
  };

  const graphData =
    timePeriod === "Daily"
      ? dailyData // Use dailyData when timePeriod is Daily
      : timePeriod === "Weekly"
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

  // Entries to display
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
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(expense)}
            </h3>
            <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
            <h2 className="text-3xl font-bold text-cyan-400">
              {timePeriod} Expense
            </h2>
            <h3 className="text-3xl text-red-400 font-bold">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(expense)}
            </h3>
            <p className="text-xl text-cyan-400">
              This {timePeriod.toLowerCase()}:{" "}
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(expense)}
            </p>
          </div>

          <div className="w-2/4 relative">
            <div className="absolute z-10 bottom--4 left-0 p-2">
              <select
                value={timePeriod}
                onChange={handleTimePeriodChange}
                className="bg-gray-700 px-4 py-2 rounded-full text-cyan-500"
              >
                <option value="Daily">Daily</option>
                <option value="Monthly">Month</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div
              className="mt-5 relative"
              style={{ width: "600px", height: "300px", marginBottom: "45px" }}
            >
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
                        display: false, // Disable x-axis grid lines
                      },
                      ticks: {
                        color: "#999", // X-axis label color
                      },
                    },
                    y: {
                      display: false, // Hide the entire y-axis including labels
                      grid: {
                        display: false, // Disable y-axis grid lines
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
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button onClick={handlePrevYear} className="text-cyan-400">
                      <FaChevronLeft />
                    </button>
                  </div>
                  <div
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full text-cyan-400 hover:bg-gray-600 transition"
                    style={{
                      marginRight: "-60px",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button onClick={handleNextYear} className="text-cyan-400">
                      <FaChevronRight />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-10 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-cyan-400">Expense History</h3>
            <button onClick={handleShowAll} className="text-cyan-400">
              See all
            </button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500">
                <th className="pb-2">Date</th>
                <th className="pb-2">Payee Name</th>
                <th className="pb-2">Expense Type</th>
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
                    <td className="py-4">{new Date(entry.date).toLocaleDateString("en-GB")}</td>
                    <td className="py-4">{entry.payeeName}</td>
                    <td className="py-4">{entry.expenseType}</td>
                    <td className="py-4">{entry.paymentMethod}</td>
                    <td className="py-4">{entry.contactNumber}</td>
                    <td className="py-4">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(entry.totalExpense)}
                    </td>
                    <td className="py-4">
                      <button className="bg-cyan-400 text-gray-900 px-3 py-1 rounded">View</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {showAll && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="bg-cyan-400 px-4 py-2 rounded-lg"
              >
                &#8592;
              </button>
              <span className="text-gray-500">
                Page {currentPage} of {pageCount}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === pageCount}
                className="bg-cyan-400 px-4 py-2 rounded-lg"
              >
                &#8594;
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Expense;
