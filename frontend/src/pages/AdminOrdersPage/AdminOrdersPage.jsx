import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './AdminOrdersPage.css';

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all orders when the component loads
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update local state so the UI reflects the change immediately
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

  // Delete an order
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;

    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted order from local state
        setOrders(orders.filter((order) => order._id !== id));
      }
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-orders-container">
      <h2>Order Management Dashboard</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Order Details</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <strong>{order.customerName}</strong>
                  <br />
                  <small>{order.email}</small>
                </td>
                <td>{order.orderDetails}</td>
                <td>
                  <select
                    value={order.status || 'pending'}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className={`status-select ${order.status || 'pending'}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

AdminOrdersPage.propTypes = {};

export default AdminOrdersPage;
