import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.scss';

const Checkout = () => {
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ total: 15 }) // You can replace 15 with your real cart total later
      });
  
      const data = await response.json();
      window.location.href = data.url; // Redirect to Stripe checkout
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Something went wrong. Please try again.");
    }
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