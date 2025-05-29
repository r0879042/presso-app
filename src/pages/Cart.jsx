import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Previous from '../components/Previous';
import Navbar from '../components/Navbar';
import Popup from '../components/Popup';
import '../styles/Cart.scss';
import { loadStripe } from '@stripe/stripe-js';
import backendURL from '../../backendURL';
import frontendURL from '../../frontendURL';

const stripePromise = loadStripe('pk_test_51RQSbaDtRlajemAykbZod6CrrxAAo6WD5lTKhR812bqERUHRbRpM9s11041KFzcFJCeESs0sspKl6sJXGXesrIyl00U72Wyspr');

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const location = window.location;
  const [paymentCanceled, setPaymentCanceled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('canceled') === 'true') {
      setPaymentCanceled(true);
      // Clean URL 
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, []);
  
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

  const handlePay = async () => {

    // Adding the cart in the bankend
    const cartCopy = cart;

    
    const formattedCart = cartCopy.map(item => ({
      capsule_id: item.id,  
      quantity: item.quantity,     
    }));

    await fetch(`${backendURL}/api/cart`, {
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

    localStorage.setItem('cart', JSON.stringify(cart));

    const error = await stripe.redirectToCheckout({
      lineItems,
      mode: 'payment',
      successUrl: `${frontendURL}payment-success`,
      cancelUrl: `${frontendURL}cart?canceled=true`,
    });

    if (error) {
      console.error('Stripe error:', error);
    }
  };

  

  const leaveOrder = () => {
    if (paymentCanceled) {
      navigate("/");
      return ;
    }
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
    <button className="btn btn-success btn-sm" onClick={() => decreaseQuantity(item.name, item.type)}> - </button>
    <div className="quantity-number">{item.quantity}</div>
    <button className="btn btn-success btn-sm" onClick={() => increaseQuantity(item.name, item.type)}> + </button>
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
