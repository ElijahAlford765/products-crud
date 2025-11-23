"use strict";
const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();

async function getPopularShoes() {
    return new Promise((resolve, reject) => {
        sneaks.getMostPopular(20, (err, products) => {
            if (err) return reject(err);
            resolve(products);
        });
    });
}

async function searchShoes(query) {
    return new Promise((resolve, reject) => {
        sneaks.search({ query }, (err, products) => {
            if (err) return reject(err);
            resolve(products);
        });
    });
}

module.exports = { getPopularShoes, searchShoes };
