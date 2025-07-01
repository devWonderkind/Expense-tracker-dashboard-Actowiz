import * as XLSX from 'xlsx';

export const loadInitialExpenses = async () => {
  const response = await fetch('/src/data/Frontend_Dev_Interview_Task_Expense_Sheet.xlsx');
  const buffer = await response.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheet = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheet];
  return XLSX.utils.sheet_to_json(worksheet);
};
