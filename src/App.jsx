import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Find from './pages/Find';
import Vertuo from './pages/Vertuo';
import Flavour from './pages/Flavour';
import Cart from './pages/Cart';
import PaymentSuccess from './pages/PaymentSuccess';
import Checkout from './pages/Checkout';
import TastingPage from './pages/TastingPage';
import SessionCode from './pages/SessionCode';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Find />} />
      <Route path="/vertuo" element={<Vertuo />} />
      <Route path="/flavour" element={<Flavour />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/tastingpage" element={<TastingPage />} />
      <Route path="/sessioncode" element={<SessionCode />} />
    </Routes>
  );
}

export default App;
