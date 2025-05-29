import React, { useEffect ,useState } from "react";
import "../styles/Vertuo.scss";
import {Link, useNavigate } from "react-router-dom";
import SearchBar from '../components/SearchBar';
import Navbar from "../components/Navbar";
import "../styles/responsive.scss";
import { transformCapsules } from '../others/transformCapsules';

const Vertuo = ({addToCart}) => {
  const navigate = useNavigate();
  const [capsules, setCapsules] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("Vertuo");
  const [addedCapsuleIds, setAddedCapsuleIds] = useState(new Set()); // Track added capsules
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

  const handleAddToCart = (capsule) => {
    addToCart(capsule);
    setAddedCapsuleIds(prev => new Set(prev).add(capsule.id || capsule.name));
  };

  const filteredCapsules = capsules.filter(
    (capsule) =>
      capsule.type === type &&
      capsule.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="vertuo">
      

      <div className="top-toggle">
        <button
          className={type === "Original" ? "active" : ""}
          onClick={() => navigate("/find")}
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
      <SearchBar data={capsules} onSelect={(item) => setSearchTerm(item.name)} />


      <h4 className="section-title">Mug(230 ml)</h4>

      <div className="capsule-grid">
        {filteredCapsules.map((capsule, idx) => (
          <div className="capsule-card" key={idx}>
          <img
            src={`/capsules/${capsule.image}`}
            alt={capsule.name}
            onClick={() => navigate("/flavour", { state: { capsule, from: "/vertuo" } })}
            style={{ cursor: "pointer" }}
          />
          <p>{capsule.name}</p>
          <button
              className="add-btn"
              onClick={() => handleAddToCart(capsule)}
              disabled={addedCapsuleIds.has(capsule.id)}
            >
              {addedCapsuleIds.has(capsule.id) ? "✅ Added" : "➕ Add"}
            </button>
          </div>
        ))}
      </div>

      <Navbar />      
    </div>
  );
}

export default Vertuo;
