import React, {useContext} from 'react';
import LoginForm from '../components/Users/LoginForm'
import Notification from '../components/Notification'
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const { logoutMessage } = useContext(AuthContext);

  return (
    <div>
      {logoutMessage && <Notification type='error' message={logoutMessage} />}
      <LoginForm />
    </div>
    
  );
};

export default LoginPage;