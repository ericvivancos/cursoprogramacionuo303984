import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { notification, Carousel } from 'antd';
import { GiftOutlined, TeamOutlined, SearchOutlined } from '@ant-design/icons'; // Importar los íconos necesarios

const Home = () => {
  const { isAuthenticated, user, logoutMessage, clearLogoutMessage } = useContext(AuthContext);

  useEffect(() => {
    if (logoutMessage) {
      notification.success({
        message: 'Sesión cerrada',
        description: logoutMessage,
      });
      clearLogoutMessage(); // Limpiar el mensaje después de mostrar la notificación
    }
  }, [logoutMessage, clearLogoutMessage]);

  const carouselItems = [
    {
      title: '(1) Crea una cuenta',
    },
    {
      title: '(2) Añade tus regalos',
    },
    {
      title: '(3) Añade amigos que quieres que vean tus regalos',
    },
    {
      title: '(4) Elige un regalo para regalar a tu amigos',
    }
  ];

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Bienvenido/a, {user}!</h1>
          <Carousel autoplay>
            {carouselItems.map((item, index) => (
              <div key={index}>
                <h2 style={{ color: '#fff', backgroundColor: '#364d79', padding: '50px', textAlign: 'center' }}>
                  {item.title}
                </h2>
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <div>
          <h1>Bienvenido a nuestra aplicación</h1>
          <p>¡Descubre una nueva forma de gestionar tus regalos y compartirlos con amigos! Regístrate hoy y empieza a organizar tus ideas de regalos de manera más fácil y divertida.</p>
          <div className="features">
            <div className="feature">
              <GiftOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
              <h3>Organiza tus regalos</h3>
              <p>Crea listas de regalos para cada ocasión especial.</p>
            </div>
            <div className="feature">
              <TeamOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
              <h3>Comparte con amigos</h3>
              <p>Comparte tus listas con amigos y encuentra el regalo perfecto.</p>
            </div>
            <div className="feature">
              <SearchOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
              <h3>Busca ideas</h3>
              <p>Explora ideas de regalos sugeridas para cualquier ocasión.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
