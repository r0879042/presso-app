import React, { useState } from "react";
import capsules from "../data/products.json";
import "../styles/Find.scss";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from '../components/SearchBar';
import products from '../data/products.json';
import Navbar from '../components/Navbar';

function Find() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("Original");

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

      <SearchBar data={products} onSelect={(item) => setSelected(item)} />

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
