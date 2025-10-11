import { useState } from "react";

interface RecallData {
  date: string;
  recallNumber: string;
  country: string;
  component: string;
  description: string;
}

interface SafetyRecallCheckProps {
  recallData: RecallData[];
}

export function SafetyRecallCheck({ recallData }: SafetyRecallCheckProps) {
  const [selectedRecall, setSelectedRecall] = useState<RecallData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (recall: RecallData) => {
    setSelectedRecall(recall);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecall(null);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg">
      <div className="flex justify-between items-center mb-6">
           <h2 className="text-2xl font-bold text-gray-800">
          Safety recall check
        </h2>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-700">
          Open Safety Recalls
        </h3>
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {recallData.length} records found
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Date/#
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Country
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Component
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Records
              </th>
            </tr>
          </thead>
          <tbody>
            {recallData.map((recall, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <div className="text-sm font-medium text-gray-900">
                    {recall.date}
                  </div>
                  <div className="text-xs text-gray-500">
                    {recall.recallNumber}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {recall.country}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {recall.component}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleViewDetails(recall)}
                    className="text-secondary-dark-red text-sm font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Simple Modal */}
      {showModal && selectedRecall && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Recall Details
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4 grid grid-cols-3 whitespace-nowrap">
              <div>
                <span className="text-sm text-gray-500">Date:</span>
                <span className="ml-2 font-medium">{selectedRecall.date}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Recall Number:</span>
                <span className="ml-2 font-medium">
                  {selectedRecall.recallNumber}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Country:</span>
                <span className="ml-2 font-medium">
                  {selectedRecall.country}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Component:</span>
                <span className="ml-2 font-medium">
                  {selectedRecall.component}
                </span>
              </div>
            </div>
            <div className="py-4 border-t px-6">
              <div className="text-sm text-gray-500 mb-2">Description:</div>
              <p className="text-gray-700">{selectedRecall.description}</p>
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
