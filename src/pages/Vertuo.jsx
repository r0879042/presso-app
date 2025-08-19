import React, { useEffect ,useState } from "react";
import "../styles/Vertuo.scss";
import {Link, useNavigate } from "react-router-dom";
import SearchBar from '../components/SearchBar';
import Navbar from "../components/Navbar";
import "../styles/responsive.scss";
import { transformCapsules } from '../others/transformCapsules';
import { Row, Col } from "react-bootstrap";

const Vertuo = ({addToCart, setCart, cart}) => {
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

    const increaseQuantity = (name, type) => {
    setCart(cart.map(item =>
      item.name === name && item.type === type
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };
  
  const decreaseQuantity = (name, type) => {
    setCart(cart
      .map(item =>
        item.name === name && item.type === type
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
    );
  };

  return (
    <div className="vertuo">
      

      <div className="top-toggle">
        <button
          className={type === "Original" ? "active" : ""}
          onClick={() => navigate("/find")}
        >
          <span className="icon">☕</span> Original capsules
        </button>
        <button
          className={type === "Vertuo" ? "active" : ""}
          onClick={() => setType("Vertuo")}
          
        >
          <span className="icon">🛍️</span> Vertuo capsules
        </button>
      </div>

      
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
            <p className="capsule-name">{capsule.name}</p>
            <p>{capsule.tastes}</p>
            <div className="roast-container">
              <p className="roast-label">Roast:</p>
              <div className="roast-dots">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${i < capsule.roast ? "filled" : ""}`}
                  />
                ))}
              </div>
            </div>
            <p className="capsule-price">€ {capsule.price}</p>
             <p>1 sleeve (10 capsules)</p>
             {cart.some(item =>
                  item.name === capsule.name &&
                  item.type === capsule.type &&
                  item.quantity > 0
                ) ? (
                  <div className="quantity-controls">
                    <button className="btn btn-success btn-sm" onClick={() => decreaseQuantity(capsule.name, capsule.type)}> - </button>
                    <div className="quantity-number">{cart.find(item => item.name === capsule.name && item.type === capsule.type).quantity || 1}</div>
                    <button className="btn btn-success btn-sm" onClick={() => increaseQuantity(capsule.name, capsule.type)}> + </button>
                  </div>
                ) : (
                  <button
                    className="add-btn"
                    onClick={() => handleAddToCart(capsule)}
                  >
                    Add to cart
                  </button>
                )}            
          </div>
        ))}
      </div>

      <Navbar />      
    </div>
  );
}

export default Vertuo;
