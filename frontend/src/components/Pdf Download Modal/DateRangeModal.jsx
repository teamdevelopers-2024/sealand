// DateRangeModal.js
import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DateRangeModal = ({
  isOpen,
  onClose,
  selectedTimeFrame,
  setSelectedTimeFrame,
  customStartDate,
  setCustomStartDate,
  customEndDate,
  setCustomEndDate,
  onDownloadPDF
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="bg-gray-800 rounded-lg p-6 z-10">
        <button className="text-white" onClick={onClose}>Close</button>
        <div className="flex flex-col space-y-4 mt-4">
          <div className="flex items-center">
            <select
              value={selectedTimeFrame}
              onChange={(e) => {
                setSelectedTimeFrame(e.target.value);
                if (e.target.value !== "customMonth") {
                  setCustomStartDate(null);
                  setCustomEndDate(null);
                }
              }}
              className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg"
            >
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="last7Days">Last 7 Days</option>
              <option value="customMonth">Custom Range</option>
            </select>
          </div>

          {selectedTimeFrame === "customMonth" && (
            <div className="flex space-x-2">
              <DatePicker
                selected={customStartDate}
                onChange={(date) => setCustomStartDate(date)}
                className="bg-gray-700 text-gray-100 rounded-lg px-4 py-2"
                placeholderText="From Date"
                dateFormat="dd/MM/yyyy"
              />
              <DatePicker
                selected={customEndDate}
                onChange={(date) => setCustomEndDate(date)}
                className="bg-gray-700 text-gray-100 rounded-lg px-4 py-2"
                placeholderText="To Date"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          )}

          <button
            onClick={onDownloadPDF}
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg mt-4">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangeModal;
