import { useState } from "react";
import {
  Wrench,
  Car,
  AlertTriangle,
  CheckCircle,
  Search,
  Calendar,
  Shield,
  Info,
  User,
  Building,
  Clock,
  FileText,
  X,
  MapPin,
} from "lucide-react";

interface MaintenanceRecord {
  id: string;
  date: string;
  mileage: number;
  serviceType: string;
  provider: string;
  location: string;
  technician: string;
  workPerformed: string[];
  partsUsed: string[];
  laborHours: number;
  cost: number;
  warranty: string;
  nextService: string;
  source: "dealer" | "service_partner" | "user_submitted";
  verified: boolean;
  invoiceNumber: string;
  notes: string;
}

const mockRecords: MaintenanceRecord[] = [
  {
    id: "1",
    date: "2024-03-15",
    mileage: 85420,
    serviceType: "Routine Maintenance",
    provider: "Kantanka Auto Service Center",
    location: "Accra, Greater Accra",
    technician: "Kwame Asante (NVTI Certified)",
    workPerformed: [
      "Engine Oil Change",
      "Oil Filter Replacement",
      "Air Filter Replacement",
      "Brake Fluid Check",
      "Battery Test",
    ],
    partsUsed: [
      "Mobil 1 5W-30 (5L)",
      "OEM Oil Filter",
      "Air Filter",
      "Brake Fluid (500ml)",
    ],
    laborHours: 1.5,
    cost: 450.0,
    warranty: "6 months / 10,000 km",
    nextService: "September 2024 or 95,000 km",
    source: "service_partner",
    verified: true,
    invoiceNumber: "KAN-2024-0315",
    notes:
      "Customer reported slight brake noise - inspected, within normal range",
  },
  {
    id: "2",
    date: "2023-12-10",
    mileage: 83200,
    serviceType: "Oil Change",
    provider: "Shell Service Station",
    location: "Tema, Greater Accra",
    technician: "Emmanuel Osei",
    workPerformed: [
      "Engine Oil Change",
      "Oil Filter Replacement",
      "Windscreen Cleaning",
      "Tire Pressure Check",
    ],
    partsUsed: ["Shell Helix 10W-40 (4L)", "Oil Filter", "Windscreen Cleaner"],
    laborHours: 0.5,
    cost: 180.0,
    warranty: "3 months / 5,000 km",
    nextService: "March 2024 or 88,000 km",
    source: "service_partner",
    verified: true,
    invoiceNumber: "SHL-2023-1210",
    notes: "Quick service - no issues found",
  },
  {
    id: "3",
    date: "2023-11-22",
    mileage: 82150,
    serviceType: "Brake Service",
    provider: "Bridgestone Service Centre",
    location: "Kumasi, Ashanti Region",
    technician: "Akosua Mensah",
    workPerformed: [
      "Brake Fluid Flush",
      "Brake Pad Inspection",
      "Brake System Check",
      "Wheel Alignment",
    ],
    partsUsed: ["DOT 4 Brake Fluid (1L)", "Brake Cleaner", "Wheel Weights"],
    laborHours: 2.0,
    cost: 320.0,
    warranty: "12 months / 15,000 km",
    nextService: "November 2024 or 97,000 km",
    source: "service_partner",
    verified: true,
    invoiceNumber: "BSC-2023-1122",
    notes: "Brake fluid was dark - flushed and replaced",
  },
  {
    id: "4",
    date: "2023-09-05",
    mileage: 80800,
    serviceType: "Engine Service",
    provider: "Toyota Ghana Service Center",
    location: "Tema, Greater Accra",
    technician: "Joseph Osei (Toyota Master Tech)",
    workPerformed: [
      "Engine Oil Change",
      "Fuel Filter Replacement",
      "Air Cleaner Service",
      "Coolant Top-up",
      "Battery Check",
    ],
    partsUsed: [
      "Toyota Genuine Oil 5W-30 (4L)",
      "Fuel Filter",
      "Engine Coolant (2L)",
      "Air Filter Element",
    ],
    laborHours: 2.5,
    cost: 580.0,
    warranty: "12 months / 20,000 km",
    nextService: "March 2024 or 100,000 km",
    source: "dealer",
    verified: true,
    invoiceNumber: "TGH-2023-0905",
    notes: "Fuel filter was clogged - replaced as preventive maintenance",
  },
  {
    id: "5",
    date: "2023-07-18",
    mileage: 79200,
    serviceType: "Transmission Service",
    provider: "Accra Auto Repairs",
    location: "Accra, Greater Accra",
    technician: "Samuel Adjei",
    workPerformed: [
      "Gear Oil Change",
      "Transmission Filter Check",
      "Clutch Adjustment",
      "Gear Linkage Lubrication",
    ],
    partsUsed: ["ATF Gear Oil (3L)", "Transmission Filter", "Clutch Fluid"],
    laborHours: 3.0,
    cost: 420.0,
    warranty: "6 months / 10,000 km",
    nextService: "January 2024 or 95,000 km",
    source: "service_partner",
    verified: true,
    invoiceNumber: "AAR-2023-0718",
    notes: "Gear shifting was rough - adjusted clutch and changed oil",
  },
  {
    id: "6",
    date: "2023-05-12",
    mileage: 77800,
    serviceType: "Battery & Electrical",
    provider: "Electroland Ghana",
    location: "Accra, Greater Accra",
    technician: "Francis Boateng",
    workPerformed: [
      "Battery Replacement",
      "Alternator Check",
      "Starter Motor Test",
      "Electrical System Diagnosis",
    ],
    partsUsed: [
      "ACDelco Battery 70Ah",
      "Battery Terminals",
      "Electrical Cleaner",
    ],
    laborHours: 1.5,
    cost: 380.0,
    warranty: "24 months / unlimited km",
    nextService: "As needed",
    source: "service_partner",
    verified: true,
    invoiceNumber: "ELG-2023-0512",
    notes: "Old battery failed load test - replaced with new ACDelco unit",
  },
  {
    id: "7",
    date: "2023-03-08",
    mileage: 76200,
    serviceType: "Cooling System",
    provider: "Radiator Specialist Kumasi",
    location: "Kumasi, Ashanti Region",
    technician: "Yaw Mensah",
    workPerformed: [
      "Coolant Flush",
      "Radiator Cleaning",
      "Thermostat Check",
      "Water Pump Inspection",
    ],
    partsUsed: ["Engine Coolant (4L)", "Radiator Flush", "Thermostat Gasket"],
    laborHours: 2.0,
    cost: 280.0,
    warranty: "6 months / 8,000 km",
    nextService: "September 2023 or 84,000 km",
    source: "service_partner",
    verified: true,
    invoiceNumber: "RSK-2023-0308",
    notes: "Coolant was rusty - flushed system and refilled with fresh coolant",
  },
  {
    id: "8",
    date: "2023-01-20",
    mileage: 74500,
    serviceType: "Filter Service",
    provider: "Quick Lube Accra",
    location: "Accra, Greater Accra",
    technician: "Daniel Asiedu",
    workPerformed: [
      "Air Filter Replacement",
      "Fuel Filter Change",
      "Cabin Filter Replacement",
      "PCV Valve Check",
    ],
    partsUsed: [
      "Engine Air Filter",
      "Fuel Filter",
      "Cabin Air Filter",
      "PCV Valve",
    ],
    laborHours: 1.0,
    cost: 220.0,
    warranty: "3 months / 5,000 km",
    nextService: "July 2023 or 80,000 km",
    source: "service_partner",
    verified: true,
    invoiceNumber: "QLA-2023-0120",
    notes: "All filters were due for replacement - preventive maintenance",
  },
];

