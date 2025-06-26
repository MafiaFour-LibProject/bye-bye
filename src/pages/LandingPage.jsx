import React from "react";
import { useNavigate } from "react-router-dom"; 

const HeroSection = () => {
  const navigate = useNavigate(); 

  return (
    <div className="relative w-full">
      <video
        className="w-full h-screen object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/Vid4.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-pink-600 px-4 text-center bg-black/30"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4">
          BYE-BYE STORE
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-black bg-pink-200/30 font-extrabold rounded px-3 py-2 mt-2">
          Shop Like He Never Happened — Luxe for Less.
        </p>
        <button
          onClick={() => navigate("/user-ads")}
          className="mt-8 px-5 py-3 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
