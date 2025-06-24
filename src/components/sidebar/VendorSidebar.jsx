import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateAdModal from "../modal/CreateAdModal";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VendorSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  // WORK ON THIS!!!!!!!!////////////////////////////
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const vendorInfo = {
    name: "Mafia Four",
    email: "mafia4@gmail.com",
    profileImage:
      "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_640.png",
  };

  return (
    <aside
      className={`fixed mt-10 top-0 left-0 h-full  bg-white text-black flex flex-col p-3 shadow-lg z-40 transition-all duration-300
        ${isSidebarOpen ? "w-64" : "w-20"}`}
    >
      <div className="flex justify-between items-center w-full mb-8">
        {isSidebarOpen && (
          <img
            className="h-[150px] w-[150px] object-cover"
            src="/images/bb-store-logo2.png"
            alt="BB Store Logo"
          />
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-6 w-6 text-white bg-pink-600 rounded" />
          ) : (
            <ChevronRight className="h-6 w-6 text-white bg-pink-600" />
          )}
        </button>
      </div>

      <div className="flex-grow overflow-y-auto overflow-x-hidden">
        {" "}
        <nav>
          <ul>
            <li className="mb-3">
              <Link
                to="/vendor-ads"
                className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                title={isSidebarOpen ? "" : "Marketplace"}
              >
                <span className="mr-3 flex-shrink-0">📊</span>{" "}
                {isSidebarOpen && (
                  <span className="whitespace-nowrap">Marketplace</span>
                )}
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                title={isSidebarOpen ? "" : "Dashboard"}
              >
                <span className="mr-3 flex-shrink-0">🏠</span>{" "}
                {isSidebarOpen && (
                  <span className="whitespace-nowrap">Dashboard</span>
                )}
              </Link>
            </li>
            <li className="mb-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full text-left flex items-center px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-700 hover:text-white  font-semibold transition duration-200"
                title={isSidebarOpen ? "" : "Create New Ad"}
              >
                <span className="mr-3 flex-shrink-0">➕</span>{" "}
                {isSidebarOpen && (
                  <span className="whitespace-nowrap">Create New Ad</span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mt-auto border-t border-gray-700 pt-4 flex items-center justify-center">
        {isSidebarOpen ? (
          <div className="flex items-center w-full">
            <img
              src={vendorInfo.profileImage}
              alt="Vendor Profile"
              className="w-10 h-10 rounded-full mr-3 flex-shrink-0"
            />
            <div>
              <p className="font-semibold whitespace-nowrap">
                {vendorInfo.name}
              </p>
              <p className="text-sm text-gray-400 whitespace-nowrap">
                {vendorInfo.email}
              </p>
            </div>
          </div>
        ) : (
          <img
            src={vendorInfo.profileImage}
            alt="Vendor Profile"
            className="w-10 h-10 rounded-full"
            title={vendorInfo.name}
          />
        )}
      </div>

      <CreateAdModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <button className="bg-pink-500" onClick={handleLogout}>
        Log Out
      </button>
    </aside>
  );
};

export default VendorSidebar;
