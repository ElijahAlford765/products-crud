import React, { useState, useEffect } from 'react';
import ProductsService from '../ProductsService';
import { Link } from 'react-router-dom';
import '../index.css';

const ProductsListHome = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductsService.getProducts().then(res => {
      setProducts(res.data);
      document.title = 'Home - Products';
    });
  }, []);

  return (
    <div>
        <h1 className="text-center">StepLab </h1>
      <h2 className="text-center">Products</h2>
      <main className="items-container">
        {products.map(product => (
          <article className="item" key={product.id}>
            <div className="text">
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <p>Type: {product.type}</p>
              <p>Description: {product.description}</p>
              <p><Link className="btn btn-outline-info" to={`/products/${product.id}`}>View</Link></p>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
};

export default ProductsListHome;
