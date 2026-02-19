import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authService";
import { Link } from "react-router-dom";
import "../styles/Form.css"; 

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="form-container">
  <h2>Register</h2>
  <form onSubmit={handleSubmit} className="form-card">
    <input name="name" placeholder="Name" onChange={handleChange} />
    <input name="email" placeholder="Email" onChange={handleChange} />
    <input
      name="password"
      type="password"
      placeholder="Password"
      onChange={handleChange}
    />
    <button type="submit">Register</button>
  </form>

  <p className="form-link">
    Already have an account? <Link to="/login">Login here</Link>
  </p>
</div>
    
  );
}




export default Register;
