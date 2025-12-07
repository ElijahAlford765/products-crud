import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductsService from '../ProductsService';
import { CartContext } from "../CartContext";
import '../index.css';

const ProductDetailsComponent = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  useEffect(() => {
    ProductsService.getProductById(id)
      .then(res => setProduct(res.data))
      .catch(() => setError('Failed to load product.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div>
      <Link to="/products" className="btn btn-outline-secondary mt-3">
        Back to Products
      </Link>

      <h2 className="text-center mt-3">{product.name}</h2>

      <div className="card-holder">
        <p>Price: ${product.price}</p>
        <p>Description: {product.description}</p>

        {product.image_url && (
          <img src={product.image_url} alt={product.name} className="image-box" />
        )}

        {/* ----- GENDER SELECTOR ----- */}
        <h4>Select Gender</h4>
        <div className="gender-buttons">
          {["Men", "Women"].map((gender) => (
            <button
              key={gender}
              onClick={() => setSelectedGender(gender)}
              className={`gender-btn ${
                selectedGender === gender ? "active" : ""
              }`}
            >
              {gender}
            </button>
          ))}
        </div>

        {/* ----- SIZE SELECTOR ----- */}
        <h4>Choose Size</h4>
        <div className="size-buttons">
          {product.sizes?.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`size-btn ${
                selectedSize === size ? "active" : ""
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <p>
          Selected:{" "}
          <b>
            {selectedGender || "None"} : {selectedSize || "None"}
          </b>
        </p>
      </div>

  {/* ----- ADD TO CART BUTTON ----- */}
<button
  className={`btn btn-success ${!selectedSize || !selectedGender ? "btn-disabled" : ""}`}
  disabled={!selectedSize || !selectedGender}
  onClick={() =>
    addToCart({
      productId: product.id,
      selectedSize,
      selectedGender,
      quantity: 1
    })
  }
>
  Add to Cart
</button>


    </div>
  );
};

export default ProductDetailsComponent;
