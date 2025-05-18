import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Previous from '../components/Previous';
import Navbar from '../components/Navbar';
import '../styles/Cart.scss';

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const capsule = location.state?.capsule;

  const [quantity, setQuantity] = useState(0);

  if (!capsule) return (
    <div>
      <Previous onClick={() => navigate(-1)} />
      <div>No items in bag.</div>
    </div>
    
  )


  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  return (
    <div className="bag-page">
      <Previous onClick={() => navigate(-1)} />

      <h2 className="text-center my-3">BAG</h2>

      <div className="bag-image">
        <img src="/capsules/bag.jpg" alt="Bag Banner" />
      </div>

      <div className="bag-item d-flex align-items-center justify-content-between p-3">
        <div className="d-flex align-items-center">
          <img src={`/capsules/${capsule.image}`} alt={capsule.name} className="capsule-thumbnail" />
          <div className="ms-3 capsule-name">{capsule.name}</div>
        </div>

        <div className="quantity-controls d-flex align-items-center">
          <button className="btn btn-success btn-sm" onClick={decreaseQuantity}>-</button>
          <div className="quantity-number">{quantity}</div>
          <button className="btn btn-success btn-sm" onClick={increaseQuantity}>+</button>
        </div>
      </div>

      <div className="pay-button text-center my-4">
      <button
  className="btn btn-success pay-btn"
  onClick={() => navigate('/checkout')}
>
  Pay
</button>
      </div>

      <Navbar />
    </div>
  );
};

export default Cart;