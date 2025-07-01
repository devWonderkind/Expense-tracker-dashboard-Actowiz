import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,  ChartDataLabels);

const BudgetVsActualChart = ({ expenses }) => {
  // Group expenses by Category
  const categoryMap = {};

  expenses.forEach((expense) => {
    const category = expense.Category || 'Other';
    const amount = parseFloat(expense.Amount) || 0;
    const budget = parseFloat(expense.Budget) || 0;

    if (!categoryMap[category]) {
      categoryMap[category] = { amount: 0, budget: 0 };
    }

    categoryMap[category].amount += amount;
    categoryMap[category].budget += budget;
  });

  const labels = Object.keys(categoryMap);
  const amountData = labels.map((cat) => categoryMap[cat].amount);
  const budgetData = labels.map((cat) => categoryMap[cat].budget);

  const data = {
    labels,
    datasets: [
      {
        label: 'Actual Spend',
        data: amountData,
        backgroundColor: '#F87171', // red
      },
      {
        label: 'Budget',
        data: budgetData,
        backgroundColor: '#60A5FA', // blue
      },
    ],
  };

  const options = {
  responsive: true,
  layout: {
    padding: { top: 20 },
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#6B7280',
        padding: 20,
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const label = context.dataset.label || '';
          const value = context.raw;
          const category = context.label;
          const budget = categoryMap[category]?.budget || 0;

          if (label === 'Actual Spend' && budget > 0) {
            const percentUsed = ((value / budget) * 100).toFixed(1);
            return `${label}: ₹${value} (${percentUsed}%)`;
          }

          return `${label}: ₹${value}`;
        },
      },
    },
    datalabels: {
      display: (context) => context.dataset.label === 'Actual Spend',
      color: '#111827',
      anchor: 'end',
      align: 'top',
      font: {
        weight: 'bold',
        size: 12,
      },
      formatter: (value, context) => {
        const category = context.chart.data.labels[context.dataIndex];
        const budget = categoryMap[category]?.budget || 0;

        if (budget === 0) return '';
        const percent = ((value / budget) * 100).toFixed(0);
        return `${percent}%`;
      },
    },
  },
  scales: {
    x: {
      ticks: { color: '#6B7280' },
    },
    y: {
      ticks: { color: '#6B7280' },
    },
  },
};


  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget vs Actual by Category</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BudgetVsActualChart;
