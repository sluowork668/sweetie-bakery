import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetailPage.css';
import { useCart } from '../../useCart.js';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, decrementFromCart, getItemQty } = useCart();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error('Failed to fetch product:', err));
  }, [id]);

  if (!product) {
    return <p className="loading-text">Loading...</p>;
  }

  const productId = String(product.id ?? product._id ?? id);
  const qty = getItemQty(productId);

  return (
    <div className="product-detail-page">
      <Link to="/menu" className="back-button">
        ← Back to Menu
      </Link>

      <div className="product-detail-card">
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="detail-image"
          />
        )}

        <h1>{product.name}</h1>
        <div className="detail-meta">
          <span className="detail-badge">
            ${Number(product.price).toFixed(2)}
          </span>
          <span
            className="detail-badge"
            style={{ textTransform: 'capitalize' }}
          >
            {product.category}
          </span>
          <span
            className={`detail-badge detail-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
          {product.calories > 0 && (
            <span className="detail-badge">{product.calories} Cal</span>
          )}
        </div>

        {product.ingredients && (
          <p className="detail-info-row">
            <strong>Ingredients:</strong> {product.ingredients}
          </p>
        )}
        {product.allergens && (
          <p className="detail-info-row detail-allergens">
            <strong>Allergens:</strong> {product.allergens}
          </p>
        )}
        {product.flavorProfile && (
          <p className="detail-info-row">
            <strong>Flavor Profile:</strong> {product.flavorProfile}
          </p>
        )}
        {product.description && (
          <p className="detail-description">{product.description}</p>
        )}

        <div className="detail-actions">
          <div
            className="qty-stepper"
            aria-label={`Quantity selector for ${product.name}`}
          >
            <button
              type="button"
              className="qty-stepper-btn"
              aria-label="Decrease quantity"
              disabled={qty === 0}
              onClick={() => decrementFromCart(productId)}
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
              onClick={() => addToCart(product)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
