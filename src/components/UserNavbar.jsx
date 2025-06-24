import React, { useState } from 'react';
import { FaGoogle, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex flex-col md:flex-row items-start md:items-center justify-between">
      {/* Left: Links */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
       
      </div>

      {/* Right: Buttons */}
      <div className="mt-3 md:mt-0 flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
         <a href="/home" className="hover:underline">Home</a>
        <a href="/about" className="hover:underline">About Us</a>
        <a href="/create-account">
          <button className="bg-orange-600 hover:bg-orange-400 px-4 py-2 rounded">Create Account</button>
        </a>

        

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
          >
            Login
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-black shadow-lg rounded z-10">
              <a href="/login-google" className="flex items-center px-4 py-2 hover:bg-gray-100">
                <FaGoogle className="mr-2" /> Continue with Google
              </a>
              <a href="/login-facebook" className="flex items-center px-4 py-2 hover:bg-gray-100">
                <FaFacebook className="mr-2" /> Continue with Facebook
              </a>
              <a href="/login-linkedin" className="flex items-center px-4 py-2 hover:bg-gray-100">
                <FaLinkedin className="mr-2" /> Continue with LinkedIn
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
