// src/components/Users/RegisterForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { query } from '../../utils/apiUtils';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  //const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setEmailError('');
    setNameError('');
    setPasswordError('');
    setMessage('');

    if (password.length < 5) {
      setPasswordError('El password debe tener al menos 5 caracteres');
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
        setPasswordError(err.message); // Mostrar el mensaje de error de la API en caso de fallo    
    }
  };
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.length < 3) {
      setNameError('El nombre debe tener al menos 3 caracteres');
    } else {
      setNameError('');
    }
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError('El email no es válido');
    } else {
      setEmailError('');
    }
  };
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 5) {
      setPasswordError('El password debe tener al menos 5 caracteres');
    } else {
      setPasswordError('');
    }
  };
  return (
    <div>
      
      {message && <p className="message">{message}</p>}
      <form className='myshadow' onSubmit={handleSubmit}>
      <h2>Crear una cuenta</h2>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label >Email</label>
            {emailError && <p className="error">{emailError}</p>}
          </div>
          
          <div className="form-group">
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Nombre</label>
            {nameError && <p className="error">{nameError}</p>}
          </div>
          
          <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Password</label>
          {passwordError && <p className="error">{passwordError}</p>}
          </div>
          
          

        <button type="submit">Registrarse</button>
      </form>
    </div>
    
  );
};

export default RegisterForm;
