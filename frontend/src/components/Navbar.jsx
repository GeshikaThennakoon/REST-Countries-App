import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome, FiHeart, FiLogIn, FiLogOut,
  FiGlobe, FiUser, FiMenu, FiX,
  FiSun, FiMoon, FiSettings, FiUserPlus
} from "react-icons/fi";
import Avatar from "./Avatar";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) setCurrentUser(JSON.parse(user));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
    setCurrentUser(null);
    setProfileMenuOpen(false);
    // Optionally show a notification here
  };

  const navLinks = [
    { path: "/", name: "Home", icon: <FiHome />, show: true },
    { path: "/favorites", name: "Favorites", icon: <FiHeart />, show: isAuthenticated },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-40 transition-all duration-300
          ${scrolled
            ? "shadow-md bg-gradient-to-r from-purple-100 via-yellow-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
            : "bg-gradient-to-r from-purple-50 via-yellow-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
          } backdrop-blur-md`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/" className="flex items-center gap-2 group">
                <FiGlobe className="text-2xl text-blue-500 group-hover:rotate-12 transition-transform" />
                <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-pink-500 dark:from-blue-300 dark:to-pink-300 bg-clip-text text-transparent group-hover:text-pink-600 transition-colors">
                  World Explorer
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3">
              {navLinks.map((link) => link.show && (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-300 transition"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}

              {/* Dark mode toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full text-blue-500 dark:text-blue-300 bg-white/70 dark:bg-gray-800/80 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                title={darkMode ? "Light mode" : "Dark mode"}
              >
                {darkMode ? <FiSun /> : <FiMoon />}
              </button>

              {/* Profile or Auth Buttons */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900 dark:to-blue-900 font-semibold shadow hover:shadow-lg transition"
                  >
                    <Avatar user={currentUser} size="sm" />
                    <span className="text-gray-800 dark:text-gray-100">{currentUser?.username}</span>
                  </button>
                  <AnimatePresence>
                    {profileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-blue-100 dark:border-gray-700 z-50"
                      >
                        <div className="py-1">
                          <Link
                            to="/profile"
                            onClick={() => setProfileMenuOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                          >
                            <FiUser className="mr-3" />
                            Profile
                          </Link>
                          
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-2 text-sm text-left text-red-600 dark:text-red-400 hover:bg-pink-50 dark:hover:bg-pink-900 rounded"
                          >
                            <FiLogOut className="mr-3" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-green-400 to-teal-400 shadow hover:shadow-lg transition"
                  >
                    <FiUserPlus />
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 shadow hover:shadow-lg transition"
                  >
                    <FiLogIn />
                    Login
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full text-blue-500 dark:text-blue-300 bg-white/70 dark:bg-gray-800/80 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                title={darkMode ? "Light mode" : "Dark mode"}
              >
                {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-blue-500 dark:text-blue-300 bg-white/70 dark:bg-gray-800/80 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
              >
                {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-gradient-to-r from-purple-50 via-yellow-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-lg"
            >
              <div className="px-4 pt-2 pb-4 space-y-2">
                {navLinks.map((link) => link.show && (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
                {isAuthenticated && (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                    >
                      <FiUser />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                    >
                      <FiSettings />
                      Settings
                    </Link>
                  </>
                )}
                <div className="px-1 py-2">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-full font-semibold text-blue-500 dark:text-blue-300 bg-white/70 dark:bg-gray-800/80 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                  >
                    <span>Theme</span>
                    {darkMode ? (
                      <span className="flex items-center"><FiSun className="mr-2" /> Light</span>
                    ) : (
                      <span className="flex items-center"><FiMoon className="mr-2" /> Dark</span>
                    )}
                  </button>
                </div>
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 shadow hover:shadow-lg transition"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2 px-1">
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-green-400 to-teal-400 shadow hover:shadow-lg transition"
                    >
                      <FiUserPlus />
                      Register
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 shadow hover:shadow-lg transition"
                    >
                      <FiLogIn />
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
