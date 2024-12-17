import React, { useState } from "react";
import api from "../../services/api";
import swal from "sweetalert";
import LoadingSpinner from "../spinner/Spinner";

const PaymentModal = ({ onClose, customer }) => {
  const [repaymentAmount, setRepaymentAmount] = useState(
    customer.creditAmount - customer.paidAmount
  );
  const [history, setHistory] = useState(customer.transactionHistory);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amountError, setAmountError] = useState("");
  const [dateError, setDateError] = useState("");
  const [methodError, setMethodError] = useState("");
  const [loading, setLoading] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState("Full Repayment");
  const [maxRepaymentAmount, setMaxRepaymentAmount] = useState(repaymentAmount);
  const [discount, setDiscount] = useState(0);
  const [disError, setDisError] = useState("");

  const today = new Date();
  const options = { timeZone: "Asia/Kolkata" };
  const todayString = today.toLocaleDateString("en-CA", options);
  const [repaymentDate, setRepaymentDate] = useState(todayString);

  // Handle changes in repayment amount
  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setRepaymentAmount(value);

    if (value > maxRepaymentAmount) {
      setAmountError(`Amount cannot exceed ₹${maxRepaymentAmount}`);
    } else {
      setAmountError("");
    }
  };

  // Handle changes in the repayment date
  const handleDateChange = (e) => {
    setRepaymentDate(e.target.value);
    setDateError("");
  };

  // Handle payment method change
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setMethodError("");
  };

  // Handle vehicle number selection
  const handleVehicleNumberChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "Full Repayment") {
      setVehicleNumber("Full Repayment");
      setMaxRepaymentAmount(customer.creditAmount - customer.paidAmount);
      setRepaymentAmount(customer.creditAmount - customer.paidAmount);
    } else {
      setVehicleNumber(selectedValue);
      const selectedItem = history.find((item) => item._id === selectedValue);
      if (selectedItem) {
        setMaxRepaymentAmount(selectedItem.Amount - selectedItem.paidAmount);
        setRepaymentAmount(selectedItem.Amount - selectedItem.paidAmount);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    setAmountError("");
    setDateError("");
    setMethodError("");
    setDisError("");

    if (!repaymentDate) {
      setDateError("Repayment date is required.");
      hasError = true;
    }

    if (!repaymentAmount || repaymentAmount > maxRepaymentAmount) {
      setAmountError(
        repaymentAmount > maxRepaymentAmount
          ? `Amount cannot exceed ₹${maxRepaymentAmount}`
          : "Repayment amount is required."
      );
      hasError = true;
    }

    if (discount >= repaymentAmount) {
      setDisError("Discount needs to be less than the repayment amount.");
      hasError = true;
    }

    if (!paymentMethod) {
      setMethodError("Please select a payment method.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setLoading(true);

    try {
      const details = {
        repaymentDate,
        repaymentAmount,
        paymentMethod,
        vehicleNumber,
        discount,
      };

      const result = await api.repayment(customer, details);

      if (!result.error) {
        swal("Success", `${repaymentAmount} paid successfully`, "success");
        onClose();
      } else {
        swal("Error", `${result.error.message}`, "error");
      }
    } catch (error) {
      swal("Error", "An unexpected error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
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
                  max={todayString}
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
                </select>
                {methodError && (
                  <p className="text-red-500 mt-1">{methodError}</p>
                )}
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block mb-2">Vehicle Number</label>
                <select
                  value={
                    vehicleNumber === "Full Repayment"
                      ? "Full Repayment"
                      : vehicleNumber
                  }
                  onChange={handleVehicleNumberChange}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none"
                >
                  <option value="Full Repayment">Full Repayment</option>
                  {history.map(
                    (item, index) =>
                      item.isCredit &&
                      item.paymentType === "Credit" && (
                        <option key={index} value={item._id}>
                          {item.vehicleNumber}
                        </option>
                      )
                  )}
                </select>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block mb-2">Repayment amount</label>
                <input
                  type="number"
                  onChange={handleAmountChange}
                  value={repaymentAmount}
                  disabled={vehicleNumber === "Full Repayment"}
                  placeholder={`Maximum repay amount: ₹${maxRepaymentAmount}`}
                  className={`w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none ${
                    amountError ? "border-red-500" : ""
                  }`}
                />
                {!amountError && (
                  <p className="text-red-500">
                    Due Amount ₹{maxRepaymentAmount}
                  </p>
                )}
                {amountError && (
                  <p className="text-red-500 mt-1">{amountError}</p>
                )}
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block mb-2">Discount</label>
                <input
                  type="number"
                  onChange={(e) => setDiscount(parseFloat(e.target.value))}
                  value={discount}
                  placeholder={`Max discount less than ₹${repaymentAmount}`}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none"
                />
                {disError && <p className="text-red-500 mt-1">{disError}</p>}
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
    </>
  );
};

export default PaymentModal;
