import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Or your preferred icon library
import { useNavigate } from "react-router-dom";

const UserSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
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

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-slate-800 text-white flex flex-col p-4 shadow-lg z-40 transition-all duration-300
        ${isSidebarOpen ? "w-44" : "w-20 items-center"}`}
    >
      <div className="flex justify-between items-center w-full mb-8">
        {isSidebarOpen && (
          <img
            className="h-[100px] w-[100px] object-cover"
            src="/images/bb-store-logo3.png"
            alt="BB Store Logo"
          />
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-6 w-6" />
          ) : (
            <ChevronRight className="h-6 w-6" />
          )}
        </button>
      </div>

      <div className="flex-grow overflow-y-auto overflow-x-hidden">
        <nav>
          <ul>
            <li className="mb-3">
              <Link
                to="/user-ads"
                className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                title={isSidebarOpen ? "" : "All Adverts"}
              >
                <span className="mr-3 flex-shrink-0">🛒</span>{" "}
                {isSidebarOpen && (
                  <span className="whitespace-nowrap">All Adverts</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mt-auto border-t border-gray-600 pt-4 flex items-center justify-center">
        {isSidebarOpen ? (
          <div className="flex items-center w-full">
            <img
              src={userInfo.profileImage}
              alt="User Profile"
              className="w-10 h-10 rounded-full mr-3 flex-shrink-0"
            />
            <div>
              <p className="font-semibold whitespace-nowrap">{userInfo.name}</p>
              <p className="text-sm text-gray-400 whitespace-nowrap">
                {userInfo.email}
              </p>
            </div>
          </div>
        ) : (
          <img
            src={userInfo.profileImage}
            alt="User Profile"
            className="w-10 h-10 rounded-full"
            title={userInfo.name}
          />
        )}
      </div>
      <button className="bg-pink-500" onClick={handleLogout}>
        Log Out
      </button>
    </aside>
  );
};

export default UserSidebar;
