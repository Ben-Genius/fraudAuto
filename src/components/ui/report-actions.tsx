import { Download, Share2, Printer, Save, FileText, Shield, AlertTriangle } from "lucide-react";

export const ReportActions = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-10">
      {/* Actions Bar */}
      <div className="flex flex-wrap gap-3 mb-4 items-center justify-center py-2 flex-col md:flex-row">
        <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
          <Download className="h-4 w-4 mr-2" />
          Download PDF Report
        </button>
        
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Share2 className="h-4 w-4 mr-2" />
          Share Secure Link
        </button>
        
        <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Printer className="h-4 w-4 mr-2" />
          Print Report
        </button>
        
        <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Save className="h-4 w-4 mr-2" />
          Save to Account
        </button>
      </div>

      {/* Report Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <Shield className="h-6 w-6 mx-auto mb-1 text-green-600" />
          <div className="text-lg font-bold text-green-800">85/100</div>
          <div className="text-xs text-green-700">FraudWall Score</div>
        </div>
        
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <AlertTriangle className="h-6 w-6 mx-auto mb-1 text-yellow-600" />
          <div className="text-lg font-bold text-yellow-800">2</div>
          <div className="text-xs text-yellow-700">Issues Found</div>
        </div>
        
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <FileText className="h-6 w-6 mx-auto mb-1 text-blue-600" />
          <div className="text-lg font-bold text-blue-800">28</div>
          <div className="text-xs text-blue-700">Service Records</div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600">
        <p className="mb-2">
          <strong>Disclaimer:</strong> This report is compiled from available sources but may not be exhaustive. 
          A pre-purchase inspection by a qualified mechanic is always recommended.
        </p>
        <p>
          Report generated on {new Date().toLocaleDateString()} • Data sources include NHTSA, insurance claims, 
          service records, and verified dealer networks.
        </p>
      </div>
    </div>
  );
};
