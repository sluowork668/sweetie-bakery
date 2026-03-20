import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./Navbar.css";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Clear the React state
    navigate("/");  // Send them home
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Sweetie Bakery</div>

      <div className="navbar-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/order">Order</NavLink>

        {user ? (
          <>
            <NavLink to="/admin/products">Admin - Menu</NavLink>
            <NavLink to="/admin/orders">Admin - Orders</NavLink>
            <button onClick={handleLogout} className="logout-link">Logout</button>
          </>
        ) : (
          <NavLink to="/login">Staff Login</NavLink>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
};

export default Navbar;