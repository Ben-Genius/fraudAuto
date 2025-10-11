import { useState } from "react";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import type { OdometerCheckData } from "../../types/vin-decoder";

interface OdometerCheckProps {
  odometerChecks: OdometerCheckData[];
}

export function OdometerCheck({ odometerChecks }: OdometerCheckProps) {
  const [selectedCheck, setSelectedCheck] = useState<OdometerCheckData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (check: OdometerCheckData) => {
    setSelectedCheck(check);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCheck(null);
  };

  const problemCount = odometerChecks.filter(check => check.hasProblem).length;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <AlertTriangle className="h-6 w-6 text-primary-red" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Odometer Check</h2>
          <p className="text-sm text-gray-500">NMVTIS Verified Data</p>
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-light text-gray-900">{odometerChecks.length}</div>
            <div className="text-sm text-gray-600">Points Checked</div>
          </div>
          <div>
            <div className={`text-2xl font-light ${problemCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {problemCount}
            </div>
            <div className="text-sm text-gray-600">Problems Found</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {odometerChecks.map((check) => (
          <div
            key={check.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => handleViewDetails(check)}
          >
            <div className="flex items-center gap-4">
              {check.hasProblem ? (
                <XCircle className="h-5 w-5 text-red-600" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
              <div>
                <div className="font-medium text-gray-900">{check.checkType}</div>
                {check.date && (
                  <div className="text-sm text-gray-500">{check.date}</div>
                )}
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              check.hasProblem 
                ? 'bg-red-100 text-red-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {check.hasProblem ? 'ALERT' : 'CLEAR'}
            </div>
          </div>
        ))}
      </div>

      {/* Simple Modal */}
      {showModal && selectedCheck && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Odometer Check Details</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-sm text-gray-500">Check Type:</span>
                <span className="ml-2 font-medium">{selectedCheck.checkType}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Status:</span>
                <span className={`ml-2 font-medium ${
                  selectedCheck.hasProblem ? 'text-red-600' : 'text-green-600'
                }`}>
                  {selectedCheck.status}
                </span>
              </div>
              {selectedCheck.date && (
                <div>
                  <span className="text-sm text-gray-500">Date:</span>
                  <span className="ml-2 font-medium">{selectedCheck.date}</span>
                </div>
              )}
              {selectedCheck.description && (
                <div className="pt-4 border-t">
                  <div className="text-sm text-gray-500 mb-2">Description:</div>
                  <p className="text-gray-700">{selectedCheck.description}</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t bg-gray-50 rounded-b-2xl">
              <button
                onClick={closeModal}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
