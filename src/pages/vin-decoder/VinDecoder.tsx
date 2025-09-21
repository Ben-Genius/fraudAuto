"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, AlertTriangle, Car, Database, CheckCircle, XCircle, Clock, MapPin, Download, Share2, Eye } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { TypewriterEffectSmooth } from '../../components/ui/typewriter-effect';

const VinDecoder = () => {
  const [vin, setVin] = useState('');
  const [showSample, setShowSample] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vin.length === 17) {
      setShowSample(true);
    }
  };

  const titleWords = [
    { text: "Ghana", className: "text-secondary-orange" },
    { text: "VIN", className: "text-primary-red" },
    { text: "Decoder", className: "text-gray-900" },
    { text: "&", className: "text-gray-600" },
    { text: "Vehicle", className: "text-secondary-orange" },
    { text: "History", className: "text-primary-red" }
  ];

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
    checks: {
      safetyRecalls: { status: 'clean', message: 'No safety recalls found', icon: CheckCircle },
      stolenVehicle: { status: 'clean', message: 'No theft records in Ghana Police database', icon: CheckCircle },
      junkSalvage: { status: 'warning', message: '11 salvage records found', icon: AlertTriangle },
      odometer: { status: 'error', message: 'Odometer tampering detected', icon: XCircle },
      titleHistory: { status: 'warning', message: 'Multiple title brands found', icon: AlertTriangle }
    },
    damages: [
      { date: '2019-04-15', type: 'Hit Object', location: 'Accra, Ghana', severity: 'Major' },
      { date: '2016-01-03', type: 'Collision', location: 'Tema, Ghana', severity: 'Moderate' },
      { date: '2015-08-25', type: 'Accident', location: 'Kumasi, Ghana', severity: 'Minor' },
      { date: '2012-05-19', type: 'Crash', location: 'Takoradi, Ghana', severity: 'Major' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-red/5 via-transparent to-secondary-orange/5"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <TypewriterEffectSmooth 
              words={titleWords}
              className="justify-center mb-6"
              cursorClassName="bg-primary-red"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Get comprehensive vehicle history reports for cars in Ghana. Check for accidents, theft status, 
              ownership history, and DVLA registration data with our advanced VIN decoder.
            </motion.p>
          </motion.div>

          {/* VIN Input Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                  <div className="p-2 rounded-full bg-primary-red/10">
                    <Search className="h-6 w-6 text-primary-red" />
                  </div>
                  Enter 17-Character VIN Number
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      value={vin}
                      onChange={(e) => setVin(e.target.value.toUpperCase())}
                      placeholder="Enter VIN (e.g., SCBFR7ZA5CC072256)"
                      className="w-full px-6 py-4 text-xl font-mono border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-red focus:border-primary-red transition-all duration-300 bg-white/50"
                      maxLength={17}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <Badge variant={vin.length === 17 ? "default" : "secondary"} className="bg-primary-red">
                        {vin.length}/17
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-gray-500 space-y-1">
                    <p>Find VIN on dashboard, door frame, or registration documents</p>
                    <p className="text-xs">🔒 Secured by Ghana DVLA & Police Service databases</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-primary-red to-secondary-orange hover:from-primary-red/90 hover:to-secondary-orange/90 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={vin.length !== 17}
                    >
                      <Shield className="h-5 w-5 mr-2" />
                      Generate Report - GHS 25
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      className="px-8 py-4 text-lg rounded-xl border-2 hover:bg-gray-50"
                      onClick={() => {
                        setVin('SCBFR7ZA5CC072256');
                        setShowSample(true);
                      }}
                    >
                      <Eye className="h-5 w-5 mr-2" />
                      View Sample
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Sample Report */}
      {showSample && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 pb-20"
        >
          {/* Report Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <Card className="overflow-hidden border-0 shadow-2xl">
              <div className="bg-gradient-to-r from-primary-red via-secondary-orange to-primary-red p-8 text-white relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                  <div>
                    <Badge className="bg-white/20 text-white mb-4 px-4 py-1">
                      🇬🇭 GHANA DVLA VERIFIED
                    </Badge>
                    <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                      FRAUDAUTO VEHICLE HISTORY REPORT
                    </h1>
                    <p className="text-xl lg:text-2xl opacity-90 mb-2">
                      {sampleData.vehicle.year} {sampleData.vehicle.make} {sampleData.vehicle.model}
                    </p>
                    <p className="font-mono text-lg opacity-80">VIN: {sampleData.vin}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-sm opacity-80 mb-1">Generated</p>
                      <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                      <p className="text-xs opacity-70 mt-2">Report ID: #FR{Date.now().toString().slice(-6)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Summary Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12"
          >
            {[
              { label: 'Total Events', value: sampleData.summary.totalEvents, color: 'text-primary-red', bg: 'bg-red-50' },
              { label: 'Safety Recalls', value: sampleData.summary.safetyRecalls, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Accidents', value: sampleData.summary.accidents, color: 'text-red-600', bg: 'bg-red-50' },
              { label: 'Last Mileage', value: sampleData.summary.lastMileage.toLocaleString(), color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Sales History', value: sampleData.summary.salesHistory, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Owners', value: sampleData.summary.owners, color: 'text-orange-600', bg: 'bg-orange-50' },
              { label: 'Insurance Records', value: sampleData.summary.junkSalvage, color: 'text-yellow-600', bg: 'bg-yellow-50' }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className={`text-center hover:shadow-lg transition-all duration-300 ${item.bg} border-0`}>
                  <CardContent className="pt-6 pb-4">
                    <div className={`text-3xl font-bold ${item.color} mb-2`}>{item.value}</div>
                    <div className="text-sm font-medium text-gray-700">{item.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Vehicle Specifications */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <CardTitle className="flex items-center gap-3">
                      <Car className="h-6 w-6 text-primary-red" />
                      Vehicle Specifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {Object.entries(sampleData.vehicle).map(([key, value]) => (
                        <div key={key} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="font-bold text-lg text-gray-900 mb-1">{value}</div>
                          <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Safety Checks */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <CardTitle className="flex items-center gap-3">
                      <Shield className="h-6 w-6 text-primary-red" />
                      Safety & Security Checks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {Object.entries(sampleData.checks).map(([key, check]) => {
                        const IconComponent = check.icon;
                        return (
                          <motion.div
                            key={key}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-300"
                          >
                            <div className="flex items-center gap-4">
                              <div className={`p-2 rounded-full ${
                                check.status === 'clean' ? 'bg-green-100' :
                                check.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                              }`}>
                                <IconComponent className={`h-5 w-5 ${
                                  check.status === 'clean' ? 'text-green-600' :
                                  check.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                                }`} />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1')}
                                </div>
                                <div className="text-sm text-gray-600">{check.message}</div>
                              </div>
                            </div>
                            <Badge className={
                              check.status === 'clean' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                              check.status === 'warning' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                              'bg-red-100 text-red-800 hover:bg-red-200'
                            }>
                              {check.status === 'clean' ? 'CLEAR' : 
                               check.status === 'warning' ? 'WARNING' : 'ALERT'}
                            </Badge>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Damage History */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                    <CardTitle className="flex items-center gap-3">
                      <AlertTriangle className="h-6 w-6 text-primary-red" />
                      Damage History
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {sampleData.damages.map((damage, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.4 + index * 0.1 }}
                          className="p-4 rounded-lg border-l-4 border-red-400 bg-red-50 hover:bg-red-100 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                            <div className="flex-1">
                              <div className="font-semibold text-red-900">{damage.type}</div>
                              <div className="text-sm text-red-700 space-y-1 mt-1">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3 w-3" />
                                  {damage.date}
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-3 w-3" />
                                  {damage.location}
                                </div>
                              </div>
                              <Badge className={`mt-2 ${
                                damage.severity === 'Major' ? 'bg-red-200 text-red-800' :
                                damage.severity === 'Moderate' ? 'bg-yellow-200 text-yellow-800' :
                                'bg-green-200 text-green-800'
                              }`}>
                                {damage.severity}
                              </Badge>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Market Price */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardTitle className="flex items-center gap-3">
                      <Database className="h-6 w-6 text-primary-red" />
                      Market Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {[
                        { type: 'Classified Ads', price: 'GHS 174,528', status: 'Below Market', color: 'blue' },
                        { type: 'Auction Sales', price: 'GHS 216,200', status: 'Average Market', color: 'green' },
                        { type: 'Dealer Price', price: 'GHS 257,868', status: 'Above Market', color: 'purple' }
                      ].map((item) => (
                        <motion.div
                          key={item.type}
                          whileHover={{ scale: 1.02 }}
                          className="p-4 rounded-lg border-2 border-gray-100 hover:border-gray-200 transition-all duration-300"
                        >
                          <div className="text-center">
                            <div className={`text-2xl font-bold text-${item.color}-600 mb-1`}>{item.price}</div>
                            <div className="text-sm text-gray-600 mb-2">{item.type}</div>
                            <Badge className={`bg-${item.color}-100 text-${item.color}-800`}>
                              {item.status}
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-12"
          >
            <Button className="bg-gradient-to-r from-primary-red to-secondary-orange hover:from-primary-red/90 hover:to-secondary-orange/90 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Download className="h-5 w-5 mr-2" />
              Download Full Report
            </Button>
            <Button variant="outline" className="px-8 py-4 text-lg rounded-xl border-2 hover:bg-gray-50">
              <Share2 className="h-5 w-5 mr-2" />
              Share Report
            </Button>
            <Button variant="outline" className="px-8 py-4 text-lg rounded-xl border-2 hover:bg-gray-50">
              <Search className="h-5 w-5 mr-2" />
              New Search
            </Button>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-0">
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-primary-red mb-4">
                    <Shield className="h-5 w-5" />
                    <span className="font-semibold">FraudAuto Guarantee</span>
                  </div>
                  <p className="text-sm text-gray-600 max-w-4xl mx-auto leading-relaxed">
                    This report is compiled from Ghana DVLA records, Police Service database, insurance companies, 
                    and other verified sources. While we strive for accuracy, data may change after report generation. 
                    Always conduct a physical inspection before purchasing any vehicle.
                  </p>
                  <p className="text-xs text-gray-500">
                    🔒 FraudAuto is an approved data provider working with Ghana's official vehicle registration systems
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default VinDecoder;
