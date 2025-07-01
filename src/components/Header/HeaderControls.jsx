import React, { useState } from 'react';
import ExpenseForm from './AddExpenseForm';
import { IoCloudUploadOutline } from "react-icons/io5";
import * as XLSX from 'xlsx';


const HeaderControls = ({ onAddExpense, categoryOptions, paymentOptions }) => {
  const [showForm, setShowForm] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      jsonData.forEach(item => onAddExpense(item));
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
    <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        {/* Left: Dashboard Heading */}
        <h1 className="text-2xl font-bold text-gray-800">Expense Tracker Dashboard</h1>

        {/* Right: Controls */}
        <div className="flex items-center gap-4">
          <label className="border border-gray-400 text-gray-600 font-semibold px-4 py-2 rounded-md text-sm cursor-pointer flex items-center gap-2">
            <IoCloudUploadOutline />
            Upload Expense
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white font-semibold px-4 py-2 rounded-md text-sm"
          >
            + Add New
          </button>
        </div>
      </div>

      {/* Add Expense Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-xl relative z-10">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
            <ExpenseForm
              onAddExpense={(expense) => {
                onAddExpense(expense);
                setShowForm(false);
              }}
              categoryOptions={categoryOptions}
              paymentOptions={paymentOptions}
            />
          </div>
        </div>
    )}
    </>
  );
};

export default HeaderControls;
