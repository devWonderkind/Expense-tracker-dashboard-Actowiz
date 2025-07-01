import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ArcElement, Tooltip, Legend,ChartDataLabels);

const CategoryPieChart = ({ expenses }) => {
  const categoryTotals = {};

  expenses.forEach(exp => {
    const category = exp.Category || 'Other';
    const amount = parseFloat(exp.Amount) || 0;

    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }

    categoryTotals[category] += amount;
  });

  const labels = Object.keys(categoryTotals);
  const dataValues = Object.values(categoryTotals);

  const colors = [
    '#60A5FA', '#F87171', '#34D399', '#FBBF24',
    '#A78BFA', '#FB68', '#FACC15', '#4ADE80',
    '#818CF8', '#F472B6'
  ];

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: colors.slice(0, labels.length),
        borderWidth: 1,
        marginTop: 20, 
      },
    ],
  };

  const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    datalabels: {
      color: '#374151',
      formatter: (value, context) => {
        const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
        const percentage = ((value / total) * 100).toFixed(1);
        return `${percentage}%`;
      },
      font: {
        weight: 'bold',
        size: 14,
      },
    },
    legend: {
      position: 'bottom',
      labels: {
        color: '#6B7280',
        padding: 25,
      },
    },
  },
};


 return (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 mb-6 h-96 flex flex-col">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Spending by Category</h2>
    <div className="flex-1">
      <Pie data={data} options={options} />
    </div>
  </div>
);
};

export default CategoryPieChart;
