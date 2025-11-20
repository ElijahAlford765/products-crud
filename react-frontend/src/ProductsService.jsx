import axios from 'axios';

const PRODUCTS_API_BASE_URL = "/api/products";

class ProductsService {
  getProducts() {
    return axios.get(PRODUCTS_API_BASE_URL + "/");
  }

  createProduct(product) {
    return axios.post(PRODUCTS_API_BASE_URL + "/", product);
  }

  getProductById(id) {
    return axios.get(`${PRODUCTS_API_BASE_URL}/${id}`);
  }

  deleteProduct(id) {
    return axios.delete(`${PRODUCTS_API_BASE_URL}/${id}`);
  }
}

export default new ProductsService();