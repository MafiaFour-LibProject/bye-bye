import { Instagram, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-lightpink text-black">
      <div className="flex justify-around items-center px-4 py-6 max-w-screen-2xl mx-auto">
        <div className="h-[150px] w-[150px] object-cover">
          <img src="/images/bb-store-logo2.png" alt="BB Store Logo" />
        </div>
        <nav>
          <ul className="text-sm font-semibold flex gap-5 justify-between">
            <li className="hover:text-pink-800 cursor-pointer">Home</li>
            <li className="hover:text-pink-800 cursor-pointer">MarketPlace</li>
            <li className="hover:text-pink-800 cursor-pointer">Contact</li>
          </ul>
        </nav>
        <div className="flex text-sm gap-5 justify-between items-center">
          <Instagram className="hover:text-pink-800 cursor-pointer" />
          <Facebook className="hover:text-pink-800 cursor-pointer" />
          <Mail className="hover:text-pink-800 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
