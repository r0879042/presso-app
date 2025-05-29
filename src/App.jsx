import React, { useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Find from './pages/Find';
import Vertuo from './pages/Vertuo';
import Flavour from './pages/Flavour';
import Cart from './pages/Cart';
import PaymentSuccess from './pages/PaymentSuccess';
import TastingPage from './pages/TastingPage';
import SessionCode from './pages/SessionCode';
import QuizInfo from './pages/QuizInfo';
import Quiz from './pages/Quiz';
import HomePage from './pages/HomePage';
import Recommendations from './pages/Recommendations';
import Receipt from './pages/Receipt';
import Welcome from './pages/Welcome';




function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) setCart(savedCart);
  }, []);

  
  const addToCart = (newCapsule) => {
    const exists = cart.find(item =>
      item.name === newCapsule.name && item.type === newCapsule.type
    );
  
    if (exists) {
      const updatedCart = cart.map(item =>
        item.name === newCapsule.name && item.type === newCapsule.type
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
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/find" element={<Find addToCart={addToCart} />} />
      <Route path="/vertuo" element={<Vertuo addToCart={addToCart} />} />
      <Route path="/flavour" element={<Flavour addToCart={addToCart} />} />
      <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      <Route path="/payment-success" element={<PaymentSuccess setCart={setCart} />} />
      <Route path="/tastingpage" element={<TastingPage />} />
      <Route path="/sessioncode" element={<SessionCode setCart={setCart} />} />
      <Route path="/quizinfo" element={<QuizInfo />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/recommendations/:sessionCode" element={<Recommendations setCart={setCart} />} />
      <Route path="/receipt" element={<Receipt />} />
      
    </Routes>
  );
}

export default App;



