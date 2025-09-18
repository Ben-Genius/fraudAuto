import { useState } from 'react';
import { Search, Shield, AlertTriangle, Car, FileText, Users, Database, CheckCircle, XCircle, Clock, MapPin } from 'lucide-react';
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
      driveLine: 'AWD'
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
      safetyRecalls: { status: 'clean', message: 'No safety recalls found' },
      stolenVehicle: { status: 'clean', message: 'No theft records found in Ghana Police Service database' },
      junkSalvage: { status: 'warning', message: '11 salvage records found' },
      odometer: { status: 'error', message: 'Odometer tampering detected - Not Actual mileage' },
      titleHistory: { status: 'warning', message: 'Multiple title brands: Salvage, Rebuilt' }
    },
    damages: [
      { date: '2012-05-19', type: 'Accident', location: 'Accra, Ghana' },
      { date: '2015-08-25', type: 'Collision', location: 'Kumasi, Ghana' },
      { date: '2016-01-03', type: 'Crash', location: 'Tema, Ghana' },
      { date: '2019-04-15', type: 'Hit Object', location: 'Takoradi, Ghana' }
    ],
    marketPrice: {
      classified: 'GHS 174,528',
      auctions: 'GHS 216,200',
      dealer: 'GHS 257,868'
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
            Get comprehensive vehicle history reports for cars in Ghana. Check for accidents, theft status, 
            ownership history, and DVLA registration data with our advanced VIN decoder.
          </p>
        </div>

        {/* VIN Input Form */}
        <Card className="max-w-2xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary-red" />
              Enter 17-Character VIN Number
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  placeholder="Enter VIN (e.g., SCBFR7ZA5CC072256)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent text-lg font-mono"
                  maxLength={17}
                />
                <p className="text-sm text-gray-500 mt-2">
                  {vin.length}/17 characters • Find VIN on dashboard, door frame, or registration documents
                </p>
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
                  View Sample
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Sample Report */}
        {showSample && (
          <div className="space-y-8">
            {/* Report Header */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-primary-red to-secondary-orange text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">
                      FRAUDAUTO VEHICLE HISTORY REPORT
                    </CardTitle>
                    <p className="text-lg opacity-90">
                      {sampleData.vehicle.year} {sampleData.vehicle.make} {sampleData.vehicle.model}
                    </p>
                    <p className="font-mono text-sm opacity-80">VIN: {sampleData.vin}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-white text-primary-red mb-2">
                      DVLA Verified
                    </Badge>
                    <p className="text-sm opacity-80">
                      Generated: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <Card className="text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-primary-red">{sampleData.summary.totalEvents}</div>
                  <div className="text-sm text-gray-600">Total Events</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-green-600">{sampleData.summary.safetyRecalls}</div>
                  <div className="text-sm text-gray-600">Safety Recalls</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-red-600">{sampleData.summary.accidents}</div>
                  <div className="text-sm text-gray-600">Accidents</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-blue-600">{sampleData.summary.lastMileage.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Last Mileage</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-purple-600">{sampleData.summary.salesHistory}</div>
                  <div className="text-sm text-gray-600">Sales History</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-orange-600">{sampleData.summary.owners}</div>
                  <div className="text-sm text-gray-600">Owners</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-yellow-600">{sampleData.summary.junkSalvage}</div>
                  <div className="text-sm text-gray-600">Insurance Records</div>
                </CardContent>
              </Card>
            </div>

            {/* Vehicle Specifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary-red" />
                  Vehicle Specifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="font-semibold">{sampleData.vehicle.year}</div>
                    <div className="text-sm text-gray-600">Year</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{sampleData.vehicle.make}</div>
                    <div className="text-sm text-gray-600">Make</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{sampleData.vehicle.model}</div>
                    <div className="text-sm text-gray-600">Model</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{sampleData.vehicle.engine}</div>
                    <div className="text-sm text-gray-600">Engine</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{sampleData.vehicle.madeIn}</div>
                    <div className="text-sm text-gray-600">Made In</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Checks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary-red" />
                  Safety & Security Checks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(sampleData.checks).map(([key, check]) => (
                    <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {check.status === 'clean' && <CheckCircle className="h-5 w-5 text-green-600" />}
                        {check.status === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                        {check.status === 'error' && <XCircle className="h-5 w-5 text-red-600" />}
                        <div>
                          <div className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                          <div className="text-sm text-gray-600">{check.message}</div>
                        </div>
                      </div>
                      <Badge 
                        className={
                          check.status === 'clean' ? 'bg-green-100 text-green-800' :
                          check.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }
                      >
                        {check.status === 'clean' ? 'CLEAR' : 
                         check.status === 'warning' ? 'WARNING' : 'ALERT'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ownership History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary-red" />
                  Ownership History in Ghana
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sampleData.ownership.map((owner) => (
                    <div key={owner.owner} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-gray-600" />
                        <span className="font-semibold">{owner.owner}{owner.owner === 1 ? 'st' : owner.owner === 2 ? 'nd' : owner.owner === 3 ? 'rd' : 'th'} Owner</span>
                        <Badge variant="outline">{owner.type}</Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Country:</span>
                          <span className="flex items-center gap-1">
                            🇬🇭 {owner.country}
                          </span>
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
                          <span>Usage period:</span>
                          <span>{owner.usage}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Damages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary-red" />
                  Reported Damages & Accidents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleData.damages.map((damage, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div className="flex-1">
                        <div className="font-medium">{damage.type}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {damage.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {damage.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Price Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary-red" />
                  Ghana Market Price Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{sampleData.marketPrice.classified}</div>
                    <div className="text-sm text-gray-600">Classified Ads</div>
                    <Badge className="mt-2 bg-blue-100 text-blue-800">Below Market</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{sampleData.marketPrice.auctions}</div>
                    <div className="text-sm text-gray-600">Auction Sales</div>
                    <Badge className="mt-2 bg-green-100 text-green-800">Average Market</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{sampleData.marketPrice.dealer}</div>
                    <div className="text-sm text-gray-600">Dealer Price</div>
                    <Badge className="mt-2 bg-purple-100 text-purple-800">Above Market</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button className="bg-primary-red hover:bg-red-700">
                <FileText className="h-4 w-4 mr-2" />
                Download Full Report
              </Button>
              <Button variant="outline">
                Share Report
              </Button>
              <Button variant="outline">
                Get Another Report
              </Button>
            </div>

            {/* Disclaimer */}
            <Card className="bg-gray-100">
              <CardContent className="pt-6">
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="font-semibold">Important Disclaimer:</p>
                  <p>
                    This report is compiled from Ghana DVLA records, Police Service database, insurance companies, 
                    and other verified sources. While we strive for accuracy, data may change after report generation. 
                    Always conduct a physical inspection before purchasing any vehicle.
                  </p>
                  <p>
                    FraudAuto is an approved data provider working with Ghana's official vehicle registration systems 
                    to help prevent fraud and protect consumers.
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
