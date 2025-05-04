import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiMapPin, FiUsers, FiGlobe } from "react-icons/fi";


const CountryCard = ({ country }) => {
  const { name, flags, region, capital, population, cca3 } = country;

  const addToFavorites = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const user = localStorage.getItem('currentUser');
    if (!user) {
      showNotification("Please log in to add favorites", "error");
      return;
    }
    const key = `favorites_${user}`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    const isAlreadyAdded = existing.find((item) => item.cca3 === cca3);
    if (!isAlreadyAdded) {
      existing.push(country);
      localStorage.setItem(key, JSON.stringify(existing));
      showNotification(`${name.common} added to favorites!`, "success");
    } else {
      showNotification(`${name.common} is already in favorites`, "info");
    }
  };

  const showNotification = (message, type) => {
    const colors = {
      success: "bg-green-500",
      error: "bg-red-500",
      info: "bg-blue-500"
    };
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 flex items-center ${colors[type]} text-white animate-fade-in`;
    notification.innerHTML = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add("animate-fade-out");
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="relative bg-gradient-to-br from-white via-purple-50 to-yellow-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800
        rounded-2xl overflow-hidden shadow-xl border-2 border-blue-100 hover:border-pink-300 hover:shadow-2xl transition-all duration-300"
    >
      <Link to={`/country/${cca3}`} className="block focus:outline-none focus:ring-2 focus:ring-blue-400">
        <div className="relative h-40 flex items-center justify-center bg-white dark:bg-gray-900">
          <img
            src={flags.svg || flags.png}
            alt={`Flag of ${name.common}`}
            className="w-full h-full object-cover rounded-t-2xl border-b-2 border-blue-100"
          />
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={addToFavorites}
            className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-md border border-pink-200 hover:bg-pink-50 dark:hover:bg-pink-900"
           
          >
            <FiHeart className="text-pink-500 dark:text-pink-400 w-5 h-5" />
          </motion.button>
        </div>

        <div className="p-5">
          <h2 className="text-lg font-extrabold text-blue-700 dark:text-blue-300 mb-1 truncate">
            {name.common}
          </h2>
          <div className="flex flex-col gap-1">
            <span className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <FiGlobe className="mr-2 text-blue-400 dark:text-blue-300" />
              {region}
            </span>
            {capital && (
              <span className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <FiMapPin className="mr-2 text-emerald-400 dark:text-emerald-300" />
                {capital[0]}
              </span>
            )}
            <span className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <FiUsers className="mr-2 text-yellow-500 dark:text-yellow-400" />
              {population.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>
      
    </motion.div>
  );
};

export default CountryCard;
