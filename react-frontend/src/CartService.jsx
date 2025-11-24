import axios from 'axios';


const API_URL = 'http://localhost:5000/api/cart'; // Replace with your backend endpoint

const CartService = {
  getCartItems: () => axios.get(API_URL),
  addToCart: (productId, quantity = 1) => 
    axios.post(API_URL, { productId, quantity }),
  updateCartItem: (id, quantity) => 
    axios.put(`${API_URL}/${id}`, { quantity }),
  removeCartItem: (id) => axios.delete(`${API_URL}/${id}`),
};

export default CartService;
