import type { ReportHeaderProps } from "../../types/vin-decoder";

export function ReportHeader({ vin, vehicle }: ReportHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-primary-red to-red-700 rounded-3xl p-8 text-white shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-4">
            🇬🇭 DVLA VERIFIED
          </div>
          <h2 className="text-3xl font-light mb-3 tracking-tight">
            Vehicle History Report
          </h2>
          <p className="text-xl opacity-90 font-light">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </p>
          <p className="font-mono text-sm opacity-80 mt-2">VIN: {vin}</p>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-80">
            Generated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-xs opacity-70">
            Report #FR{Date.now().toString().slice(-6)}
          </p>
        </div>
      </div>
    </div>
  );
}
