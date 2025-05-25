import React, {useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';
import Previous from '../components/Previous';
import '../styles/PaymentSuccess.scss';

const PaymentSuccess = ({ setCart }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('cart');
    setCart([]);

    const timeout = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);


  return (
    <div className="payment-success-page">
      <div className="success-content">
        <div className="success-icon">✅</div>
        <h2>Payment Success!</h2>
      </div>
    </div>
  );
};

export default PaymentSuccess;