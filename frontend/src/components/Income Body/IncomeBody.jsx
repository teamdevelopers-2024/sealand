import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import api from "../../services/api";
import ViewIncomeModal from "../View Income/ViewIncomeModal";
import IncomeChart from "../Income Chart/IncomeChart";

const IncomeBody = ({ addIncomeModal }) => {
  const [incomeHistoryData, setIncomeHistoryData] = useState([]);
  const [viewIncomeModal, setViewIncomeModal] = useState(false);
  const [singleEntry, setSingleEntry] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const entriesPerPage = 5;

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

  const filteredEntries = incomeHistoryData
    .filter(
      (entry) =>
        entry.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (entry.contactNumber &&
          entry.contactNumber.toString().includes(searchQuery))
    )
    .sort((a, b) => new Date(b.workDate) - new Date(a.workDate)); // Sort latest first

  // Pagination Logic
  const totalEntries = filteredEntries.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const currentEntries = filteredEntries.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleViewClick = (entry) => {
    setSingleEntry(entry);
    setViewIncomeModal(true);
  };
  const today = new Date();
  incomeHistoryData.forEach((entry) => {
    const entryDate = new Date(entry.date);
    const dayIndex = Math.floor((today - entryDate) / (1000 * 60 * 60 * 24));
    if (dayIndex >= 0 && dayIndex < 7) {
      last7Days[6 - dayIndex] +=
        parseFloat(entry.amount.replace(/[^\d.-]/g, "")) || 0; // Parse amount correctly
    }
  });

  return (
    <div className="min-h-screen bg-gray-900 p-10 text-gray-100 relative">
      <main className="mt-8 p-2">
        <IncomeChart />

        {/* Income History Table */}
        <div className="bg-gray-800 p-10 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-cyan-400">Income History</h3>
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
                <th className="pb-2">Customer name</th>
                <th className="pb-2">Vehicle number</th>
                <th className="pb-2">Payment type</th>
                <th className="pb-2">Phone number</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.length > 0 ? (
                currentEntries.map((entry) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`text-cyan-400 ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaChevronLeft />
              </button>
              <span className="text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`text-cyan-400 ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <FaChevronRight />
              </button>
            </div>
          )}

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
