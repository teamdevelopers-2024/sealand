import React, { useState } from "react";

const PaymentModal = ({ show, onClose, customer }) => {
  const [repaymentAmount, setRepaymentAmount] = useState("");

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
      <div className="bg-gray-800 text-gray-300 p-6 rounded-md w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
        <form>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2">Date of repayment</label>
              <input
                type="date"
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2">Customer name</label>
              <input
                type="text"
                value={customer.name}
                readOnly
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2">Vehicle number</label>
              <input
                type="text"
                value={customer.vehicleNumber}
                readOnly
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2">Repayment amount</label>
              <input
                type="number"
                value={repaymentAmount}
                onChange={(e) => setRepaymentAmount(e.target.value)}
                placeholder={`Maximum repay amount: ₹2660`}
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2">Payment method</label>
              <select className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none">
                <option value="">How did you pay?</option>
                <option value="UPI">UPI</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-600 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-400 text-gray-900 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
