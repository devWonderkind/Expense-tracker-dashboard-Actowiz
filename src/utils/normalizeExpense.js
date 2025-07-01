export const normalizeExpense = (expense) => ({
  Date: expense.date,
  Category: expense.category,
  Amount: parseFloat(expense.amount),
  'Payment Method': expense.paymentMethod,
  Budget: parseFloat(expense.budget || 0)
});
