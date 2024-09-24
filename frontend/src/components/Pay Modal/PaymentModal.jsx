import React, { useState } from "react";
import api from "../../services/api";

const PaymentModal = ({ show, onClose, customer }) => {
  // States for managing input values and errors
  const [repaymentAmount, setRepaymentAmount] = useState(
    customer.creditAmount - customer.paidAmount
  );
  const [repaymentDate, setRepaymentDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amountError, setAmountError] = useState("");
  const [dateError, setDateError] = useState("");
  const [methodError, setMethodError] = useState("");

  // Maximum repayable amount
  const maxRepaymentAmount = customer.creditAmount - customer.paidAmount;

  // Handle repayment amount change and validate input
  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setRepaymentAmount(value);

    // Validation: Check if entered amount exceeds the maximum allowed
    if (value > maxRepaymentAmount) {
      setAmountError(`Amount cannot exceed ₹${maxRepaymentAmount}`);
    } else {
      setAmountError(""); // Clear error if the value is valid
    }
  };

  // Handle repayment date change
  const handleDateChange = (e) => {
    setRepaymentDate(e.target.value);
    setDateError(""); // Clear error when date is changed
  };

  // Handle payment method change
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setMethodError(""); // Clear error when method is selected
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();

 
    let hasError = false;
    setAmountError("");
    setDateError("");
    setMethodError("");

    // Validate repayment date
    if (!repaymentDate) {
      setDateError("Repayment date is required.");
      hasError = true;
    }

    if (repaymentAmount > maxRepaymentAmount || !repaymentAmount) {
      setAmountError(
        repaymentAmount > maxRepaymentAmount
          ? `Amount cannot exceed ₹${maxRepaymentAmount}`
          : "Repayment amount is required."
      );
      hasError = true;
    }

    if (!paymentMethod) {
      setMethodError("Please select a payment method.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const details = {
      repaymentDate : repaymentDate,
      repaymentAmount:repaymentAmount,
      paymentMethod:paymentMethod
    }

    const result = await api.repayment(customer ,details)
    console.log(result)
    if(!result.error){
      console.log("Form submitted successfully with the following data:", {
        repaymentDate,
        repaymentAmount,
        paymentMethod,
      });
      alert('repayment successfully')
    }else{
      alert('error repayment')
    }
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
      <div className="bg-gray-800 text-gray-300 p-6 rounded-md w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2">Date of repayment</label>
              <input
                type="date"
                value={repaymentDate}
                onChange={handleDateChange}
                className={`w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none ${
                  dateError ? "border-red-500" : ""
                }`}
              />
              {dateError && <p className="text-red-500 mt-1">{dateError}</p>}
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2">Customer name</label>
              <input
                type="text"
                value={customer.customerName}
                readOnly
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none"
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2">Repayment amount</label>
              <input
                type="number"
                
                onChange={handleAmountChange}
                placeholder={`Maximum repay amount: ₹${maxRepaymentAmount}`}
                className={`w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none ${
                  amountError ? "border-red-500" : ""
                }`}
              />
              {!amountError && <p className="text-red-500">Due Amount ₹{maxRepaymentAmount}</p>}
              {amountError && <p className="text-red-500 mt-1">{amountError}</p>}
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2">Payment method</label>
              <select
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                className={`w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none ${
                  methodError ? "border-red-500" : ""
                }`}
              >
                <option value="">How did you pay?</option>
                <option value="UPI">UPI</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
              </select>
              {methodError && <p className="text-red-500 mt-1">{methodError}</p>}
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
