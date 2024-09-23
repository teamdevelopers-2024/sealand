import React, { useState, useEffect } from "react";

const ViewIncomeModal = ({ entry, onClose }) => {
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!entry) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-20"></div>

      {/* Popup Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-30">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
          <h2 className="text-xl mb-4">Income Details</h2>

          {/* Income Information */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-white block">Work Date:</span>
              <p className="text-gray-300">
                {new Date(entry.workDate).toLocaleDateString()}
              </p>
            </div>

            <div>
              <span className="text-white block">Customer Name:</span>
              <p className="text-gray-300">{entry.customerName}</p>
            </div>

            <div>
              <span className="text-white block">Vehicle Number:</span>
              <p className="text-gray-300">{entry.vehicleNumber}</p>
            </div>

            <div>
              <span className="text-white block">Contact Number:</span>
              <p className="text-gray-300">{entry.contactNumber}</p>
            </div>

            <div>
              <span className="text-white block">Payment Method:</span>
              <p className="text-gray-300">{entry.paymentMethod}</p>
            </div>

            <div>
              <span className="text-white block">Total Service Cost:</span>
              <p className="text-gray-300">
                ₹ {parseFloat(entry.totalServiceCost).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Work Descriptions */}
          <h3 className="text-lg mb-4">Work Descriptions</h3>
          <table className="w-full mb-4">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-center">#</th>
                <th className="text-center">Work Description</th>
                <th className="text-center">Amount</th>
                <th className="text-center">Reference</th>
              </tr>
            </thead>
            <tbody>
              {entry.workDescriptions.map((work, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{work.description}</td>
                  <td className="text-center">
                    ₹ {parseFloat(work.amount).toLocaleString()}
                  </td>
                  <td className="text-center">{work.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={() => onClose()}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewIncomeModal;
