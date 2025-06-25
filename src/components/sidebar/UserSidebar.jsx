import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const UserSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const userInfo = {
    name: "Mafia User",
    email: "mafiaUser@gmail.com",
    profileImage:
      "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_640.png",
  };

  const navItems = [
    { name: "All Adverts", path: "/user-ads", icon: "🛒" },
    // Add more nav items here in future
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`fixed top-0 mt-16 left-0 h-full bg-gradient-to-b from-pink-100 to-pink-50 text-black flex flex-col p-4 shadow-xl z-50 transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Logo & Toggle Button */}
      <div className="flex justify-between items-center mb-8">
        {isSidebarOpen && (
          <img
            className="h-[80px] w-[80px] object-contain"
            src="/images/bb-store-logo3.png"
            alt="BB Store Logo"
          />
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full bg-pink-500 hover:bg-pink-600 focus:outline-none"
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-5 w-5 text-white" />
          ) : (
            <ChevronRight className="h-5 w-5 text-white" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow overflow-y-auto overflow-x-hidden">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-pink-500 text-white"
                    : "text-pink-700 hover:bg-pink-200 hover:text-pink-900"
                }`}
                title={!isSidebarOpen ? item.name : ""}
              >
                <span className="mr-3">{item.icon}</span>
                {isSidebarOpen && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="mt-auto pt-4 border-t border-pink-300">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={userInfo.profileImage}
            alt="User Profile"
            className="w-10 h-10 rounded-full object-cover"
            title={userInfo.name}
          />
          {isSidebarOpen && (
            <div>
              <p className="font-semibold text-sm">{userInfo.name}</p>
              <p className="text-xs text-pink-700">{userInfo.email}</p>
            </div>
          )}
        </div>
        {isSidebarOpen ? (
          <button
            className="w-full py-2 mt-1 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all duration-200 text-sm font-semibold"
            onClick={handleLogout}
          >
            Log Out
          </button>
        ) : (
          <button
            className="w-full mt-2 bg-pink-500 text-white p-1 rounded hover:bg-pink-600"
            onClick={handleLogout}
            title="Log Out"
          >
            🚪
          </button>
        )}
      </div>
    </aside>
  );
};

export default UserSidebar;
