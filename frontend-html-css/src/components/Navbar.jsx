import React from 'react';
import { Link } from 'react-router-dom';


const Menu = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/"><img src="https://t3.ftcdn.net/jpg/02/83/45/70/360_F_283457004_jhd3FekfvK7qCsjkEfLqN545dKiWxdLW.jpg" alt="Logo" /></Link>
        
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
