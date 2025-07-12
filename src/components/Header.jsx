import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="container">
        <h1 className="app-title">
          <span className="logo">♻️</span>
          ReWear
        </h1>
        <p className="app-subtitle">Community Clothing Exchange</p>
      </div>
    </header>
  );
};

export default Header; 