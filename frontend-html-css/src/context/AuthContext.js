import React, { createContext, useState, useEffect } from 'react';
import { getToken, setToken, removeToken } from '../utils/authUtils';
import { query } from '../utils/apiUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    loading: true,
    user: null,
    logoutMessage: ''
  });

  // Inicializar el estado de autenticación al cargar la aplicación
  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const response = await query('GET', 'users/me', {}, token);
          if (response.data.username) {
            setAuthState({
              isAuthenticated: true,
              loading: false,
              user: response.data.username,
              logoutMessage: '' // Limpiamos el mensaje de logout aquí
            });
          } else {
            setAuthState({
              isAuthenticated: false,
              loading: false,
              user: null,
              logoutMessage: ''
            });
          }
        } catch (error) {
          console.error('Error al obtener información del usuario:', error.message);
          setAuthState({
            isAuthenticated: false,
            loading: false,
            user: null,
            logoutMessage: ''
          });
        }
      } else {
        setAuthState({
          isAuthenticated: false,
          loading: false,
          user: null,
          logoutMessage: ''
        });
      }
    };

    initializeAuth();
  }, []);

  // Función de login
  const login = async (token) => {
    setToken(token);
    try {
      const response = await query('GET', 'users/me', {}, token);
      if (response.data && response.data.username) {
        setAuthState({
          isAuthenticated: true,
          loading: false,
          user: response.data.username,
          logoutMessage: ''
        });
      }
    } catch (error) {
      console.error('Error al obtener información del usuario durante el login:', error.message);
      setAuthState({
        isAuthenticated: false,
        loading: false,
        user: null,
        logoutMessage: ''
      });
    }
  };

  // Función de logout
  const logout = async () => {
    const token = getToken(); // Usa getToken para mantener consistencia
    if (token) {
      try {
        const response = await query('POST', 'users/disconnect', {}, token);
        if (response.data.message) {
          removeToken();
          setAuthState({
            isAuthenticated: false,
            loading: false,
            user: null,
            logoutMessage: response.data.message // Mostrar el mensaje de logout
          });
        }
      } catch (error) {
        console.error('Error al cerrar sesión:', error.message);
      }
    }
  };

  // Limpiar el mensaje de logout
  const clearLogoutMessage = () => {
    setAuthState((prevState) => ({
      ...prevState,
      logoutMessage: ''
    }));
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, clearLogoutMessage }}>
      {children}
    </AuthContext.Provider>
  );
};
