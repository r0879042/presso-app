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
    <div className="flavour-page container-fluid">
      <Previous onClick={() => navigate(fromPage)} />

      <div className="capsule-img-box text-center mt-4">
        <img src={`/capsules/${capsule.image}`} alt={capsule.name} className="capsule-img" />
      </div>

      <div className="capsule-info d-flex justify-content-between align-items-center p-3">
        <strong>{capsule.name}</strong>
        <button className="btn btn-success">Add to cart</button>
      </div>

      <div className="capsule-description p-3">
        <p><strong>Spicy & Woody</strong></p>
        <p>
          Inspired by multicultural Palermo where coffee is a ritual, this dark
          roast blend of Robusta and Arabica brings spicy, woody and cocoa notes.
        </p>
        <div className="tasting-modes d-flex justify-content-between mt-4">
          <div className="mode">
            <i className="bi bi-cup"></i> Ristretto 25 ml
          </div>
          <div className="mode">
            <i className="bi bi-cup"></i> Espresso 40 ml
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flavour;
