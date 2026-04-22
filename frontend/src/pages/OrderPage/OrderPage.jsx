import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../../useCart.js';
import styles from './OrderPage.module.css';

function OrderPage() {
  const { cartItems, totalPrice, addToCart, decrementFromCart, clearCart } = useCart();

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

      const ordersUrl = import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}/api/orders`
        : '/api/orders';

      const response = await fetch(ordersUrl, {
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
      <main className={`${styles.orderPageContainer} ${styles.orderPageSuccessOnly}`}>
        <section className={styles.orderSuccess} role="status" aria-live="polite">
          <div className={styles.orderSuccessIcon} aria-hidden="true">
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
          <p className={styles.orderSuccessMessage}>
            Thank you! Your order has been placed successfully.
          </p>
          <button
            type="button"
            className={`${styles.submitBtn} ${styles.orderSuccessCta}`}
            onClick={() => setSubmitted(false)}
            tabIndex="0"
          >
            Place Another Order
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.orderPageContainer}>
      <h2>Place an Order</h2>
      <section className={styles.orderSummaryCard} aria-label="Cart Summary">
        <h3>Your Cart</h3>

        {cartItems.length === 0 ? (
          <p className={styles.emptyCartText}>Your cart is currently empty.</p>
        ) : (
          <ul className={styles.orderItemList}>
            {cartItems.map((item) => (
              <li key={item.productId} className={styles.orderItemRow}>
                <div className={styles.orderItemMain}>
                  <p className={styles.orderItemName}>{item.name}</p>
                  <p className={styles.orderItemMeta}>
                    ${item.price.toFixed(2)} each
                  </p>
                </div>

                <div className={styles.orderItemQty}>
                  <div
                    className={styles.qtyStepper}
                    aria-label={`Quantity selector for ${item.name}`}
                  >
                    <button
                      type="button"
                      className={styles.qtyStepperBtn}
                      aria-label="Decrease quantity"
                      tabIndex="0"
                      onClick={() => decrementFromCart(item.productId)}
                    >
                      −
                    </button>

                    <span
                      className={styles.qtyStepperValue}
                      aria-label="Current quantity"
                      aria-live="polite"
                    >
                      {item.qty}
                    </span>

                    <button
                      type="button"
                      className={styles.qtyStepperBtn}
                      aria-label="Increase quantity"
                      tabIndex="0"
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

                <p className={styles.orderItemLineTotal}>
                  ${(item.price * item.qty).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.orderTotalRow}>
          <span>Total</span>
          <strong>${totalPrice.toFixed(2)}</strong>
        </div>
      </section>

      <form className={styles.orderForm} onSubmit={handleSubmit} aria-label="Checkout Form">
        <div className={styles.formGroup}>
          <label htmlFor="customerName">Name:</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            aria-required="true"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-required="true"
          />
        </div>
        
        {/* Ensures screen readers announce submission errors automatically */}
        <div aria-live="assertive">
          {submitError ? <div className={styles.orderError}>{submitError}</div> : null}
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={cartItems.length === 0}
          tabIndex="0"
        >
          {submitting ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </main>
  );
}

OrderPage.propTypes = {};

export default OrderPage;