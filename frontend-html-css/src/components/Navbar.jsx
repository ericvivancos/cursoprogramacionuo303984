import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../logo.png"

const Menu = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/"><img src={logo} alt="Logo" /></Link>
        
      </div>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/signup" className="navbar-link">
            Registrate
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/login" className="navbar-link">
             Inicia Sesión
          </Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Menu;
