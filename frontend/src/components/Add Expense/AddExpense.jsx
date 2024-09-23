import React, { useState } from "react";
const AddExpense = ({setAddExpenseModal}) => {
  // State for popup visibility
  const [isOpen, setIsOpen] = useState(false);

  // State to handle the dynamic fields
  const [workDescriptions, setWorkDescriptions] = useState([
    { description: "", amount: "", reference: "" },
  ]);

  // Function to handle input change
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...workDescriptions];
    updatedFields[index][name] = value;
    setWorkDescriptions(updatedFields);
  };

  // Function to add a new work description field
  const addField = () => {
    setWorkDescriptions([
      ...workDescriptions,
      { description: "", amount: "", reference: "" },
    ]);
  };

  // Function to remove a field
  const removeField = (index) => {
    const updatedFields = workDescriptions.filter((_, i) => i !== index);
    setWorkDescriptions(updatedFields);
  };

  // Function to calculate the total amount
  const calculateTotal = () => {
    return workDescriptions.reduce((total, work) => {
      const amount = parseFloat(work.amount) || 0;
      return total + amount;
    }, 0);
  };

  return (
    <>
      {/* Button to trigger the popup */}

      {/* Popup Modal */}
      <>
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20"></div>

        {/* Popup Form */}
        <div className="fixed inset-0 flex items-center justify-center z-30">
          <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
            <h2 className="text-xl mb-4">Expense Entry</h2>

            {/* Form inputs */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <label className="block">
                <span className="text-white">Date</span>
                <input
                  type="date"
                  placeholder="Select Date"
                  className="p-2 bg-gray-700 rounded w-full"
                />
              </label>

              <label className="block">
                <span className="text-white">Payee Name</span>
                <input
                  type="text"
                  placeholder="To whom?"
                  className="p-2 bg-gray-700 rounded w-full"
                />
              </label>

              <label className="block">
                <span className="text-white">Expense Type</span>
                <input
                  type="text"
                  placeholder="Plate ID for this vehicle?"
                  className="p-2 bg-gray-700 rounded w-full"
                />
              </label>

              <label className="block">
                <span className="text-white">Contact Number</span>
                <input
                  type="tel"
                  placeholder="Preferred contact for updates?"
                  className="p-2 bg-gray-700 rounded w-full"
                />
              </label>

              <label className="block">
                <span className="text-white">Payment Method</span>
                <select className="p-2 bg-gray-700 rounded w-full">
                  <option>How did you pay?</option>
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Online Transfer</option>
                </select>
              </label>

              <label className="block">
                <span className="text-white">Total Expense</span>
                <input
                  type="number"
                  placeholder="Total service cost?"
                  className="p-2 bg-gray-700 rounded w-full"
                />
              </label>
            </div>

            {/* Work Description Table */}
            <table className="w-full mb-4">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Expense Detail</th>
                  <th>Amount</th>
                  <th>Reference</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {workDescriptions.map((work, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <label className="block">
                        <input
                          type="text"
                          name="description"
                          value={work.description}
                          onChange={(event) => handleInputChange(index, event)}
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
                          onChange={(event) => handleInputChange(index, event)}
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
                          onChange={(event) => handleInputChange(index, event)}
                          className="p-2 bg-gray-700 rounded w-full"
                          placeholder="Additional information"
                        />
                      </label>
                    </td>
                    <td>
                      <button
                        className="text-red-500"
                        onClick={() => removeField(index)}
                      >
                        🗑
                      </button>
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
                <button onClick={()=> setAddExpenseModal(false)} className="bg-gray-600 text-white px-4 py-2 rounded">
                  Cancel
                </button>
                <button className="bg-teal-500 text-white px-4 py-2 rounded">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default AddExpense;
