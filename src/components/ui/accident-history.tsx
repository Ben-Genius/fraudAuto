import { useState } from "react";
import { AlertTriangle, Calendar, Car, X } from "lucide-react";
import { IMAGES } from "../../assets/images";

interface AccidentRecord {
  id: string;
  date: string;
  severity: "Minor" | "Moderate" | "Severe";
  impact: string;
  location: string;
  source: string;
  description: string;
  cost?: number;
  areas: string[];
  images: string[];
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
    cost: 12500,
    areas: ["front-left", "hood"],
    images: [IMAGES.hondaccident1, IMAGES.hondaccident2],
  },
  {
    id: "2",
    date: "2020-03-22",
    severity: "Minor",
    impact: "Rear Bumper",
    location: "Kejetia Market, Kumasi",
    source: "Police MTTD Report",
    description: "Backing collision in crowded market parking area",
    cost: 850,
    areas: ["rear"],
    images: [IMAGES.hondaccident3, IMAGES.hondaccident4],
  },
];

export const AccidentHistory = () => {
  const [selectedAccident, setSelectedAccident] = useState<AccidentRecord | null>(null);

  const closeModal = () => {
    setSelectedAccident(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Severe": return "bg-red-100 text-red-800";
      case "Moderate": return "bg-yellow-100 text-yellow-800";
      case "Minor": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="mb-4">
        <p className="text-sm text-gray-600">Reported incidents from Police MTTD and insurance companies</p>
      </div>

      {mockAccidents.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-2 px-3 font-medium text-gray-700">Date</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700">Severity</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700">Impact Area</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700">Location</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700">Cost</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700">Source</th>
              </tr>
            </thead>
            <tbody>
              {mockAccidents.map((accident) => (
                <tr 
                  key={accident.id}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedAccident(accident)}
                >
                  <td className="py-2 px-3 flex items-center">
                    <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                    {new Date(accident.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(accident.severity)}`}>
                      {accident.severity}
                    </span>
                  </td>
                  <td className="py-2 px-3 font-medium">{accident.impact}</td>
                  <td className="py-2 px-3 text-gray-600">{accident.location}</td>
                  <td className="py-2 px-3 font-medium">
                    {accident.cost ? `GH₵${accident.cost.toLocaleString()}` : 'N/A'}
                  </td>
                  <td className="py-2 px-3 text-gray-600">{accident.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Car className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="text-lg font-medium">No accident records found</p>
          <p className="text-sm text-gray-400">This vehicle has a clean accident history</p>
        </div>
      )}

      {/* Accident Details Modal */}
      {selectedAccident && (
        <div 
          className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Simple Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-gray-600" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Accident Report</h3>
                  <p className="text-sm text-gray-500">{new Date(selectedAccident.date).toLocaleDateString()}</p>
                </div>
              </div>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Accident Information */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Incident Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Date</span>
                        <span className="font-medium">{new Date(selectedAccident.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Severity</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(selectedAccident.severity)}`}>
                          {selectedAccident.severity}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Impact Area</span>
                        <span className="font-medium">{selectedAccident.impact}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Location</span>
                        <span className="font-medium">{selectedAccident.location}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Source</span>
                        <span className="font-medium">{selectedAccident.source}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Repair Cost</span>
                        <span className="font-bold text-lg">
                          {selectedAccident.cost ? `GH₵${selectedAccident.cost.toLocaleString()}` : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
                    <p className="text-gray-700 leading-relaxed">{selectedAccident.description}</p>
                  </div>
                </div>

                {/* Accident Images */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Accident Photos</h4>
                  <div className="space-y-4">
                    {selectedAccident.images.map((image, index) => (
                      <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={image} 
                          alt={`Accident photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Simple Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                  Download Report
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm">
                  Contact Insurance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FraudWall Insight */}
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
