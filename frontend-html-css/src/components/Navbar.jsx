import React , {useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../logo.png"
import { AuthContext } from '../context/AuthContext';

const Menu = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/"><img src={logo} alt="Logo" /></Link>
        
      </div>
      <ul className="navbar-list">
      {isAuthenticated ? (
          <>
          <li className="navbar-item">
              <Link className='navbar-link' to="/presents">
               Mis Regalos
              </Link>
            </li>
            <li className="navbar-item">
              <Link className='navbar-link' to="/present/create">
               Añadir regalo
              </Link>
            </li>
            <li className="navbar-item">
              <Link className='navbar-link' onClick={handleLogout}>Cerrar Sesión</Link>
            </li>
          </>
        ) : (
          <>
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
          </>
        )}
       
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Menu;
