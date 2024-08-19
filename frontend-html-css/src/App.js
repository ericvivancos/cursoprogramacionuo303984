import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/HomePge";
import PresentsPage from "./pages/Presents";
import PresentList from "./pages/PresentsList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import EditPresentForm from "./components/Presents/EditPresentForm";
import Friends from "./pages/Friends";
import SearchGifts from "./pages/SearchGiftsPage";

const App = () => {
  return (
    <AuthProvider>
      <AuthConsumer />
    </AuthProvider>
  );
};
const AuthConsumer = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Router>
      <div className="background">
        <Navbar />
        <main>
          <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
            <Route
              path="/signup"
              element={
                isAuthenticated ? <Navigate to="/home" /> : <SignupPage />
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/home" /> : <LoginPage />
              }
            />
            <Route path="/home" element={<Home />} />
            <Route
              path="/present/create"
              element={
                <PrivateRoute>
                  <PresentsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/presents"
              element={
                <PrivateRoute>
                  <PresentList />
                </PrivateRoute>
              }
            />
            <Route
              path="/presents/edit/:id"
              element={
                <PrivateRoute>
                  <EditPresentForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/friends"
              element={
                <PrivateRoute>
                  <Friends />
                </PrivateRoute>
              }
            />
            <Route
              path="/search-gifts"
              element={
                <PrivateRoute>
                  <SearchGifts />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};
export default App;
