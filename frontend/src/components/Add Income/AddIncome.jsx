import React, { useState, useEffect } from "react";
import api from "../../services/api";
import swal from 'sweetalert';

const AddIncome = ({ setAddIncomeModal }) => {
  // State to handle the dynamic fields
  const [workDescriptions, setWorkDescriptions] = useState([
    { description: "", amount: "", reference: "" },
  ]);

  // State for other fields
  const [customerName, setCustomerName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalServiceCost, setTotalServiceCost] = useState(0);

  const today = new Date();
  const options = { timeZone: "Asia/Kolkata" }; // Specify Indian timezone
  const todayString = today.toLocaleDateString("en-CA", options); // Format to YYYY-MM-DD

  // Set dateOfService to today's date initially
  const [workDate, setWorkDate] = useState(todayString);

  // Error state for validation messages
  const [errors, setErrors] = useState({});

  // Function to handle input change for dynamic fields
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...workDescriptions];
    updatedFields[index][name] = value;
    setWorkDescriptions(updatedFields);
  };

  // Function to add a new work description field
  const addField = () => {
    setWorkDescriptions([...workDescriptions, { description: "", amount: "", reference: "" }]);
  };

  // Function to remove a field
  const removeField = (index) => {
    const updatedFields = workDescriptions.filter((_, i) => i !== index);
    setWorkDescriptions(updatedFields);
  };

  // Function to calculate the total amount
  const calculateTotal = () => {
    const total = workDescriptions.reduce((total, work) => {
      const amount = parseFloat(work.amount) || 0;
      return total + amount;
    }, 0);
    return total; // Return total instead of setting it in state
  };

  // Function to handle form validation
  const validate = () => {
    let tempErrors = {};
    if (!workDate) tempErrors.workDate = "Work date is required.";
    if (!customerName) tempErrors.customerName = "Customer name is required.";
    if (!vehicleNumber) tempErrors.vehicleNumber = "Vehicle number is required.";
    if (!contactNumber) tempErrors.contactNumber = "Contact number is required.";
    if (!paymentMethod) tempErrors.paymentMethod = "Select a payment method.";
    if (calculateTotal() <= 0) tempErrors.totalServiceCost = "Total cost must be greater than zero.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!validate()) return;
    const formData = {
      workDate,
      customerName,
      vehicleNumber: vehicleNumber.toUpperCase(),
      contactNumber,
      paymentMethod,
      totalServiceCost: calculateTotal(),
      workDescriptions,
    };
    try {
      const result = await api.addIncome(formData);
      if (result.error) {
        swal("Error!", result.errors[0], "error");
        return;
      }
      // Show success message
      swal("Success!", "Income added successfully!", "success");
      setAddIncomeModal(false); // Close the modal after saving
    } catch (err) {
      console.error(err);
      swal("Error!", "Failed to add income.", "error");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-20"></div>

      {/* Popup Form */}
      <div className="fixed inset-0 flex items-center justify-center z-30">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
          <h2 className="text-xl mb-4">Income Entry</h2>

          {/* Form inputs */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <label className="block">
              <span className="text-white">Work Date</span>
              <input
                type="date"
                className="p-2 bg-gray-700 rounded w-full"
                value={workDate}
                onChange={(e) => setWorkDate(e.target.value)}
              />
              {errors.workDate && <p className="text-red-500">{errors.workDate}</p>}
            </label>

            <label className="block">
              <span className="text-white">Customer Name</span>
              <input
                type="text"
                placeholder="Who is the customer?"
                className="p-2 bg-gray-700 rounded w-full"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              {errors.customerName && <p className="text-red-500">{errors.customerName}</p>}
            </label>

            <label className="block">
              <span className="text-white">Vehicle Number</span>
              <input
                type="text"
                placeholder="Plate ID for this vehicle?"
                className="p-2 bg-gray-700 rounded w-full"
                value={vehicleNumber.toUpperCase()}
                onChange={(e) => setVehicleNumber(e.target.value)}
              />
              {errors.vehicleNumber && <p className="text-red-500">{errors.vehicleNumber}</p>}
            </label>

            <label className="block">
              <span className="text-white">Contact Number</span>
              <input
                type="tel"
                placeholder="Preferred contact for updates?"
                className="p-2 bg-gray-700 rounded w-full"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
              {errors.contactNumber && <p className="text-red-500">{errors.contactNumber}</p>}
            </label>

            <label className="block">
              <span className="text-white">Payment Method</span>
              <select
                className="p-2 bg-gray-700 rounded w-full"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">How did you pay?</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Online Transfer">Online Transfer</option>
              </select>
              {errors.paymentMethod && <p className="text-red-500">{errors.paymentMethod}</p>}
            </label>
          </div>

          {/* Work Description Table */}
          <table className="w-full mb-4">
            <thead>
              <tr>
                <th>#</th>
                <th>Work Description</th>
                <th>Amount</th>
                <th>Reference</th>
                {workDescriptions.length > 1 && 
                <th>Action</th>
                }
              </tr>
            </thead>
            <tbody>
              {workDescriptions.map((work, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={work.description}
                      onChange={(event) => handleInputChange(index, event)}
                      className="p-2 bg-gray-700 rounded w-full"
                      placeholder="Name of the work"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="amount"
                      value={work.amount}
                      onChange={(event) => handleInputChange(index, event)}
                      className="p-2 bg-gray-700 rounded w-full"
                      placeholder="Amount of work"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="reference"
                      value={work.reference}
                      onChange={(event) => handleInputChange(index, event)}
                      className="p-2 bg-gray-700 rounded w-full"
                      placeholder="Additional information"
                    />
                  </td>
                  <td>
                    {index > 0 && 
                    <button
                    className="text-red-500"
                    onClick={() => removeField(index)}
                    >
                      🗑
                    </button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Button to add more fields */}
          <button
            onClick={addField}
            className="bg-teal-500 text-white px-4 py-2 rounded mb-4"
          >
            + Add Field
          </button>

          {/* Total Amount and Action Buttons */}
          <div className="flex justify-between items-center">
            {/* Total Amount Display */}
            <div className="text-lg font-semibold">
              Total Amount: ₹ {calculateTotal().toLocaleString()}
            </div>

            {/* Cancel and Save Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => setAddIncomeModal(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-teal-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddIncome;
