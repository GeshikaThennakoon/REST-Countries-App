import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CountryDetails from "./pages/CountryDetails";
import Favorites from "./components/Favourites";
import Register from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("currentUser")
  );
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("currentUser"));
    };
    checkAuth();
  }, [location]);

  return (
    <Routes>
      <Route 
        element={
          <Layout 
            isAuthenticated={isAuthenticated} 
            setIsAuthenticated={setIsAuthenticated} 
          />
        }
      >
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/country/:code"
          element={isAuthenticated ? <CountryDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/favorites"
          element={isAuthenticated ? <Favorites /> : <Navigate to="/login" />}
        />
         <Route
          path="/profile"
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Route>
      <Route 
        path="/login" 
        element={<Login setIsAuthenticated={setIsAuthenticated} />} 
      />
    
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;