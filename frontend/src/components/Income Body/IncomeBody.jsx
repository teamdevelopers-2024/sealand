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

// Monthly data
const monthlyData = [
  { name: "Jan", income: 2000 },
  { name: "Feb", income: 4500 },
  { name: "Mar", income: 3200 },
  { name: "Apr", income: 6100 },
  { name: "May", income: 7200 },
  { name: "Jun", income: 6800 },
  { name: "Jul", income: 7900 },
  { name: "Aug", income: 8600 },
  { name: "Sep", income: 10000 },
  { name: "Oct", income: 11000 },
  { name: "Nov", income: 12300 },
  { name: "Dec", income: 14200 },
];

// Yearly data
const yearlyData = [
  { name: "2019", income: 50000 },
  { name: "2020", income: 100000 },
  { name: "2021", income: 110000 },
  { name: "2022", income: 120000 },
  { name: "2023", income: 130000 },
  { name: "2024", income: 140000 },
];

// Daily data (last 7 days, starting from Sunday)
const dailyData = Array.from({ length: 7 }, (_, index) => {
  const date = new Date();
  date.setDate(date.getDate() - (index + 1)); // Shift to start from Sunday
  return {
    name: date.toLocaleDateString(undefined, { weekday: "long" }),
    income: Math.floor(Math.random() * 5000) + 1000,
  };
}).reverse(); // Reverse to show from Sunday to Saturday


const IncomeBody = () => {
  const [incomeHistoryData, setIncomeHistoryData] = useState([]);
  const [timePeriod, setTimePeriod] = useState("Monthly");
  const [income, setIncome] = useState(106480); // Default for monthly
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // State for current year
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  useEffect(() => {
    const fetchIncomeHistory = async () => {
      try {
        const response = await api.showIncome();
        
        setIncomeHistoryData(response.data);
        console.log("income history",response.data);
        
      } catch (error) {
        console.error("Error fetching income history data", error);
      }
    };

    fetchIncomeHistory();
  }, []);

  const handleTimePeriodChange = (event) => {
    const period = event.target.value;
    setTimePeriod(period);

    // Update income based on selected time period
    if (period === "Daily") {
      setIncome(0); // Reset income or fetch daily total if necessary
    } else if (period === "Monthly") {
      setIncome(106480); // Monthly income
    } else if (period === "Yearly") {
      setIncome(120000); // Yearly income
    }
  };

  const graphData =
    timePeriod === "Daily"
      ? dailyData
      : timePeriod === "Yearly"
      ? yearlyData
      : monthlyData; // Show all 12 months when Monthly is selected

  // Entries to display
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = showAll
    ? incomeHistoryData
    : incomeHistoryData.slice(indexOfFirstEntry, indexOfLastEntry);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(incomeHistoryData.length / entriesPerPage)) {
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

  // Get current date
  const currentDate = new Date();

  return (
    <div className="min-h-screen bg-gray-900 p-10 text-gray-100 relative">
      {/* Main Content */}
      <main className="mt-8">
        {/* Income Overview */}
        <div className="bg-gray-800 p-8 rounded-lg flex justify-between items-center mb-8">
          <div className="text-left space-y-3 w-1/3">
            <h2 className="text-5xl font-bold text-cyan-400">Total income</h2>
            <h3 className="text-3xl text-green-300 font-bold">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(income)}
            </h3>
            <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
            <h2 className="text-3xl font-bold text-cyan-400">
              {timePeriod} income
            </h2>
            <h3 className="text-3xl text-green-300 font-bold">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(income)}
            </h3>
            <p className="text-xl text-cyan-400">
              This {timePeriod.toLowerCase()}:{" "}
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(income)}
            </p>
          </div>

          {/* Graph and Dropdown */}
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

            {/* Graph */}
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
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={graphData}>
                  <XAxis dataKey="name" stroke="#999" />
                  <YAxis stroke="#999" hide />
                  <Tooltip cursor={false} />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#00d8ff"
                    strokeWidth={3}
                    dot={{ stroke: "#00d8ff", strokeWidth: 2 }}
                    activeDot={false}
                  />
                </LineChart>
              </ResponsiveContainer>

              {/* Arrow Buttons */}
              {timePeriod === "Monthly" && (
                <>
                  <button
                    onClick={handlePrevYear}
                    className="absolute left-5 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full text-cyan-400 hover:bg-gray-600 transition"
                    style={{
                      marginLeft: "-80px",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    &lt; {/* Left arrow */}
                  </button>
                  <button
                    onClick={handleNextYear}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full text-cyan-400 hover:bg-gray-600 transition"
                    style={{
                      marginRight: "-80px",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    &gt; {/* Right arrow */}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Income History */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-cyan-400">Income history</h3>
            <button onClick={handleShowAll} className="text-cyan-400">
              See all
            </button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500">
                <th className="pb-2">Date</th>
                <th className="pb-2">Customer name</th>
                <th className="pb-2">Vehicle number</th>
                <th className="pb-2">Payment type</th>
                <th className="pb-2">Phone number</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-700">
                  <td className="py-2">{new Date(entry.workDate).toLocaleDateString('en-GB')}</td>
                  <td className="py-2">{entry.customerName}</td>
                  <td className="py-2">{entry.vehicleNumber}</td>
                  <td className="py-2">{entry.paymentMethod}</td>
                  <td className="py-2">{entry.contactNumber}</td>
                  <td className="py-2">₹ {entry.totalServiceCost}</td>
                  <td className="py-2">
                    <button className="text-cyan-400">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-2 bg-gray-700 rounded-full text-cyan-400 hover:bg-gray-600 transition"
            >
              &lt; {/* Left arrow */}
            </button>
            <span className="text-gray-400">{`Page ${currentPage} of ${Math.ceil(
              incomeHistoryData.length / entriesPerPage
            )}`}</span>
            <button
              onClick={handleNextPage}
              disabled={
                currentPage ===
                Math.ceil(incomeHistoryData.length / entriesPerPage)
              }
              className="p-2 bg-gray-700 rounded-full text-cyan-400 hover:bg-gray-600 transition"
            >
              &gt; {/* Right arrow */}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IncomeBody;
