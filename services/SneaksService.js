// services/sneaksService.js
const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();

// Search sneakers by keyword
exports.searchProducts = (keyword, limit = 20) => {
  return new Promise((resolve, reject) => {
    sneaks.getProducts(keyword, limit, (err, products) => {
      if (err) return reject(err);
      resolve(products);
    });
  });
};

// Get product prices by styleID
exports.getProductPrices = (styleID) => {
  return new Promise((resolve, reject) => {
    sneaks.getProductPrices(styleID, (err, product) => {
      if (err) return reject(err);
      resolve(product);
    });
  });
};

// Get most popular sneakers
exports.getMostPopular = (limit = 10) => {
  return new Promise((resolve, reject) => {
    sneaks.getMostPopular(limit, (err, products) => {
      if (err) return reject(err);
      resolve(products);
    });
  });
};
