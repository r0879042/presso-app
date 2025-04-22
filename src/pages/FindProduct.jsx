import React, { useState } from "react";
import capsules from "../data/products.json";
import "../styles/FindProduct.scss";

function FindProduct() {
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("Original");

  const filteredCapsules = capsules.filter(
    (capsule) =>
      capsule.type === type &&
      capsule.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="find-product-page">
      <div className="header">
        <h5>Find page</h5>
      </div>

      <div className="top-toggle">
        <button
          className={type === "Original" ? "active" : ""}
          onClick={() => setType("Original")}
        >
          <span className="icon">☕</span> Original
        </button>
        <button
          className={type === "Vertuo" ? "active" : ""}
          onClick={() => setType("Vertuo")}
        >
          <span className="icon">🛍️</span> Vertuo
        </button>
      </div>

      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      <h4 className="section-title">World Explorations</h4>

      <div className="capsule-grid">
        {filteredCapsules.map((capsule, idx) => (
          <div className="capsule-card" key={idx}>
            <img src={`/capsules/${capsule.image}`} alt={capsule.name} />
            <p>{capsule.name}</p>
          </div>
        ))}
      </div>

      <div className="bottom-nav">
        <div className="nav-item">
          <span>🏠</span>
          <p>Home</p>
        </div>
        <div className="nav-item active">
          <span>🧃</span>
          <p>Find</p>
        </div>
        <div className="nav-item">
          <span>🏛️</span>
          <p>Quiz</p>
        </div>
        <div className="nav-item">
          <span>🛒</span>
          <p>Cart</p>
        </div>
      </div>
    </div>
  );
}

export default FindProduct;
