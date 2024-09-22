import React from 'react';

const History = ({ show, onClose, customer }) => {
  if (!show) return null;

  const customers = [
    {
        paymentType:"By UPI"
    },
]

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-gray-800 text-gray-300 rounded-lg w-full max-w-3xl p-6">
        <h2 className="text-xl font-bold mb-4">Transaction History - {customer.name}</h2>
        
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
                <th className="px-4 py-2">Reciept</th>
              </tr>
            </thead>
            <tbody className="bg-gray-700">
              <tr className="border-t border-gray-600">
                <td className="px-4 py-2">{customer.date}</td>
                <td className="px-4 py-2">{customer.vehicleNumber}</td>
                <td className="px-4 py-2">{customer.phoneNumber}</td>
                <td className="px-4 py-2">By UPI</td>
                <td className="px-4 py-2">{customer.paidAmount}</td>
                <td className="px-4 py-2">
                    
                    <button className="bg-teal-400 text-gray-900 px-4 py-1 rounded-md ml-2">
                      View
                    </button>
                  </td>
              </tr>
              {/* Add more rows here if the customer has more transactions */}
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
