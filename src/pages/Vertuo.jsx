import React, { useState } from "react";
import capsules from "../data/vertuo.json";
import "../styles/Vertuo.scss";
import {Link, useNavigate } from "react-router-dom";
import SearchBar from '../components/SearchBar';
import products from '../data/vertuo.json';



function Vertuo() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("Vertuo");

  const filteredCapsules = capsules.filter(
    (capsule) =>
      capsule.type === type &&
      capsule.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="vertuo">
      <div className="header">
        <h5>Find page</h5>
      </div>

      <div className="top-toggle">
        <button
          className={type === "Original" ? "active" : ""}
          onClick={() => navigate("/")}
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

      {/* Our new SearchBar component */}
      <SearchBar data={products} onSelect={(item) => setSelected(item)} />

      <h4 className="section-title">Mug(230 ml)</h4>

      <div className="capsule-grid">
        {filteredCapsules.map((capsule, idx) => (

          
        <Link
          to="/flavour"
          state={{ capsule, from: '/vertuo' }} 
          key={idx}
          className="capsule-card"
        >
          <div className="capsule-card" key={idx}>
            <img src={`/capsules/${capsule.image}`} alt={capsule.name} />
            <p>{capsule.name}</p>
          </div>
        </Link>
          
        ))}
      </div>

      
    </div>
  );
}

export default Vertuo;
