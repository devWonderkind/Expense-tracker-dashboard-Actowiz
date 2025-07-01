import { useState, useMemo, useEffect } from 'react';
import FilterPanel from './FilterPanel';
import ConfirmDialog from './ConfirmDialog';
import { Filter, X } from 'lucide-react';
import { FaUserEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

const ExpenseTable = ({ expenses, filters, setFilters, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  // Memoized unique filter options
  const categoryOptions = useMemo(() => {
    return [...new Set(expenses.map(exp => exp.Category || exp.category).filter(Boolean))];
  }, [expenses]);

  const paymentOptions = useMemo(() => {
    return [...new Set(expenses.map(exp => exp['Payment Method'] || exp.paymentMethod).filter(Boolean))];
  }, [expenses]);

  // Filtered data
  const filteredExpenses = useMemo(() => {
    return expenses.filter(exp => {
      const date = exp.Date || exp.date;
      const category = exp.Category || exp.category;
      const payment = exp['Payment Method'] || exp.paymentMethod;

      return (!filters.date || date === filters.date) &&
             (!filters.category || category === filters.category) &&
             (!filters.paymentMethod || payment === filters.paymentMethod);
    });
  }, [expenses, filters]);

  const totalItems = filteredExpenses.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredExpenses.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => setCurrentPage(1), [filters]);

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit({
      ...editFormData,
      Amount: parseFloat(editFormData.Amount),
      Budget: parseFloat(editFormData.Budget),
    }, editingIndex);
    setEditingIndex(null);
  };

  const hasFilters = filters.date || filters.category || filters.paymentMethod;

  return (
    <div className="space-y-4 mt-4">
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        categoryOptions={categoryOptions}
        paymentOptions={paymentOptions}
        isOpen={isFilterOpen}
        setIsOpen={setIsFilterOpen}
      />

      <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-md border border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-800">All Expenses</h3>
            {hasFilters && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {totalItems} filtered result{totalItems !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFilterOpen(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                hasFilters
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" /> Filter
              {hasFilters && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
            </button>

            {/* Filter tags */}
            <div className="flex flex-wrap gap-2">
              {['date', 'category', 'paymentMethod'].map(key =>
                filters[key] && (
                  <span key={key} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {filters[key]}
                    <button onClick={() => setFilters(prev => ({ ...prev, [key]: '' }))}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {totalItems === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Filter className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No expenses match your current filters</p>
            <button onClick={() => setFilters({ date: '', category: '', paymentMethod: '' })} className="mt-2 text-blue-600 hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* Expense Table */}
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  {['Date', 'Category', 'Amount (₹)', 'Payment Method', 'Budget (₹)', 'Status', 'Actions'].map(head => (
                    <th key={head} className="text-left px-4 py-3 text-md">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((exp, idx) => {
                  const globalIndex = startIndex + idx;
                  const isOverBudget = parseFloat(exp.Amount) > parseFloat(exp.Budget);

                  if (editingIndex === globalIndex) {
                    return (
                      <tr key={globalIndex} className="bg-yellow-50">
                        <td colSpan={7} className="px-4 py-3">
                          <form onSubmit={handleEditSubmit} className="flex flex-wrap items-center gap-2">
                            <input type="date" name="Date" value={editFormData.Date} onChange={handleEditChange} className="border px-2 py-1 rounded text-black" />
                            <input type="text" name="Category" value={editFormData.Category} onChange={handleEditChange} className="border px-2 py-1 rounded text-black" />
                            <input type="number" name="Amount" value={editFormData.Amount} onChange={handleEditChange} className="border px-2 py-1 rounded text-black" />
                            <input type="text" name="Payment Method" value={editFormData['Payment Method']} onChange={handleEditChange} className="border px-2 py-1 rounded text-black" />
                            <input type="number" name="Budget" value={editFormData.Budget} onChange={handleEditChange} className="border px-2 py-1 rounded text-black" />
                            <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                            <button type="button" onClick={() => setEditingIndex(null)} className="text-gray-600 px-2 py-1">Cancel</button>
                          </form>
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={globalIndex} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">{exp.Date}</td>
                      <td className="px-4 py-3 text-gray-700">{exp.Category}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">₹{exp.Amount}</td>
                      <td className="px-4 py-3 text-gray-700">{exp['Payment Method']}</td>
                      <td className="px-4 py-3 text-gray-700">₹{exp.Budget}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full border ${
                          isOverBudget ? 'text-red-700 bg-red-100 border-red-200' : 'text-green-700 bg-green-100 border-green-200'
                        }`}>
                          {isOverBudget ? 'Overspent' : 'Within Budget'}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button onClick={() => { setEditingIndex(globalIndex); setEditFormData(exp); }} className="text-blue-600">
                          <FaUserEdit className="text-2xl" />
                        </button>
                        <button onClick={() => setConfirmDeleteIndex(globalIndex)} className="text-red-600">
                          <MdDeleteForever className="text-2xl" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <select
                  value={itemsPerPage}
                  onChange={(e) => { setItemsPerPage(+e.target.value); setCurrentPage(1); }}
                  className="border px-2 py-1 rounded text-sm text-gray-700"
                >
                  {[5, 10, 25, 50].map(size => <option key={size} value={size}>{size}</option>)}
                </select>
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} entries
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className={`px-3 py-1 text-sm rounded ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-blue-500 text-white'}`}
                >Previous</button>
                <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className={`px-3 py-1 text-sm rounded ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-blue-500 text-white'}`}
                >Next</button>
              </div>
            </div>
          </>
        )}

        {/* Delete Confirmation */}
        <ConfirmDialog
          isOpen={confirmDeleteIndex !== null}
          onClose={() => setConfirmDeleteIndex(null)}
          onConfirm={() => {
            onDelete(confirmDeleteIndex);
            setConfirmDeleteIndex(null);
          }}
          message="Are you sure you want to delete this expense? This action cannot be undone."
        />
      </div>
    </div>
  );
};

export default ExpenseTable;
