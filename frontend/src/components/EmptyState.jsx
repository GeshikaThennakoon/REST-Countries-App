import React from 'react';

const EmptyState = ({ icon, title, description }) => (
  <div className="text-center py-12">
    <div className="text-gray-400 mb-4 text-4xl">
      {icon}
    </div>
    <h3 className="text-xl font-medium text-gray-700 mb-2">
      {title}
    </h3>
    <p className="text-gray-500">
      {description}
    </p>
  </div>
);

export default EmptyState;