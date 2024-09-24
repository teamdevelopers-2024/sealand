import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import api from "../../services/api";
import IncomeChart from "../Income Chart/IncomeChart";
import DateRangeModal from "../Pdf Download Modal/DateRangeModal";

const IncomeBody = ({ addIncomeModal }) => {
  const [incomeHistoryData, setIncomeHistoryData] = useState([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("thisMonth");
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Income History", 14, 10);
    // Add your PDF generation logic here
    doc.save("income_history.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-10 text-gray-100 relative">
      <main className="mt-8 p-2">
        <IncomeChart />
        <div className="bg-gray-800 p-10 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-cyan-400">Income History</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-cyan-500 text-white px-4 py-2 rounded-lg">
              Select Dates and Download PDF
            </button>
          </div>
        </div>
      </main>

      {/* Modal for date selection */}
      <DateRangeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTimeFrame={selectedTimeFrame}
        setSelectedTimeFrame={setSelectedTimeFrame}
        customStartDate={customStartDate}
        setCustomStartDate={setCustomStartDate}
        customEndDate={customEndDate}
        setCustomEndDate={setCustomEndDate}
        onDownloadPDF={() => {
          generatePDF();
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default IncomeBody;
