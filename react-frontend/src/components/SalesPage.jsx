import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductsService from '../ProductsService';
import { CartContext } from '../CartContext';
import '../index.css';

const SalesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  // Form state for selling shoes
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
      // Convert sizes from comma-separated string to array
      const shoeData = { ...newShoe, sizes: newShoe.sizes.split(',').map(s => s.trim()) };
      const res = await ProductsService.addProduct(shoeData); // you need to implement addProduct in ProductsService
      setProducts(prev => [...prev, res.data]);
      setNewShoe({ name: "", brand: "", sizes: "", description: "", image_url: "", price: "" });
      alert("Shoe added successfully!");
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

  return (
    <div className="sales-page">
      <h1 className="text-center">Shop</h1>

      {/* --- Sell Shoes Form --- */}
      <div className="sell-shoes-form">
        <h2>Sell Shoes</h2>
        <form onSubmit={handleAddShoe}>
          <label>Shoe Name</label>
          <input type="text" name="name" value={newShoe.name} onChange={handleChange} required />

          <label>Brand</label>
          <input type="text" name="brand" value={newShoe.brand} onChange={handleChange} required />

          <label>Sizes (comma-separated)</label>
          <input type="text" name="sizes" value={newShoe.sizes} onChange={handleChange} required />

          <label>Description</label>
          <textarea name="description" value={newShoe.description} onChange={handleChange} required />

          <label>Image URL</label>
          <input type="text" name="image_url" value={newShoe.image_url} onChange={handleChange} required />

          <label>Price</label>
          <input type="number" name="price" value={newShoe.price} onChange={handleChange} step="0.01" required />

          <button type="submit" className="btn btn-success">Add Shoe</button>
        </form>
      </div>

      
    </div>
  );
};

export default SalesPage;
