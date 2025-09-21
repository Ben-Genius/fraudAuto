"use client";
import { useState } from 'react';
import { Search, Shield, AlertTriangle, Car, CheckCircle, XCircle, MapPin, Download, Share2, Eye, TrendingDown, DollarSign, User, FileText, BarChart3 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const VinDecoder = () => {
  const [vin, setVin] = useState('');
  const [showSample, setShowSample] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vin.length === 17) {
      setShowSample(true);
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
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ghana VIN Decoder & Vehicle History Report
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive vehicle verification powered by Ghana DVLA, Police Service, and insurance databases
          </p>
        </div>

        {/* VIN Input */}
        <Card className="max-w-2xl mx-auto mb-12 border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary-red" />
              Enter 17-Character VIN Number
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  placeholder="Enter VIN (e.g., SCBFR7ZA5CC072256)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent text-lg font-mono"
                  maxLength={17}
                />
                <Badge className="absolute right-3 top-3 bg-primary-red">
                  {vin.length}/17
                </Badge>
              </div>
              <div className="flex gap-3">
                <Button 
                  type="submit" 
                  className="flex-1 bg-primary-red hover:bg-red-700"
                  disabled={vin.length !== 17}
                >
                  Generate Report - GHS 25
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
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
          </CardContent>
        </Card>

        {/* Sample Report */}
        {showSample && (
          <div className="space-y-8">
            {/* Report Header */}
            <Card className="border shadow-sm">
              <CardHeader className="bg-primary-red text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="bg-white/20 text-white mb-2">🇬🇭 DVLA VERIFIED</Badge>
                    <CardTitle className="text-2xl mb-2">FRAUDAUTO VEHICLE HISTORY REPORT</CardTitle>
                    <p className="text-lg opacity-90">{sampleData.vehicle.year} {sampleData.vehicle.make} {sampleData.vehicle.model}</p>
                    <p className="font-mono text-sm opacity-80">VIN: {sampleData.vin}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-80">Generated: {new Date().toLocaleDateString()}</p>
                    <p className="text-xs opacity-70">Report #FR{Date.now().toString().slice(-6)}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

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
                <Card key={item.label} className="text-center border shadow-sm">
                  <CardContent className="pt-4">
                    <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                    <div className="text-sm text-gray-600">{item.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Vehicle Info */}
              <div className="lg:col-span-2 space-y-8">
                {/* Vehicle Specifications */}
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Car className="h-5 w-5 text-primary-red" />
                      Vehicle Specifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(sampleData.vehicle).map(([key, value]) => (
                        <div key={key} className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-semibold text-gray-900">{value}</div>
                          <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Ownership History */}
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary-red" />
                      Ownership History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sampleData.ownership.map((owner) => (
                        <div key={owner.owner} className="border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <User className="h-4 w-4 text-gray-600" />
                            <span className="font-semibold">{owner.owner}{owner.owner === 1 ? 'st' : owner.owner === 2 ? 'nd' : owner.owner === 3 ? 'rd' : 'th'} Owner</span>
                            <Badge variant="outline">{owner.type}</Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Country:</span>
                              <span>🇬🇭 {owner.country}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Est. mi/year:</span>
                              <span>{owner.estMiYear.toLocaleString()} mi</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Last odometer:</span>
                              <span>{owner.lastOdometer.toLocaleString()} mi</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Purchased:</span>
                              <span>{owner.purchased}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Usage:</span>
                              <span>{owner.usage}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* All History Events */}
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary-red" />
                      All History Events ({sampleData.summary.totalEvents} records)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {sampleData.historyEvents.map((event, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                          <div className="text-xs text-gray-500 min-w-20">
                            {event.date}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{event.event}</div>
                            <div className="text-xs text-gray-600 flex items-center gap-4 mt-1">
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
                  </CardContent>
                </Card>

                {/* Sales History */}
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary-red" />
                      Sales History ({sampleData.summary.salesHistory} sales)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sampleData.salesHistory.map((sale, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-semibold text-lg text-green-600">{sale.price}</div>
                              <div className="text-sm text-gray-600">{sale.date} • {sale.location}</div>
                            </div>
                            <Badge variant="outline">{sale.photos} photos</Badge>
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
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Checks & Analysis */}
              <div className="space-y-8">
                {/* Safety & Security Checks */}
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary-red" />
                      Safety & Security Checks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(sampleData.checks).map(([key, check]) => (
                        <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {check.status === 'clean' && <CheckCircle className="h-4 w-4 text-green-600" />}
                            {check.status === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                            {check.status === 'error' && <XCircle className="h-4 w-4 text-red-600" />}
                            <div>
                              <div className="font-medium text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                              <div className="text-xs text-gray-600">{check.message}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{check.count}</div>
                            <Badge className={
                              check.status === 'clean' ? 'bg-green-100 text-green-800' :
                              check.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {check.status === 'clean' ? 'CLEAR' : 
                               check.status === 'warning' ? 'WARNING' : 'ALERT'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Market Price Analysis */}
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary-red" />
                      Market Price Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">GHS 174,528</div>
                        <div className="text-sm text-gray-600">Classified Ads</div>
                        <Badge className="mt-1 bg-blue-100 text-blue-800">Below Market</Badge>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">GHS 216,200</div>
                        <div className="text-sm text-gray-600">Auction Sales</div>
                        <Badge className="mt-1 bg-green-100 text-green-800">Average Market</Badge>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">GHS 257,868</div>
                        <div className="text-sm text-gray-600">Dealer Price</div>
                        <Badge className="mt-1 bg-purple-100 text-purple-800">Above Market</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Ownership Cost */}
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingDown className="h-5 w-5 text-primary-red" />
                      5-Year Ownership Cost
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { category: 'Depreciation', total: sampleData.ownershipCost.depreciation.reduce((a, b) => a + b, 0) },
                        { category: 'Insurance', total: sampleData.ownershipCost.insurance.reduce((a, b) => a + b, 0) },
                        { category: 'Fuel', total: sampleData.ownershipCost.fuel.reduce((a, b) => a + b, 0) },
                        { category: 'Maintenance', total: sampleData.ownershipCost.maintenance.reduce((a, b) => a + b, 0) },
                        { category: 'Repair', total: sampleData.ownershipCost.repair.reduce((a, b) => a + b, 0) },
                        { category: 'Taxes & Fees', total: sampleData.ownershipCost.taxesFees.reduce((a, b) => a + b, 0) }
                      ].map((cost) => (
                        <div key={cost.category} className="flex justify-between items-center p-2 border-b">
                          <span className="text-sm">{cost.category}</span>
                          <span className="font-medium">GHS {cost.total.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded font-semibold">
                        <span>Total 5-Year Cost</span>
                        <span className="text-primary-red">GHS {sampleData.ownershipCost.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button className="bg-primary-red hover:bg-red-700">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share Report
              </Button>
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                New Search
              </Button>
            </div>

            {/* Disclaimer */}
            <Card className="bg-gray-100 border shadow-sm">
              <CardContent className="pt-6">
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="font-semibold">Important Disclaimer:</p>
                  <p>
                    This report is compiled from Ghana DVLA records, Police Service database, insurance companies, 
                    and verified sources. Data accuracy depends on reporting entities. Always conduct physical 
                    inspection before purchase.
                  </p>
                  <p className="text-xs">
                    🔒 FraudAuto is an approved data provider working with Ghana's official systems.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default VinDecoder;
