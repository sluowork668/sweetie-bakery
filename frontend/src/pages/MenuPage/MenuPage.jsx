import { useEffect, useMemo, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import "./MenuPage.css";

function MenuPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Menu fetched products:", data.length);
        setProducts(data);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const realProducts = useMemo(() => {
    return products.filter((product) => product.isSample !== true);
  }, [products]);

  const categories = useMemo(() => {
    return [...new Set(realProducts.map((product) => product.category))];
  }, [realProducts]);

  const filteredProducts = useMemo(() => {
    return realProducts.filter((product) => {
      if (selectedCategory === "all") return true;
      return product.category === selectedCategory;
    });
  }, [realProducts, selectedCategory]);

  return (
    <div className="menu-page">
      <h1>Sweetie Bakery Menu</h1>

      <ProductFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          No real products available in this category.
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MenuPage;
