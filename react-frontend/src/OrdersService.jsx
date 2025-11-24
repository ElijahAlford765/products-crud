import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders'; // Replace with your backend endpoint

const OrdersService = {
  getOrders: () => axios.get(API_URL),
};

export default OrdersService;
