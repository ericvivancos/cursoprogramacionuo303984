import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import SignupPage from './pages/SignupPage';
import Menu from "./components/Menu";
import Footer from "./components/Footer";
function App() {
  return (
    <Router>
    <div className="App">
      <Menu />
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