import { useState } from 'react';
import { Search, Car, Calendar, Wrench, MapPin } from 'lucide-react';

const VinDecoder = () => {
  const [vin, setVin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (vin.length !== 17) {
      alert('VIN must be exactly 17 characters');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResult({
        vin: vin,
        year: '2018',
        make: 'Toyota',
        model: 'Hilux',
        engine: '2.5L Diesel',
        madeIn: 'Japan',
        fuelType: 'Diesel',
        bodyType: 'Pickup Truck',
        transmission: 'Manual'
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            VIN Decoder
          </h1>
          <p className="text-xl text-gray-600">
            Decode any 17-character VIN to get detailed vehicle specifications
          </p>
        </div>

        {/* VIN Input Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="vin" className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Identification Number (VIN)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="vin"
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  placeholder="Enter 17-character VIN (e.g., 1HGBH41JXMN109186)"
                  className="flex-1 input-field"
                  maxLength={17}
                />
                <button
                  type="submit"
                  disabled={isLoading || vin.length !== 17}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                  Decode
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                VIN must be exactly 17 characters (letters and numbers only)
              </p>
            </div>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Vehicle Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Car className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Make & Model</p>
                    <p className="font-semibold">{result.make} {result.model}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Year</p>
                    <p className="font-semibold">{result.year}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Wrench className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Engine</p>
                    <p className="font-semibold">{result.engine}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Made In</p>
                    <p className="font-semibold">{result.madeIn}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Fuel Type</p>
                  <p className="font-semibold">{result.fuelType}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Body Type</p>
                  <p className="font-semibold">{result.bodyType}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Transmission</p>
                  <p className="font-semibold">{result.transmission}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">VIN</p>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded">{result.vin}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Want a Full Vehicle History Report?</h3>
              <p className="text-blue-800 mb-4">
                Get comprehensive information including theft status, accident history, ownership records, and more.
              </p>
              <button className="btn-primary">
                Get Full Report - GHS 50
              </button>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">About VIN Decoding</h3>
          <div className="prose text-gray-600">
            <p className="mb-4">
              A Vehicle Identification Number (VIN) is a unique 17-character code that identifies every vehicle. 
              Our VIN decoder provides instant access to basic vehicle specifications including:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Make, model, and year</li>
              <li>Engine specifications</li>
              <li>Country of manufacture</li>
              <li>Body type and transmission</li>
              <li>Fuel type</li>
            </ul>
            <p className="mt-4">
              For vehicles registered in Ghana, we can provide additional information through our 
              integration with DVLA and Ghana Police Service databases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VinDecoder;
