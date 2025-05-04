import React from "react";
import { FiUser } from "react-icons/fi";

const Avatar = ({ user, size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg"
  };

  const colorClasses = {
    astronaut: "bg-purple-100 text-purple-600",
    explorer: "bg-blue-100 text-blue-600",
    pioneer: "bg-green-100 text-green-600",
    traveler: "bg-yellow-100 text-yellow-600",
    adventurer: "bg-red-100 text-red-600",
    navigator: "bg-indigo-100 text-indigo-600",
    default: "bg-gray-100 text-gray-600"
  };

  const avatarType = user?.avatar || "default";
  const initials = user?.username?.charAt(0).toUpperCase() || "U";

  return (
    <div className={`flex items-center justify-center rounded-full ${sizeClasses[size]} ${colorClasses[avatarType]}`}>
      {initials}
    </div>
  );
};

export default Avatar;