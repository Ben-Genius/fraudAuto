import { useState } from "react";
import { AlertTriangle, Calendar, MapPin, FileText, Car } from "lucide-react";

interface AccidentRecord {
  id: string;
  date: string;
  severity: "Minor" | "Moderate" | "Severe";
  impact: string;
  location: string;
  source?: string;
  description: string;
  cost?: number;
  areas: string[];
}

const mockAccidents: AccidentRecord[] = [
  {
    id: "1",
    date: "2021-08-15",
    severity: "Moderate",
    impact: "Front Left",
    location: "N1 Highway, Kasoa Toll Booth",
    source: "SIC Insurance Ghana",
    description: "Multi-vehicle collision during morning rush hour traffic congestion",
    cost: 12500, // GHS
    areas: ["front-left", "hood"],
  },
  {
    id: "2",
    date: "2020-03-22",
    severity: "Minor",
    impact: "Rear Bumper",
    location: "Kejetia Market, Kumasi",
    description: "Backing collision in crowded market parking area",
    cost: 850,
    areas: ["rear"],
  },
];

export const AccidentHistory = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Severe": return "bg-red-100 text-red-800 border-red-200";
      case "Moderate": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Minor": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAreaColor = (area: string) => {
    const hasAccident = mockAccidents.some(acc => acc.areas.includes(area));
    if (selectedArea === area) return "#EF4444";
    return hasAccident ? "#F59E0B" : "#E5E7EB";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Accident & Damage History</h2>
        <p className="text-sm text-gray-600">Reported incidents from Police MTTD and insurance companies</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vehicle Diagram */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Damage Areas (Click to highlight)</h3>
          <div className="flex justify-center">
            <svg width="200" height="120" viewBox="0 0 200 120" className="border rounded">
              {/* Car Body */}
              <rect x="40" y="30" width="120" height="60" rx="8" fill={getAreaColor("body")} stroke="#374151" strokeWidth="1" />
              
              {/* Front */}
              <rect x="20" y="40" width="20" height="40" rx="4" fill={getAreaColor("front")} stroke="#374151" strokeWidth="1" 
                    onClick={() => setSelectedArea("front")} className="cursor-pointer" />
              <rect x="15" y="35" width="25" height="15" rx="4" fill={getAreaColor("front-left")} stroke="#374151" strokeWidth="1"
                    onClick={() => setSelectedArea("front-left")} className="cursor-pointer" />
              <rect x="15" y="70" width="25" height="15" rx="4" fill={getAreaColor("front-right")} stroke="#374151" strokeWidth="1"
                    onClick={() => setSelectedArea("front-right")} className="cursor-pointer" />
              
              {/* Hood */}
              <rect x="45" y="25" width="110" height="10" rx="2" fill={getAreaColor("hood")} stroke="#374151" strokeWidth="1"
                    onClick={() => setSelectedArea("hood")} className="cursor-pointer" />
              
              {/* Rear */}
              <rect x="160" y="40" width="20" height="40" rx="4" fill={getAreaColor("rear")} stroke="#374151" strokeWidth="1"
                    onClick={() => setSelectedArea("rear")} className="cursor-pointer" />
              
              {/* Sides */}
              <rect x="40" y="25" width="30" height="10" rx="2" fill={getAreaColor("left-side")} stroke="#374151" strokeWidth="1"
                    onClick={() => setSelectedArea("left-side")} className="cursor-pointer" />
              <rect x="130" y="25" width="30" height="10" rx="2" fill={getAreaColor("right-side")} stroke="#374151" strokeWidth="1"
                    onClick={() => setSelectedArea("right-side")} className="cursor-pointer" />
              
              {/* Roof */}
              <rect x="50" y="35" width="100" height="50" rx="4" fill={getAreaColor("roof")} stroke="#374151" strokeWidth="1"
                    onClick={() => setSelectedArea("roof")} className="cursor-pointer" />
            </svg>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center"><div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>Damaged</div>
              <div className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded mr-1"></div>Selected</div>
              <div className="flex items-center"><div className="w-3 h-3 bg-gray-300 rounded mr-1"></div>No Damage</div>
            </div>
          </div>
        </div>

        {/* Accident List */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Incident Records</h3>
          {mockAccidents.length > 0 ? (
            mockAccidents.map((accident) => (
              <div key={accident.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{new Date(accident.date).toLocaleDateString()}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(accident.severity)}`}>
                    {accident.severity}
                  </span>
                </div>
                
                <div className="space-y-1 text-sm">
                  <div className="flex items-center text-gray-600">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    <span className="font-medium">Impact:</span>
                    <span className="ml-1">{accident.impact}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="font-medium">Location:</span>
                    <span className="ml-1">{accident.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <FileText className="h-3 w-3 mr-1" />
                    <span className="font-medium">Source:</span>
                    <span className="ml-1">{accident.source}</span>
                  </div>
                  
                  <p className="text-gray-700 mt-2">{accident.description}</p>
                  
                  {accident.cost && (
                    <div className="text-right mt-2">
                      <span className="font-bold text-gray-900">GH₵{accident.cost.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              <Car className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No accident records found</p>
              <p className="text-xs text-gray-400">This vehicle has a clean accident history</p>
            </div>
          )}
        </div>
      </div>

      {/* FraudWall Ghana Insight */}
      <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">F</span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-orange-900">FraudWall Insight</h4>
            <p className="text-sm text-orange-800">
              Major highways like N1 and N6 have higher accident rates due to heavy commercial traffic. 
              Market areas in Kumasi and Accra often see minor collisions. Many rural accidents go unreported 
              due to limited police presence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
