import React, { useState,useEffect } from "react";
import "../styles/Find.scss";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';
import "../styles/responsive.scss";
import {transformCapsules} from "../others/transformCapsules";

function Find() {
  const navigate = useNavigate();
  const [capsules, setCapsules] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("Original");
  // Get the correct backend url
  const backendURL = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    fetch(`${backendURL}/api/data`)
      .then(res => res.json())
      .then(data => {
        // Add price_id to each capsule
        const enriched = transformCapsules(data);
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
