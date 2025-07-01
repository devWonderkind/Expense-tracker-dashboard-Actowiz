import './App.css';
import { useEffect, useState } from 'react';
import { loadInitialExpenses } from './utils/loadExcel';
import { saveToStorage, getFromStorage } from './utils/storage';
import { normalizeExpense } from './utils/normalizeExpense';

import DashboardSummary from './components/ExpensesSummary';
import BudgetVsActualChart from './components/Charts/BudgetVsActualChart';
import CategoryPieChart from './components/Charts/CategoryPieChart';
import UsageLineCharts from './components/Charts/UsageLineCharts';
import OverspendingAlerts from './components/OverspendingAlert/OverSpendingAlerts';
import ExpenseTable from './components/AllExpenseTable';
import HeaderControls from './components/Header/HeaderControls';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
    category: '',
    paymentMethod: ''
  });

  // Load expenses from localStorage or Excel file
  useEffect(() => {
    const loadExpenses = async () => {
      const stored = getFromStorage('expenses');

      if (stored) {
        setExpenses(stored);
      } else {
        const data = await loadInitialExpenses();
        setExpenses(data);
        saveToStorage('expenses', data);
      }
    };

    loadExpenses();
  }, []);

  // Add a new expense
  const addExpense = (expense) => {
    const newExpense = normalizeExpense(expense);
    const updated = [...expenses, newExpense];
    setExpenses(updated);
    saveToStorage('expenses', updated);
  };

  // Edit expense at specific index
  const editExpense = (updatedExpense, index) => {
    const updated = [...expenses];
    updated[index] = updatedExpense;
    setExpenses(updated);
    saveToStorage('expenses', updated);
  };

  // Delete expense at specific index
  const deleteExpense = (index) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
    saveToStorage('expenses', updated);
  };

  // Category and payment method dropdown options
  const categoryOptions = [...new Set(expenses.map(e => e.Category).filter(Boolean))];
  const paymentOptions = [...new Set(expenses.map(e => e['Payment Method']).filter(Boolean))];

  return (
    <div className="min-h-screen text-white px-6 py-8">
      <HeaderControls
        onAddExpense={addExpense}
        categoryOptions={categoryOptions}
        paymentOptions={paymentOptions}
      />
      
      <DashboardSummary expenses={expenses} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <BudgetVsActualChart expenses={expenses} />
        <CategoryPieChart expenses={expenses} />
      </div>

      <UsageLineCharts expenses={expenses} />
      <OverspendingAlerts expenses={expenses} />
      
      <ExpenseTable 
        expenses={expenses}
        filters={filters}
        setFilters={setFilters}
        onEdit={editExpense}
        onDelete={deleteExpense}
      />
    </div>
  );
};

export default App;
