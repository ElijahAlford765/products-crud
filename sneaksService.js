// sneaksService.js
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();

exports.getPopularShoes = async () => {
  return new Promise((resolve, reject) => {
    sneaks.getMostPopular(20, (err, products) => {
      if (err) return reject(err);
      resolve(products);
    });
  });
};

exports.searchShoes = async (query) => {
  return new Promise((resolve, reject) => {
    sneaks.search({ query }, (err, products) => {
      if (err) return reject(err);
      resolve(products);
    });
  });
};
