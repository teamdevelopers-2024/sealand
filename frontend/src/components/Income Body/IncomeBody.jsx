import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import api from "../../services/api";
import ViewIncomeModal from "../View Income/ViewIncomeModal";
import IncomeChart from "../Income Chart/IncomeChart";
import PDFDownloadModal from "../PDFDownloadModal/PDFDownloadModal";
import SpinnerOnly from "../spinnerOnly/SpinnerOnly";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import swal from "sweetalert";

const IncomeBody = ({ addIncomeModal }) => {
  const [incomeHistoryData, setIncomeHistoryData] = useState([]);
  const [viewIncomeModal, setViewIncomeModal] = useState(false);
  const [singleEntry, setSingleEntry] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isUpdating , setIsUpdating] = useState(false)
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
  }, [addIncomeModal , isUpdating]);

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

  // const generatePDF = (
  //   startDate,
  //   endDate,
  //   selectedOption,
  //   selectedMonth,
  //   selectedYear
  // ) => {
  //   const doc = new jsPDF();
  //   doc.setFontSize(12);

  //   // Adjust endDate to include the entire day
  //   endDate.setHours(23, 59, 59, 999); // Set to the end of the day

  //   // Dynamic title based on selected options
  //   let title;
  //   if (selectedOption === "monthly") {
  //     title = `Income History for ${new Date(
  //       selectedYear,
  //       selectedMonth - 1
  //     ).toLocaleString("default", { month: "long" })} ${selectedYear}`;
  //   } else if (selectedOption === "yearly") {
  //     title = `Income History for ${selectedYear}`;
  //   } else {
  //     title = `Income History from ${startDate.toLocaleDateString("en-IN")} to ${endDate.toLocaleDateString("en-IN")}`;
  //   }

  //   const headers = [
  //     "Date",
  //     "Name",
  //     "Vehicle Number",
  //     "Phone Number",
  //     "UPI",
  //     "Cash",
  //   ];

  //   const filteredData = incomeHistoryData.filter((entry) => {
  //     const entryDate = new Date(entry.workDate);
  //     return entryDate >= startDate && entryDate <= endDate;
  //   });

  //   // Set column widths
  //   const columnWidths = [28, 25, 60, 35, 25, 25]; // Adjust these widths as needed

  //   // Add title
  //   if (typeof title === "string") {
  //     doc.text(title, 75, 10);
  //   }

  //   headers.forEach((header, index) => {
  //     const xPosition = 10 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
  //     if (typeof header === "string") {
  //       doc.text(header, xPosition, 25);
  //     }
  //   });

  //   // Add a separator line
  //   doc.line(10, 30, 200, 30);

  //   let totalUPI = 0;
  //   let totalCash = 0;

  //   filteredData.forEach((entry, index) => {
  //     const entryDate = new Date(entry.workDate).toLocaleDateString("en-GB");
  //     const upiAmount = (entry.paymentMethod === "UPI" || entry.paymentMethod === 'Repaid-UPI') ? entry.totalServiceCost.toFixed(2) : "";
  //     const cashAmount = (entry.paymentMethod === "Cash" || entry.paymentMethod === 'Repaid-Cash') ? entry.totalServiceCost.toFixed(2) : "";

  //     const row = [
  //       entryDate,
  //       entry.customerName,
  //       entry.vehicleNumber,
  //       entry.contactNumber ? entry.contactNumber.toString() : "",
  //       upiAmount,
  //       cashAmount,
  //     ];

  //     // Accumulate totals based on payment method
  //     if (entry.paymentMethod === "UPI" || entry.paymentMethod === 'Repaid-UPI') {
  //       totalUPI += entry.totalServiceCost || 0; // Accumulate total UPI
  //     } else if (entry.paymentMethod === "Cash" || entry.paymentMethod === 'Repaid-Cash') {
  //       totalCash += entry.totalServiceCost || 0; // Accumulate total Cash
  //     }

  //     row.forEach((cell, cellIndex) => {
  //       const xPosition = 10 + columnWidths.slice(0, cellIndex).reduce((a, b) => a + b, 0);
  //       if (typeof cell === "string") {
  //         doc.text(cell, xPosition, 35 + index * 10);
  //       }
  //     });
  //   });

  //   // Add total calculations at the end
  //   const totalRowYPosition = 35 + filteredData.length * 10;

  //   // Add a separator line
  //   doc.line(10, totalRowYPosition, 200, totalRowYPosition);
  //   const totalIncome = totalUPI + totalCash;

  //   // Position for total income
  //   doc.text(`Total Income (UPI): ${totalUPI.toFixed(2)}`, 130, totalRowYPosition + 10);
  //   doc.text(`Total Income (Cash): ${totalCash.toFixed(2)}`, 130, totalRowYPosition + 20);
  //   doc.text(`Total Income (Overall): ${totalIncome.toFixed(2)}`, 130, totalRowYPosition + 30);

  //   const fileName = (() => {
  //     if (selectedOption === "custom") {
  //       return `income_history_${startDate.toLocaleDateString("en-GB")}_to_${endDate.toLocaleDateString("en-GB")}.pdf`;
  //     } else if (selectedOption === "yearly") {
  //       return `income_history_${selectedYear}.pdf`;
  //     } else {
  //       // monthly
  //       return `income_history_${new Date(
  //         selectedYear,
  //         selectedMonth - 1
  //       ).toLocaleString("default", { month: "long" })}_${selectedYear}.pdf`;
  //     }
  //   })();

  //   doc.save(fileName);
  // };



  const generatePDF = (startDate, endDate, selectedOption, selectedMonth, selectedYear) => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    // Adjust endDate to include the entire day
    endDate.setHours(23, 59, 59, 999);

    // Dynamic title based on selected options
    let title;
    if (selectedOption === "monthly") {
      title = `Income History for ${new Date(selectedYear, selectedMonth - 1).toLocaleString("default", { month: "long" })} ${selectedYear}`;
    } else if (selectedOption === "yearly") {
      title = `Income History for ${selectedYear}`;
    } else {
      title = `Income History from ${startDate.toLocaleDateString("en-IN")} to ${endDate.toLocaleDateString("en-IN")}`;
    }

    const headers = [
      "Date",
      "Name",
      "Vehicle Number",
      "Phone Number",
      "UPI",
      "Cash",
    ];

    const filteredData = incomeHistoryData.filter((entry) => {
      const entryDate = new Date(entry.workDate);
      return entryDate >= startDate && entryDate <= endDate;
    });

    // Set column widths
    const columnWidths = [28, 25, 60, 35, 25, 25];
    const rowHeight = 10; // Height of each row
    const marginTop = 35; // Margin from top for the first row
    const pageHeight = doc.internal.pageSize.height;

    // Add title
    if (typeof title === "string") {
      doc.text(title, 75, 10);
    }

    // Add headers
    headers.forEach((header, index) => {
      const xPosition = 10 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
      if (typeof header === "string") {
        doc.text(header, xPosition, marginTop);
      }
    });

    // Add a separator line
    doc.line(10, marginTop + 5, 200, marginTop + 5);

    let totalUPI = 0;
    let totalCash = 0;
    let currentYPosition = marginTop + 10;

    filteredData.forEach((entry, index) => {
      if (currentYPosition + rowHeight > pageHeight) {
        doc.addPage(); // Start a new page if we exceed the height
        currentYPosition = marginTop + 10; // Reset position
        // Re-add headers on new page
        headers.forEach((header, index) => {
          const xPosition = 10 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
          doc.text(header, xPosition, currentYPosition);
        });
        // Add a separator line
        doc.line(10, currentYPosition + 5, 200, currentYPosition + 5);
        currentYPosition += 10; // Move down after headers
      }

      const entryDate = new Date(entry.workDate).toLocaleDateString("en-GB");
      const upiAmount = (entry.paymentMethod === "UPI" || entry.paymentMethod === 'Repaid-UPI') ? entry.totalServiceCost.toFixed(2) : "";
      const cashAmount = (entry.paymentMethod === "Cash" || entry.paymentMethod === 'Repaid-Cash') ? entry.totalServiceCost.toFixed(2) : "";

      const row = [
        entryDate,
        entry.customerName,
        entry.vehicleNumber,
        entry.contactNumber ? entry.contactNumber.toString() : "",
        upiAmount,
        cashAmount,
      ];
      // Accumulate totals based on payment method
      if (entry.paymentMethod === "UPI" || entry.paymentMethod === 'Repaid-UPI') {
        totalUPI += entry.totalServiceCost || 0; // Accumulate total UPI
      } else if (entry.paymentMethod === "Cash" || entry.paymentMethod === 'Repaid-Cash') {
        totalCash += entry.totalServiceCost || 0; // Accumulate total Cash
      }

      row.forEach((cell, cellIndex) => {
        const xPosition = 10 + columnWidths.slice(0, cellIndex).reduce((a, b) => a + b, 0);
        if (typeof cell === "string") {
          doc.text(cell, xPosition, currentYPosition);
        }
      });

      currentYPosition += rowHeight; // Move down for the next row
    });

    // Add total calculations at the end
    const totalRowYPosition = currentYPosition;

    // Add a separator line
    doc.line(10, totalRowYPosition, 200, totalRowYPosition);
    const totalIncome = totalUPI + totalCash;

    // Position for total income
    doc.text(`Total Income(UPI): ${ totalUPI.toFixed(2) }`, 130, totalRowYPosition + 10);
    doc.text(`Total Income(Cash): ${ totalCash.toFixed(2) }`, 130, totalRowYPosition + 20);
    doc.text(`Total Income(Overall): ${ totalIncome.toFixed(2) }`, 130, totalRowYPosition + 30);

    const fileName = (() => {
      if (selectedOption === "custom") {
        return `income_history_${ startDate.toLocaleDateString("en-GB") }_to_${ endDate.toLocaleDateString("en-GB") }.pdf`;
      } else if (selectedOption === "yearly") {
        return `income_history_${ selectedYear }.pdf`;
      } else {
        // monthly
        return `income_history_${ new Date(selectedYear, selectedMonth - 1).toLocaleString("default", { month: "long" }) }_${ selectedYear }.pdf`;
      }
    })();

    doc.save(fileName);
  };



  const hanldeDelete = async (id)=>{
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });
      if(!result.isConfirmed){
        return
      }

      setIsLoading(true)
      const response = await api.deleteIncome(id)
      if(!response.error){
        swal("Success", `income deleted successfully`, "success");
      }else{
        swal("Error","error deleting income",'error')
      }
      setIsUpdating(!isUpdating)
    } catch (error) {
      console.log(error)
      swal("Error","error deleting income",'error')
    } finally {
      setIsLoading(false)
    }
  }




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
                <th className="pb-2">Delete</th>
                <th className="pb-2">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? ( // Show loading indicator
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">
                    <SpinnerOnly />
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
                        <button onClick={() => hanldeDelete(entry._id)} className="text-red-500 hover:text-red-700">
                          <FaTrash size={18} />
                        </button>
                      </td>
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
          {/* Pagination */}
          {paginatedEntries.length > 0 && (
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
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="bg-cyan-400 text-gray-900 px-4 py-2 rounded-lg"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
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
      {isModalOpen && (
        <PDFDownloadModal
          generatePDF={generatePDF}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default IncomeBody;
