import { createContext, useState, useEffect } from "react";
import CartService from "./CartService";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch cart items from API
  const fetchCart = async () => {
    try {
      const res = await CartService.getCartItems();
      // Ensure cartItems is always an array
      setCartItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setCartItems([]); // fallback to empty array
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Calculate total safely
  useEffect(() => {
    setTotal(
      Array.isArray(cartItems)
        ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        : 0
    );
  }, [cartItems]);

  // Add product to cart
  const addToCart = async (product) => {
    try {
      const res = await CartService.addToCart(product);
      await fetchCart(); // refresh cart state
      alert(res.data.message);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  // Remove product from cart
  const removeFromCart = async (id) => {
    try {
      await CartService.removeCartItem(id);
      setCartItems(prev => Array.isArray(prev) ? prev.filter(item => item.cart_id !== id) : []);
    } catch (err) {
      console.error(err);
    }
  };

  // Update product quantity
  const updateQuantity = async (id, quantity) => {
    try {
      setCartItems(prev =>
        Array.isArray(prev)
          ? prev.map(item => item.cart_id === id ? { ...item, quantity } : item)
          : []
      );
      await CartService.updateCartItem(id, quantity);
    } catch (err) {
      console.error(err);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      if (Array.isArray(cartItems)) {
        await Promise.all(cartItems.map(item => CartService.removeCartItem(item.cart_id)));
      }
      setCartItems([]);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};
