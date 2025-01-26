import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleclick = () => {
    navigate("/category");
  };
  const handleform = () => {
    navigate('/form')
  }
  return (
    <div>
      <div className="navbar bg-[#E6F0ED] px-4 md:px-8 shadow-md">
        {/* Logo */}
        <a className="btn btn-ghost text-xl font-bold text-[#00796B]">
          Saylani Microfinance
        </a>

        {/* Navigation Links */}
        <div className="ml-auto hidden sm:flex gap-4 text-lg">
          <a href="#home" className="text-[#00796B] hover:underline">
            Home
          </a>
          <a onClick={handleclick} className="text-[#00796B] hover:underline" >
            Category
          </a>
          <a onClick={handleform}   className="text-[#00796B] hover:underline">
            Loan Calculator
          </a>
          <a href="#contact" className="text-[#00796B] hover:underline">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
