import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="container">
      <h1>VulnLab - Penetration Testing Assistant</h1>
      <p>Choose a module to begin testing:</p>
      <ul>
        <li><Link to="/cors">CORS Testing</Link></li>
        <li>CSRF PoC Generator (Coming Soon)</li>
        <li>XSS Payload Hosting (Coming Soon)</li>
        <li>SSRF Listener (Coming Soon)</li>
      </ul>
    </div>
  );
}

export default LandingPage;