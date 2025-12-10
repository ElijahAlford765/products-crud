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

  
  return (
    <div className="sneaker-search-page">
      <h1 className="text-center">Sneaker Search</h1>

      {}
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

      {}
      {errorMsg && <p className="error-text text-center">{errorMsg}</p>}

      {}
      {loading && <p className="text-center">Loading...</p>}

      {}
      <div className="sneaker-grid">
        {results.map((shoe, index) => {
          const styleID = shoe.styleID;

          if (!styleID) return null; 

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
      productId: styleID,                     
      selectedSize: "N/A",                    
      selectedGender: "Unisex",               
      quantity: 1                               
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

      {}
      {results.length === 0 && !loading && (
        <p className="text-center">No sneakers found.</p>
      )}
    </div>
  );
};

export default SneakerSearch;
