// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';
import LoginForm from './components/LoginForm';
import { Layout } from 'antd';
import PrivateRoute from './components/PrivateRoute';
import FriendsPage from './pages/FriendsPage';
import PresentList from './components/PresentList';
import EditPresentForm from './components/EditPresentForm';
import CreatePresentForm from './components/CreatePresentForm';
const { Content } = Layout;

const App = () => (
  <AuthProvider>
    <Router>
      <Layout>
        <Navbar/>
        <Content style={{ padding: '0 50px', marginTop: 64}}>
          <Routes>
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path='/friends' element={<PrivateRoute><FriendsPage/></PrivateRoute>} />
            <Route path='/presents' element={<PrivateRoute><PresentList/></PrivateRoute>} />
            <Route path='/present/create' element={<PrivateRoute><CreatePresentForm/></PrivateRoute>} />
            <Route path="/presents/edit/:id" element={<PrivateRoute><EditPresentForm /></PrivateRoute>} />
            {/* Agrega otras rutas aquí */}
          </Routes>
        </Content>
      </Layout>
      
    </Router>
  </AuthProvider>
);

export default App;
