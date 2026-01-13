import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Shield, CheckCircle, Clock } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const CheckoutPage: React.FC = () => {
  useDocumentTitle("Checkout");
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    email: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const vin = searchParams.get('vin') || '';

  const vehicleData = {
    year: '2017',
    make: 'TOYOTA',
    model: 'Corolla',
    vin: vin,
    recordsFound: 5,
    salePrice: 'GH₵18,887'
  };

  const handleSecureCheckout = () => {
    setTimeout(() => {
      navigate(`/vin-decoder?vin=${vin}&paid=true`);
    }, 1000);
  };

  const membershipBenefits = [
    'VIN Lookups', 'DVLA Title History', 'Insurance Total Loss',
    'Lien & Impound Information', 'Junk/Salvage/Rebuilt Title', '70+ data points',
    'Real Car Photos', 'VIN Specs & Key Features', 'Odometer Rollback Alert',
    'Auction Sales History', 'Real Ownership History', 'Theft Records'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[100rem] mx-auto py-20 mt-10">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary-red text-white p-6">
            <h1 className="text-3xl font-bold">
              Get unlimited access to detailed reports for GH₵5*
            </h1>
            <p className="mt-2">
              We found{" "}
              <strong>{vehicleData.recordsFound} history records</strong> on
              your vehicle.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/3 p-6">
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-lg mb-2">
                  {vehicleData.year} {vehicleData.make} {vehicleData.model}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  VIN {vehicleData.vin}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Country:</span>
                    <div>GHANA</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Engine:</span>
                    <div>1.8L In-Line 4</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Last mileage:</span>
                    <div>3 mi</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Sale price:</span>
                    <div>{vehicleData.salePrice}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-secondary-" />
                  </div>
                  <div>
                    <div className="font-semibold">Sales</div>
                    <div className="text-sm text-gray-600">1 sale found</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Last mileage</div>
                    <div className="text-sm text-gray-600">
                      Upgrade to check
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">
                  Your Membership Benefits Include**
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {membershipBenefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-secondary-peach" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 bg-gray-50 p-6">
              <div className="mb-6">
                <h3 className="font-bold mb-2">Order summary</h3>
                <ul className="text-sm space-y-1 mb-4">
                  <li>
                    • Report on {vehicleData.year} {vehicleData.make}{" "}
                    {vehicleData.model}
                  </li>
                  <li>• 3 Day Trial Membership</li>
                  <li>• Run Unlimited Number of Reports*</li>
                </ul>
                <div className="flex justify-between font-bold">
                  <span>Total today</span>
                  <span>GH₵5* + applicable sales tax</span>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 p-2 rounded ${paymentMethod === "card"
                      ? "bg-primary-red text-white"
                      : "bg-white border"
                    }`}
                >
                  All Cards
                </button>
                <button
                  onClick={() => setPaymentMethod("momo")}
                  className={`flex-1 p-2 rounded ${paymentMethod === "momo"
                      ? "bg-primary-orange text-white"
                      : "bg-white border"
                    }`}
                >
                  Mobile Money
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                {paymentMethod === "card" ? (
                  <>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="Name on card"
                    />
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="1234 1234 1234 1234"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 p-2 border rounded"
                        placeholder="MM / YY"
                      />
                      <input
                        type="text"
                        className="flex-1 p-2 border rounded"
                        placeholder="CVC"
                      />
                    </div>
                  </>
                ) : (
                  <input
                    type="tel"
                    className="w-full p-2 border rounded"
                    placeholder="0XX XXX XXXX"
                  />
                )}
              </div>

              <button
                onClick={handleSecureCheckout}
                className="w-full bg-primary-orange text-white py-3 rounded-lg font-bold mt-6 flex items-center justify-center gap-2 hover:bg-orange-600"
              >
                <Shield size={20} />
                Secure Checkout - GH₵5
              </button>

              <div className="mt-4 text-xs text-gray-600 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Thousands of Happy Customers
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Money Back Guarantee*
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
