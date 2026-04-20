import { useEffect, useMemo, useState } from 'react';
import ProductForm from '../../components/ProductForm/ProductForm';
import styles from './AdminProductsPage.module.css';

const API_BASE_URL = '/api/products';

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const fetchProducts = () => {
    fetch(API_BASE_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data))
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
      if (!productId) return alert('Error: Product _id is missing!');

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
      alert('Update failed: ' + err.message);
    }
  };

  const handleDeleteProduct = async (product) => {
    if (!product._id) return alert('Error: missing _id.');
    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) return;

    try {
      const res = await fetch(`${API_BASE_URL}/${product._id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete product');
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const handleSubmit = (productData) => {
    if (editingProduct) handleUpdateProduct(productData);
    else handleAddProduct(productData);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = (product.name || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <main className={styles.adminProductsPage}>
      <h1>Admin Management</h1>

      <ProductForm
        onSubmit={handleSubmit}
        editingProduct={editingProduct}
        onCancel={() => setEditingProduct(null)}
      />

      <section className={styles.adminFilters} aria-label="Filter products">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search products"
        />
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          aria-label="Select product category"
        >
          <option value="all">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </section>

      <div className={styles.adminResultsCount} aria-live="polite">
        Showing {filteredProducts.length} products
      </div>

      <section className={styles.adminProductsList} aria-label="Product list">
        {filteredProducts.map((product) => (
          <article key={product._id} className={styles.adminProductCard}>
            <div>
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
                />
              ) : (
                <div style={{ width: '60px', height: '60px', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#999' }} aria-hidden="true">
                  No Image
                </div>
              )}
            </div>

            <div className={styles.adminProductInfo}>
              <h3>{product.name}</h3>
              <p>${Number(product.price).toFixed(2)}</p>
              <p>{product.category}</p>
            </div>

            <div className={styles.adminProductActions}>
              <button 
                className={styles.editBtn} 
                onClick={() => handleEditClick(product)}
                aria-label={`Edit ${product.name}`}
              >
                Edit
              </button>
              <button 
                className={styles.deleteBtn} 
                onClick={() => handleDeleteProduct(product)}
                aria-label={`Delete ${product.name}`}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default AdminProductsPage;