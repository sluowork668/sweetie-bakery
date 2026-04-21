import { useState } from 'react';
import { useCart } from '../../useCart.js';
import './OrderPage.css';

function OrderPage() {
  const { cartItems, totalPrice, addToCart, decrementFromCart, clearCart } =
    useCart();

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0 || submitting) return;

    setSubmitError('');
    setSubmitting(true);

    try {
      const payload = {
        customerName: formData.customerName,
        customerEmail: formData.email,
        items: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          qty: item.qty,
          price: item.price,
        })),
        totalPrice,
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      clearCart();
      setSubmitted(true);
      setFormData({ customerName: '', email: '' });
    } catch (err) {
      setSubmitError(err?.message || 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="order-page-container order-page-success-only">
        <div className="order-success" role="status" aria-live="polite">
          <div className="order-success-icon" aria-hidden="true">
            <svg
              viewBox="0 0 72 72"
              width="72"
              height="72"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="36" cy="36" r="36" fill="#16a34a" />
              <path
                d="M22 37 L32 47 L50 26"
                fill="none"
                stroke="#fff"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="order-success-message">
            Thank you! Your order has been placed successfully.
          </p>
          <button
            type="button"
            className="submit-btn order-success-cta"
            onClick={() => setSubmitted(false)}
          >
            Place Another Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page-container">
      <h2>Place an Order</h2>
      <section className="order-summary-card">
        <h3>Your Cart</h3>

        {cartItems.length === 0 ? (
          <p className="empty-cart-text">Your cart is currently empty.</p>
        ) : (
          <ul className="order-item-list">
            {cartItems.map((item) => (
              <li key={item.productId} className="order-item-row">
                <div className="order-item-main">
                  <p className="order-item-name">{item.name}</p>
                  <p className="order-item-meta">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>

                <div className="order-item-qty">
                  <div
                    className="qty-stepper"
                    aria-label={`Quantity selector for ${item.name}`}
                  >
                    <button
                      type="button"
                      className="qty-stepper-btn"
                      aria-label="Decrease quantity"
                      onClick={() => decrementFromCart(item.productId)}
                    >
                      −
                    </button>

                    <span
                      className="qty-stepper-value"
                      aria-label="Current quantity"
                    >
                      {item.qty}
                    </span>

                    <button
                      type="button"
                      className="qty-stepper-btn"
                      aria-label="Increase quantity"
                      onClick={() =>
                        addToCart({
                          id: item.productId,
                          name: item.name,
                          price: item.price,
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <p className="order-item-line-total">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="order-total-row">
          <span>Total</span>
          <strong>${totalPrice.toFixed(2)}</strong>
        </div>
      </section>

      <form className="order-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerName">Name:</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {submitError ? <div className="order-error">{submitError}</div> : null}
        <button
          type="submit"
          className="submit-btn"
          disabled={cartItems.length === 0}
        >
          {submitting ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}

export default OrderPage;
