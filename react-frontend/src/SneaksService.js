import SneaksAPI from "sneaks-api";
const sneaks = new SneaksAPI();

module.exports = {
  // SEARCH shoes safely
  async searchShoes(query) {
    return new Promise((resolve) => {
      sneaks.getProducts(query, 20, (err, products) => {
        if (err || !products || products.length === 0) {
          console.error("SneaksAPI searchShoes error:", err);
          return resolve([]); // return empty list instead of crashing
        }
        resolve(products);
      });
    });
  },

  // GET product details/prices safely
  async getProductPrices(styleID) {
    return new Promise((resolve) => {
      sneaks.getProductPrices(styleID, (err, product) => {
        if (err || !product) {
          console.error("SneaksAPI getProductPrices error:", err);
          return resolve({ error: "Product not found" });
        }
        resolve(product);
      });
    });
  },

  // GET most popular sneakers safely
  async getMostPopular(limit = 10) {
    return new Promise((resolve) => {
      sneaks.getMostPopular(limit, (err, products) => {
        if (err || !products || products.length === 0) {
          console.error("SneaksAPI getMostPopular error:", err);
          return resolve([]); // return empty instead of error
        }
        resolve(products);
      });
    });
  }
};
