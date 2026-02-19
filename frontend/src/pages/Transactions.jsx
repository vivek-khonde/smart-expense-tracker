import { useEffect, useState } from "react";
import "../styles/Form.css"; 
import "../styles/Transactions.css";
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../api/transactionService";
import { getCategories } from "../api/categoryService";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ amount: "", type: "EXPENSE", categoryId: "", description: "", date: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  const fetchTransactions = async () => {
    const res = await getTransactions();
    setTransactions(res.data);
  };

  const fetchCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateTransaction(editId, form);
      setEditId(null);
    } else {
      await addTransaction(form);
    }
    setForm({ amount: "", type: "EXPENSE", categoryId: "", description: "", date: "" });
    fetchTransactions();
  };

  const handleEdit = (t) => setForm({ ...t, categoryId: t.category.id }) || setEditId(t.id);

  const handleDelete = async (id) => {
    if (window.confirm("Delete transaction?")) {
      await deleteTransaction(id);
      fetchTransactions();
    }
  };

  return (
    <>
    <div className="form-container">
  <h2>Transactions</h2>

  <form onSubmit={handleSubmit} className="form-card">
    <input
      type="number"
      placeholder="Amount"
      value={form.amount}
      onChange={(e) => setForm({ ...form, amount: e.target.value })}
    />

    <select
      value={form.type}
      onChange={(e) => setForm({ ...form, type: e.target.value })}
    >
      <option value="INCOME">Income</option>
      <option value="EXPENSE">Expense</option>
    </select>

    <select
      value={form.categoryId}
      onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
    >
      <option value="">Select category</option>
      {categories.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>

    <input
      placeholder="Description"
      value={form.description}
      onChange={(e) => setForm({ ...form, description: e.target.value })}
    />

    <input
      type="date"
      value={form.date}
      onChange={(e) => setForm({ ...form, date: e.target.value })}
    />

    <button type="submit">{editId ? "Update" : "Add"}</button>
  </form>
</div>

<table className="transaction-table">
  <thead>
    <tr>
      <th>Date</th>
      <th>Type</th>
      <th>Amount</th>
      <th>Category</th>
      <th>Description</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {transactions.map((t) => (
      <tr key={t.id}>
        <td>{t.date}</td>
        <td>{t.type}</td>
        <td>₹ {t.amount}</td>
        <td>{t.category?.name || "No Category"}</td>
        <td>{t.description}</td>
        <td>
          <button onClick={() => handleEdit(t)}>Edit</button>
          <button onClick={() => handleDelete(t.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


</>
  );
}

export default Transactions;
