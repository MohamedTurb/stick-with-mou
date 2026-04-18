"use client";
import { useState, useEffect, useCallback } from "react";

// Custom hook for cart management using localStorage
export function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("nox-cart");
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
    setIsLoaded(true);
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("nox-cart", JSON.stringify(cartItems));
    } catch (err) {
      console.error("Failed to save cart:", err);
    }
  }, [cartItems, isLoaded]);

  // Add item to cart (or increase qty if already exists)
  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  // Remove item from cart entirely
  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  // Update quantity of a specific item
  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  // Clear all cart items
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Total items count (sum of all quantities)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isLoaded,
  };
}
