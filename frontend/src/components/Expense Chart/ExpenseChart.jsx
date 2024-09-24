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
import { useState } from "react";

  // Register Chart.js components
ChartJS.register(
    LineElement,
    CategoryScale,
    PointElement,
    LinearScale,
    Tooltip,
    Legend
  );
  
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

  const ExpenseChart = ({expenseHistoryData}) => {
    const [timePeriod, setTimePeriod] = useState("Monthly");

    const handleTimePeriodChange = (event) => {
        const period = event.target.value;
        setTimePeriod(period);
        if (period === "Monthly") {
          setExpense(106480); // Monthly expense
        }
        // Additional logic for other periods can be added here
      };

    return(
        <>
        <div className="w-2/4 relative">
            <select
              value={timePeriod}
              onChange={handleTimePeriodChange}
              className="bg-gray-700 px-4 py-2 rounded-full text-cyan-500"
            >
              <option value="Daily">Daily</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
            {/* Chart Section */}
            <div
              className="mt-5 relative"
              style={{ width: "600px", height: "300px", marginBottom: "45px" }}
            >
              <Line
                data={{
                  labels: monthlyData.map((data) => data.name),
                  datasets: [
                    {
                      label: "Expenses",
                      data: monthlyData.map((data) => data.expense),
                      borderColor: "#00d8ff",
                      backgroundColor: "rgba(0, 216, 255, 0.2)",
                      borderWidth: 3,
                      tension: 0.1,
                    },
                  ],
                }}
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
            </div>
          </div>
        </>
    )
  }

  export default ExpenseChart;