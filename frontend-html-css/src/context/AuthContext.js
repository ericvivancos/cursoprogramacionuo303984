import React, { createContext, useState, useEffect } from 'react';
import { getToken,setToken, removeToken } from '../utils/authUtils';
import { query } from '../utils/apiUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState('');

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    setToken(token);
    setIsAuthenticated(true);
  };
  const logout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
          const response = await query('POST', 'users/disconnect', {}, token);
          if(response.data.message){
            setLogoutMessage(response.data.message)
            removeToken();
            setIsAuthenticated(false);
            
          }
        } catch (error) {
          console.error('Error al cerrar sesión:', error.message);
        }
      }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,logoutMessage }}>
      {children}
    </AuthContext.Provider>
  );
};
