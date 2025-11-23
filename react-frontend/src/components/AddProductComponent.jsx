import { useState, useEffect } from 'react';
import ProductsService from '../ProductsService';
import '../index.css';
import { useNavigate } from 'react-router-dom';

const AddProductComponent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [stock, setStock] = useState(0);
  const [sizes, setSizes] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      description,
      price: parseFloat(price),
      image_url: imageUrl,
      brand,
      category,
      color,
      stock: parseInt(stock),
      sizes: sizes.split(',').map(s => parseInt(s.trim())) // convert "8,9,10" → [8,9,10]
    };

    ProductsService.createProduct(newProduct)
      .then(() => navigate('/products'))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    document.title = 'Add Product';
  }, []);

  return (
    <div>
      <h2 className="text-center">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input type="number" className="form-control" value={price} onChange={e => setPrice(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Image URL:</label>
          <input type="text" className="form-control" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Brand:</label>
          <input type="text" className="form-control" value={brand} onChange={e => setBrand(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <input type="text" className="form-control" value={category} onChange={e => setCategory(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Color:</label>
          <input type="text" className="form-control" value={color} onChange={e => setColor(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Stock:</label>
          <input type="number" className="form-control" value={stock} onChange={e => setStock(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Sizes (comma-separated):</label>
          <input type="text" className="form-control" value={sizes} onChange={e => setSizes(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary mt-3">Add Product</button>
      </form>
    </div>
  );
}

export default AddProductComponent;
