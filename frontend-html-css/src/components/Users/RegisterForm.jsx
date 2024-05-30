// src/components/Users/RegisterForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { query } from '../../utils/apiUtils';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (password.length < 5) {
      setError('El password debe tener al menos 5 caracteres');
      return;
    }

    try {
      const responseData = await query('POST', 'users', { email, name, password });
      if(responseData.data && responseData.data.message){
        setMessage(responseData.data.message);
        navigate('/login');
      }
      else{
        throw new Error(responseData.error);
      }
      
    } catch (err) {
        setError(err.message); // Mostrar el mensaje de error de la API en caso de fallo    
    }
  };

  return (
    <div>
      
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
      <h2>Crear una cuenta</h2>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label >Email</label>
          </div>
          
          <div className="form-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Nombre</label>
          </div>
          
          <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Password</label>
          </div>
          
          

        <button type="submit">Registrarse</button>
      </form>
    </div>
    
  );
};

export default RegisterForm;
