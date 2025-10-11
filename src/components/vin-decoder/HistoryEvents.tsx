import { FileText } from "lucide-react";
import type { HistoryEventsProps } from "../../types/vin-decoder";
import { HistoryEventsChart } from "./HistoryEventsChart";

export function HistoryEvents({
  events,
  totalEvents,
  reportData,
}: HistoryEventsProps) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-5 w-5 text-primary-red" />
        <h2 className="text-2xl font-bold text-gray-800">
          All History Events ({totalEvents} records)
        </h2>
      </div>
      <HistoryEventsChart events={reportData} />
      <br />
      <div className="overflow-x-auto ml-4">
        <h3 className=" font-medium p-3 text-lg ">Vehicle history </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-900">
                Date
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-900">
                Event
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-900">
                Provider
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-900">
                Location
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-900">
                Mileage
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-2 text-gray-600 font-mono text-xs">
                  {event.date}
                </td>
                <td className="py-3 px-2 font-medium text-gray-900">
                  {event.event}
                </td>
                <td className="py-3 px-2 text-gray-600">{event.provider}</td>
                <td className="py-3 px-2 text-gray-600">{event.location}</td>
                <td className="py-3 px-2 text-gray-600">
                  {event.mileage.toLocaleString()} mi
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
