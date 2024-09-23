import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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

const IncomeBody = ({addIncomeModal}) => {
  const [incomeHistoryData, setIncomeHistoryData] = useState([]);
  const [timePeriod, setTimePeriod] = useState("Monthly");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [viewIncomeModal, setViewIncomeModal] = useState(false);
  const [singleEntry, setSingleEntry] = useState({});

  useEffect(() => {
    const fetchIncomeHistory = async () => {
      try {
        const response = await api.showIncome();
        setIncomeHistoryData(response.data);
      } catch (error) {
        console.error("Error fetching income history data", error);
      }
    };

    fetchIncomeHistory();
  }, [addIncomeModal]);

  const handleTimePeriodChange = (event) => {
    const period = event.target.value;
    setTimePeriod(period);
    if (period !== "Monthly") {
      setCurrentYear(new Date().getFullYear()); // Reset to current year when switching from Monthly
    }
  };

  const getMonthlyData = () => {
    const monthlyIncome = Array(12).fill(0);
    const currentYearData = incomeHistoryData.filter(entry => new Date(entry.date).getFullYear() === currentYear);

    currentYearData.forEach(entry => {
      const entryDate = new Date(entry.date);
      const month = entryDate.getMonth();
      monthlyIncome[month] += parseFloat(entry.amount.replace(/[^\d.-]/g, "")) || 0; // Parse amount correctly
    });

    return monthlyIncome.map((income, index) => ({
      name: new Date(0, index).toLocaleString('default', { month: 'short' }),
      income,
    }));
  };

  const getDailyData = () => {
    const today = new Date();
    const last7Days = Array(7).fill(0);
    const labels = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dayName = date.toLocaleString('default', { weekday: 'short' });
      labels.push(dayName);
    }

    incomeHistoryData.forEach(entry => {
      const entryDate = new Date(entry.date);
      const dayIndex = Math.floor((today - entryDate) / (1000 * 60 * 60 * 24));
      if (dayIndex >= 0 && dayIndex < 7) {
        last7Days[6 - dayIndex] += parseFloat(entry.amount.replace(/[^\d.-]/g, "")) || 0; // Parse amount correctly
      }
    });

    return labels.map((label, index) => ({
      name: label,
      income: last7Days[index],
    }));
  };

  const getYearlyData = () => {
    const yearlyIncome = Array(5).fill(0);
    const labels = [];

    for (let i = 0; i < 5; i++) {
      const year = currentYear - 4 + i; // Generate years from currentYear - 4 to currentYear
      labels.push(year);
    }

    incomeHistoryData.forEach(entry => {
      const entryDate = new Date(entry.date);
      const yearIndex = entryDate.getFullYear() - (currentYear - 4);
      if (yearIndex >= 0 && yearIndex < 5) {
        yearlyIncome[yearIndex] += parseFloat(entry.amount.replace(/[^\d.-]/g, "")) || 0; // Parse amount correctly
      }
    });

    return labels.map((label, index) => ({
      name: label,
      income: yearlyIncome[index],
    }));
  };

  const graphData = timePeriod === "Monthly" ? getMonthlyData() 
                : timePeriod === "Daily" ? getDailyData() 
                : getYearlyData();

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
      x: { grid: { display: false } },
      y: { grid: { display: true }, ticks: { color: "#ffffff" } },
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

  const handlePrevYear = () => {
    if (currentYear > new Date().getFullYear() - 5) {
      setCurrentYear((prevYear) => prevYear - 1);
    }
  };

  const handleNextYear = () => {
    if (currentYear < new Date().getFullYear()) {
      setCurrentYear((prevYear) => prevYear + 1);
    }
  };

  const handleViewClick = (entry) => {
    setSingleEntry(entry);
    setViewIncomeModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-10 text-gray-100 relative">
      <main className="mt-8 p-2">
        <div className="bg-gray-800 p-8 rounded-lg flex justify-between items-center mb-8">
          <div className="text-left space-y-3 w-1/3">
            <h2 className="text-5xl font-bold text-cyan-400">Total income</h2>
            <h3 className="text-3xl text-green-300 font-bold">
              {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(incomeValues.reduce((a, b) => a + b, 0))}
            </h3>
            <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
            <h2 className="text-3xl font-bold text-cyan-400">{timePeriod} income</h2>
            <h3 className="text-3xl text-green-300 font-bold">
              {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(incomeValues.reduce((a, b) => a + b, 0))}
            </h3>   
          </div>

          <div className="w-2/4 relative">
            <div className="absolute z-10 bottom--4 left-0 p-2">
              <select
                value={timePeriod}
                onChange={handleTimePeriodChange}
                className="bg-gray-700 px-4 py-2 rounded-full text-cyan-500"
              >
                <option value="Daily">Daily</option>
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

              {timePeriod === "Monthly" && (
                <>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full text-cyan-400 hover:bg-gray-600 transition"
                    style={{ marginLeft: '-60px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <button onClick={handlePrevYear} className="text-cyan-400">
                      <FaChevronLeft />
                    </button>
                  </div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full text-cyan-400 hover:bg-gray-600 transition"
                    style={{ marginRight: '-60px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <button onClick={handleNextYear} className="text-cyan-400">
                      <FaChevronRight />
                    </button>
                  </div>
                </>
              )}

              <Line data={data} options={options} />
            </div>
          </div>
        </div>

        {/* Income History Table */}
        <div className="bg-gray-800 p-10 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-cyan-400">Income History</h3>
            <button onClick={() => {/* Show all logic */}} className="text-cyan-400">
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
              {incomeHistoryData.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-700">
                  <td className="py-2">
                    {new Date(entry.workDate).toLocaleDateString("en-GB")}
                  </td>
                  <td className="py-2">{entry.customerName}</td>
                  <td className="py-2">{entry.vehicleNumber}</td>
                  <td className="py-2">{entry.paymentMethod}</td>
                  <td className="py-2">{entry.contactNumber}</td>
                  <td className="py-2">₹ {entry.totalServiceCost}</td>
                  <td className="py-2">
                    <button
                      onClick={() => handleViewClick(entry)}
                      className="text-cyan-400"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {viewIncomeModal && (
            <ViewIncomeModal
              entry={singleEntry}
              onClose={() => setViewIncomeModal(false)}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default IncomeBody;
