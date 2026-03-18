import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import MenuPage from "./pages/MenuPage/MenuPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import AdminProductsPage from "./pages/AdminProductsPage/AdminProductsPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
      </Routes>
    </>
  );
}

export default App;
