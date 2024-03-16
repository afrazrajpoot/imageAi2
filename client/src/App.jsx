import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Payment from './Payment';

function App() {
  return (
    <div>
      <Routes>  {/* Use Routes instead of Switch for React Router v6 */}
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
}

export default App;
