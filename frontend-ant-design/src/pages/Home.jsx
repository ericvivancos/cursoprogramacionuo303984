import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button } from 'antd';

const Home = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Bienvenido/a, {user}!</h1>
        </div>
      ) : (
        <div>
          <h1>Bienvenido a nuestra aplicación</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
