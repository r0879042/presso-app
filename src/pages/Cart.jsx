import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Previous from '../components/Previous';
import Navbar from '../components/Navbar';
import '../styles/Cart.scss';

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

  const handlePay = async () => {
    try {
      // Formating so that the cart has only a capsule_id and quantity
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
  
      navigate('/checkout');
    } catch (error) {
      console.error("Failed to send cart to backend:", error);
    }
  };

  if (!cart.length) {
    return (
      <div>
        <Previous onClick={() => navigate(-1)} />
        <div>No items in bag.</div>
      </div>
    );
  }

  return (
    <div className="bag-page">
      <Previous onClick={() => navigate(-1)} />

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
  onClick={() => handlePay()}
  >
  Pay
</button>
      </div>

      <Navbar />
    </div>
  );
};

export default Cart;