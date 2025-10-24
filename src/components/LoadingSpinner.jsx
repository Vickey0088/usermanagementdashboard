import React from 'react';

const LoadingSpinner = () => (
  <div className="flex flex-col justify-center items-center mt-20 py-12">
    <div className="relative">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200"></div>
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent absolute top-0"></div>
    </div>
    <p className="mt-6 text-xl text-gray-600 font-medium">Loading users...</p>
    <p className="text-sm text-gray-400 mt-2">Please wait while we fetch the data</p>
  </div>
);

export default LoadingSpinner;