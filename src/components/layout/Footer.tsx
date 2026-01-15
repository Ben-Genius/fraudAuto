import { Link } from "react-router-dom";
import { Logo } from "../ui/logo";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 sm:col-span-2">
            <Logo
              className="mb-4"
              textClassName="text-lg sm:text-xl font-bold text-white dark:text-white"
            />
            <p className="text-sm sm:text-base text-gray-400 mb-4">
              National Vehicle Verification & Intelligence Platform. Protecting Ghana's automotive ecosystem through comprehensive fraud prevention and verification services.
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              A FraudWall Platform
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold mb-3 sm:mb-4">Services</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  to="/vin-decoder"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Vehicle Verification
                </Link>
              </li>
              <li>
                <Link
                  to="/license-plate"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  For Dealers
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  For Agencies
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  API Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-3 sm:mb-4">Contact</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="mailto:info@fraudwall.com"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>✉️</span>
                  <span className="break-all">info@fraudwall.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+233302558653"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>📞</span>
                  <span>030 255 8653</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Accra, Ghana
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6 text-gray-400">
              <span className="cursor-pointer hover:text-white transition-colors">
                Data Protection & Privacy
              </span>
              <span className="cursor-pointer hover:text-white transition-colors">
                Terms of Use
              </span>
              <span className="cursor-pointer hover:text-white transition-colors">
                Compliance
              </span>
            </div>

            {/* Copyright */}
            <p className="text-gray-400 text-center sm:text-right">
              © 2026 Afrilogic Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
