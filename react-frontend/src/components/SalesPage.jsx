// src/components/SalesPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductsService from '../ProductsService';
import { CartContext } from '../CartContext';
import { UserContext } from '../UserContext'; // Make sure you have this
import axios from "axios";
import '../index.css';

const SalesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSellBarOpen, setIsSellBarOpen] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(UserContext); // current logged-in user

  // Form state
  const [newShoe, setNewShoe] = useState({
    name: "",
    brand: "",
    sizes: "",
    description: "",
    image_url: "",
    price: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewShoe(prev => ({ ...prev, [name]: value }));
  };

 const handleAddShoe = async (e) => {
  e.preventDefault();
  try {
    const shoeData = {
      ...newShoe,
      sizes: newShoe.sizes.split(',').map(s => s.trim()),
      sellerId: user?.id // associate with logged-in user
    };
    const res = await ProductsService.addProduct(shoeData);

    // Add new shoe to products state
    setProducts(prev => [...prev, res.data]); // this triggers myShoes to re-filter automatically

    // Clear form
    setNewShoe({ name: "", brand: "", sizes: "", description: "", image_url: "", price: "" });
    alert("Shoe added successfully!");
    setIsSellBarOpen(false);
  } catch (err) {
    console.error("Failed to add shoe:", err);
    alert("Error adding shoe.");
  }
};


  useEffect(() => {
    document.title = 'Shop';
    ProductsService.getProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Loading products...</p>;
  if (!products.length) return <p className="text-center">No products available.</p>;

  // Filter only the current user's shoes for Sell Shoes bar
  const myShoes = products.filter(p => p.sellerId === user?.id);

  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/products/${id}`);
    setProducts(products.filter(product => (product.id || product._id) !== id));
    alert("Listing deleted!");
  } catch (err) {
    console.error("Failed to delete shoe:", err);
    alert("Error deleting listing.");
  }
};




  return (
    <div className="sales-page">
      <h1 className="text-center">Shop</h1>

      {/* Products Grid */}
      <div className="products-grid">
        {products.map(product => {
          const productId = product.id || product._id;
          return (
            <div className="product-card" key={productId}>
              {product.image_url && <img src={product.image_url} alt={product.name} className="product-image" />}
              <div className="product-name">{product.name}</div>
              <div className="product-price">${product.price}</div>
              <div className="product-brand">{product.brand}</div>
              <div className="product-description">{product.description}</div>
              <div className="product-actions">
                <Link className="btn btn-outline-info" to={`/products/${productId}`}>View</Link>
                <div>
                <button className="btn btn-danger"onClick={() => handleDelete(productId)}>Delete</button>
 </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-up Sell Shoes Bar (Only user’s shoes) */}
      <div className={`sell-shoes-bar ${isSellBarOpen ? 'open' : ''}`}>
        <button
          className="toggle-sell-bar-btn"
          onClick={() => setIsSellBarOpen(!isSellBarOpen)}
        >
          {isSellBarOpen ? 'Close Sell Shoes' : 'Sell Your Shoes'}
        </button>

        {isSellBarOpen && (
          <div>
            {/* Form to add new shoe */}
            <form className="sell-shoes-form" onSubmit={handleAddShoe}>
              <input type="text" name="name" value={newShoe.name} onChange={handleChange} placeholder="Shoe Name" required />
              <input type="text" name="brand" value={newShoe.brand} onChange={handleChange} placeholder="Brand" required />
              <input type="text" name="sizes" value={newShoe.sizes} onChange={handleChange} placeholder="Sizes (comma-separated)" required />
              <input type="text" name="image_url" value={newShoe.image_url} onChange={handleChange} placeholder="Image URL" required />
              <textarea name="description" value={newShoe.description} onChange={handleChange} placeholder="Description" required />
              <input type="number" name="price" value={newShoe.price} onChange={handleChange} placeholder="Price" step="0.01" required />
              <button type="submit" className="btn btn-success">Add Shoe</button>
            </form>

            {/* Show current user’s shoes */}
            {myShoes.length ? (
  <div className="my-shoes-list">
    <h3>Your Listings</h3>
    {myShoes.map(shoe => (
      <div key={shoe.id || shoe._id} className="product-card">
        {shoe.image_url && <img src={shoe.image_url} alt={shoe.name} className="product-image" />}
        <div className="product-name">{shoe.name}</div>
        <div className="product-price">${shoe.price}</div>
        <div className="product-brand">{shoe.brand}</div>
      </div>
    ))}
  </div>
) : <p>No shoes listed yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesPage;
