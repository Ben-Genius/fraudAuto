import { LineChart } from "@mui/x-charts/LineChart";
import { AlertTriangle, Calendar } from "lucide-react";

interface OdometerRecord {
  date: string;
  mileage: number;
  source: string;
  verified: boolean;
  hasIssue?: boolean;
}

const mockOdometerData: OdometerRecord[] = [
  { date: "2020-01-15", mileage: 45000, source: "Toyota Ghana Service", verified: true },
  { date: "2020-07-22", mileage: 52000, source: "Shell Service Station", verified: true },
  { date: "2021-02-10", mileage: 58500, source: "DVLA Inspection", verified: true },
  { date: "2021-08-15", mileage: 89450, source: "Enterprise Insurance Claim", verified: true, hasIssue: true },
  { date: "2021-09-01", mileage: 62110, source: "Private Sale Record", verified: false, hasIssue: true },
  { date: "2022-03-20", mileage: 68200, source: "Kantanka Service Center", verified: true },
  { date: "2023-11-22", mileage: 82150, source: "Bridgestone Kumasi", verified: true },
  { date: "2024-03-15", mileage: 85420, source: "Accra Auto Service", verified: true },
];

export const OdometerAnalysis = () => {
  const chartData = mockOdometerData.map((record) => ({
    x: new Date(record.date).getTime(),
    y: record.mileage,
    hasIssue: record.hasIssue,
  }));

  const fraudAlert = mockOdometerData.some(record => record.hasIssue);

  return (
    <div className="bg-white rounded-lg  border-gray-200 p-4">
      <div className="mb-4">
        <p className="text-sm text-gray-600">Mileage progression verified through DVLA and certified service centers</p>
      </div>

      {fraudAlert && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span className="font-bold text-red-800">🚨 CRITICAL FRAUD ALERT</span>
          </div>
          <p className="text-sm text-red-700 mt-1">
            Odometer rollback detected: Mileage dropped from 89,450 to 62,110 km. This indicates potential odometer tampering - common in imported vehicles.
          </p>
        </div>
      )}

      <div className="mb-4">
        <LineChart
       
          series={[
            {
              data: chartData.map(d => d.y),
              label: "Recorded Kilometers",
              color: "#3B82F6",
            },
          ]}
          xAxis={[
            {
              data: chartData.map(d => d.x),
              scaleType: "time",
              valueFormatter: (value) => new Date(value).toLocaleDateString(),
            },
          ]}
          yAxis={[
            {
              label: "Kilometers",
              valueFormatter: (value:string) => `${value.toLocaleString()} km`,
            },
          ]}
          margin={{ left: 80, right: 20, top: 20, bottom: 60 }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-2 px-3 font-medium text-gray-700">Date</th>
              <th className="text-left py-2 px-3 font-medium text-gray-700">Kilometers</th>
              <th className="text-left py-2 px-3 font-medium text-gray-700">KM Added</th>
              <th className="text-left py-2 px-3 font-medium text-gray-700">Source</th>
              <th className="text-left py-2 px-3 font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockOdometerData.map((record, index) => {
              const prevMileage = index > 0 ? mockOdometerData[index - 1].mileage : 0;
              const milesAdded = index > 0 ? record.mileage - prevMileage : 0;
              const isRollback = milesAdded < 0;

              return (
                <tr key={index} className={`border-b border-gray-100 ${isRollback ? 'bg-red-50' : ''}`}>
                  <td className="py-2 px-3 flex items-center">
                    <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-3 font-medium">{record.mileage.toLocaleString()}</td>
                  <td className={`py-2 px-3 ${isRollback ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
                    {index > 0 ? (isRollback ? `${milesAdded.toLocaleString()}` : `+${milesAdded.toLocaleString()}`) : '-'}
                  </td>
                  <td className="py-2 px-3 text-gray-600">{record.source}</td>
                  <td className="py-2 px-3">
                    {record.verified ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        DVLA Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        Unverified
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FraudWall Ghana Insight */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">F</span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900">FraudWall Insight</h4>
            <p className="text-sm text-blue-800">
              Odometer tampering is common in imported vehicles. This vehicle shows a suspicious rollback pattern 
              typical of cars imported through Tema Port. Verify with DVLA records and request physical inspection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
