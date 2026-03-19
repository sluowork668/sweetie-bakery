import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import MenuPage from './pages/MenuPage/MenuPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import AdminProductsPage from './pages/AdminProductsPage/AdminProductsPage';

// Import your new pages
import OrderPage from './pages/OrderPage/OrderPage';
import AdminOrdersPage from './pages/AdminOrdersPage/AdminOrdersPage';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />

        {/* Hazem's Routes */}
        <Route path="/order" element={<OrderPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
      </Routes>
    </>
  );
}

export default App;
