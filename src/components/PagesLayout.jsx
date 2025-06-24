import Footer from "./Footer";
import Navbar from "./UserNavbar";

const PagesLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">{children}</div>
      <Footer />
    </>
  );
};

export default PagesLayout;
