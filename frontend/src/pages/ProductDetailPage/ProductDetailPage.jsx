import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error('Failed to fetch product:', err));
  }, [id]);

  if (!product) {
    return <p className="loading-text">Loading...</p>;
  }

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
        <p className="detail-category">{product.category}</p>
        <p className="detail-price">${product.price}</p>
        <p className="detail-description">{product.description}</p>
      </div>
    </div>
  );
}

export default ProductDetailPage;
