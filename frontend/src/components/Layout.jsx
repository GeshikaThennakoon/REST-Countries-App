import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const Layout = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-300">
          <Outlet />
        </div>
      </motion.main>

      {/* Floating decorations */}
      <div className="fixed -bottom-20 -right-20 w-64 h-64 rounded-full bg-blue-500/10 dark:bg-blue-400/10 filter blur-3xl z-0"></div>
      <div className="fixed -top-40 -left-40 w-80 h-80 rounded-full bg-purple-500/10 dark:bg-purple-400/10 filter blur-3xl z-0"></div>
      <div className="fixed top-1/4 -right-20 w-48 h-48 rounded-full bg-yellow-500/10 dark:bg-yellow-400/10 filter blur-3xl z-0"></div>
    </div>
  );
};

export default Layout;