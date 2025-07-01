import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense, categoryOptions, paymentOptions }) => {
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    amount: '',
    paymentMethod: '',
    budget: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense(formData);
    setFormData({ date: '', category: '', amount: '', paymentMethod: '', budget: '' });
  };

  return (
    <div className="w-full max-w-md mx-auto">    
    <form onSubmit={handleSubmit} className="space-y-4 bg-white">
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-2 rounded-md  text-black"
        required
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-2 rounded-md  text-black"
        required
      >
        <option value="">Select Category</option>
        {categoryOptions.map((cat, i) => (
          <option key={i} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className="w-full p-2 rounded-md  text-black"
        required
      />
      <select
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleChange}
        className="w-full p-2 rounded-md= text-black"
        required
      >
        <option value="">Select Payment Method</option>
        {paymentOptions.map((method, i) => (
          <option key={i} value={method}>{method}</option>
        ))}
      </select>
      <input
        type="number"
        name="budget"
        placeholder="Budget (optional)"
        value={formData.budget}
        onChange={handleChange}
        className="w-full p-2 rounded-md  text-black"
      />
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
      >
        Add Expense
      </button>
    </form>
    </div>
  );
};

export default ExpenseForm;
