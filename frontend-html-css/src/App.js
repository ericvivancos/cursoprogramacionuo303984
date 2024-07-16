import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import SignupPage from './pages/SignupPage';
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/HomePge";
import PresentsPage from "./pages/Presents"
import PresentList from "./pages/PresentsList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from './context/AuthContext';
import EditPresentForm from "./components/Presents/EditPresentForm";
import Friends from "./pages/Friends";
import SearchGifts from './pages/SearchGiftsPage';
import InstructionsList from "./components/InstructionList"
function App() {
  return (
    <AuthProvider>
      <Router>
          <div className="background">
        
        
            <Navbar />
            <main>
              <Routes>
                <Route path= "/" element={<InstructionsList />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}/>
                <Route path="/present/create" element={<PrivateRoute><PresentsPage/></PrivateRoute>}/>
                <Route path="/presents" element={<PrivateRoute><PresentList/></PrivateRoute>}/>
                <Route path="/presents/edit/:id" element={<PrivateRoute><EditPresentForm /></PrivateRoute>} />
                <Route path="/friends" element={<PrivateRoute><Friends/></PrivateRoute>} />  
                <Route path="/search-gifts" element={<PrivateRoute><SearchGifts/></PrivateRoute>} /><Route path="/search-gifts" component={SearchGifts} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
    </AuthProvider>
    
  );
}

export default App;