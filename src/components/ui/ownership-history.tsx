import React from "react";
import { Calendar, MapPin, User, Gauge, Clock } from "lucide-react";

interface OwnershipPeriod {
  id: string;
  startDate: string;
  endDate?: string;
  region: string;
  city: string;
  ownerType: "Individual" | "Dealer" | "Fleet" | "Lease";
  duration: number; // months
  milesAdded: number;
  avgMilesPerYear: number;
}

const mockOwnership: OwnershipPeriod[] = [
  {
    id: "1",
    startDate: "2018-01-15",
    endDate: "2021-03-10",
    region: "Greater Accra",
    city: "Accra",
    ownerType: "Individual",
    duration: 38,
    milesAdded: 35000,
    avgMilesPerYear: 11053,
  },
  {
    id: "2",
    startDate: "2021-03-10",
    endDate: "2023-07-22",
    region: "Ashanti",
    city: "Kumasi",
    ownerType: "Individual",
    duration: 28,
    milesAdded: 28000,
    avgMilesPerYear: 12000,
  },
  {
    id: "3",
    startDate: "2023-07-22",
    endDate: undefined,
    region: "Greater Accra",
    city: "Tema",
    ownerType: "Individual",
    duration: 8,
    milesAdded: 8500,
    avgMilesPerYear: 12750,
  },
];

export const OwnershipHistory = () => {
  const getOwnerTypeColor = (type: string) => {
    switch (type) {
      case "Individual": return "bg-blue-100 text-blue-800";
      case "Dealer": return "bg-purple-100 text-purple-800";
      case "Fleet": return "bg-orange-100 text-orange-800";
      case "Lease": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getMileageInsight = (avgMiles: number) => {
    if (avgMiles > 20000) return { text: "Heavy Usage", color: "text-red-600" };
    if (avgMiles > 15000) return { text: "High Usage", color: "text-yellow-600" };
    if (avgMiles > 10000) return { text: "Normal Usage", color: "text-green-600" };
    return { text: "Light Usage", color: "text-blue-600" };
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Ownership History</h2>
        <p className="text-sm text-gray-600">Previous owners and usage patterns across regions</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{mockOwnership.length}</div>
          <div className="text-xs text-gray-600">Total Owners</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(mockOwnership.reduce((sum, owner) => sum + owner.avgMilesPerYear, 0) / mockOwnership.length).toLocaleString()}
          </div>
          <div className="text-xs text-gray-600">Avg KM/Year</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(mockOwnership.reduce((sum, owner) => sum + owner.duration, 0) / mockOwnership.length)}
          </div>
          <div className="text-xs text-gray-600">Avg Ownership (mo)</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-4">
          {mockOwnership.map((period, index) => {
            const isCurrentOwner = !period.endDate;
            const mileageInsight = getMileageInsight(period.avgMilesPerYear);
            
            return (
              <div key={period.id} className="relative flex items-start">
                <div className={`absolute left-2.5 w-3 h-3 rounded-full border-2 ${
                  isCurrentOwner ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'
                }`}></div>
                
                <div className="ml-8 w-full">
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getOwnerTypeColor(period.ownerType)}`}>
                            Owner #{index + 1} - {period.ownerType}
                          </span>
                          {isCurrentOwner && (
                            <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                              Current Owner
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(period.startDate).toLocaleDateString()}
                            {period.endDate && ` - ${new Date(period.endDate).toLocaleDateString()}`}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {period.city}, {period.region} Region
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-gray-100">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Clock className="h-3 w-3 mr-1 text-gray-400" />
                          <span className="text-xs text-gray-600">Duration</span>
                        </div>
                        <div className="font-semibold text-gray-900">{period.duration} months</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Gauge className="h-3 w-3 mr-1 text-gray-400" />
                          <span className="text-xs text-gray-600">KM Added</span>
                        </div>
                        <div className="font-semibold text-gray-900">{period.milesAdded.toLocaleString()}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <User className="h-3 w-3 mr-1 text-gray-400" />
                          <span className="text-xs text-gray-600">Usage Pattern</span>
                        </div>
                        <div className={`font-semibold ${mileageInsight.color}`}>
                          {mileageInsight.text}
                        </div>
                        <div className="text-xs text-gray-500">
                          {period.avgMilesPerYear.toLocaleString()}/year
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FraudWall Ghana Insight */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">F</span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900">FraudWall Insight</h4>
            <p className="text-sm text-blue-800">
              Vehicle ownership across Accra and Kumasi regions shows typical urban usage patterns. 
              The {Math.round(mockOwnership.reduce((sum, owner) => sum + owner.duration, 0) / mockOwnership.length)}-month 
              average ownership suggests normal turnover for the used car market.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
