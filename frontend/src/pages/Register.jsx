import React, { useState } from "react";
import { registerUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserAstronaut, FaFingerprint } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    avatar: "default"
  });
  const navigate = useNavigate();

  const avatars = [
    "astronaut", "explorer", "pioneer", "traveler", 
    "adventurer", "navigator", "cartographer", "globetrotter"
  ];

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
    const success = registerUser(formData.username, formData.password, formData.avatar);
    if (success) {
      alert(`Welcome ${formData.username}! Your ${formData.avatar} avatar is ready.`);
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex justify-center items-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden w-full max-w-md border border-white/20"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Join CountryExplorer</h2>
            <p className="text-white/80">Begin your global adventure today</p>
          </div>
          
          <form onSubmit={handleRegister}>
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUserAstronaut className="text-white/70" />
              </div>
              <input
                name="username"
                type="text"
                placeholder="Choose your explorer name"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFingerprint className="text-white/70" />
              </div>
              <input
                name="password"
                type="password"
                placeholder="Create a secret passcode"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            
            
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-purple-500/20 transition-all"
            >
              Launch Exploration
            </motion.button>
          </form>
          
          <p className="text-center text-white/70 mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-purple-300 hover:underline font-medium">
              Sign in
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;