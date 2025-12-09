import { useEffect, useState } from "react";

export default function PopularSneakers() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/sneakers/popular/list")
      .then(res => res.json())
      .then(data => setPopular(data))
      .catch(err => console.error("Failed to load popular sneakers", err));
  }, []);

  return (
    <div className="popular-page">
      <h1>Popular Sneakers</h1>

      <div className="sneaker-grid">
        {popular.map((shoe) => (
          <div className="sneaker-card" key={shoe.styleID}>
            <img src={shoe.thumbnail} alt={shoe.shoeName} />
            <h3>{shoe.shoeName}</h3>
            <p>{shoe.brand}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
