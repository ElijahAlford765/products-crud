import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductsService from '../ProductsService';
import '../index.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProductsService.getProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
    document.title = 'Home - Products';
  }, []);

  if (loading) return <p className="text-center">Loading products...</p>;
  if (!products.length) return <p className="text-center">No products available.</p>;

  return (
    <div>
      {/* Navigation */}
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/cart">Cart</Link> |{' '}
        <Link to="/admin/products">Admin</Link> |{' '}
        <Link to="/orders">Orders</Link>  |{' '}
         <Link to="/wishlist">WishList</Link>   |{' '}
        <Link to="/signin">Sign-up/Login</Link>
      </nav>
      <hr />

      {/* Products */}
      <h1 className="text-center">StepLab</h1>
      <h2 className="text-center">Products</h2>
      <main className="items-container">
        {products.map(product => (
          <article className="item" key={product.id}>
            <div className="text">
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <p>Type: {product.type || 'N/A'}</p>
              <p>Description: {product.description}</p>
              <p>
                <Link className="btn btn-outline-info" to={`/products/${product.id}`}>
                  View
                </Link>
              </p>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
};

export default Home;
