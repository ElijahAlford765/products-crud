import React, { useState, useEffect } from 'react';
import ProductsService from '../ProductsService';
import CartService from '../CartService';
import { Link } from 'react-router-dom';
import '../index.css';

const ProductsListComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductsService.getProducts()
      .then((res) => {
        setProducts(Array.isArray(res.data) ? res.data : res.data.products || []);
        document.title = 'Products List';
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setProducts([]);
      });
  }, []);

  const handleAddToCart = (productId) => {
    CartService.addToCart(productId)
      .then(() => alert('Product added to cart!'))
      .catch(err => console.error('Failed to add to cart:', err));
  };

  const handleDeleteProduct = (productId) => {
    ProductsService.deleteProduct(productId)
      .then(() => setProducts(products.filter(p => (p.id || p._id) !== productId)))
      .catch(err => console.error('Failed to delete product:', err));
  };

  if (!products.length) return <p className="text-center">No products available.</p>;

  return (
    <div>
      

      <h2 className="text-center">Products List</h2>
      <div className="row mb-3 text-center">
      
      </div>

      <div className="products-grid">
        {products.map(product => {
          const productId = product.id || product._id;
          return (
            <div className="product-card" key={productId}>
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="product-image"
                />
              )}
              <div className="product-name">{product.name}</div>
              <div className="product-price">${product.price}</div>
              <div className="product-category">{product.type}</div>
              <div className="product-description">{product.description}</div>
              <div className="product-actions">
                <Link className="btn btn-outline-info" to={`/products/${productId}`}>View</Link>
                <button className="btn btn-success" onClick={() => handleAddToCart(productId)}>Add to Cart</button>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsListComponent;
