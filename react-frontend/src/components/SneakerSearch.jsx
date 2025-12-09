import { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";

const SneakerSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPopular = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/sneakers/popular/list", { withCredentials: true });
        setResults(res.data);
      } catch (err) {
        console.error(err);
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
    try {
      const res = await axios.get(`http://localhost:3000/api/sneakers/search/${query}`, { withCredentials: true });
      setResults(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/wishlist",
        { productId },
        { withCredentials: true }
      );
      alert("Added to wishlist!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error adding to wishlist");
    }
  };

  return (
    <div className="sneaker-search-page">
      <h1 className="text-center">Sneaker Search</h1>

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

      {loading && <p className="text-center">Loading...</p>}

      <div className="sneaker-grid">
        {results.map((shoe, index) => (
          <div className="sneaker-card" key={index}>
            <img src={shoe.thumbnail} alt={shoe.title} />
            <h3>{shoe.title}</h3>
            <p className="brand">{shoe.brand}</p>
            <p className="colorway">{shoe.colorway}</p>

            <div className="buttons">
              <button
                className="price-btn"
                onClick={async () => {
                  const res = await axios.get(`http://localhost:3000/api/sneakers/${shoe.styleId}`);
                  alert(JSON.stringify(res.data, null, 2));
                }}
              >
                View Prices
              </button>

              <button
                className="wishlist-btn"
                onClick={() => addToWishlist(shoe.id || shoe.styleId)}
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>

      {results.length === 0 && !loading && <p className="text-center">No sneakers found.</p>}
    </div>
  );
};

export default SneakerSearch;
