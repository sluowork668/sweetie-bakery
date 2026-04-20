import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Navbar.module.css';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  // Helper function to handle React Router's active state with CSS Modules
  const getLinkStyle = ({ isActive }) => {
    return isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink;
  };

  return (
    <nav className={styles.navbar} aria-label="Main Navigation">
      <NavLink
        to="/"
        end
        className={styles.navbarBrand}
        tabIndex="0"
        aria-label="Sweetie Bakery Home"
      >
        Sweetie Bakery
      </NavLink>

      <div className={styles.navbarLinks}>
        <NavLink to="/menu" className={getLinkStyle} tabIndex="0">
          Menu
        </NavLink>
        <NavLink to="/order" className={getLinkStyle} tabIndex="0">
          Order
        </NavLink>

        {user ? (
          <>
            <NavLink to="/admin/products" className={getLinkStyle} tabIndex="0">
              Admin - Menu
            </NavLink>
            <NavLink to="/admin/orders" className={getLinkStyle} tabIndex="0">
              Admin - Orders
            </NavLink>
            <button
              onClick={handleLogout}
              className={styles.logoutLink}
              tabIndex="0"
              aria-label="Log out of staff portal"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className={getLinkStyle} tabIndex="0">
            Staff Login
          </NavLink>
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
