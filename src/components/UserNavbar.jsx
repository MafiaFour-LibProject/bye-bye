import { useNavigate, Link } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const token = localStorage.getItem("accessToken");
  const vendorInfo = {
    name: localStorage.getItem("name") || "Mafia User",
    email: localStorage.getItem("email") || "mafia@gmail.com",
    profileImage:
      "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_640.png",
  };

  return (
    <nav className="bg-pink-200 fixed top-0 left-0 w-full z-50 text-white  px-4 py-3 flex flex-col md:flex-row items-start md:items-center justify-between">
      {/* Left: Links */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6"></div>

      {/* Right: Buttons */}
      <div className="mt-3 md:mt-0 flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-8 mr-10 ">
        <Link
          to="/user-ads"
          className="underline hover:bg-pink-300  text-pink-900 font-extrabold decoration-1"
        >
          Home
        </Link>

        <Link
          to="/about"
          className="underline hover:bg-pink-300  text-pink-900 font-extrabold decoration-1"
        >
          About Us
        </Link>

        {!token ? (
          <>
            <button
              onClick={() => navigate("/signup")}
              className="bg-pink-500 cursor-pointer hover:bg-pink-700  font-semibold px-4 py-2 rounded-lg   shadow-md transition duration-300 ease-in-out"
            >
              Create Account
            </button>

            <button
              onClick={() => navigate("/login")}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded cursor-pointer "
            >
              Login
            </button>
          </>
        ) : (
          <div className="flex gap-3 items-center justify-center">
            <img
              src={vendorInfo.profileImage}
              alt="Vendor Profile"
              className="w-10 h-10 rounded-full object-cover"
              title={vendorInfo.name}
              onClick={handleLogout}
            />
            <p className="font-semibold text-sm">{vendorInfo.name}</p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
