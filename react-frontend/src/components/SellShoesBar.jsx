import React, { useState, useEffect } from 'react';
import ProductsService from '../ProductsService';
import CartService from '../CartService';
import { Link } from 'react-router-dom';
import '../index.css';

// --- Sell Shoes Bar Component ---
const SellShoesBar = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProductsService.addProduct({ name, price, type, description, image_url: imageUrl });
      alert("Your shoe listing has been added!");
      setName(""); setPrice(""); setType(""); setDescription(""); setImageUrl("");
    } catch (err) {
      console.error("Failed to add listing:", err);
    }
  };

  return (
    <div className="sell-bar">
      <form onSubmit={handleSubmit} className="sell-form">
        <input type="text" placeholder="Shoe Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
        <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Sell Shoe</button>
      </form>
    </div>
  );
};

// --- Main Products List Component ---
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
      <div className="products-grid">
        {products.map(product => {
          const productId = product.id || product._id;
          return (
            <div className="product-card" key={productId}>
              {product.image_url && <img src={product.image_url} alt={product.name} className="product-image" />}
              <div className="product-name">{product.name}</div>
              <div className="product-price">${product.price}</div>
              <div className="product-category">{product.type}</div>
              <div className="product-description">{product.description}</div>
              <div className="product-actions">
                <Link className="btn btn-outline-info" to={`/products/${productId}`}>View</Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Include the Sell Shoes Bar at the bottom */}
      <SellShoesBar />
    </div>
  );
};

export default ProductsListComponent;
