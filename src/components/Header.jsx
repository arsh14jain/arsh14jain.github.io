import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="main-header">
      <div className="name"><Link to="/" onClick={closeMenu}>Arsh Jain</Link></div>
      <button 
        className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation"
        aria-expanded={isMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/blog" onClick={closeMenu}>Blog</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;