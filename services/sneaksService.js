import SneaksAPI from "sneaks-api";

const sneaks = new SneaksAPI();

export function searchShoes(query) {
  return new Promise((resolve, reject) => {
    sneaks.getProducts(query, (err, products) => {
      if (err) return reject(err);
      resolve(products);
    });
  });
}

export function getProductPrices(styleID) {
  return new Promise((resolve, reject) => {
    sneaks.getProductPrices(styleID, (err, product) => {
      if (err) return reject(err);
      resolve(product);
    });
  });
}

export function getMostPopular(limit = 10) {
  return new Promise((resolve, reject) => {
    sneaks.getMostPopular(limit, (err, list) => {
      if (err) return reject(err);
      resolve(list);
    });
  });
}
