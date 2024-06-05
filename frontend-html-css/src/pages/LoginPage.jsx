import React, {useContext} from 'react';
import LoginForm from '../components/Users/LoginForm'
import Notification from '../components/Notification'
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const { logoutMessage, clearLogoutMessage } = useContext(AuthContext);
   
  return (
    <div>
      {logoutMessage && <Notification type="success" message={logoutMessage} onClose={clearLogoutMessage} />}
      <LoginForm />
    </div>
    
  );
};

export default LoginPage;