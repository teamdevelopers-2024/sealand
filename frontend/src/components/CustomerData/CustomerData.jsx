import React, { useEffect, useState } from "react";
import AddCustomer from "../Add Customer/AddCustomer"; // Adjust the path according to your file structure
import History from "../History/History";
import PaymentModal from "../Pay Modal/PaymentModal"; // Import the Payment Modal
import CreditForm from "../Credit Form/CreditForm";
import api from "../../services/api";
import searchIcon from "../../assets/searchIcon.svg";
import addCustomerIcon from "../../assets/addCustomerIcon.svg";
import MoreModal from "../moreModal/moreModal";

const CustomerData = () => {
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreditForm, setShowCreditForm] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const customersPerPage = 10; // Number of customers per page
  const [moreModal, setMoreModal] = useState(false)
  const [selectedVehicleNumbers, setSelectedVehicleNumbers] = useState([]);

  const handleMoreClick = (vehicleNumbers) => {
    setSelectedVehicleNumbers(vehicleNumbers);
    setMoreModal(true);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.showCustomers();
        setCustomers(response.data);
        console.log("Customer history", response.data);
      } catch (error) {
        console.error("Error fetching income history data", error);
      }
    };
    fetchCustomers();
  }, [showAddCustomerModal, showPaymentModal, showCreditForm]);

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
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedCustomer(null);
  };

  const handleCreditClick = (customer) => {
    setSelectedCustomer(customer);
    setShowCreditForm(true);
  };

  const closeCreditForm = () => {
    setShowCreditForm(false);
    setSelectedCustomer(null);
  };


  const handleCloseModal = () => {
    setMoreModal(false);
  };


  // Calculate total pages based on customers per page
  const totalPages = Math.ceil(customers.length / customersPerPage);

  // Filter customers based on the search term (for name or phone number)
  const filteredCustomers = customers.filter((customer) => {
    const customerName = customer.customerName.toLowerCase();
    const phoneNumber = customer.phoneNumber ? String(customer.phoneNumber) : "";

    return (
      customerName.includes(searchTerm.toLowerCase()) ||
      phoneNumber.includes(searchTerm)
    );
  });

  // Get the filtered customers for the current page
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * customersPerPage,
    currentPage * customersPerPage
  );

  // Render the component
  return (
    <div className="bg-gray-900 min-h-screen p-10">
      <div className="container p-6 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-teal-400">Customer Data</h1>

          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="bg-[#00BDD6] bg-opacity-10 px-2 border border-[#00BDD6] rounded-lg">
              <div className="flex flex-row">
                <img src={searchIcon} alt="" />
                <input
                  type="text"
                  placeholder="Search customer..."
                  className="w-64 h-10 px-3 rounded bg-transparent text-white outline-none"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Add New Customer Button */}
            <button
              className="flex flex-row bg-[#00A1B7] text-white font-semibold gap-1 px-4 py-2 rounded-md"
              onClick={() => setShowAddCustomerModal(true)}
            >
              <img src={addCustomerIcon} alt="" />
              New Customer
            </button>
          </div>
        </div>

        <div className="overflow-x-auto p-2">
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
              {paginatedCustomers.map((customer, index) => (
                <tr key={index} className="border-t border-gray-600">
                  <td className="px-4 py-2">
                    {new Date(customer.dateOfService).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-2">{customer.customerName}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <p> {customer.vehicleNumber[0]}</p>
                      <p>{customer.vehicleNumber.length > 1 && (
                        <p className="text-blue-600 cursor-pointer" onClick={() => handleMoreClick(customer.vehicleNumber)}>more</p>
                      )}
                      </p>
                    </div>



                  </td>
                  <td className="px-4 py-2">{customer.phoneNumber}</td>
                  <td className="px-4 py-2">₹{customer.creditAmount}</td>
                  <td className="px-4 py-2">₹{customer.paidAmount}</td>
                  <td className="px-4 py-2">
                    ₹{calculateDueAmount(customer.creditAmount, customer.paidAmount)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-md"
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
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center pt-6 font-medium">
                    No Credit Customers...
                  </td>
                </tr>
              )}
            </tbody>

            {moreModal && (
              <div>

              </div>
            )}
          </table>
        </div>

        {/* Pagination Controls */}
        {filteredCustomers.length > 0 && totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-400">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex space-x-2">
              {currentPage > 1 && (
                <button
                  className="px-3 py-1 rounded bg-gray-800 text-gray-300"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1 rounded ${page === currentPage
                    ? "bg-teal-400 text-gray-900"
                    : "bg-gray-800 text-gray-300"
                    }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              {currentPage < totalPages && (
                <button
                  className="px-3 py-1 rounded bg-gray-800 text-gray-300"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
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

      <MoreModal
        isOpen={moreModal}
        onClose={handleCloseModal}
        vehicleNumbers={selectedVehicleNumbers}
      />
    </div>
  );
};

export default CustomerData;
