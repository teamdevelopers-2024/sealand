import React from "react";

const History = ({ show, onClose, customer }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-gray-800 text-gray-300 rounded-lg w-full max-w-3xl p-6">
        <h2 className="text-xl font-bold mb-4">
          Transaction History - {customer.customerName}
        </h2>

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
                {/* <th className="px-4 py-2">Reciept</th> */}
              </tr>
            </thead>
            <tbody className="bg-gray-700">
              {customer.transactionHistory.map((transaction, index) => (
                <tr className="border-t border-gray-600">
                  <td className="px-4 py-2">
                    {new Date(transaction.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-2">{transaction.vehicleNumber}</td>
                  <td className="px-4 py-2">{transaction.phoneNumber}</td>
                  <td className="px-4 py-2">{transaction.paymentType}</td>
                  <td className="px-4 py-2">{transaction.Amount}</td>
                  {/* <td className="px-4 py-2">
                    <button
                      onClick={() => generatePDF()}
                      className="bg-teal-400 text-gray-900 px-4 py-1 rounded-md ml-2"
                    >
                      Download
                    </button>
                  </td> */}
                </tr>
              ))}
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
