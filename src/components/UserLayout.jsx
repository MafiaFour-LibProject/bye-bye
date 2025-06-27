import { Outlet } from "react-router-dom";
import Navbar from "./UserNavbar";
import Footer from "./Footer";

const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-20">
        {" "}
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default UserLayout;
