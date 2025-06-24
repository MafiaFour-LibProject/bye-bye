import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-gray-800 fixed top-0 left-0 w-full z-50 text-white px-4 py-3 flex flex-col md:flex-row items-start md:items-center justify-between">
      {/* Left: Links */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6"></div>

      {/* Right: Buttons */}
      <div className="mt-3 md:mt-0 flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
        <a href="/home" className="hover:underline">
          Home
        </a>
        <a href="/about" className="hover:underline">
          About Us
        </a>
        <button
          onClick={() => navigate("/signup")}
          className="bg-orange-600 hover:bg-orange-400 px-4 py-2 rounded"
        >
          Create Account
        </button>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => navigate("/login")}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
