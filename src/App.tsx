import { Routes, Route } from 'react-router-dom';
import FindProduct from './pages/FindProduct';
import Vertuo from './pages/Vertuo';
import Flavour from './pages/Flavour';
import Connect from './pages/Connect';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';



function App() {
  return (
    <Routes>
      <Route path="/" element={<FindProduct />} />
      <Route path="/vertuo" element={<Vertuo />} />
      <Route path="/flavour" element={<Flavour />} />
      <Route path="/connect" element={<Connect />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;