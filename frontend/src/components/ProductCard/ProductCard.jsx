import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProductCard.css';
import { useCart } from '../../useCart.js';

function ProductCard({ product }) {
  const { addToCart, decrementFromCart, getItemQty } = useCart();
  const productRouteId = product.id ?? product._id;
  const productId = String(productRouteId);
  const qty = getItemQty(productId);

  return (
    <Link to={`/products/${productRouteId}`} className="product-card-link">
      <div className="product-card">
        <img
          src={product.imageUrl || '/images/products/default.jpg'}
          alt={product.name}
          className="product-card-image"
        />

        <h3>{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${Number(product.price).toFixed(2)}</p>
        <p className="product-description">{product.description}</p>

        <div className="product-card-actions">
          <div
            className="qty-stepper"
            aria-label={`Quantity selector for ${product.name}`}
          >
            <button
              type="button"
              className="qty-stepper-btn"
              aria-label="Decrease quantity"
              disabled={qty === 0}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                decrementFromCart(productId);
              }}
            >
              −
            </button>

            <span className="qty-stepper-value" aria-label="Current quantity">
              {qty}
            </span>

            <button
              type="button"
              className="qty-stepper-btn"
              aria-label="Increase quantity"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </Link>
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
    // --- Updated to match new Schema ---
    ingredients: PropTypes.string,
    allergens: PropTypes.string,
    calories: PropTypes.number,
    flavorProfile: PropTypes.string,
    inStock: PropTypes.bool,
  }).isRequired,
};

export default ProductCard;
