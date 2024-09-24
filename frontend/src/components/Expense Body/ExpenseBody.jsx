import React, { useEffect, useState } from "react";
import api from "../../services/api";

import ExpenseModal from "../View Expense/ExpenseModal";
import ExpenseChart from "../Expense Chart/ExpenseChart";



const Expense = ({addExpenseModal}) => {
  const [timePeriod, setTimePeriod] = useState("Monthly");
  const [expense, setExpense] = useState(106480); // Default for monthly
  const [currentPage, setCurrentPage] = useState(1);
  const [expenseHistoryData, setExpenseHistoryData] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const entriesPerPage = 5;

  useEffect(() => {


    const fetchExpenseHistory = async () => {

      try {
        const response = await api.showExpense();
        setExpenseHistoryData(response.data);
      } catch (error) {
        console.error("Error fetching expense history data", error);
      }
    };

    if(addExpenseModal==false){
      fetchExpenseHistory();
    }
      
    
  }, [addExpenseModal]);


 


  const handleViewExpense = (entry) => {
    setSelectedExpense(entry);
    setIsModalOpen(true);
  };

  

  // Filter entries based on search query
  const filteredEntries = expenseHistoryData
    .filter((entry) =>
      entry.payeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.contactNumber && entry.contactNumber.toString().includes(searchQuery))
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort latest first

  // Calculate entries to display
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);
  const pageCount = Math.ceil(filteredEntries.length / entriesPerPage);

  return (
    <div className="min-h-screen bg-gray-900 p-10 text-gray-100 relative">
      <main className="mt-8 p-2">
        {/* Total Expense Section */}
        <div className="bg-gray-800 p-8 rounded-lg flex justify-between  items-center mb-8">
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
          </div>

          <ExpenseChart expenseHistoryData={expenseHistoryData}/>
        </div>

        <div className="bg-gray-800 p-10 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-cyan-400">Expense History</h3>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or phone"
              className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg"
            />
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
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              ) : (
                currentEntries.map((entry, index) => (
                  <tr key={index} className="border-t border-gray-700">
                    <td className="py-4">
                      {new Date(entry.date).toLocaleDateString("en-GB")}
                    </td>
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
                      <button
                        onClick={() => handleViewExpense(entry)}
                        className="bg-cyan-400 text-gray-900 px-3 py-1 rounded"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {filteredEntries.length > 0 && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1} // Disable if on the first page
                className={`bg-cyan-400 px-4 py-2 rounded-lg ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                &#8592;
              </button>
              <span className="text-gray-500">
                Page {currentPage} of {pageCount}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
                disabled={currentPage === pageCount} // Disable if on the last page
                className={`bg-cyan-400 px-4 py-2 rounded-lg ${
                  currentPage === pageCount ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                &#8594;
              </button>
            </div>
          )}
        </div>

        {/* Modal for Viewing Expense */}
        <ExpenseModal
          isOpen={isModalOpen}
          expense={selectedExpense}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    </div>
  );
};

export default Expense;