import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductsService from '../ProductsService';
import '../index.css';

const ProductDetailsComponent = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Product Details';
    setLoading(true);
    ProductsService.getProductById(id)
      .then(res => setProduct(res.data))
      .catch(err => setError('Failed to load product.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center">Loading product details...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  if (!product) return <p className="text-center">No product found.</p>;

  return (
    <div>
      <h2 className="text-center">Product Details</h2>

      <div className="card-holder">
        <h3>{product.name || 'N/A'}</h3>
        <p>Price: ${product.price ?? 'N/A'}</p>
        <p>Type: {product.type || 'N/A'}</p>
        <p>Description: {product.description || 'N/A'}</p>
        {product.image_url && <img src={product.image_url} alt={product.name} style={{ maxWidth: '300px', marginTop: '1rem' }} />}
        <p>Brand: {product.brand || 'N/A'}</p>
        <p>Category: {product.category || 'N/A'}</p>
        <p>Color: {product.color || 'N/A'}</p>
        <p>Stock: {product.stock ?? 0}</p>
        <p>Sizes: {product.sizes ? product.sizes.join(', ') : 'N/A'}</p>
      </div>

      <div className="card-footer text-body-secondary mt-3">
        <Link to="/products" className="btn btn-outline-secondary me-2">Back to Products</Link>
        <Link to="/add-product" className="btn btn-outline-primary">Add Product</Link>
      </div>
    </div>
  );
};

export default ProductDetailsComponent;