export const MaintenanceTimeline = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date_newest");
  const [selectedRecord, setSelectedRecord] =
    useState<MaintenanceRecord | null>(null);

  const openModal = (record: MaintenanceRecord) => {
    setSelectedRecord(record);
  };

  const closeModal = () => {
    setSelectedRecord(null);
  };

  const getServiceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "oil change":
      case "routine maintenance":
        return <Wrench className="h-4 w-4" />;
      case "tire service":
        return <Car className="h-4 w-4" />;
      case "critical repair":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Wrench className="h-4 w-4" />;
    }
  };

  const getSourceBadge = (record: MaintenanceRecord) => {
    if (record.verified && record.source === "dealer") {
      return (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          DVLA Verified
        </span>
      );
    }
    if (record.verified && record.source === "service_partner") {
      return (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
          <Shield className="h-3 w-3 mr-1" />
          Certified Shop
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
        <Info className="h-3 w-3 mr-1" />
        Owner Record
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Service History
        </h2>
        <p className="text-sm text-gray-600">
          Complete maintenance records from certified service centers
        </p>
      </div>



      {/* Compact Filters */}
      <div className="flex gap-2 mb-4 text-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search records..."
            className="w-full pl-7 pr-2 py-1.5 border border-gray-300 rounded text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-2 py-1.5 border border-gray-300 rounded text-sm"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="all">All Services</option>
          <option value="critical">Critical</option>
          <option value="routine">Routine</option>
        </select>
        <select
          className="px-2 py-1.5 border border-gray-300 rounded text-sm"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date_newest">Newest First</option>
          <option value="date_oldest">Oldest First</option>
        </select>
      </div>

      {/* Service Records Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-2 px-3 font-medium text-gray-700">
                Date
              </th>
              <th className="text-left py-2 px-3 font-medium text-gray-700">
                Kilometers
              </th>
              <th className="text-left py-2 px-3 font-medium text-gray-700">
                Service Type
              </th>
              <th className="text-left py-2 px-3 font-medium text-gray-700">
                Provider
              </th>
              <th className="text-left py-2 px-3 font-medium text-gray-700">
                Cost
              </th>
              <th className="text-left py-2 px-3 font-medium text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {mockRecords.map((record) => (
              <tr
                key={record.id}
                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                onClick={() => openModal(record)}
              >
                <td className="py-2 px-3 flex items-center">
                  <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-3 font-medium">
                  {record.mileage.toLocaleString()}
                </td>
                <td className="py-2 px-3">
                  <div className="flex items-center">
                    <div className="p-1 bg-blue-100 rounded text-blue-600 mr-2">
                      {getServiceIcon(record.serviceType)}
                    </div>
                    {record.serviceType}
                  </div>
                </td>
                <td className="py-2 px-3 text-gray-600">{record.provider}</td>
                <td className="py-2 px-3 font-medium">
                  GH₵{record.cost.toFixed(2)}
                </td>
                <td className="py-2 px-3">{getSourceBadge(record)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
          Load More Records (12 remaining)
        </button>
      </div>

      {/* Modal */}
      {selectedRecord && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded text-blue-600">
                  {getServiceIcon(selectedRecord.serviceType)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedRecord.serviceType}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {new Date(selectedRecord.date).toLocaleDateString()} •{" "}
                    {selectedRecord.mileage.toLocaleString()} km
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Service Details
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">Provider:</span>
                      <span className="ml-2">{selectedRecord.provider}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">Location:</span>
                      <span className="ml-2">{selectedRecord.location}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">Technician:</span>
                      <span className="ml-2">{selectedRecord.technician}</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">Invoice:</span>
                      <span className="ml-2">
                        {selectedRecord.invoiceNumber}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">Labor Hours:</span>
                      <span className="ml-2">{selectedRecord.laborHours}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Work Performed
                  </h4>
                  <div className="space-y-2 text-sm">
                    {selectedRecord.workPerformed.map((work, i) => (
                      <div key={i} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                        <span>{work}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Parts Used
                  </h4>
                  <div className="space-y-2 text-sm">
                    {selectedRecord.partsUsed.map((part, i) => (
                      <div key={i} className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                        <span>{part}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Additional Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Warranty:</span>
                      <span className="ml-2">{selectedRecord.warranty}</span>
                    </div>
                    <div>
                      <span className="font-medium">Next Service:</span>
                      <span className="ml-2">{selectedRecord.nextService}</span>
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <span className="ml-2">
                        {getSourceBadge(selectedRecord)}
                      </span>
                    </div>
                    {selectedRecord.notes && (
                      <div>
                        <span className="font-medium">
                          Notes:{" "}
                          <span className="mt-1 text-gray-600 italic">
                            {selectedRecord.notes}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
