import axios from "axios";

const API_URL = "http://localhost:3000/api/products";
const REVIEWS_URL = "http://localhost:3000/api/reviews";

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

updateProduct(id, data) {
    return axios.put(`${API_URL}/${id}`, data, { withCredentials: true });

}
addProduct(productData) {
    return axios.post(API_URL, productData, { withCredentials: true });
  }

  // --- Add Reviews API calls ---
  getReviewsByProductId(id) {
    return axios.get(`http://localhost:3000/api/reviews/${id}`);
  }

  addReview(reviewData) {
    return axios.post(`http://localhost:3000/api/reviews/`, reviewData);
  }

  deleteReview(reviewId) {
    return axios.delete(`http://localhost:3000/api/reviews/${reviewId}`);
  }
}

export default new ProductsService();
