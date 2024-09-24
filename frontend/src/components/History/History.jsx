import React from 'react';
import jsPDF from "jspdf";
import imgData from "../../assets/logocropped.jpg";

const History = ({ show, onClose, customer }) => {
  if (!show) return null;

    const generatePDF = () => {
    
      const doc = new jsPDF();
  
  
      // Add Shop Logo at the top (optional)
      doc.addImage(imgData, 'PNG', 10, 10, 50, 20); // Adjust the dimensions accordingly
  
      // Add Shop Name and Address
      doc.setFontSize(12);
      doc.text('Sea Land Car Care', 80, 20); // Center-aligned shop name
      doc.text('Kuttalur, State Highway 72, Oorakam, Kerala 676304', 80, 25);
      doc.text('Phone: +91 12345 67890', 80, 30);
  
      // Add a separator line
      doc.line(10, 35, 200, 35);
  
      // Add Invoice Date and Number
      doc.setFontSize(10);
      doc.text(`Date: ${new Date(customer.dateOfService).toLocaleDateString()}`, 10, 40);
  
      // Add Customer Information
      doc.setFontSize(12);
      doc.text(`Customer:${customer.customerName}`, 10, 50);
      doc.text(`Phone: ${customer.phoneNumber}`, 10, 60);
  
      // Add a separator line
      doc.line(10, 65, 200, 65);
  
      // Add table headers for items (compact)
      doc.setFontSize(12);
      doc.setFont('bold');
      doc.text('No.', 10, 72);
      doc.text('Description', 20, 72);
      doc.text('Amount', 160, 72); 
  
      // Add a separator line
      doc.line(10, 75, 200, 75);
  
      // Add table rows for items with index numbers
      doc.setFont('normal');
      customer.workDetails.forEach((item, index) => {
          const yOffset = 80 + (index * 10); // Adjust row height for each item
          doc.text(`${index + 1}`, 10, yOffset); // Index number
          doc.text(`${item.description}`, 20, yOffset); // Description
          doc.text(`${parseFloat(item.amount).toLocaleString()}`, 160, yOffset); // Amount with ₹ symbol
      });
  
      // Add a separator line after the items
      const itemsEndY = 80 + (customer.workDetails.length * 10);
      doc.line(10, itemsEndY + 5, 200, itemsEndY + 5);
  
      // Add Total
      doc.setFont('bold');
      doc.text('Total:', 140, itemsEndY + 15);
      doc.text(`${parseFloat(customer.workDetails).toLocaleString()}`, 160, itemsEndY + 15); // Total with ₹ symbol
  
      // Add a separator line
      doc.line(10, itemsEndY + 20, 200, itemsEndY + 20);
  
      // Add Footer (Thank You Note, etc.)
      doc.setFont('normal');
      doc.text('Thank you for your visit!', 70, itemsEndY + 30);
      doc.text('Visit us again!', 80, itemsEndY + 35);
  
      // Save the PDF
      doc.save('receipt.pdf');
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-gray-800 text-gray-300 rounded-lg w-full max-w-3xl p-6">
        <h2 className="text-xl font-bold mb-4">Transaction History - {customer.customerName}</h2>
        
        {/* Table structure for history */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left text-gray-300">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Vehicle number</th>
                <th className="px-4 py-2">Phone number</th>
                <th className="px-4 py-2">Payment type</th>
                <th className="px-4 py-2">Paid amount</th>
                <th className="px-4 py-2">Reciept</th>
              </tr>
            </thead>
            <tbody className="bg-gray-700">
              <tr className="border-t border-gray-600">
                <td className="px-4 py-2">{new Date(customer.dateOfService).toLocaleDateString("en-GB")}</td>
                <td className="px-4 py-2">{customer.vehicleNumber}</td>
                <td className="px-4 py-2">{customer.phoneNumber}</td>
                <td className="px-4 py-2">By UPI</td>
                <td className="px-4 py-2">{customer.paidAmount}</td>
                <td className="px-4 py-2">
                    
                    <button onClick={() => generatePDF()} className="bg-teal-400 text-gray-900 px-4 py-1 rounded-md ml-2">
                      Download
                    </button>
                  </td>
              </tr>
              {/* Add more rows here if the customer has more transactions */}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-teal-400 text-gray-900 px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;
