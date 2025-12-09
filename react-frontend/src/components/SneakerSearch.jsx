import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../index.css";
import { CartContext } from "../CartContext";

const API_BASE = "http://localhost:3000/api/sneakers";

const SneakerSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
 const { addToCart } = useContext(CartContext);
  // -------------------------
  //  Load Popular Sneakers
  // -------------------------
  useEffect(() => {
    const fetchPopular = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        const res = await axios.get(`${API_BASE}/popular/list`, {
          withCredentials: true,
        });

        setResults(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setErrorMsg("Could not load popular sneakers.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, []);

  // -------------------------
  //  Search Sneakers
  // -------------------------
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await axios.get(`${API_BASE}/search/${query}`, {
        withCredentials: true,
      });

      setResults(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setErrorMsg("Error searching for shoes.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  //  Add to Wishlist
  // -------------------------
  const addToWishlist = async (styleID) => {
    try {
      await axios.post(
        "http://localhost:3000/api/wishlist",
        { productId: styleID },
        { withCredentials: true }
      );

      alert("Added to wishlist!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add to wishlist");
    }
  };

  // -------------------------
  //  Fetch Price Details
  // -------------------------
  const viewPrices = async (styleID) => {
    if (!styleID) {
      alert("Invalid sneaker style ID.");
      return;
    }

    try {
      const res = await axios.get(`${API_BASE}/${styleID}`);
      alert(JSON.stringify(res.data, null, 2));
    } catch (err) {
      console.error(err);
      alert("Failed to load price info.");
    }
  };

  // -------------------------
  //  Render Component
  // -------------------------
  return (
    <div className="sneaker-search-page">
      <h1 className="text-center">Sneaker Search</h1>

      {/* Search Bar */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for Jordans, Yeezys, Dunks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Error Message */}
      {errorMsg && <p className="error-text text-center">{errorMsg}</p>}

      {/* Loading Indicator */}
      {loading && <p className="text-center">Loading...</p>}

      {/* Results Grid */}
      <div className="sneaker-grid">
        {results.map((shoe, index) => {
          const styleID = shoe.styleID;

          if (!styleID) return null; // Prevent invalid items

          return (
            <div className="sneaker-card" key={index}>
              <img
                src={shoe.thumbnail}
                alt={shoe.shoeName || shoe.title}
                className="sneaker-image"
              />

              <h3>{shoe.shoeName || shoe.title}</h3>
              <p className="brand">{shoe.brand}</p>
              <p className="colorway">{shoe.colorway}</p>

              <div className="buttons">
                <button className="price-btn" onClick={() => viewPrices(styleID)}>
                  View Prices
                </button>


<button
  className="add-to-cart-btn"
  onClick={() =>
    addToCart({
      productId: styleID,                      // required
      selectedSize: "N/A",                     // required
      selectedGender: "Unisex",                // required
      quantity: 1                               // required
    })
  }
>
  Add to Cart
</button>


              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {results.length === 0 && !loading && (
        <p className="text-center">No sneakers found.</p>
      )}
    </div>
  );
};

export default SneakerSearch;
