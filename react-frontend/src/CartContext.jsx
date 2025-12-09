import { createContext, useState, useEffect } from "react";
import CartService from "./CartService";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCart = async () => {
    try {
      const res = await CartService.getCartItems();
      setCartItems(res.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  useEffect(() => { fetchCart(); }, []);

  useEffect(() => {
    setTotal(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0));
  }, [cartItems]);

  const addToCart = async (product) => {
    try {
      const res = await CartService.addToCart(product);
      await fetchCart(); // refresh cart state
      alert(res.data.message);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await CartService.removeCartItem(id);
      setCartItems(prev => prev.filter(item => item.cart_id !== id));
    } catch (err) { console.error(err); }
  };
  const updateQuantity = async (id, quantity) => {
  try {
    await CartService.updateCartItem(id, quantity);
    setCartItems(prev =>
      prev.map(item => item.cart_id === id ? { ...item, quantity } : item)
    );
  } catch (err) {
    console.error(err);
  }
};
const clearCart = async () => {
  try {
    await Promise.all(cartItems.map(item => CartService.removeCartItem(item.cart_id)));
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
