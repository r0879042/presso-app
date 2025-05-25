import React, { useEffect ,useState } from "react";
import "../styles/Vertuo.scss";
import {Link, useNavigate } from "react-router-dom";
import SearchBar from '../components/SearchBar';
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

function Vertuo() {
  const navigate = useNavigate();
  const [capsules, setCapsules] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("Vertuo");
  const backendURL = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    fetch(`${backendURL}/api/data`)
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
      <SearchBar data={capsules} onSelect={(item) => setSelected(item)} />

      <h4 className="section-title">Mug(230 ml)</h4>

      <div className="capsule-grid">
        {filteredCapsules.map((capsule, idx) => (

          
        <Link
          to="/flavour"
          state={{ capsule, from: '/vertuo' }} 
          key={idx}
          className="capsule-card"
        >
          
          <img src={`/capsules/${capsule.image}`} alt={capsule.name} />
          <p>{capsule.name}</p>
          
        </Link>
          
        ))}
      </div>

      
    </div>
  );
}

export default Vertuo;
