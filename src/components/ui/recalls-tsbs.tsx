import { useState } from "react";
import { AlertTriangle, CheckCircle, ExternalLink, Calendar, Wrench, Shield, X } from "lucide-react";

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

  const openRecallModal = (recall: Recall) => {
    setSelectedRecall(recall);
  };

  const openTSBModal = (tsb: TSB) => {
    setSelectedTSB(tsb);
  };

  const closeModals = () => {
    setSelectedRecall(null);
    setSelectedTSB(null);
  };

  const handleCheckRepair = (recall: Recall) => {
    // Simulate opening NHTSA or dealer website
    window.open(`https://www.nhtsa.gov/recalls?vin=1HGBH41JXMN109186&campaign=${recall.campaignNumber}`, '_blank');
  };
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Critical": return "bg-red-100 text-red-800 border-red-200";
      case "High": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
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

  const openRecalls = mockRecalls.filter(recall => !recall.repaired);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Recalls & Technical Service Bulletins</h2>
        <p className="text-sm text-gray-600">NHTSA recalls and manufacturer service bulletins</p>
      </div>

      {/* Open Recalls Alert */}
      {openRecalls.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span className="font-bold text-red-800">
              {openRecalls.length} Open Recall{openRecalls.length > 1 ? 's' : ''} Require Attention
            </span>
          </div>
          <p className="text-sm text-red-700">
            This vehicle has unrepaired safety recalls. Contact an authorized dealer immediately to schedule free repairs.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recalls Section */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Shield className="h-5 w-5 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">Safety Recalls</h3>
          </div>
          
          <div className="space-y-3">
            {mockRecalls.map((recall) => (
              <div key={recall.id} className={`border rounded-lg p-3 ${recall.repaired ? 'border-gray-200' : 'border-red-200 bg-red-50'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-mono text-gray-600">{recall.campaignNumber}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getRiskColor(recall.risk)}`}>
                        {recall.risk} Risk
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900">{recall.title}</h4>
                  </div>
                  {recall.repaired ? (
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  )}
                </div>
                
                <p className="text-sm text-gray-700 mb-2">{recall.description}</p>
                
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Issued: {new Date(recall.dateIssued).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Wrench className="h-3 w-3 mr-1" />
                    Component: {recall.component}
                  </div>
                  {recall.repaired && recall.repairedDate && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Repaired: {new Date(recall.repairedDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
                
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-2"><strong>Remedy:</strong> {recall.remedy}</p>
                  {!recall.repaired && (
                    <button 
                      className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 mr-2"
                      onClick={() => handleCheckRepair(recall)}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Check for Repair
                    </button>
                  )}
                  <button 
                    className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    onClick={() => openRecallModal(recall)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TSBs Section */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Wrench className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Technical Service Bulletins</h3>
          </div>
          
          <div className="space-y-3">
            {mockTSBs.map((tsb) => (
              <div key={tsb.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-mono text-gray-600">{tsb.bulletinNumber}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(tsb.category)}`}>
                        {tsb.category}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900">{tsb.title}</h4>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mb-2">{tsb.description}</p>
                
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Issued: {new Date(tsb.dateIssued).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Wrench className="h-3 w-3 mr-1" />
                    Component: {tsb.component}
                  </div>
                </div>
                
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <button 
                    className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    onClick={() => openTSBModal(tsb)}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{mockRecalls.length}</div>
            <div className="text-xs text-gray-600">Total Recalls</div>
            <div className="text-xs text-gray-500">
              {mockRecalls.filter(r => r.repaired).length} completed
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{mockTSBs.length}</div>
            <div className="text-xs text-gray-600">Service Bulletins</div>
            <div className="text-xs text-gray-500">
              {mockTSBs.filter(t => t.category === "Safety").length} safety-related
            </div>
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
