import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative w-full">
      <img src="/Image2.jpg" alt="HeroImage" className="w-full h-auto" />
      <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center text-white p-4">
        <h3 className="text-3xl font-bold mb-2">B-BStore</h3>
        <p className="text-center mb-4 max-w-md">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, dolorem!
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;