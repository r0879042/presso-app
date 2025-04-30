import { Routes, Route } from 'react-router-dom';
import FindProduct from './pages/FindProduct';
import Vertuo from './pages/Vertuo';
import Flavour from './pages/Flavour';
import Bag from './pages/Bag';
import PaymentSuccess from './pages/PaymentSuccess';
import Checkout from './pages/Checkout';
import QuizStart from './pages/QuizStart';
import Quiz from './pages/Quiz';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/find" element={<FindProduct />} />
      <Route path="/vertuo" element={<Vertuo />} />
      <Route path="/flavour" element={<Flavour />} />
      <Route path="/bag" element={<Bag />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />

      <Route path="/quizstart" element={<QuizStart />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
}

export default App;