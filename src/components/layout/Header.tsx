import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getNavLinkClass = (path: string) => {
    const baseClass = "text-sm transition-all duration-300 ease-in";
    const isCurrentPage = isActive(path);

    if (isScrolled) {
      return `${baseClass} ${
        isCurrentPage
          ? "text-primary-red font-semibold"
          : "text-gray-600 hover:text-gray-800"
      }`;
    } else {
      return `${baseClass} ${
        isCurrentPage
          ? "text-white  bg-primary-red px-3 py-1 rounded-md"
          : "text-gray-900 hover:text-primary-red hover:rounded-md hover:bg-white hover:px-4 hover:py-2"
      }`;
    }
  };

  const getPricingLinkClass = () => {
    const isCurrentPage = isActive("/pricing");

    if (isScrolled) {
      return `text-sm px-3 py-1 rounded-md transition-all duration-300 ease-in ${
        isCurrentPage
          ? " text-primary-red font-semibold"
          : "hover:text-primary-red hover:rounded-md hover:bg-white hover:px-4 hover:py-2 text-gray-900 hover:bg-secondary-dark-red"
      }`;
    } else {
      return `text-sm px-3 py-1 rounded-md transition-all duration-300 ease-in ${
        isCurrentPage
          ? "bg-primary-red text-white border border-primary-red font-semibold"
          : "bg-white/20 text-gray-900 border border-white/30 hover:rounded-md hover:bg-white hover:px-4 hover:py-2 hover:text-primary-red"
      }`;
    }
  };

  const getMobileNavLinkClass = (path: string) => {
    const baseClass = "text-sm transition-colors";
    const isCurrentPage = isActive(path);

    if (isScrolled) {
      return `${baseClass} ${
        isCurrentPage
          ? "text-primary-red font-semibold"
          : "text-gray-600 hover:text-gray-800"
      }`;
    } else {
      return `${baseClass} ${
        isCurrentPage
          ? "text-primary-red font-semibold "
          : "text-black hover:text-white"
      }`;
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 border-0 ${
        isScrolled
          ? "top-4 left-1/2 transform -translate-x-1/2 sm:max-w-2xl lg:max-w-4xl px-4"
          : "px-4 sm:px-6 border-0"
      }`}
    >
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md  border-gray-200/60 rounded-lg px-4 sm:px-6 py-3 shadow-lg"
            : "bg-transparent px-0 py-4 border-0"
        }`}
      >
        <div className="flex justify-between items-center border-0 ">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span
              className={`text-lg font-bold transition-colors ${
                isScrolled ? "text-gray-900" : "text-primary-red"
              }`}
            >
              FraudWall-Auto
            </span>
            <Shield className="h-6 w-6 text-secondary-orange" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 ">
            <Link to="/" className={getNavLinkClass("/")}>
              Home
            </Link>
            <Link to="/vin-decoder" className={getNavLinkClass("/vin-decoder")}>
              <span className="hidden lg:inline">VIN Decoder & Lookup</span>
              <span className="lg:hidden">VIN Decoder</span>
            </Link>
            <Link
              to="/license-plate"
              className={getNavLinkClass("/license-plate")}
            >
              License Plate
            </Link>
            <Link to="/pricing" className={getPricingLinkClass()}>
              Pricing
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            <Link
              to="/login"
              className={`text-sm transition-colors px-3 lg:px-4 py-2 rounded-md ${
                isActive("/login")
                  ? "text-primary-red font-semibold"
                  : isScrolled
                  ? "text-gray-600 hover:text-gray-800"
                  : "text-gray-900 hover:text-white hover:bg-primary-red"
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`text-sm px-3 lg:px-4 py-2 rounded-md transition-colors ${
                isActive("/register")
                  ? "bg-primary-red text-white font-semibold"
                  : isScrolled
                  ? "bg-secondary-orange hover:bg-primary-yellow text-white"
                  : "bg-white text-gray-900 hover:bg-secondary-orange hover:text-white"
              }`}
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-md transition-colors ${
              isScrolled
                ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                : "text-white font-bold hover:text-white hover:bg-white/2 bg-secondary-orange/85"
            }`}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className={`md:hidden mt-4 pt-4 ${
              isScrolled
                ? "border-t border-gray-200/60"
                : "bg-white/80 backdrop-blur-md  border-gray-200/60 rounded-lg px-4 sm:px-6 py-3 shadow-lg"
            }`}
          >
            <div className="flex flex-col space-y-3">
              <Link to="/" className={getMobileNavLinkClass("/")}>
                Home
              </Link>
              <Link
                to="/vin-decoder"
                className={getMobileNavLinkClass("/vin-decoder")}
              >
                VIN Decoder
              </Link>
              <Link
                to="/license-plate"
                className={getMobileNavLinkClass("/license-plate")}
              >
                License Plate
              </Link>
              <Link to="/pricing" className={getMobileNavLinkClass("/pricing")}>
                Pricing
              </Link>
              <div
                className={`flex space-x-3 pt-3 ${
                  isScrolled
                    ? "border-t border-gray-200/60"
                    : "border-t border-white/20"
                }`}
              >
                <Link
                  to="/login"
                  className={`text-sm transition-colors ${
                    isActive("/login")
                      ? "text-primary-red font-semibold"
                      : isScrolled
                      ? "text-gray-600 hover:text-gray-800 pt-2"
                      : "text-black hover:text-white pt-2"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`text-sm px-4 py-2 rounded-md transition-colors ${
                    isActive("/register")
                      ? "bg-primary-red text-white font-semibold"
                      : isScrolled
                      ? "bg-secondary-orange hover:bg-primary-yellow text-white"
                      : "bg-white text-gray-900 hover:bg-white/90"
                  }`}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
