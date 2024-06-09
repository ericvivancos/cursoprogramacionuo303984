import React, { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import { query } from '../../utils/apiUtils';
import { AuthContext } from '../../context/AuthContext';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await query('POST','users/login',{email, password});
            if(response.data && response.data.apiKey){
                login(response.data.apiKey);
                navigate('/home');
            }
            else{
                throw new Error(response.error);
            }
            
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form className='myshadow' onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div className="form-group">
                <input
                type="email"
                placeholder="Email"
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
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <span className="highlight"></span>
                <span className="bar"></span>
                <label >Contraseña</label>
            </div>
            <button type="submit">Iniciar Sesión</button>
        </form>
    );

};

export default LoginForm;