import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../../services/api";
import ViewIncomeModal from "../View Income/ViewIncomeModal";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// Monthly data
const monthlyData = [
  { name: "Jan", income: 1500 },
  { name: "Feb", income: 3000 },
  { name: "Mar", income: 4500 },
  { name: "Apr", income: 3500 },
  { name: "May", income: 5000 },
  { name: "Jun", income: 7000 },
  { name: "Jul", income: 8000 },
  { name: "Aug", income: 9000 },
  { name: "Sep", income: 12000 },
  { name: "Oct", income: 11000 },
  { name: "Nov", income: 9000 },
  { name: "Dec", income: 13000 },
];

// Weekly data
const weeklyData = [
  { name: "Sun", income: 1000 },
  { name: "Mon", income: 2000 },
  { name: "Tue", income: 3000 },
  { name: "Wed", income: 1500 },
  { name: "Thu", income: 2500 },
  { name: "Fri", income: 4000 },
  { name: "Sat", income: 3500 },
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

const IncomeBody = () => {
  const [incomeHistoryData, setIncomeHistoryData] = useState([]);
  const [timePeriod, setTimePeriod] = useState("Monthly");
  const [income, setIncome] = useState(106480); // Default for monthly
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentYear, setCurrentYear] = useState(2023);
  const [viewIncomeModal, setViewIncomeModal] = useState(false);
  const [singleEntry, setSingleEntry] = useState({});

  const handleViewClick = (entry) => {
    setViewIncomeModal(true);
    setSingleEntry(entry);
  };

  useEffect(() => {
    const fetchIncomeHistory = async () => {
      try {
        const response = await api.showIncome();
        setIncomeHistoryData(response.data);
        console.log("income history", response.data);
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
      const dailyIncome = incomeHistoryData
        .filter((entry) => entry.date === today)
        .reduce(
          (total, entry) =>
            total + parseInt(entry.amount.replace(/[^\d]/g, "")),
          0
        );
      setIncome(dailyIncome);
    } else if (period === "Weekly") {
      setIncome(24500); // Weekly income
    } else if (period === "Monthly") {
      setIncome(106480); // Monthly income
    } else if (period === "Yearly") {
      setIncome(120000); // Yearly income
    }
  };

  // Determine the data based on timePeriod
  const graphData = timePeriod === "Weekly"
    ? weeklyData
    : timePeriod === "Yearly"
    ? yearlyData
    : monthlyData;

  // Chart.js data
  const labels = graphData.map((data) => data.name);
  const incomeValues = graphData.map((data) => data.income);

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeValues,
        borderColor: "#00d8ff",
        backgroundColor: "rgba(0, 216, 255, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
        ticks: {
          display: false, // Hide the y-axis labels
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Income: ₹${tooltipItem.raw}`,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  // Entries to display
  const indexOfLastEntry = currentPage * 5;
  const indexOfFirstEntry = indexOfLastEntry - 5;
  const currentEntries = showAll
    ? incomeHistoryData
    : incomeHistoryData.slice(0, 3);

  const pageCount = Math.ceil(incomeHistoryData.length / 5);

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

          {/* Chart.js Graph */}
          <div className="w-2/4 relative">
            <div className="absolute z-10 bottom--4 left-0 p-2">
              <select
                value={timePeriod}
                onChange={handleTimePeriodChange}
                className="bg-gray-700 px-4 py-2 rounded-full text-cyan-500"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
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
              <Line data={data} options={options} />
            </div>
          </div>
        </div>

        {/* Income History Table */}
        <div className="bg-gray-800 p-10 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-cyan-400">Income History</h3>
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
                    <td className="py-4">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(entry.amount)}
                    </td>
                    <td className="py-4">
                      <button className="bg-cyan-400 text-gray-900 px-3 py-1 rounded" onClick={() => handleViewClick(entry)}>
                        View
                      </button>
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

        {viewIncomeModal && (
          <ViewIncomeModal
            entry={singleEntry}
            onClose={() => setViewIncomeModal(false)}
          />
        )}
      </main>
    </div>
  );
};

export default IncomeBody;
