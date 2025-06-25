import { Instagram, Facebook, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-pink-50 text-pink-900 border-t border-pink-200">
      <div className="max-w-screen-2xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <div className="flex items-center space-x-3">
          <img
            src="/images/bb-store-logo3.png"
            alt="BB Store Logo"
            className="h-[60px] w-auto object-contain"
          />
          <p className="text-sm font-semibold hidden md:block">
            BB Store © {new Date().getFullYear()}
          </p>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-6 font-medium text-sm">
            <li>
              <Link to="/" className="hover:text-pink-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/marketplace"
                className="hover:text-pink-600 transition-colors"
              >
                Marketplace
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-pink-600 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-600"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-600"
          >
            <Facebook size={20} />
          </a>
          <a href="mailto:info@bbstore.com" className="hover:text-pink-600">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
