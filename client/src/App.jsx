import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Payment from './Payment';
import PaymentSuccess from './PaymentCuccess';

function App() {
  return (
    <div>
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
      </Routes>
    </div>
  );
}

export default App;
