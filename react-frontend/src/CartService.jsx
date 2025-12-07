import axios from "axios";

const API_URL = "http://localhost:3000/api/cart";

axios.defaults.withCredentials = true; // send session cookie

const CartService = {
  getCartItems: () => axios.get(API_URL),
  addToCart: ({ productId, selectedSize, selectedGender, quantity = 1 }) =>
    axios.post(API_URL, { productId, selectedSize, selectedGender, quantity }),
  removeCartItem: (id) => axios.delete(`${API_URL}/${id}`),
};

export default CartService;
