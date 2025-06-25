import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-pink-200 fixed top-0 left-0 w-full z-50 text-white  px-4 py-3 flex flex-col md:flex-row items-start md:items-center justify-between">
      {/* Left: Links */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6"></div>

      {/* Right: Buttons */}
      <div className="mt-3 md:mt-0 flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-8 mr-10 ">
        <a href="/home"
        onClick={() => navigate("/user-ads")}
        className="underline hover:bg-pink-300  text-pink-900 font-extrabold decoration-1">
          Home
        </a>
        <a
          href="/about"
          onClick={() => navigate("/about")}
          className="underline hover:bg-pink-300  text-pink-900 font-extrabold decoration-1"
        >
          About Us
        </a>
        <button
          onClick={() => navigate("/signup")}
          className="bg-pink-500 cursor-pointer hover:bg-pink-700  font-semibold px-4 py-2 rounded-lg   shadow-md transition duration-300 ease-in-out"
        >
          Create Account
        </button>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => navigate("/login")}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded cursor-pointer "
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
