"use client";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Shield,
  AlertTriangle,
  Car,
  CheckCircle,
  XCircle,
  Download,
  Share2,
  TrendingDown,
  DollarSign,
  User,
  FileText,
  BarChart3,
  MoveRight,
} from "lucide-react";
import { Button } from "../../components/ui/button";

const VinDecoder = () => {
  const [vin, setVin] = useState("");
  const [showSample, setShowSample] = useState(false);
  const [titleNumber, setTitleNumber] = useState(0);
  const [ownershipViewMode, setOwnershipViewMode] = useState<'table' | 'grid'>('table');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const titles = useMemo(
    () => ["secure", "reliable", "instant", "comprehensive", "trusted"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  useEffect(() => {
    const vinParam = searchParams.get("vin");
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
    vin: "SCBFR7ZA5CC072256",
    vehicle: {
      year: 2012,
      make: "BENTLEY",
      model: "Continental GT",
      engine: "6.0L W12 Twin Turbo",
      madeIn: "UNITED KINGDOM",
      fuelType: "Premium Gasoline",
      transmission: "Automatic",
      bodyStyle: "Coupe",
      driveLine: "AWD",
      trim: "GT",
    },
    summary: {
      totalEvents: 66,
      safetyRecalls: 0,
      accidents: 15,
      lastMileage: 18796,
      salesHistory: 5,
      owners: 4,
      junkSalvage: 11,
    },
    ownership: [
      {
        owner: 1,
        type: "Personal",
        country: "Ghana",
        estMiYear: 2258,
        lastOdometer: 7338,
        purchased: 2012,
        usage: "3 yrs 3 mo",
      },
      {
        owner: 2,
        type: "Personal",
        country: "Ghana",
        estMiYear: 92,
        lastOdometer: 15044,
        purchased: 2016,
        usage: "3 yrs 1 mo",
      },
      {
        owner: 3,
        type: "Personal",
        country: "Ghana",
        estMiYear: 0,
        lastOdometer: 1,
        purchased: 2019,
        usage: "0 yrs 3 mo",
      },
      {
        owner: 4,
        type: "Commercial",
        country: "Ghana",
        estMiYear: 3090,
        lastOdometer: 18796,
        purchased: 2019,
        usage: "6 yrs 1 mo",
      },
    ],
    checks: {
      safetyRecalls: {
        status: "clean",
        message: "No safety recalls found",
        count: 0,
      },
      stolenVehicle: {
        status: "clean",
        message: "No theft records in Ghana Police database",
        count: 0,
      },
      junkSalvage: {
        status: "warning",
        message: "11 salvage records found",
        count: 11,
      },
      odometer: {
        status: "error",
        message: "Odometer tampering detected - Not Actual",
        count: 1,
      },
      titleHistory: {
        status: "warning",
        message: "Multiple title brands found",
        count: 7,
      },
      majorTitleBrands: {
        status: "warning",
        message: "Salvage & Rebuilt brands found",
        count: 2,
      },
      otherTitleBrands: {
        status: "error",
        message: "Crushed brand found",
        count: 1,
      },
    },
    historyEvents: [
      {
        date: "2025-07-02",
        mileage: 18796,
        provider: "Copart Auction",
        event: "Salvage Certificate Sale - USD 45,200",
        location: "Accra, Ghana",
      },
      {
        date: "2025-06-19",
        mileage: 18796,
        provider: "DVLA Ghana",
        event: "Crushed Brand Title",
        location: "Tema, Ghana",
      },
      {
        date: "2019-08-28",
        mileage: 18796,
        provider: "Auction House",
        event: "Auction Sale - USD 134,000",
        location: "Kumasi, Ghana",
      },
      {
        date: "2019-04-15",
        mileage: 15044,
        provider: "Police Report",
        event: "Hit Object - Major Damage",
        location: "Takoradi, Ghana",
      },
      {
        date: "2016-01-03",
        mileage: 14759,
        provider: "Insurance Claim",
        event: "Collision Damage",
        location: "Cape Coast, Ghana",
      },
      {
        date: "2015-08-27",
        mileage: 7096,
        provider: "Dealer Sale",
        event: "Classified Sale - USD 423,996",
        location: "Accra, Ghana",
      },
      {
        date: "2013-05-07",
        mileage: 3084,
        provider: "Auction House",
        event: "Auction Sale - USD 769,980",
        location: "Tema, Ghana",
      },
      {
        date: "2012-05-19",
        mileage: 2224,
        provider: "Police Report",
        event: "Accident Report Filed",
        location: "Accra, Ghana",
      },
    ],
    salesHistory: [
      {
        date: "2025-07-02",
        location: "Accra Auction",
        price: "USD 45,200",
        mileage: 18796,
        condition: "Salvage Certificate",
        damage: "Front End",
        photos: 12,
      },
      {
        date: "2019-08-28",
        location: "Kumasi Auction",
        price: "USD 134,000",
        mileage: 18796,
        condition: "Run & Drive",
        damage: "Front End, Minor Scratches",
        photos: 10,
      },
      {
        date: "2015-08-27",
        location: "Accra Classified",
        price: "USD 423,996",
        mileage: 7096,
        condition: "Good",
        damage: "None Listed",
        photos: 8,
      },
      {
        date: "2013-05-07",
        location: "Tema Auction",
        price: "USD 769,980",
        mileage: 3084,
        condition: "Run & Drive Verified",
        damage: "Partial/Incomplete Repair",
        photos: 10,
      },
      {
        date: "2013-01-31",
        location: "Accra Auction",
        price: "USD 197,780",
        mileage: 0,
        condition: "Damaged",
        damage: "Front End",
        photos: 10,
      },
    ],
    ownershipCost: {
      depreciation: [17325, 15992, 14659, 13326, 11993],
      insurance: [7624, 7892, 8168, 8452, 8748],
      fuel: [10064, 10368, 10728, 11160, 11660],
      maintenance: [11052, 11648, 7156, 10068, 9164],
      repair: [6604, 5160, 5892, 6360, 7264],
      taxesFees: [12852, 1464, 1864, 1196, 1660],
      total: 267576,
    },
  };

  return (
    <div className="min-h-screen bg-white ">
      <div className="max-w-7xl mx-auto px-6 ">
        {/* Animated Hero Header */}
        <div className="flex gap-8 py-20 lg:pt-32 items-center justify-center flex-col">
          <div>
            <Button
              variant="outline"
              size="sm"
              className="gap-4 border-theme-orange-1/20 text-theme-red-orange hover:bg-theme-orange-1/5"
            >
              🇬🇭 Official Ghana DVLA Integration{" "}
              <MoveRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="w-full">
            <h1 className="text-5xl  max-w-5xl  md:text-7xl mx-auto tracking-tighter  pb-4">
              <span className="text-gray-900">
                Vehicle verification that's{" "}
              </span>
              <span className="relative w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 text-[#FC612D]">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-theme-red-orange"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-xl text-center md:text-2xl leading-relaxed tracking-tight text-gray-600 max-w-3xl  mx-auto font-light">
              Comprehensive VIN decoding and vehicle history reports powered by
              Ghana DVLA, Police Service, and insurance databases. Protect your
              investment with real-time verification.
            </p>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-500 ">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary-orange rounded-full"></div>
              <span>Real-time verification</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary-golden-yellow rounded-full"></div>
              <span>Official database access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary-dark-red rounded-full"></div>
              <span>Instant results</span>
            </div>
          </div>
        </div>

        {/* VIN Input */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-300">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter 17-character VIN..."
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  className="outline-0 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-orange focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <Button
                variant={"secondary"}
                type="submit"
                size="lg"
                className="px-6"
                disabled={vin.length !== 17}
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </form>

            <p className="text-sm text-gray-500 mt-3 text-center">
              Decode vehicle specifications and check theft status
            </p>
          </div>
        </div>

        {/* Sample Report */}
        {showSample && (
          <div className="space-y-12 pt-16">
            {/* Report Header */}
            <div className="bg-gradient-to-br from-primary-red to-red-700 rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-4">
                    🇬🇭 DVLA VERIFIED
                  </div>
                  <h2 className="text-3xl font-light mb-3 tracking-tight">
                    Vehicle History Report
                  </h2>
                  <p className="text-xl opacity-90 font-light">
                    {sampleData.vehicle.year} {sampleData.vehicle.make}{" "}
                    {sampleData.vehicle.model}
                  </p>
                  <p className="font-mono text-sm opacity-80 mt-2">
                    VIN: {sampleData.vin}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-80">
                    Generated: {new Date().toLocaleDateString()}
                  </p>
                  <p className="text-xs opacity-70">
                    Report #FR{Date.now().toString().slice(-6)}
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {[
                {
                  label: "Total Events",
                  value: sampleData.summary.totalEvents,
                  color: "text-blue-600",
                },
                {
                  label: "Safety Recalls",
                  value: sampleData.summary.safetyRecalls,
                  color: "text-green-600",
                },
                {
                  label: "Accidents",
                  value: sampleData.summary.accidents,
                  color: "text-red-600",
                },
                {
                  label: "Last Mileage",
                  value: sampleData.summary.lastMileage.toLocaleString(),
                  color: "text-purple-600",
                },
                {
                  label: "Sales History",
                  value: sampleData.summary.salesHistory,
                  color: "text-orange-600",
                },
                {
                  label: "Owners",
                  value: sampleData.summary.owners,
                  color: "text-indigo-600",
                },
                {
                  label: "Insurance Records",
                  value: sampleData.summary.junkSalvage,
                  color: "text-yellow-600",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className={`text-3xl font-light ${item.color} mb-2`}>
                    {item.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Left Column - Vehicle Info */}
              <div className="lg:col-span-2 space-y-12">
                {/* Vehicle Specifications */}
                <div className="bg-white rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Car className="h-5 w-5 text-primary-red" />
                    <h3 className="text-xl font-medium text-gray-900">
                      Vehicle Specifications
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(sampleData.vehicle).map(([key, value]) => (
                      <div key={key} className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
                        <span className="text-gray-600 capitalize mr-2">
                          {key.replace(/([A-Z])/g, " $1")}:
                        </span>
                        <span className="font-medium text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ownership History */}
                <div className="bg-white rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-primary-red" />
                      <h3 className="text-xl font-medium text-gray-900">
                        Ownership History
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setOwnershipViewMode('table')}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          ownershipViewMode === 'table' 
                            ? 'bg-white text-primary-red shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Table
                      </button>
                      <button
                        onClick={() => setOwnershipViewMode('grid')}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          ownershipViewMode === 'grid' 
                            ? 'bg-white text-primary-red shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Grid
                      </button>
                    </div>
                  </div>
                  
                  {ownershipViewMode === 'table' ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-2 font-medium text-gray-900">Owner</th>
                            <th className="text-left py-3 px-2 font-medium text-gray-900">Type</th>
                            <th className="text-left py-3 px-2 font-medium text-gray-900">Country</th>
                            <th className="text-left py-3 px-2 font-medium text-gray-900">Est. Mi/Year</th>
                            <th className="text-left py-3 px-2 font-medium text-gray-900">Purchased</th>
                            <th className="text-left py-3 px-2 font-medium text-gray-900">Usage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sampleData.ownership.map((owner) => (
                            <tr key={owner.owner} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-3 px-2 font-medium text-gray-900">
                                {owner.owner}{owner.owner === 1 ? "st" : owner.owner === 2 ? "nd" : owner.owner === 3 ? "rd" : "th"}
                              </td>
                              <td className="py-3 px-2 text-gray-600">
                                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{owner.type}</span>
                              </td>
                              <td className="py-3 px-2 text-gray-600">🇬🇭 {owner.country}</td>
                              <td className="py-3 px-2 text-gray-600">{owner.estMiYear.toLocaleString()}</td>
                              <td className="py-3 px-2 text-gray-600">{owner.purchased}</td>
                              <td className="py-3 px-2 text-gray-600">{owner.usage}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sampleData.ownership.map((owner) => (
                        <div key={owner.owner} className="bg-gray-50 rounded-2xl p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <User className="h-4 w-4 text-gray-600" />
                            <span className="font-medium text-gray-900">
                              {owner.owner}{owner.owner === 1 ? "st" : owner.owner === 2 ? "nd" : owner.owner === 3 ? "rd" : "th"} Owner
                            </span>
                            <span className="px-2 py-1 bg-white rounded text-xs text-gray-700">{owner.type}</span>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div>Country: 🇬🇭 {owner.country}</div>
                            <div>Est. Mi/Year: {owner.estMiYear.toLocaleString()}</div>
                            <div>Purchased: {owner.purchased}</div>
                            <div>Usage: {owner.usage}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* All History Events */}
                <div className="bg-white rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <FileText className="h-5 w-5 text-primary-red" />
                    <h3 className="text-xl font-medium text-gray-900">
                      All History Events ({sampleData.summary.totalEvents} records)
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-2 font-medium text-gray-900">Date</th>
                          <th className="text-left py-3 px-2 font-medium text-gray-900">Event</th>
                          <th className="text-left py-3 px-2 font-medium text-gray-900">Provider</th>
                          <th className="text-left py-3 px-2 font-medium text-gray-900">Location</th>
                          <th className="text-left py-3 px-2 font-medium text-gray-900">Mileage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sampleData.historyEvents.map((event, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-2 text-gray-600 font-mono text-xs">{event.date}</td>
                            <td className="py-3 px-2 font-medium text-gray-900">{event.event}</td>
                            <td className="py-3 px-2 text-gray-600">{event.provider}</td>
                            <td className="py-3 px-2 text-gray-600">{event.location}</td>
                            <td className="py-3 px-2 text-gray-600">{event.mileage.toLocaleString()} mi</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Sales History */}
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-8">
                    <DollarSign className="h-6 w-6 text-primary-red" />
                    <h3 className="text-2xl font-light text-gray-900">
                      Sales History ({sampleData.summary.salesHistory} sales)
                    </h3>
                  </div>
                  <div className="space-y-6">
                    {sampleData.salesHistory.map((sale, index) => (
                      <div key={index} className="bg-gray-50 rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="font-medium text-2xl text-green-600">
                              {sale.price}
                            </div>
                            <div className="text-sm text-gray-600">
                              {sale.date} • {sale.location}
                            </div>
                          </div>
                          <div className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">
                            {sale.photos} photos
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Mileage:</span>
                            <span className="ml-2 font-medium">
                              {sale.mileage.toLocaleString()} mi
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Condition:</span>
                            <span className="ml-2 font-medium">
                              {sale.condition}
                            </span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-600">Damage:</span>
                            <span className="ml-2 font-medium text-red-600">
                              {sale.damage}
                            </span>
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
                    <h3 className="text-2xl font-light text-gray-900">
                      Safety & Security Checks
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {Object.entries(sampleData.checks).map(([key, check]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl"
                      >
                        <div className="flex items-center gap-4">
                          {check.status === "clean" && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                          {check.status === "warning" && (
                            <AlertTriangle className="h-5 w-5 text-yellow-600" />
                          )}
                          {check.status === "error" && (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                          <div>
                            <div className="font-medium text-sm capitalize">
                              {key.replace(/([A-Z])/g, " $1")}
                            </div>
                            <div className="text-xs text-gray-600">
                              {check.message}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {check.count}
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              check.status === "clean"
                                ? "bg-green-100 text-green-800"
                                : check.status === "warning"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {check.status === "clean"
                              ? "CLEAR"
                              : check.status === "warning"
                              ? "WARNING"
                              : "ALERT"}
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
                    <h3 className="text-2xl font-light text-gray-900">
                      Market Price Analysis
                    </h3>
                  </div>
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-blue-50 rounded-2xl">
                      <div className="text-3xl font-light text-blue-600 mb-2">
                        USD 174,528
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        Classified Ads
                      </div>
                      <div className="inline-flex px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        Below Market
                      </div>
                    </div>
                    <div className="text-center p-6 bg-green-50 rounded-2xl">
                      <div className="text-3xl font-light text-green-600 mb-2">
                        USD 216,200
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        Auction Sales
                      </div>
                      <div className="inline-flex px-4 py-2 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Average Market
                      </div>
                    </div>
                    <div className="text-center p-6 bg-purple-50 rounded-2xl">
                      <div className="text-3xl font-light text-purple-600 mb-2">
                        USD 257,868
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        Dealer Price
                      </div>
                      <div className="inline-flex px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        Above Market
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ownership Cost */}
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-8">
                    <TrendingDown className="h-6 w-6 text-primary-red" />
                    <h3 className="text-2xl font-light text-gray-900">
                      5-Year Ownership Cost
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        category: "Depreciation",
                        total: sampleData.ownershipCost.depreciation.reduce(
                          (a, b) => a + b,
                          0
                        ),
                      },
                      {
                        category: "Insurance",
                        total: sampleData.ownershipCost.insurance.reduce(
                          (a, b) => a + b,
                          0
                        ),
                      },
                      {
                        category: "Fuel",
                        total: sampleData.ownershipCost.fuel.reduce(
                          (a, b) => a + b,
                          0
                        ),
                      },
                      {
                        category: "Maintenance",
                        total: sampleData.ownershipCost.maintenance.reduce(
                          (a, b) => a + b,
                          0
                        ),
                      },
                      {
                        category: "Repair",
                        total: sampleData.ownershipCost.repair.reduce(
                          (a, b) => a + b,
                          0
                        ),
                      },
                      {
                        category: "Taxes & Fees",
                        total: sampleData.ownershipCost.taxesFees.reduce(
                          (a, b) => a + b,
                          0
                        ),
                      },
                    ].map((cost) => (
                      <div
                        key={cost.category}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-xl"
                      >
                        <span className="text-sm font-medium">
                          {cost.category}
                        </span>
                        <span className="font-medium">
                          USD {cost.total.toLocaleString()}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center p-4 bg-primary-red/10 rounded-xl font-medium">
                      <span>Total 5-Year Cost</span>
                      <span className="text-primary-red text-lg">
                        USD {sampleData.ownershipCost.total.toLocaleString()}
                      </span>
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
                <p className="font-medium text-gray-900 text-lg">
                  Important Disclaimer
                </p>
                <p className="leading-relaxed">
                  This report is compiled from Ghana DVLA records, Police
                  Service database, insurance companies, and verified sources.
                  Data accuracy depends on reporting entities. Always conduct
                  physical inspection before purchase.
                </p>
                <p className="text-xs text-gray-500">
                  🔒 FraudWall-Auto is an approved data provider working with
                  Ghana's official systems.
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
