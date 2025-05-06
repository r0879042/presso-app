import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TastingPage.scss';

const TastingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="tasting-page">
      <img src="/capsules/bag.jpg" alt="Tasting" className="tasting-banner" />

      <div className="tasting-card">
        <h3>Edit cart</h3>

        <div className="edit-step">
          <div className="icon-circle">•</div>
          <span>Edit</span>
        </div>

        <div className="line-connector" />

        <div className="edit-step clickable" onClick={() => navigate('/paymentsuccess')}>
          <div className="icon-circle filled">↓</div>
          <span>Proceed to payment</span>
        </div>
      </div>
    </div>
  );
};

export default TastingPage;