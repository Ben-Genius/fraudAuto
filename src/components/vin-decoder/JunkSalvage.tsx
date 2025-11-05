import { useState } from "react";
import { XCircle } from "lucide-react";
import type { SalvageRecord } from "../../types/vin-decoder";

interface JunkSalvageProps {
  salvageRecords: SalvageRecord[];
}

export function JunkSalvage({ salvageRecords }: JunkSalvageProps) {
  const [selectedRecord, setSelectedRecord] = useState<SalvageRecord | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (record: SalvageRecord) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecord(null);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Junk / Salvage Records
          </h2>
          <p className="text-sm text-gray-500">DVLA Insurance Data</p>
        </div>
      </div>

      <div className="mb-6 p-4 bg-yellow-50 rounded-2xl border-l-4 border-yellow-400">
        <div className="text-lg font-medium text-yellow-800">
          {salvageRecords.length} Records Found
        </div>
        <div className="text-sm text-yellow-700">
          Vehicle has salvage/insurance history
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 whitespace-nowrap">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Date
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Reporting Entity
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Location
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Type
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {salvageRecords.map((record) => (
              <tr
                key={record.id}
                className="border-b border-gray-100 hover:bg-gray-50 whitespace-nowrap"
              >
                <td className="py-3 px-4 text-sm text-gray-900">
                  {record.obtainedDate}
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm font-medium text-gray-900">
                    {record.reportingEntity}
                  </div>
                  {record.phone && (
                    <div className="text-xs text-gray-500">{record.phone}</div>
                  )}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {record.location}
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                    {record.recordType}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleViewDetails(record)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
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
      {showModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Salvage Record Details
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-sm text-gray-500">Obtained Date:</span>
                <span className="ml-2 font-medium">
                  {selectedRecord.obtainedDate}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Reporting Entity:</span>
                <span className="ml-2 font-medium">
                  {selectedRecord.reportingEntity}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Location:</span>
                <span className="ml-2 font-medium">
                  {selectedRecord.location}
                </span>
              </div>
              {selectedRecord.phone && (
                <div>
                  <span className="text-sm text-gray-500">Phone:</span>
                  <span className="ml-2 font-medium">
                    {selectedRecord.phone}
                  </span>
                </div>
              )}
              {selectedRecord.email && (
                <div>
                  <span className="text-sm text-gray-500">Email:</span>
                  <span className="ml-2 font-medium">
                    {selectedRecord.email}
                  </span>
                </div>
              )}
              <div>
                <span className="text-sm text-gray-500">Record Type:</span>
                <span className="ml-2 font-medium">
                  {selectedRecord.recordType}
                </span>
              </div>
              {selectedRecord.disposition && (
                <div>
                  <span className="text-sm text-gray-500">Disposition:</span>
                  <span className="ml-2 font-medium">
                    {selectedRecord.disposition}
                  </span>
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
