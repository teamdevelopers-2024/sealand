import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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

// Register Chart.js components
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
  );
  
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

function IncomeChart() {
    const [incomeHistoryData, setIncomeHistoryData] = useState([]);
    const [timePeriod, setTimePeriod] = useState("Monthly");
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());


  const handleTimePeriodChange = (event) => {
    const period = event.target.value;
    setTimePeriod(period);
    if (period !== "Monthly") {
      setCurrentYear(new Date().getFullYear()); // Reset to current year when switching from Monthly
    }
  };

  const getMonthlyData = () => {
    const monthlyIncome = Array(12).fill(0);
    const currentYearData = incomeHistoryData.filter(
      (entry) => new Date(entry.date).getFullYear() === currentYear
    );

    currentYearData.forEach((entry) => {
      const entryDate = new Date(entry.date);
      const month = entryDate.getMonth();
      monthlyIncome[month] +=
        parseFloat(entry.amount.replace(/[^\d.-]/g, "")) || 0; // Parse amount correctly
    });

    return monthlyIncome.map((income, index) => ({
      name: new Date(0, index).toLocaleString("default", { month: "short" }),
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
      const dayName = date.toLocaleString("default", { weekday: "short" });
      labels.push(dayName);
    }

    incomeHistoryData.forEach((entry) => {
      const entryDate = new Date(entry.date);
      const dayIndex = Math.floor((today - entryDate) / (1000 * 60 * 60 * 24));
      if (dayIndex >= 0 && dayIndex < 7) {
        last7Days[6 - dayIndex] +=
          parseFloat(entry.amount.replace(/[^\d.-]/g, "")) || 0; // Parse amount correctly
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

    incomeHistoryData.forEach((entry) => {
      const entryDate = new Date(entry.date);
      const yearIndex = entryDate.getFullYear() - (currentYear - 4);
      if (yearIndex >= 0 && yearIndex < 5) {
        yearlyIncome[yearIndex] +=
          parseFloat(entry.amount.replace(/[^\d.-]/g, "")) || 0; // Parse amount correctly
      }
    });

    return labels.map((label, index) => ({
      name: label,
      income: yearlyIncome[index],
    }));
  };

  const graphData =
    timePeriod === "Monthly"
      ? getMonthlyData()
      : timePeriod === "Daily"
      ? getDailyData()
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
  return (
    <>
      <div className="bg-gray-800 p-8 rounded-lg flex justify-between items-center mb-8">
        <div className="text-left space-y-3 w-1/3">
          <h2 className="text-5xl font-bold text-cyan-400">Total income</h2>
          <h3 className="text-3xl text-green-300 font-bold">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(incomeValues.reduce((a, b) => a + b, 0))}
          </h3>
          <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
          <h2 className="text-3xl font-bold text-cyan-400">
            {timePeriod} income
          </h2>
          <h3 className="text-3xl text-green-300 font-bold">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(incomeValues.reduce((a, b) => a + b, 0))}
          </h3>
          <button className="relative top-16">Download</button>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default IncomeChart;
