import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Navbar from "../../Components/Navbar/Navbar";

const Subcategory = () => {
  const { id } = useParams(); // Extract categoryId from the URL
  const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation
  const [subcategory, setSubcategory] = useState(null);

  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        const response = await fetch(`https://competent-bennie-asim-c9637f51.koyeb.app/category/getsinglecategory/${id}`);
        const data = await response.json();
        console.log(data.category.subcategories); // Check the structure
        setSubcategory(data.category.subcategories); // Assuming 'subcategories' is the array holding the subcategory data
      } catch (error) {
        console.error("Error fetching subcategory:", error);
      }
    };

    fetchSubcategory();
  }, [id]); // The effect runs whenever the categoryId (id) changes

  // Handle card click to navigate to DepositForm page with subcategoryId
  const handleCardClick = (subcategoryId) => {
    navigate(`/depositform/${subcategoryId}`); // Navigates to DepositForm with the subcategoryId
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      {subcategory ? (
        <div className="flex flex-wrap justify-center mt-10">
          {/* Map over subcategories and display them as stylish cards */}
          {subcategory.map((sub, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(sub._id)} // Call handleCardClick on card click
              className="subcategory-card bg-white m-5 w-72 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <h2 className="text-2xl font-semibold text-blue-500 mb-3">{sub.name}</h2>
              <p className="text-gray-600 mb-3">{sub.description}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full hover:bg-blue-600 transition-colors"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl">Loading subcategory details...</p>
      )}
    </div>
  );
};

export default Subcategory;
