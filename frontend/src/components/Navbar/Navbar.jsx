import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Sweetie Bakery</div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/menu">Order</Link>
        <Link to="/admin/products">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;
