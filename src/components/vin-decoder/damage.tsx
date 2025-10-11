import { useState } from "react";

interface DamageRecord {
  id: number;
  type: string;
  date: string;
  country: string;
  details: string;
}

interface DamageProps {
  records: DamageRecord[];
}

export function Damage({ records }: DamageProps) {
  const [selectedRecord, setSelectedRecord] = useState<DamageRecord | null>(null);

  const handleViewDetails = (record: DamageRecord) => {
    setSelectedRecord(record);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg">
      <h2 className="text-2xl font-light text-gray-900 mb-6">Vehicle Damage Records</h2>
      
      <div className="space-y-4">
        {records.map((record) => (
          <div
            key={record.id}
            className="p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100"
            onClick={() => handleViewDetails(record)}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium text-gray-900">{record.type}</div>
                <div className="text-sm text-gray-600">{record.date}</div>
              </div>
              <div className="text-sm text-gray-500">{record.country}</div>
            </div>
          </div>
        ))}
      </div>

      {selectedRecord && (
        <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
          <h3 className="font-medium text-blue-900 mb-2">Damage Details</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-blue-700">Type:</span>
              <span className="ml-2 text-blue-900">{selectedRecord.type}</span>
            </div>
            <div>
              <span className="text-blue-700">Date:</span>
              <span className="ml-2 text-blue-900">{selectedRecord.date}</span>
            </div>
            <div>
              <span className="text-blue-700">Country:</span>
              <span className="ml-2 text-blue-900">{selectedRecord.country}</span>
            </div>
            <div>
              <span className="text-blue-700">Details:</span>
              <span className="ml-2 text-blue-900">{selectedRecord.details}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
