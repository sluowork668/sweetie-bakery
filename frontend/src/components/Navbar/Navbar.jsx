import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Sweetie Bakery</div>

      <div className="navbar-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/order">Order</NavLink>
        <NavLink to="/admin/products">Admin - Menu</NavLink>
        <NavLink to="/admin/orders">Admin - Orders</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
