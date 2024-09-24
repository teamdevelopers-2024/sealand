import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  } from "chart.js";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

  // Register Chart.js components
ChartJS.register(
    LineElement,
    CategoryScale,
    PointElement,
    LinearScale,
    Tooltip,
    Legend
  );
 
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-11
  const currentYear = currentDate.getFullYear();

function ExpenseChart({expenseHistoryData}) {
    const [timePeriod, setTimePeriod] = useState("Monthly");
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [totalExpense,setTotalExpense]=useState('')
    const [totalExpensemonth,setTotalExpensemonth]=useState('')
    
    useEffect(() => {

      const total = expenseHistoryData.reduce((accumulator, entry) => {      
        const expenseCost = entry.totalExpense
        return accumulator + expenseCost;
      }, 0);
      const totalExpenseThisMonth = expenseHistoryData.reduce((total, entry) => {
        const workDate = new Date(entry.date);
        
        // Check if the workDate is in the current month and year
        if (workDate.getMonth() === currentMonth && workDate.getFullYear() === currentYear) {
          // Parse the totalExpense and add it to the total
          const expenseCost = entry.totalExpense
          return total + expenseCost; // Accumulate the total
        }
        return total; // If not, return the total unchanged
      }, 0);// Sum them up

  setTotalExpensemonth(totalExpenseThisMonth) 
    setTotalExpense(total)   
    }, [expenseHistoryData])
    


  const handleTimePeriodChange = (event) => {
    const period = event.target.value;
    setTimePeriod(period);
    if (period !== "Monthly") {
      setCurrentYear(new Date().getFullYear()); // Reset to current year when switching from Monthly
    }
  };

  const getMonthlyData = () => {
    const monthlyExpense = Array(12).fill(0);
    const currentYearData = expenseHistoryData.filter(
      (entry) => new Date(entry.date).getFullYear() === currentYear
    );

    currentYearData.forEach((entry) => {
      const entryDate = new Date(entry.date);
      const month = entryDate.getMonth();
      monthlyExpense[month] += entry.totalExpense|| 0; // Parse amount correctly
    });

    return monthlyExpense.map((expense, index) => ({
      name: new Date(0, index).toLocaleString("default", { month: "short" }),
      expense,
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

    expenseHistoryData.forEach((entry) => {
      const entryDate = new Date(entry.date);
      const dayIndex = Math.floor((today - entryDate) / (1000 * 60 * 60 * 24));
      if (dayIndex >= 0 && dayIndex < 7) {
        last7Days[6 - dayIndex] += entry.totalExpense || 0; // Parse amount correctly
      }
    });

    return labels.map((label, index) => ({
      name: label,
      expense: last7Days[index],
    }));
  };

  const getYearlyData = () => {
    const yearlyexpense = Array(5).fill(0);
    const labels = [];

    for (let i = 0; i < 5; i++) {
      const year = currentYear - 4 + i; // Generate years from currentYear - 4 to currentYear
      labels.push(year);
    }

    expenseHistoryData.forEach((entry) => {
      const entryDate = new Date(entry.date);
      const yearIndex = entryDate.getFullYear() - (currentYear - 4);
      if (yearIndex >= 0 && yearIndex < 5) {
        yearlyexpense[yearIndex] += entry.totalExpense || 0;
      }
    });

    return labels.map((label, index) => ({
      name: label,
      expense: yearlyexpense[index],
    }));
  };

  const graphData =
    timePeriod === "Monthly"
      ? getMonthlyData()
      : timePeriod === "Daily"
      ? getDailyData()
      : getYearlyData();

  const labels = graphData.map((data) => data.name);
  const expenseValues = graphData.map((data) => data.expense);

  const data = {
    labels,
    datasets: [
      {
        label: "expense",
        data: expenseValues,
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
    return(
        <>
        <div className="bg-gray-800 p-8 rounded-xl flex justify-between items-center mb-8">
        <div className="text-left space-y-3 w-1/3">
          <h2 className="text-5xl font-bold text-cyan-400">Total expense</h2>
          <h3 className="text-3xl text-green-300 font-bold">
            {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(totalExpense)}
          </h3>
          <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
          <h2 className="text-3xl font-bold text-cyan-400">
            {timePeriod} expense
          </h2>
          <h3 className="text-3xl text-green-300 font-bold">
            {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(totalExpensemonth)}
          </h3>
          <button className="relative top-16">Download</button>
        </div>

        <div className="w-2/4 relative">
          <div className="absolute z-10 bottom--4 left-0 p-2">
            <div className="bg-gray-700 px-1.5 py-1.5 rounded-full text-cyan-500">

            <select
              value={timePeriod}
              onChange={handleTimePeriodChange}
              className="bg-gray-700 rounded-full text-cyan-500 outline-none"
            >
              <option value="Daily">Daily</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
            </div>
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
    )
  }

  export default ExpenseChart;