import { useState } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "./sidebar/UserSidebar";

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      <UserSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <main
        className={`flex-1 p-8 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
