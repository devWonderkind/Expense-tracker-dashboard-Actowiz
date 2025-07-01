# Expense Tracker Dashboard

An interactive and user-friendly **Expense Tracking Dashboard** built with **React** and **Tailwind CSS**. This app helps users visualize and manage their monthly expenses efficiently through charts, filters, and summary insights.

---

## 🛠 Tech Stack & Libraries Used

| Tool/Library | Purpose |
|--------------|---------|
| **React** | Core library for building UI components |
| **Tailwind CSS** | Utility-first CSS framework for responsive styling |
| **Vite** | Fast bundler & dev server for React |
| **Chart.js** | Charting library for bar, pie, and line charts |
| **React Chart.js 2** (`react-chartjs-2`) | React wrapper for Chart.js |
| **XLSX** | To parse Excel `.xlsx` files to JSON |
| **chartjs-plugin-datalabels** | Plugin to display data values directly on the charts |

---

## 🚀 Features

- 📊 Budget vs Actual Bar Chart
- 🥧 Category-wise Pie Chart
- 📈 Most Used Categories/Payment Methods Chart
- ⚠️ Overspending Alerts with Budget Insights
- 📅 Filter by Date, Category & Payment Method
- ➕ Add New Expenses (via popup form)
- 📤 Upload New Excel Files (dynamic parsing)
- 📁 Excel file auto-loaded on initial startup

---

## 📦 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/expense-dashboard.git
cd expense-dashboard
npm install
npm install react-chartjs-2 chart.js chartjs-plugin-datalabels xlsx
npm run dev


