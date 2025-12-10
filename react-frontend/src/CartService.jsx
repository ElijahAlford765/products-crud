import axios from "axios";

const API_URL = "http://localhost:3000/api/cart";

axios.defaults.withCredentials = true; 

const CartService = {
  getCartItems: () => axios.get(API_URL), 
 addToCart: ({ productId, selectedSize, selectedGender, quantity = 1 }) =>
  axios.post(API_URL, {
    productId,
    selectedSize,
    selectedGender,
    quantity
  }),

  removeCartItem: (id) => axios.delete(`${API_URL}/${id}`), /
  updateCartItem: (id, quantity) => axios.put(`${API_URL}/${id}`, { quantity }), /
};

export default CartService;
