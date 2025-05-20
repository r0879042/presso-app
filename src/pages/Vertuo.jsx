import React, { useEffect ,useState } from "react";
import "../styles/Vertuo.scss";
import {Link, useNavigate } from "react-router-dom";
import SearchBar from '../components/SearchBar';
import "../styles/responsive.scss";


function Vertuo() {
  const navigate = useNavigate();
  const [capsules, setCapsules] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [type, setType] = useState("Vertuo");

useEffect(() => {
  fetch("http://127.0.0.1:8000/api/vertuo") // use your real API route
    .then((res) => res.json())
    .then((data) => {
      // Filter Vertuo capsules only
      const vertuoCapsules = data.filter(capsule => capsule.type === "Vertuo");
      setCapsules(vertuoCapsules);
    })
    .catch((err) => console.error("Failed to fetch capsules", err));
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
