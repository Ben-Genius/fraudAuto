"use client";
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Shield, AlertTriangle, Car, CheckCircle, XCircle, MapPin, Download, Share2, Eye, TrendingDown, DollarSign, User, FileText, BarChart3 } from 'lucide-react';
import { Button } from '../../components/ui/button';

const VinDecoder = () => {
  const [vin, setVin] = useState('');
  const [showSample, setShowSample] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const vinParam = searchParams.get('vin');
    if (vinParam && vinParam.length === 17) {
      setVin(vinParam);
      setShowSample(true);
    } else if (vinParam) {
      setVin(vinParam);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vin.length === 17) {
      setShowSample(true);
      navigate(`/vin-decoder?vin=${vin}`, { replace: true });
    }
  };

  const sampleData = {
    vin: 'SCBFR7ZA5CC072256',
    vehicle: {
      year: 2012,
      make: 'BENTLEY',
      model: 'Continental GT',
      engine: '6.0L W12 Twin Turbo',
      madeIn: 'UNITED KINGDOM',
      fuelType: 'Premium Gasoline',
      transmission: 'Automatic',
      bodyStyle: 'Coupe',
      driveLine: 'AWD',
      trim: 'GT'
    },
    summary: {
      totalEvents: 66,
      safetyRecalls: 0,
      accidents: 15,
      lastMileage: 18796,
      salesHistory: 5,
      owners: 4,
      junkSalvage: 11
    },
    ownership: [
      { owner: 1, type: 'Personal', country: 'Ghana', estMiYear: 2258, lastOdometer: 7338, purchased: 2012, usage: '3 yrs 3 mo' },
      { owner: 2, type: 'Personal', country: 'Ghana', estMiYear: 92, lastOdometer: 15044, purchased: 2016, usage: '3 yrs 1 mo' },
      { owner: 3, type: 'Personal', country: 'Ghana', estMiYear: 0, lastOdometer: 1, purchased: 2019, usage: '0 yrs 3 mo' },
      { owner: 4, type: 'Commercial', country: 'Ghana', estMiYear: 3090, lastOdometer: 18796, purchased: 2019, usage: '6 yrs 1 mo' }
    ],
    checks: {
      safetyRecalls: { status: 'clean', message: 'No safety recalls found', count: 0 },
      stolenVehicle: { status: 'clean', message: 'No theft records in Ghana Police database', count: 0 },
      junkSalvage: { status: 'warning', message: '11 salvage records found', count: 11 },
      odometer: { status: 'error', message: 'Odometer tampering detected - Not Actual', count: 1 },
      titleHistory: { status: 'warning', message: 'Multiple title brands found', count: 7 },
      majorTitleBrands: { status: 'warning', message: 'Salvage & Rebuilt brands found', count: 2 },
      otherTitleBrands: { status: 'error', message: 'Crushed brand found', count: 1 }
    },
    historyEvents: [
      { date: '2025-07-02', mileage: 18796, provider: 'Copart Auction', event: 'Salvage Certificate Sale - GHS 45,200', location: 'Accra, Ghana' },
      { date: '2025-06-19', mileage: 18796, provider: 'DVLA Ghana', event: 'Crushed Brand Title', location: 'Tema, Ghana' },
      { date: '2019-08-28', mileage: 18796, provider: 'Auction House', event: 'Auction Sale - GHS 134,000', location: 'Kumasi, Ghana' },
      { date: '2019-04-15', mileage: 15044, provider: 'Police Report', event: 'Hit Object - Major Damage', location: 'Takoradi, Ghana' },
      { date: '2016-01-03', mileage: 14759, provider: 'Insurance Claim', event: 'Collision Damage', location: 'Cape Coast, Ghana' },
      { date: '2015-08-27', mileage: 7096, provider: 'Dealer Sale', event: 'Classified Sale - GHS 423,996', location: 'Accra, Ghana' },
      { date: '2013-05-07', mileage: 3084, provider: 'Auction House', event: 'Auction Sale - GHS 769,980', location: 'Tema, Ghana' },
      { date: '2012-05-19', mileage: 2224, provider: 'Police Report', event: 'Accident Report Filed', location: 'Accra, Ghana' }
    ],
    salesHistory: [
      { date: '2025-07-02', location: 'Accra Auction', price: 'GHS 45,200', mileage: 18796, condition: 'Salvage Certificate', damage: 'Front End', photos: 12 },
      { date: '2019-08-28', location: 'Kumasi Auction', price: 'GHS 134,000', mileage: 18796, condition: 'Run & Drive', damage: 'Front End, Minor Scratches', photos: 10 },
      { date: '2015-08-27', location: 'Accra Classified', price: 'GHS 423,996', mileage: 7096, condition: 'Good', damage: 'None Listed', photos: 8 },
      { date: '2013-05-07', location: 'Tema Auction', price: 'GHS 769,980', mileage: 3084, condition: 'Run & Drive Verified', damage: 'Partial/Incomplete Repair', photos: 10 },
      { date: '2013-01-31', location: 'Accra Auction', price: 'GHS 197,780', mileage: 0, condition: 'Damaged', damage: 'Front End', photos: 10 }
    ],
    ownershipCost: {
      depreciation: [17325, 15992, 14659, 13326, 11993],
      insurance: [7624, 7892, 8168, 8452, 8748],
      fuel: [10064, 10368, 10728, 11160, 11660],
      maintenance: [11052, 11648, 7156, 10068, 9164],
      repair: [6604, 5160, 5892, 6360, 7264],
      taxesFees: [12852, 1464, 1864, 1196, 1660],
      total: 267576
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-gray-900 mb-6 tracking-tight">
            Ghana VIN Decoder
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Comprehensive vehicle verification powered by Ghana DVLA, Police Service, and insurance databases
          </p>
        </div>

        {/* VIN Input */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-6">
              <Search className="h-8 w-8 text-primary-red mx-auto mb-4" />
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Enter VIN Number</h2>
              <p className="text-gray-600">17-character vehicle identification number</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  placeholder="Enter 17-character VIN..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-orange focus:border-transparent text-lg font-mono"
                  maxLength={17}
                />
              </div>
              <div className="flex gap-3">
                <Button 
                  type="submit" 
                  size="lg"
                  className="flex-1 bg-primary-red hover:bg-red-700 px-6"
                  disabled={vin.length !== 17}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Generate Report - GHS 25
                </Button>
                <Button 
                  type="button" 
                  size="lg"
                  className="px-6 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  onClick={() => {
                    setVin('SCBFR7ZA5CC072256');
                    setShowSample(true);
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Sample
                </Button>
              </div>
            </form>
            <p className="text-sm text-gray-500 mt-3 text-center">
              Decode vehicle specifications and check theft status
            </p>
          </div>
        </div>

        {/* Sample Report */}
        {showSample && (
          <div className="space-y-12">
            {/* Report Header */}
            <div className="bg-gradient-to-br from-primary-red to-red-700 rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-4">
                    🇬🇭 DVLA VERIFIED
                  </div>
                  <h2 className="text-3xl font-light mb-3 tracking-tight">Vehicle History Report</h2>
                  <p className="text-xl opacity-90 font-light">{sampleData.vehicle.year} {sampleData.vehicle.make} {sampleData.vehicle.model}</p>
                  <p className="font-mono text-sm opacity-80 mt-2">VIN: {sampleData.vin}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-80">Generated: {new Date().toLocaleDateString()}</p>
                  <p className="text-xs opacity-70">Report #FR{Date.now().toString().slice(-6)}</p>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {[
                { label: 'Total Events', value: sampleData.summary.totalEvents, color: 'text-blue-600' },
                { label: 'Safety Recalls', value: sampleData.summary.safetyRecalls, color: 'text-green-600' },
                { label: 'Accidents', value: sampleData.summary.accidents, color: 'text-red-600' },
                { label: 'Last Mileage', value: sampleData.summary.lastMileage.toLocaleString(), color: 'text-purple-600' },
                { label: 'Sales History', value: sampleData.summary.salesHistory, color: 'text-orange-600' },
                { label: 'Owners', value: sampleData.summary.owners, color: 'text-indigo-600' },
                { label: 'Insurance Records', value: sampleData.summary.junkSalvage, color: 'text-yellow-600' }
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className={`text-3xl font-light ${item.color} mb-2`}>{item.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Left Column - Vehicle Info */}
              <div className="lg:col-span-2 space-y-12">
                {/* Vehicle Specifications */}
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-8">
                    <Car className="h-6 w-6 text-primary-red" />
                    <h3 className="text-2xl font-light text-gray-900">Vehicle Specifications</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {Object.entries(sampleData.vehicle).map(([key, value]) => (
                      <div key={key} className="p-4 bg-gray-50 rounded-2xl">
                        <div className="font-medium text-gray-900 text-lg">{value}</div>
                        <div className="text-sm text-gray-600 capitalize mt-1">{key.replace(/([A-Z])/g, ' $1')}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ownership History */}
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-8">
                    <User className="h-6 w-6 text-primary-red" />
                    <h3 className="text-2xl font-light text-gray-900">Ownership History</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sampleData.ownership.map((owner) => (
                      <div key={owner.owner} className="bg-gray-50 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <User className="h-5 w-5 text-gray-600" />
                          <span className="font-medium text-lg">{owner.owner}{owner.owner === 1 ? 'st' : owner.owner === 2 ? 'nd' : owner.owner === 3 ? 'rd' : 'th'} Owner</span>
                          <div className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">{owner.type}</div>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Country:</span>
                            <span className="font-medium">🇬🇭 {owner.country}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Est. mi/year:</span>
                            <span className="font-medium">{owner.estMiYear.toLocaleString()} mi</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last odometer:</span>
                            <span className="font-medium">{owner.lastOdometer.toLocaleString()} mi</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Purchased:</span>
                            <span className="font-medium">{owner.purchased}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Usage:</span>
                            <span className="font-medium">{owner.usage}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All History Events */}
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-8">
                    <FileText className="h-6 w-6 text-primary-red" />
                    <h3 className="text-2xl font-light text-gray-900">All History Events ({sampleData.summary.totalEvents} records)</h3>
                  </div>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {sampleData.historyEvents.map((event, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                        <div className="text-xs text-gray-500 min-w-20 font-mono">
                          {event.date}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm mb-1">{event.event}</div>
                          <div className="text-xs text-gray-600 flex items-center gap-4">
                            <span>{event.provider}</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </span>
                            {event.mileage && (
                              <span>{event.mileage.toLocaleString()} mi</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sales History */}
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-8">
                    <DollarSign className="h-6 w-6 text-primary-red" />
                    <h3 className="text-2xl font-light text-gray-900">Sales History ({sampleData.summary.salesHistory} sales)</h3>
                  </div>
                  <div className="space-y-6">
                    {sampleData.salesHistory.map((sale, index) => (
                      <div key={index} className="bg-gray-50 rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="font-medium text-2xl text-green-600">{sale.price}</div>
                            <div className="text-sm text-gray-600">{sale.date} • {sale.location}</div>
                          </div>
                          <div className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">{sale.photos} photos</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Mileage:</span>
                            <span className="ml-2 font-medium">{sale.mileage.toLocaleString()} mi</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Condition:</span>
                            <span className="ml-2 font-medium">{sale.condition}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-600">Damage:</span>
                            <span className="ml-2 font-medium text-red-600">{sale.damage}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Checks & Analysis */}
              <div className="space-y-12">
                {/* Safety & Security Checks */}
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-8">
                    <Shield className="h-6 w-6 text-primary-red" />
                    <h3 className="text-2xl font-light text-gray-900">Safety & Security Checks</h3>
                  </div>
                  <div className="space-y-4">
                    {Object.entries(sampleData.checks).map(([key, check]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div className="flex items-center gap-4">
                          {check.status === 'clean' && <CheckCircle className="h-5 w-5 text-green-600" />}
                          {check.status === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                          {check.status === 'error' && <XCircle className="h-5 w-5 text-red-600" />}
                          <div>
                            <div className="font-medium text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                            <div className="text-xs text-gray-600">{check.message}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{check.count}</div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            check.status === 'clean' ? 'bg-green-100 text-green-800' :
                            check.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {check.status === 'clean' ? 'CLEAR' : 
                             check.status === 'warning' ? 'WARNING' : 'ALERT'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Market Price Analysis */}
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-8">
                    <BarChart3 className="h-6 w-6 text-primary-red" />
                    <h3 className="text-2xl font-light text-gray-900">Market Price Analysis</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-blue-50 rounded-2xl">
                      <div className="text-3xl font-light text-blue-600 mb-2">GHS 174,528</div>
                      <div className="text-sm text-gray-600 mb-3">Classified Ads</div>
                      <div className="inline-flex px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Below Market</div>
                    </div>
                    <div className="text-center p-6 bg-green-50 rounded-2xl">
                      <div className="text-3xl font-light text-green-600 mb-2">GHS 216,200</div>
                      <div className="text-sm text-gray-600 mb-3">Auction Sales</div>
                      <div className="inline-flex px-4 py-2 bg-green-100 text-green-800 rounded-full text-xs font-medium">Average Market</div>
                    </div>
                    <div className="text-center p-6 bg-purple-50 rounded-2xl">
                      <div className="text-3xl font-light text-purple-600 mb-2">GHS 257,868</div>
                      <div className="text-sm text-gray-600 mb-3">Dealer Price</div>
                      <div className="inline-flex px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Above Market</div>
                    </div>
                  </div>
                </div>

                {/* Ownership Cost */}
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-8">
                    <TrendingDown className="h-6 w-6 text-primary-red" />
                    <h3 className="text-2xl font-light text-gray-900">5-Year Ownership Cost</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { category: 'Depreciation', total: sampleData.ownershipCost.depreciation.reduce((a, b) => a + b, 0) },
                      { category: 'Insurance', total: sampleData.ownershipCost.insurance.reduce((a, b) => a + b, 0) },
                      { category: 'Fuel', total: sampleData.ownershipCost.fuel.reduce((a, b) => a + b, 0) },
                      { category: 'Maintenance', total: sampleData.ownershipCost.maintenance.reduce((a, b) => a + b, 0) },
                      { category: 'Repair', total: sampleData.ownershipCost.repair.reduce((a, b) => a + b, 0) },
                      { category: 'Taxes & Fees', total: sampleData.ownershipCost.taxesFees.reduce((a, b) => a + b, 0) }
                    ].map((cost) => (
                      <div key={cost.category} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                        <span className="text-sm font-medium">{cost.category}</span>
                        <span className="font-medium">GHS {cost.total.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center p-4 bg-primary-red/10 rounded-xl font-medium">
                      <span>Total 5-Year Cost</span>
                      <span className="text-primary-red text-lg">GHS {sampleData.ownershipCost.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-6">
              <Button className="bg-primary-red hover:bg-red-700 text-white px-8 py-4 rounded-2xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                <Download className="h-5 w-5 mr-3" />
                Download Report
              </Button>
              <Button className="bg-white text-gray-700 px-8 py-4 rounded-2xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                <Share2 className="h-5 w-5 mr-3" />
                Share Report
              </Button>
              <Button className="bg-white text-gray-700 px-8 py-4 rounded-2xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                <Search className="h-5 w-5 mr-3" />
                New Search
              </Button>
            </div>

            {/* Disclaimer */}
            <div className="bg-gray-50 rounded-3xl p-8 shadow-lg">
              <div className="text-sm text-gray-600 space-y-4">
                <p className="font-medium text-gray-900 text-lg">Important Disclaimer</p>
                <p className="leading-relaxed">
                  This report is compiled from Ghana DVLA records, Police Service database, insurance companies, 
                  and verified sources. Data accuracy depends on reporting entities. Always conduct physical 
                  inspection before purchase.
                </p>
                <p className="text-xs text-gray-500">
                  🔒 FraudAuto is an approved data provider working with Ghana's official systems.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VinDecoder;
