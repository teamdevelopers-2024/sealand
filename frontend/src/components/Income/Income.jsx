import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// monthly data
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

// weekly data
const weeklyData = [
  { name: "Sun", income: 1500 },
  { name: "Mon", income: 3000 },
  { name: "Tue", income: 4000 },
  { name: "Wed", income: 2500 },
  { name: "Thu", income: 3500 },
  { name: "Fri", income: 5000 },
  { name: "Sat", income: 6000 },
];

// yearly data
const yearlyData = [
  { name: "2016", income: 50000 },
  { name: "2017", income: 60000 },
  { name: "2018", income: 70000 },
  { name: "2019", income: 80000 },
  { name: "2020", income: 90000 },
  { name: "2021", income: 100000 },
  { name: "2022", income: 110000 },
  { name: "2023", income: 120000 },
];

// income history data
const incomeHistoryData = [
  { customerName: "Muhammed Danish", vehicleNumber: "KL 13 A 5672", paymentType: "By UPI", phoneNumber: "8921405362", amount: "₹ 1970" },
  { customerName: "Anjali Mehta", vehicleNumber: "KL 14 B 1234", paymentType: "Cash", phoneNumber: "9876543210", amount: "₹ 2500" },
  { customerName: "Rajesh Kumar", vehicleNumber: "KL 15 C 5678", paymentType: "By Card", phoneNumber: "8765432109", amount: "₹ 3000" },
  { customerName: "Sita Sharma", vehicleNumber: "KL 16 D 1357", paymentType: "By UPI", phoneNumber: "7654321098", amount: "₹ 2800" },
  { customerName: "Rahul Verma", vehicleNumber: "KL 17 E 2468", paymentType: "Cash", phoneNumber: "6543210987", amount: "₹ 1500" },
  { customerName: "Priya Singh", vehicleNumber: "KL 18 F 9876", paymentType: "By Card", phoneNumber: "5432109876", amount: "₹ 4000" },
  { customerName: "Vikram Rao", vehicleNumber: "KL 19 G 5432", paymentType: "By UPI", phoneNumber: "4321098765", amount: "₹ 3700" },
  { customerName: "Ravi Patel", vehicleNumber: "KL 20 H 9876", paymentType: "Cash", phoneNumber: "3210987654", amount: "₹ 2200" },
  { customerName: "Meena Nair", vehicleNumber: "KL 21 I 1357", paymentType: "By Card", phoneNumber: "2109876543", amount: "₹ 3100" },
  { customerName: "Sunil Joshi", vehicleNumber: "KL 22 J 2468", paymentType: "By UPI", phoneNumber: "1098765432", amount: "₹ 1800" },
  { customerName: "Neha Gupta", vehicleNumber: "KL 23 K 1357", paymentType: "Cash", phoneNumber: "0987654321", amount: "₹ 3000" },
  { customerName: "Amit Sharma", vehicleNumber: "KL 24 L 5672", paymentType: "By Card", phoneNumber: "9876543210", amount: "₹ 2400" },
  { customerName: "Rita Banerjee", vehicleNumber: "KL 25 M 1357", paymentType: "By UPI", phoneNumber: "8765432109", amount: "₹ 4200" },
  { customerName: "Kiran Desai", vehicleNumber: "KL 26 N 2468", paymentType: "Cash", phoneNumber: "7654321098", amount: "₹ 1900" },
  { customerName: "Deepak Verma", vehicleNumber: "KL 27 O 9876", paymentType: "By Card", phoneNumber: "6543210987", amount: "₹ 3100" },
  { customerName: "Shalini Reddy", vehicleNumber: "KL 28 P 5432", paymentType: "By UPI", phoneNumber: "5432109876", amount: "₹ 3500" },
  { customerName: "Pawan Yadav", vehicleNumber: "KL 29 Q 1357", paymentType: "Cash", phoneNumber: "4321098765", amount: "₹ 2800" },
  { customerName: "Sneha Malhotra", vehicleNumber: "KL 30 R 2468", paymentType: "By Card", phoneNumber: "3210987654", amount: "₹ 3700" },
  { customerName: "Vijay Kumar", vehicleNumber: "KL 31 S 9876", paymentType: "By UPI", phoneNumber: "2109876543", amount: "₹ 2200" },
  { customerName: "Lakshmi Iyer", vehicleNumber: "KL 32 T 1357", paymentType: "Cash", phoneNumber: "1098765432", amount: "₹ 4000" },
  { customerName: "Gopal Mehta", vehicleNumber: "KL 33 U 2468", paymentType: "By Card", phoneNumber: "0987654321", amount: "₹ 2900" },
];

const Income = () => {
  const [timePeriod, setTimePeriod] = useState("Monthly");
  const [income, setIncome] = useState(106480); // Default for monthly
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const handleTimePeriodChange = (event) => {
    const period = event.target.value;
    setTimePeriod(period);

    // income based on time period
    if (period === "Daily") {
      const today = new Date().toISOString().split("T")[0];
      const dailyIncome = incomeHistoryData
        .filter(entry => entry.date === today)
        .reduce((total, entry) => total + parseInt(entry.amount.replace(/[^\d]/g, '')), 0);
      setIncome(dailyIncome);
    } else if (period === "Weekly") {
      setIncome(24500); // weekly income
    } else if (period === "Monthly") {
      setIncome(106480); // monthly income
    } else if (period === "Yearly") {
      setIncome(120000); // yearly income
    }
  };

  const graphData = 
    timePeriod === "Weekly" ? weeklyData :
    timePeriod === "Yearly" ? yearlyData : monthlyData;

  // entries to display
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = showAll
    ? incomeHistoryData
    : incomeHistoryData.slice(0, 3);

  const pageCount = Math.ceil(incomeHistoryData.length / entriesPerPage);

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
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100 relative">
      {/* Main Content */}
      <main className="mt-8">
        {/* Income Overview */}
        <div className="bg-gray-800 p-6 rounded-lg flex justify-between items-center mb-8">
          <div className="text-left space-y-3 w-1/3">
            <h2 className="text-5xl font-bold text-cyan-400">Total Income</h2>
            <h3 className="text-4xl font-bold">₹ {income}</h3>
            <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
            <h2 className="text-4xl font-bold text-cyan-400">{timePeriod} income</h2>
            <h3 className="text-3xl font-bold">₹ {income}</h3>
            <p className="text-xl text-cyan-400">This {timePeriod.toLowerCase()}: ₹ {income}</p>
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
                    dataKey="income"
                    stroke="#00d8ff"
                    strokeWidth={3}
                    dot={{ stroke: '#00d8ff', strokeWidth: 2 }}
                    activeDot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Income History */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-cyan-400">Income history</h3>
            <button onClick={handleShowAll} className="text-cyan-400">See all</button>
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
              {currentEntries.slice(indexOfFirstEntry, indexOfLastEntry).map((entry, index) => (
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
              <span className="text-gray-500">Page {currentPage} of {pageCount}</span>
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
  );
};

export default Income;
