
import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductsService from '../ProductsService';
import { CartContext } from "../CartContext";
import { UserContext } from '../UserContext';
import '../index.css';

const ProductDetailsComponent = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });


  useEffect(() => {
    ProductsService.getProductById(id)
      .then(res => setProduct(res.data))
      .catch(() => setError('Failed to load product.'))
      .finally(() => setLoading(false));

    ProductsService.getReviewsByProductId(id)
      .then(res => setReviews(res.data))
      .catch(err => console.error("Failed to load reviews:", err));
  }, [id]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to add a review.");
      return;
    }
    try {
      const res = await ProductsService.addReview({
        userId: user.id,
        shoeId: id,
        rating: newReview.rating,
        comment: newReview.comment
      });
      setReviews(prev => [...prev, res.data]);
      setNewReview({ rating: 5, comment: "" });
    } catch (err) {
      console.error("Failed to add review:", err);
      alert("Error adding review.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await ProductsService.deleteReview(reviewId);
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch (err) {
      console.error("Failed to delete review:", err);
      alert("Error deleting review.");
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div className="product-details-page">
      <Link to="/products" className="btn btn-outline-secondary mt-3">Back to Products</Link>
      <h2 className="text-center mt-3">{product.name}</h2>

      <div className="card-holder">
        {product.image_url && <img src={product.image_url} alt={product.name} className="image-box" />}
        <p>Price: ${product.price}</p>
        <p>Description: {product.description}</p>

        {}
        <h4>Select Gender</h4>
        <div className="gender-buttons">
          {["Men", "Women"].map(gender => (
            <button
              key={gender}
              onClick={() => setSelectedGender(gender)}
              className={`gender-btn ${selectedGender === gender ? "active" : ""}`}
            >
              {gender}
            </button>
          ))}
        </div>

        {}
        <h4>Choose Size</h4>
        <div className="size-buttons">
          {product.sizes?.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`size-btn ${selectedSize === size ? "active" : ""}`}
            >
              {size}
            </button>
          ))}
        </div>

        <p>Selected: <b>{selectedGender || "None"} : {selectedSize || "None"}</b></p>

        {}
        <button
          className={`btn btn-success ${!selectedSize || !selectedGender ? "btn-disabled" : ""}`}
          disabled={!selectedSize || !selectedGender}
          onClick={() => addToCart({
            productId: product.id,
            selectedSize,
            selectedGender,
            quantity: 1
          })}
        >
          Add to Cart
        </button>
      </div>

      {}
     <div className="review-section mt-4">
  <h3>Reviews</h3>

  {}
  {reviews.length ? (
    reviews.map(rev => (
      <div key={rev.id || rev._id} className="review-card">
        <strong>{rev.username}</strong> - <em>{rev.rating} / 5</em>
        <p>{rev.comment}</p>
        {}
        {user && rev.user_id === user.id && (
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDeleteReview(rev.id || rev._id)}
          >
            Delete
          </button>
        )}
      </div>
    ))
  ) : (
    <p>No reviews yet.</p>
  )}

  
  {user && (
    <form className="add-review-form mt-3" onSubmit={handleAddReview}>
      <label>
        Rating:
        <select
          name="rating"
          value={newReview.rating}
          onChange={handleReviewChange}
          required
        >
          {[5, 4, 3, 2, 1].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </label>
      <label>
        Comment:
        <textarea
          name="comment"
          value={newReview.comment}
          onChange={handleReviewChange}
          placeholder="Write a review"
          required
        />
      </label>
      <button type="submit" className="btn btn-primary mt-2">Add Review</button>
    </form>
  )}
</div>

    </div>
  );
};

export default ProductDetailsComponent;
