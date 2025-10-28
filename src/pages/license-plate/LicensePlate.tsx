import { useState } from 'react';
import { Search, AlertCircle, CheckCircle, MapPin } from 'lucide-react';

const LicensePlate = () => {
  const [plateNumber, setPlateNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plateNumber.trim()) {
      alert('Please enter a license plate number');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResult({
        plateNumber: plateNumber,
        status: 'clear', // 'clear', 'stolen', 'flagged'
        owner: 'Private Individual',
        region: 'Greater Accra',
        registrationDate: '2020-03-15',
        vehicleType: '2018 Toyota Hilux',
        vin: 'JTFHU52N5E5******',
        lastSeen: 'Accra, Greater Accra Region'
      });
      setIsLoading(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'clear': return 'text-green-600 bg-green-100';
      case 'stolen': return 'text-red-600 bg-red-100';
      case 'flagged': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'clear': return <CheckCircle className="h-5 w-5" />;
      case 'stolen': 
      case 'flagged': return <AlertCircle className="h-5 w-5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-7">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            License Plate Lookup
          </h1>
          <p className="text-xl text-gray-600">
            Check Ghana license plates for theft status and vehicle information
          </p>
        </div>

        {/* License Plate Input Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="plate" className="block text-sm font-medium text-gray-700 mb-2">
                Ghana License Plate Number
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="plate"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                  placeholder="Enter plate number (e.g., AS 1234-21, GR 5678-22)"
                  className="flex-1 input-field"
                />
                <button
                  type="submit"
                  disabled={isLoading || !plateNumber.trim()}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                  Search
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Enter Ghana license plate in format: AS 1234-21 or GR 5678-22
              </p>
            </div>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Vehicle Status</h2>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(result.status)}`}>
                {getStatusIcon(result.status)}
                <span className="font-semibold capitalize">{result.status}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">License Plate</p>
                  <p className="font-mono text-lg font-bold">{result.plateNumber}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Vehicle</p>
                  <p className="font-semibold">{result.vehicleType}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Owner Type</p>
                  <p className="font-semibold">{result.owner}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Registration Region</p>
                  <p className="font-semibold">{result.region}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Registration Date</p>
                  <p className="font-semibold">{new Date(result.registrationDate).toLocaleDateString()}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">VIN (Partial)</p>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded">{result.vin}</p>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Last Known Location</p>
                    <p className="font-semibold">{result.lastSeen}</p>
                  </div>
                </div>
              </div>
            </div>

            {result.status === 'clear' && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">✅ Vehicle Status: Clear</h3>
                <p className="text-green-800">
                  This vehicle has not been reported as stolen and appears to be in good standing 
                  with Ghana authorities.
                </p>
              </div>
            )}

            {result.status === 'stolen' && (
              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-2">⚠️ STOLEN VEHICLE ALERT</h3>
                <p className="text-red-800 mb-2">
                  This vehicle has been reported as stolen to the Ghana Police Service.
                </p>
                <p className="text-red-800 font-semibold">
                  If you encounter this vehicle, please contact the nearest police station immediately.
                </p>
              </div>
            )}

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Need More Information?</h3>
              <p className="text-blue-800 mb-4">
                Get a comprehensive vehicle history report including ownership records, accident history, 
                and detailed verification data.
              </p>
              <button className="btn-primary">
                Get Full Report - GHS 50
              </button>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Ghana License Plate Formats</h3>
          <div className="prose text-gray-600">
            <p className="mb-4">
              Ghana uses several license plate formats depending on the region and vehicle type:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Regional Codes:</h4>
                <ul className="text-sm space-y-1">
                  <li><strong>AS</strong> - Ashanti Region</li>
                  <li><strong>BA</strong> - Brong Ahafo Region</li>
                  <li><strong>CP</strong> - Central Region</li>
                  <li><strong>EP</strong> - Eastern Region</li>
                  <li><strong>GR</strong> - Greater Accra Region</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Format Examples:</h4>
                <ul className="text-sm space-y-1">
                  <li><strong>AS 1234-21</strong> - Private vehicle</li>
                  <li><strong>GR 5678-22</strong> - Private vehicle</li>
                  <li><strong>GT 9999-A</strong> - Government vehicle</li>
                  <li><strong>DV 1234-B</strong> - Diplomatic vehicle</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicensePlate;
