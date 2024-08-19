import React from 'react';
import InstructionsCarousel from '../components/Carousel';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import InstructionList from '../components/InstructionList';
import Notification from '../components/Notification';

const Home = () => {
  const {isAuthenticated, user, logoutMessage, clearLogoutMessage} = useContext(AuthContext);
  return (
    <div>
       {logoutMessage && (
        <Notification type="success" message={logoutMessage} onClose={clearLogoutMessage} />
      )}
       {isAuthenticated ? (
        <div>
          <h1>Bienvenido/a, {user}!</h1>
          <InstructionsCarousel/>
        </div>
      ) : (
        <div>
          <InstructionList/>
        </div>
      )}
    </div>
  );
};

export default Home;
