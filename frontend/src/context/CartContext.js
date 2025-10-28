import React, { createContext, useState, useEffect } from 'react';
import API from '../api';

export const CartContext = createContext();

export function CartProvider({ children }){
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await API.get('/cart');
      setCart(res.data);
    } catch (err) {
      setCart({ items: [] });
    }
  };

  useEffect(() => {
    fetchCart();
  // eslint-disable-next-line
  }, []);

  const addOrUpdateItem = async (productId, quantity = 1) => {
    const res = await API.post('/cart/items', { productId, quantity });
    setCart(res.data);
  };

  const removeItem = async (productId) => {
    const res = await API.delete(`/cart/items/${productId}`);
    setCart(res.data);
  };

  return <CartContext.Provider value={{ cart, fetchCart, addOrUpdateItem, removeItem }}>{children}</CartContext.Provider>;
}
