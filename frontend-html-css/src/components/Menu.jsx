
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Login</Link></li>
        {/* Añade más enlaces según sea necesario */}
      </ul>
    </nav>
  );
};

export default Menu;
