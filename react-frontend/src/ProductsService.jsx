import axios from "axios";

const API_URL = "http://localhost:3000/api/products";
const REVIEWS_URL = "http://localhost:3000/api/reviews";

class ProductsService {
  getProducts() {
    return axios.get(API_URL); // GET /api/products
  }

  getProductById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  createProduct(product) {
    return axios.post(API_URL, product);
  }

  updateProduct(id, data) {
    return axios.put(`${API_URL}/${id}`, data);
  }

  deleteProduct(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  // Reviews
  getReviewsByProductId(id) {
    return axios.get(`${REVIEWS_URL}/${id}`);
  }

  addReview(reviewData) {
    return axios.post(REVIEWS_URL, reviewData);
  }

  deleteReview(id) {
    return axios.delete(`${REVIEWS_URL}/${id}`);
  }
}

export default new ProductsService();
