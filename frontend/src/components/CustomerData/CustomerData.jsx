import React, { useState } from "react";
import AddCustomer from "../Add Customer/AddCustomer"; // Adjust the path according to your file structure
import History from "../History/History";
import PaymentModal from "../Pay Modal/PaymentModal"; // Import the Payment Modal
import CreditForm from "../Credit Form/CreditForm";

const CustomerData = () => {
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreditForm, setShowCreditForm] = useState(false); // control for credit form visibility

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
    setShowHistory(true); // specifically show history modal
  };

  const closeHistoryModal = () => {
    setShowHistory(false);
    setSelectedCustomer(null);
  };

  const handlePayClick = (customer) => {
    setSelectedCustomer(customer);
    setShowPaymentModal(true); // specifically show payment modal
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedCustomer(null);
  };

  const handleCreditClick = (customer) => {
    setSelectedCustomer(customer);
    setShowCreditForm(true); // specifically show credit form
  };

  const closeCreditForm = () => {
    setShowCreditForm(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-teal-400">Customer Data</h1>

          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search customer..."
              className="w-64 h-10 px-3 rounded bg-gray-700 text-white"
              onChange={(e) => setSearchTerm(e.target.value)} // Update state to filter customer list
            />

            {/* Add New Customer Button */}
            <button
              className="bg-teal-400 text-gray-900 px-4 py-2 rounded-md"
              onClick={() => setShowAddCustomerModal(true)}
            >
              Add New Customer
            </button>
          </div>
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
                  <td className="px-4 py-2">
                    ₹
                    {calculateDueAmount(
                      customer.creditAmount,
                      customer.paidAmount
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <button className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-md" 
                    onClick={() => handleCreditClick(customer)}
                    >
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
      {selectedCustomer && showPaymentModal && (
        <PaymentModal
          show={showPaymentModal}
          onClose={closePaymentModal}
          customer={selectedCustomer}
        />
      )}

      {/* History Modal */}
      {selectedCustomer && showHistory && (
        <History
          show={showHistory}
          onClose={closeHistoryModal}
          customer={selectedCustomer}
        />
      )}

      {/* Add Customer Modal */}
      {showAddCustomerModal && (
        <AddCustomer
          show={showAddCustomerModal}
          onClose={() => setShowAddCustomerModal(false)}
        />
      )}

      {/* Show Credit Form when a customer is selected */}
      {selectedCustomer && showCreditForm && (
        <CreditForm
          show={showCreditForm}
          customer={selectedCustomer}
          onClose={closeCreditForm}
        />
      )}
    </div>
  );
};

export default CustomerData;
