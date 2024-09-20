import React from 'react';

const CustomerData = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <div className="p-6 bg-gray-800 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customer Data</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers ..."
              className="pl-4 pr-10 py-2 bg-gray-700 rounded-full text-white outline-none"
            />
            <span className="absolute top-2.5 right-4 text-teal-500">
              {/* Search icon placeholder */}
              🔍
            </span>
          </div>
          <button className="bg-teal-500 text-white px-4 py-2 rounded-full">
            New Customer
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="px-6 py-4">
        <div className="overflow-x-auto">
          <table className="min-w-full text-center table-auto">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Vehicle number</th>
                <th className="px-4 py-2">Phone number</th>
                <th className="px-4 py-2">Payment type</th>
                <th className="px-4 py-2">Credit</th>
                <th className="px-4 py-2">Paid</th>
                <th className="px-4 py-2">Due</th>
                <th className="px-4 py-2">Credit / Repayment</th>
              </tr>
            </thead>
            <tbody className="bg-gray-700">
              {/* Example Rows */}
              {[
                { name: 'Danish', vehicle: 'KL 13 A 5672', phone: '8921405362', payment: 'By UPI', credit: '₹4630', paid: '₹1970', due: '₹2660' },
                { name: 'Shehin', vehicle: 'KL 56 R 7598', phone: '7510775051', payment: 'By Cash', credit: '₹3190', paid: '₹1310', due: '₹1880' },
                { name: 'Sinan', vehicle: 'KL 11 H 3260', phone: '9037317210', payment: 'By UPI', credit: '₹6200', paid: '₹6200', due: '₹0' }
              ].map((customer, index) => (
                <tr key={index} className="border-b border-gray-600">
                  <td className="px-4 py-2">{customer.name}</td>
                  <td className="px-4 py-2">{customer.vehicle}</td>
                  <td className="px-4 py-2">{customer.phone}</td>
                  <td className="px-4 py-2">{customer.payment}</td>
                  <td className="px-4 py-2">{customer.credit}</td>
                  <td className="px-4 py-2">{customer.paid}</td>
                  <td className="px-4 py-2">{customer.due}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-around space-x-2">
                      <button className="bg-yellow-500 text-black px-4 py-1 rounded-full">Credit</button>
                      <button className={`px-4 py-1 rounded-full ${customer.due === '₹0' ? 'bg-teal-500' : 'bg-blue-500'} text-white`}>
                        {customer.due === '₹0' ? 'Receipt' : 'Pay'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Section */}
      <div className="px-6 py-4 flex justify-between items-center">
        <span className="text-gray-400">2 Of 13 Pages</span>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-gray-700 rounded-full text-gray-400">&lt;</button>
          <button className="px-3 py-1 bg-teal-500 rounded-full text-white">2</button>
          <button className="px-3 py-1 bg-gray-700 rounded-full text-gray-400">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerData;