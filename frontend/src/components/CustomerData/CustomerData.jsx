import React, { useState } from "react";
import History from "../History/History";
import PaymentModal from "../Pay Modal/PaymentModal"; // Import the Payment Modal

const CustomerData = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Customer data with creditAmount and paidAmount
  const customers = [
    {
      date: "10-12-2024",
      name: "Sinan",
      vehicleNumber: "KL 13 A 5672",
      phoneNumber: "8921405362",
      creditAmount: 4660,
      paidAmount: 1970,
    },
    {
      date: "10-12-2024",
      name: "Dilshad",
      vehicleNumber: "KL 19 A 0505",
      phoneNumber: "9632587459",
      creditAmount: 5600,
      paidAmount: 2300,
    },
    // Add other customer rows as necessary
  ];

  // Function to calculate the due amount
  const calculateDueAmount = (creditAmount, paidAmount) => {
    return creditAmount - paidAmount;
  };

  const handleViewClick = (customer) => {
    setSelectedCustomer(customer); 
    setShowHistory(true); 
  };

  const closeHistoryModal = () => {
    setShowHistory(false);
    setSelectedCustomer(null); 
  };

  const handlePayClick = (customer) => {
    setSelectedCustomer(customer); 
    setShowPaymentModal(true); // Show the Payment Modal
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedCustomer(null); 
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-teal-400">Customer Data</h1>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left text-gray-300">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Vehicle number</th>
                <th className="px-4 py-2">Phone number</th>
                <th className="px-4 py-2">Credit amount</th>
                <th className="px-4 py-2">Paid amount</th>
                <th className="px-4 py-2">Due amount</th>
                <th className="px-4 py-2">Credit / Repayment</th>
                <th className="px-4 py-2">History</th>
              </tr>
            </thead>
            <tbody className="bg-gray-700">
              {customers.map((customer, index) => (
                <tr key={index} className="border-t border-gray-600">
                  <td className="px-4 py-2">{customer.date}</td>
                  <td className="px-4 py-2">{customer.name}</td>
                  <td className="px-4 py-2">{customer.vehicleNumber}</td>
                  <td className="px-4 py-2">{customer.phoneNumber}</td>
                  <td className="px-4 py-2">₹{customer.creditAmount}</td>
                  <td className="px-4 py-2">₹{customer.paidAmount}</td>
                  {/* Calculating due amount */}
                  <td className="px-4 py-2">₹{calculateDueAmount(customer.creditAmount, customer.paidAmount)}</td>
                  <td className="px-4 py-2">
                    <button className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-md">
                      Credit
                    </button>
                    <button
                      className="bg-teal-400 text-gray-900 px-4 py-1 rounded-md ml-2"
                      onClick={() => handlePayClick(customer)}
                    >
                      Pay
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-gray-600 text-gray-300 px-4 py-1 rounded-md"
                      onClick={() => handleViewClick(customer)}
                    >
                      See history
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-400">2 of 13 Pages</p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 rounded bg-gray-800 text-gray-300">
              1
            </button>
            <button className="px-3 py-1 rounded bg-teal-400 text-gray-900">
              2
            </button>
            <button className="px-3 py-1 rounded bg-gray-800 text-gray-300">
              3
            </button>
            <button className="px-3 py-1 rounded bg-gray-800 text-gray-300">
              ...
            </button>
            <button className="px-3 py-1 rounded bg-gray-800 text-gray-300">
              13
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedCustomer && (
        <PaymentModal
          show={showPaymentModal}
          onClose={closePaymentModal}
          customer={selectedCustomer}
        />
      )}

      {/* History Modal */}
      {selectedCustomer && (
        <History
          show={showHistory}
          onClose={closeHistoryModal}
          customer={selectedCustomer}
        />
      )}
    </div>
  );
};

export default CustomerData;
