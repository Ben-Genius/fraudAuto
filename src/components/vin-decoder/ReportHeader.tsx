import type { ReportHeaderProps } from "../../types/vin-decoder";

export function ReportHeader({ vin, vehicle }: ReportHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-primary-red to-red-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-white shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
        <div className="flex-1">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            🇬🇭 DVLA VERIFIED
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light mb-2 sm:mb-3 tracking-tight">
            Vehicle History Report
          </h2>
          <p className="text-base sm:text-lg md:text-xl opacity-90 font-light">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </p>
          <p className="font-mono text-xs sm:text-sm opacity-80 mt-1 sm:mt-2 break-all">VIN: {vin}</p>
        </div>
        <div className="text-left sm:text-right w-full sm:w-auto">
          <p className="text-xs sm:text-sm opacity-80">
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
