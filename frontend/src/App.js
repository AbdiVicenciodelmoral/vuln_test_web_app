import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CORSTestingPage from './pages/CORSTestingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cors" element={<CORSTestingPage />} />
      </Routes>
    </Router>
  );
}

export default App;