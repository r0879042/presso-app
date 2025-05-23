import React, { useState,useEffect } from "react";
import "../styles/Find.scss";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';
import "../styles/responsive.scss";

const priceMap = {
  // Original
  "Paris Espresso": "price_1RRi8PDtRlajemAypU4F0YRA",
  "Vienna Lungo": "price_1RRhS3DtRlajemAyn21pjfVU",
  "Stockholm Lungo": "price_1RRi4EDtRlajemAySwy8ukJY",
  "Tokyo Lungo": "price_1RRi7gDtRlajemAy4yLAYZ8F",
  "Cape Town Lungo": "price_1RRi5LDtRlajemAykhs49GNX",
  "Shanghai Lungo": "price_1RRiPxDtRlajemAy65AzDwO9",

  // Vertuo
  "Paris Espresso Vertuo": "price_1RRiKfDtRlajemAyR1ofOc5N",
  "Vienna Lungo Vertuo": "price_1RRiMEDtRlajemAysbaSTnVe",
  "Stockholm Lungo Vertuo": "price_1RRiPJDtRlajemAyLoHrnWzU",
  "Tokyo Lungo Vertuo": "price_1RRiNKDtRlajemAyY8SycFWD",
  "Cape Town Lungo Vertuo": "price_1RRiO5DtRlajemAymuLnkIFj",
  "Shanghai Lungo Vertuo": "price_1RRiQfDtRlajemAyxrjwOYOW"
};

function Find() {
  const navigate = useNavigate();
  const [capsules, setCapsules] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("Original");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/data")
      .then(res => res.json())
      .then(data => {
        // Add price_id to each capsule
        const enriched = data.map(capsule => ({
          ...capsule,
          price_id: priceMap[
            capsule.type === "Vertuo" ? capsule.name + " Vertuo" : capsule.name
          ] || null
        }));
        setCapsules(enriched);
      })
      .catch(err => console.error("Failed to fetch capsules", err));
  }, []);


  const filteredCapsules = capsules.filter(
    (capsule) =>
      capsule.type === type &&
      capsule.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="find-product-page">

      <div className="top-toggle">
        <button
          className={type === "Original" ? "active" : ""}
          onClick={() => setType("Original")}
        >
          <span className="icon">☕</span> Original
        </button>
        <button
          className={type === "Vertuo" ? "active" : ""}
          onClick={() => navigate("/vertuo")}
        >
          <span className="icon">🛍️</span> Vertuo
        </button>
      </div>

      <SearchBar data={capsules} onSelect={(item) => setSelected(item)} />

      <h4 className="section-title">World Explorations</h4>

      <div className="capsule-grid">
        {filteredCapsules.map((capsule, idx) => (
          
          <Link
            to="/flavour"
            state={{ capsule, from: '/find' }}
            key={idx}
            className="capsule-card"
          >
            <img src={`/capsules/${capsule.image}`} alt={capsule.name} />
            <p>{capsule.name}</p>
          </Link>

        ))}
      </div>

      <Navbar /> 
    </div>
  );
}

export default Find
;
