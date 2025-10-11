import { useState } from "react";
import { User } from "lucide-react";
import type { OwnershipHistoryProps } from "../../types/vin-decoder";

export function OwnershipHistory({ ownership }: OwnershipHistoryProps) {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-primary-red" />
            <h2 className="text-2xl font-bold text-gray-800">
            Ownership History
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              viewMode === 'table' 
                ? 'bg-white text-primary-red shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              viewMode === 'grid' 
                ? 'bg-white text-primary-red shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Grid
          </button>
        </div>
      </div>
      
      {viewMode === 'table' ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-medium text-gray-900">Owner</th>
                <th className="text-left py-3 px-2 font-medium text-gray-900">Last Odometer Reading</th>
                <th className="text-left py-3 px-2 font-medium text-gray-900">Country</th>
                <th className="text-left py-3 px-2 font-medium text-gray-900">Est. Mi/Year</th>
                <th className="text-left py-3 px-2 font-medium text-gray-900">Purchased</th>
                <th className="text-left py-3 px-2 font-medium text-gray-900">Usage</th>
              </tr>
            </thead>
            <tbody>
              {ownership.map((owner) => (
                <tr key={owner.owner} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium text-gray-900">
                    {owner.owner}{owner.owner === 1 ? "st" : owner.owner === 2 ? "nd" : owner.owner === 3 ? "rd" : "th"}
                  </td>
                  <td className="py-3 px-2 text-gray-600">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{owner.type}</span>
                  </td>
                  <td className="py-3 px-2 text-gray-600">🇬🇭 {owner.country}</td>
                  <td className="py-3 px-2 text-gray-600">{owner.estMiYear.toLocaleString()}</td>
                  <td className="py-3 px-2 text-gray-600">{owner.purchased}</td>
                  <td className="py-3 px-2 text-gray-600">{owner.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ownership.map((owner) => (
            <div key={owner.owner} className="bg-gray-50 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <User className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-gray-900">
                  {owner.owner}{owner.owner === 1 ? "st" : owner.owner === 2 ? "nd" : owner.owner === 3 ? "rd" : "th"} Owner
                </span>
                <span className="px-2 py-1 bg-white rounded text-xs text-gray-700">{owner.type}</span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Country: 🇬🇭 {owner.country}</div>
                <div>Est. Mi/Year: {owner.estMiYear.toLocaleString()}</div>
                <div>Purchased: {owner.purchased}</div>
                <div>Usage: {owner.usage}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
