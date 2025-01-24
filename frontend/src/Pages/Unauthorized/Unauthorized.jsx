import React from 'react';

const Unauthorized = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-6xl font-bold text-red-600">403</h1>
        <p className="text-lg text-gray-700 mt-4">You are not authorized to view this page.</p>
        <p className="text-md text-gray-500 mt-2">Please contact the administrator if you believe this is an error.</p>
        <button
          onClick={() => window.location.href = '/'}
          className="mt-6 px-6 py-2 bg-green-500 text-white text-lg font-semibold rounded-lg transition duration-300 hover:bg-green-600"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
