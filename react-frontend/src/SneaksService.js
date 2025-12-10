
import SneaksAPI from "sneaks-api";

const sneaks = new SneaksAPI();

export async function searchShoes(query, limit = 20) {
  return new Promise((resolve, reject) => {
    sneaks.getProducts(query, limit, (err, products) => {
      if (err) return reject(err);
      resolve(products);
    });
  });
}

export async function getProductPrices(styleID) {
  return new Promise((resolve, reject) => {
    sneaks.getProductPrices(styleID, (err, product) => {
      if (err) return reject(err);
      resolve(product);
    });
  });
}

export async function getMostPopular(limit = 10) {
  return new Promise((resolve, reject) => {
    sneaks.getMostPopular(limit, (err, products) => {
      if (err) return reject(err);
      resolve(products);
    });
  });
}
