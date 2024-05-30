import React, {useContext} from 'react';
import LoginForm from '../components/Users/LoginForm'
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const { logoutMessage } = useContext(AuthContext);
    console.log(logoutMessage);
  return (
    <div>
         {logoutMessage && <p style={{color: 'red'}}>{logoutMessage}</p>}
      <LoginForm />
    </div>
    
  );
};

export default LoginPage;