import { useState } from "react";
import { Outlet } from "react-router-dom";
import VendorSidebar from "./sidebar/VendorSidebar";

const VendorLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      <VendorSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <main
        className={`flex-1 px-8 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16" // Adjust margin based on sidebar width
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default VendorLayout;
