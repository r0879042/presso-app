import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FindProduct from './pages/FindProduct';
import Vertuo from './pages/Vertuo';
import Flavour from './pages/Flavour';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FindProduct />} />
      <Route path="/vertuo" element={<Vertuo />} />
      <Route path="/flavour" element={<Flavour />} />
    </Routes>
  );
}

export default App;
