import React, { useState } from "react";
import { FaTrash } from "react-icons/fa"; // Import the delete icon
import api from "../../services/api";

const AddCustomer = ({ show, onClose }) => {
  const [dateOfService, setDateOfService] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [workDetails, setWorkDetails] = useState([
    { description: "", amount: "", reference: "" },
  ]);

  const handleAddField = () => {
    setWorkDetails([
      ...workDetails,
      { description: "", amount: "", reference: "" },
    ]);
  };

  const handleWorkDetailChange = (index, field, value) => {
    const updatedDetails = [...workDetails];
    updatedDetails[index][field] = value;
    setWorkDetails(updatedDetails);
  };

  const handleDeleteField = (index) => {
    const updatedDetails = workDetails.filter((_, i) => i !== index);
    setWorkDetails(updatedDetails);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Data to be sent to the backend
    const formData = {
      dateOfService,
      customerName,
      vehicleNumber,
      phoneNumber,
      paymentMethod,
      creditAmount,
      workDetails,
    };

    const response = await api.addcustomer(formData);
    console.log('Response:', response);
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-[700px] shadow-lg rounded-md bg-gray-800">
        <h3 className="text-lg text-teal-400 font-bold mb-4">Add Customer</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">
                Date of Service
              </label>
              <input
                type="date"
                className="w-full h-10 px-3 rounded bg-gray-700 text-white"
                value={dateOfService}
                onChange={(e) => setDateOfService(e.target.value)}
                placeholder="Car care date"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Customer Name</label>
              <input
                type="text"
                placeholder="Customer name"
                className="w-full h-10 px-3 rounded bg-gray-700 text-white"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Vehicle Number</label>
              <input
                type="text"
                placeholder="Vehicle number"
                className="w-full h-10 px-3 rounded bg-gray-700 text-white"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Phone Number</label>
              <input
                type="text"
                placeholder="Phone number"
                className="w-full h-10 px-3 rounded bg-gray-700 text-white"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Payment Method</label>
              <select
                className="w-full h-10 px-3 rounded bg-gray-700 text-white"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="" disabled>
                  Payment Method
                </option>
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
                <option value="online Transfer">Online Transfer</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Credit Amount</label>
              <input
                type="number"
                placeholder="Credit amount"
                className="w-full h-10 px-3 rounded bg-gray-700 text-white"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
              />
            </div>
          </div>

          {/* Work description fields with table headings */}
          
          <table className="w-full mb-4 text-white">
            <thead>
              <tr>
                <th>#</th>
                <th>Work Description</th>
                <th>Amount</th>
                <th>Reference</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {workDetails.map((work, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <label className="block">
                      <input
                        type="text"
                        name="description"
                        value={work.description}
                        onChange={(e) =>
                          handleWorkDetailChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="p-2 bg-gray-700 rounded w-full"
                        placeholder="Name of the work"
                      />
                    </label>
                  </td>
                  <td>
                    <label className="block">
                      <input
                        type="number"
                        name="amount"
                        value={work.amount}
                        onChange={(e) =>
                          handleWorkDetailChange(
                            index,
                            "amount",
                            e.target.value
                          )
                        }
                        className="p-2 bg-gray-700 rounded w-full"
                        placeholder="Amount of work"
                      />
                    </label>
                  </td>
                  <td>
                    <label className="block">
                      <input
                        type="text"
                        name="reference"
                        value={work.reference}
                        onChange={(e) =>
                          handleWorkDetailChange(
                            index,
                            "reference",
                            e.target.value
                          )
                        }
                        className="p-2 bg-gray-700 rounded w-full"
                        placeholder="Additional information"
                      />
                    </label>
                  </td>
                  <td>
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteField(index)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            
          </table>

          {/* Total amount and submit button */}
          <div className="flex justify-between items-center">
          <button
              type="button"
              className="text-teal-400 text-sm"
              onClick={handleAddField}
            >
              + Add Field
            </button>
            <p className="text-white">
              Total Amount: ₹
              {workDetails.reduce(
                (sum, detail) => sum + parseFloat(detail.amount || 0),
                0
              )}
            </p>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-400 text-gray-900 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
