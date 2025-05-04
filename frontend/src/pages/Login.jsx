import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/auth";
import { motion } from "framer-motion";
import { FaRocket, FaLock } from "react-icons/fa";

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginUser(formData.username, formData.password, formData.remember);
    if (success) {
      setIsAuthenticated(true);
      navigate("/");
    } else {
      setError("Invalid credentials - Try again space explorer");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex justify-center items-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden w-full max-w-md border border-white/20"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaRocket className="text-white text-3xl" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-white/80">Continue your global exploration</p>
          </div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-500/20 text-red-100 rounded-lg border border-red-400/50"
            >
              {error}
            </motion.div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-white/80 mb-2">Explorer Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaRocket className="text-white/70" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Your explorer name"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-white/80 mb-2">Passcode</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-white/70" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Your secret passcode"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-white/80 cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={(e) => setFormData({...formData, remember: e.target.checked})}
                  className="h-4 w-4 text-blue-500 rounded bg-white/10 border-white/20 focus:ring-blue-400"
                />
                <span className="ml-2">Remember me</span>
              </label>
              
              <a href="#" className="text-blue-300 hover:underline text-sm">
                Forgot passcode?
              </a>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/20 transition-all"
            >
              Launch Dashboard
            </motion.button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-white/70">
              New explorer?{' '}
              <a href="/register" className="text-blue-300 hover:underline font-medium">
                Create account
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;