import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGlobe, FiSearch, FiFilter, FiX } from "react-icons/fi";
import { getAllCountries, getCountryByName, getCountriesByRegion } from "../utils/api";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      try {
        const data = await getAllCountries();
        setCountries(data);
        setFiltered(data);
        extractLanguages(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const extractLanguages = (data) => {
    const langs = new Set();
    data.forEach((country) => {
      if (country.languages) {
        Object.values(country.languages).forEach((lang) => langs.add(lang));
      }
    });
    setLanguages([...langs].sort());
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query) {
      applyFilters(countries, selectedRegion, selectedLanguage);
      return;
    }

    setIsLoading(true);
    try {
      const data = await getCountryByName(query);
      applyFilters(data, selectedRegion, selectedLanguage);
    } catch (error) {
      setFiltered([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegionFilter = (region) => {
    setSelectedRegion(region);
    applyFilters(countries, region, selectedLanguage);
  };

  const handleLanguageFilter = (lang) => {
    setSelectedLanguage(lang);
    applyFilters(countries, selectedRegion, lang);
  };

  const applyFilters = (data, region, lang) => {
    let result = [...data];
    
    if (region) {
      result = result.filter((c) => c.region === region);
    }
    
    if (lang) {
      result = result.filter((c) => 
        c.languages && Object.values(c.languages).includes(lang)
      );
    }
    
    setFiltered(result);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedRegion("");
    setSelectedLanguage("");
    setFiltered(countries);
  };

  const hasFilters = searchQuery || selectedRegion || selectedLanguage;

  return (
    <motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
  className="p-6 max-w-7xl mx-auto min-h-screen
    bg-gradient-to-br from-purple-50 via-white to-yellow-50
    dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
>
      {/* Header Section */}
      <div className="mb-8">
      <motion.h1 
  initial={{ y: -20 }}
  animate={{ y: 0 }}
  className="text-4xl font-extrabold flex items-center gap-2 mb-2
    text-blue-700 drop-shadow-md dark:text-blue-400"
>
  <FiGlobe className="text-purple-500" />
  <span>Explore the World</span>
</motion.h1>
<p className="text-lg text-pink-900 dark:text-pink-300 font-medium">
  Discover {countries.length} countries and territories
</p>

      </div>

      {/* Search and Filter Section */}
      <motion.div 
        layout
        className="flex flex-col md:flex-row justify-between mb-8 gap-4
    bg-white p-4 rounded-xl shadow-lg border-2 border-blue-100
    dark:bg-gray-800 dark:border-gray-700"
>
      
        <SearchBar 
          onSearch={handleSearch} 
          value={searchQuery}
          icon={<FiSearch className="text-gray-400" />}
        />
        
        <div className="flex items-center gap-3">
          <FilterDropdown
            onRegionSelect={handleRegionFilter}
            onLanguageSelect={handleLanguageFilter}
            languages={languages}
            selectedRegion={selectedRegion}
            selectedLanguage={selectedLanguage}
            icon={<FiFilter className="text-gray-400" />}
          />
          
          {hasFilters && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            >
              <FiX /> Clear
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Results Section */}
      {isLoading ? (
        <LoadingSpinner />
      ) : filtered.length === 0 ? (
        <EmptyState 
          title="No countries found"
          description="Try adjusting your search or filters"
          icon={<FiGlobe className="text-4xl text-gray-400" />}
        />
      ) : (
        <motion.div 
    layout
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  >
    <AnimatePresence>
      {filtered.map((country) => (
        <motion.div
          key={country.cca3}
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          whileHover={{ y: -5 }}
          className="rounded-xl bg-white border-2 border-pink-200 shadow-xl hover:shadow-2xl hover:border-yellow-300 transition dark:bg-gray-800 dark:border-gray-700"
        >
          <CountryCard country={country} />
        </motion.div>
      ))}
    </AnimatePresence>
  </motion.div>
)}
      
    </motion.div>
  );
};

export default Home;