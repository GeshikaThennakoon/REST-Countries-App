import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft, FiEdit, FiLock, FiMail, FiCalendar, FiGlobe, FiHeart, FiUser
} from "react-icons/fi";
import CountryCard from "../components/CountryCard";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [editing, setEditing] = useState(false);
  const [tempBio, setTempBio] = useState("");

  useEffect(() => {
    const storedUserStr = localStorage.getItem("currentUser");
    if (storedUserStr) {
      const parsedUser = JSON.parse(storedUserStr);
      setUser(parsedUser);
      setTempBio(parsedUser.bio || "");

      // Use the raw string as the key for favorites (as in your Favorites page)
      const favoritesKey = `favorites_${storedUserStr}`;
      const favoritesData = JSON.parse(localStorage.getItem(favoritesKey)) || [];
      setFavorites(favoritesData);
    }
  }, []);

  // Save bio edits to localStorage and state
  const saveBio = () => {
    const updatedUser = { ...user, bio: tempBio };
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">No user data found.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        

        {/* Profile Header */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="flex flex-col md:flex-row items-center gap-8 mb-12"
        >
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-6xl font-bold shadow-lg">
              <FiUser />
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg"
              onClick={() => setEditing(true)}
              title="Edit profile"
            >
              <FiEdit className="text-blue-500 dark:text-blue-400" />
            </motion.button>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {user.username}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <FiMail className="text-blue-500" />
              {user.email}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <FiCalendar className="text-pink-500" />
              Member since {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : "N/A"}
            </p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FiGlobe className="text-3xl text-blue-500 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{favorites.length}</p>
                <p className="text-gray-500 dark:text-gray-400">Favorite Countries</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FiHeart className="text-3xl text-purple-500 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{user.bucketListCount || 0}</p>
                <p className="text-gray-500 dark:text-gray-400">Bucket List Items</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-lg">
                <FiLock className="text-3xl text-pink-500 dark:text-pink-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{user.accountStatus || "Standard"}</p>
                <p className="text-gray-500 dark:text-gray-400">Account Status</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">About Me</h2>
            {editing ? (
              <div className="flex gap-2">
                <button
                  onClick={saveBio}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => { setEditing(false); setTempBio(user.bio || ""); }}
                  className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400"
              >
                <FiEdit /> Edit
              </button>
            )}
          </div>
          {editing ? (
            <textarea
              value={tempBio}
              onChange={(e) => setTempBio(e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
              rows="4"
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {user.bio || "No bio yet."}
            </p>
          )}
        </motion.div>

        {/* Favorite Countries */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            Favorite Countries
          </h2>
          {favorites.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No favorite countries added yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.map((country) => (
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
            </div>
          )}
        </div>

        {/* Account Details */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Account Details</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <FiMail className="text-2xl text-blue-500" />
              <div>
                <p className="text-gray-500 dark:text-gray-300">Email</p>
                <p className="text-gray-800 dark:text-white">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <FiLock className="text-2xl text-purple-500" />
              <div>
                <p className="text-gray-500 dark:text-gray-300">Password</p>
                <p className="text-gray-800 dark:text-white">••••••••</p>
              </div>
              <button className="ml-auto text-blue-500 hover:text-blue-600 dark:text-blue-400">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
