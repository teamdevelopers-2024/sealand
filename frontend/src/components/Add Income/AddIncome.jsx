import React, { useState } from "react";

const AddIncome = () => {
  // State for popup visibility
  const [isOpen, setIsOpen] = useState(false);

  // State to handle the dynamic fields
  const [workDescriptions, setWorkDescriptions] = useState([
    { description: "", amount: "", reference: "" },
  ]);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  // Function to handle input change
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
    return workDescriptions.reduce((total, work) => {
      const amount = parseFloat(work.amount) || 0;
      return total + amount;
    }, 0);
  };

  return (
    <>
      {/* Navbar (static, back of the popup) */}
      <nav className="bg-gray-900 text-white p-4 fixed top-0 left-0 right-0 z-10">
        <div className="flex justify-between">
          <div className="text-lg">Sea Land Car Care</div>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Expenses</a>
            <a href="#" className="text-red-500 underline">Income</a>
            <a href="#" className="hover:underline">Credit Customers</a>
          </div>
        </div>
      </nav>

      {/* Button to trigger the popup */}
      <div className="mt-16 p-4">
        <button onClick={openPopup} className="bg-red-600 text-white px-4 py-2 rounded">
          Add Income
        </button>
      </div>

      {/* Popup Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={closePopup}></div>

          {/* Popup Form */}
          <div className="fixed inset-0 flex items-center justify-center z-30">
            <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
              <h2 className="text-xl mb-4">Income Entry</h2>

              {/* Form inputs */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <input
                  type="date"
                  placeholder="Car care date?"
                  className="p-2 bg-gray-700 rounded"
                />
                <input
                  type="text"
                  placeholder="Who is the customer?"
                  className="p-2 bg-gray-700 rounded"
                />
                <input
                  type="text"
                  placeholder="Plate ID for this vehicle?"
                  className="p-2 bg-gray-700 rounded"
                />
                <input
                  type="tel"
                  placeholder="Preferred contact for updates?"
                  className="p-2 bg-gray-700 rounded"
                />
                <select className="p-2 bg-gray-700 rounded">
                  <option>How did you pay?</option>
                  <option>Cash</option>
                  <option>Credit Card</option>
                  <option>Online Transfer</option>
                </select>
                <input
                  type="number"
                  placeholder="Total service cost?"
                  className="p-2 bg-gray-700 rounded"
                />
              </div>

              {/* Work Description Table */}
              <table className="w-full mb-4">
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
                  <button onClick={closePopup} className="bg-gray-600 text-white px-4 py-2 rounded">
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
      )}
    </>
  );
};

export default AddIncome;
