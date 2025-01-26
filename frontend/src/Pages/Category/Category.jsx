import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Navbar from "../../Components/Navbar/Navbar";

const Category = () => {
  const [categories, setCategories] = useState([]); // State to hold the categories
  const [loading, setLoading] = useState(true); // State to show loading spinner or message
  const navigate = useNavigate(); // Use navigate hook for redirection

  const categoryDescriptions = {
    wedding: "Saylani Wedding - We offer complete wedding event planning services, including venue selection, catering, and decorations.",
    education: "Saylani Education - Providing educational resources, scholarships, and support for students to achieve their academic goals.",
    "business startup": "Saylani Business Startup - Helping entrepreneurs establish and grow their businesses with expert guidance and resources.",
    "home construction": "Saylani Home Construction - Offering construction, renovation, and home improvement services to build your dream home."
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://competent-bennie-asim-c9637f51.koyeb.app/category/getcategory");
        const data = await response.json();
        console.log(data.category); // Check the structure of the categories
        setCategories(data.category); // Assuming 'category' is the key holding the category data
        setLoading(false); // Stop loading once the data is fetched
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    // Navigate to /subcategory with the categoryId as a URL parameter
    navigate(`/subcategory/${categoryId}`);
  };

  return (
    <div>
      <Navbar />

      {loading ? (
        <p className="text-xl">Loading categories...</p>
      ) : (
        <div className="flex justify-around items-center flex-wrap">
          {categories.map((category, index) => {
            console.log(category); // Log category object to ensure correct data

            const categoryKey = category.name.toLowerCase().replace(/\s+/g, " ");
            const description = categoryDescriptions[categoryKey] || "Description not available for this category.";

            return (
              <div
                className="category-card m-10 bg-gray-100 w-[500px] p-6 rounded-lg shadow-lg text-center cursor-pointer hover:bg-gray-200 hover:scale-105 transition-all duration-300 ease-in-out"
                key={index}
                onClick={() => handleCategoryClick(category._id)} // Handle click to navigate
              >
                <h3 className="text-xl font-semibold mb-3">{category.name}</h3>
                <p className="text-gray-500 mb-3">{description}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Category;
