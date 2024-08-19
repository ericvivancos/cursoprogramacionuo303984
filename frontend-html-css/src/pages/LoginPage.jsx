import React, {useContext} from 'react';
import LoginForm from '../components/Users/LoginForm'
import Notification from '../components/Notification'
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
   
  return (
    <div>
      <LoginForm />
    </div>
    
  );
};

export default LoginPage;