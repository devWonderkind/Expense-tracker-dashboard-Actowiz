import { useEffect, useState } from "react";
import { IoWalletSharp } from "react-icons/io5";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { BiSolidPurchaseTag } from "react-icons/bi";
const DashboardSummary = ({ expenses }) => {
  const [summary, setSummary] = useState({
    total: 0,
    today: 0,
    last7days: 0,
    count: 0,
  });

  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    let total = 0;
    let todayTotal = 0;
    let last7Total = 0;
    let count = 0;

    expenses.forEach((expense) => {
      const amount = parseFloat(expense.Amount);
      const expenseDate = new Date(expense.Date);

      if (isNaN(expenseDate)) return; // skip invalid dates

      count++;
      total += amount;

      const expenseDateStr = expenseDate.toISOString().split("T")[0];

      if (expenseDateStr === todayStr) {
        todayTotal += amount;
      }

      if (expenseDate >= sevenDaysAgo && expenseDate <= today) {
        last7Total += amount;
      }
    });

    setSummary({
      total,
      today: todayTotal,
      last7days: last7Total,
      count,
    });
  }, [expenses]);

  const cardClass =
    "bg-white shadow-md p-4 rounded-xl border border-gray-200 gray-700 h-full";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <div className={`${cardClass}`}>
        <div className="inline-flex items-center justify-center bg-blue-100 p-3 rounded-lg mb-4">
          <IoWalletSharp className="text-blue-400 font-bold text-2xl" />
        </div>
        <p className="text-lg text-gray-500 font-medium flex items-center gap-2">
          Total Spend
        </p>
        <h2 className="text-2xl font-semibold text-black mt-4">
          ₹{summary.total.toFixed(2)}
        </h2>
      </div>

      <div className={`${cardClass} `}>
        <div className="inline-flex items-center justify-center bg-red-100 p-3 rounded-lg mb-4">
          <RiMoneyRupeeCircleFill className="text-red-400 font-bold text-2xl" />
        </div>
        <p className="text-lg text-gray-500 font-medium flex items-center gap-2">
          Today's Expenses
        </p>
        <h2 className="text-2xl font-semibold text-black mt-4">
          ₹{summary.today.toFixed(2)}
        </h2>
      </div>
      <div className={`${cardClass}`}>
        <div className="inline-flex items-center justify-center bg-yellow-100 p-3 rounded-lg mb-4">
          <BiSolidPurchaseTag className="text-yellow-400 font-bold text-2xl" />
        </div>
        <p className="text-lg text-gray-500 font-medium flex items-center gap-2">
          Total Purchases
        </p>
        <h2 className="text-2xl font-semibold text-black mt-4">
          {summary.count}
        </h2>
      </div>
    </div>
  );
};

export default DashboardSummary;
