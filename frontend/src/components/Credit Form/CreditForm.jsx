import React, { useState } from "react";

const CreditForm = ({ customer, onClose }) => {
  const [workRows, setWorkRows] = useState([{ description: "", amount: "", reference: "" }]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Handle form input changes
  const handleInputChange = (index, field, value) => {
    const newWorkRows = [...workRows];
    newWorkRows[index][field] = value;
    setWorkRows(newWorkRows);
    updateTotalAmount(newWorkRows);
  };

  // Function to update total amount
  const updateTotalAmount = (workRows) => {
    const total = workRows.reduce((acc, row) => acc + (parseFloat(row.amount) || 0), 0);
    setTotalAmount(total);
  };

  // Function to add a new work row
  const addWorkRow = () => {
    setWorkRows([...workRows, { description: "", amount: "", reference: "" }]);
  };

  // Function to remove a work row
  const removeWorkRow = (index) => {
    const newWorkRows = workRows.filter((_, i) => i !== index);
    setWorkRows(newWorkRows);
    updateTotalAmount(newWorkRows);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-2/3">
        <h2 className="text-2xl mb-4">Add Credit for {customer.name}</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">Date of service</label>
            <input type="date" className="w-full px-3 py-2 rounded bg-gray-700 text-white" />
          </div>
          <div>
            <label className="block mb-1">Customer Name</label>
            <input
              type="text"
              value={customer.name}
              disabled
              className="w-full px-3 py-2 rounded bg-gray-700 text-gray-500"
            />
          </div>
          <div>
            <label className="block mb-1">Phone Number</label>
            <input
              type="text"
              value={customer.phoneNumber}
              disabled
              className="w-full px-3 py-2 rounded bg-gray-700 text-gray-500"
            />
          </div>
          <div>
            <label className="block mb-1">Vehicle Number</label>
            <input
              type="text"
              value={customer.vehicleNumber}
              disabled
              className="w-full px-3 py-2 rounded bg-gray-700 text-gray-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-xl mb-2">Work Details</h3>
          {workRows.map((row, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 mb-2">
              <input
                type="text"
                placeholder="Work description"
                className="px-3 py-2 rounded bg-gray-700 text-white"
                value={row.description}
                onChange={(e) => handleInputChange(index, "description", e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount"
                className="px-3 py-2 rounded bg-gray-700 text-white"
                value={row.amount}
                onChange={(e) => handleInputChange(index, "amount", e.target.value)}
              />
              <input
                type="text"
                placeholder="Reference"
                className="px-3 py-2 rounded bg-gray-700 text-white"
                value={row.reference}
                onChange={(e) => handleInputChange(index, "reference", e.target.value)}
              />
              {workRows.length > 1 && (
                <button
                  className="text-red-500"
                  onClick={() => removeWorkRow(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            className="bg-teal-400 text-gray-900 px-4 py-2 rounded-md"
            onClick={addWorkRow}
          >
            Add Field
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-xl mb-2">Total Amount: ₹{totalAmount}</label>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="bg-teal-400 text-gray-900 px-4 py-2 rounded-md">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditForm;
