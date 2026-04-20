import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './LoginPage.module.css';

function LoginPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser({ username: data.username });
        navigate('/admin/orders');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Connection error. Is the backend running?');
    }
  };

  return (
    <main className={styles.loginContainer}>
      <h2>Staff Login</h2>

      {/* aria-live ensures screen readers announce errors immediately without needing to tab to them */}
      <div aria-live="polite">
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>

      <form
        onSubmit={handleLogin}
        className={styles.loginForm}
        aria-label="Staff Login Form"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={styles.input}
          aria-label="Username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
          aria-label="Password"
        />
        <button
          type="submit"
          className={styles.loginBtn}
          tabIndex="0" /* Forces Mac Safari tab stop */
        >
          Login
        </button>
      </form>
    </main>
  );
}

LoginPage.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginPage;
