import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import jsPDF from "jspdf"; 
import api from "../../services/api";
import ViewIncomeModal from "../View Income/ViewIncomeModal";
import IncomeChart from "../Income Chart/IncomeChart";
import PDFDownloadModal from "../PDFDownloadModal/PDFDownloadModal";

const IncomeBody = ({ addIncomeModal }) => {
  const [incomeHistoryData, setIncomeHistoryData] = useState([]);
  const [viewIncomeModal, setViewIncomeModal] = useState(false);
  const [singleEntry, setSingleEntry] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("thisMonth");
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    if (!addIncomeModal) {
      fetchIncomeHistory();
    }
  }, [addIncomeModal]);

  const filteredEntries = () => {
    const today = new Date();
    let filteredData = incomeHistoryData;

    switch (selectedTimeFrame) {
      case "last7Days":
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 7);
        filteredData = incomeHistoryData.filter(entry => 
          new Date(entry.workDate) >= last7Days
        );
        break;
      case "lastMonth":
        const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        filteredData = incomeHistoryData.filter(entry => 
          new Date(entry.workDate) >= lastMonthStart &&
          new Date(entry.workDate) <= lastMonthEnd
        );
        break;
      case "thisMonth":
        const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        filteredData = incomeHistoryData.filter(entry => 
          new Date(entry.workDate) >= startOfThisMonth
        );
        break;
      case "customMonth":
        if (customStartDate && customEndDate) {
          filteredData = incomeHistoryData.filter(entry => 
            new Date(entry.workDate) >= customStartDate &&
            new Date(entry.workDate) <= customEndDate
          );
        }
        break;
      default:
        break;
    }

    return filteredData;
  };

  const generatePDF = (startDate, endDate) => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    
    const headers = ["Date", "Customer Name", "Vehicle Number", "Payment Type", "Phone Number", "Amount"];
    
    const filteredData = incomeHistoryData.filter(entry => {
      const entryDate = new Date(entry.workDate);
      return entryDate >= startDate && entryDate <= endDate;
    });
  
    doc.text("Income History", 14, 10);
    headers.forEach((header, index) => doc.text(header, 14 + (index * 40), 20));
  
    filteredData.forEach((entry, index) => {
      const row = [
        new Date(entry.workDate).toLocaleDateString("en-GB"),
        entry.customerName,
        entry.vehicleNumber,
        entry.paymentMethod,
        entry.contactNumber ? entry.contactNumber.toString() : "",
        `₹ ${entry.totalServiceCost}`
      ];
      row.forEach((cell, cellIndex) => {
        doc.text(cell.toString(), 14 + (cellIndex * 40), 30 + (index * 10));
      });
    });
  
    doc.save("income_history.pdf");
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

  return (
    <div className="min-h-screen bg-gray-900 p-10 text-gray-100 relative">
      <main className="mt-8 p-2">
        <IncomeChart incomeHistoryData={incomeHistoryData}  setIsModalOpen = {setIsModalOpen}/>

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
              {paginatedEntries.length > 0 ? (
                paginatedEntries.map((entry) => (
                  <tr key={entry.id} className="border-b border-gray-700">
                    <td className="py-2">{new Date(entry.workDate).toLocaleDateString("en-GB")}</td>
                    <td className="py-2">{entry.customerName}</td>
                    <td className="py-2">{entry.vehicleNumber}</td>
                    <td className="py-2">{entry.paymentMethod}</td>
                    <td className="py-2">{entry.contactNumber}</td>
                    <td className="py-2">₹ {entry.totalServiceCost}</td>
                    <td className="py-2">
                      <button onClick={() => handleViewClick(entry)} className="text-cyan-400">View</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">No data available</td>
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
                className={`text-cyan-400 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <FaChevronLeft />
              </button>
              <span className="text-gray-300">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`text-cyan-400 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
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

      <PDFDownloadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        customStartDate={customStartDate} 
        setCustomStartDate={setCustomStartDate} 
        customEndDate={customEndDate} 
        setCustomEndDate={setCustomEndDate} 
        generatePDF={generatePDF} 
      />
    </div>
  );
};

export default IncomeBody;
