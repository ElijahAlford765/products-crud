import axios from "axios";

const API_URL = "http://localhost:3000/api/products";

class ProductsService {
  getProducts() {
    return axios.get(`${API_URL}/`);
  }

  createProduct(product) {
    return axios.post(`${API_URL}/`, product);
  }

  getProductById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  deleteProduct(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new ProductsService();
