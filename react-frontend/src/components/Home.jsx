import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductsService from '../ProductsService';
import { UserContext } from "../UserContext";
import '../index.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user, setUser } = useContext(UserContext); // use context only
  const visibleItems = 3;

  useEffect(() => {
    ProductsService.getProducts()
      .then(res => setProducts(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

    document.title = 'Home - Products';
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center">Loading products...</p>;
  if (!products.length) return <p className="text-center">No products available.</p>;

  return (
    <div>
      

      {/* Hero Banner */}
      <div className="hero-banner" style={{ textAlign: 'center', margin: '20px 0' }}>
        <h1>Welcome to the StepLab</h1>
        <img 
          src="https://lostlaces.com/cdn/shop/files/SNEAKER_GUIDE_OPENER.webp?v=1717761209&width=3840" 
          alt="Sneaker Guide Hero Banner" 
          style={{ maxWidth: '80%', borderRadius: '10px' }} 
        />
      </div>

      {/* Trending Deals Carousel */}
      {products.length > 0 && (
        <>
          <h2 className="text-center" style={{ marginTop: '40px' }}>Trending Deals</h2>
          <div
            className="carousel-container"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}
          >
            {products.length > visibleItems && (
              <button onClick={() => setCurrentIndex(prev => (prev - visibleItems < 0 ? Math.max(products.length - visibleItems, 0) : prev - visibleItems))} className="carousel-btn">◀</button>
            )}
            <div
              className="carousel"
              style={{ display: 'flex', overflow: 'hidden', width: '80%' }}
            >
              {products.slice(currentIndex, currentIndex + visibleItems).map(product => (
                <div
                  className="product-card"
                  key={product.id || product._id}
                  style={{ flex: '0 0 33%', margin: '0 10px', textAlign: 'center' }}
                >
                  {product.image_url && (
                    <img src={product.image_url} alt={product.name} className="product-image" />
                  )}
                  <div className="product-name">{product.name}</div>
                  <div className="product-price">${product.price}</div>
                  <div className="product-actions">
                    <Link className="btn btn-outline-info" to={`/products/${product.id || product._id}`}>
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {products.length > visibleItems && (
              <button onClick={() => setCurrentIndex(prev => (prev + visibleItems >= products.length ? 0 : prev + visibleItems))} className="carousel-btn">▶</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;



 /*
<nav>
        <Link to="/">Home</Link> |{' '}
         <Link to="/products">Products</Link> |{' '}
        <Link to="/cart">Cart</Link> |{' '}
        <Link to="/admin/products">Admin</Link> |{' '}
        <Link to="/orders">Orders</Link> |{' '}
        <Link to="/wishlist">WishList</Link> |{' '}
        <Link to="/signin">Sign-up/Login</Link>
      </nav>? 
       <nav className="navbar">
        <Link to="/signin">Sign In / Login</Link> |{' '}
        <Link to="/wishlist">WishList</Link> |{' '}
        <Link to="/sell">Sell</Link> |{' '}
        <Link to="/cart">Cart</Link>
      </nav>
       */