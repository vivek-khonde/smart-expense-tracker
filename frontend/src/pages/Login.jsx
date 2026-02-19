import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authService";
import { useAuth } from "../context/AuthContext";
import "../styles/Form.css"; 
import { Link } from "react-router-dom";



function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      loginUser(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
   
<div className="form-container">
  <h2>Login</h2>
  <form onSubmit={handleSubmit} className="form-card">
    <input name="email" placeholder="Email" onChange={handleChange} />
    <input
      name="password"
      type="password"
      placeholder="Password"
      onChange={handleChange}
    />
    <button type="submit">Login</button>
  </form>

  <p className="form-link">
    Don’t have an account? <Link to="/register">Register here</Link>
  </p>
</div>
  );
}




export default Login;
