import React from "react";
import hero from "../../assets/hero.png";

const Hero = () => {
  return (
    <div className="hero min-h-screen bg-[#00152E] text-white">
      <div className="hero-content flex flex-col lg:flex-row items-center justify-between w-full px-6 lg:px-16">
        {/* Hero Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={hero}
            alt="Hero"
            className="rounded-lg shadow-2xl h-[250px] md:h-[500px] w-auto"
          />
        </div>
        {/* Hero Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl font-bold">Saylani Microfinance</h1>
          <p className="py-6">
            Empowering communities through microfinance solutions. Our mission
            is to provide financial support and promote sustainable growth for
            underprivileged sectors.
          </p>
          <button className="btn btn-primary bg-white text-[#00152E] hover:bg-[#003366]">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
