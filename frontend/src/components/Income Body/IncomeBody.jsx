import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import api from "../../services/api";
import ViewIncomeModal from "../View Income/ViewIncomeModal";
import IncomeChart from "../Income Chart/IncomeChart";
import PDFDownloadModal from "../PDFDownloadModal/PDFDownloadModal";
import SpinnerOnly from "../spinnerOnly/SpinnerOnly";

const IncomeBody = ({ addIncomeModal }) => {
  const [incomeHistoryData, setIncomeHistoryData] = useState([]);
  const [viewIncomeModal, setViewIncomeModal] = useState(false);
  const [singleEntry, setSingleEntry] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const entriesPerPage = 5;

  useEffect(() => {
    const fetchIncomeHistory = async () => {
      setIsLoading(true); // Set loading to true
      try {
        const response = await api.showIncome();
        const sortedData = response.data.sort(
          (a, b) => new Date(b.workDate) - new Date(a.workDate)
        );
        setIncomeHistoryData(sortedData);
        console.log(sortedData); // Log sorted data
      } catch (error) {
        console.error("Error fetching income history data", error);
      } finally {
        setIsLoading(false); // Set loading to false
      }
    };
    if (!addIncomeModal) {
      fetchIncomeHistory();
    }
  }, [addIncomeModal]);

  const filteredEntries = () => {
    const today = new Date();
    let filteredData = incomeHistoryData;

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filteredData = filteredData.filter(
        (entry) =>
          entry.customerName.toLowerCase().includes(lowerCaseQuery) ||
          entry.contactNumber.toString().includes(lowerCaseQuery)
      );
    }

    return filteredData;
  };

  const currentEntries = filteredEntries();
  const totalEntries = currentEntries.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const paginatedEntries = currentEntries.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleViewClick = (entry) => {
    setSingleEntry(entry);
    setViewIncomeModal(true);
  };

  const downloadTablePDF = () => {
    const doc = new jsPDF();
    doc.text("Income History", 20, 20);
    // Add more PDF generation logic here...
    doc.save("income_history.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-10 text-gray-100 relative">
      <main className="mt-8 p-2">
        <IncomeChart
          incomeHistoryData={incomeHistoryData}
          isLoading={isLoading}
          setIsModalOpen={setIsModalOpen}
        />

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
            <button
              onClick={downloadTablePDF}
              className="flex items-center bg-cyan-400 text-gray-900 px-4 py-2 rounded-lg"
            >
              <FaFilePdf className="mr-2" />
              Download PDF
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
              {isLoading ? ( // Show loading indicator
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">
                    <SpinnerOnly/>
                  </td>
                </tr>
              ) : paginatedEntries.length > 0 ? (
                paginatedEntries.map((entry) => (
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

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-cyan-400 text-gray-900 px-4 py-2 rounded-lg"
            >
              <FaChevronLeft />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-cyan-400 text-gray-900 px-4 py-2 rounded-lg"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </main>

      {/* Modals */}
      {viewIncomeModal && (
        <ViewIncomeModal
          isOpen={viewIncomeModal}
          onClose={() => setViewIncomeModal(false)}
          entry={singleEntry}
        />
      )}
      {isModalOpen && <PDFDownloadModal />}
    </div>
  );
};

export default IncomeBody;
