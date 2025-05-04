import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCountryByCode } from "../utils/api";
import {
  FiMapPin, FiUsers, FiGlobe, FiClock, FiFlag, FiLink, FiTrendingUp, FiPhone, FiMap, FiAward, FiChevronRight, FiCheckCircle
} from "react-icons/fi";
import { motion } from "framer-motion";

const CountryDetails = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    getCountryByCode(code).then((data) => setCountry(Array.isArray(data) ? data[0] : data));
  }, [code]);

  if (!country) return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center mt-10 text-gray-500"
    >
      Loading...
    </motion.p>
  );

  // Helper functions
  const getNativeName = () => {
    if (!country.name.nativeName) return "N/A";
    const nativeNames = Object.values(country.name.nativeName);
    return nativeNames.map(n => n.common).join(", ");
  };

  const getCurrencies = () => {
    if (!country.currencies) return "N/A";
    return Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(", ");
  };

  const getLanguages = () => {
    if (!country.languages) return "N/A";
    return Object.values(country.languages).join(", ");
  };

  const getBorders = () => {
    if (!country.borders || country.borders.length === 0) return "None";
    return country.borders.join(", ");
  };

  const getGini = () => {
    if (!country.gini) return "N/A";
    const years = Object.keys(country.gini);
    const latest = years[years.length - 1];
    return `${country.gini[latest]} (${latest})`;
  };

  const getDemonyms = () => {
    if (!country.demonyms) return "N/A";
    return country.demonyms.eng?.m || country.demonyms.eng?.f || "N/A";
  };

  const getCallingCodes = () => {
    if (!country.idd?.root) return "N/A";
    return country.idd.suffixes
      ? country.idd.suffixes.map(s => `${country.idd.root}${s}`).join(", ")
      : country.idd.root;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6"
    >
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl hover:shadow-3xl transition-shadow duration-300 p-10">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Flag Section */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex-1 max-w-md"
          >
            <div className="relative group">
              <img
                src={country.flags.svg}
                alt={country.name.common}
                className="w-full h-64 object-cover rounded-2xl shadow-xl border-4 border-white dark:border-gray-700 transform group-hover:rotate-1 transition-transform duration-300"
              />
              {country.coatOfArms?.svg && (
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-900 p-2 rounded-lg shadow-lg border-2 border-gray-100 dark:border-gray-700">
                  <img
                    src={country.coatOfArms.svg}
                    alt="Coat of Arms"
                    className="w-16 h-16 object-contain"
                  />
                </div>
              )}
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={country.maps?.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6! inline-flex! items-center! gap-2! px-6! py-2! bg-gradient-to-r! from-blue-500! to-purple-500! text-white! rounded-full! shadow-lg! hover:shadow-xl! transition-all!"
            >
              <FiLink className="text-lg" />
              <span className="font-semibold">Explore on Google Maps</span>
            </motion.a>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="flex-1 space-y-6"
          >
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {country.name.common}
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
              <FiFlag className="inline mr-2 text-blue-400" />
              <span className="font-semibold">Native Name:</span> {getNativeName()}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
              {/* Details with Icons */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <FiUsers className="w-6 h-6 text-purple-500" />
                <div>
                  <p className="font-semibold">Population</p>
                  <p className="text-gray-500 dark:text-gray-400">{country.population.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <FiMapPin className="w-6 h-6 text-pink-500" />
                <div>
                  <p className="font-semibold">Capital</p>
                  <p className="text-gray-500 dark:text-gray-400">{country.capital?.[0] || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <FiGlobe className="w-6 h-6 text-green-500" />
                <div>
                  <p className="font-semibold">Region</p>
                  <p className="text-gray-500 dark:text-gray-400">{country.region} {country.subregion ? `- ${country.subregion}` : ""}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <FiTrendingUp className="w-6 h-6 text-yellow-500" />
                <div>
                  <p className="font-semibold">Area</p>
                  <p className="text-gray-500 dark:text-gray-400">{country.area.toLocaleString()} km²</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <FiClock className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="font-semibold">Timezones</p>
                  <p className="text-gray-500 dark:text-gray-400">{country.timezones?.join(", ")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <FiMap className="w-6 h-6 text-purple-500" />
                <div>
                  <p className="font-semibold">Borders</p>
                  <p className="text-gray-500 dark:text-gray-400">{getBorders()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <FiAward className="w-6 h-6 text-pink-500" />
                <div>
                  <p className="font-semibold">Gini Index</p>
                  <p className="text-gray-500 dark:text-gray-400">{getGini()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <FiChevronRight className="w-6 h-6 text-green-500" />
                <div>
                  <p className="font-semibold">Top Level Domains</p>
                  <p className="text-gray-500 dark:text-gray-400">{country.tld?.join(", ")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <FiPhone className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="font-semibold">Calling Codes</p>
                  <p className="text-gray-500 dark:text-gray-400">{getCallingCodes()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <FiGlobe className="w-6 h-6 text-purple-500" />
                <div>
                  <p className="font-semibold">Languages</p>
                  <p className="text-gray-500 dark:text-gray-400">{getLanguages()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <FiFlag className="w-6 h-6 text-pink-500" />
                <div>
                  <p className="font-semibold">Currencies</p>
                  <p className="text-gray-500 dark:text-gray-400">{getCurrencies()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <FiCheckCircle className="w-6 h-6 text-green-500" />
                <div>
                  <p className="font-semibold">Demonym</p>
                  <p className="text-gray-500 dark:text-gray-400">{getDemonyms()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <FiChevronRight className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="font-semibold">Driving Side</p>
                  <p className="text-gray-500 dark:text-gray-400">{country.car?.side ? country.car.side.charAt(0).toUpperCase() + country.car.side.slice(1) : "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <FiChevronRight className="w-6 h-6 text-purple-500" />
                <div>
                  <p className="font-semibold">Start of Week</p>
                  <p className="text-gray-500 dark:text-gray-400">{country.startOfWeek ? country.startOfWeek.charAt(0).toUpperCase() + country.startOfWeek.slice(1) : "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <FiAward className="w-6 h-6 text-yellow-500" />
                <div>
                  <p className="font-semibold">FIFA Code</p>
                  <p className="text-gray-500 dark:text-gray-400">{country.fifa || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <FiCheckCircle className="w-6 h-6 text-green-500" />
                <div>
                  <p className="font-semibold">UN Member</p>
                  <p className="text-gray-500 dark:text-gray-400">{country.unMember ? "Yes" : "No"}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CountryDetails;
