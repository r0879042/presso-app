import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.scss';

const Checkout = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    // Simulate successful payment after 2 seconds
    setTimeout(() => {
      navigate('/payment-success');
    }, 2000);
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <p>Secure your payment via Stripe</p>
      <button className="pay-now-btn" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;