import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from './cartContext.js';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((product) => {
    const productId = String(product.id ?? product._id);
    if (!productId) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [
        ...prev,
        {
          productId,
          name: product.name,
          price: Number(product.price) || 0,
          qty: 1,
        },
      ];
    });
  }, []);

  const decrementFromCart = useCallback((productId) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.productId === productId);
      if (!item) return prev;

      if (item.qty <= 1) {
        return prev.filter((i) => i.productId !== productId);
      }

      return prev.map((i) =>
        i.productId === productId ? { ...i, qty: i.qty - 1 } : i
      );
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getItemQty = useCallback(
    (productId) =>
      cartItems.find((item) => item.productId === productId)?.qty ?? 0,
    [cartItems]
  );

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      totalPrice,
      addToCart,
      decrementFromCart,
      removeFromCart,
      clearCart,
      getItemQty,
    }),
    [
      cartItems,
      totalPrice,
      addToCart,
      decrementFromCart,
      removeFromCart,
      clearCart,
      getItemQty,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
