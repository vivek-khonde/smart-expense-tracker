import { useEffect, useState } from "react";
import "../styles/Dashboard.css";

import { getTransactions } from "../api/transactionService";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async (start, end) => {
    try {
      const res = await getTransactions(start, end);
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilter = () => {
    fetchTransactions(startDate, endDate);
  };

  // CALCULATIONS 
  const totalIncome = transactions
    .filter(t => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // CATEGORY-WISE EXPENSE CHART 
  const expenseByCategory = {};

  transactions
    .filter(t => t.type === "EXPENSE")
    .forEach(t => {
      const catName = t.category.name;
      expenseByCategory[catName] =
        (expenseByCategory[catName] || 0) + t.amount;
    });

  const chartData = {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(expenseByCategory),
        backgroundColor: "rgba(59, 130, 246, 0.7)"
,
      },
    ],
  };

  return (
    <div className="dashboard-container">
  <h1>Dashboard</h1>

  {/* FILTER SECTION */}
  <div className="filter-section">
    <input
      type="date"
      value={startDate}
      onChange={e => setStartDate(e.target.value)}
    />
    <input
      type="date"
      value={endDate}
      onChange={e => setEndDate(e.target.value)}
    />
    <button onClick={handleFilter}>Filter</button>
  </div>

  {/* TOTALS */}
  <div className="totals">
    <h3>Total Income: ₹ {totalIncome}</h3>
    <h3>Total Expense: ₹ {totalExpense}</h3>
    <h3>Balance: ₹ {balance}</h3>
  </div>

  {/* CHART */}
  <div className="chart-section">
    <Bar data={chartData} />
  </div>
</div>

  );
}

export default Dashboard;
