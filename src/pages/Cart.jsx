import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Previous from '../components/Previous';
import Navbar from '../components/Navbar';
import Popup from '../components/Popup';
import '../styles/Cart.scss';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RQSbaDtRlajemAykbZod6CrrxAAo6WD5lTKhR812bqERUHRbRpM9s11041KFzcFJCeESs0sspKl6sJXGXesrIyl00U72Wyspr');

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const increaseQuantity = (name) => {
    setCart(cart.map(item =>
      item.name === name ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (name) => {
    setCart(cart
      .map(item =>
        item.name === name ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0)
    );
  };

  /**
   * // Formating so that the cart has only a capsule_id and quantity
      const formattedCart = cart.map(item => ({
        capsule_id: item.id,  
        quantity: item.quantity,     
      }));
  
       await fetch('http://127.0.0.1:8000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',    
          'Accept': 'application/json',  
        },
        credentials: 'include',
        body: JSON.stringify({ items: formattedCart }), 
      });
   */

  const handlePay = async () => {

    // Adding the cart in the bankend
    const cartCopy = cart;
    const formattedCart = cartCopy.map(item => ({
      capsule_id: item.id,  
      quantity: item.quantity,     
    }));

    console.log("Formatted cart: ", formattedCart);

     await fetch('http://127.0.0.1:8000/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',    
        'Accept': 'application/json',  
      },
      credentials: 'include',
      body: JSON.stringify({ items: formattedCart }), 
    });
    
    // Making payments using Stripe
    const stripe = await stripePromise;

    const lineItems = cart.map(item => ({
      price: item.price_id,    
      quantity: item.quantity, 
    }));

    console.log("Line Items: ", lineItems);

    const error = await stripe.redirectToCheckout({
      lineItems,
      mode: 'payment',
      successUrl: 'http://localhost:5173/payment-success',
      cancelUrl: 'http://localhost:5173/cart',
    });

    if (error) {
      console.error('Stripe error:', error);
    }
  };

  const [showPopup, setShowPopup] = useState(false);

  const leaveOrder = () => {
    navigate(-1);
  };

  const continueOrder = () => {
    handlePay();
  };

  if (!cart.length) {
    return (
      <div className="bag-page">
        <Previous onClick={() => navigate(-1)} />
        <div className="empty-cart">
          <img src="/capsules/empty-cart.png" alt="Empty Cart" className="empty-cart-img" />
          <p className="empty-cart-text">No Product in the cart</p>
        </div>
        <Navbar />
      </div>
    );
  }
  return (
    <div className="bag-page">
      <Previous onClick={() => setShowPopup(true)} />

      <h2 className="text-center my-3">BAG</h2>

      <div className="bag-image">
        <img src="/capsules/bag.jpg" alt="Bag Banner" />
      </div>

      {cart.map((item, idx) => (
  <div key={idx} className="bag-item d-flex align-items-center justify-content-between p-3">
    <div className="d-flex align-items-center">
      <img src={`/capsules/${item.image}`} alt={item.name} className="capsule-thumbnail" />
      <div className="ms-3 capsule-name">{item.name}</div>
    </div>

    <div className="quantity-controls d-flex align-items-center">
      <button className="btn btn-success btn-sm" onClick={() => decreaseQuantity(item.name)}>-</button>
      <div className="quantity-number">{item.quantity}</div>
      <button className="btn btn-success btn-sm" onClick={() => increaseQuantity(item.name)}>+</button>
    </div>
  </div>
))}

      <div className="pay-button text-center my-4">
      <button
  className="btn btn-success pay-btn" 
  onClick={ handlePay}
  >
  Pay
</button>
      </div>

      <Navbar />
      <Popup
        show={showPopup}
        onLeave={leaveOrder}
        onContinue={continueOrder}
      />
    </div>
  );
};

export default Cart;