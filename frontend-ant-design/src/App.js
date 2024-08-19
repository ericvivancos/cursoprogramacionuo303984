import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { AuthProvider, AuthContext } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';
import LoginForm from './components/LoginForm';
import { Layout } from 'antd';
import PrivateRoute from './components/PrivateRoute';
import FriendsPage from './pages/FriendsPage';
import PresentList from './components/PresentList';
import EditPresentForm from './components/EditPresentForm';
import CreatePresentForm from './components/CreatePresentForm';
import SearchGiftsPage from './pages/SearchGiftsPage';
import CustomFooter from './components/CustomFooter';

const { Content } = Layout;

const App = () => (
  <AuthProvider>
    <AuthConsumer />
  </AuthProvider>
);

const AuthConsumer = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}> {/* Asegura que el layout ocupe toda la pantalla */}
        <Navbar />
        <Content style={{ padding: '0 50px', marginTop: 64, flex: 1 }}> {/* flex: 1 permite que el contenido crezca según sea necesario */}
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/home" /> : <RegisterPage />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <LoginForm />} />
            <Route path="/friends" element={<PrivateRoute><FriendsPage /></PrivateRoute>} />
            <Route path="/presents" element={<PrivateRoute><PresentList /></PrivateRoute>} />
            <Route path="/present/create" element={<PrivateRoute><CreatePresentForm /></PrivateRoute>} />
            <Route path="/presents/edit/:id" element={<PrivateRoute><EditPresentForm /></PrivateRoute>} />
            <Route path="/search-gifts" element={<PrivateRoute><SearchGiftsPage /></PrivateRoute>} />
            {/* Agrega otras rutas aquí */}
          </Routes>
        </Content>
        <CustomFooter /> {/* Footer colocado después de Content */}
      </Layout>
    </Router>
  );
};

export default App;
