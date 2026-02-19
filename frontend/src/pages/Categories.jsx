import { useState, useEffect } from "react";
import "../styles/Form.css"; 
import "../styles/Categories.css"; 
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoryService";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("EXPENSE"); // NEW
  const [editId, setEditId] = useState(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateCategory(editId, { name, type }); // send type
        setEditId(null);
      } else {
        await addCategory({ name, type }); // send type
      }

      setName("");
      setType("EXPENSE"); // reset
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setType(cat.type); // set type when editing
    setEditId(cat.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteCategory(id);
        fetchCategories();
      } catch (err) {
        console.error("Error deleting category:", err);
      }
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setName("");
    setType("EXPENSE");
  };

  return (
    <>
    <div className="form-container">
  <h2>Categories</h2>

  <form onSubmit={handleSubmit} className="form-card">
    <input
      placeholder="Category Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    {/* Type Dropdown */}
    <select
      value={type}
      onChange={(e) => setType(e.target.value)}
    >
      <option value="EXPENSE">Expense</option>
      <option value="INCOME">Income</option>
    </select>

    <button type="submit">{editId ? "Update" : "Add"}</button>

    {editId && (
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    )}
  </form>

</div>

<table className="category-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {categories.map((cat) => (
      <tr key={cat.id}>
        <td>{cat.name}</td>
        <td>{cat.type}</td>
        <td>
          <button onClick={() => handleEdit(cat)}>Edit</button>
          <button onClick={() => handleDelete(cat.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

</>
  );
}

export default Categories;
