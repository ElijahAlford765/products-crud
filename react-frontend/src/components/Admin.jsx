import React, { useState, useEffect } from 'react';
import ProductsService from '../ProductsService';
import { Link } from 'react-router-dom';
import '../index.css';

const ProductsAdminPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductsService.getProducts().then(res => {
      setProducts(res.data);
      document.title = 'Admin - Products';
    });
  }, []);

  const handleDelete = (id) => {
    ProductsService.deleteProduct(id)
      .then(() => setProducts(products.filter(p => p.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2 className="text-center">Admin - Products</h2>
      <div className="row mb-3">
        <Link to="/add-product" className="btn btn-outline-primary">Add Product</Link>
      </div>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Type</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td><Link to={`/products/${product.id}`}>{product.id}</Link></td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.type}</td>
                <td>{product.description}</td>
                <td>
                  <button className="btn btn-danger me-2" onClick={() => handleDelete(product.id)}>Delete</button>
                  <Link className="btn btn-warning" to={`/edit-product/${product.id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsAdminPage;
