import React from "react";
import { FiFilter, FiGlobe, FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const FilterDropdown = ({ onRegionSelect, onLanguageSelect, languages, selectedRegion, selectedLanguage }) => {
  return (
    <div className="flex gap-3 flex-col sm:flex-row">
      {/* Region Select */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="relative flex-1 min-w-[200px]"
      >
        <div className="absolute inset-y-0 left-3 flex items-center">
          <FiGlobe className="text-blue-400 dark:text-blue-300 text-lg" />
        </div>
        <select
          value={selectedRegion}
          onChange={(e) => onRegionSelect(e.target.value)}
          className="w-full pl-12 pr-8 py-3
            bg-gradient-to-r from-white via-purple-50 to-yellow-50
            dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-800
            border-2 border-blue-100 dark:border-gray-700
            rounded-2xl shadow-md
            text-base text-gray-800 dark:text-gray-100
            focus:ring-2 focus:ring-blue-400 focus:border-blue-400
            appearance-none cursor-pointer"
        >
          <option value="" className="text-gray-400"> All Regions</option>
          {regions.map((region) => (
            <option 
              key={region} 
              value={region}
              className="text-gray-800 dark:text-gray-200"
            >
              {region}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center">
          <FiChevronDown className="text-blue-400 dark:text-blue-300" />
        </div>
      </motion.div>

      {/* Language Select */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="relative flex-1 min-w-[200px]"
      >
        <div className="absolute inset-y-0 left-3 flex items-center">
          <FiFilter className="text-purple-400 dark:text-purple-300 text-lg" />
        </div>
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageSelect(e.target.value)}
          className="w-full pl-12 pr-8 py-3
            bg-gradient-to-r from-white via-purple-50 to-yellow-50
            dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-800
            border-2 border-blue-100 dark:border-gray-700
            rounded-2xl shadow-md
            text-base text-gray-800 dark:text-gray-100
            focus:ring-2 focus:ring-purple-400 focus:border-purple-400
            appearance-none cursor-pointer"
        >
          <option value="" className="text-gray-400"> All Languages</option>
          {languages.map((lang, i) => (
            <option 
              key={i} 
              value={lang}
              className="text-gray-800 dark:text-gray-200"
            >
              {lang}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center">
          <FiChevronDown className="text-purple-400 dark:text-purple-300" />
        </div>
      </motion.div>
    </div>
  );
};

export default FilterDropdown;
