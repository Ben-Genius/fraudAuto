import { FileText } from "lucide-react";
import type { TitleRecord } from "../../types/vin-decoder";

interface TitleHistoryProps {
  titleHistory: {
    current: TitleRecord[];
    historical: TitleRecord[];
  };
}

export function TitleHistory({ titleHistory }: TitleHistoryProps) {
  const totalRecords = titleHistory.current.length + titleHistory.historical.length;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <FileText className="h-6 w-6 text-primary-red" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Title History Information
          </h2>
          <p className="text-sm text-gray-500">NMVTIS Confirmed Data</p>
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-50 rounded-2xl">
        <div className="text-lg font-medium text-blue-800">
          {totalRecords} Records Found
        </div>
      </div>

      {/* Current Title Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Current Title Information
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Title Issue Date
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  State
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Mileage
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Event
                </th>
              </tr>
            </thead>
            <tbody>
              {titleHistory.current.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {record.titleIssueDate}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {record.state}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {record.mileage}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {record.event}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Title Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Historical Title Information
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Title Issue Date
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  State
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Mileage
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Event
                </th>
              </tr>
            </thead>
            <tbody>
              {titleHistory.historical.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {record.titleIssueDate}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {record.state}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {record.mileage}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {record.event}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
