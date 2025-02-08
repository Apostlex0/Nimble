import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PulseBackground from './components/PulseBackground';

// Pages
import Swap from './pages/Swap';
import MyVaults from './pages/MyVaults';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div >
      <PulseBackground />
      <Navbar />
      <div className="container mx-auto px-4 py-6 mt-12">
        <Routes>
          <Route path="/" element={<Swap />} />
          <Route path="/Swap" element={<Swap />} />
          <Route path="/MyVaults" element={<MyVaults />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

