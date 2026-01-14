import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold">FraudWall-Auto</span>
            </div>
            <p className="text-gray-400 mb-4">
              National Vehicle Verification & Intelligence Platform. Protecting Ghana's automotive ecosystem through comprehensive fraud prevention and verification services.


            </p>
            <p className="text-sm text-gray-500">
              A FraudWall Platform
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
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

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✉️  info@fraudwall.com
                </a>
              </li>☎️
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  📞  030 255 8653
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
        <br/>
<hr className="text-gray-700"/>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center flex items-center justify-between w-full text-sm">
          <div className="gap-2 text-gray-400" >  <span className="cursor-pointer hover:text-white">
            Data Protection & Privacy
          </span>
            <span className="pl-8 cursor-pointer hover:text-white">Terms of Use
            </span>
            <span className="pl-8 cursor-pointer hover:text-white">Compliance</span>

          </div>
          <p className="text-gray-400">
            © 2026 Afrilogic Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
