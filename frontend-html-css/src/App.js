import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import SignupPage from './pages/SignupPage';
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/HomePge";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from './context/AuthContext';
function App() {
  return (
    <AuthProvider>
      <Router>
          <div className="background">
        
        
            <Navbar />
            <main>
              <Routes>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}/>
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
    </AuthProvider>
    
  );
}

export default App;