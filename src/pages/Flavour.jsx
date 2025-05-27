import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Previous from '../components/Previous';
import '../styles/Flavour.scss';

const Flavour = ({addToCart}) => {
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
          <strong className="capsule-price"> € {capsule.price}</strong>
        </div>

        <div className="capsule-description">
          <h3 className="flavour-title">
            {capsule.flavourTitle || "Spicy & Woody"}
          </h3>
          <p className="flavour-text">
            Inspired by multicultural Palermo where coffee is a ritual, 
            this dark roast blend of Robusta and Arabica brings spicy, woody and cocoa notes.
          </p>

          <div className="tasting-modes">
            <h4>Tasting modes</h4>

            <div className="mode">
              <div >Ristretto 25 ml</div>
              <div >Espresso 40 ml</div>
            </div>
          </div>
        </div>
        
        <button
          className="add-to-cart-btn"
          onClick={() => {
            addToCart(capsule);
            navigate('/cart');
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Flavour;