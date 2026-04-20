import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="product-card-link">
      <div className="product-card">
        {/* Removed the && condition and added a fallback image path */}
        <img
          src={product.imageUrl || '/images/products/default.jpg'}
          alt={product.name}
          className="product-card-image"
        />

        <h3>{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>
      </div>
    </Link>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
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
