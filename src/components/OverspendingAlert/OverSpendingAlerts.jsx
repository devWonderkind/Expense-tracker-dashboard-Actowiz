import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const OverspendingAlerts = ({ expenses }) => {
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

  const budgetMap = {};
  const spendingMap = {};

  expenses.forEach((expense) => {
    const category = expense.Category;
    const amount = parseFloat(expense.Amount);
    const budget = parseFloat(expense.Budget);

    if (!budgetMap[category]) budgetMap[category] = budget;
    if (!spendingMap[category]) spendingMap[category] = 0;
    spendingMap[category] += amount;
  });

  const alerts = Object.entries(spendingMap)
    .filter(([category, total]) => total > (budgetMap[category] || 0))
    .filter(([category]) => !dismissedAlerts.has(category))
    .map(([category, total]) => ({
      category,
      spent: total,
      budget: budgetMap[category]
    }));

  const dismissAlert = (category) => {
    setDismissedAlerts(prev => new Set([...prev, category]));
  };

  const clearAllAlerts = () => {
    setDismissedAlerts(new Set(alerts.map(alert => alert.category)));
  };

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-red-500 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Budget Alerts ({alerts.length})
        </h3>
        {alerts.length > 1 && (
          <button
            onClick={clearAllAlerts}
            className="text-md border border-red-500 text-red-600 px-2 py-1 rounded hover:bg-red-50 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Alert items */}
      <div className="space-y-3">
        {alerts.map(({ category, spent, budget }) => (
          <div
            key={category}
            className="flex items-start gap-4 p-4 border border-red-500 bg-red-100 rounded-xl shadow-md relative group"
          >
            <AlertTriangle className="text-red-600 w-6 h-6 mt-1 flex-shrink-0" />
            
            <div className="flex-1 text-sm text-red-800">
              <strong className="block text-md font-semibold">{category}</strong>
              Exceeded budget: <span className="font-medium">₹{spent.toFixed(2)}</span> spent vs ₹{budget.toFixed(2)} budget.
            </div>

            {/* Dismiss button */}
            <button
              onClick={() => dismissAlert(category)}
              className="flex-shrink-0 p-1 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors opacity-60 hover:opacity-100 group-hover:opacity-100"
              title="Dismiss alert"
            >
              <X className="w-4 h-4 text-red-600 dark:text-red-300" />
            </button>
          </div>
        ))}
      </div>

      {/* Restore dismissed alerts button */}
      {dismissedAlerts.size > 0 && (
        <button
          onClick={() => setDismissedAlerts(new Set())}
          className="w-full text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Show {dismissedAlerts.size} dismissed alert{dismissedAlerts.size !== 1 ? 's' : ''}
        </button>
      )}
    </div>
  );
};

export default OverspendingAlerts;
