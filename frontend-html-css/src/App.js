import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import SignupPage from './pages/SignupPage';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          {/* Añade otras rutas aquí */}
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
  );
}

export default App;