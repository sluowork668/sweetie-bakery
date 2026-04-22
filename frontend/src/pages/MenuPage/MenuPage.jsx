import { useEffect, useMemo, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductFilter from '../../components/ProductFilter/ProductFilter';
import styles from './MenuPage.module.css';

function MenuPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const productsUrl = import.meta.env.VITE_API_URL
      ? `${import.meta.env.VITE_API_URL}/api/products`
      : '/api/products';

    fetch(productsUrl)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error('Failed to fetch products:', err));
  }, []);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedCategory === 'all') return true;
      return product.category === selectedCategory;
    });
  }, [products, selectedCategory]);

  return (
    <main className={styles.menuPage}>
      <h1>Sweetie Bakery Menu</h1>

      <ProductFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {filteredProducts.length === 0 ? (
        <div className={styles.noProducts} aria-live="polite">
          No real products available in this category.
        </div>
      ) : (
        <section className={styles.productGrid} aria-label="Product Menu">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
}

export default MenuPage;