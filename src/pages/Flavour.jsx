import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Previous from '../components/Previous';
import '../styles/Flavour.scss';

const Flavour = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const capsule = location.state?.capsule;
  const fromPage = location.state?.from || '/';

  if (!capsule) return <div>Capsule data not found.</div>;

  return (
    <div className="flavour-page">
      <Previous onClick={() => navigate(fromPage)} />

      <div className="flavour-content">
        <div className="capsule-img-box">
          <img src={`/capsules/${capsule.image}`} alt={capsule.name} className="capsule-img" />
        </div>

        <div className="capsule-info">
          <strong className="capsule-name">{capsule.name}</strong>
          <button
            className="add-to-cart-btn"
            onClick={() => navigate('/cart', { state: { capsule } })}
          >
            Add to cart
          </button>
        </div>

        <div className="capsule-description">
          <p className="flavour-title">Spicy & Woody</p>
          <p className="flavour-text">
            Inspired by multicultural Palermo where coffee is a ritual, 
            this dark roast blend of Robusta and Arabica brings spicy, woody and cocoa notes.
          </p>

          <div className="tasting-modes">
            <div className="mode">Ristretto 25 ml</div>
            <div className="mode">Espresso 40 ml</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flavour;