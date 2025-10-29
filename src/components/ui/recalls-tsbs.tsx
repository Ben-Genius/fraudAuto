import { useState } from "react";
import { AlertTriangle, CheckCircle,  Wrench, Shield, X } from "lucide-react";

interface Recall {
  id: string;
  campaignNumber: string;
  title: string;
  description: string;
  risk: "Low" | "Medium" | "High" | "Critical";
  dateIssued: string;
  component: string;
  repaired: boolean;
  repairedDate?: string;
  remedy: string;
}

interface TSB {
  id: string;
  bulletinNumber: string;
  title: string;
  description: string;
  dateIssued: string;
  component: string;
  category: "Maintenance" | "Performance" | "Safety" | "Comfort";
}

const mockRecalls: Recall[] = [
  {
    id: "1",
    campaignNumber: "23V-456",
    title: "Fuel Pump Relay Failure",
    description: "The fuel pump relay may fail, causing the engine to stall without warning, increasing the risk of a crash.",
    risk: "High",
    dateIssued: "2023-08-15",
    component: "Fuel System",
    repaired: false,
    remedy: "Dealers will replace the fuel pump relay free of charge.",
  },
  {
    id: "2",
    campaignNumber: "22V-123",
    title: "Airbag Inflator Replacement",
    description: "The passenger airbag inflator may rupture during deployment, sending metal fragments into the cabin.",
    risk: "Critical",
    dateIssued: "2022-03-10",
    component: "Airbag System",
    repaired: true,
    repairedDate: "2022-05-15",
    remedy: "Dealers will replace the passenger airbag inflator assembly.",
  },
];

const mockTSBs: TSB[] = [
  {
    id: "1",
    bulletinNumber: "TSB-23-001",
    title: "Engine Oil Consumption",
    description: "Some vehicles may experience higher than normal oil consumption between service intervals.",
    dateIssued: "2023-06-20",
    component: "Engine",
    category: "Maintenance",
  },
  {
    id: "2",
    bulletinNumber: "TSB-23-002",
    title: "Infotainment System Software Update",
    description: "Updated software to improve system responsiveness and fix connectivity issues.",
    dateIssued: "2023-09-12",
    component: "Electronics",
    category: "Performance",
  },
];

export const RecallsTSBs = () => {
  const [selectedRecall, setSelectedRecall] = useState<Recall | null>(null);
  const [selectedTSB, setSelectedTSB] = useState<TSB | null>(null);

  const closeModals = () => {
    setSelectedRecall(null);
    setSelectedTSB(null);
  };

  const handleCheckRepair = (recall: Recall) => {
    window.open(`https://www.nhtsa.gov/recalls?vin=1HGBH41JXMN109186&campaign=${recall.campaignNumber}`, '_blank');
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Safety": return "bg-red-100 text-red-800";
      case "Performance": return "bg-blue-100 text-blue-800";
      case "Maintenance": return "bg-yellow-100 text-yellow-800";
      case "Comfort": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg  border border-gray-200 p-4">
      <div className="mb-4">
        <p className="text-sm text-gray-600">NHTSA recalls and manufacturer service bulletins</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recalls Table */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Shield className="h-5 w-5 text-red-600 mr-2" />
            Safety Recalls
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Campaign</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Issue</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Risk</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockRecalls.map((recall) => (
                  <tr 
                    key={recall.id}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedRecall(recall)}
                  >
                    <td className="py-2 px-3 font-mono text-xs">{recall.campaignNumber}</td>
                    <td className="py-2 px-3">{recall.title}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(recall.risk)}`}>
                        {recall.risk}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      {recall.repaired ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TSBs Table */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Wrench className="h-5 w-5 text-blue-600 mr-2" />
            Technical Service Bulletins
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Bulletin</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Issue</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Category</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {mockTSBs.map((tsb) => (
                  <tr 
                    key={tsb.id}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedTSB(tsb)}
                  >
                    <td className="py-2 px-3 font-mono text-xs">{tsb.bulletinNumber}</td>
                    <td className="py-2 px-3">{tsb.title}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(tsb.category)}`}>
                        {tsb.category}
                      </span>
                    </td>
                    <td className="py-2 px-3">{new Date(tsb.dateIssued).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recall Details Modal */}
      {selectedRecall && (
        <div 
          className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModals}
        >
          <div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Safety Recall Details</h3>
                  <p className="text-sm text-gray-600">Campaign: {selectedRecall.campaignNumber}</p>
                </div>
              </div>
              <button onClick={closeModals} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Issue Description</h4>
                  <p className="text-sm text-gray-700">{selectedRecall.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Risk Level</h4>
                    <span className={`px-3 py-1 rounded text-sm font-medium ${getRiskColor(selectedRecall.risk)}`}>
                      {selectedRecall.risk} Risk
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Component</h4>
                    <p className="text-sm text-gray-700">{selectedRecall.component}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Remedy</h4>
                  <p className="text-sm text-gray-700">{selectedRecall.remedy}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Status</h4>
                  {selectedRecall.repaired ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>Repaired on {selectedRecall.repairedDate && new Date(selectedRecall.repairedDate).toLocaleDateString()}</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      <span>Not Repaired - Action Required</span>
                    </div>
                  )}
                </div>
                
                {!selectedRecall.repaired && (
                  <div className="pt-4 border-t border-gray-200">
                    <button 
                      className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                      onClick={() => handleCheckRepair(selectedRecall)}
                    >
                      Schedule Repair at Authorized Dealer
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TSB Details Modal */}
      {selectedTSB && (
        <div 
          className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModals}
        >
          <div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Wrench className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Technical Service Bulletin</h3>
                  <p className="text-sm text-gray-600">Bulletin: {selectedTSB.bulletinNumber}</p>
                </div>
              </div>
              <button onClick={closeModals} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Issue Description</h4>
                  <p className="text-sm text-gray-700">{selectedTSB.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
                    <span className={`px-3 py-1 rounded text-sm font-medium ${getCategoryColor(selectedTSB.category)}`}>
                      {selectedTSB.category}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Component</h4>
                    <p className="text-sm text-gray-700">{selectedTSB.component}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Date Issued</h4>
                  <p className="text-sm text-gray-700">{new Date(selectedTSB.dateIssued).toLocaleDateString()}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-3">
                    This bulletin provides technical guidance to service technicians. Contact your dealer for more information.
                  </p>
                  <button 
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    onClick={() => window.open('https://www.toyota.com.gh/service', '_blank')}
                  >
                    Contact Authorized Service Center
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
