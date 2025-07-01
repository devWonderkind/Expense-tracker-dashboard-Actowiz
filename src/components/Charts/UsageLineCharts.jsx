import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const countByKey = (items, key) => {
  return items.reduce((acc, item) => {
    const value = item[key];
    if (value) acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
};

const buildChartData = (counts, color = '#3b82f6') => {
  const labels = Object.keys(counts);
  const data = Object.values(counts);

  return {
    labels,
    datasets: [
      {
        label: 'Count',
        data,
        borderColor: color,
        backgroundColor: `${color}20`, // Adding transparency
        pointBackgroundColor: color,
        pointBorderColor: color,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: color,
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 3,
        fill: true,
        tension: 0.4, // Smooth curves
      }
    ]
  };
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
    display: false,
  },
    legend: {
      display: false
    },
    title: {
      display: false
    },
    tooltip: {
      backgroundColor: '#374151',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#6b7280',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: false,
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#6b7280',
        font: {
          size: 12
        }
      },
      grid: {
        color: '#e5e7eb',
        drawBorder: false
      }
    },
    y: {
      ticks: {
        color: '#6b7280',
        font: {
          size: 12
        },
        beginAtZero: true
      },
      grid: {
        color: '#e5e7eb',
        drawBorder: false
      }
    }
  },
  elements: {
    point: {
      hoverRadius: 8
    }
  }
};

const UsageLineCharts = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Categories</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            No data available
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Payment Methods</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            No data available
          </div>
        </div>
      </div>
    );
  }

  const categoryCounts = countByKey(expenses, 'Category');
  const paymentCounts = countByKey(expenses, 'Payment Method');

  const categoryData = buildChartData(categoryCounts, '#3b82f6'); // Blue
  const paymentData = buildChartData(paymentCounts, '#10b981'); // Green

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Categories</h3>
        <div className="h-64">
          <Line data={categoryData} options={options} />
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Payment Methods</h3>
        <div className="h-64">
          <Line data={paymentData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default UsageLineCharts;
