import React from 'react';
import { useNavigate } from 'react-router-dom';
import Previous from '../components/Previous';
import '../styles/PaymentSuccess.scss';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-success-page">
      <Previous onClick={() => navigate(-1)} />

      <div className="success-content">
        <div className="success-icon">✅</div>
        <h2>Payment Success!</h2>

        <div className="payment-details">
          <p><strong>Product Name:</strong> Vienna Lungo</p>
          <p><strong>Date:</strong> May 1, 2025</p>
          <p><strong>Time:</strong> 07:30 AM</p>
          <p><strong>Payment Method:</strong> Credit Card</p>
          <p><strong>Amount:</strong> 3.20€</p>
        </div>

        <button className="back-home-btn" onClick={() => navigate('/')}>
          Back to Home page
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;