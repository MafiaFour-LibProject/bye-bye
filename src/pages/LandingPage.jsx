import React from "react";

const HeroSection = () => {
  return (
    <div className="relative w-full">
      <video
        className="w-full h-screen object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/Vid5g.mp4" type="video/mp4" />
        
      </video>

     
      <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center text-orange-600 p-4">
        <h1 className="text-9xl font-bold mb-2 ">B-BStore</h1>
        <p className="text-black     text-center mb-4 max-w-md text-2xl">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt,
          dolorem!
        </p>
        <button className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 mt-20  mr-200 ">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
