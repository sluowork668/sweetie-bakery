import { useEffect, useMemo, useState } from 'react';
import ProductForm from '../../components/ProductForm/ProductForm';
import './AdminProductsPage.css';

const API_BASE_URL = 'http://localhost:3000/api/products';

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const fetchProducts = () => {
    fetch(API_BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log('Admin fetched products:', data);
        setProducts(data);
      })
      .catch((err) => console.error('Failed to fetch products:', err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add product');

      setProducts((prev) => [...prev, data]);
      alert('Product added successfully!');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const productId = updatedProduct._id;

      if (!productId) {
        alert(
          'Error: Product _id is missing! Make sure the product is saved in DB.'
        );
        return;
      }

      const res = await fetch(`${API_BASE_URL}/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update product');

      setProducts((prev) => prev.map((p) => (p._id === productId ? data : p)));
      setEditingProduct(null);
      alert('Product updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Update failed: ' + err.message);
    }
  };

  const handleDeleteProduct = async (product) => {
    const productId = product._id;

    if (!productId) {
      alert(
        'Error: This product does not have a database _id and cannot be deleted.'
      );
      return;
    }

    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`))
      return;

    try {
      const res = await fetch(`${API_BASE_URL}/${productId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete product');

      setProducts((prev) => prev.filter((p) => p._id !== productId));
      alert('Product deleted successfully!');
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Delete failed: ' + err.message);
    }
  };

  const handleSubmit = (productData) => {
    if (editingProduct) {
      handleUpdateProduct(productData);
    } else {
      handleAddProduct(productData);
    }
  };

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const isSynthetic = product.isSample === true;
      const isSearchingSample = searchTerm.toLowerCase().includes('sample');

      if (isSynthetic && !isSearchingSample) return false;

      const name = product.name || '';
      const desc = product.description || '';
      const matchesSearch =
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        desc.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="admin-products-page">
      <h1>Admin Management</h1>

      <ProductForm
        onSubmit={handleSubmit}
        editingProduct={editingProduct}
        onCancel={() => setEditingProduct(null)}
      />

      <div className="admin-filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label>
          <input
            type="checkbox"
            checked={showAvailableOnly}
            onChange={(e) => setShowAvailableOnly(e.target.checked)}
          />
          Available only
        </label>
      </div>

      <div className="admin-results-count">
        Showing {filteredProducts.length} products
      </div>

      <div className="admin-products-list">
        {filteredProducts.map((product) => (
          <div key={product._id} className="admin-product-card">
            <div className="admin-product-image-container">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="admin-thumbnail"
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    color: '#999',
                  }}
                >
                  No Image
                </div>
              )}
            </div>

            <div className="admin-product-info">
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <h3>{product.name}</h3>
                {product.isSample && (
                  <span
                    style={{
                      fontSize: '10px',
                      backgroundColor: '#f0f0f0',
                      padding: '2px 6px',
                      borderRadius: '10px',
                      color: '#666',
                    }}
                  >
                    Synthetic
                  </span>
                )}
              </div>
              <p className="price">${Number(product.price).toFixed(2)}</p>
              <p className="category-tag">{product.category}</p>
            </div>

            <div className="admin-product-actions">
              <button
                className="edit-btn"
                onClick={() => setEditingProduct(product)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteProduct(product)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProductsPage;
