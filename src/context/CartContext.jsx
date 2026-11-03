import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { SHAPE_IMAGES, getProductImages } from '../data/products';

const CartContext = createContext(null);
const STORAGE_KEY = 'babal-cart';
const DEFAULT_STOCK = 10;

const loadCart = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCart);

  // Save the cart whenever it changes, so it survives a refresh
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Same product + color + size + lens = one cart line; adding again raises the quantity
  const addToCart = (
    product,
    { colorIdx = 0, size = '', lensId = '', lensLabel = '', quantity = 1 } = {}
  ) => {
    const color = product.colors?.[colorIdx];
    const lineId = [product.name, product.id, colorIdx, size, lensId].join('|');
    const stock = product.stock ?? DEFAULT_STOCK;
    const addQty = Math.max(1, quantity);
    const image =
      product.image || getProductImages(product)?.[0] || SHAPE_IMAGES[product.shape];
    const variant = [color?.name, size, lensLabel].filter(Boolean).join(' / ');

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === lineId);

      if (existing) {
        return prev.map((item) =>
          item.id === lineId
            ? { ...item, stock, quantity: Math.min(stock, item.quantity + addQty) }
            : item
        );
      }

      return [
        ...prev,
        {
          id: lineId,
          productId: product.id,
          name: product.name,
          variant,
          price: product.price,
          image,
          quantity: Math.min(stock, addQty),
          stock,
        },
      ];
    });
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const next = Math.min(item.stock, Math.max(1, item.quantity + delta));
        return { ...item, quantity: next };
      })
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      subtotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [cartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}