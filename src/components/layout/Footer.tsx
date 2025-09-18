import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold">FraudAuto</span>
            </div>
            <p className="text-gray-400 mb-4">
              Ghana's trusted platform for vehicle verification and fraud prevention. 
              Check VIN numbers, license plates, and vehicle history to make informed decisions.
            </p>
            <p className="text-sm text-gray-500">
              Integrated with DVLA and Ghana Police Service for accurate, real-time data.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/vin-decoder" className="text-gray-400 hover:text-white transition-colors">
                  VIN Decoder
                </Link>
              </li>
              <li>
                <Link to="/license-plate" className="text-gray-400 hover:text-white transition-colors">
                  License Plate Lookup
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 FraudAuto. All rights reserved. Made in Ghana 🇬🇭 By Afrilogic Solutions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
