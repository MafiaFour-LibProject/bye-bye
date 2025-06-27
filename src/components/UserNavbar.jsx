import { useNavigate, Link, useLocation } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const token = localStorage.getItem("accessToken");
  const vendorInfo = {
    name: localStorage.getItem("name") || "Mafia User",
    email: localStorage.getItem("email") || "mafia@gmail.com",
    profileImage:
      "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_640.png",
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <nav className="bg-pink-200 fixed top-0 left-0 w-full z-50 shadow px-4 py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img
            src="/images/bb-store-logo4.png"
            alt="BB Store Logo"
            className="h-12 w-14 object-contain hover:bg-pink-300 cursor-pointer"
          />
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/user-ads"
            className={`font-semibold px-2 py-1 rounded ${
              currentPath === "/user-ads"
                ? "bg-pink-300 text-pink-900"
                : "text-pink-900 hover:bg-pink-100"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`font-semibold px-2 py-1 rounded ${
              currentPath === "/about"
                ? "bg-pink-300 text-pink-900"
                : "text-pink-900 hover:bg-pink-100"
            }`}
          >
            About Us
          </Link>
        </div>

        {/* Right Auth/Profile (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {!token ? (
            <>
              <button
                onClick={() => navigate("/signup")}
                className="bg-pink-500 text-white px-4 py-1 rounded-md hover:bg-pink-600 text-sm"
              >
                Create Account
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-gray-700 text-white px-4 py-1 rounded-md hover:bg-gray-600 text-sm"
              >
                Login
              </button>
            </>
          ) : (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={handleLogout}
              title="Logout"
            >
              <img
                src={vendorInfo.profileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="text-sm text-pink-900 font-semibold">
                {vendorInfo.name}
              </p>
            </div>
          )}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-pink-900"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col mt-3 space-y-2 md:hidden text-pink-900 font-semibold">
          <Link to="/user-ads" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About Us
          </Link>

          {!token ? (
            <>
              <button
                onClick={() => {
                  navigate("/signup");
                  setMenuOpen(false);
                }}
                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
              >
                Create Account
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Login
              </button>
            </>
          ) : (
            <div
              className="flex items-center space-x-2 mt-2 cursor-pointer"
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
            >
              <img
                src={vendorInfo.profileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="text-sm">{vendorInfo.name}</p>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
