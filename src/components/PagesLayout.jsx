import Footer from "./Footer";

const PagesLayout = ({ children }) => {
  return (
    <>
      <div className="container mx-auto px-4">{children}</div>
      <Footer />
    </>
  );
};

export default PagesLayout;
