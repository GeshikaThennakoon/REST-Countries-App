import React, { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      const stored = JSON.parse(localStorage.getItem(`favorites_${user}`)) || [];
      setFavorites(stored);
    }
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold flex items-center gap-2 mb-2
    text-blue-700 drop-shadow-md dark:text-blue-400"
>Your Favorite Countries</h1>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
