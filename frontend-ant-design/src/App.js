// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';
import LoginForm from './components/LoginForm';

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginForm />} />
        {/* Agrega otras rutas aquí */}
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
