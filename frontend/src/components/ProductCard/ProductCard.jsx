import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './ProductCard.module.css';
import { useCart } from '../../useCart.js';

function ProductCard({ product }) {
  const { addToCart, decrementFromCart, getItemQty } = useCart();
  const productRouteId = product.id ?? product._id;
  const productId = String(productRouteId);
  const qty = getItemQty(productId);

  return (
    <article className={styles.productCard}>
      <Link 
        to={`/products/${productRouteId}`} 
        className={styles.productCardLink}
        tabIndex="0"
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={product.imageUrl || '/images/products/default.jpg'}
          alt={product.name}
          className={styles.productCardImage}
        />
        <h3>{product.name}</h3>
        <p className={styles.productCategory}>{product.category}</p>
        <p className={styles.productPrice}>${Number(product.price).toFixed(2)}</p>
        <p className={styles.productDescription}>{product.description}</p>
      </Link>

      <div className={styles.productCardActions}>
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
            onClick={(e) => {
              e.preventDefault();
              decrementFromCart(productId);
            }}
          >
            −
          </button>

          <span className={styles.qtyStepperValue} aria-live="polite" aria-label="Current quantity in cart">
            {qty}
          </span>

          <button
            type="button"
            className={styles.qtyStepperBtn}
            aria-label="Increase quantity"
            tabIndex="0"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    ingredients: PropTypes.string,
    allergens: PropTypes.string,
    calories: PropTypes.number,
    flavorProfile: PropTypes.string,
    inStock: PropTypes.bool,
  }).isRequired,
};

export default ProductCard;