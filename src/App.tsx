import { Routes, Route } from 'react-router-dom';
import Find from './pages/Find';
import Vertuo from './pages/Vertuo';
import Flavour from './pages/Flavour';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import TastingPage from './pages/TastingPage';
import SessionCode from './pages/SessionCode';
import PaymentSucess from './pages/PaymentSucess';



function App() {
  return (
    <Routes>
      <Route path="/find" element={<Find />} />
      <Route path="/vertuo" element={<Vertuo />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/tastingpage" element={<TastingPage />} />
      <Route path="/sessioncode" element={<SessionCode />} />
      <Route path="/flavour" element={<Flavour />} />
      <Route path="/paymentsucess" element={<PaymentSucess/>} />
      


    </Routes>
  );
}

export default App;