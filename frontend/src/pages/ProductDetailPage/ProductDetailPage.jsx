import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './ProductDetailPage.module.css';
import { useCart } from '../../useCart.js';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, decrementFromCart, getItemQty } = useCart();

  useEffect(() => {
    const productUrl = import.meta.env.VITE_API_URL
      ? `${import.meta.env.VITE_API_URL}/api/products/${id}`
      : `/api/products/${id}`;

    fetch(productUrl)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error('Failed to fetch product:', err));
  }, [id]);

  if (!product) {
    return (
      <div className={styles.loadingText} aria-live="polite">
        Loading product details...
      </div>
    );
  }

  const productId = String(product.id ?? product._id ?? id);
  const qty = getItemQty(productId);

  return (
    <main className={styles.productDetailPage}>
      <Link
        to="/menu"
        className={styles.backButton}
        tabIndex="0"
        aria-label="Go back to menu"
      >
        ← Back to Menu
      </Link>

      <article className={styles.productDetailCard}>
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className={styles.detailImage}
          />
        )}

        <h1>{product.name}</h1>
        <section
          className={styles.detailMeta}
          aria-label="Product Specifications"
        >
          <span className={styles.detailBadge}>
            ${Number(product.price).toFixed(2)}
          </span>
          <span
            className={styles.detailBadge}
            style={{ textTransform: 'capitalize' }}
          >
            {product.category}
          </span>
          <span
            className={`${styles.detailBadge} ${styles.detailStock} ${product.inStock ? styles.inStock : styles.outOfStock}`}
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
          {product.calories > 0 && (
            <span className={styles.detailBadge}>{product.calories} Cal</span>
          )}
        </section>

        <section aria-label="Ingredients and Flavors">
          {product.ingredients && (
            <p className={styles.detailInfoRow}>
              <strong>Ingredients:</strong> {product.ingredients}
            </p>
          )}
          {product.allergens && (
            <p className={`${styles.detailInfoRow} ${styles.detailAllergens}`}>
              <strong>Allergens:</strong> {product.allergens}
            </p>
          )}
          {product.flavorProfile && (
            <p className={styles.detailInfoRow}>
              <strong>Flavor Profile:</strong> {product.flavorProfile}
            </p>
          )}
          {product.description && (
            <p className={styles.detailDescription}>{product.description}</p>
          )}
        </section>

        <div className={styles.detailActions}>
          <div
            className={styles.qtyStepper}
            aria-label={`Quantity selector for ${product.name}`}
          >
            <button
              type="button"
              className={styles.qtyStepperBtn}
              aria-label="Decrease quantity"
              disabled={qty === 0}
              tabIndex="0"
              onClick={() => decrementFromCart(productId)}
            >
              −
            </button>

            <span
              className={styles.qtyStepperValue}
              aria-live="polite"
              aria-label="Current quantity in cart"
            >
              {qty}
            </span>

            <button
              type="button"
              className={styles.qtyStepperBtn}
              aria-label="Increase quantity"
              tabIndex="0"
              onClick={() => addToCart(product)}
            >
              +
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}

ProductDetailPage.propTypes = {};

export default ProductDetailPage;
