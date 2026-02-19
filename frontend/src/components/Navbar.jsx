import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

function Navbar() {
  const { logoutUser } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to=""><big><i>BL</i></big></Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/transactions">Transactions</Link>
      </div>

      <button className="logout-btn" onClick={logoutUser}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
