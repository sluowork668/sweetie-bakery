import { useState, useEffect } from 'react';
import styles from './AdminOrdersPage.module.css';

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersUrl = import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}/api/orders`
        : '/api/orders';
      const response = await fetch(ordersUrl);
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const orderItemUrl = import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}/api/orders/${id}`
        : `/api/orders/${id}`;
      const response = await fetch(orderItemUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setOrders(
          orders.map((order) =>
            order._id === id ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      const orderItemUrl = import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}/api/orders/${id}`
        : `/api/orders/${id}`;
      const response = await fetch(orderItemUrl, { method: 'DELETE' });
      if (response.ok) {
        setOrders(orders.filter((order) => order._id !== id));
      }
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className={styles.adminOrdersContainer}>
      <h2>Order Management Dashboard</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className={styles.ordersTable}>
          <thead>
            <tr>
              <th scope="col">Time Placed</th>
              <th scope="col">Customer</th>
              <th scope="col">Order Details</th>
              <th scope="col">Total</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <strong>{order.customerName || 'Guest'}</strong>
                  <br />
                  <small>{order.customerEmail || order.email}</small>
                </td>
                <td>
                  {order.items && order.items.length > 0 ? (
                    <ul style={{ paddingLeft: '20px', margin: 0 }}>
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.qty}x {item.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>{order.orderDetails}</span>
                  )}
                </td>
                <td>
                  ${order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}
                </td>
                <td>
                  <select
                    value={order.status || 'pending'}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className={`${styles.statusSelect} ${styles[order.status === 'in-progress' ? 'inProgress' : order.status || 'pending']}`}
                    aria-label={`Update status for order by ${order.customerName || 'Guest'}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <button
                    tabIndex="0" /* FORCES OS TO TAB HERE */
                    onClick={() => handleDelete(order._id)}
                    className={styles.deleteBtn}
                    aria-label={`Delete order for ${order.customerName || 'Guest'}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default AdminOrdersPage;
