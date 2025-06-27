import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import CreateAdModal from "../modal/CreateAdModal";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  LayoutDashboard,
  PlusCircle,
} from "lucide-react";

const VendorSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const vendorInfo = {
    name: localStorage.getItem("name") || "Mafia User",
    email: localStorage.getItem("email") || "mafia@gmail.com",
    profileImage:
      "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_640.png",
  };

  const navItems = [
    {
      name: "Marketplace",
      path: "/vendor-ads",
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gradient-to-b from-pink-100 to-pink-50 text-black flex flex-col items-center px-4 pb-4 shadow-xl z-40 transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div
        className={`flex ${
          isSidebarOpen ? "justify-between" : "justify-center"
        } items-center mb-8 w-full`}
      >
        {isSidebarOpen && (
          <Link to="/user-ads">
            <img
              className="h-[70px] w-[70px] object-contain"
              src="/images/bb-store-logo2.png"
              alt="BB Store Logo"
            />
          </Link>
        )}
        <div className="flex items-center justify-center h-10 w-10">
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
      </div>

      <nav className="flex-grow overflow-y-auto overflow-x-hidden w-full">
        <ul className="space-y-5">
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
                {isSidebarOpen && (
                  <span
                    className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
                      isSidebarOpen
                        ? "opacity-100 ml-3 max-w-[200px]"
                        : "opacity-0 ml-0 max-w-0"
                    }`}
                  >
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          ))}

          <li>
            <button
              onClick={() => setIsModalOpen(true)}
              className={`w-full flex items-center ${
                isSidebarOpen ? "justify-start" : "justify-center"
              } px-4 py-2 rounded-lg bg-white text-pink-600 hover:bg-pink-200 hover:text-pink-800 font-medium transition-all duration-200`}
              title={!isSidebarOpen ? "Create New Ad" : ""}
            >
              <PlusCircle className="w-5 h-5" />
              {isSidebarOpen && <span className="ml-3">Create New Ad</span>}
            </button>
          </li>
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-t border-pink-300 w-full">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={vendorInfo.profileImage}
            alt="Vendor Profile"
            className="w-10 h-10 rounded-full object-cover"
            title={vendorInfo.name}
          />
          {isSidebarOpen && (
            <div>
              <p className="font-semibold text-sm">{vendorInfo.name}</p>
              <p className="text-xs text-pink-700">{vendorInfo.email}</p>
            </div>
          )}
        </div>
        {isSidebarOpen && (
          <button
            className="w-full py-2 mt-1 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all duration-200 text-sm font-semibold"
            onClick={handleLogout}
          >
            Log Out
          </button>
        )}
      </div>

      <CreateAdModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </aside>
  );
};

export default VendorSidebar;
