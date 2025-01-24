import React from "react";
import Sweetalert from "../../Components/Sweetalert/Sweetalert"; 

const NotFound = () => {
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-6xl font-extrabold text-indigo-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-lg text-gray-500 mb-8">
          It seems the page you're trying to reach is no longer available or has been moved.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Go back to Home
        </a>
      </div>
     
    </div>
  );
};

export default NotFound;
