import React, { useState } from 'react';
import { X, Shield, Clock, CheckCircle } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  vehicleData: {
    year: string;
    make: string;
    model: string;
    vin: string;
    recordsFound: number;
    salePrice: string;
  };
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  vehicleData
}) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    email: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  if (!isOpen) return null;

  const handleSecureCheckout = () => {
    // Simulate payment processing
    setTimeout(() => {
      onComplete?.();
    }, 1000);
  };

  const membershipBenefits = [
    'VIN Lookups',
    'DVLA Title History',
    'Insurance Total Loss',
    'Lien & Impound Information',
    'Junk/Salvage/Rebuilt Title',
    '70+ data points',
    'Real Car Photos',
    'VIN Specs & Key Features',
    'Odometer Rollback Alert',
    'Auction Sales History',
    'Real Ownership History',
    'Theft Records'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Get unlimited access to detailed reports for GH₵5*</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Vehicle Info & Benefits */}
          <div className="lg:w-2/3 p-6">
            <p className="text-blue-600 mb-4">
              We found <strong>{vehicleData.recordsFound} history records</strong> on your vehicle.
            </p>

            {/* Vehicle Summary */}
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-lg mb-2">
                {vehicleData.year} {vehicleData.make} {vehicleData.model}
              </h3>
              <p className="text-sm text-gray-600 mb-2">VIN {vehicleData.vin}</p>
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

            {/* Data Categories */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
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
                  <div className="text-sm text-gray-600">Upgrade to check</div>
                </div>
              </div>
            </div>

            {/* Membership Benefits */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-4">Your Membership Benefits Include**</h3>
              <div className="grid grid-cols-2 gap-2">
                {membershipBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Payment Form */}
          <div className="lg:w-1/3 bg-gray-50 p-6">
            <div className="mb-6">
              <h3 className="font-bold mb-2">Order summary</h3>
              <ul className="text-sm space-y-1 mb-4">
                <li>• Report on {vehicleData.year} {vehicleData.make} {vehicleData.model}</li>
                <li>• 3 Day Trial Membership</li>
                <li>• Run Unlimited Number of Reports*</li>
              </ul>
              <div className="flex justify-between font-bold">
                <span>Total today</span>
                <span>GH₵5* + applicable sales tax</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-4">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 p-2 rounded ${paymentMethod === 'card' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
                >
                  All Cards
                </button>
                <button
                  onClick={() => setPaymentMethod('momo')}
                  className={`flex-1 p-2 rounded ${paymentMethod === 'momo' ? 'bg-orange-600 text-white' : 'bg-white border'}`}
                >
                  Mobile Money
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  placeholder="example@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {paymentMethod === 'card' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Name on card</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="John Smith"
                      value={formData.cardName}
                      onChange={(e) => setFormData({...formData, cardName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Card number</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="1234 1234 1234 1234"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">Expiration date</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="MM / YY"
                        value={formData.expiry}
                        onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">Security code</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="CVC"
                        value={formData.cvc}
                        onChange={(e) => setFormData({...formData, cvc: e.target.value})}
                      />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === 'momo' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Mobile Money Number</label>
                  <input
                    type="tel"
                    className="w-full p-2 border rounded"
                    placeholder="0XX XXX XXXX"
                  />
                </div>
              )}
            </div>

            <button 
              onClick={handleSecureCheckout}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold mt-6 flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
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
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Safe Checkout Guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
