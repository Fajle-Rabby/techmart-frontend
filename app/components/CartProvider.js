'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], total_qty: 0, subtotal: '0 BDT', subtotal_raw: 0 });
  const [loading, setLoading] = useState(false);

  // লোকাল স্টোরেজ থেকে কার্ট লোড
  useEffect(() => {
    try {
      const saved = localStorage.getItem('techmart_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  // কার্ট পরিবর্তন হলে সেভ
  const saveCart = useCallback((newCart) => {
    setCart(newCart);
    try {
      localStorage.setItem('techmart_cart', JSON.stringify(newCart));
    } catch (e) {}
  }, []);

  // কার্ট হিসাব আপডেট
  const recalculate = useCallback((items) => {
    const total_qty = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal_raw = items.reduce((sum, item) => sum + item.total_raw, 0);
    return {
      items,
      total_qty,
      subtotal: subtotal_raw.toLocaleString() + ' BDT',
      subtotal_raw,
    };
  }, []);

  // কার্টে যোগ
  const addToCart = async (product) => {
    setLoading(true);
    try {
      const newItems = [...cart.items];
      const existingIndex = newItems.findIndex(item => item.product_id === product.id);

      if (existingIndex >= 0) {
        // আগে থেকে আছে — পরিমাণ বাড়াও
        newItems[existingIndex].quantity += (product.qty || 1);
        newItems[existingIndex].total_raw = newItems[existingIndex].unit_price_raw * newItems[existingIndex].quantity;
        newItems[existingIndex].total = newItems[existingIndex].total_raw.toLocaleString() + ' BDT';
      } else {
        // নতুন আইটেম
        const unitPrice = product.special_raw && product.special_raw > 0 ? product.special_raw : product.price_raw;
        const qty = product.qty || 1;
        newItems.push({
          cart_key: 'product_' + product.id,
          product_id: product.id,
          name: product.name,
          model: product.model || '',
          image: product.image || '',
          options: [],
          quantity: qty,
          unit_price: unitPrice.toLocaleString() + ' BDT',
          unit_price_raw: unitPrice,
          total: (unitPrice * qty).toLocaleString() + ' BDT',
          total_raw: unitPrice * qty,
          in_stock: product.in_stock !== false,
        });
      }

      const newCart = recalculate(newItems);
      saveCart(newCart);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'সমস্যা হয়েছে' };
    } finally {
      setLoading(false);
    }
  };

  // পরিমাণ আপডেট
  const updateQuantity = async (cartKey, quantity) => {
    setLoading(true);
    try {
      let newItems = [...cart.items];
      if (quantity <= 0) {
        newItems = newItems.filter(item => item.cart_key !== cartKey);
      } else {
        const index = newItems.findIndex(item => item.cart_key === cartKey);
        if (index >= 0) {
          newItems[index].quantity = quantity;
          newItems[index].total_raw = newItems[index].unit_price_raw * quantity;
          newItems[index].total = newItems[index].total_raw.toLocaleString() + ' BDT';
        }
      }
      saveCart(recalculate(newItems));
    } finally {
      setLoading(false);
    }
  };

  // আইটেম মুছুন
  const removeItem = async (cartKey) => {
    setLoading(true);
    try {
      const newItems = cart.items.filter(item => item.cart_key !== cartKey);
      saveCart(recalculate(newItems));
    } finally {
      setLoading(false);
    }
  };

  // কার্ট খালি
  const clearCart = async () => {
    saveCart({ items: [], total_qty: 0, subtotal: '0 BDT', subtotal_raw: 0 });
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
