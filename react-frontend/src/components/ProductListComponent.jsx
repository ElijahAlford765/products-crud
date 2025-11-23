/*import React, { useState, useEffect } from 'react';
import ProductsService from '../ProductsService';
import '../index.css';
import { Link } from 'react-router-dom';

const ProductsListComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {

    ProductsService.getProducts().then((res) => {
      setProducts(res.data);
      document.title = 'Products List';
    });



  }, []);

  return (
    <div>
      <h2 className="text-center">Products List</h2>
      <div className="row">
        <Link to="/add-product" className="btn btn-outline-primary">Add Product</Link>
      </div>
      <main className="items-container">
        {products.map(product => (
          <article className="item" key={product.id}>
            <div className="text">
              <h3>
                {product.id}:{product.name}
              </h3>
              <p>${product.price}</p>
              <p>Type: {product.type}</p>
              <p>Description: {product.description}</p>
              <p><Link className="btn btn-outline-info" to={`/products/${product.id}`}>View</Link></p>
              <button className="btn btn-danger" onClick={() => ProductsService.deleteProduct(product.id)
                .then(() => setProducts(products.filter(p => p.id !== product.id)))}>Delete</button>

            </div>
          </article>
        ))}
      </main>
      <h2> Products Table</h2>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Type</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td><Link to={`/products/${product.id}`}>{product.id}</Link></td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.type}</td>
                <td>{product.description}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => ProductsService.deleteProduct(product.id)
                    .then(() => setProducts(products.filter(p => p.id !== product.id)))}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsListComponent;
*/
