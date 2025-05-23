import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Find from './pages/Find';
import Vertuo from './pages/Vertuo';
import Flavour from './pages/Flavour';
import Cart from './pages/Cart';
import PaymentSuccess from './pages/PaymentSuccess';
import Checkout from './pages/Checkout';
import TastingPage from './pages/TastingPage';
import SessionCode from './pages/SessionCode';
import Quiz from './pages/Quiz';
import HomePage from './pages/HomePage';
import Recommendations from './pages/Recommendations';
import Receipt from './pages/Receipt';



function App() {
  
  const [cart, setCart] = useState([]);

  const addToCart = (newCapsule) => {
    const exists = cart.find(item => item.name === newCapsule.name);
    if (exists) {
      const updatedCart = cart.map(item =>
        item.name === newCapsule.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...newCapsule, quantity: 1 }]);
    }
  };
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/find" element={<Find />} />
      <Route path="/vertuo" element={<Vertuo />} />
      <Route path="/flavour" element={<Flavour addToCart={addToCart} />} />
      <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/tastingpage" element={<TastingPage />} />
      <Route path="/sessioncode" element={<SessionCode setCart={setCart} />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/recommendations/:sessionCode" element={<Recommendations setCart={setCart} />} />
      <Route path="/receipt" element={<Receipt />} />
    </Routes>
  );
}

export default App;