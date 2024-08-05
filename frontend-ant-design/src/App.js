// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';
import LoginForm from './components/LoginForm';
import { Layout } from 'antd';
const { Content } = Layout;

const App = () => (
  <AuthProvider>
    <Router>
      <Layout>
        <Navbar/>
        <Content style={{ padding: '0 50px', marginTop: 64}}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginForm />} />
            {/* Agrega otras rutas aquí */}
          </Routes>
        </Content>
      </Layout>
      
    </Router>
  </AuthProvider>
);

export default App;
