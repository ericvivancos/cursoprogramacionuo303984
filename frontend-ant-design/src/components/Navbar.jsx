import React, {useContext} from "react";
import {Link} from 'react-router-dom';
import {Menu,Layout,Button} from 'antd';
import { AuthContext } from "../context/AuthContext";

const {Header} = Layout;

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    return(
        <Header>
        <Menu theme="dark" mode="horizontal" selectable={false}>
          <Menu.Item key="home">
            <Link to="/">Inicio</Link>
          </Menu.Item>
          {isAuthenticated ? (
            <>
             <Menu.Item key="friends">
                <Link to="/friends">Amigos</Link>
              </Menu.Item>
              <Menu.Item key="presents">
                <Link to="/presents">Mis Regalos</Link>
              </Menu.Item>
              <Menu.Item key="present-create">
                <Link to="/present/create">Añadir Regalo</Link>
              </Menu.Item>
              <Menu.Item key="search-gifts">
                <Link to="/search-gifts">Regalar a un amigo</Link>
              </Menu.Item>
              <Menu.Item key="logout" style={{ marginLeft: 'auto' }}>
                <Button type="primary" onClick={logout}>
                  Cerrar Sesión
                </Button>
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="login" style={{ marginLeft: 'auto' }}>
                <Link to="/login">Iniciar Sesión</Link>
              </Menu.Item>
              <Menu.Item key="register">
                <Link to="/register">Registrarse</Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Header>
    );
};

export default Navbar;