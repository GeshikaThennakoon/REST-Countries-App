import React from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const SearchBar = ({ onSearch, value }) => {
  const clearSearch = () => {
    onSearch("");
  };

  return (
    <motion.div 
      whileHover={{ y: -2, scale: 1.01 }}
      className="relative flex-1 max-w-2xl"
    >
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <FiSearch className="text-blue-400 dark:text-blue-300 text-lg" />
      </div>
      <input
        type="text"
        placeholder="Search countries..."
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        className="
          w-full pl-12 pr-12 py-3
          bg-gradient-to-r from-white via-purple-50 to-yellow-50
          dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-800
          border-2 border-blue-100 dark:border-gray-700
          rounded-full shadow-md
          text-base text-gray-800 dark:text-gray-100
          focus:ring-2 focus:ring-blue-400 focus:border-blue-400
          transition-all duration-200
          placeholder:text-gray-400 dark:placeholder:text-gray-400
        "
      />
      {value && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-4 flex items-center
            text-pink-400 hover:text-pink-600 dark:text-pink-300 dark:hover:text-pink-400
            transition"
          aria-label="Clear search"
        >
          <FiX className="text-lg" />
        </button>
      )}
    </motion.div>
  );
};

export default SearchBar;
