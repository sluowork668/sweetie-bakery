import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import MenuPage from './pages/MenuPage/MenuPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import AdminProductsPage from './pages/AdminProductsPage/AdminProductsPage';
import OrderPage from './pages/OrderPage/OrderPage';
import AdminOrdersPage from './pages/AdminOrdersPage/AdminOrdersPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />

        <Route path="/login" element={<LoginPage setUser={setUser} />} />

        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
      </Routes>
    </>
  );
}

export default App;
